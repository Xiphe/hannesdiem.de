import { type Page } from "@hd/content";
import { getOrigin } from "@utils/origin";
import { Metadata, ResolvingMetadata } from "next";

export async function generatePageMetadata(
  page: Page,
  searchParams: Record<string, string | string[]>,
  parent: ResolvingMetadata,
) {
  const url = new URL(await getOrigin());
  url.pathname = page.slug;

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      images: page.ogImage,
      url: url.href,
    },
  } satisfies Metadata;
}

export function Page({
  Content,
}: Page & {
  searchParams: Record<string, string | string[]>;
}) {
  return <Content />;
}
