import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gdf_pages_blocks_paper_fly_in" AS ENUM('none', 'left', 'right');
  CREATE TABLE IF NOT EXISTS "gdf_pages_blocks_paper" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"fly_in" "enum_gdf_pages_blocks_paper_fly_in" DEFAULT 'none',
  	"decorative" boolean DEFAULT true,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  ALTER TABLE "gdf_pages_blocks_richtext" ADD COLUMN "decorative" boolean DEFAULT true;
  DO $$ BEGIN
   ALTER TABLE "gdf_pages_blocks_paper" ADD CONSTRAINT "gdf_pages_blocks_paper_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gdf_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "gdf_pages_blocks_paper_order_idx" ON "gdf_pages_blocks_paper" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "gdf_pages_blocks_paper_parent_id_idx" ON "gdf_pages_blocks_paper" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "gdf_pages_blocks_paper_path_idx" ON "gdf_pages_blocks_paper" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "gdf_pages_blocks_paper" CASCADE;
  ALTER TABLE "gdf_pages_blocks_richtext" DROP COLUMN IF EXISTS "decorative";
  DROP TYPE "public"."enum_gdf_pages_blocks_paper_fly_in";`)
}
