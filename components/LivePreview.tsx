'use client';

import { useMemo } from 'react';
import { useLivePreview } from '@payloadcms/live-preview-react';
import App from '@/components/App';
import type { ContentByLang } from '@/lib/content-context';
import { TRANSLATIONS, type Lang } from '@/lib/translations';
import { siteToTranslation } from '@/lib/site-translation';
import { toPress, toProject } from '@/lib/content-map';
import type { Site, Project as ProjectDoc, Press as PressDoc } from '@/payload-types';

export type PreviewTarget =
  | { kind: 'global'; slug: 'site'; doc: Site }
  | { kind: 'collection'; slug: 'projects'; doc: ProjectDoc }
  | { kind: 'collection'; slug: 'press'; doc: PressDoc };

/**
 * Renders the site inside Payload's Live Preview iframe.
 * Payload posts the edited document over window.postMessage; useLivePreview keeps `data` current.
 * The edited doc is merged into the full content for the locale being edited.
 */
export default function LivePreview({
  content,
  target,
  locale,
  depth,
}: {
  content: ContentByLang;
  target: PreviewTarget;
  locale: Lang;
  depth: number;
}) {
  const { data } = useLivePreview<PreviewTarget['doc']>({
    initialData: target.doc,
    serverURL: typeof window === 'undefined' ? '' : window.location.origin,
    depth,
  });

  const merged = useMemo<ContentByLang>(() => {
    if (target.kind === 'global') {
      return {
        ...content,
        translations: { ...content.translations, [locale]: siteToTranslation(data as Site, TRANSLATIONS[locale]) },
      };
    }
    if (target.slug === 'projects') {
      const edited = toProject(data as ProjectDoc);
      const list = content.projects[locale] ?? [];
      const exists = list.some((p) => p.docId === edited.docId);
      const next = exists ? list.map((p) => (p.docId === edited.docId ? edited : p)) : [...list, edited];
      return { ...content, projects: { ...content.projects, [locale]: next } };
    }
    const edited = toPress(data as PressDoc);
    const exists = content.press.some((p) => p.docId === edited.docId);
    const press = exists ? content.press.map((p) => (p.docId === edited.docId ? edited : p)) : [...content.press, edited];
    return { ...content, press };
  }, [content, data, locale, target]);

  return <App content={merged} initialLang={locale} />;
}
