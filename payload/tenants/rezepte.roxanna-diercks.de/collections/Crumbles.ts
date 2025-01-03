import { getPayload, type CollectionConfig } from "payload";
import { withUploadDir } from "@payload/utils/uploadDir";
import config from "@payload-config";

export const Crumbles: CollectionConfig = withUploadDir({
  slug: "rcps-crumbles",
  labels: {
    singular: "Crouton Recipe",
    plural: "Crouton Recipes",
  },
  upload: {},
  fields: [],
  hooks: {
    afterOperation: [
      async ({ operation, req, result }) => {
        if (operation === "create" && req.file?.name.endsWith(".crumb")) {
          const payload = await getPayload({ config });

          payload.jobs.queue({
            workflow: "rcps-import-recipe",
            input: { croutonRecipeId: result.id },
          });
        }
      },
    ],
  },
});
