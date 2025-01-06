import { Block } from "payload";

export const IngredientLink: Block = {
  slug: "rcps-ingredient-link",
  labels: {
    singular: "Ingredient",
    plural: "Ingredients",
  },
  admin: {
    components: {
      Label:
        "@payload/tenants/rezepte.roxanna-diercks.de/components/IngredientLinkLabel.tsx",
    },
  },
  fields: [
    {
      name: "ingredient",
      label: "Ingredient",
      type: "relationship",
      relationTo: "rcps-ingredients",
      required: true,
    },
    {
      name: "quantity-type",
      label: "Quantity Type",
      type: "relationship",
      relationTo: "rcps-quantity-types",
    },
    {
      name: "quantity",
      type: "number",
    },
    {
      name: "link-text",
      type: "text",
    },
  ],
};
