import { complete } from "@payload/utils/complete";
import { TaskConfig } from "payload";
import { z } from "zod";
import { Translated } from "../utils/i18n";

export const TranslationsSchema = z.object({
  en: z.string(),
  de: z.string(),
  es: z.string(),
});

export type TranslatedText = Translated<string>;

export const Translate: TaskConfig<"rcps-translate"> = {
  slug: "rcps-translate",
  inputSchema: [
    {
      name: "string",
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
  async handler({ req: { payload }, input: { string } }) {
    const { data } = await complete(
      `In the context of a recipe, please translate "${string}" to english, german and spanish`,
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
