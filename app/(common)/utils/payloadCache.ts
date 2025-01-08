import { Cache, totalTtl } from "@epic-web/cachified";
import { getPayload } from "./getPayload";
import { configure } from "./configure";

export const payloadCache: Cache = {
  name: "payload-cache",
  async get(key) {
    const payload = await getPayload();
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
    const payload = await getPayload();
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
  async delete(key) {
    const payload = await getPayload();
    return payload.delete({
      collection: "cache",
      where: { key: { equals: key } },
    });
  },
};

export const cachiPayload = configure({ cache: payloadCache });
