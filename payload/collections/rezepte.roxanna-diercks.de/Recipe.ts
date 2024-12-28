import { TimerBlock } from "@payload/blocks/timer/TimerBlock";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { randomUUID } from "crypto";
import { type CollectionConfig } from "payload";

export const Recipes: CollectionConfig = {
  slug: "recipes",
  versions: {
    maxPerDoc: 25,
    drafts: {
      autosave: true,
      validate: false,
    },
  },
  labels: {
    singular: "Recipe",
    plural: "Recipes",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "uuid",
      label: "UUID",
      type: "text",
      unique: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      localized: true,
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "duration",
          label: "Prep Duration",
          type: "number",
          admin: {
            width: "20%",
            description: "Overall “prep” duration in minutes, if needed.",
          },
        },
        {
          name: "cookingDuration",
          label: "Cooking Duration",
          type: "number",
          admin: {
            width: "20%",
            description: "Overall “cooking” duration in minutes, if needed.",
          },
        },
        {
          name: "serves",
          label: "Servings",
          type: "number",
          admin: {
            width: "10%",
          },
        },
        {
          name: "defaultScale",
          label: "Default Scale",
          type: "number",
          defaultValue: 1,
          admin: {
            width: "10%",
          },
        },
        {
          name: "source",
          label: "Source",
          type: "relationship",
          relationTo: "recipe-sources",
          admin: {
            width: "40%",
          },
        },
      ],
    },
    {
      name: "ingredient-sections",
      label: "Ingredients",
      type: "array",
      labels: {
        singular: "Ingredient Section",
        plural: "Ingredient Sections",
      },
      admin: {
        components: {
          Label:
            "@payload/collections/rezepte.roxanna-diercks.de/components/IngredientSectionLabel.tsx",
          RowLabel: "@payload/components/TitleRowLabel.tsx",
        },
      },
      fields: [
        {
          name: "title",
          label: "Section Name",
          localized: true,
          type: "text",
          admin: {
            description: "Can be empty when there is only one section",
          },
        },
        {
          name: "section-ingredients",
          label: "Ingredients",
          labels: {
            singular: "Ingredient",
            plural: "Ingredients",
          },
          admin: {
            components: {
              RowLabel:
                "@payload/collections/rezepte.roxanna-diercks.de/components/IngredientRowLabel.tsx",
            },
          },
          type: "array",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "quantity",
                  required: true,
                  label: "Quantity",
                  type: "number",
                  admin: {
                    width: "10%",
                  },
                },
                {
                  name: "quantity-type",
                  required: true,
                  label: "Quantity Type",
                  type: "relationship",
                  relationTo: "recipe-quantity-type",
                  admin: {
                    width: "30%",
                  },
                },
                {
                  name: "ingredient",
                  required: true,
                  label: "Ingredient",
                  type: "relationship",
                  relationTo: "recipe-ingredient",
                  admin: {
                    width: "60%",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "step-sections",
      label: "Steps",
      labels: { singular: "Step Section", plural: "Step Sections" },
      type: "array",
      admin: {
        components: {
          RowLabel: "@payload/components/TitleRowLabel.tsx",
        },
      },
      fields: [
        {
          name: "title",
          label: "Section Name",
          localized: true,
          type: "text",
          admin: {
            description: "Can be empty when there is only one section",
          },
        },
        {
          name: "section-steps",
          label: "Steps",
          labels: { singular: "Step", plural: "Steps" },
          type: "array",
          fields: [
            {
              type: "richText",
              name: "step",
              localized: true,
              label: false,
              editor: lexicalEditor({
                features({ defaultFeatures }) {
                  return [
                    ...defaultFeatures,
                    BlocksFeature({
                      inlineBlocks: [
                        TimerBlock,
                        {
                          slug: "ingredient-link",
                          labels: {
                            singular: "Ingredient",
                            plural: "Ingredients",
                          },
                          admin: {
                            components: {
                              Label:
                                "@payload/collections/rezepte.roxanna-diercks.de/components/IngredientLinkLabel.tsx",
                            },
                          },
                          fields: [
                            {
                              name: "ingredient",
                              label: false,
                              type: "relationship",
                              relationTo: "recipe-ingredient",
                              required: true,
                            },
                            {
                              name: "fraction",
                              type: "number",
                            },
                          ],
                        },
                      ],
                    }),
                  ];
                },
              }),
            },
          ],
        },
      ],
    },

    {
      name: "images",
      label: "Images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "images",
        },
      ],
    },
    {
      name: "notes",
      label: "Notes",
      localized: true,
      type: "richText",
      editor: lexicalEditor({
        features({ defaultFeatures }) {
          return [
            ...defaultFeatures,
            BlocksFeature({
              inlineBlocks: [TimerBlock],
            }),
          ];
        },
      }),
    },
    {
      name: "neutritionalInfo",
      localized: true,
      label: "Nutritional Info",
      type: "richText",
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" && data && !data.uuid) {
          data.uuid = randomUUID();
        }
      },
    ],
  },
};
