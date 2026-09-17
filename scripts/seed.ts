/**
 * One-off seed: imports the original hard-coded content into Payload.
 * Run:  bun run seed        (requires DATABASE_URL, a running DB and an applied schema)
 * Safe to re-run: skips projects/press entries that already exist.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SEED_PRESS, SEED_PROJECTS } from './seed-data';
import { TRANSLATIONS, type Lang } from '@/lib/translations';
import { translationToSite } from '@/lib/site-translation';

const MIME: Record<string, string> = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };

async function main() {
  const payload = await getPayload({ config });
  const ctx = { disableRevalidate: true };

  for (const lang of Object.keys(TRANSLATIONS) as Lang[]) {
    await payload.updateGlobal({
      slug: 'site',
      locale: lang,
      data: { ...translationToSite(TRANSLATIONS[lang]), _status: 'published' },
      context: ctx,
    });
    payload.logger.info(`site global: ${lang}`);
  }

  for (const item of SEED_PRESS) {
    const existing = await payload.find({ collection: 'press', where: { name: { equals: item.name } }, limit: 1 });
    if (existing.totalDocs) continue;
    await payload.create({ collection: 'press', data: { ...item, _status: 'published' }, context: ctx });
    payload.logger.info(`press: ${item.name}`);
  }

  for (const p of SEED_PROJECTS) {
    const existing = await payload.find({ collection: 'projects', where: { slug: { equals: p.id } }, limit: 1 });
    if (existing.totalDocs) {
      payload.logger.info(`project exists, skipping: ${p.id}`);
      continue;
    }

    const images: { image: number }[] = [];
    for (const img of p.images ?? []) {
      const filePath = path.join(process.cwd(), 'public', img.url);
      const ext = path.extname(filePath).toLowerCase();
      if (!MIME[ext]) {
        payload.logger.warn(`skip unsupported image (browsers cannot render it): ${img.url}`);
        continue;
      }
      if (!fs.existsSync(filePath)) {
        payload.logger.warn(`missing file: ${filePath}`);
        continue;
      }
      const media = await payload.create({
        collection: 'media',
        data: { alt: img.alt },
        file: {
          data: fs.readFileSync(filePath),
          mimetype: MIME[ext],
          name: `${p.id}-${path.basename(filePath)}`,
          size: fs.statSync(filePath).size,
        },
        context: ctx,
      });
      images.push({ image: media.id });
    }

    await payload.create({
      collection: 'projects',
      data: {
        slug: p.id,
        name: p.name,
        location: p.location,
        year: p.year,
        type: p.type as 'family-home' | 'apartment' | 'holiday-home' | 'residential',
        sqm: p.sqm,
        rooms: p.rooms,
        tags: p.tags.filter((t): t is 'family' | 'apartment' | 'holiday' | 'small-footprint' | 'restoration' =>
          ['family', 'apartment', 'holiday', 'small-footprint', 'restoration'].includes(t),
        ),
        blurb: p.blurb,
        cover: p.cover,
        swatch: p.swatch,
        swatch2: p.swatch2,
        feature: p.feature ?? false,
        images,
        _status: 'published',
      },
      context: ctx,
    });
    payload.logger.info(`project: ${p.id} (${images.length} images)`);
  }

  payload.logger.info('Seed complete.');
  process.exit(0);
}

// Top-level await: `payload run` only awaits module evaluation, so the work must be awaited here.
await main();
