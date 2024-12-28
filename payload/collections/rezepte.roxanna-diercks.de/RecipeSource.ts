import { type CollectionConfig } from "payload";

export const RecipeSources: CollectionConfig = {
  slug: "recipe-sources",
  labels: {
    singular: "Source",
    plural: "Sources",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Name",
      required: true,
      type: "text",
    },
    {
      name: "url",
      label: "Url",
      type: "text",
      required: true,
      validate: (value: unknown) => {
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
