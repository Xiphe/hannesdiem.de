import { remark } from "remark";
import gfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import { visit, SKIP } from "unist-util-visit";
import { parse as parseYaml } from "yaml";
import { Literal, Parent } from "unist";
import { Plugin } from "unified";
import assert from "node:assert";
import { verifySignature } from "./verifySignature";

const HTML_SIGNATURE_PUBLIC_KEY = process.env.HTML_SIGNATURE_PUBLIC_KEY;
assert(HTML_SIGNATURE_PUBLIC_KEY, "HTML_SIGNATURE_PUBLIC_KEY env must be set");

export async function processMarkdown(
  document: string,
  proc: Plugin = () => () => {},
) {
  let frontMatter: Record<string, unknown> = {};
  let title = "";
  let banner: { src: string; alt?: string } | undefined = undefined;

  const signedHtml: string[] = [];
  const { value: processedHtmlDocument } = await remark()
    .use(gfm)
    .use(proc)
    .use(remarkFrontmatter, ["yaml"])
    .use(() => (tree: any) => {
      if (tree.type === "root" && tree.children[0].type === "yaml") {
        frontMatter = parseYaml(tree.children[0].value);
      }
    })
    .use(validHtml(signedHtml))
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(() => (tree: any) => {
      while (true) {
        if (tree.children.length === 0) {
          break;
        }

        // Unwrap <html>
        if (tree.children.length === 1 && tree.children[0].tagName === "html") {
          tree.children = tree.children[0].children;
          continue;
        }

        // Unwrap <body>
        if (tree.children.length === 2 && tree.children[1].tagName === "body") {
          tree.children = tree.children[1].children;
          continue;
        }

        // Find first headline
        if (tree.children[0].tagName === "h1") {
          visit(tree.children[0], "text", (node) => {
            title += node.value;
          });
          tree.children.splice(0, 1);
          continue;
        }

        // Trim empty lines at beginning
        if (
          tree.children[0].type === "text" &&
          tree.children[0].value.trim() === ""
        ) {
          tree.children.splice(0, 1);
          continue;
        }

        if (
          tree.children[0].tagName === "p" &&
          tree.children[0].children.length === 1 &&
          tree.children[0].children[0].tagName === "img"
        ) {
          banner = tree.children[0].children[0].properties;
          tree.children.splice(0, 1);
          continue;
        }

        break;
      }
    })
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(document);

  const htmlDocWithSignedSnippets = signedHtml.reduce((doc, snip, i) => {
    return doc.replace(`___VERIFIED__HTML__${i}__`, snip);
  }, processedHtmlDocument as string);

  return {
    frontMatter,
    title,
    banner,
    html: htmlDocWithSignedSnippets,
  };
}

const validHtml =
  (store: string[]): Plugin =>
  () =>
  (tree) => {
    visit(
      tree,
      (node): node is Literal => {
        return node.type === "html";
      },
      (node, index, parent: Parent) => {
        let match = (node.value as string)
          .trim()
          .match(/^<div data-signature="([a-f0-9]+)">(.*)<\/div>$/ms);

        if (
          index != null &&
          match &&
          match[1] &&
          match[2] &&
          verifySignature(
            Buffer.from(HTML_SIGNATURE_PUBLIC_KEY!, "base64url").toString(
              "utf-8",
            ),
            match[2],
            match[1],
          )
        ) {
          const i = store.push(match[2]) - 1;

          (parent.children as any[]).splice(index, 1, {
            type: "text",
            value: `___VERIFIED__HTML__${i}__`,
          } satisfies Literal);

          return SKIP;
        }

        match = (node.value as string)
          .trim()
          .match(/^<[\/]?(div|span)[^<>]*>$/);

        if (index && match) {
          const i = store.push(match[0]) - 1;

          (parent.children as any[]).splice(index, 1, {
            type: "text",
            value: `___VERIFIED__HTML__${i}__`,
          } satisfies Literal);

          return SKIP;
        }
      },
    );
  };
