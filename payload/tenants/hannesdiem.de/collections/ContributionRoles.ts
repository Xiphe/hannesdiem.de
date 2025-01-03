import type { CollectionConfig } from "payload";

export const ContributionRoles: CollectionConfig = {
  slug: "hdm-contribution-roles",
  admin: {
    useAsTitle: "role",
  },
  fields: [
    {
      name: "role",
      type: "text",
      required: true,
    },
  ],
};
