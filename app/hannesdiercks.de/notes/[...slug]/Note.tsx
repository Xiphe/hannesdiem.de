import { getPostFromDropbox } from "./getPostFromDropbox";
import clsx from "clsx";
import { LocalTime } from "@components/LocalTime";
import { notFound } from "next/navigation";
import { BlogLayout } from "../BlogLayout";

type NoteProps = {
  slug: string[];
  forceFresh?: boolean;
};

export async function Note({ slug, forceFresh }: NoteProps) {
  const post = await getPostFromDropbox({
    filePath: slug.join("/").replace(/\.html/, ".md"),
    forceFresh,
  });

  if (post.status === "not-found") {
    return notFound();
  }

  return (
    <BlogLayout slug={slug} banner={post.banner}>
      <div className="dark:text-white mb-8 lg:mb-24">
        <LocalTime
          timeStamp={post.published}
          className="opacity-50 italic text-sm mb-1 ml-1"
        />
        <h1 className="font-serif text-4xl lg:text-5xl">{post.title}</h1>
      </div>

      <div
        className={clsx(
          "mb-24",
          "prose lg:prose-xl prose-stone  dark:prose-gray dark:prose-invert",
          "prose-pre:bg-stone-100 dark:prose-pre:bg-gray-950",
        )}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </BlogLayout>
  );
}
