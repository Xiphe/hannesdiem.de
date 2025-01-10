import clsx from "clsx";
import { BlogLayout } from "../BlogLayout";
import { SkeletonParagraph, SkeletonWord } from "@components/SkeletonParagraph";

export default async function Loading() {
  return (
    <BlogLayout slug={[]}>
      <div className="dark:text-white mb-8 lg:mb-24">
        <div className="opacity-50 italic text-sm mb-1 ml-1">&nbsp;</div>
        <h1 className="font-serif text-4xl lg:text-5xl opacity-30">
          <SkeletonWord min={5} max={17} />
        </h1>
      </div>

      <div
        className={clsx(
          "mb-24 opacity-30",
          "prose lg:prose-xl prose-stone  dark:prose-gray dark:prose-invert",
          "prose-pre:bg-stone-100 dark:prose-pre:bg-gray-950",
        )}
      >
        <p>
          <SkeletonParagraph />
        </p>
        <p>
          <SkeletonParagraph />
        </p>
        <p>
          <SkeletonParagraph />
        </p>
      </div>
    </BlogLayout>
  );
}
