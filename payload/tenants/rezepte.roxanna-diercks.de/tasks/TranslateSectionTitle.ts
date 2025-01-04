import { complete } from "@payload/utils/complete";
import { TaskConfig } from "payload";
import { z } from "zod";

export const TranslationsSchema = z.object({
  en: z.string(),
  de: z.string(),
  es: z.string(),
});

export type TranslatedTitle = z.TypeOf<typeof TranslationsSchema>;

export const TranslateSectionTitle: TaskConfig<"rcps-translate-section-title"> =
  {
    slug: "rcps-translate-section-title",
    inputSchema: [
      {
        name: "title",
        type: "text",
        required: true,
      },
    ],
    outputSchema: [
      {
        name: "translations",
        type: "json",
        required: true,
      },
    ],
    async handler({ req: { payload }, input: { title } }) {
      if (title.trim() === "") {
        return {
          output: {
            translations: {
              en: "",
              de: "",
              es: "",
            },
          },
          state: "succeeded",
        };
      }

      payload.logger.info(`Translating section title: ${title}`);
      const { data } = await complete(
        `In the context of a recipe, please translate the section title "${title}"
      to english, german and spanish`,
        {
          schema: TranslationsSchema,
        },
      );
      payload.logger.debug(data);

      return {
        output: { translations: data },
        state: "succeeded",
      };
    },
  };
