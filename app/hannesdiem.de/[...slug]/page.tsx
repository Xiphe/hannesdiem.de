import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import {
  Release,
  generateReleaseMetadata,
  Song,
  generateSongMetadata,
  Footer,
  generatePageMetadata,
  Page,
} from "@hd/components";

import { PageProps } from "@utils/types";
import { getPost } from "./getPost";

export async function generateMetadata(
  props: PageProps<{ slug: string }>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { slug } = params;

  const post = getPost(slug);

  if (!post) {
    return notFound();
  }

  switch (post.type) {
    case "release":
      return generateReleaseMetadata(post, searchParams, parent);
    case "song":
      return generateSongMetadata(post, searchParams, parent);
    case "page":
      return generatePageMetadata(post, searchParams, parent);
  }
}

export default async function ContentPage(
  props: PageProps<{ slug: string | string[] }>,
) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { slug } = params;

  const post = getPost(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main>
        {post.type === "release" ? (
          <Release {...post} searchParams={searchParams} />
        ) : post.type === "song" ? (
          <Song {...post} searchParams={searchParams} />
        ) : post.type === "page" ? (
          <Page {...post} searchParams={searchParams} />
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
