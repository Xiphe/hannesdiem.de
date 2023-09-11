import { notFound } from "next/navigation";
import { content } from "@/content";
import { Release } from "@/components";
import Footer from "@/components/Footer";
import { PageProps } from "@/utils/types";

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
