import { type Page } from "@/content";
import { getOrigin } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";

export async function generatePageMetadata(
  page: Page,
  searchParams: Record<string, string | string[]>,
  parent: ResolvingMetadata
) {
  const url = new URL(getOrigin());
  url.pathname = page.slug;

  return {
    title: page.externalTitle ?? page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
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
