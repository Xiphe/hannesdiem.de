import { complete } from "@payload/utils/complete";
import { BasePayload } from "payload";
import z from "zod";

const IngredientSchema = z.object({
  singular: z.string().describe("Singular form of the ingredient"),
  plural: z.string().describe("Plural form of the ingredient"),
});

export async function ensureIngredient(
  payload: BasePayload,
  ingredient: string,
) {
  const notes: string[] = [];
  const sanitizedIngredient = ingredient
    .replace(/\((.*?)\)/g, (_, capture) => {
      notes.push(capture.trim());
      return "";
    })
    .trim();

  const ingredientExists = await payload.find({
    collection: "rcps-ingredients",
    where: {
      or: [
        {
          singular: { like: sanitizedIngredient },
        },
        {
          plural: { like: sanitizedIngredient },
        },
        {
          aliases: { contains: sanitizedIngredient.toLowerCase() },
        },
      ],
    },
  });

  if (ingredientExists.totalDocs) {
    return { id: ingredientExists.docs[0].id, notes };
  }

  payload.logger.info(`Generating ingredient: ${sanitizedIngredient}`);
  const { data } = await complete(
    `In the context of cooking recipe ingredients, please provide translations ` +
      `for the ingredient "${sanitizedIngredient}" in English, German and Spanish.`,
    {
      schema: z.object({
        en: IngredientSchema.describe("English translations"),
        de: IngredientSchema.describe("German translations"),
        es: IngredientSchema.describe("Spanish translations"),
      }),
    },
  );
  payload.logger.debug(data);

  let id: number | undefined;
  for (const locale of Object.keys(data) as (keyof typeof data)[]) {
    id = (
      await payload[id ? "update" : "create"]({
        collection: "rcps-ingredients",
        id: id!,
        locale,
        data: { ...data[locale], aliases: [sanitizedIngredient.toLowerCase()] },
      })
    ).id;
  }
  payload.logger.info(`Created ingredient: ${data.en.singular} with id ${id}`);

  return { id: id!, notes };
}
