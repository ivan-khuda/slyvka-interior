import type { Media, Project as ProjectDoc, Press as PressDoc } from '@/payload-types';
import type { Lang } from '@/lib/translations';
import type { PressItem, Project } from '@/lib/data';

export const LANGS: Lang[] = ['en', 'uk', 'cs'];

function toImage(row: NonNullable<ProjectDoc['images']>[number]) {
  const media = row.image;
  if (typeof media !== 'object' || !media?.url) return null;
  const m = media as Media;
  return {
    id: String(row.id ?? m.id),
    url: m.url as string,
    alt: m.alt,
    width: m.width ?? undefined,
    height: m.height ?? undefined,
  };
}

export function toProject(doc: ProjectDoc): Project {
  return {
    docId: doc.id,
    id: doc.slug,
    name: doc.name,
    location: doc.location,
    year: doc.year,
    type: doc.type,
    sqm: doc.sqm,
    rooms: doc.rooms,
    tags: doc.tags ?? [],
    blurb: doc.blurb,
    swatch: doc.swatch,
    swatch2: doc.swatch2,
    cover: doc.cover ?? undefined,
    feature: doc.feature ?? false,
    images: (doc.images ?? []).map(toImage).filter((i): i is NonNullable<typeof i> => i !== null),
  };
}

export function toPress(doc: PressDoc): PressItem {
  return { docId: doc.id, name: doc.name, edition: doc.edition };
}
