import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            width: "80%",
          },
        },
        {
          name: "slug",
          type: "text",
          unique: true,
          required: true,
          admin: {
            width: "20%",
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Options",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "header",
              type: "checkbox",
              label: "Header",
              defaultValue: true,
            },
            {
              name: "footer",
              type: "checkbox",
              label: "Footer",
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      type: "blocks",
      label: false,
      name: "content",
      blocks: [
        {
          slug: "richtext",
          fields: [
            {
              label: false,
              name: "content",
              type: "richText",
            },
          ],
        },
      ],
    },
  ],
};
