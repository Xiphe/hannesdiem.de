import {
  BasePayload,
  CollectionSlug,
  RequiredDataFromCollectionSlug,
} from "payload";

export async function seedDevDB(payload: BasePayload) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  seed(payload, "users", [
    { email: "admin@payload.local", password: "admin123" },
  ]);

  seed(payload, "persons", [
    {
      name: "Hannes Diem",
      link: "https://hannesdiem.de",
      ogProfile: "https://hannesdiem.de/about",
    },
  ]);

  seed(payload, "contribution-roles", [
    { role: "Composition" },
    { role: "Lyrics" },
  ]);
}

async function seed<Collection extends CollectionSlug>(
  payload: BasePayload,
  collection: Collection,
  entries: RequiredDataFromCollectionSlug<Collection>[],
) {
  const existing = await payload.find({
    collection,
  });
  if (existing.totalDocs === 0) {
    console.log(`🌱 Seeding ${collection}...`);

    for (const data of entries) {
      await payload.create({
        collection,
        data,
      });
    }
  }
}
