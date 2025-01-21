import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gdf_pages" ADD COLUMN "header" boolean DEFAULT true;
  ALTER TABLE "gdf_pages" ADD COLUMN "footer" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gdf_pages" DROP COLUMN IF EXISTS "header";
  ALTER TABLE "gdf_pages" DROP COLUMN IF EXISTS "footer";`)
}
