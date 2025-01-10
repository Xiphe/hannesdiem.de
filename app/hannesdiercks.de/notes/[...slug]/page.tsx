import { PageProps } from "@utils/types";
import "./syntax.css";
import { Metadata } from "next";
import { getPostFromDropbox } from "./getPostFromDropbox";
import { Note } from "./Note";
import { List } from "./List";
import { notFound } from "next/navigation";
import { getFolderFromDropbox } from "./getFolderFromDropbox";

export async function generateMetadata(
  props: PageProps<{ slug: string[] }>,
): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  if (!slug.join("/").endsWith(".html")) {
    const index = await getFolderFromDropbox(slug.join("/"));
    if (index.status === "not-found") {
      return notFound();
    }

    return {
      title: index.info.title,
      description:
        typeof index.info.description === "string"
          ? index.info.description
          : undefined,
    };
  }

  const post = await getPostFromDropbox({
    filePath: slug.join("/").replace(/\.html$/, ".md"),
  });

  if (post.status === "not-found") {
    return notFound();
  }

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

export default async function Notes({
  params,
  searchParams,
}: PageProps<{ slug: string[] }>) {
  const { slug } = await params;
  const { force } = await searchParams;

  if (!slug.join("/").endsWith(".html")) {
    return <List slug={slug} />;
  }

  return <Note slug={slug} forceFresh={force === "fresh"} />;
}
