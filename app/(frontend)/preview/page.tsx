import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';
import LivePreview, { type PreviewTarget } from '@/components/LivePreview';
import { getSiteContent, PROJECT_DEPTH } from '@/lib/content';
import { LANGS } from '@/lib/content-map';
import type { Lang } from '@/lib/translations';

// Always fresh: reads drafts and is only ever opened from the Payload admin.
export const dynamic = 'force-dynamic';

type Search = { collection?: string; global?: string; id?: string; locale?: string };

export default async function PreviewPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const locale: Lang = LANGS.includes(sp.locale as Lang) ? (sp.locale as Lang) : 'en';
  const payload = await getPayload({ config });

  let target: PreviewTarget;
  if (sp.global === 'site') {
    const doc = await payload.findGlobal({ slug: 'site', locale, fallbackLocale: 'en', depth: 0, draft: true });
    target = { kind: 'global', slug: 'site', doc };
  } else if ((sp.collection === 'projects' || sp.collection === 'press') && sp.id) {
    const id = Number(sp.id);
    if (!Number.isFinite(id)) notFound();
    const opts = { id, locale, fallbackLocale: 'en' as const, depth: PROJECT_DEPTH, draft: true };
    target =
      sp.collection === 'projects'
        ? { kind: 'collection', slug: 'projects', doc: await payload.findByID({ collection: 'projects', ...opts }) }
        : { kind: 'collection', slug: 'press', doc: await payload.findByID({ collection: 'press', ...opts }) };
  } else {
    notFound();
  }

  const content = await getSiteContent({ draft: true });
  return <LivePreview content={content} target={target} locale={locale} depth={PROJECT_DEPTH} />;
}
