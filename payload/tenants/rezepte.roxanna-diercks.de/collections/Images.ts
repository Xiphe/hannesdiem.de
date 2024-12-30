import type { CollectionConfig } from "payload";
import { withUploadDir } from "@payload/utils/uploadDir";

export const Images: CollectionConfig = withUploadDir({
  slug: "images",
  labels: {
    singular: "Image",
    plural: "Images",
  },
  upload: {
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
});
