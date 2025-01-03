import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { buildConfig, Plugin } from "payload";
import assert from "node:assert";
import { seedDevDB } from "./seed/dev-seeds";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "node:path";
import { Admins } from "./collections/Admins";
import { mergeTenants } from "./utils/tenant";
import { EN } from "./utils/locales";

import { HannesDiemDeConfig } from "./tenants/hannesdiem.de";
import { RezepteRoxannaDiercksDeConfig } from "./tenants/rezepte.roxanna-diercks.de";
import { getBlobStorageConfigs } from "./utils/uploadDir";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.resolve(__dirname, "..");
const migrationDir = path.join(rootDir, "payload/migrations");

const isDev = process.env.NODE_ENV === "development";

const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET;
assert(PAYLOAD_SECRET, "PAYLOAD_SECRET env must be set");

const POSTGRESQL_DATABASE_URL = process.env.POSTGRESQL_DATABASE_URL;
assert(POSTGRESQL_DATABASE_URL, "POSTGRESQL_DATABASE_URL env must be set");

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
assert(BLOB_READ_WRITE_TOKEN, "BLOB_READ_WRITE_TOKEN env must be set");

export default buildConfig(
  mergeTenants(
    {
      admin: {
        user: "admins",
        autoLogin: isDev
          ? {
              email: "admin@payload.local",
              password: "admin123",
              prefillOnly: true,
            }
          : undefined,
      },
      localization: {
        locales: [EN],
        defaultLocale: "en",
      },
      editor: lexicalEditor(),
      collections: [Admins],
      secret: PAYLOAD_SECRET,
      db: (isDev ? postgresAdapter : vercelPostgresAdapter)({
        migrationDir,
        pool: {
          idleTimeoutMillis: 1000,
          connectionString: POSTGRESQL_DATABASE_URL,
        },
      }),
      plugins: ([] as Plugin[]).concat(
        isDev
          ? []
          : [
              vercelBlobStorage({
                collections: {
                  ...getBlobStorageConfigs(),
                },
                token: BLOB_READ_WRITE_TOKEN,
              }),
            ],
      ),
      sharp,
      async onInit(payload) {
        await seedDevDB(
          payload,
          HannesDiemDeConfig.devSeed,
          RezepteRoxannaDiercksDeConfig.devSeed,
        );
      },
    },
    HannesDiemDeConfig,
    RezepteRoxannaDiercksDeConfig,
  ),
);
