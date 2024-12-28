import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es', 'de');
  CREATE TYPE "public"."enum_recipes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__recipes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__recipes_v_published_locale" AS ENUM('en', 'es', 'de');
  CREATE TABLE IF NOT EXISTS "images" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  
  CREATE TABLE IF NOT EXISTS "recipes_ingredient_sections_section_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quantity" numeric,
  	"quantity_type_id" integer,
  	"ingredient_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "recipes_ingredient_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipes_ingredient_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipes_step_sections_section_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipes_step_sections_section_steps_locales" (
  	"step" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipes_step_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipes_step_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipes_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "recipes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"uuid" varchar,
  	"duration" numeric,
  	"cooking_duration" numeric,
  	"serves" numeric,
  	"default_scale" numeric DEFAULT 1,
  	"source_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_recipes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "recipes_locales" (
  	"name" varchar,
  	"notes" jsonb,
  	"neutritional_info" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v_version_ingredient_sections_section_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quantity" numeric,
  	"quantity_type_id" integer,
  	"ingredient_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v_version_ingredient_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v_version_ingredient_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v_version_step_sections_section_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v_version_step_sections_section_steps_locales" (
  	"step" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v_version_step_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v_version_step_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_uuid" varchar,
  	"version_duration" numeric,
  	"version_cooking_duration" numeric,
  	"version_serves" numeric,
  	"version_default_scale" numeric DEFAULT 1,
  	"version_source_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__recipes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__recipes_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_recipes_v_locales" (
  	"version_name" varchar,
  	"version_notes" jsonb,
  	"version_neutritional_info" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipe_sources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipe_quantity_type" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipe_quantity_type_locales" (
  	"name" varchar NOT NULL,
  	"singular" varchar,
  	"plural" varchar,
  	"fraction" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipe_ingredient" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"recipe_id" integer,
  	"affiliate_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipe_ingredient_locales" (
  	"name" varchar NOT NULL,
  	"plural" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "images_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recipes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recipe_sources_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recipe_quantity_type_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recipe_ingredient_id" integer;
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
  
  CREATE INDEX IF NOT EXISTS "images_updated_at_idx" ON "images" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "images_created_at_idx" ON "images" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "images_filename_idx" ON "images" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "images_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "images" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "images_sizes_card_sizes_card_filename_idx" ON "images" USING btree ("sizes_card_filename");
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
  CREATE INDEX IF NOT EXISTS "recipe_sources_updated_at_idx" ON "recipe_sources" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "recipe_sources_created_at_idx" ON "recipe_sources" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "recipe_quantity_type_updated_at_idx" ON "recipe_quantity_type" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "recipe_quantity_type_created_at_idx" ON "recipe_quantity_type" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "recipe_quantity_type_locales_locale_parent_id_unique" ON "recipe_quantity_type_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "recipe_ingredient_recipe_idx" ON "recipe_ingredient" USING btree ("recipe_id");
  CREATE INDEX IF NOT EXISTS "recipe_ingredient_updated_at_idx" ON "recipe_ingredient" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "recipe_ingredient_created_at_idx" ON "recipe_ingredient" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "recipe_ingredient_locales_locale_parent_id_unique" ON "recipe_ingredient_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
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
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_images_id_idx" ON "payload_locked_documents_rels" USING btree ("images_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipes_id_idx" ON "payload_locked_documents_rels" USING btree ("recipes_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipe_sources_id_idx" ON "payload_locked_documents_rels" USING btree ("recipe_sources_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipe_quantity_type_id_idx" ON "payload_locked_documents_rels" USING btree ("recipe_quantity_type_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_recipe_ingredient_id_idx" ON "payload_locked_documents_rels" USING btree ("recipe_ingredient_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_ingredient_sections_section_ingredients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_ingredient_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_ingredient_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_step_sections_section_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_step_sections_section_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_step_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_step_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_ingredient_sections_section_ingredients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_ingredient_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_ingredient_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_step_sections_section_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_step_sections_section_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_step_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_step_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_version_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipe_sources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipe_quantity_type" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipe_quantity_type_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipe_ingredient" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipe_ingredient_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "images" CASCADE;
  DROP TABLE "recipes_ingredient_sections_section_ingredients" CASCADE;
  DROP TABLE "recipes_ingredient_sections" CASCADE;
  DROP TABLE "recipes_ingredient_sections_locales" CASCADE;
  DROP TABLE "recipes_step_sections_section_steps" CASCADE;
  DROP TABLE "recipes_step_sections_section_steps_locales" CASCADE;
  DROP TABLE "recipes_step_sections" CASCADE;
  DROP TABLE "recipes_step_sections_locales" CASCADE;
  DROP TABLE "recipes_images" CASCADE;
  DROP TABLE "recipes" CASCADE;
  DROP TABLE "recipes_locales" CASCADE;
  DROP TABLE "_recipes_v_version_ingredient_sections_section_ingredients" CASCADE;
  DROP TABLE "_recipes_v_version_ingredient_sections" CASCADE;
  DROP TABLE "_recipes_v_version_ingredient_sections_locales" CASCADE;
  DROP TABLE "_recipes_v_version_step_sections_section_steps" CASCADE;
  DROP TABLE "_recipes_v_version_step_sections_section_steps_locales" CASCADE;
  DROP TABLE "_recipes_v_version_step_sections" CASCADE;
  DROP TABLE "_recipes_v_version_step_sections_locales" CASCADE;
  DROP TABLE "_recipes_v_version_images" CASCADE;
  DROP TABLE "_recipes_v" CASCADE;
  DROP TABLE "_recipes_v_locales" CASCADE;
  DROP TABLE "recipe_sources" CASCADE;
  DROP TABLE "recipe_quantity_type" CASCADE;
  DROP TABLE "recipe_quantity_type_locales" CASCADE;
  DROP TABLE "recipe_ingredient" CASCADE;
  DROP TABLE "recipe_ingredient_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_images_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipe_sources_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipe_quantity_type_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipe_ingredient_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_images_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_recipes_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_recipe_sources_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_recipe_quantity_type_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_recipe_ingredient_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "images_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "recipes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "recipe_sources_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "recipe_quantity_type_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "recipe_ingredient_id";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_recipes_status";
  DROP TYPE "public"."enum__recipes_v_version_status";
  DROP TYPE "public"."enum__recipes_v_published_locale";`)
}
