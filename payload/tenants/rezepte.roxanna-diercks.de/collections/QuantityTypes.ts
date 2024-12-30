import { type CollectionConfig } from "payload";

export const RecipeQuantityType: CollectionConfig = {
  slug: "quantity-types",
  typescript: {
    interface: "QuantityType",
  },
  labels: {
    singular: "Quantity Type",
    plural: "Quantity Types",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Name",
      localized: true,
      required: true,
      type: "text",
    },
    {
      name: "singular",
      label: "Singular",
      localized: true,
      type: "text",
    },
    {
      name: "plural",
      label: "Plural",
      localized: true,
      type: "text",
    },
    { name: "fraction", localized: true, label: "Fraction", type: "text" },
  ],
};
