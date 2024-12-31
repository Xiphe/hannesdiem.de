import { fetchFile } from "@payload/utils/fetchFile";
import { WorkflowConfig } from "payload";

export const ImportRecipe: WorkflowConfig<"rcps-import-recipe"> = {
  slug: "rcps-import-recipe",
  inputSchema: [
    {
      name: "croutonRecipeId",
      type: "number",
      required: true,
    },
  ],
  async handler({ req: { payload }, job, tasks }) {
    const recipe = await payload.findByID({
      collection: "rcps-crumbles",
      id: job.input.croutonRecipeId,
    });

    if (!recipe || !recipe.url) {
      throw new Error("Recipe not found");
    }

    const res = await fetchFile(recipe.url);
    const data = await res.json();

    await tasks["rcps-extract-ingredients"]("1", {
      input: { recipe: data },
    });
  },
};
