import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_releases_languages" AS ENUM('english', 'german');
  CREATE TABLE IF NOT EXISTS "genres" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "releases_languages" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_releases_languages",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "releases_tracks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"addition" varchar,
  	"duration" numeric,
  	"song_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "songs_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"person_id" integer NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "songs" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  
  CREATE TABLE IF NOT EXISTS "songs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"contribution_roles_id" integer
  );
  
  ALTER TABLE "releases" ADD COLUMN "summary" varchar;
  ALTER TABLE "releases" ADD COLUMN "description" jsonb;
  ALTER TABLE "releases" ADD COLUMN "shops_amazonmusic" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_deezer" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_qobuz" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_tidal" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_spotify" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_anghami" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_applemusic" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_pandora" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_youtubemusic" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_awa" varchar;
  ALTER TABLE "releases" ADD COLUMN "shops_soundcloud" varchar;
  ALTER TABLE "releases_rels" ADD COLUMN "genres_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "genres_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "songs_id" integer;
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
  
  CREATE INDEX IF NOT EXISTS "genres_updated_at_idx" ON "genres" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "genres_created_at_idx" ON "genres" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "releases_languages_order_idx" ON "releases_languages" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "releases_languages_parent_idx" ON "releases_languages" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "releases_tracks_order_idx" ON "releases_tracks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "releases_tracks_parent_id_idx" ON "releases_tracks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "releases_tracks_song_idx" ON "releases_tracks" USING btree ("song_id");
  CREATE INDEX IF NOT EXISTS "songs_authors_order_idx" ON "songs_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "songs_authors_parent_id_idx" ON "songs_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "songs_authors_person_idx" ON "songs_authors" USING btree ("person_id");
  CREATE INDEX IF NOT EXISTS "songs_updated_at_idx" ON "songs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "songs_created_at_idx" ON "songs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "songs_rels_order_idx" ON "songs_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "songs_rels_parent_idx" ON "songs_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "songs_rels_path_idx" ON "songs_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "songs_rels_contribution_roles_id_idx" ON "songs_rels" USING btree ("contribution_roles_id");
  DO $$ BEGIN
   ALTER TABLE "releases_rels" ADD CONSTRAINT "releases_rels_genres_fk" FOREIGN KEY ("genres_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;
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
  
  CREATE INDEX IF NOT EXISTS "releases_rels_genres_id_idx" ON "releases_rels" USING btree ("genres_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_genres_id_idx" ON "payload_locked_documents_rels" USING btree ("genres_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_songs_id_idx" ON "payload_locked_documents_rels" USING btree ("songs_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "genres" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "releases_languages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "releases_tracks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "songs_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "songs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "songs_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "genres" CASCADE;
  DROP TABLE "releases_languages" CASCADE;
  DROP TABLE "releases_tracks" CASCADE;
  DROP TABLE "songs_authors" CASCADE;
  DROP TABLE "songs" CASCADE;
  DROP TABLE "songs_rels" CASCADE;
  ALTER TABLE "releases_rels" DROP CONSTRAINT "releases_rels_genres_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_genres_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_songs_fk";
  
  DROP INDEX IF EXISTS "releases_rels_genres_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_genres_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_songs_id_idx";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "summary";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_amazonmusic";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_deezer";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_qobuz";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_tidal";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_spotify";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_anghami";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_applemusic";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_pandora";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_youtubemusic";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_awa";
  ALTER TABLE "releases" DROP COLUMN IF EXISTS "shops_soundcloud";
  ALTER TABLE "releases_rels" DROP COLUMN IF EXISTS "genres_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "genres_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "songs_id";
  DROP TYPE "public"."enum_releases_languages";`)
}
