import { superadmin } from "@payload/access/superadmin";
import { superadminOrSelf } from "@payload/access/superadminOrSelf";
import type { CollectionConfig } from "payload";

export const Admins: CollectionConfig = {
  slug: "admins",
  labels: {
    singular: "Admin",
    plural: "Admins",
  },
  auth: true,
  access: {
    read: superadminOrSelf,
    update: superadminOrSelf,
    create: superadmin,
    delete: superadmin,
    unlock: superadmin,
  },
  fields: [
    {
      access: {
        update: superadmin,
        create: superadmin,
      },
      name: "superadmin",
      type: "checkbox",
    },
    {
      access: {
        update: superadmin,
        create: superadmin,
      },
      name: "tenants",
      type: "select",
      options: [
        {
          value: "hannesdiem.de",
          label: "hannesdiem.de",
        },
        {
          value: "hannesdiercks.de",
          label: "hannesdiercks.de",
        },
        {
          value: "rezepte.roxanna-diercks.de",
          label: "rezepte.roxanna-diercks.de",
        },
      ],
      hasMany: true,
    },
  ],
};
