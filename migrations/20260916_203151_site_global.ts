import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_hero_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"word" varchar NOT NULL
  );
  
  CREATE TABLE "site_services_items_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "site_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "site_footer_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"study_stat_area_value" varchar NOT NULL,
  	"study_stat_time_value" varchar NOT NULL,
  	"study_stat_color_value" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"contact_phone" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_locales" (
  	"hero_logo_mark" varchar NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_title_l1" varchar NOT NULL,
  	"hero_title_l2_a" varchar NOT NULL,
  	"hero_title_l2_b" varchar NOT NULL,
  	"hero_title_l3" varchar NOT NULL,
  	"hero_cta_work" varchar NOT NULL,
  	"hero_cta_talk" varchar NOT NULL,
  	"hero_blurb" varchar NOT NULL,
  	"hero_booking_label" varchar NOT NULL,
  	"hero_booking_value" varchar NOT NULL,
  	"work_eyebrow" varchar NOT NULL,
  	"work_title_l1" varchar NOT NULL,
  	"work_title_l2" varchar NOT NULL,
  	"work_empty" varchar NOT NULL,
  	"work_view" varchar NOT NULL,
  	"work_filters_all" varchar NOT NULL,
  	"work_filters_family" varchar NOT NULL,
  	"work_filters_apartment" varchar NOT NULL,
  	"work_filters_holiday" varchar NOT NULL,
  	"work_filters_small_footprint" varchar NOT NULL,
  	"work_filters_restoration" varchar NOT NULL,
  	"work_project_types_family_home" varchar NOT NULL,
  	"work_project_types_apartment" varchar NOT NULL,
  	"work_project_types_holiday_home" varchar NOT NULL,
  	"work_project_types_residential" varchar NOT NULL,
  	"services_eyebrow" varchar NOT NULL,
  	"services_title_l1" varchar NOT NULL,
  	"services_title_l2" varchar NOT NULL,
  	"services_intro" varchar NOT NULL,
  	"study_eyebrow" varchar NOT NULL,
  	"study_title" varchar NOT NULL,
  	"study_brief" varchar NOT NULL,
  	"study_brief_p1" varchar NOT NULL,
  	"study_brief_p2" varchar NOT NULL,
  	"study_stat_area" varchar NOT NULL,
  	"study_stat_time" varchar NOT NULL,
  	"study_stat_color" varchar NOT NULL,
  	"study_cta" varchar NOT NULL,
  	"contact_press_eyebrow" varchar NOT NULL,
  	"contact_eyebrow" varchar NOT NULL,
  	"contact_title_l1" varchar NOT NULL,
  	"contact_title_l2" varchar NOT NULL,
  	"contact_blurb" varchar NOT NULL,
  	"contact_studio" varchar NOT NULL,
  	"contact_hours" varchar NOT NULL,
  	"contact_direct" varchar NOT NULL,
  	"contact_tel" varchar NOT NULL,
  	"contact_address" varchar NOT NULL,
  	"contact_hours_value" varchar NOT NULL,
  	"contact_cta" varchar NOT NULL,
  	"footer_rights" varchar NOT NULL,
  	"lightbox_project" varchar NOT NULL,
  	"lightbox_close" varchar NOT NULL,
  	"lightbox_plate" varchar NOT NULL,
  	"lightbox_of" varchar NOT NULL,
  	"lightbox_type" varchar NOT NULL,
  	"lightbox_area" varchar NOT NULL,
  	"lightbox_rooms" varchar NOT NULL,
  	"lightbox_year" varchar NOT NULL,
  	"lightbox_location" varchar NOT NULL,
  	"lightbox_status" varchar NOT NULL,
  	"lightbox_completed" varchar NOT NULL,
  	"lightbox_palette" varchar NOT NULL,
  	"lightbox_palette_caption" varchar NOT NULL,
  	"lightbox_credits" varchar NOT NULL,
  	"lightbox_design" varchar NOT NULL,
  	"lightbox_photography" varchar NOT NULL,
  	"lightbox_joinery" varchar NOT NULL,
  	"lightbox_build" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "site_hero_marquee" ADD CONSTRAINT "site_hero_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_services_items_deliverables" ADD CONSTRAINT "site_services_items_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_services_items" ADD CONSTRAINT "site_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_socials" ADD CONSTRAINT "site_footer_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_hero_marquee_order_idx" ON "site_hero_marquee" USING btree ("_order");
  CREATE INDEX "site_hero_marquee_parent_id_idx" ON "site_hero_marquee" USING btree ("_parent_id");
  CREATE INDEX "site_hero_marquee_locale_idx" ON "site_hero_marquee" USING btree ("_locale");
  CREATE INDEX "site_services_items_deliverables_order_idx" ON "site_services_items_deliverables" USING btree ("_order");
  CREATE INDEX "site_services_items_deliverables_parent_id_idx" ON "site_services_items_deliverables" USING btree ("_parent_id");
  CREATE INDEX "site_services_items_deliverables_locale_idx" ON "site_services_items_deliverables" USING btree ("_locale");
  CREATE INDEX "site_services_items_order_idx" ON "site_services_items" USING btree ("_order");
  CREATE INDEX "site_services_items_parent_id_idx" ON "site_services_items" USING btree ("_parent_id");
  CREATE INDEX "site_services_items_locale_idx" ON "site_services_items" USING btree ("_locale");
  CREATE INDEX "site_footer_socials_order_idx" ON "site_footer_socials" USING btree ("_order");
  CREATE INDEX "site_footer_socials_parent_id_idx" ON "site_footer_socials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_locales_locale_parent_id_unique" ON "site_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_hero_marquee" CASCADE;
  DROP TABLE "site_services_items_deliverables" CASCADE;
  DROP TABLE "site_services_items" CASCADE;
  DROP TABLE "site_footer_socials" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "site_locales" CASCADE;`)
}
