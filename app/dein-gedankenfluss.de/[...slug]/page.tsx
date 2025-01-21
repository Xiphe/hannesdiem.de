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
      <div className={cx("pb-24 px-4 md:px-8", !page.header && "pt-24")}>
        <h1 className="text-6xl md:text-7xl font-licorice mb-16 text-center">
          {page.title}
        </h1>
        {page.content?.map((block) => {
          switch (block.blockType) {
            case "richtext":
              return block.content ? (
                <RichText
                  key={block.id}
                  className={cx(
                    "prose prose-paper dark:prose-invert",
                    "mx-auto",
                  )}
                  data={block.content}
                />
              ) : null;
          }
        })}
      </div>
      {page.footer ? (
        <>
          <div className="h-16 mt-32">
            <RioJaraLine />
          </div>
          <Footer />
        </>
      ) : null}
    </>
  );
}
