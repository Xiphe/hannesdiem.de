import { cachiPayload } from "@utils/payloadCache";
import { getDropbox } from "../getDropbox";
import { ONE_WEEK, ONE_YEAR } from "@utils/time";
import { DropboxResponseError } from "dropbox";
import { join as joinPath } from "node:path";
import { getPostFromDropbox, PublishedPost } from "./getPostFromDropbox";
import { omitNullable } from "@utils/omitNullable";
import { ReactNode } from "react";
import { getPayload } from "@utils/getPayload";

interface Entry {
  title: string;
  description?: ReactNode;
  banner?: PublishedPost["banner"];
}

interface Info extends Entry {
  type: "info";
}
interface Folder extends Entry {
  type: "folder";
  link: string;
}
interface Post extends Entry {
  type: "post";
  published: number;
  tags: string[];
  link: string;
}

export type FolderIndex = Awaited<ReturnType<typeof getFolderFromDropbox>>;

export async function getFolderFromDropbox(folderPath: string) {
  const payload = await getPayload();
  return cachiPayload({
    key: `hdx-blog-folder-v0-${folderPath}`,
    ttl: ONE_WEEK,
    swr: ONE_YEAR,
    async getFreshValue() {
      try {
        const dbx = await getDropbox();
        const path = `/Hannes/Blog/${folderPath}`;
        payload.logger.info(`Get fresh folder from Dropbox: "${path}"`);
        const res = await dbx.filesListFolder({ path, limit: 1000 });
        if (!res.result.entries) {
          return {
            status: "not-found",
          } as const;
        }

        const data = (
          await Promise.all(
            res.result.entries.map(
              async (
                entry,
              ): Promise<null | Post | Info | (Folder | Post)[]> => {
                const entryPath = joinPath(folderPath, entry.name);

                if (entry[".tag"] === "folder") {
                  const res = await getFolderFromDropbox(entryPath);
                  if (res.status === "not-found") {
                    return null;
                  }

                  const folder: Folder = {
                    ...res.info,
                    type: "folder",
                    link: entryPath,
                  };
                  return [folder, ...res.folders, ...res.posts];
                }

                if (entry[".tag"] === "file" && entry.name === "index.md") {
                  const post = await getPostFromDropbox({
                    filePath: entryPath,
                    includeUnpublished: true,
                  });

                  if (post.status === "not-found") {
                    return null;
                  }

                  const info: Info = {
                    type: "info",
                    title: post.title,
                    description: post.description,
                    banner: post.banner,
                  };

                  return info;
                }

                if (entry[".tag"] === "file" && entryPath.endsWith(".md")) {
                  const postData = await getPostFromDropbox({
                    filePath: entryPath,
                  });

                  if (postData.status === "not-found") {
                    return null;
                  }

                  const post: Post = {
                    type: "post",
                    published: postData.published,
                    link: entryPath.replace(/\.md$/, ".html"),
                    title: postData.title,
                    tags: postData.tags,
                    description: postData.description,
                    banner: postData.banner,
                  };

                  return post;
                }

                return null;
              },
            ),
          )
        )
          .filter(omitNullable)
          .flat();

        const defaultInfo: Info = {
          type: "info",
          title: folderPath.split("/").at(-1)!,
        };
        const info =
          data.find((entry): entry is Info => entry.type === "info") ||
          defaultInfo;
        const posts = data
          .filter((entry): entry is Post => entry.type === "post")
          .sort((a, b) => {
            if (a.published > b.published) {
              return -1;
            } else if (b.published > a.published) {
              return 1;
            }
            return 0;
          });
        const folders = data
          .filter((entry): entry is Folder => entry.type === "folder")
          .sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            } else if (b.title < a.title) {
              return 1;
            }
            return 0;
          });

        return {
          status: "found" as const,
          info,
          posts,
          folders,
        };
      } catch (err) {
        if (
          !(err instanceof DropboxResponseError) ||
          !err.error.error_summary.startsWith("path/not_found/")
        ) {
          payload.logger.error(err);
        }

        return {
          status: "not-found",
        } as const;
      }
    },
  });
}
