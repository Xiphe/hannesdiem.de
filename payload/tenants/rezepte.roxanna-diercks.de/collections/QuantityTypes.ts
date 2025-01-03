import { type CollectionConfig } from "payload";

export const RecipeQuantityType: CollectionConfig = {
  slug: "rcps-quantity-types",
  typescript: {
    interface: "QuantityType",
  },
  labels: {
    singular: "Quantity Type",
    plural: "Quantity Types",
  },
  admin: {
    useAsTitle: "singular",
  },
  fields: [
    {
      name: "singular",
      label: "Singular",
      required: true,
      localized: true,
      type: "text",
    },
    {
      name: "plural",
      label: "Plural",
      localized: true,
      type: "text",
    },
    {
      name: "unit",
      label: "Unit",
      localized: true,
      type: "text",
    },
    { name: "fraction", localized: true, label: "Fraction", type: "text" },
    {
      name: "hidden",
      label: "Hidden Labels",
      type: "select",
      localized: true,
      hasMany: true,
      options: ["singular", "plural", "fraction"],
    },
    {
      name: "aliases",
      label: "Aliases",
      hasMany: true,
      type: "text",
    },
  ],
};
