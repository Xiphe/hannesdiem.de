import {
  BasePayload,
  CollectionSlug,
  RequiredDataFromCollectionSlug,
} from "payload";

export async function seedDevDB(
  payload: BasePayload,
  ...seeders: (((payload: BasePayload) => void | Promise<void>) | undefined)[]
) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  await seed(payload, "admins", [
    { email: "admin@payload.local", password: "admin123", superadmin: true },
  ]);

  for (const seeder of seeders) {
    await seeder?.(payload);
  }
}

export async function seed<Collection extends CollectionSlug>(
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
