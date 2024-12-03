import { getPayload } from "@utils/getPayload";
import { PageProps } from "@utils/types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { GdfPage } from "@/payload-types";
import { notFound } from "next/navigation";
import { cx } from "@utils/cx";
import { Metadata } from "next";

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
    <div className="py-24 px-4 md:px-8">
      <h1 className="text-6xl md:text-7xl font-licorice mb-16 text-center">
        {page.title}
      </h1>
      {page.content?.map((block) => {
        switch (block.blockType) {
          case "richtext":
            return block.content ? (
              <RichText
                key={block.id}
                className={cx("prose dark:prose-invert", "mx-auto")}
                data={block.content}
              />
            ) : null;
        }
      })}
    </div>
  );
}
