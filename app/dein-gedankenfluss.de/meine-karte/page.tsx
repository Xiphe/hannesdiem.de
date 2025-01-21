import { Footer } from "@gf/components/Footer";
import { SchwingeLine } from "@gf/components/lines";
import { PageProps } from "@utils/types";
import { Metadata } from "next";
import { CardCreator } from "./CardCreator";
import { getFirst } from "./getFirst";

export async function generateMetadata({ searchParams }: PageProps) {
  const { title, body } = await searchParams;

  return {
    title: getFirst(title),
    description: getFirst(body),
    openGraph: {
      title: getFirst(title),
      description: getFirst(body),
    },
  } satisfies Metadata;
}

export default async function MeineKarte({ searchParams }: PageProps) {
  const { title, body, optional, category, owner } = await searchParams;

  return (
    <>
      <CardCreator
        owner={owner}
        title={title}
        body={body}
        optional={optional}
        category={category}
      />
      <SchwingeLine spaced strokeClassName="stroke-graphite-50" />
      <Footer />
    </>
  );
}
