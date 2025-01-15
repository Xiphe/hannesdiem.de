import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es', 'de');
  CREATE TYPE "public"."enum_admins_tenants" AS ENUM('hannesdiem.de', 'hannesdiercks.de', 'rezepte.roxanna-diercks.de', 'dein-gedankenfluss.de');
  CREATE TYPE "public"."enum_hdm_releases_languages" AS ENUM('english', 'german');
  CREATE TYPE "public"."enum_rcps_recipes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rcps_recipes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rcps_recipes_v_published_locale" AS ENUM('en', 'es', 'de');
  CREATE TABLE IF NOT EXISTS "admins_tenants" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_admins_tenants",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "admins" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"superadmin" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "cache" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"expires" numeric NOT NULL,
  	"value" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
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
  
  CREATE TABLE IF NOT EXISTS "hdm_persons" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"link" varchar,
  	"og_profile" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_cover_arts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_releases_contributors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"person_id" uuid NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_releases_languages" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_hdm_releases_languages",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_releases_tracks" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"addition" varchar,
  	"duration" numeric,
  	"song_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_releases" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"subtitle" varchar,
  	"artist" varchar,
  	"release_date" timestamp(3) with time zone,
  	"hide_release_day" boolean,
  	"cover_id" uuid,
  	"summary" varchar,
  	"description" jsonb,
  	"shops_amazonmusic" varchar,
  	"shops_deezer" varchar,
  	"shops_qobuz" varchar,
  	"shops_tidal" varchar,
  	"shops_spotify" varchar,
  	"shops_anghami" varchar,
  	"shops_applemusic" varchar,
  	"shops_pandora" varchar,
  	"shops_youtubemusic" varchar,
  	"shops_awa" varchar,
  	"shops_soundcloud" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_releases_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"hdm_contribution_roles_id" uuid,
  	"hdm_genres_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_contribution_roles" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"role" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_genres" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_songs_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"person_id" uuid NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_songs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"slug" varchar NOT NULL,
  	"sumrary" varchar,
  	"creation_date" timestamp(3) with time zone,
  	"hide_creation_day" boolean,
  	"lyrics" jsonb,
  	"description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "hdm_songs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"hdm_contribution_roles_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_ingredient_sections_section_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quantity" numeric,
  	"quantity_type_id" uuid,
  	"ingredient_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_ingredient_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_ingredient_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_step_sections_section_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_step_sections_section_steps_locales" (
  	"step" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_step_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_step_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"uuid" varchar,
  	"duration" numeric,
  	"cooking_duration" numeric,
  	"serves" numeric,
  	"default_scale" numeric DEFAULT 1,
  	"source_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_rcps_recipes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_locales" (
  	"name" varchar,
  	"notes" jsonb,
  	"neutritional_info" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"quantity" numeric,
  	"quantity_type_id" uuid,
  	"ingredient_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_step_sections_section_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_step_sections_section_steps_locales" (
  	"step" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_step_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_step_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_uuid" varchar,
  	"version_duration" numeric,
  	"version_cooking_duration" numeric,
  	"version_serves" numeric,
  	"version_default_scale" numeric DEFAULT 1,
  	"version_source_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__rcps_recipes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__rcps_recipes_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_locales" (
  	"version_name" varchar,
  	"version_notes" jsonb,
  	"version_neutritional_info" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_images" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_sources" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_quantity_types" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_quantity_types_locales" (
  	"name" varchar NOT NULL,
  	"singular" varchar,
  	"plural" varchar,
  	"fraction" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_ingredients" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"recipe_id" uuid,
  	"affiliate_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_ingredients_locales" (
  	"name" varchar NOT NULL,
  	"plural" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" uuid,
  	"cache_id" uuid,
  	"gdf_pages_id" uuid,
  	"hdm_persons_id" uuid,
  	"hdm_cover_arts_id" uuid,
  	"hdm_releases_id" uuid,
  	"hdm_contribution_roles_id" uuid,
  	"hdm_genres_id" uuid,
  	"hdm_songs_id" uuid,
  	"rcps_recipes_id" uuid,
  	"rcps_images_id" uuid,
  	"rcps_sources_id" uuid,
  	"rcps_quantity_types_id" uuid,
  	"rcps_ingredients_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "admins_tenants" ADD CONSTRAINT "admins_tenants_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "gdf_pages_blocks_richtext" ADD CONSTRAINT "gdf_pages_blocks_richtext_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gdf_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cache_fk" FOREIGN KEY ("cache_id") REFERENCES "public"."cache"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gdf_pages_fk" FOREIGN KEY ("gdf_pages_id") REFERENCES "public"."gdf_pages"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "admins_tenants_order_idx" ON "admins_tenants" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "admins_tenants_parent_idx" ON "admins_tenants" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "admins_updated_at_idx" ON "admins" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "admins_created_at_idx" ON "admins" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "admins_email_idx" ON "admins" USING btree ("email");
  CREATE UNIQUE INDEX IF NOT EXISTS "cache_key_idx" ON "cache" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "cache_updated_at_idx" ON "cache" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cache_created_at_idx" ON "cache" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "gdf_pages_blocks_richtext_order_idx" ON "gdf_pages_blocks_richtext" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "gdf_pages_blocks_richtext_parent_id_idx" ON "gdf_pages_blocks_richtext" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "gdf_pages_blocks_richtext_path_idx" ON "gdf_pages_blocks_richtext" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "gdf_pages_slug_idx" ON "gdf_pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "gdf_pages_updated_at_idx" ON "gdf_pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "gdf_pages_created_at_idx" ON "gdf_pages" USING btree ("created_at");
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
  CREATE INDEX IF NOT EXISTS "rcps_images_updated_at_idx" ON "rcps_images" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_images_created_at_idx" ON "rcps_images" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_images_filename_idx" ON "rcps_images" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "rcps_images_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "rcps_images" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "rcps_images_sizes_card_sizes_card_filename_idx" ON "rcps_images" USING btree ("sizes_card_filename");
  CREATE INDEX IF NOT EXISTS "rcps_sources_updated_at_idx" ON "rcps_sources" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_sources_created_at_idx" ON "rcps_sources" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "rcps_quantity_types_updated_at_idx" ON "rcps_quantity_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_quantity_types_created_at_idx" ON "rcps_quantity_types" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_quantity_types_locales_locale_parent_id_unique" ON "rcps_quantity_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_ingredients_recipe_idx" ON "rcps_ingredients" USING btree ("recipe_id");
  CREATE INDEX IF NOT EXISTS "rcps_ingredients_updated_at_idx" ON "rcps_ingredients" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_ingredients_created_at_idx" ON "rcps_ingredients" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_ingredients_locales_locale_parent_id_unique" ON "rcps_ingredients_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_admins_id_idx" ON "payload_locked_documents_rels" USING btree ("admins_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cache_id_idx" ON "payload_locked_documents_rels" USING btree ("cache_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gdf_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("gdf_pages_id");
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
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_admins_id_idx" ON "payload_preferences_rels" USING btree ("admins_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "admins_tenants" CASCADE;
  DROP TABLE "admins" CASCADE;
  DROP TABLE "cache" CASCADE;
  DROP TABLE "gdf_pages_blocks_richtext" CASCADE;
  DROP TABLE "gdf_pages" CASCADE;
  DROP TABLE "hdm_persons" CASCADE;
  DROP TABLE "hdm_cover_arts" CASCADE;
  DROP TABLE "hdm_releases_contributors" CASCADE;
  DROP TABLE "hdm_releases_languages" CASCADE;
  DROP TABLE "hdm_releases_tracks" CASCADE;
  DROP TABLE "hdm_releases" CASCADE;
  DROP TABLE "hdm_releases_rels" CASCADE;
  DROP TABLE "hdm_contribution_roles" CASCADE;
  DROP TABLE "hdm_genres" CASCADE;
  DROP TABLE "hdm_songs_authors" CASCADE;
  DROP TABLE "hdm_songs" CASCADE;
  DROP TABLE "hdm_songs_rels" CASCADE;
  DROP TABLE "rcps_recipes_ingredient_sections_section_ingredients" CASCADE;
  DROP TABLE "rcps_recipes_ingredient_sections" CASCADE;
  DROP TABLE "rcps_recipes_ingredient_sections_locales" CASCADE;
  DROP TABLE "rcps_recipes_step_sections_section_steps" CASCADE;
  DROP TABLE "rcps_recipes_step_sections_section_steps_locales" CASCADE;
  DROP TABLE "rcps_recipes_step_sections" CASCADE;
  DROP TABLE "rcps_recipes_step_sections_locales" CASCADE;
  DROP TABLE "rcps_recipes_images" CASCADE;
  DROP TABLE "rcps_recipes" CASCADE;
  DROP TABLE "rcps_recipes_locales" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_ingredient_sections" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_ingredient_sections_locales" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_step_sections_section_steps" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_step_sections_section_steps_locales" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_step_sections" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_step_sections_locales" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_images" CASCADE;
  DROP TABLE "_rcps_recipes_v" CASCADE;
  DROP TABLE "_rcps_recipes_v_locales" CASCADE;
  DROP TABLE "rcps_images" CASCADE;
  DROP TABLE "rcps_sources" CASCADE;
  DROP TABLE "rcps_quantity_types" CASCADE;
  DROP TABLE "rcps_quantity_types_locales" CASCADE;
  DROP TABLE "rcps_ingredients" CASCADE;
  DROP TABLE "rcps_ingredients_locales" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_admins_tenants";
  DROP TYPE "public"."enum_hdm_releases_languages";
  DROP TYPE "public"."enum_rcps_recipes_status";
  DROP TYPE "public"."enum__rcps_recipes_v_version_status";
  DROP TYPE "public"."enum__rcps_recipes_v_published_locale";`)
}
