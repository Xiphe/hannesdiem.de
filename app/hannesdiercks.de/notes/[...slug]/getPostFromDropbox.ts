import { DropboxResponseError } from "dropbox";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import { visit } from "unist-util-visit";
import { parse as parseYaml } from "yaml";
import { cachiPayload, payloadCache } from "@utils/payloadCache";
import { softPurge } from "@epic-web/cachified";
import { HALF_YEAR, ONE_WEEK, ONE_YEAR } from "@utils/time";
import { getPayload } from "@utils/getPayload";
import { complete } from "@utils/complete";
import { z } from "zod";
import { getDropbox } from "../getDropbox";

interface GetPostFromDropboxOpts {
  filePath: string;
  includeUnpublished?: boolean;
  forceFresh?: boolean;
}

interface DropboxFile {
  status: "found";
  title: string;
  contentHash: string;
  banner?: { src: string; alt?: string };
  description?: string;
  published: number | false;
  tags: string[];
  frontMatter: Record<string, unknown>;
  html: string;
}

interface NotFound {
  status: "not-found";
}

export interface PublishedPost
  extends Omit<DropboxFile, "published" | "description"> {
  published: number;
  description: string;
}

export async function getPostFromDropbox({
  filePath,
  includeUnpublished,
  forceFresh,
}: GetPostFromDropboxOpts): Promise<PublishedPost | NotFound> {
  const payload = await getPayload();
  const file = await cachiPayload({
    key: `hdx-blog-file-v0-${filePath}`,
    ttl: ONE_WEEK,
    swr: ONE_YEAR,
    forceFresh,
    async getFreshValue(): Promise<DropboxFile | NotFound> {
      const dbx = await getDropbox();
      const path = `/Hannes/Blog/${filePath.replace(/\.html$/, ".md")}`;

      if (forceFresh) {
        await purgeParentFolders(filePath);
      }

      try {
        payload.logger.info(`Get fresh file from Dropbox: "${path}"`);
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
          status: "not-found" as const,
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
            if (tree.children.length === 0) {
              break;
            }

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
        title = filePath.split("/").at(-1)!;
      }

      if (!forceFresh) {
        await purgeParentFolders(filePath);
      }

      return {
        status: "found" as const,
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

  if (file.status === "not-found") {
    return file;
  }

  if (!includeUnpublished && (!file.published || file.published > Date.now())) {
    return { status: "not-found" };
  }

  const description =
    file.description ||
    (await cachiPayload({
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
    }));

  return {
    ...file,
    description,
    published: file.published || Infinity,
  };
}

async function purgeParentFolders(filePath: string) {
  // Purge all parent folders from cache so that they are updated next time
  const segments = filePath.split("/").slice(0, -1);
  segments.unshift("");
  for (let i = 0; i < segments.length + 1; i++) {
    await payloadCache.delete(
      `hdx-blog-folder-v0-${segments.slice(0, i).join("/").replace(/^\//, "")}`,
    );
  }
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
