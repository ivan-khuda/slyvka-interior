import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_tags" AS ENUM('family', 'apartment', 'holiday', 'small-footprint', 'restoration');
  CREATE TYPE "public"."enum__projects_v_version_type" AS ENUM('family-home', 'apartment', 'holiday-home', 'residential');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('en', 'uk', 'cs');
  CREATE TYPE "public"."enum_press_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__press_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__press_v_published_locale" AS ENUM('en', 'uk', 'cs');
  CREATE TYPE "public"."enum_site_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_published_locale" AS ENUM('en', 'uk', 'cs');
  CREATE TABLE "_projects_v_version_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__projects_v_version_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_slug" varchar,
  	"version_year" varchar,
  	"version_type" "enum__projects_v_version_type",
  	"version_sqm" varchar,
  	"version_rooms" varchar,
  	"version_swatch" varchar DEFAULT '#C9A6A6',
  	"version_swatch2" varchar DEFAULT '#6B3C4F',
  	"version_feature" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_name" varchar,
  	"version_location" varchar,
  	"version_blurb" varchar,
  	"version_cover" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_press_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_name" varchar,
  	"version_edition" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__press_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__press_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_v_version_hero_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"word" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_services_items_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"summary" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_footer_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_study_stat_area_value" varchar,
  	"version_study_stat_time_value" varchar,
  	"version_study_stat_color_value" varchar,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version__status" "enum__site_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_v_locales" (
  	"version_hero_logo_mark" varchar,
  	"version_hero_eyebrow" varchar,
  	"version_hero_title_l1" varchar,
  	"version_hero_title_l2_a" varchar,
  	"version_hero_title_l2_b" varchar,
  	"version_hero_title_l3" varchar,
  	"version_hero_cta_work" varchar,
  	"version_hero_cta_talk" varchar,
  	"version_hero_blurb" varchar,
  	"version_hero_booking_label" varchar,
  	"version_hero_booking_value" varchar,
  	"version_work_eyebrow" varchar,
  	"version_work_title_l1" varchar,
  	"version_work_title_l2" varchar,
  	"version_work_empty" varchar,
  	"version_work_view" varchar,
  	"version_work_filters_all" varchar,
  	"version_work_filters_family" varchar,
  	"version_work_filters_apartment" varchar,
  	"version_work_filters_holiday" varchar,
  	"version_work_filters_small_footprint" varchar,
  	"version_work_filters_restoration" varchar,
  	"version_work_project_types_family_home" varchar,
  	"version_work_project_types_apartment" varchar,
  	"version_work_project_types_holiday_home" varchar,
  	"version_work_project_types_residential" varchar,
  	"version_services_eyebrow" varchar,
  	"version_services_title_l1" varchar,
  	"version_services_title_l2" varchar,
  	"version_services_intro" varchar,
  	"version_study_eyebrow" varchar,
  	"version_study_title" varchar,
  	"version_study_brief" varchar,
  	"version_study_brief_p1" varchar,
  	"version_study_brief_p2" varchar,
  	"version_study_stat_area" varchar,
  	"version_study_stat_time" varchar,
  	"version_study_stat_color" varchar,
  	"version_study_cta" varchar,
  	"version_contact_press_eyebrow" varchar,
  	"version_contact_eyebrow" varchar,
  	"version_contact_title_l1" varchar,
  	"version_contact_title_l2" varchar,
  	"version_contact_blurb" varchar,
  	"version_contact_studio" varchar,
  	"version_contact_hours" varchar,
  	"version_contact_direct" varchar,
  	"version_contact_tel" varchar,
  	"version_contact_address" varchar,
  	"version_contact_hours_value" varchar,
  	"version_contact_cta" varchar,
  	"version_footer_rights" varchar,
  	"version_lightbox_project" varchar,
  	"version_lightbox_close" varchar,
  	"version_lightbox_plate" varchar,
  	"version_lightbox_of" varchar,
  	"version_lightbox_type" varchar,
  	"version_lightbox_area" varchar,
  	"version_lightbox_rooms" varchar,
  	"version_lightbox_year" varchar,
  	"version_lightbox_location" varchar,
  	"version_lightbox_status" varchar,
  	"version_lightbox_completed" varchar,
  	"version_lightbox_palette" varchar,
  	"version_lightbox_palette_caption" varchar,
  	"version_lightbox_credits" varchar,
  	"version_lightbox_design" varchar,
  	"version_lightbox_photography" varchar,
  	"version_lightbox_joinery" varchar,
  	"version_lightbox_build" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "projects_images" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "year" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "type" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "sqm" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "rooms" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "swatch" DROP NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "swatch2" DROP NOT NULL;
  ALTER TABLE "projects_locales" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "projects_locales" ALTER COLUMN "location" DROP NOT NULL;
  ALTER TABLE "projects_locales" ALTER COLUMN "blurb" DROP NOT NULL;
  ALTER TABLE "press" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "press" ALTER COLUMN "edition" DROP NOT NULL;
  ALTER TABLE "site_hero_marquee" ALTER COLUMN "word" DROP NOT NULL;
  ALTER TABLE "site_services_items_deliverables" ALTER COLUMN "item" DROP NOT NULL;
  ALTER TABLE "site_services_items" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "site_services_items" ALTER COLUMN "summary" DROP NOT NULL;
  ALTER TABLE "site_services_items" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "site_footer_socials" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "site_footer_socials" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "study_stat_area_value" DROP NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "study_stat_time_value" DROP NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "study_stat_color_value" DROP NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "contact_email" DROP NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "contact_phone" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_logo_mark" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_eyebrow" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_title_l1" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_title_l2_a" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_title_l2_b" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_title_l3" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_cta_work" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_cta_talk" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_blurb" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_booking_label" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_booking_value" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_eyebrow" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_title_l1" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_title_l2" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_empty" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_view" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_all" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_family" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_apartment" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_holiday" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_small_footprint" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_restoration" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_project_types_family_home" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_project_types_apartment" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_project_types_holiday_home" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_project_types_residential" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "services_eyebrow" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "services_title_l1" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "services_title_l2" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "services_intro" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_eyebrow" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_title" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_brief" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_brief_p1" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_brief_p2" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_stat_area" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_stat_time" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_stat_color" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_cta" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_press_eyebrow" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_eyebrow" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_title_l1" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_title_l2" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_blurb" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_studio" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_hours" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_direct" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_tel" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_address" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_hours_value" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_cta" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "footer_rights" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_project" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_close" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_plate" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_of" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_type" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_area" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_rooms" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_year" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_location" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_status" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_completed" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_palette" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_palette_caption" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_credits" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_design" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_photography" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_joinery" DROP NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_build" DROP NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "_status" "enum_projects_status" DEFAULT 'draft';
  ALTER TABLE "press" ADD COLUMN "_status" "enum_press_status" DEFAULT 'draft';
  ALTER TABLE "site" ADD COLUMN "_status" "enum_site_status" DEFAULT 'draft';
  ALTER TABLE "_projects_v_version_tags" ADD CONSTRAINT "_projects_v_version_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_images" ADD CONSTRAINT "_projects_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_images" ADD CONSTRAINT "_projects_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_press_v" ADD CONSTRAINT "_press_v_parent_id_press_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."press"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_hero_marquee" ADD CONSTRAINT "_site_v_version_hero_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_services_items_deliverables" ADD CONSTRAINT "_site_v_version_services_items_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v_version_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_services_items" ADD CONSTRAINT "_site_v_version_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_footer_socials" ADD CONSTRAINT "_site_v_version_footer_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_locales" ADD CONSTRAINT "_site_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_projects_v_version_tags_order_idx" ON "_projects_v_version_tags" USING btree ("order");
  CREATE INDEX "_projects_v_version_tags_parent_idx" ON "_projects_v_version_tags" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_images_order_idx" ON "_projects_v_version_images" USING btree ("_order");
  CREATE INDEX "_projects_v_version_images_parent_id_idx" ON "_projects_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_images_image_idx" ON "_projects_v_version_images" USING btree ("image_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version__order_idx" ON "_projects_v" USING btree ("version__order");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_press_v_parent_idx" ON "_press_v" USING btree ("parent_id");
  CREATE INDEX "_press_v_version_version__order_idx" ON "_press_v" USING btree ("version__order");
  CREATE INDEX "_press_v_version_version_updated_at_idx" ON "_press_v" USING btree ("version_updated_at");
  CREATE INDEX "_press_v_version_version_created_at_idx" ON "_press_v" USING btree ("version_created_at");
  CREATE INDEX "_press_v_version_version__status_idx" ON "_press_v" USING btree ("version__status");
  CREATE INDEX "_press_v_created_at_idx" ON "_press_v" USING btree ("created_at");
  CREATE INDEX "_press_v_updated_at_idx" ON "_press_v" USING btree ("updated_at");
  CREATE INDEX "_press_v_snapshot_idx" ON "_press_v" USING btree ("snapshot");
  CREATE INDEX "_press_v_published_locale_idx" ON "_press_v" USING btree ("published_locale");
  CREATE INDEX "_press_v_latest_idx" ON "_press_v" USING btree ("latest");
  CREATE INDEX "_press_v_autosave_idx" ON "_press_v" USING btree ("autosave");
  CREATE INDEX "_site_v_version_hero_marquee_order_idx" ON "_site_v_version_hero_marquee" USING btree ("_order");
  CREATE INDEX "_site_v_version_hero_marquee_parent_id_idx" ON "_site_v_version_hero_marquee" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_hero_marquee_locale_idx" ON "_site_v_version_hero_marquee" USING btree ("_locale");
  CREATE INDEX "_site_v_version_services_items_deliverables_order_idx" ON "_site_v_version_services_items_deliverables" USING btree ("_order");
  CREATE INDEX "_site_v_version_services_items_deliverables_parent_id_idx" ON "_site_v_version_services_items_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_services_items_deliverables_locale_idx" ON "_site_v_version_services_items_deliverables" USING btree ("_locale");
  CREATE INDEX "_site_v_version_services_items_order_idx" ON "_site_v_version_services_items" USING btree ("_order");
  CREATE INDEX "_site_v_version_services_items_parent_id_idx" ON "_site_v_version_services_items" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_services_items_locale_idx" ON "_site_v_version_services_items" USING btree ("_locale");
  CREATE INDEX "_site_v_version_footer_socials_order_idx" ON "_site_v_version_footer_socials" USING btree ("_order");
  CREATE INDEX "_site_v_version_footer_socials_parent_id_idx" ON "_site_v_version_footer_socials" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_version__status_idx" ON "_site_v" USING btree ("version__status");
  CREATE INDEX "_site_v_created_at_idx" ON "_site_v" USING btree ("created_at");
  CREATE INDEX "_site_v_updated_at_idx" ON "_site_v" USING btree ("updated_at");
  CREATE INDEX "_site_v_snapshot_idx" ON "_site_v" USING btree ("snapshot");
  CREATE INDEX "_site_v_published_locale_idx" ON "_site_v" USING btree ("published_locale");
  CREATE INDEX "_site_v_latest_idx" ON "_site_v" USING btree ("latest");
  CREATE INDEX "_site_v_autosave_idx" ON "_site_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_site_v_locales_locale_parent_id_unique" ON "_site_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "press__status_idx" ON "press" USING btree ("_status");
  CREATE INDEX "site__status_idx" ON "site" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_projects_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_press_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_v_version_hero_marquee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_v_version_services_items_deliverables" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_v_version_services_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_v_version_footer_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_projects_v_version_tags" CASCADE;
  DROP TABLE "_projects_v_version_images" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_press_v" CASCADE;
  DROP TABLE "_site_v_version_hero_marquee" CASCADE;
  DROP TABLE "_site_v_version_services_items_deliverables" CASCADE;
  DROP TABLE "_site_v_version_services_items" CASCADE;
  DROP TABLE "_site_v_version_footer_socials" CASCADE;
  DROP TABLE "_site_v" CASCADE;
  DROP TABLE "_site_v_locales" CASCADE;
  DROP INDEX "projects__status_idx";
  DROP INDEX "press__status_idx";
  DROP INDEX "site__status_idx";
  ALTER TABLE "projects_images" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "year" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "type" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "sqm" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "rooms" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "swatch" SET NOT NULL;
  ALTER TABLE "projects" ALTER COLUMN "swatch2" SET NOT NULL;
  ALTER TABLE "projects_locales" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "projects_locales" ALTER COLUMN "location" SET NOT NULL;
  ALTER TABLE "projects_locales" ALTER COLUMN "blurb" SET NOT NULL;
  ALTER TABLE "press" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "press" ALTER COLUMN "edition" SET NOT NULL;
  ALTER TABLE "site_hero_marquee" ALTER COLUMN "word" SET NOT NULL;
  ALTER TABLE "site_services_items_deliverables" ALTER COLUMN "item" SET NOT NULL;
  ALTER TABLE "site_services_items" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "site_services_items" ALTER COLUMN "summary" SET NOT NULL;
  ALTER TABLE "site_services_items" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "site_footer_socials" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "site_footer_socials" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "study_stat_area_value" SET NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "study_stat_time_value" SET NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "study_stat_color_value" SET NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "contact_email" SET NOT NULL;
  ALTER TABLE "site" ALTER COLUMN "contact_phone" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_logo_mark" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_eyebrow" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_title_l1" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_title_l2_a" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_title_l2_b" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_title_l3" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_cta_work" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_cta_talk" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_blurb" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_booking_label" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "hero_booking_value" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_eyebrow" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_title_l1" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_title_l2" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_empty" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_view" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_all" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_family" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_apartment" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_holiday" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_small_footprint" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_filters_restoration" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_project_types_family_home" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_project_types_apartment" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_project_types_holiday_home" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "work_project_types_residential" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "services_eyebrow" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "services_title_l1" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "services_title_l2" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "services_intro" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_eyebrow" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_title" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_brief" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_brief_p1" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_brief_p2" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_stat_area" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_stat_time" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_stat_color" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "study_cta" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_press_eyebrow" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_eyebrow" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_title_l1" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_title_l2" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_blurb" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_studio" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_hours" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_direct" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_tel" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_address" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_hours_value" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "contact_cta" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "footer_rights" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_project" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_close" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_plate" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_of" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_type" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_area" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_rooms" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_year" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_location" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_status" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_completed" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_palette" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_palette_caption" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_credits" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_design" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_photography" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_joinery" SET NOT NULL;
  ALTER TABLE "site_locales" ALTER COLUMN "lightbox_build" SET NOT NULL;
  ALTER TABLE "projects" DROP COLUMN "_status";
  ALTER TABLE "press" DROP COLUMN "_status";
  ALTER TABLE "site" DROP COLUMN "_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_tags";
  DROP TYPE "public"."enum__projects_v_version_type";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_press_status";
  DROP TYPE "public"."enum__press_v_version_status";
  DROP TYPE "public"."enum__press_v_published_locale";
  DROP TYPE "public"."enum_site_status";
  DROP TYPE "public"."enum__site_v_version_status";
  DROP TYPE "public"."enum__site_v_published_locale";`)
}
