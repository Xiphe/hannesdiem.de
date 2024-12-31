import { complete } from "@payload/utils/complete";
import { TaskConfig } from "payload";
import { generateQuantityType } from "./ensureQuantityType";

export const ExtractIngredients: TaskConfig<"rcps-extract-ingredients"> = {
  slug: "rcps-extract-ingredients",
  inputSchema: [
    {
      name: "recipe",
      type: "json",
      required: true,
    },
  ],
  outputSchema: [
    {
      name: "postID",
      type: "text",
      required: true,
    },
  ],
  async handler({ req: { payload, user }, input: { recipe } }) {
    const { ingredients } = recipe as any;

    const created = [];

    await Promise.all(
      ingredients.map(
        async ({
          ingredient: { name, ...ing },
          quantity: { amount, quantityType, ...rest },
        }: any) => {
          if (quantityType !== "RECIPE") {
            const quantityId = await generateQuantityType(
              payload,
              quantityType,
            );
            console.log({ quantityType, quantityId, name });
          } else {
            console.log({ name, amount, quantityType, rest, ing });
          }
        },
      ),
    );

    // for (const {
    //   ingredient: { name },
    //   quantity: { amount, quantityType },
    // } of ingredients) {
    //   break;
    // }

    return {
      output: {
        postID: "",
      },
      state: "succeeded",
    };
  },
};
