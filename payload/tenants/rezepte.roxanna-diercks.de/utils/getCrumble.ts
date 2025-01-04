import { fetchFile } from "@payload/utils/uploadDir";
import { BasePayload } from "payload";
import z from "zod";

export const CrumbleStepSchema = z.object({
  isSection: z.boolean(),
  step: z.string(),
  uuid: z.string(),
});

export type CrumbleStep = z.TypeOf<typeof CrumbleStepSchema>;

export const CrumbleIngredientSchema = z.object({
  name: z.string(),
  uuid: z.string(),
});
export type CrumbleIngredient = z.TypeOf<typeof CrumbleIngredientSchema>;

export const CrumbleQuantitySchema = z.object({
  amount: z.number(),
  quantityType: z.string(),
});
export type CrumbleQuantity = z.TypeOf<typeof CrumbleQuantitySchema>;

export const CrumbleIngredientWithQuantitySchema = z.object({
  quantity: CrumbleQuantitySchema.optional(),
  uuid: z.string(),
  ingredient: CrumbleIngredientSchema,
});
export type CrumbleIngredientWithQuantity = z.TypeOf<
  typeof CrumbleIngredientWithQuantitySchema
>;

export const CrumbleSchema = z.object({
  duration: z.number(),
  name: z.string(),
  steps: z.array(CrumbleStepSchema),
  images: z.array(z.string()),
  serves: z.number(),
  defaultScale: z.number(),
  cookingDuration: z.number(),
  ingredients: z.array(CrumbleIngredientWithQuantitySchema),
  uuid: z.string(),
  neutritionalInfo: z.string().optional(),
  notes: z.string().optional(),
  webLink: z.string().optional(),
  sourceName: z.string().optional(),
});
export type Crumble = z.TypeOf<typeof CrumbleSchema>;

export async function getCruble(payload: BasePayload, id: number) {
  const recipe = await payload.findByID({
    collection: "rcps-crumbles",
    id,
  });
  if (!recipe || !recipe.url) {
    throw new Error(`Crumble Recipe with id ${id} not found`);
  }
  const res = await fetchFile(recipe.url);
  return res.json() as Promise<Crumble>;
}
