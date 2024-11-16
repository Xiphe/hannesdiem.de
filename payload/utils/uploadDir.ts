import { CollectionConfig, UploadConfig } from "payload";

export function withUploadDir(
  config: Omit<CollectionConfig, "upload"> & {
    upload: UploadConfig;
  },
) {
  config.upload.staticDir = `${process.env.UPLOAD_STATIC_BASE || ""}${
    config.upload.staticDir || config.slug
  }`;

  return config;
}
