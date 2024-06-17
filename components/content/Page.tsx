import { type Page } from "@/content";
import { getOrigin } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";
import { LocalTime } from "../LocalTime";

export async function generatePageMetadata(
  page: Page,
  searchParams: Record<string, string | string[]>,
  parent: ResolvingMetadata
) {
  const url = new URL(getOrigin());
  url.pathname = page.slug;

  return {
    title: page.title,
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
  title,
  date,
  dateFormat,
  subtitle,
  Content,
  description,
}: Page & {
  searchParams: Record<string, string | string[]>;
}) {
  return (
    <div className="prose lg:prose-xl dark:prose-invert mx-auto pt-16 pb-24">
      <h1 className="mb-0 lg:mb-0">{title}</h1>
      {subtitle ? (
        <h2 className="mt-2 mb-0 lg:mt-4 lg:mb-0">{subtitle}</h2>
      ) : null}
      {date ? <LocalTime timeStamp={date} format={dateFormat} /> : null}
      <Content />
    </div>
  );
}
