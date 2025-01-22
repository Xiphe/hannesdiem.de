import { Footer } from "@gf/components/Footer";
import { SchwingeLine } from "@gf/components/lines";
import { PageProps } from "@utils/types";
import { Metadata } from "next";
import { CardCreator } from "./CardCreator";
import { getFirst } from "./getFirst";

export async function generateMetadata({ searchParams }: PageProps) {
  const p = await searchParams;

  const title = getFirst(p.title) || "Deine eigene Karte";
  const description =
    getFirst(p.body) || "Erstelle und teile deine eigene Gedankenfluss Karte";

  return {
    title,
    description,
    openGraph: {
      title,
      images: [
        {
          url: `/meine-karte/img?${new URLSearchParams({
            title,
            body: description,
            scale: "0.8",
            optional: getFirst(p.optional) || "",
            category: getFirst(p.category) || "",
          }).toString()}`,
        },
      ],
      description,
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
