import { CollectionConfig, UploadCollectionSlug, UploadConfig } from "payload";
import { type CollectionOptions } from "@payloadcms/plugin-cloud-storage/types";
import { withConfiguredTenant } from "./tenant";
import assert from "node:assert";

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
