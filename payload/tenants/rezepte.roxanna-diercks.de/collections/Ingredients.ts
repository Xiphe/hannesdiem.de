import { type CollectionConfig } from "payload";

export const RecipeIngredient: CollectionConfig = {
  slug: "ingredients",
  typescript: {
    interface: "Ingredient",
  },
  labels: {
    singular: "Ingredient",
    plural: "Ingredients",
  },
  admin: {
    useAsTitle: "singular",
  },
  fields: [
    {
      name: "singular",
      label: "Name",
      required: true,
      localized: true,
      type: "text",
    },
    {
      name: "plural",
      label: "Plural",
      required: true,
      localized: true,
      type: "text",
    },
    {
      name: "aliases",
      label: "Alias",
      type: "text",
      hasMany: true,
    },
    {
      name: "recipe",
      label: "Recipe",
      type: "relationship",
      relationTo: "rcps-recipes",
    },
    {
      name: "affiliateUrl",
      label: "Affiliate URL",
      type: "text",
      validate: (value: unknown) => {
        if (value == null) {
          return true;
        }

        try {
          if (typeof value !== "string") {
            throw new Error("Url has to be string");
          }
          new URL(value);
          return true;
        } catch (error) {
          return "Please enter a valid URL.";
        }
      },
    },
  ],
};
