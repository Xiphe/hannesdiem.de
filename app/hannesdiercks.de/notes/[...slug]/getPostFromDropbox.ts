import { DropboxResponseError } from "dropbox";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import { visit } from "unist-util-visit";
import { parse as parseYaml } from "yaml";
import { cachiPayload } from "@utils/payloadCache";
import { HALF_YEAR, ONE_SECOND, ONE_WEEK, ONE_YEAR } from "@utils/time";
import { notFound } from "next/navigation";
import { getPayload } from "@utils/getPayload";
import { complete } from "@utils/complete";
import { z } from "zod";
import { getDropbox } from "../getDropbox";

interface GetPostFromDropboxOpts {
  slug: string[];
}

interface DropboxFile {
  status: "found";
  title: string;
  contentHash: string;
  banner?: { src: string; alt?: string };
  description: string;
  published: number | false;
  tags: string[];
  frontMatter: Record<string, unknown>;
  html: string;
}

interface PublishedPost extends Omit<DropboxFile, "published"> {
  published: number;
}

export async function getPostFromDropbox({
  slug,
}: GetPostFromDropboxOpts): Promise<PublishedPost> {
  const filePath = slug.join("/");
  const payload = await getPayload();

  if (!filePath.endsWith(".html")) {
    return notFound();
  }

  const file = await cachiPayload({
    key: `hdx-blog-file-v0-${filePath}`,
    ttl: process.env.NODE_ENV === "development" ? ONE_SECOND * 5 : ONE_WEEK,
    swr: ONE_YEAR,
    async getFreshValue() {
      if (slug.join("/").endsWith(".md")) {
        return {
          status: "not-found",
        };
      }

      const dbx = getDropbox();
      const path = `/Apps/remotely-save/Hannes/Blog/${filePath.replace(/\.html$/, ".md")}`;

      try {
        payload.logger.info(`Get file: "${path}"`);
        var res = await dbx.filesDownload({ path });

        if (!res.result.content_hash) {
          throw new Error("Missing Content Hash");
        }
      } catch (err) {
        if (
          !(err instanceof DropboxResponseError) ||
          !err.error.error_summary.startsWith("path/not_found/")
        ) {
          payload.logger.error(err);
        }

        return {
          status: "not-found",
        };
      }

      if (res.status !== 200) {
        throw new Error(`Non-200 status for ${path}`);
      }

      const fileBlob = (res.result as any).fileBlob;
      if (!(fileBlob instanceof Blob)) {
        throw new Error("fileBlob is not a Blob");
      }

      const document = Buffer.from(await fileBlob.arrayBuffer()).toString(
        "utf8",
      );

      let frontMatter: DropboxFile["frontMatter"] = {};
      const { value: htmlDocument } = await remark()
        .use(gfm)
        .use(handleReferences)
        .use(remarkFrontmatter, ["yaml"])
        .use(() => (tree: any) => {
          if (tree.type === "root" && tree.children[0].type === "yaml") {
            frontMatter = parseYaml(tree.children[0].value);
          }
        })
        .use(html)
        .process(document);

      let title = "";
      let banner: DropboxFile["banner"];
      const { value: processedHtmlDocument } = await rehype()
        .use(rehypeHighlight)
        .use(() => (tree: any) => {
          while (true) {
            // Unwrap <html>
            if (
              tree.children.length === 1 &&
              tree.children[0].tagName === "html"
            ) {
              tree.children = tree.children[0].children;
              continue;
            }

            // Unwrap <body>
            if (
              tree.children.length === 2 &&
              tree.children[1].tagName === "body"
            ) {
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
        .process(htmlDocument);

      if (title === "") {
        title = slug.at(-1)!;
      }

      return {
        status: "found",
        title,
        banner,
        contentHash: res.result.content_hash,
        description:
          typeof frontMatter.description === "string"
            ? frontMatter.description
            : undefined,
        published:
          typeof frontMatter.published === "string" &&
          new Date(frontMatter.published).getTime(),
        tags: (Array.isArray(frontMatter.tags) ? frontMatter.tags : []).filter(
          (t): t is string => typeof t === "string",
        ),
        frontMatter,
        html: String(processedHtmlDocument).trim(),
      };
    },
  });

  if (file.status !== "not-found" && !file.description) {
    file.description = await cachiPayload({
      key: `hdx-blog-description-v0-${file.contentHash}`,
      ttl: HALF_YEAR,
      swr: ONE_YEAR,
      async getFreshValue() {
        const {
          data: { description },
        } = await complete(
          `For my blog I need you to provide a 1-2 sentence summary of a post
that I can use as the meta-description tag. Please make it concise, short and sweet.
Avoid talking about "this post ..." and stick with the content. Make the summary
spark interest without being click-baity.

Post:
---
${file.html}`,
          { schema: z.object({ description: z.string() }) },
        );

        return description;
      },
    });
  }

  if (
    file.status === "not-found" ||
    !file.published ||
    file.published > Date.now()
  ) {
    return notFound();
  }

  return file as PublishedPost;
}

function handleReferences() {
  return (tree: any) => {
    visit(tree, ["link", "image"], (node) => {
      if (node.url && node.url.startsWith("Blog/")) {
        node.url = node.url
          .replace(/^Blog\//, "/notes/")
          .replace(/\.md$/, ".html");
      }
    });
  };
}
