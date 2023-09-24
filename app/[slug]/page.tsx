import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content";
import { Release } from "@/components";
import Footer from "@/components/Footer";
import { PageProps } from "@/utils/types";
import { generateReleaseMetadata } from "@/components/content/generateReleaseMetadata";

export async function generateMetadata(
  { params: { slug }, searchParams }: PageProps<{ slug: string }>,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = content[slug];

  if (!post) {
    return notFound();
  }

  switch (post.type) {
    case "release":
      return generateReleaseMetadata(post, searchParams, parent);
  }
}

export default function ContentPage({
  params: { slug },
  searchParams,
}: PageProps<{ slug: string }>) {
  const post = content[slug];

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main>
        {post.type === "release" ? (
          <Release {...post} slug={slug} searchParams={searchParams} />
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
