import { notFound } from "next/navigation";
import { BlogLayout } from "../BlogLayout";
import { FolderIndex, getFolderFromDropbox } from "./getFolderFromDropbox";
import Link from "next/link";
import { focusStyles } from "@hdx/styles/styles";
import clsx from "clsx";
import { LocalTime } from "@components/LocalTime";

type NoteProps = {
  slug: string[];
};

export async function List({ slug }: NoteProps) {
  const index = await getFolderFromDropbox(slug.join("/"));

  return <ListPosts slug={slug} {...index} />;
}

export function ListPosts({ slug, ...index }: NoteProps & FolderIndex) {
  if (index.status === "not-found" || index.posts.length === 0) {
    return notFound();
  }

  return (
    <BlogLayout slug={slug} banner={index.info.banner}>
      <div className="mb-8 lg:mb-12">
        <h1 className="font-serif text-4xl lg:text-5xl">{index.info.title}</h1>
        <p className="mt-4 opacity-80">
          {index.info.description || "My notes about " + index.info.title}
        </p>
      </div>

      <ul className="mb-16">
        {index.posts.map((entry, i, list) => (
          <li
            key={entry.link}
            className={clsx(
              "border dark:border-0 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-950",
              i === 0 && "rounded-t",
              i === 0 && list.length > 1 && "border-b-0",
              i === list.length - 1 ? "rounded-b" : "border-b-0",
              i !== 0 && "dark:border-t",
            )}
          >
            <Link
              href={`/notes/${entry.link}`}
              className={clsx("block w-full rounded ", focusStyles)}
            >
              <span className="block p-4 md:p-6 max-w-5xl">
                {entry.type === "post" ? (
                  <LocalTime
                    timeStamp={entry.published}
                    className="block text-sm italic text-stone-500 dark:text-gray-400 mb-1"
                  />
                ) : null}
                <span className="text-lg md:text-xl font-bold flex items-center">
                  {entry.title}
                </span>
              </span>
              {entry.description ? (
                <span className="block p-4 md:p-6 !pt-0 text-stone-600 dark:text-gray-300 max-w-5xl">
                  {entry.description}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </BlogLayout>
  );
}
