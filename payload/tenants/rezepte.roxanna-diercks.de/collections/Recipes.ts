import { Recipe } from "@/payload-types";
import { TimerBlock } from "@payload/blocks/timer/TimerBlock";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { randomUUID } from "crypto";
import {
  CollectionBeforeChangeHook,
  CollectionBeforeValidateHook,
  type CollectionConfig,
} from "payload";

export const Recipes: CollectionConfig = {
  slug: "rcps-recipes",
  typescript: { interface: "Recipe" },
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
      name: "last-edit-by",
      type: "number",
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
      type: "collapsible",
      label: "Options",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "publish-imports",
          type: "checkbox",
          label: "Auto-Publish imports",
          admin: {
            description:
              "When active, a fresh import with this recipe will automatically be published",
          },
        },
        {
          type: "row",
          fields: [
            {
              name: "duration",
              label: "Prep Duration",
              type: "number",
              admin: {
                width: "30%",
                description: "Overall “prep” duration in minutes, if needed.",
              },
            },
            {
              name: "cookingDuration",
              label: "Cooking Duration",
              type: "number",
              admin: {
                width: "30%",
                description:
                  "Overall “cooking” duration in minutes, if needed.",
              },
            },
            {
              name: "serves",
              label: "Servings",
              type: "number",
              admin: {
                width: "20%",
              },
            },
            {
              name: "defaultScale",
              label: "Default Scale",
              type: "number",
              defaultValue: 1,
              admin: {
                width: "20%",
              },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "source",
              label: "Source",
              type: "text",
              admin: {
                width: "60%",
              },
            },
            {
              name: "source-name",
              label: "Source Name",
              type: "text",
              admin: {
                width: "40%",
              },
            },
          ],
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
            "@payload/tenants/rezepte.roxanna-diercks.de/components/IngredientSectionLabel.tsx",
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
                "@payload/tenants/rezepte.roxanna-diercks.de/components/IngredientRowLabel.tsx",
            },
          },
          type: "array",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "quantity",
                  label: "Quantity",
                  type: "number",
                  admin: {
                    width: "10%",
                  },
                },
                {
                  name: "quantity-type",
                  label: "Quantity Type",
                  type: "relationship",
                  relationTo: "rcps-quantity-types",
                  admin: {
                    width: "20%",
                  },
                },
                {
                  name: "ingredient",
                  required: true,
                  label: "Ingredient",
                  type: "relationship",
                  relationTo: "rcps-ingredients",
                  admin: {
                    width: "35%",
                  },
                },
                {
                  name: "note",
                  label: "Note",
                  type: "text",
                  admin: {
                    width: "35%",
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
      localized: true,
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
          localized: true,
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
          relationTo: "rcps-images",
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
    ] satisfies CollectionBeforeValidateHook<Recipe>[],
    beforeChange: [
      ({ data, req }) => {
        data["last-edit-by"] = req.user?.id || 0;
      },
    ] satisfies CollectionBeforeChangeHook<Recipe>[],
  },
};
