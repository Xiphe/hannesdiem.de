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
      images: post.banner
        ? [{ url: post.banner.src, alt: post.banner.alt }]
        : undefined,
    },
  };
}

export default async function Notes({ params }: PageProps<{ slug: string[] }>) {
  const { slug } = await params;

  const post = await getPostFromDropbox({ slug });

  return (
    <>
      <Header
        floating={Boolean(post.banner)}
        sticky
        breadcrumbs={
          <div className="text-stone-400 dark:text-gray-400 inline">
            {["notes"]
              .concat(slug.slice(0, -1))
              .reverse()
              .reduce((children, slug, i, all) => {
                return (
                  <span className="text-stone-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                    <Link
                      key={i}
                      href={`/${all.slice(0, i + 1).join("/")}`}
                      className={clsx(focusStyles, "rounded-sm")}
                    >
                      <span className="text-xl text-stone-400 dark:text-gray-400">
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
      />

      {post.banner ? (
        <div className="h-[60vh] lg:h-[80vh] relative">
          <img
            className="absolute inset-0 size-full object-cover"
            {...post.banner}
          />
        </div>
      ) : null}

      <main
        className={clsx(
          "max-w-7xl mx-auto p-6 lg:px-8",
          post.banner
            ? "xl:-mt-12 bg-white dark:bg-gray-900 z-10 relative"
            : "xl:mt-8",
        )}
      >
        <div className="dark:text-white mb-8 lg:mb-24">
          <LocalTime
            timeStamp={post.published}
            className="opacity-50 italic text-sm mb-1 ml-1"
          />
          <h1 className="font-serif text-4xl lg:text-5xl">{post.title}</h1>
        </div>

        <div
          className={clsx(
            "mx-auto mb-24",
            "prose lg:prose-xl prose-stone  dark:prose-gray dark:prose-invert",
            "prose-pre:bg-stone-100 dark:prose-pre:bg-gray-950",
          )}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </main>
      <Footer />
    </>
  );
}
