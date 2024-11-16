import type { CollectionConfig } from "payload";

export const Persons: CollectionConfig = {
  slug: "persons",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "link",
      type: "text",
    },
    { name: "ogProfile", type: "text" },
  ],
  graphQL: {
    pluralName: "Persons",
    singularName: "Person",
  },
};
