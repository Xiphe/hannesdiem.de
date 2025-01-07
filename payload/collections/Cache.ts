import type { CollectionConfig } from "payload";

export const Cache: CollectionConfig = {
  slug: "cache",
  labels: {
    singular: "Cache",
    plural: "Cached Things",
  },
  // access: {
  //   read: () => false,
  //   update: () => false,
  //   create: () => false,
  //   delete: () => false,
  // },
  fields: [
    {
      name: "key",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "expires",
      required: true,
      type: "number",
    },
    {
      name: "value",
      required: true,
      typescriptSchema: [
        () => ({
          type: "object",
          additionalProperties: false,
          required: ["value", "metadata"],
          properties: {
            value: { type: "any" },
            metadata: {
              type: "object",
              additionalProperties: false,
              required: ["createdTime"],
              properties: {
                createdTime: { type: "number" },
                ttl: { type: ["number", "null"] },
                swr: { type: ["number", "null"] },
              },
            },
          },
        }),
      ],
      type: "json",
    },
  ],
};
