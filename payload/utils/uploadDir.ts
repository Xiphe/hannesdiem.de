import { CollectionConfig, UploadCollectionSlug, UploadConfig } from "payload";
import { type CollectionOptions } from "@payloadcms/plugin-cloud-storage/types";
import { withConfiguredTenant } from "./tenant";
import assert from "node:assert";
import { RcpsImage, Config } from "@/payload-types";

const context: Partial<
  Record<UploadCollectionSlug, Omit<CollectionOptions, "adapter"> | true>
> = {};

type UploadCollectionConfig = Omit<CollectionConfig, "upload"> & {
  upload: UploadConfig;
};

const INTERNAL_FILE_READ_KEY = process.env.INTERNAL_FILE_READ_KEY;
assert(INTERNAL_FILE_READ_KEY, "INTERNAL_FILE_READ env must be set");

export const withUploadDir = <T extends UploadCollectionConfig>(
  config: T,
  blobStorage: boolean | Omit<CollectionOptions, "adapter"> = true,
): T =>
  withConfiguredTenant(config, (config) => {
    if (blobStorage === false) {
      delete context[config.slug as UploadCollectionSlug];
    }
    context[config.slug as UploadCollectionSlug] = blobStorage as true;

    return {
      ...config,
      access: {
        ...config.access,
        read(args) {
          if (
            args.req.headers?.get("Authorization") ===
            `Bearer ${INTERNAL_FILE_READ_KEY}`
          ) {
            return true;
          }

          return config.access?.read?.(args) || false;
        },
        create(args) {
          if (
            args.req.headers?.get("Authorization") ===
            `Bearer ${INTERNAL_FILE_READ_KEY}`
          ) {
            return true;
          }

          return config.access?.create?.(args) || false;
        },
      },
      upload: {
        ...config.upload,
        staticDir: `${process.env.UPLOAD_STATIC_BASE || ""}${
          config.upload.staticDir || config.slug
        }`,
      },
    };
  });

export function getBlobStorageConfigs() {
  return context;
}

export function fetchFile(url: string) {
  return fetch(
    (process.env.NODE_ENV === "development"
      ? "http://localhost:2999"
      : "https://cms.xiphe.net") + url,
    {
      headers: {
        Authorization: `Bearer ${INTERNAL_FILE_READ_KEY}`,
      },
    },
  );
}

export async function createFile<Slug extends UploadCollectionSlug>(
  slug: Slug,
  formData: FormData,
): Promise<Config["collections"][Slug]> {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:2999"
        : "https://cms.xiphe.net"
    }/api/${slug}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${INTERNAL_FILE_READ_KEY}`,
      },
      body: formData,
    },
  );

  if (res.status !== 201) {
    console.error("Failed to upload file", await res.text());
    throw new Error("Failed to upload file");
  }

  try {
    const { doc } = await res.json();
    assert(doc.id != null);
    return doc;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to upload image");
  }
}
