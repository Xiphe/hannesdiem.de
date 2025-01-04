import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_rcps_quantity_types_hidden" AS ENUM('singular', 'plural', 'fraction');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'rcps-extract-ingredients', 'rcps-translate-step', 'rcps-translate-section-title', 'rcps-import-recipe-images', 'rcps-translate');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_workflow_slug" AS ENUM('rcps-import-recipe');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'rcps-extract-ingredients', 'rcps-translate-step', 'rcps-translate-section-title', 'rcps-import-recipe-images', 'rcps-translate');
  CREATE TABLE IF NOT EXISTS "rcps_quantity_types_hidden" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_rcps_quantity_types_hidden",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_quantity_types_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_ingredients_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_crumbles" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"workflow_slug" "enum_payload_jobs_workflow_slug",
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "rcps_recipes_ingredient_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rcps_recipes_step_sections_section_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rcps_recipes_step_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "rcps_recipes_ingredient_sections_locales" CASCADE;
  DROP TABLE "rcps_recipes_step_sections_section_steps_locales" CASCADE;
  DROP TABLE "rcps_recipes_step_sections_locales" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_ingredient_sections_locales" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_step_sections_section_steps_locales" CASCADE;
  DROP TABLE "_rcps_recipes_v_version_step_sections_locales" CASCADE;
  ALTER TABLE "rcps_ingredients_locales" RENAME COLUMN "name" TO "singular";
  ALTER TABLE "rcps_recipes" DROP CONSTRAINT "rcps_recipes_source_id_rcps_sources_id_fk";
  
  ALTER TABLE "_rcps_recipes_v" DROP CONSTRAINT "_rcps_recipes_v_version_source_id_rcps_sources_id_fk";
  
  DROP INDEX IF EXISTS "rcps_recipes_source_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_version_source_idx";
  ALTER TABLE "rcps_quantity_types_locales" ALTER COLUMN "singular" SET NOT NULL;
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" ADD COLUMN "note" varchar;
  ALTER TABLE "rcps_recipes_ingredient_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "rcps_recipes_ingredient_sections" ADD COLUMN "title" varchar;
  ALTER TABLE "rcps_recipes_step_sections_section_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "rcps_recipes_step_sections_section_steps" ADD COLUMN "step" jsonb;
  ALTER TABLE "rcps_recipes_step_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "rcps_recipes_step_sections" ADD COLUMN "title" varchar;
  ALTER TABLE "rcps_recipes" ADD COLUMN "last_edit_by" numeric;
  ALTER TABLE "rcps_recipes" ADD COLUMN "publish_imports" boolean;
  ALTER TABLE "rcps_recipes" ADD COLUMN "source" varchar;
  ALTER TABLE "rcps_recipes" ADD COLUMN "source_name" varchar;
  ALTER TABLE "rcps_recipes_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" ADD COLUMN "note" varchar;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" ADD COLUMN "title" varchar;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" ADD COLUMN "step" jsonb;
  ALTER TABLE "_rcps_recipes_v_version_step_sections" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_rcps_recipes_v_version_step_sections" ADD COLUMN "title" varchar;
  ALTER TABLE "_rcps_recipes_v" ADD COLUMN "version_last_edit_by" numeric;
  ALTER TABLE "_rcps_recipes_v" ADD COLUMN "version_publish_imports" boolean;
  ALTER TABLE "_rcps_recipes_v" ADD COLUMN "version_source" varchar;
  ALTER TABLE "_rcps_recipes_v" ADD COLUMN "version_source_name" varchar;
  ALTER TABLE "_rcps_recipes_v_locales" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "rcps_quantity_types_locales" ADD COLUMN "unit" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rcps_crumbles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_jobs_id" integer;
  DO $$ BEGIN
   ALTER TABLE "rcps_quantity_types_hidden" ADD CONSTRAINT "rcps_quantity_types_hidden_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rcps_quantity_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_quantity_types_texts" ADD CONSTRAINT "rcps_quantity_types_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rcps_quantity_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_ingredients_texts" ADD CONSTRAINT "rcps_ingredients_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rcps_ingredients"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "rcps_quantity_types_hidden_order_idx" ON "rcps_quantity_types_hidden" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "rcps_quantity_types_hidden_parent_idx" ON "rcps_quantity_types_hidden" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_quantity_types_hidden_locale_idx" ON "rcps_quantity_types_hidden" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "rcps_quantity_types_texts_order_parent_idx" ON "rcps_quantity_types_texts" USING btree ("order","parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_ingredients_texts_order_parent_idx" ON "rcps_ingredients_texts" USING btree ("order","parent_id");
  CREATE INDEX IF NOT EXISTS "rcps_crumbles_updated_at_idx" ON "rcps_crumbles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rcps_crumbles_created_at_idx" ON "rcps_crumbles" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_crumbles_filename_idx" ON "rcps_crumbles" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_workflow_slug_idx" ON "payload_jobs" USING btree ("workflow_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rcps_crumbles_fk" FOREIGN KEY ("rcps_crumbles_id") REFERENCES "public"."rcps_crumbles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_section_ingredients_locale_idx" ON "rcps_recipes_ingredient_sections_section_ingredients" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_locale_idx" ON "rcps_recipes_ingredient_sections" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_step_sections_section_steps_locale_idx" ON "rcps_recipes_step_sections_section_steps" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "rcps_recipes_step_sections_locale_idx" ON "rcps_recipes_step_sections" USING btree ("_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_recipes_slug_idx" ON "rcps_recipes_locales" USING btree ("slug","_locale");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_locale_idx" ON "_rcps_recipes_v_version_ingredient_sections_section_ingredients" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_locale_idx" ON "_rcps_recipes_v_version_ingredient_sections" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_section_steps_locale_idx" ON "_rcps_recipes_v_version_step_sections_section_steps" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_locale_idx" ON "_rcps_recipes_v_version_step_sections" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_version_slug_idx" ON "_rcps_recipes_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rcps_crumbles_id_idx" ON "payload_locked_documents_rels" USING btree ("rcps_crumbles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  ALTER TABLE "rcps_recipes" DROP COLUMN IF EXISTS "source_id";
  ALTER TABLE "_rcps_recipes_v" DROP COLUMN IF EXISTS "version_source_id";
  ALTER TABLE "rcps_quantity_types_locales" DROP COLUMN IF EXISTS "name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "rcps_recipes_ingredient_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_step_sections_section_steps_locales" (
  	"step" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rcps_recipes_step_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_step_sections_section_steps_locales" (
  	"step" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_rcps_recipes_v_version_step_sections_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "rcps_quantity_types_hidden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rcps_quantity_types_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rcps_ingredients_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rcps_crumbles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "rcps_quantity_types_hidden" CASCADE;
  DROP TABLE "rcps_quantity_types_texts" CASCADE;
  DROP TABLE "rcps_ingredients_texts" CASCADE;
  DROP TABLE "rcps_crumbles" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  ALTER TABLE "rcps_quantity_types_locales" RENAME COLUMN "unit" TO "name";
  ALTER TABLE "rcps_ingredients_locales" RENAME COLUMN "singular" TO "name";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rcps_crumbles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk";
  
  DROP INDEX IF EXISTS "rcps_recipes_ingredient_sections_section_ingredients_locale_idx";
  DROP INDEX IF EXISTS "rcps_recipes_ingredient_sections_locale_idx";
  DROP INDEX IF EXISTS "rcps_recipes_step_sections_section_steps_locale_idx";
  DROP INDEX IF EXISTS "rcps_recipes_step_sections_locale_idx";
  DROP INDEX IF EXISTS "rcps_recipes_slug_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_ingredient_sections_section_ingredients_locale_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_ingredient_sections_locale_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_step_sections_section_steps_locale_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_step_sections_locale_idx";
  DROP INDEX IF EXISTS "_rcps_recipes_v_version_version_slug_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_rcps_crumbles_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_payload_jobs_id_idx";
  ALTER TABLE "rcps_quantity_types_locales" ALTER COLUMN "singular" DROP NOT NULL;
  ALTER TABLE "rcps_recipes" ADD COLUMN "source_id" integer;
  ALTER TABLE "_rcps_recipes_v" ADD COLUMN "version_source_id" integer;
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_ingredient_sections_locales" ADD CONSTRAINT "rcps_recipes_ingredient_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_step_sections_section_steps_locales" ADD CONSTRAINT "rcps_recipes_step_sections_section_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes_step_sections_section_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes_step_sections_locales" ADD CONSTRAINT "rcps_recipes_step_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rcps_recipes_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_locales" ADD CONSTRAINT "_rcps_recipes_v_version_ingredient_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v_version_ingredient_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps_locales" ADD CONSTRAINT "_rcps_recipes_v_version_step_sections_section_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v_version_step_sections_section_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v_version_step_sections_locales" ADD CONSTRAINT "_rcps_recipes_v_version_step_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rcps_recipes_v_version_step_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_recipes_ingredient_sections_locales_locale_parent_id_unique" ON "rcps_recipes_ingredient_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_recipes_step_sections_section_steps_locales_locale_parent_id_unique" ON "rcps_recipes_step_sections_section_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "rcps_recipes_step_sections_locales_locale_parent_id_unique" ON "rcps_recipes_step_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_rcps_recipes_v_version_ingredient_sections_locales_locale_parent_id_unique" ON "_rcps_recipes_v_version_ingredient_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_section_steps_locales_locale_parent_id_unique" ON "_rcps_recipes_v_version_step_sections_section_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_rcps_recipes_v_version_step_sections_locales_locale_parent_id_unique" ON "_rcps_recipes_v_version_step_sections_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "rcps_recipes" ADD CONSTRAINT "rcps_recipes_source_id_rcps_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."rcps_sources"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_rcps_recipes_v" ADD CONSTRAINT "_rcps_recipes_v_version_source_id_rcps_sources_id_fk" FOREIGN KEY ("version_source_id") REFERENCES "public"."rcps_sources"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "rcps_recipes_source_idx" ON "rcps_recipes" USING btree ("source_id");
  CREATE INDEX IF NOT EXISTS "_rcps_recipes_v_version_version_source_idx" ON "_rcps_recipes_v" USING btree ("version_source_id");
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "rcps_recipes_ingredient_sections_section_ingredients" DROP COLUMN IF EXISTS "note";
  ALTER TABLE "rcps_recipes_ingredient_sections" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "rcps_recipes_ingredient_sections" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "rcps_recipes_step_sections_section_steps" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "rcps_recipes_step_sections_section_steps" DROP COLUMN IF EXISTS "step";
  ALTER TABLE "rcps_recipes_step_sections" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "rcps_recipes_step_sections" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "rcps_recipes" DROP COLUMN IF EXISTS "last_edit_by";
  ALTER TABLE "rcps_recipes" DROP COLUMN IF EXISTS "publish_imports";
  ALTER TABLE "rcps_recipes" DROP COLUMN IF EXISTS "source";
  ALTER TABLE "rcps_recipes" DROP COLUMN IF EXISTS "source_name";
  ALTER TABLE "rcps_recipes_locales" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections_section_ingredients" DROP COLUMN IF EXISTS "note";
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_rcps_recipes_v_version_ingredient_sections" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_rcps_recipes_v_version_step_sections_section_steps" DROP COLUMN IF EXISTS "step";
  ALTER TABLE "_rcps_recipes_v_version_step_sections" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_rcps_recipes_v_version_step_sections" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_rcps_recipes_v" DROP COLUMN IF EXISTS "version_last_edit_by";
  ALTER TABLE "_rcps_recipes_v" DROP COLUMN IF EXISTS "version_publish_imports";
  ALTER TABLE "_rcps_recipes_v" DROP COLUMN IF EXISTS "version_source";
  ALTER TABLE "_rcps_recipes_v" DROP COLUMN IF EXISTS "version_source_name";
  ALTER TABLE "_rcps_recipes_v_locales" DROP COLUMN IF EXISTS "version_slug";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "rcps_crumbles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "payload_jobs_id";
  DROP TYPE "public"."enum_rcps_quantity_types_hidden";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_workflow_slug";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
