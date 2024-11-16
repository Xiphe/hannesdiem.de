import type { CollectionConfig } from "payload";

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
      relationTo: "cover-arts",
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
          relationTo: "persons",
          required: true,
        },
        {
          name: "roles",
          type: "relationship",
          relationTo: "contribution-roles", // Reference the contribution-roles collection
          hasMany: true, // Allow multiple roles per contributor
          required: true, // Ensure at least one role is selected
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
  ],
};

// export interface Release extends PostCommon {
//   type: "release";
//   genres: string[];
//   languages: string[];
//   summary?: string;
//   Description?: ComponentType;
//   contributors: Contributor[];
//   tracks: Track[];
//   shops: Shop[];
//   preSaves?: (PreSave | ExternalPreSave)[];
// }
