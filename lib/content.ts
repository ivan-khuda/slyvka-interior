import 'server-only';
import { getPayload } from 'payload';
import config from '@payload-config';
import { TRANSLATIONS, type Lang, type Translation } from '@/lib/translations';
import { siteToTranslation } from '@/lib/site-translation';
import { LANGS, toPress, toProject } from '@/lib/content-map';
import type { PressItem, Project } from '@/lib/data';

export type SiteContent = {
  projects: Record<Lang, Project[]>;
  press: PressItem[];
  translations: Record<Lang, Translation>;
};

/** Depth used for project reads. Live preview must request the same depth. */
export const PROJECT_DEPTH = 1;

/**
 * @param draft  true = include unpublished drafts (used by /preview). Public site reads published only.
 */
export async function getSiteContent({ draft = false }: { draft?: boolean } = {}): Promise<SiteContent> {
  const payload = await getPayload({ config });
  const published = draft ? undefined : { _status: { equals: 'published' as const } };

  const [press, sites, ...perLang] = await Promise.all([
    payload.find({ collection: 'press', sort: '_order', limit: 100, pagination: false, draft, where: published }),
    Promise.all(
      LANGS.map((locale) => payload.findGlobal({ slug: 'site', locale, fallbackLocale: 'en', depth: 0, draft })),
    ),
    ...LANGS.map((locale) =>
      payload.find({
        collection: 'projects',
        locale,
        fallbackLocale: 'en',
        sort: '_order',
        depth: PROJECT_DEPTH,
        limit: 100,
        pagination: false,
        draft,
        where: published,
      }),
    ),
  ]);

  const projects = Object.fromEntries(
    LANGS.map((lang, i) => [lang, perLang[i].docs.map(toProject)]),
  ) as Record<Lang, Project[]>;

  const translations = Object.fromEntries(
    LANGS.map((lang, i) => [lang, siteToTranslation(sites[i], TRANSLATIONS[lang])]),
  ) as Record<Lang, Translation>;

  return { projects, press: press.docs.map(toPress), translations };
}
