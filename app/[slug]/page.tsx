import { notFound } from "next/navigation";
import { content } from "@/content";
import { Release } from "@/components";
import { focusStyles, getOrigin } from "@/utils";
import Link from "next/link";
import clsx from "clsx";
import Footer from "@/components/Footer";

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
