import type { CollectionConfig } from "payload";

export const Songs: CollectionConfig = {
  slug: "hdm-songs",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "sumrary",
      type: "text",
    },
    {
      name: "creationDate",
      type: "date",
    },
    {
      name: "hideCreationDay",
      type: "checkbox",
    },
    {
      name: "authors",
      type: "array",
      labels: {
        plural: "Authors",
        singular: "Author",
      },
      fields: [
        {
          name: "person",
          type: "relationship",
          relationTo: "hdm-persons",
          required: true,
        },
        {
          name: "roles",
          type: "relationship",
          relationTo: "hdm-contribution-roles",
          hasMany: true,
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    {
      name: "lyrics",
      type: "richText",
    },
    {
      name: "description",
      type: "richText",
    },
  ],
};
