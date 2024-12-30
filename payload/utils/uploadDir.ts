import { CollectionConfig, UploadCollectionSlug, UploadConfig } from "payload";
import { type CollectionOptions } from "@payloadcms/plugin-cloud-storage/types";
import { withConfiguredTenant } from "./tenant";

const context: Partial<
  Record<UploadCollectionSlug, Omit<CollectionOptions, "adapter"> | true>
> = {};

type UploadCollectionConfig = Omit<CollectionConfig, "upload"> & {
  upload: UploadConfig;
};

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
