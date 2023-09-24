import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content";
import {
  Release,
  generateReleaseMetadata,
  Song,
  generateSongMetadata,
} from "@/components";
import Footer from "@/components/Footer";
import { PageProps } from "@/utils/types";

export async function generateMetadata(
  { params: { slug }, searchParams }: PageProps<{ slug: string }>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = content[joinedSlug(slug)];

  if (!post) {
    return notFound();
  }

  switch (post.type) {
    case "release":
      return generateReleaseMetadata(post, searchParams, parent);
    case "song":
      return generateSongMetadata(post, searchParams, parent);
  }
}

export default function ContentPage({
  params: { slug },
  searchParams,
}: PageProps<{ slug: string }>) {
  const post = content[joinedSlug(slug)];

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
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

function joinedSlug(slug: string[] | string) {
  return Array.isArray(slug) ? slug.join("/") : slug;
}
