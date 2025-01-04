import { TaskConfig } from "payload";
import { ensureQuantityType } from "./ensureQuantityType";
import { ensureIngredient } from "./ensureIngredient";
import { Recipe } from "@/payload-types";
import { complete } from "@payload/utils/complete";
import { TranslationsSchema } from "../TranslateSectionTitle";

export type ExtractedIngredient = NonNullable<
  NonNullable<Recipe["ingredient-sections"]>[number]["section-ingredients"]
>[number];
export type IngredientSectionTitle = {
  type: "title";
  en: string;
  es: string;
  de: string;
};

export type ExtractedIngredients = (
  | ExtractedIngredient
  | IngredientSectionTitle
)[];

export function isIngredientSectionTitle(
  i: ExtractedIngredient | IngredientSectionTitle,
): i is IngredientSectionTitle {
  return "type" in i && i.type === "title";
}

export const ExtractIngredients: TaskConfig<"rcps-extract-ingredients"> = {
  slug: "rcps-extract-ingredients",
  inputSchema: [
    {
      name: "recipeName",
      type: "text",
      required: true,
    },
    {
      name: "ingredients",
      type: "json",
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
  async handler({ req: { payload }, input: { ingredients, recipeName } }) {
    const output = {
      ingredients: await Promise.all<ExtractedIngredients>(
        (ingredients as any).map(
          async ({
            ingredient: { name },
            quantity: { amount, quantityType } = {},
          }: any) => {
            if (quantityType === "SECTION") {
              return {
                type: "title",
                ...(
                  await complete(
                    `In the context of a cooking recipe for "${recipeName}", translate the ingredient section "${name}" to english, german and spanish.`,
                    { schema: TranslationsSchema },
                  )
                ).data,
              };
            }

            const { id: ingredientId, notes } = await ensureIngredient(
              payload,
              name,
            );

            return {
              quantity: amount,
              "quantity-type": quantityType
                ? await ensureQuantityType(payload, quantityType)
                : undefined,
              ingredient: ingredientId,
              note: notes.join(", "),
            };
          },
        ),
      ),
    };

    return {
      output,
      state: "succeeded",
    };
  },
};
