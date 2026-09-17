# Slyvka Interior

Single-page studio site (Next.js 16, App Router) with content managed in [Payload CMS](https://payloadcms.com).

- Site: `/` — statically rendered from Payload, re-rendered on demand whenever content changes.
- Admin: `/admin` — Payload admin panel (first visit asks you to create the first user).
- Live preview: `/preview` — opened by the admin inside an iframe; renders drafts and updates as you type. Not linked from the site.
- REST API: `/api/<collection>` (e.g. `/api/projects?locale=uk`). GraphQL at `/api/graphql`.

## Stack

| Concern | Local | Production (Vercel) |
| --- | --- | --- |
| Database | Postgres 17 in Docker (`docker-compose.yml`, port 5435) | Neon Postgres |
| Media files | `./media` folder (git-ignored) | Vercel Blob |
| Schema | Payload migrations (`migrations/`) | same, applied during `build` |

Storage switches automatically: when `BLOB_READ_WRITE_TOKEN` is set the Vercel Blob adapter is enabled, otherwise uploads go to `./media`.

## Local development

```bash
cp .env.example .env            # then set PAYLOAD_SECRET (openssl rand -hex 32)
bun install
bun run db:up                   # start Postgres in Docker
bun run migrate                 # apply schema
bun run seed                    # optional: import the original projects/press/images
bun run dev                     # http://localhost:3000 and http://localhost:3000/admin
```

## Content model

Defined in `payload.config.ts`, `collections/` and `globals/`:

- **Site content** (global, `globals/Site.ts`) — every piece of page copy except the navigation menu: hero, marquee, work section, services (list with deliverables), case study text + stats, press eyebrow, contact details (address, email, phone, hours), footer rights + social links, filter / project-type / lightbox labels. Text fields are localized; email, phone and stat values are shared.

- **Projects** — slug, name*, location*, year, type, sqm, rooms, tags (drives the portfolio filter), blurb*, cover caption*, swatches, featured flag, gallery images. Drag-and-drop ordering in the admin list.
- **Press** — name, edition. Orderable.
- **Media** — uploads with localized alt text. Sizes `thumbnail` and `card` are generated.
- **Users** — admin accounts.

Fields marked `*` are localized (`en`, `uk`, `cs`, fallback to `en`). The frontend fetches all three locales once and switches client-side, matching the existing language toggle.

## Drafts, publishing and live preview

Projects, Press and Site content have **drafts with autosave**. Editing autosaves a draft every few hundred ms; the public site only shows **published** documents, so click **Publish** when the change should go live. Unpublished projects are hidden from the portfolio.

Every document with drafts has a **Live Preview** tab in the admin. It loads `/preview?...` in an iframe (mobile / tablet / desktop breakpoints available) and streams your unsaved edits into the page in real time via `@payloadcms/live-preview-react`. Switching the admin locale switches the preview language. The preview URL is derived from the request origin, so it works on localhost and on Vercel without extra configuration.


## Changing the schema

`push` is disabled, so every schema change is a migration in every environment:

```bash
bun run migrate:create <name>   # generates migrations/<timestamp>_<name>.ts
bun run migrate                 # applies it locally
bun run generate:types          # refreshes payload-types.ts
```

Commit the migration files. `bun run build` runs `payload migrate` before `next build`, so Vercel applies pending migrations on deploy.

## Deploying to Vercel

Environment variables required on the project:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Neon connection string (pooled is fine) |
| `PAYLOAD_SECRET` | long random string |
| `BLOB_READ_WRITE_TOKEN` | injected automatically when you connect a Blob store to the project (Storage tab) |

The Neon and Blob stores can be created from the Vercel Marketplace / Storage tab; both inject their env vars into the project. Then deploy — the build applies migrations against Neon and prerenders `/`.

## Notes

- Payload-generated files (`app/(payload)/**`, `payload-types.ts`, `migrations/**`) are not meant to be hand-edited.
- `scripts/seed-data.ts` and `lib/translations.ts` hold the original hard-coded content. The site reads Payload; the code copy is only a fallback when a field is empty and the seed source.
- `lib/translations.ts` must stay a plain module (no `use client`): server code imports it, and a client module would arrive as a client reference instead of data.
- After `bun run migrate:create`, Payload leaves a `dev` marker in `payload_migrations`; the next `bun run migrate` asks an interactive question about it. Answer it, or reset the local DB (`bun run db:down && docker volume rm slyvka-interior_slyvka_pgdata && bun run db:up && bun run migrate && bun run seed`).
- `.tif` images from the old `public/images` folder are skipped by the seed because browsers cannot render them.
