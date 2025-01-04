import { complete } from "@payload/utils/complete";
import { BasePayload } from "payload";
import z from "zod";

const QuantityTypeSchema = z.object({
  singular: z
    .string()
    .describe(
      "The label used for a single unit of this type. Example: [1] Tablespoon [of salt]",
    ),
  plural: z
    .string()
    .describe(
      "The label used for multiple things of this type. Example: [10] Tablespoons [of salt]",
    ),
  fraction: z
    .string()
    .describe(
      "The label used for a fraction of things of this type. Example: [0.5] Tablespoons [of salt]",
    ),
  unit: z
    .string()
    .describe(
      "The singular unit or symbol used in context of a human readable recipe. Example: [1] tbsp [salt]",
    ),
});

const cache: Record<string, Promise<number> | undefined> = {};
export async function ensureQuantityType(
  payload: BasePayload,
  quantityAbr: string,
  generate: boolean = true,
): Promise<number> {
  if (quantityAbr === "RECIPE") {
    quantityAbr = "ITEM";
  }

  if (cache[quantityAbr]) {
    return cache[quantityAbr]!;
  }

  cache[quantityAbr] = new Promise<number>(async (resolve, reject) => {
    try {
      const quantityTypeExists = await payload.find({
        collection: "rcps-quantity-types",
        where: {
          aliases: { contains: quantityAbr.toLowerCase() },
        },
      });

      if (quantityTypeExists.totalDocs) {
        return resolve(quantityTypeExists.docs[0].id);
      }

      if (!generate) {
        throw new Error(
          `Could not find quantity type ${quantityAbr} and generate is not allowed`,
        );
      }

      payload.logger.info(`Generating quantity type: ${quantityAbr}`);
      const { data } = await complete(
        `In the context of cooking recipe ingredients, please provide short ` +
          `human-readable labels for the quantity type with the abbreviation ` +
          `"${quantityAbr}" in english, german and spanish.` +
          `Provide only the concise label how it would be used in a recipe without quantities.`,
        {
          schema: z.object({
            en: QuantityTypeSchema.describe("English labels"),
            de: QuantityTypeSchema.describe("German labels"),
            es: QuantityTypeSchema.describe("Spanish labels"),
          }),
        },
      );
      payload.logger.debug(data);

      let id: number | undefined;
      for (const locale of Object.keys(data) as (keyof typeof data)[]) {
        id = (
          await payload[id ? "update" : "create"]({
            collection: "rcps-quantity-types",
            id: id!,
            locale,
            data: { ...data[locale], aliases: [quantityAbr.toLowerCase()] },
          })
        ).id;
      }
      payload.logger.info(
        `Created quantity type: ${data.en.singular} with id ${id}`,
      );

      resolve(id!);
    } catch (err) {
      reject(err);
      delete cache[quantityAbr];
    }
  });

  return cache[quantityAbr]!;
}
