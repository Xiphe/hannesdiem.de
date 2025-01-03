import type { CollectionConfig } from "payload";

export const Genres: CollectionConfig = {
  slug: "hdm-genres",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
