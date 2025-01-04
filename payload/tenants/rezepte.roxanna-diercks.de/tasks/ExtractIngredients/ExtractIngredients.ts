import { BasePayload, TaskConfig } from "payload";
import { ensureQuantityType } from "./ensureQuantityType";
import { ensureIngredient } from "./ensureIngredient";
import { Recipe } from "@/payload-types";
import { complete } from "@payload/utils/complete";
import { Crumble, getCruble } from "../../utils/getCrumble";
import { LANGUAGES, Translated } from "../../utils/i18n";
import { cached } from "@payload/utils/cachedFn";
import { TranslationsSchema } from "../Translate";

type Ingredient = NonNullable<
  NonNullable<Recipe["ingredient-sections"]>[number]["section-ingredients"]
>[number];

export type IngredientRelation = {
  type: "ingredient";
  data: Translated<Ingredient>;
};
export type IngredientSectionTitle = {
  type: "title";
  title: Translated<string>;
};

export type ExtractedIngredients = (
  | IngredientRelation
  | IngredientSectionTitle
)[];

export const ExtractIngredients: TaskConfig<"rcps-extract-ingredients"> = {
  slug: "rcps-extract-ingredients",
  inputSchema: [
    {
      name: "recipeId",
      type: "number",
      required: true,
    },
  ],
  outputSchema: [
    {
      name: "ingredients",
      type: "json",
      required: true,
    },
  ],
  async handler({ req: { payload }, input: { recipeId } }) {
    return {
      output: {
        ingredients: await extractIngredients(
          await getCruble(payload, recipeId),
          payload,
        ),
      },
      state: "succeeded",
    };
  },
};

export const extractIngredients = cached(
  (
    { ingredients, name: recipeName }: Crumble,
    payload: BasePayload,
    generate: boolean = true,
  ) => {
    return Promise.all(
      ingredients.map(
        async ({
          ingredient: { name },
          quantity: { amount, quantityType } = {},
        }): Promise<IngredientRelation | IngredientSectionTitle> => {
          if (quantityType === "SECTION") {
            payload.logger.info(`Translating ingredint section ${name}`);
            return {
              type: "title",
              title: generate
                ? (
                    await complete(
                      `In the context of a cooking recipe for "${recipeName}",
translate the ingredient section "${name}" to english, german and spanish.`,
                      { schema: TranslationsSchema },
                    )
                  ).data
                : { en: "", es: "", de: "" },
            };
          }

          const { id: ingredientId, notes } = await ensureIngredient(
            payload,
            name,
            generate,
          );

          const translatedNotes =
            notes.length && generate
              ? (
                  await complete(
                    `In the context of a cooking recipe for "${recipeName}", please translate the note "${notes.join()}" to english, german and spanish.`,
                    { schema: TranslationsSchema },
                  )
                ).data
              : {
                  en: "",
                  de: "",
                  es: "",
                };

          const resolvedQuantityType = quantityType
            ? await ensureQuantityType(payload, quantityType, generate)
            : undefined;

          const base = {
            quantity: amount,
            ingredient: ingredientId,
            quantityType: resolvedQuantityType,
          };

          return {
            type: "ingredient",
            data: {
              en: {
                ...base,
                note: translatedNotes.en,
              },
              de: {
                ...base,
                note: translatedNotes.de,
              },
              es: {
                ...base,
                note: translatedNotes.es,
              },
            },
          };
        },
      ),
    );
  },
  ({ uuid }) => uuid,
);
