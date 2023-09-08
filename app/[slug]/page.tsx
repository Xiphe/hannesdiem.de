import { notFound } from "next/navigation";
import { content } from "@/content";
import { Release } from "@/components";

interface Props {
  params: { slug: string };
  searchParams: Record<string, string | string[]>;
}

export default function ContentPage({ params: { slug }, searchParams }: Props) {
  const post = content[slug];

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b gradient-full">
      {post.type === "release" ? (
        <Release {...post} slug={slug} searchParams={searchParams} />
      ) : null}
    </main>
  );
}
