import type { CollectionConfig } from "payload";
import { SHOPS } from "../utils/shops";

export const Releases: CollectionConfig = {
  slug: "releases",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
    },
    {
      name: "artist",
      type: "text",
    },
    {
      name: "releaseDate",
      type: "date",
    },
    {
      name: "hideReleaseDay",
      type: "checkbox",
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "hdm-cover-arts",
    },
    {
      name: "contributors",
      type: "array",
      labels: {
        plural: "Contributors",
        singular: "Contributor",
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
      name: "genres",
      type: "relationship",
      relationTo: "hdm-genres",
      hasMany: true,
    },
    {
      name: "languages",
      type: "select",
      options: [
        { value: "english", label: "English" },
        { value: "german", label: "German" },
      ],
      hasMany: true,
    },
    {
      name: "summary",
      type: "textarea",
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "tracks",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "addition",
          type: "text",
        },
        {
          name: "duration",
          type: "number",
        },
        {
          name: "song",
          type: "relationship",
          relationTo: "hdm-songs",
          hasMany: false,
        },
      ],
    },
    {
      name: "shops",
      type: "group",
      fields: SHOPS.map((name) => ({
        name,
        type: "text",
      })),
    },
  ],
};
