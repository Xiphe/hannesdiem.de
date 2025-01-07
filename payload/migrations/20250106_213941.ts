import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "cache" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"expires" numeric NOT NULL,
  	"value" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cache_id" integer;
  CREATE UNIQUE INDEX IF NOT EXISTS "cache_key_idx" ON "cache" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "cache_updated_at_idx" ON "cache" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cache_created_at_idx" ON "cache" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cache_fk" FOREIGN KEY ("cache_id") REFERENCES "public"."cache"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cache_id_idx" ON "payload_locked_documents_rels" USING btree ("cache_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cache" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "cache" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cache_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_cache_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "cache_id";`)
}
