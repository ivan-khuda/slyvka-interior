'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { PressItem, Project } from '@/lib/data';
import { TRANSLATIONS, useI18n, type Lang, type Translation } from '@/lib/i18n';

export type ContentByLang = {
  projects: Record<Lang, Project[]>;
  press: PressItem[];
  translations: Record<Lang, Translation>;
};

const ContentContext = createContext<ContentByLang>({
  projects: { en: [], uk: [], cs: [] },
  press: [],
  translations: TRANSLATIONS,
});

export function ContentProvider({ content, children }: { content: ContentByLang; children: ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

/** Projects and press resolved for the currently selected language. */
export function useContent(): { projects: Project[]; press: PressItem[] } {
  const { lang } = useI18n();
  const { projects, press } = useContext(ContentContext);
  return { projects: projects[lang] ?? projects.en ?? [], press };
}
