import { TaskConfig } from "payload";
import { fileTypeFromBuffer } from "file-type";
import { toSlug } from "@payload/utils/toSlug";
import { createFile, fetchFile } from "@payload/utils/uploadDir";

export const ImportRecipeImages: TaskConfig<"rcps-import-recipe-images"> = {
  slug: "rcps-import-recipe-images",
  inputSchema: [
    {
      name: "recipe-id",
      type: "number",
      required: true,
    },
  ],
  outputSchema: [
    {
      name: "ids",
      type: "json",
      required: true,
    },
  ],
  async handler({ req: { payload }, input: { "recipe-id": recipeId } }) {
    const recipe = await payload.findByID({
      collection: "rcps-crumbles",
      id: recipeId,
    });
    if (!recipe || !recipe.url) {
      throw new Error("Recipe not found");
    }
    const res = await fetchFile(recipe.url);
    const data = await res.json();

    const imageIds: number[] = [];
    for await (const base64EncodedImage of data.images) {
      const imageBuffer = Buffer.from(base64EncodedImage, "base64");
      const fileTypeResult = await fileTypeFromBuffer(imageBuffer);
      if (!fileTypeResult) {
        payload.logger.warn("Skipping import of image with unknown file type");
        continue;
      }
      if (!fileTypeResult.mime.startsWith("image/")) {
        payload.logger.warn(
          `Skipping import of image with ${fileTypeResult.mime} file type`,
        );
        continue;
      }

      const formData = new FormData();
      formData.append(
        "file",
        new Blob([imageBuffer], { type: fileTypeResult.mime }),
        `${toSlug(data.name)}.${fileTypeResult.ext}`,
      );
      const img = await createFile("rcps-images", formData);

      imageIds.push(img.id);
    }

    return {
      output: {
        ids: imageIds,
      },
      state: "succeeded",
    };
  },
};
