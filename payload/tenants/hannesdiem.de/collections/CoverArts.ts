import type { CollectionConfig } from "payload";
import { withUploadDir } from "@payload/utils/uploadDir";

export const CoverArts: CollectionConfig = withUploadDir({
  slug: "cover-arts",
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
});
