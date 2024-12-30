import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_admins_tenants" AS ENUM('hannesdiem.de', 'hannesdiercks.de', 'rezepte.roxanna-diercks.de');
  ALTER TYPE "public"."enum_releases_languages" RENAME TO "enum_hdm_releases_languages";
  ALTER TYPE "public"."enum_recipes_status" RENAME TO "enum_rcps_recipes_status";
  ALTER TYPE "public"."enum__recipes_v_version_status" RENAME TO "enum__rcps_recipes_v_version_status";
  ALTER TYPE "public"."enum__recipes_v_published_locale" RENAME TO "enum__rcps_recipes_v_published_locale";
  CREATE TABLE IF NOT EXISTS "admins_tenants" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_admins_tenants",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "users" RENAME TO "admins";
  ALTER TABLE "persons" RENAME TO "hdm_persons";
  ALTER TABLE "cover_arts" RENAME TO "hdm_cover_arts";
  ALTER TABLE "releases_contributors" RENAME TO "hdm_releases_contributors";
  ALTER TABLE "releases_languages" RENAME TO "hdm_releases_languages";
  ALTER TABLE "releases_tracks" RENAME TO "hdm_releases_tracks";
  ALTER TABLE "releases" RENAME TO "hdm_releases";
  ALTER TABLE "releases_rels" RENAME TO "hdm_releases_rels";
  ALTER TABLE "contribution_roles" RENAME TO "hdm_contribution_roles";
  ALTER TABLE "genres" RENAME TO "hdm_genres";
  ALTER TABLE "songs_authors" RENAME TO "hdm_songs_authors";
  ALTER TABLE "songs" RENAME TO "hdm_songs";
  ALTER TABLE "songs_rels" RENAME TO "hdm_songs_rels";
  ALTER TABLE "recipes_ingredient_sections_section_ingredients" RENAME TO "rcps_recipes_ingredient_sections_section_ingredients";
  ALTER TABLE "recipes_ingredient_sections" RENAME TO "rcps_recipes_ingredient_sections";
  ALTER TABLE "recipes_ingredient_sections_locales" RENAME TO "rcps_recipes_ingredient_sections_locales";
  ALTER TABLE "recipes_step_sections_section_steps" RENAME TO "rcps_recipes_step_sections_section_steps";
  ALTER TABLE "recipes_step_sections_section_steps_locales" RENAME TO "rcps_recipes_step_sections_section_steps_locales";
  ALTER TABLE "recipes_step_sections" RENAME TO "rcps_recipes_step_sections";
  ALTER TABLE "recipes_step_sections_locales" RENAME TO "rcps_recipes_step_sections_locales";
  ALTER TABLE "recipes_images" RENAME TO "rcps_recipes_images";
  ALTER TABLE "recipes" RENAME TO "rcps_recipes";
  ALTER TABLE "recipes_locales" RENAME TO "rcps_recipes_locales";
  ALTER TABLE "_recipes_v_version_ingredient_sections_section_ingredients" RENAME TO "_rcps_recipes_v_version_ingredient_sections_section_ingredients";
  ALTER TABLE "_recipes_v_version_ingredient_sections" RENAME TO "_rcps_recipes_v_version_ingredient_sections";
  ALTER TABLE "_recipes_v_version_ingredient_sections_locales" RENAME TO "_rcps_recipes_v_version_ingredient_sections_locales";
  ALTER TABLE "_recipes_v_version_step_sections_section_steps" RENAME TO "_rcps_recipes_v_version_step_sections_section_steps";
  ALTER TABLE "_recipes_v_version_step_sections_section_steps_locales" RENAME TO "_rcps_recipes_v_version_step_sections_section_steps_locales";
  ALTER TABLE "_recipes_v_version_step_sections" RENAME TO "_rcps_recipes_v_version_step_sections";
  ALTER TABLE "_recipes_v_version_step_sections_locales" RENAME TO "_rcps_recipes_v_version_step_sections_locales";
  ALTER TABLE "_recipes_v_version_images" RENAME TO "_rcps_recipes_v_version_images";
  ALTER TABLE "_recipes_v" RENAME TO "_rcps_recipes_v";
  ALTER TABLE "_recipes_v_locales" RENAME TO "_rcps_recipes_v_locales";
  ALTER TABLE "images" RENAME TO "rcps_images";
  ALTER TABLE "recipe_sources" RENAME TO "rcps_sources";
  ALTER TABLE "recipe_quantity_type" RENAME TO "rcps_quantity_types";
  ALTER TABLE "recipe_quantity_type_locales" RENAME TO "rcps_quantity_types_locales";
  ALTER TABLE "recipe_ingredient" RENAME TO "rcps_ingredients";
  ALTER TABLE "recipe_ingredient_locales" RENAME TO "rcps_ingredients_locales";
  ALTER TABLE "hdm_releases_rels" RENAME COLUMN "contribution_roles_id" TO "hdm_contribution_roles_id";
  ALTER TABLE "hdm_releases_rels" RENAME COLUMN "genres_id" TO "hdm_genres_id";
  ALTER TABLE "hdm_songs_rels" RENAME COLUMN "contribution_roles_id" TO "hdm_contribution_roles_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "users_id" TO "admins_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "persons_id" TO "hdm_persons_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "cover_arts_id" TO "hdm_cover_arts_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "releases_id" TO "hdm_releases_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "contribution_roles_id" TO "hdm_contribution_roles_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "genres_id" TO "hdm_genres_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "songs_id" TO "hdm_songs_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "recipes_id" TO "rcps_recipes_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "images_id" TO "rcps_images_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "recipe_sources_id" TO "rcps_sources_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "recipe_quantity_type_id" TO "rcps_quantity_types_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "recipe_ingredient_id" TO "rcps_ingredients_id";
  ALTER TABLE "payload_preferences_rels" RENAME COLUMN "users_id" TO "admins_id";
  ALTER TABLE "hdm_releases_contributors" DROP CONSTRAINT "releases_contributors_person_id_persons_id_fk";
  
  ALTER TABLE "hdm_releases_contributors" DROP CONSTRAINT "releases_contributors_parent_id_fk";
  
  ALTER TABLE "hdm_releases_languages" DROP CONSTRAINT "releases_languages_parent_fk";
  
  ALTER TABLE "hdm_releases_tracks" DROP CONSTRAINT "releases_tracks_song_id_songs_id_fk";
  
  ALTER TABLE "hdm_releases_tracks" DROP CONSTRAINT "releases_tracks_parent_id_fk";
  
  ALTER TABLE "hdm_releases" DROP CONSTRAINT "releases_cover_id_cover_arts_id_fk";
  
  ALTER TABLE "hdm_releases_rels" DROP CONSTRAINT "releases_rels_parent_fk";
  
  ALTER TABLE "hdm_releases_rels" DROP CONSTRAINT "releases_rels_contribution_roles_fk";
  
  ALTER TABLE "hdm_releases_rels" DROP CONSTRAINT "releases_rels_genres_fk";
  
  ALTER TABLE "hdm_songs_authors" DROP CONSTRAINT "songs_authors_person_id_persons_id_fk";
  
  ALTER TABLE "hdm_songs_authors" DROP CONSTRAINT "songs_authors_parent_id_fk";
  
  ALTER TABLE "hdm_songs_rels" DROP CONSTRAINT "songs_rels_parent_fk";
  
  ALTER TABLE "hdm_songs_rels" DROP CONSTRAINT "songs_rels_contribution_roles_fk";
  
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" DROP CONSTRAINT "recipes_ingredient_sections_section_ingredients_quantity_type_id_recipe_quantity_type_id_fk";
  
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" DROP CONSTRAINT "recipes_ingredient_sections_section_ingredients_ingredient_id_recipe_ingredient_id_fk";
  
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" DROP CONSTRAINT "recipes_ingredient_sections_section_ingredients_parent_id_fk";
  
  ALTER TABLE "rcps_recipes_ingredient_sections" DROP CONSTRAINT "recipes_ingredient_sections_parent_id_fk";
  
  ALTER TABLE "rcps_recipes_ingredient_sections_locales" DROP CONSTRAINT "recipes_ingredient_sections_locales_parent_id_fk";
  
  ALTER TABLE "rcps_recipes_step_sections_section_steps" DROP CONSTRAINT "recipes_step_sections_section_steps_parent_id_fk";
  
  ALTER TABLE "rcps_recipes_step_sections_section_steps_locales" DROP CONSTRAINT "recipes_step_sections_section_steps_locales_parent_id_fk";
  
  ALTER TABLE "rcps_recipes_step_sections" DROP CONSTRAINT "recipes_step_sections_parent_id_fk";
  
  ALTER TABLE "rcps_recipes_step_sections_locales" DROP CONSTRAINT "recipes_step_sections_locales_parent_id_fk";
  
  ALTER TABLE "rcps_recipes_images" DROP CONSTRAINT "recipes_images_image_id_images_id_fk";
  
  ALTER TABLE "rcps_recipes_images" DROP CONSTRAINT "recipes_images_parent_id_fk";
  
  ALTER TABLE "rcps_recipes" DROP CONSTRAINT "recipes_source_id_recipe_sources_id_fk";
  
  ALTER TABLE "rcps_recipes_locales" DROP CONSTRAINT "recipes_locales_parent_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" DROP CONSTRAINT "_recipes_v_version_ingredient_sections_section_ingredients_quantity_type_id_recipe_quantity_type_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" DROP CONSTRAINT "_recipes_v_version_ingredient_sections_section_ingredients_ingredient_id_recipe_ingredient_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" DROP CONSTRAINT "_recipes_v_version_ingredient_sections_section_ingredients_parent_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" DROP CONSTRAINT "_recipes_v_version_ingredient_sections_parent_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_locales" DROP CONSTRAINT "_recipes_v_version_ingredient_sections_locales_parent_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" DROP CONSTRAINT "_recipes_v_version_step_sections_section_steps_parent_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps_locales" DROP CONSTRAINT "_recipes_v_version_step_sections_section_steps_locales_parent_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_step_sections" DROP CONSTRAINT "_recipes_v_version_step_sections_parent_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_step_sections_locales" DROP CONSTRAINT "_recipes_v_version_step_sections_locales_parent_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_images" DROP CONSTRAINT "_recipes_v_version_images_image_id_images_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_version_images" DROP CONSTRAINT "_recipes_v_version_images_parent_id_fk";
  
  ALTER TABLE "_rcps_recipes_v" DROP CONSTRAINT "_recipes_v_parent_id_recipes_id_fk";
  
  ALTER TABLE "_rcps_recipes_v" DROP CONSTRAINT "_recipes_v_version_source_id_recipe_sources_id_fk";
  
  ALTER TABLE "_rcps_recipes_v_locales" DROP CONSTRAINT "_recipes_v_locales_parent_id_fk";
  
  ALTER TABLE "rcps_quantity_types_locales" DROP CONSTRAINT "recipe_quantity_type_locales_parent_id_fk";
  
  ALTER TABLE "rcps_ingredients" DROP CONSTRAINT "recipe_ingredient_recipe_id_recipes_id_fk";
  
  ALTER TABLE "rcps_ingredients_locales" DROP CONSTRAINT "recipe_ingredient_locales_parent_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_images_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_persons_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cover_arts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_releases_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contribution_roles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_genres_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_songs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipe_sources_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipe_quantity_type_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipe_ingredient_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_users_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_users_fk";
  
  DROP INDEX IF EXISTS "images_updated_at_idx";
  DROP INDEX IF EXISTS "images_created_at_idx";
  DROP INDEX IF EXISTS "images_filename_idx";
  DROP INDEX IF EXISTS "images_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX IF EXISTS "images_sizes_card_sizes_card_filename_idx";
  DROP INDEX IF EXISTS "persons_updated_at_idx";
  DROP INDEX IF EXISTS "persons_created_at_idx";
  DROP INDEX IF EXISTS "cover_arts_updated_at_idx";
  DROP INDEX IF EXISTS "cover_arts_created_at_idx";
  DROP INDEX IF EXISTS "cover_arts_filename_idx";
  DROP INDEX IF EXISTS "releases_contributors_order_idx";
  DROP INDEX IF EXISTS "releases_contributors_parent_id_idx";
  DROP INDEX IF EXISTS "releases_contributors_person_idx";
  DROP INDEX IF EXISTS "releases_languages_order_idx";
  DROP INDEX IF EXISTS "releases_languages_parent_idx";
  DROP INDEX IF EXISTS "releases_tracks_order_idx";
  DROP INDEX IF EXISTS "releases_tracks_parent_id_idx";
  DROP INDEX IF EXISTS "releases_tracks_song_idx";
  DROP INDEX IF EXISTS "releases_cover_idx";
  DROP INDEX IF EXISTS "releases_updated_at_idx";
  DROP INDEX IF EXISTS "releases_created_at_idx";
  DROP INDEX IF EXISTS "releases_rels_order_idx";
  DROP INDEX IF EXISTS "releases_rels_parent_idx";
  DROP INDEX IF EXISTS "releases_rels_path_idx";
  DROP INDEX IF EXISTS "releases_rels_contribution_roles_id_idx";
  DROP INDEX IF EXISTS "releases_rels_genres_id_idx";
  DROP INDEX IF EXISTS "contribution_roles_updated_at_idx";
  DROP INDEX IF EXISTS "contribution_roles_created_at_idx";
  DROP INDEX IF EXISTS "genres_updated_at_idx";
  DROP INDEX IF EXISTS "genres_created_at_idx";
  DROP INDEX IF EXISTS "songs_authors_order_idx";
  DROP INDEX IF EXISTS "songs_authors_parent_id_idx";
  DROP INDEX IF EXISTS "songs_authors_person_idx";
  DROP INDEX IF EXISTS "songs_updated_at_idx";
  DROP INDEX IF EXISTS "songs_created_at_idx";
  DROP INDEX IF EXISTS "songs_rels_order_idx";
  DROP INDEX IF EXISTS "songs_rels_parent_idx";
  DROP INDEX IF EXISTS "songs_rels_path_idx";
  DROP INDEX IF EXISTS "songs_rels_contribution_roles_id_idx";
  DROP INDEX IF EXISTS "recipes_ingredient_sections_section_ingredients_order_idx";
  DROP INDEX IF EXISTS "recipes_ingredient_sections_section_ingredients_parent_id_idx";
  DROP INDEX IF EXISTS "recipes_ingredient_sections_section_ingredients_quantity_type_idx";
  DROP INDEX IF EXISTS "recipes_ingredient_sections_section_ingredients_ingredient_idx";
  DROP INDEX IF EXISTS "recipes_ingredient_sections_order_idx";
  DROP INDEX IF EXISTS "recipes_ingredient_sections_parent_id_idx";
  DROP INDEX IF EXISTS "recipes_ingredient_sections_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "recipes_step_sections_section_steps_order_idx";
  DROP INDEX IF EXISTS "recipes_step_sections_section_steps_parent_id_idx";
  DROP INDEX IF EXISTS "recipes_step_sections_section_steps_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "recipes_step_sections_order_idx";
  DROP INDEX IF EXISTS "recipes_step_sections_parent_id_idx";
  DROP INDEX IF EXISTS "recipes_step_sections_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "recipes_images_order_idx";
  DROP INDEX IF EXISTS "recipes_images_parent_id_idx";
  DROP INDEX IF EXISTS "recipes_images_image_idx";
  DROP INDEX IF EXISTS "recipes_uuid_idx";
  DROP INDEX IF EXISTS "recipes_source_idx";
  DROP INDEX IF EXISTS "recipes_updated_at_idx";
  DROP INDEX IF EXISTS "recipes_created_at_idx";
  DROP INDEX IF EXISTS "recipes__status_idx";
  DROP INDEX IF EXISTS "recipes_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_recipes_v_version_ingredient_sections_section_ingredients_order_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_ingredient_sections_section_ingredients_parent_id_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_ingredient_sections_section_ingredients_quantity_type_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_ingredient_sections_section_ingredients_ingredient_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_ingredient_sections_order_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_ingredient_sections_parent_id_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_ingredient_sections_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_recipes_v_version_step_sections_section_steps_order_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_step_sections_section_steps_parent_id_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_step_sections_section_steps_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_recipes_v_version_step_sections_order_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_step_sections_parent_id_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_step_sections_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_recipes_v_version_images_order_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_images_parent_id_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_images_image_idx";
  DROP INDEX IF EXISTS "_recipes_v_parent_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_version_uuid_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_version_source_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_version_updated_at_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_version_created_at_idx";
  DROP INDEX IF EXISTS "_recipes_v_version_version__status_idx";
  DROP INDEX IF EXISTS "_recipes_v_created_at_idx";
  DROP INDEX IF EXISTS "_recipes_v_updated_at_idx";
  DROP INDEX IF EXISTS "_recipes_v_snapshot_idx";
  DROP INDEX IF EXISTS "_recipes_v_published_locale_idx";
  DROP INDEX IF EXISTS "_recipes_v_latest_idx";
  DROP INDEX IF EXISTS "_recipes_v_autosave_idx";
  DROP INDEX IF EXISTS "_recipes_v_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "recipe_sources_updated_at_idx";
  DROP INDEX IF EXISTS "recipe_sources_created_at_idx";
  DROP INDEX IF EXISTS "recipe_quantity_type_updated_at_idx";
  DROP INDEX IF EXISTS "recipe_quantity_type_created_at_idx";
  DROP INDEX IF EXISTS "recipe_quantity_type_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "recipe_ingredient_recipe_idx";
  DROP INDEX IF EXISTS "recipe_ingredient_updated_at_idx";
  DROP INDEX IF EXISTS "recipe_ingredient_created_at_idx";
  DROP INDEX IF EXISTS "recipe_ingredient_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "users_updated_at_idx";
  DROP INDEX IF EXISTS "users_created_at_idx";
  DROP INDEX IF EXISTS "users_email_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_images_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_persons_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_cover_arts_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_releases_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_contribution_roles_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_genres_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_songs_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_recipes_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_recipe_sources_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_recipe_quantity_type_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_recipe_ingredient_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_users_id_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_users_id_idx";
  ALTER TABLE "admins" ADD COLUMN "superadmin" boolean;
  DO $$ BEGIN
   ALTER TABLE "admins_tenants" ADD CONSTRAINT "admins_tenants_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "admins_tenants_order_idx" ON "admins_tenants" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "admins_tenants_parent_idx" ON "admins_tenants" USING btree ("parent_id");
  DO $$ BEGIN
   ALTER TABLE "hdm_releases_contributors" ADD CONSTRAINT "hdm_releases_contributors_person_id_hdm_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."hdm_persons"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_releases_contributors" ADD CONSTRAINT "hdm_releases_contributors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hdm_releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_releases_languages" ADD CONSTRAINT "hdm_releases_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hdm_releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_releases_tracks" ADD CONSTRAINT "hdm_releases_tracks_song_id_hdm_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."hdm_songs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_releases_tracks" ADD CONSTRAINT "hdm_releases_tracks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hdm_releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_releases" ADD CONSTRAINT "hdm_releases_cover_id_hdm_cover_arts_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."hdm_cover_arts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_releases_rels" ADD CONSTRAINT "hdm_releases_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hdm_releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_releases_rels" ADD CONSTRAINT "hdm_releases_rels_hdm_contribution_roles_fk" FOREIGN KEY ("hdm_contribution_roles_id") REFERENCES "public"."hdm_contribution_roles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_releases_rels" ADD CONSTRAINT "hdm_releases_rels_hdm_genres_fk" FOREIGN KEY ("hdm_genres_id") REFERENCES "public"."hdm_genres"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_songs_authors" ADD CONSTRAINT "hdm_songs_authors_person_id_hdm_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."hdm_persons"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_songs_authors" ADD CONSTRAINT "hdm_songs_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hdm_songs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_songs_rels" ADD CONSTRAINT "hdm_songs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hdm_songs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "hdm_songs_rels" ADD CONSTRAINT "hdm_songs_rels_hdm_contribution_roles_fk" FOREIGN KEY ("hdm_contribution_roles_id") REFERENCES "public"."hdm_contribution_roles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" ADD CONSTRAINT "rcps_recipes_ingredient_sections_section_ingredients_quantity_type_id_rcps_quantity_types_id_fk" FOREIGN KEY ("quantity_type_id") REFERENCES "public"."rcps_quantity_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" ADD CONSTRAINT "rcps_recipes_ingredient_sections_section_ingredients_ingredient_id_rcps_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."rcps_ingredients"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" ADD CONSTRAINT "rcps_recipes_ingredient_sections_section_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_ingredient_sections" ADD CONSTRAINT "rcps_recipes_ingredient_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_ingredient_sections_locales" ADD CONSTRAINT "rcps_recipes_ingredient_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_step_sections_section_steps" ADD CONSTRAINT "rcps_recipes_step_sections_section_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_step_sections_section_steps_locales" ADD CONSTRAINT "rcps_recipes_step_sections_section_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes_step_sections_section_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_step_sections" ADD CONSTRAINT "rcps_recipes_step_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_step_sections_locales" ADD CONSTRAINT "rcps_recipes_step_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_images" ADD CONSTRAINT "rcps_recipes_images_image_id_rcps_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."rcps_images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_images" ADD CONSTRAINT "rcps_recipes_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes" ADD CONSTRAINT "rcps_recipes_source_id_rcps_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."rcps_sources"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_locales" ADD CONSTRAINT "rcps_recipes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ADD CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_section_ingredients_quantity_type_id_rcps_quantity_types_id_fk" FOREIGN KEY ("quantity_type_id") REFERENCES "public"."rcps_quantity_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ADD CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_section_ingredients_ingredient_id_rcps_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."rcps_ingredients"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ADD CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_section_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v_version_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" ADD CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_locales" ADD CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v_version_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" ADD CONSTRAINT "_rcps_recipes_v_version_step_sections_section_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v_version_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps_locales" ADD CONSTRAINT "_rcps_recipes_v_version_step_sections_section_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v_version_step_sections_section_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_step_sections" ADD CONSTRAINT "_rcps_recipes_v_version_step_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_step_sections_locales" ADD CONSTRAINT "_rcps_recipes_v_version_step_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v_version_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_images" ADD CONSTRAINT "_rcps_recipes_v_version_images_image_id_rcps_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."rcps_images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_images" ADD CONSTRAINT "_rcps_recipes_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v" ADD CONSTRAINT "_rcps_recipes_v_parent_id_rcps_recipes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rcps_recipes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v" ADD CONSTRAINT "_rcps_recipes_v_version_source_id_rcps_sources_id_fk" FOREIGN KEY ("version_source_id") REFERENCES "public"."rcps_sources"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_locales" ADD CONSTRAINT "_rcps_recipes_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_quantity_types_locales" ADD CONSTRAINT "rcps_quantity_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_quantity_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_ingredients" ADD CONSTRAINT "rcps_ingredients_recipe_id_rcps_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."rcps_recipes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_ingredients_locales" ADD CONSTRAINT "rcps_ingredients_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_ingredients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hdm_persons_fk" FOREIGN KEY ("hdm_persons_id") REFERENCES "public"."hdm_persons"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hdm_cover_arts_fk" FOREIGN KEY ("hdm_cover_arts_id") REFERENCES "public"."hdm_cover_arts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hdm_releases_fk" FOREIGN KEY ("hdm_releases_id") REFERENCES "public"."hdm_releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hdm_contribution_roles_fk" FOREIGN KEY ("hdm_contribution_roles_id") REFERENCES "public"."hdm_contribution_roles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hdm_genres_fk" FOREIGN KEY ("hdm_genres_id") REFERENCES "public"."hdm_genres"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hdm_songs_fk" FOREIGN KEY ("hdm_songs_id") REFERENCES "public"."hdm_songs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rcps_recipes_fk" FOREIGN KEY ("rcps_recipes_id") REFERENCES "public"."rcps_recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rcps_images_fk" FOREIGN KEY ("rcps_images_id") REFERENCES "public"."rcps_images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rcps_sources_fk" FOREIGN KEY ("rcps_sources_id") REFERENCES "public"."rcps_sources"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rcps_quantity_types_fk" FOREIGN KEY ("rcps_quantity_types_id") REFERENCES "public"."rcps_quantity_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rcps_ingredients_fk" FOREIGN KEY ("rcps_ingredients_id") REFERENCES "public"."rcps_ingredients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "rcps_images_updated_at_idx" ON "rcps_images" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_images_created_at_idx" ON "rcps_images" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_images_filename_idx" ON "rcps_images" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "rcps_images_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "rcps_images" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "rcps_images_sizes_card_sizes_card_filename_idx" ON "rcps_images" USING btree ("sizes_card_filename");
  CREATE INDEX IF NOT EXISTS "hdm_persons_updated_at_idx" ON "hdm_persons" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "hdm_persons_created_at_idx" ON "hdm_persons" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "hdm_cover_arts_updated_at_idx" ON "hdm_cover_arts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "hdm_cover_arts_created_at_idx" ON "hdm_cover_arts" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "hdm_cover_arts_filename_idx" ON "hdm_cover_arts" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "hdm_releases_contributors_order_idx" ON "hdm_releases_contributors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "hdm_releases_contributors_parent_id_idx" ON "hdm_releases_contributors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "hdm_releases_contributors_person_idx" ON "hdm_releases_contributors" USING btree ("person_id");
  CREATE INDEX IF NOT EXISTS "hdm_releases_languages_order_idx" ON "hdm_releases_languages" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "hdm_releases_languages_parent_idx" ON "hdm_releases_languages" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "hdm_releases_tracks_order_idx" ON "hdm_releases_tracks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "hdm_releases_tracks_parent_id_idx" ON "hdm_releases_tracks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "hdm_releases_tracks_song_idx" ON "hdm_releases_tracks" USING btree ("song_id");
  CREATE INDEX IF NOT EXISTS "hdm_releases_cover_idx" ON "hdm_releases" USING btree ("cover_id");
  CREATE INDEX IF NOT EXISTS "hdm_releases_updated_at_idx" ON "hdm_releases" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "hdm_releases_created_at_idx" ON "hdm_releases" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "hdm_releases_rels_order_idx" ON "hdm_releases_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "hdm_releases_rels_parent_idx" ON "hdm_releases_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "hdm_releases_rels_path_idx" ON "hdm_releases_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "hdm_releases_rels_hdm_contribution_roles_id_idx" ON "hdm_releases_rels" USING btree ("hdm_contribution_roles_id");
  CREATE INDEX IF NOT EXISTS "hdm_releases_rels_hdm_genres_id_idx" ON "hdm_releases_rels" USING btree ("hdm_genres_id");
  CREATE INDEX IF NOT EXISTS "hdm_contribution_roles_updated_at_idx" ON "hdm_contribution_roles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "hdm_contribution_roles_created_at_idx" ON "hdm_contribution_roles" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "hdm_genres_updated_at_idx" ON "hdm_genres" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "hdm_genres_created_at_idx" ON "hdm_genres" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "hdm_songs_authors_order_idx" ON "hdm_songs_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "hdm_songs_authors_parent_id_idx" ON "hdm_songs_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "hdm_songs_authors_person_idx" ON "hdm_songs_authors" USING btree ("person_id");
  CREATE INDEX IF NOT EXISTS "hdm_songs_updated_at_idx" ON "hdm_songs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "hdm_songs_created_at_idx" ON "hdm_songs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "hdm_songs_rels_order_idx" ON "hdm_songs_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "hdm_songs_rels_parent_idx" ON "hdm_songs_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "hdm_songs_rels_path_idx" ON "hdm_songs_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "hdm_songs_rels_hdm_contribution_roles_id_idx" ON "hdm_songs_rels" USING btree ("hdm_contribution_roles_id");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_section_ingredients_order_idx" ON "rcps_recipes_ingredient_sections_section_ingredients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_section_ingredients_parent_id_idx" ON "rcps_recipes_ingredient_sections_section_ingredients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_section_ingredients_quantity_type_idx" ON "rcps_recipes_ingredient_sections_section_ingredients" USING btree ("quantity_type_id");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_section_ingredients_ingredient_idx" ON "rcps_recipes_ingredient_sections_section_ingredients" USING btree ("ingredient_id");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_order_idx" ON "rcps_recipes_ingredient_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_parent_id_idx" ON "rcps_recipes_ingredient_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_locales_locale_parent_id_unique" ON "rcps_recipes_ingredient_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_step_sections_section_steps_order_idx" ON "rcps_recipes_step_sections_section_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_step_sections_section_steps_parent_id_idx" ON "rcps_recipes_step_sections_section_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_recipes_step_sections_section_steps_locales_locale_parent_id_unique" ON "rcps_recipes_step_sections_section_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_step_sections_order_idx" ON "rcps_recipes_step_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_step_sections_parent_id_idx" ON "rcps_recipes_step_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_recipes_step_sections_locales_locale_parent_id_unique" ON "rcps_recipes_step_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_images_order_idx" ON "rcps_recipes_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_images_parent_id_idx" ON "rcps_recipes_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_images_image_idx" ON "rcps_recipes_images" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_recipes_uuid_idx" ON "rcps_recipes" USING btree ("uuid");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_source_idx" ON "rcps_recipes" USING btree ("source_id");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_updated_at_idx" ON "rcps_recipes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_created_at_idx" ON "rcps_recipes" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "rcps_recipes__status_idx" ON "rcps_recipes" USING btree ("_status");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_recipes_locales_locale_parent_id_unique" ON "rcps_recipes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_order_idx" ON "_rcps_recipes_v_version_ingredient_sections_section_ingredients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_parent_id_idx" ON "_rcps_recipes_v_version_ingredient_sections_section_ingredients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_quantity_type_idx" ON "_rcps_recipes_v_version_ingredient_sections_section_ingredients" USING btree ("quantity_type_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_ingredient_idx" ON "_rcps_recipes_v_version_ingredient_sections_section_ingredients" USING btree ("ingredient_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_order_idx" ON "_rcps_recipes_v_version_ingredient_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_parent_id_idx" ON "_rcps_recipes_v_version_ingredient_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_locales_locale_parent_id_unique" ON "_rcps_recipes_v_version_ingredient_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_section_steps_order_idx" ON "_rcps_recipes_v_version_step_sections_section_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_section_steps_parent_id_idx" ON "_rcps_recipes_v_version_step_sections_section_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_section_steps_locales_locale_parent_id_unique" ON "_rcps_recipes_v_version_step_sections_section_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_order_idx" ON "_rcps_recipes_v_version_step_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_parent_id_idx" ON "_rcps_recipes_v_version_step_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_locales_locale_parent_id_unique" ON "_rcps_recipes_v_version_step_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_images_order_idx" ON "_rcps_recipes_v_version_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_images_parent_id_idx" ON "_rcps_recipes_v_version_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_images_image_idx" ON "_rcps_recipes_v_version_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_parent_idx" ON "_rcps_recipes_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_version_uuid_idx" ON "_rcps_recipes_v" USING btree ("version_uuid");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_version_source_idx" ON "_rcps_recipes_v" USING btree ("version_source_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_version_updated_at_idx" ON "_rcps_recipes_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_version_created_at_idx" ON "_rcps_recipes_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_version__status_idx" ON "_rcps_recipes_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_created_at_idx" ON "_rcps_recipes_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_updated_at_idx" ON "_rcps_recipes_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_snapshot_idx" ON "_rcps_recipes_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_published_locale_idx" ON "_rcps_recipes_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_latest_idx" ON "_rcps_recipes_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_autosave_idx" ON "_rcps_recipes_v" USING btree ("autosave");
  CREATE UNIQUE INDEX IF NOT EXISTS "_rcps_recipes_v_locales_locale_parent_id_unique" ON "_rcps_recipes_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_sources_updated_at_idx" ON "rcps_sources" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_sources_created_at_idx" ON "rcps_sources" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "rcps_quantity_types_updated_at_idx" ON "rcps_quantity_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_quantity_types_created_at_idx" ON "rcps_quantity_types" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_quantity_types_locales_locale_parent_id_unique" ON "rcps_quantity_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_ingredients_recipe_idx" ON "rcps_ingredients" USING btree ("recipe_id");
  CREATE INDEX IF NOT EXISTS "rcps_ingredients_updated_at_idx" ON "rcps_ingredients" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_ingredients_created_at_idx" ON "rcps_ingredients" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_ingredients_locales_locale_parent_id_unique" ON "rcps_ingredients_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "admins_updated_at_idx" ON "admins" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "admins_created_at_idx" ON "admins" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "admins_email_idx" ON "admins" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_admins_id_idx" ON "payload_locked_documents_rels" USING btree ("admins_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_hdm_persons_id_idx" ON "payload_locked_documents_rels" USING btree ("hdm_persons_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_hdm_cover_arts_id_idx" ON "payload_locked_documents_rels" USING btree ("hdm_cover_arts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_hdm_releases_id_idx" ON "payload_locked_documents_rels" USING btree ("hdm_releases_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_hdm_contribution_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("hdm_contribution_roles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_hdm_genres_id_idx" ON "payload_locked_documents_rels" USING btree ("hdm_genres_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_hdm_songs_id_idx" ON "payload_locked_documents_rels" USING btree ("hdm_songs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rcps_recipes_id_idx" ON "payload_locked_documents_rels" USING btree ("rcps_recipes_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rcps_images_id_idx" ON "payload_locked_documents_rels" USING btree ("rcps_images_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rcps_sources_id_idx" ON "payload_locked_documents_rels" USING btree ("rcps_sources_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rcps_quantity_types_id_idx" ON "payload_locked_documents_rels" USING btree ("rcps_quantity_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rcps_ingredients_id_idx" ON "payload_locked_documents_rels" USING btree ("rcps_ingredients_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_admins_id_idx" ON "payload_preferences_rels" USING btree ("admins_id");
  ALTER TABLE "hdm_cover_arts" DROP COLUMN IF EXISTS "prefix";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_hdm_releases_languages" RENAME TO "enum_releases_languages";
  ALTER TYPE "public"."enum_rcps_recipes_status" RENAME TO "enum_recipes_status";
  ALTER TYPE "public"."enum__rcps_recipes_v_version_status" RENAME TO "enum__recipes_v_version_status";
  ALTER TYPE "public"."enum__rcps_recipes_v_published_locale" RENAME TO "enum__recipes_v_published_locale";
  ALTER TABLE "admins_tenants" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "admins_tenants" CASCADE;
  ALTER TABLE "rcps_images" RENAME TO "images";
  ALTER TABLE "hdm_persons" RENAME TO "persons";
  ALTER TABLE "hdm_cover_arts" RENAME TO "cover_arts";
  ALTER TABLE "hdm_releases_contributors" RENAME TO "releases_contributors";
  ALTER TABLE "hdm_releases_languages" RENAME TO "releases_languages";
  ALTER TABLE "hdm_releases_tracks" RENAME TO "releases_tracks";
  ALTER TABLE "hdm_releases" RENAME TO "releases";
  ALTER TABLE "hdm_releases_rels" RENAME TO "releases_rels";
  ALTER TABLE "hdm_contribution_roles" RENAME TO "contribution_roles";
  ALTER TABLE "hdm_genres" RENAME TO "genres";
  ALTER TABLE "hdm_songs_authors" RENAME TO "songs_authors";
  ALTER TABLE "hdm_songs" RENAME TO "songs";
  ALTER TABLE "hdm_songs_rels" RENAME TO "songs_rels";
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" RENAME TO "recipes_ingredient_sections_section_ingredients";
  ALTER TABLE "rcps_recipes_ingredient_sections" RENAME TO "recipes_ingredient_sections";
  ALTER TABLE "rcps_recipes_ingredient_sections_locales" RENAME TO "recipes_ingredient_sections_locales";
  ALTER TABLE "rcps_recipes_step_sections_section_steps" RENAME TO "recipes_step_sections_section_steps";
  ALTER TABLE "rcps_recipes_step_sections_section_steps_locales" RENAME TO "recipes_step_sections_section_steps_locales";
  ALTER TABLE "rcps_recipes_step_sections" RENAME TO "recipes_step_sections";
  ALTER TABLE "rcps_recipes_step_sections_locales" RENAME TO "recipes_step_sections_locales";
  ALTER TABLE "rcps_recipes_images" RENAME TO "recipes_images";
  ALTER TABLE "rcps_recipes" RENAME TO "recipes";
  ALTER TABLE "rcps_recipes_locales" RENAME TO "recipes_locales";
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" RENAME TO "_recipes_v_version_ingredient_sections_section_ingredients";
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" RENAME TO "_recipes_v_version_ingredient_sections";
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_locales" RENAME TO "_recipes_v_version_ingredient_sections_locales";
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" RENAME TO "_recipes_v_version_step_sections_section_steps";
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps_locales" RENAME TO "_recipes_v_version_step_sections_section_steps_locales";
  ALTER TABLE "_rcps_recipes_v_version_step_sections" RENAME TO "_recipes_v_version_step_sections";
  ALTER TABLE "_rcps_recipes_v_version_step_sections_locales" RENAME TO "_recipes_v_version_step_sections_locales";
  ALTER TABLE "_rcps_recipes_v_version_images" RENAME TO "_recipes_v_version_images";
  ALTER TABLE "_rcps_recipes_v" RENAME TO "_recipes_v";
  ALTER TABLE "_rcps_recipes_v_locales" RENAME TO "_recipes_v_locales";
  ALTER TABLE "rcps_sources" RENAME TO "recipe_sources";
  ALTER TABLE "rcps_quantity_types" RENAME TO "recipe_quantity_type";
  ALTER TABLE "rcps_quantity_types_locales" RENAME TO "recipe_quantity_type_locales";
  ALTER TABLE "rcps_ingredients" RENAME TO "recipe_ingredient";
  ALTER TABLE "rcps_ingredients_locales" RENAME TO "recipe_ingredient_locales";
  ALTER TABLE "admins" RENAME TO "users";
  ALTER TABLE "releases_rels" RENAME COLUMN "hdm_contribution_roles_id" TO "contribution_roles_id";
  ALTER TABLE "releases_rels" RENAME COLUMN "hdm_genres_id" TO "genres_id";
  ALTER TABLE "songs_rels" RENAME COLUMN "hdm_contribution_roles_id" TO "contribution_roles_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "rcps_images_id" TO "images_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "hdm_persons_id" TO "persons_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "hdm_cover_arts_id" TO "cover_arts_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "hdm_releases_id" TO "releases_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "hdm_contribution_roles_id" TO "contribution_roles_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "hdm_genres_id" TO "genres_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "hdm_songs_id" TO "songs_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "rcps_recipes_id" TO "recipes_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "rcps_sources_id" TO "recipe_sources_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "rcps_quantity_types_id" TO "recipe_quantity_type_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "rcps_ingredients_id" TO "recipe_ingredient_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "admins_id" TO "users_id";
  ALTER TABLE "payload_preferences_rels" RENAME COLUMN "admins_id" TO "users_id";
  ALTER TABLE "releases_contributors" DROP CONSTRAINT "hdm_releases_contributors_person_id_hdm_persons_id_fk";
  
  ALTER TABLE "releases_contributors" DROP CONSTRAINT "hdm_releases_contributors_parent_id_fk";
  
  ALTER TABLE "releases_languages" DROP CONSTRAINT "hdm_releases_languages_parent_fk";
  
  ALTER TABLE "releases_tracks" DROP CONSTRAINT "hdm_releases_tracks_song_id_hdm_songs_id_fk";
  
  ALTER TABLE "releases_tracks" DROP CONSTRAINT "hdm_releases_tracks_parent_id_fk";
  
  ALTER TABLE "releases" DROP CONSTRAINT "hdm_releases_cover_id_hdm_cover_arts_id_fk";
  
  ALTER TABLE "releases_rels" DROP CONSTRAINT "hdm_releases_rels_parent_fk";
  
  ALTER TABLE "releases_rels" DROP CONSTRAINT "hdm_releases_rels_hdm_contribution_roles_fk";
  
  ALTER TABLE "releases_rels" DROP CONSTRAINT "hdm_releases_rels_hdm_genres_fk";
  
  ALTER TABLE "songs_authors" DROP CONSTRAINT "hdm_songs_authors_person_id_hdm_persons_id_fk";
  
  ALTER TABLE "songs_authors" DROP CONSTRAINT "hdm_songs_authors_parent_id_fk";
  
  ALTER TABLE "songs_rels" DROP CONSTRAINT "hdm_songs_rels_parent_fk";
  
  ALTER TABLE "songs_rels" DROP CONSTRAINT "hdm_songs_rels_hdm_contribution_roles_fk";
  
  ALTER TABLE "recipes_ingredient_sections_section_ingredients" DROP CONSTRAINT "rcps_recipes_ingredient_sections_section_ingredients_quantity_type_id_rcps_quantity_types_id_fk";
  
  ALTER TABLE "recipes_ingredient_sections_section_ingredients" DROP CONSTRAINT "rcps_recipes_ingredient_sections_section_ingredients_ingredient_id_rcps_ingredients_id_fk";
  
  ALTER TABLE "recipes_ingredient_sections_section_ingredients" DROP CONSTRAINT "rcps_recipes_ingredient_sections_section_ingredients_parent_id_fk";
  
  ALTER TABLE "recipes_ingredient_sections" DROP CONSTRAINT "rcps_recipes_ingredient_sections_parent_id_fk";
  
  ALTER TABLE "recipes_ingredient_sections_locales" DROP CONSTRAINT "rcps_recipes_ingredient_sections_locales_parent_id_fk";
  
  ALTER TABLE "recipes_step_sections_section_steps" DROP CONSTRAINT "rcps_recipes_step_sections_section_steps_parent_id_fk";
  
  ALTER TABLE "recipes_step_sections_section_steps_locales" DROP CONSTRAINT "rcps_recipes_step_sections_section_steps_locales_parent_id_fk";
  
  ALTER TABLE "recipes_step_sections" DROP CONSTRAINT "rcps_recipes_step_sections_parent_id_fk";
  
  ALTER TABLE "recipes_step_sections_locales" DROP CONSTRAINT "rcps_recipes_step_sections_locales_parent_id_fk";
  
  ALTER TABLE "recipes_images" DROP CONSTRAINT "rcps_recipes_images_image_id_rcps_images_id_fk";
  
  ALTER TABLE "recipes_images" DROP CONSTRAINT "rcps_recipes_images_parent_id_fk";
  
  ALTER TABLE "recipes" DROP CONSTRAINT "rcps_recipes_source_id_rcps_sources_id_fk";
  
  ALTER TABLE "recipes_locales" DROP CONSTRAINT "rcps_recipes_locales_parent_id_fk";
  
  ALTER TABLE "_recipes_v_version_ingredient_sections_section_ingredients" DROP CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_section_ingredients_quantity_type_id_rcps_quantity_types_id_fk";
  
  ALTER TABLE "_recipes_v_version_ingredient_sections_section_ingredients" DROP CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_section_ingredients_ingredient_id_rcps_ingredients_id_fk";
  
  ALTER TABLE "_recipes_v_version_ingredient_sections_section_ingredients" DROP CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_section_ingredients_parent_id_fk";
  
  ALTER TABLE "_recipes_v_version_ingredient_sections" DROP CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_parent_id_fk";
  
  ALTER TABLE "_recipes_v_version_ingredient_sections_locales" DROP CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_locales_parent_id_fk";
  
  ALTER TABLE "_recipes_v_version_step_sections_section_steps" DROP CONSTRAINT "_rcps_recipes_v_version_step_sections_section_steps_parent_id_fk";
  
  ALTER TABLE "_recipes_v_version_step_sections_section_steps_locales" DROP CONSTRAINT "_rcps_recipes_v_version_step_sections_section_steps_locales_parent_id_fk";
  
  ALTER TABLE "_recipes_v_version_step_sections" DROP CONSTRAINT "_rcps_recipes_v_version_step_sections_parent_id_fk";
  
  ALTER TABLE "_recipes_v_version_step_sections_locales" DROP CONSTRAINT "_rcps_recipes_v_version_step_sections_locales_parent_id_fk";
  
  ALTER TABLE "_recipes_v_version_images" DROP CONSTRAINT "_rcps_recipes_v_version_images_image_id_rcps_images_id_fk";
  
  ALTER TABLE "_recipes_v_version_images" DROP CONSTRAINT "_rcps_recipes_v_version_images_parent_id_fk";
  
  ALTER TABLE "_recipes_v" DROP CONSTRAINT "_rcps_recipes_v_parent_id_rcps_recipes_id_fk";
  
  ALTER TABLE "_recipes_v" DROP CONSTRAINT "_rcps_recipes_v_version_source_id_rcps_sources_id_fk";
  
  ALTER TABLE "_recipes_v_locales" DROP CONSTRAINT "_rcps_recipes_v_locales_parent_id_fk";
  
  ALTER TABLE "recipe_quantity_type_locales" DROP CONSTRAINT "rcps_quantity_types_locales_parent_id_fk";
  
  ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "rcps_ingredients_recipe_id_rcps_recipes_id_fk";
  
  ALTER TABLE "recipe_ingredient_locales" DROP CONSTRAINT "rcps_ingredients_locales_parent_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_admins_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hdm_persons_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hdm_cover_arts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hdm_releases_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hdm_contribution_roles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hdm_genres_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hdm_songs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rcps_recipes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rcps_images_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rcps_sources_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rcps_quantity_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rcps_ingredients_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_admins_fk";
  
  DROP INDEX IF EXISTS "admins_updated_at_idx";
  DROP INDEX IF EXISTS "admins_created_at_idx";
  DROP INDEX IF EXISTS "admins_email_idx";
  DROP INDEX IF EXISTS "hdm_persons_updated_at_idx";
  DROP INDEX IF EXISTS "hdm_persons_created_at_idx";
  DROP INDEX IF EXISTS "hdm_cover_arts_updated_at_idx";
  DROP INDEX IF EXISTS "hdm_cover_arts_created_at_idx";
  DROP INDEX IF EXISTS "hdm_cover_arts_filename_idx";
  DROP INDEX IF EXISTS "hdm_releases_contributors_order_idx";
  DROP INDEX IF EXISTS "hdm_releases_contributors_parent_id_idx";
  DROP INDEX IF EXISTS "hdm_releases_contributors_person_idx";
  DROP INDEX IF EXISTS "hdm_releases_languages_order_idx";
  DROP INDEX IF EXISTS "hdm_releases_languages_parent_idx";
  DROP INDEX IF EXISTS "hdm_releases_tracks_order_idx";
  DROP INDEX IF EXISTS "hdm_releases_tracks_parent_id_idx";
  DROP INDEX IF EXISTS "hdm_releases_tracks_song_idx";
  DROP INDEX IF EXISTS "hdm_releases_cover_idx";
  DROP INDEX IF EXISTS "hdm_releases_updated_at_idx";
  DROP INDEX IF EXISTS "hdm_releases_created_at_idx";
  DROP INDEX IF EXISTS "hdm_releases_rels_order_idx";
  DROP INDEX IF EXISTS "hdm_releases_rels_parent_idx";
  DROP INDEX IF EXISTS "hdm_releases_rels_path_idx";
  DROP INDEX IF EXISTS "hdm_releases_rels_hdm_contribution_roles_id_idx";
  DROP INDEX IF EXISTS "hdm_releases_rels_hdm_genres_id_idx";
  DROP INDEX IF EXISTS "hdm_contribution_roles_updated_at_idx";
  DROP INDEX IF EXISTS "hdm_contribution_roles_created_at_idx";
  DROP INDEX IF EXISTS "hdm_genres_updated_at_idx";
  DROP INDEX IF EXISTS "hdm_genres_created_at_idx";
  DROP INDEX IF EXISTS "hdm_songs_authors_order_idx";
  DROP INDEX IF EXISTS "hdm_songs_authors_parent_id_idx";
  DROP INDEX IF EXISTS "hdm_songs_authors_person_idx";
  DROP INDEX IF EXISTS "hdm_songs_updated_at_idx";
  DROP INDEX IF EXISTS "hdm_songs_created_at_idx";
  DROP INDEX IF EXISTS "hdm_songs_rels_order_idx";
  DROP INDEX IF EXISTS "hdm_songs_rels_parent_idx";
  DROP INDEX IF EXISTS "hdm_songs_rels_path_idx";
  DROP INDEX IF EXISTS "hdm_songs_rels_hdm_contribution_roles_id_idx";
  DROP INDEX IF EXISTS "rcps_recipes_ingredient_sections_section_ingredients_order_idx";
  DROP INDEX IF EXISTS "rcps_recipes_ingredient_sections_section_ingredients_parent_id_idx";
  DROP INDEX IF EXISTS "rcps_recipes_ingredient_sections_section_ingredients_quantity_type_idx";
  DROP INDEX IF EXISTS "rcps_recipes_ingredient_sections_section_ingredients_ingredient_idx";
  DROP INDEX IF EXISTS "rcps_recipes_ingredient_sections_order_idx";
  DROP INDEX IF EXISTS "rcps_recipes_ingredient_sections_parent_id_idx";
  DROP INDEX IF EXISTS "rcps_recipes_ingredient_sections_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "rcps_recipes_step_sections_section_steps_order_idx";
  DROP INDEX IF EXISTS "rcps_recipes_step_sections_section_steps_parent_id_idx";
  DROP INDEX IF EXISTS "rcps_recipes_step_sections_section_steps_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "rcps_recipes_step_sections_order_idx";
  DROP INDEX IF EXISTS "rcps_recipes_step_sections_parent_id_idx";
  DROP INDEX IF EXISTS "rcps_recipes_step_sections_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "rcps_recipes_images_order_idx";
  DROP INDEX IF EXISTS "rcps_recipes_images_parent_id_idx";
  DROP INDEX IF EXISTS "rcps_recipes_images_image_idx";
  DROP INDEX IF EXISTS "rcps_recipes_uuid_idx";
  DROP INDEX IF EXISTS "rcps_recipes_source_idx";
  DROP INDEX IF EXISTS "rcps_recipes_updated_at_idx";
  DROP INDEX IF EXISTS "rcps_recipes_created_at_idx";
  DROP INDEX IF EXISTS "rcps_recipes__status_idx";
  DROP INDEX IF EXISTS "rcps_recipes_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_order_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_parent_id_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_quantity_type_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_ingredient_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_ingredient_sections_order_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_ingredient_sections_parent_id_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_ingredient_sections_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_step_sections_section_steps_order_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_step_sections_section_steps_parent_id_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_step_sections_section_steps_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_step_sections_order_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_step_sections_parent_id_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_step_sections_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_images_order_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_images_parent_id_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_images_image_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_parent_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_version_uuid_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_version_source_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_version_updated_at_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_version_created_at_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_version__status_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_created_at_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_updated_at_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_snapshot_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_published_locale_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_latest_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_autosave_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "rcps_images_updated_at_idx";
  DROP INDEX IF EXISTS "rcps_images_created_at_idx";
  DROP INDEX IF EXISTS "rcps_images_filename_idx";
  DROP INDEX IF EXISTS "rcps_images_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX IF EXISTS "rcps_images_sizes_card_sizes_card_filename_idx";
  DROP INDEX IF EXISTS "rcps_sources_updated_at_idx";
  DROP INDEX IF EXISTS "rcps_sources_created_at_idx";
  DROP INDEX IF EXISTS "rcps_quantity_types_updated_at_idx";
  DROP INDEX IF EXISTS "rcps_quantity_types_created_at_idx";
  DROP INDEX IF EXISTS "rcps_quantity_types_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "rcps_ingredients_recipe_idx";
  DROP INDEX IF EXISTS "rcps_ingredients_updated_at_idx";
  DROP INDEX IF EXISTS "rcps_ingredients_created_at_idx";
  DROP INDEX IF EXISTS "rcps_ingredients_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_admins_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_hdm_persons_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_hdm_cover_arts_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_hdm_releases_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_hdm_contribution_roles_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_hdm_genres_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_hdm_songs_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_rcps_recipes_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_rcps_images_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_rcps_sources_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_rcps_quantity_types_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_rcps_ingredients_id_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_admins_id_idx";
  ALTER TABLE "cover_arts" ADD COLUMN "prefix" varchar DEFAULT 'cover-arts';
  DO $$ BEGIN
   ALTER TABLE "releases_contributors" ADD CONSTRAINT "releases_contributors_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "releases_contributors" ADD CONSTRAINT "releases_contributors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "releases_languages" ADD CONSTRAINT "releases_languages_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "releases_tracks" ADD CONSTRAINT "releases_tracks_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "releases_tracks" ADD CONSTRAINT "releases_tracks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "releases" ADD CONSTRAINT "releases_cover_id_cover_arts_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."cover_arts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "releases_rels" ADD CONSTRAINT "releases_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "releases_rels" ADD CONSTRAINT "releases_rels_contribution_roles_fk" FOREIGN KEY ("contribution_roles_id") REFERENCES "public"."contribution_roles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "releases_rels" ADD CONSTRAINT "releases_rels_genres_fk" FOREIGN KEY ("genres_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "songs_authors" ADD CONSTRAINT "songs_authors_person_id_persons_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "songs_authors" ADD CONSTRAINT "songs_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."songs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "songs_rels" ADD CONSTRAINT "songs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."songs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "songs_rels" ADD CONSTRAINT "songs_rels_contribution_roles_fk" FOREIGN KEY ("contribution_roles_id") REFERENCES "public"."contribution_roles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_ingredient_sections_section_ingredients" ADD CONSTRAINT "recipes_ingredient_sections_section_ingredients_quantity_type_id_recipe_quantity_type_id_fk" FOREIGN KEY ("quantity_type_id") REFERENCES "public"."recipe_quantity_type"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_ingredient_sections_section_ingredients" ADD CONSTRAINT "recipes_ingredient_sections_section_ingredients_ingredient_id_recipe_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."recipe_ingredient"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_ingredient_sections_section_ingredients" ADD CONSTRAINT "recipes_ingredient_sections_section_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_ingredient_sections" ADD CONSTRAINT "recipes_ingredient_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_ingredient_sections_locales" ADD CONSTRAINT "recipes_ingredient_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_step_sections_section_steps" ADD CONSTRAINT "recipes_step_sections_section_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_step_sections_section_steps_locales" ADD CONSTRAINT "recipes_step_sections_section_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes_step_sections_section_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_step_sections" ADD CONSTRAINT "recipes_step_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_step_sections_locales" ADD CONSTRAINT "recipes_step_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_images" ADD CONSTRAINT "recipes_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_images" ADD CONSTRAINT "recipes_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes" ADD CONSTRAINT "recipes_source_id_recipe_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."recipe_sources"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipes_locales" ADD CONSTRAINT "recipes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_ingredient_sections_section_ingredients" ADD CONSTRAINT "_recipes_v_version_ingredient_sections_section_ingredients_quantity_type_id_recipe_quantity_type_id_fk" FOREIGN KEY ("quantity_type_id") REFERENCES "public"."recipe_quantity_type"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_ingredient_sections_section_ingredients" ADD CONSTRAINT "_recipes_v_version_ingredient_sections_section_ingredients_ingredient_id_recipe_ingredient_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."recipe_ingredient"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_ingredient_sections_section_ingredients" ADD CONSTRAINT "_recipes_v_version_ingredient_sections_section_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v_version_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_ingredient_sections" ADD CONSTRAINT "_recipes_v_version_ingredient_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_ingredient_sections_locales" ADD CONSTRAINT "_recipes_v_version_ingredient_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v_version_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_step_sections_section_steps" ADD CONSTRAINT "_recipes_v_version_step_sections_section_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v_version_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_step_sections_section_steps_locales" ADD CONSTRAINT "_recipes_v_version_step_sections_section_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v_version_step_sections_section_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_step_sections" ADD CONSTRAINT "_recipes_v_version_step_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_step_sections_locales" ADD CONSTRAINT "_recipes_v_version_step_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v_version_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_images" ADD CONSTRAINT "_recipes_v_version_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_version_images" ADD CONSTRAINT "_recipes_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_parent_id_recipes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_version_source_id_recipe_sources_id_fk" FOREIGN KEY ("version_source_id") REFERENCES "public"."recipe_sources"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_recipes_v_locales" ADD CONSTRAINT "_recipes_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipe_quantity_type_locales" ADD CONSTRAINT "recipe_quantity_type_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipe_quantity_type"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "recipe_ingredient_locales" ADD CONSTRAINT "recipe_ingredient_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipe_ingredient"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_persons_fk" FOREIGN KEY ("persons_id") REFERENCES "public"."persons"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cover_arts_fk" FOREIGN KEY ("cover_arts_id") REFERENCES "public"."cover_arts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_releases_fk" FOREIGN KEY ("releases_id") REFERENCES "public"."releases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contribution_roles_fk" FOREIGN KEY ("contribution_roles_id") REFERENCES "public"."contribution_roles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_genres_fk" FOREIGN KEY ("genres_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_songs_fk" FOREIGN KEY ("songs_id") REFERENCES "public"."songs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recipes_fk" FOREIGN KEY ("recipes_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recipe_sources_fk" FOREIGN KEY ("recipe_sources_id") REFERENCES "public"."recipe_sources"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recipe_quantity_type_fk" FOREIGN KEY ("recipe_quantity_type_id") REFERENCES "public"."recipe_quantity_type"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recipe_ingredient_fk" FOREIGN KEY ("recipe_ingredient_id") REFERENCES "public"."recipe_ingredient"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "persons_updated_at_idx" ON "persons" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "persons_created_at_idx" ON "persons" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cover_arts_updated_at_idx" ON "cover_arts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cover_arts_created_at_idx" ON "cover_arts" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "cover_arts_filename_idx" ON "cover_arts" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "releases_contributors_order_idx" ON "releases_contributors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "releases_contributors_parent_id_idx" ON "releases_contributors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "releases_contributors_person_idx" ON "releases_contributors" USING btree ("person_id");
  CREATE INDEX IF NOT EXISTS "releases_languages_order_idx" ON "releases_languages" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "releases_languages_parent_idx" ON "releases_languages" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "releases_tracks_order_idx" ON "releases_tracks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "releases_tracks_parent_id_idx" ON "releases_tracks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "releases_tracks_song_idx" ON "releases_tracks" USING btree ("song_id");
  CREATE INDEX IF NOT EXISTS "releases_cover_idx" ON "releases" USING btree ("cover_id");
  CREATE INDEX IF NOT EXISTS "releases_updated_at_idx" ON "releases" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "releases_created_at_idx" ON "releases" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "releases_rels_order_idx" ON "releases_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "releases_rels_parent_idx" ON "releases_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "releases_rels_path_idx" ON "releases_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "releases_rels_contribution_roles_id_idx" ON "releases_rels" USING btree ("contribution_roles_id");
  CREATE INDEX IF NOT EXISTS "releases_rels_genres_id_idx" ON "releases_rels" USING btree ("genres_id");
  CREATE INDEX IF NOT EXISTS "contribution_roles_updated_at_idx" ON "contribution_roles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "contribution_roles_created_at_idx" ON "contribution_roles" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "genres_updated_at_idx" ON "genres" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "genres_created_at_idx" ON "genres" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "songs_authors_order_idx" ON "songs_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "songs_authors_parent_id_idx" ON "songs_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "songs_authors_person_idx" ON "songs_authors" USING btree ("person_id");
  CREATE INDEX IF NOT EXISTS "songs_updated_at_idx" ON "songs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "songs_created_at_idx" ON "songs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "songs_rels_order_idx" ON "songs_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "songs_rels_parent_idx" ON "songs_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "songs_rels_path_idx" ON "songs_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "songs_rels_contribution_roles_id_idx" ON "songs_rels" USING btree ("contribution_roles_id");
  CREATE INDEX IF NOT EXISTS "recipes_ingredient_sections_section_ingredients_order_idx" ON "recipes_ingredient_sections_section_ingredients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "recipes_ingredient_sections_section_ingredients_parent_id_idx" ON "recipes_ingredient_sections_section_ingredients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "recipes_ingredient_sections_section_ingredients_quantity_type_idx" ON "recipes_ingredient_sections_section_ingredients" USING btree ("quantity_type_id");
  CREATE INDEX IF NOT EXISTS "recipes_ingredient_sections_section_ingredients_ingredient_idx" ON "recipes_ingredient_sections_section_ingredients" USING btree ("ingredient_id");
  CREATE INDEX IF NOT EXISTS "recipes_ingredient_sections_order_idx" ON "recipes_ingredient_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "recipes_ingredient_sections_parent_id_idx" ON "recipes_ingredient_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "recipes_ingredient_sections_locales_locale_parent_id_unique" ON "recipes_ingredient_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "recipes_step_sections_section_steps_order_idx" ON "recipes_step_sections_section_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "recipes_step_sections_section_steps_parent_id_idx" ON "recipes_step_sections_section_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "recipes_step_sections_section_steps_locales_locale_parent_id_unique" ON "recipes_step_sections_section_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "recipes_step_sections_order_idx" ON "recipes_step_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "recipes_step_sections_parent_id_idx" ON "recipes_step_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "recipes_step_sections_locales_locale_parent_id_unique" ON "recipes_step_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "recipes_images_order_idx" ON "recipes_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "recipes_images_parent_id_idx" ON "recipes_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "recipes_images_image_idx" ON "recipes_images" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "recipes_uuid_idx" ON "recipes" USING btree ("uuid");
  CREATE INDEX IF NOT EXISTS "recipes_source_idx" ON "recipes" USING btree ("source_id");
  CREATE INDEX IF NOT EXISTS "recipes_updated_at_idx" ON "recipes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "recipes_created_at_idx" ON "recipes" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "recipes__status_idx" ON "recipes" USING btree ("_status");
  CREATE UNIQUE INDEX IF NOT EXISTS "recipes_locales_locale_parent_id_unique" ON "recipes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_ingredient_sections_section_ingredients_order_idx" ON "_recipes_v_version_ingredient_sections_section_ingredients" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_ingredient_sections_section_ingredients_parent_id_idx" ON "_recipes_v_version_ingredient_sections_section_ingredients" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_ingredient_sections_section_ingredients_quantity_type_idx" ON "_recipes_v_version_ingredient_sections_section_ingredients" USING btree ("quantity_type_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_ingredient_sections_section_ingredients_ingredient_idx" ON "_recipes_v_version_ingredient_sections_section_ingredients" USING btree ("ingredient_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_ingredient_sections_order_idx" ON "_recipes_v_version_ingredient_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_ingredient_sections_parent_id_idx" ON "_recipes_v_version_ingredient_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_recipes_v_version_ingredient_sections_locales_locale_parent_id_unique" ON "_recipes_v_version_ingredient_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_step_sections_section_steps_order_idx" ON "_recipes_v_version_step_sections_section_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_step_sections_section_steps_parent_id_idx" ON "_recipes_v_version_step_sections_section_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_recipes_v_version_step_sections_section_steps_locales_locale_parent_id_unique" ON "_recipes_v_version_step_sections_section_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_step_sections_order_idx" ON "_recipes_v_version_step_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_step_sections_parent_id_idx" ON "_recipes_v_version_step_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_recipes_v_version_step_sections_locales_locale_parent_id_unique" ON "_recipes_v_version_step_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_images_order_idx" ON "_recipes_v_version_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_images_parent_id_idx" ON "_recipes_v_version_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_images_image_idx" ON "_recipes_v_version_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_parent_idx" ON "_recipes_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_version_uuid_idx" ON "_recipes_v" USING btree ("version_uuid");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_version_source_idx" ON "_recipes_v" USING btree ("version_source_id");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_version_updated_at_idx" ON "_recipes_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_version_created_at_idx" ON "_recipes_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_recipes_v_version_version__status_idx" ON "_recipes_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_recipes_v_created_at_idx" ON "_recipes_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_recipes_v_updated_at_idx" ON "_recipes_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_recipes_v_snapshot_idx" ON "_recipes_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_recipes_v_published_locale_idx" ON "_recipes_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_recipes_v_latest_idx" ON "_recipes_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_recipes_v_autosave_idx" ON "_recipes_v" USING btree ("autosave");
  CREATE UNIQUE INDEX IF NOT EXISTS "_recipes_v_locales_locale_parent_id_unique" ON "_recipes_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "images_updated_at_idx" ON "images" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "images_created_at_idx" ON "images" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "images_filename_idx" ON "images" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "images_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "images" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "images_sizes_card_sizes_card_filename_idx" ON "images" USING btree ("sizes_card_filename");
  CREATE INDEX IF NOT EXISTS "recipe_sources_updated_at_idx" ON "recipe_sources" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "recipe_sources_created_at_idx" ON "recipe_sources" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "recipe_quantity_type_updated_at_idx" ON "recipe_quantity_type" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "recipe_quantity_type_created_at_idx" ON "recipe_quantity_type" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "recipe_quantity_type_locales_locale_parent_id_unique" ON "recipe_quantity_type_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "recipe_ingredient_recipe_idx" ON "recipe_ingredient" USING btree ("recipe_id");
  CREATE INDEX IF NOT EXISTS "recipe_ingredient_updated_at_idx" ON "recipe_ingredient" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "recipe_ingredient_created_at_idx" ON "recipe_ingredient" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "recipe_ingredient_locales_locale_parent_id_unique" ON "recipe_ingredient_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_images_id_idx" ON "payload_locked_documents_rels" USING btree ("images_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_persons_id_idx" ON "payload_locked_documents_rels" USING btree ("persons_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cover_arts_id_idx" ON "payload_locked_documents_rels" USING btree ("cover_arts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_releases_id_idx" ON "payload_locked_documents_rels" USING btree ("releases_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contribution_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("contribution_roles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_genres_id_idx" ON "payload_locked_documents_rels" USING btree ("genres_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_songs_id_idx" ON "payload_locked_documents_rels" USING btree ("songs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipes_id_idx" ON "payload_locked_documents_rels" USING btree ("recipes_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipe_sources_id_idx" ON "payload_locked_documents_rels" USING btree ("recipe_sources_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipe_quantity_type_id_idx" ON "payload_locked_documents_rels" USING btree ("recipe_quantity_type_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipe_ingredient_id_idx" ON "payload_locked_documents_rels" USING btree ("recipe_ingredient_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  ALTER TABLE "users" DROP COLUMN IF EXISTS "superadmin";
  DROP TYPE "public"."enum_admins_tenants";`)
}
