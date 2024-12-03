import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_admins_tenants" ADD VALUE 'dein-gedankenfluss.de';
  CREATE TABLE IF NOT EXISTS "gdf_pages_blocks_richtext" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "gdf_pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "admins_tenants" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "admins_tenants" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "admins_tenants" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "admins" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "admins" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "cache" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "cache" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "hdm_persons" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_persons" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "hdm_cover_arts" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_cover_arts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "hdm_releases_contributors" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases_contributors" ALTER COLUMN "person_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases_languages" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases_languages" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases_languages" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "hdm_releases_tracks" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases_tracks" ALTER COLUMN "song_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "hdm_releases" ALTER COLUMN "cover_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases_rels" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases_rels" ALTER COLUMN "hdm_contribution_roles_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_releases_rels" ALTER COLUMN "hdm_genres_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_contribution_roles" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_contribution_roles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "hdm_genres" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_genres" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "hdm_songs_authors" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_songs_authors" ALTER COLUMN "person_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_songs" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_songs" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "hdm_songs_rels" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "hdm_songs_rels" ALTER COLUMN "hdm_contribution_roles_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" ALTER COLUMN "quantity_type_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" ALTER COLUMN "ingredient_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_recipes_ingredient_sections" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_recipes_step_sections" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_recipes_images" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_recipes_images" ALTER COLUMN "image_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_recipes" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_recipes" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "rcps_recipes" ALTER COLUMN "source_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_recipes_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "quantity_type_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "ingredient_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_step_sections" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_step_sections" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_step_sections" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "_rcps_recipes_v_version_step_sections_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_images" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_images" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_version_images" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "_rcps_recipes_v_version_images" ALTER COLUMN "image_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "_rcps_recipes_v" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v" ALTER COLUMN "version_source_id" SET DATA TYPE uuid;
  ALTER TABLE "_rcps_recipes_v_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_images" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_images" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "rcps_sources" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_sources" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "rcps_quantity_types" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_quantity_types" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "rcps_quantity_types_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_ingredients" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_ingredients" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "rcps_ingredients" ALTER COLUMN "recipe_id" SET DATA TYPE uuid;
  ALTER TABLE "rcps_ingredients_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "admins_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "cache_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_persons_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_cover_arts_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_releases_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_contribution_roles_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_genres_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_songs_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_recipes_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_images_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_sources_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_quantity_types_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_ingredients_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_preferences" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "payload_preferences" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "payload_preferences_rels" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_preferences_rels" ALTER COLUMN "admins_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_migrations" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "payload_migrations" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gdf_pages_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "gdf_pages_blocks_richtext" ADD CONSTRAINT "gdf_pages_blocks_richtext_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gdf_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "gdf_pages_blocks_richtext_order_idx" ON "gdf_pages_blocks_richtext" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "gdf_pages_blocks_richtext_parent_id_idx" ON "gdf_pages_blocks_richtext" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "gdf_pages_blocks_richtext_path_idx" ON "gdf_pages_blocks_richtext" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "gdf_pages_slug_idx" ON "gdf_pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "gdf_pages_updated_at_idx" ON "gdf_pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "gdf_pages_created_at_idx" ON "gdf_pages" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gdf_pages_fk" FOREIGN KEY ("gdf_pages_id") REFERENCES "public"."gdf_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gdf_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("gdf_pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gdf_pages_blocks_richtext" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gdf_pages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "gdf_pages_blocks_richtext" CASCADE;
  DROP TABLE "gdf_pages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gdf_pages_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_gdf_pages_id_idx";
  ALTER TABLE "admins_tenants" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "admins_tenants" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "admins_tenants" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "admins" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "admins" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "cache" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "cache" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "hdm_persons" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "hdm_persons" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "hdm_cover_arts" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "hdm_cover_arts" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "hdm_releases_contributors" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_releases_contributors" ALTER COLUMN "person_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_releases_languages" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_releases_languages" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "hdm_releases_languages" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "hdm_releases_tracks" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_releases_tracks" ALTER COLUMN "song_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_releases" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "hdm_releases" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "hdm_releases" ALTER COLUMN "cover_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_releases_rels" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_releases_rels" ALTER COLUMN "hdm_contribution_roles_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_releases_rels" ALTER COLUMN "hdm_genres_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_contribution_roles" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "hdm_contribution_roles" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "hdm_genres" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "hdm_genres" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "hdm_songs_authors" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_songs_authors" ALTER COLUMN "person_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_songs" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "hdm_songs" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "hdm_songs_rels" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "hdm_songs_rels" ALTER COLUMN "hdm_contribution_roles_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" ALTER COLUMN "quantity_type_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" ALTER COLUMN "ingredient_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_recipes_ingredient_sections" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_recipes_step_sections" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_recipes_images" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_recipes_images" ALTER COLUMN "image_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_recipes" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "rcps_recipes" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "rcps_recipes" ALTER COLUMN "source_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_recipes_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "quantity_type_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ALTER COLUMN "ingredient_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_step_sections" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_step_sections" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "_rcps_recipes_v_version_step_sections" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_images" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_version_images" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "_rcps_recipes_v_version_images" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "_rcps_recipes_v_version_images" ALTER COLUMN "image_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "_rcps_recipes_v" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "_rcps_recipes_v" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v" ALTER COLUMN "version_source_id" SET DATA TYPE integer;
  ALTER TABLE "_rcps_recipes_v_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_images" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "rcps_images" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "rcps_sources" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "rcps_sources" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "rcps_quantity_types" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "rcps_quantity_types" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "rcps_quantity_types_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_ingredients" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "rcps_ingredients" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "rcps_ingredients" ALTER COLUMN "recipe_id" SET DATA TYPE integer;
  ALTER TABLE "rcps_ingredients_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "payload_locked_documents" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "admins_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "cache_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_persons_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_cover_arts_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_releases_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_contribution_roles_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_genres_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hdm_songs_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_recipes_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_images_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_sources_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_quantity_types_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "rcps_ingredients_id" SET DATA TYPE integer;
  ALTER TABLE "payload_preferences" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "payload_preferences" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "payload_preferences_rels" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "payload_preferences_rels" ALTER COLUMN "admins_id" SET DATA TYPE integer;
  ALTER TABLE "payload_migrations" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "payload_migrations" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "gdf_pages_id";
  ALTER TABLE "public"."admins_tenants" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_admins_tenants";
  CREATE TYPE "public"."enum_admins_tenants" AS ENUM('hannesdiem.de', 'hannesdiercks.de', 'rezepte.roxanna-diercks.de');
  ALTER TABLE "public"."admins_tenants" ALTER COLUMN "value" SET DATA TYPE "public"."enum_admins_tenants" USING "value"::"public"."enum_admins_tenants";`)
}
