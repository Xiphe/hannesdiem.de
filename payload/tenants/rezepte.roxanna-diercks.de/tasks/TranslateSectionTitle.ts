import { complete } from "@payload/utils/complete";
import { TaskConfig } from "payload";
import { getCruble } from "../utils/getCrumble";
import { Translated } from "../utils/i18n";
import { TranslationsSchema } from "./Translate";

export type TranslatedTitle = Translated<string>;

export const TranslateSectionTitle: TaskConfig<"rcps-translate-section-title"> =
  {
    slug: "rcps-translate-section-title",
    inputSchema: [
      {
        name: "recipeId",
        type: "number",
        required: true,
      },
      {
        name: "stepId",
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
    async handler({ req: { payload }, input: { recipeId, stepId } }) {
      const { steps } = await getCruble(payload, recipeId);
      const step = steps.find(({ uuid }) => uuid === stepId);

      if (!step) {
        throw new Error(`Could not find step ${stepId} in recipe ${recipeId}`);
      }
      const { step: title } = step;

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
