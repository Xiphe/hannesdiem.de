import { getPayload } from "@utils/getPayload";
import { PageProps } from "@utils/types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { GdfPage } from "@/payload-types";
import { notFound } from "next/navigation";
import { cx } from "@gf/cx";
import { Metadata } from "next";
import { Header } from "@gf/components/Header";
import { Footer } from "@gf/components/Footer";
import { RioJaraLine, SchwingeLine } from "@gf/components/lines";
import { FlyInPaper } from "@gf/components/FlyInPaper";
import { Paper } from "@gf/components/Paper";

export async function generateMetadata(
  props: PageProps<{ slug: string[] }>,
): Promise<Metadata> {
  const page = await getPage((await (await props).params).slug);

  return {
    title: page.title,
  } satisfies Metadata;
}

async function getPage(slug: string[]) {
  const payload = await getPayload();

  const page = await payload.db.findOne<GdfPage>({
    collection: "gdf-pages",
    where: {
      slug: { equals: slug.join("/") },
    },
  });

  if (!page) {
    notFound();
  }

  return page;
}

export default async function ContentPage(
  props: PageProps<{ slug: string[] }>,
) {
  const { slug } = await props.params;

  const page = await getPage(slug);

  return (
    <>
      {page.header ? <Header /> : null}
      <div className={cx("pb-24 md:px-8", !page.header && "pt-24")}>
        {page.content?.map((block, i) => {
          switch (block.blockType) {
            case "richtext":
              return block.content ? (
                <div
                  key={block.id}
                  className={cx(
                    "prose md:prose-xl px-4 prose-invert",
                    "mx-auto",
                    block.decorative && "prose-licorice",
                  )}
                >
                  {i === 0 ? (
                    <h1 className="text-6xl md:text-7xl font-licorice font-normal mb-16 text-center">
                      {page.title}
                    </h1>
                  ) : null}
                  <RichText
                    key={block.id}
                    disableContainer
                    data={block.content}
                  />
                </div>
              ) : null;
            case "paper": {
              if (!block.content) {
                return null;
              }

              const Comp = block["fly-in"] === "none" ? Paper : FlyInPaper;

              return (
                <Comp
                  key={block.id}
                  sheet="xl"
                  className={cx(
                    "prose md:prose-xl",
                    block.decorative && "prose-licorice",
                  )}
                  direction={
                    (block["fly-in"] !== "none" && block["fly-in"]) || undefined
                  }
                >
                  {i === 0 ? (
                    <h1 className="text-6xl md:text-7xl text-center font-licorice font-normal text-caramel">
                      {page.title}
                    </h1>
                  ) : null}
                  <RichText disableContainer data={block.content} />
                </Comp>
              );
            }
          }
        })}
      </div>
      {page.footer ? (
        <>
          <div className="h-16 mt-32">
            <RioJaraLine strokeClassName="stroke-graphite-50" />
          </div>
          <Footer />
        </>
      ) : null}
    </>
  );
}
