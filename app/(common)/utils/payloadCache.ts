import { Cache, totalTtl } from "@epic-web/cachified";
import { BasePayload } from "payload";

export function createPayloadCache(payload: BasePayload): Cache {
  return {
    name: "payload-cache",
    async get(key) {
      const { docs } = await payload.find({
        collection: "cache",
        limit: 1,
        select: { value: true },
        where: {
          and: [
            { key: { equals: key } },
            {
              or: [
                {
                  expires: { equals: 0 },
                },
                {
                  expires: { greater_than_equal: Date.now() },
                },
              ],
            },
          ],
        },
      });

      return docs[0]?.value;
    },
    async set(key, value) {
      const ttl = totalTtl(value.metadata);
      await payload.db.upsert({
        collection: "cache",
        where: {
          key: { equals: key },
        },
        data: {
          key,
          value,
          expires: ttl === Infinity ? 0 : value.metadata.createdTime + ttl,
        },
      });
    },
    delete(key) {
      return payload.delete({
        collection: "cache",
        where: { key: { equals: key } },
      });
    },
  };
}
