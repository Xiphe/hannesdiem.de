import { notFound } from "next/navigation";
import { getFolderFromDropbox } from "./[...slug]/getFolderFromDropbox";
import { ListPosts } from "./[...slug]/List";
import { Fragment, useMemo } from "react";
import { shuffleArray } from "@utils/shuffleArray";

export default async function NotesIndex() {
  const posts = await getFolderFromDropbox("", Infinity);
  if (posts.status === "not-found") {
    return notFound();
  }

  const tagCounter: Record<string, number> = {};

  posts.posts.forEach(({ tags }) => {
    tags.forEach((tag) => {
      if (!tagCounter[tag]) {
        tagCounter[tag] = 0;
      }
      tagCounter[tag]++;
    });
  });

  const tagsByUsage = shuffleArray(Object.entries(tagCounter))
    .sort(([_, a], [__, b]) => b - a)
    .map(([t]) => t);

  return (
    <ListPosts
      slug={[]}
      info={{
        type: "info",
        title: "My Public Notes",
        description: (
          <>
            Including but not limited to{" "}
            {tagsByUsage.slice(0, 4).map((t) => (
              <Fragment key={t}>{t}, </Fragment>
            ))}{" "}
            and {tagsByUsage[4]}.
          </>
        ),
      }}
      status={posts.status}
      posts={posts.posts}
      folders={[]}
    />
  );
}
