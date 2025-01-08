import { PageProps } from "@utils/types";
import assert from "node:assert";
import Header from "../../_src/components/Header";
import Link from "next/link";
import Footer from "../../_src/components/Footer";
import "./syntax.css";
import { Metadata } from "next";
import { getPostFromDropbox } from "./getPostFromDropbox";
import { LocalTime } from "@components/LocalTime";
import clsx from "clsx";
import { focusStyles } from "@hdx/styles/styles";
import { ReactNode } from "react";

export async function generateMetadata(
  props: PageProps<{ slug: string[] }>,
): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;
  const post = await getPostFromDropbox({ slug });

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
    },
  };
}

export default async function Notes({ params }: PageProps<{ slug: string[] }>) {
  const { slug } = await params;

  const post = await getPostFromDropbox({ slug });

  return (
    <>
      <Header
        breadcrumbs={
          <div className="text-stone-400 dark:text-gray-500 inline">
            {["notes"]
              .concat(slug.slice(0, -1))
              .reverse()
              .reduce((children, slug, i, all) => {
                return (
                  <span className="text-stone-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors">
                    <Link
                      key={i}
                      href={`/${all.slice(0, i + 1).join("/")}`}
                      className={clsx(focusStyles, "rounded-sm")}
                    >
                      <span className="text-xl text-stone-400 dark:text-gray-500">
                        /
                      </span>
                      {slug}
                    </Link>
                    {children}
                  </span>
                );
              }, null as ReactNode)}
          </div>
        }
      >
        <div className="dark:text-white mb-8 lg:mb-16 xl:mt-8">
          <LocalTime
            timeStamp={post.published}
            className="opacity-50 italic text-sm mb-1 ml-1"
          />
          <h1 className="font-serif text-4xl lg:text-5xl">{post.title}</h1>
        </div>
      </Header>

      <div
        className={clsx(
          "mx-auto p-6 lg:px-8 mb-24",
          "prose lg:prose-xl prose-stone  dark:prose-gray dark:prose-invert",
          "prose-pre:bg-stone-100 dark:prose-pre:bg-gray-950",
        )}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <Footer />
    </>
  );
}
