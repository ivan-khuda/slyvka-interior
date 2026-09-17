'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { TRANSLATIONS, type Lang, type Translation } from '@/lib/translations';

export { TRANSLATIONS, type Lang, type Translation } from '@/lib/translations';

type I18nValue = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

const I18nContext = createContext<I18nValue>({ t: TRANSLATIONS.en, lang: 'en', setLang: () => {} });

export function useI18n(): I18nValue {
  return useContext(I18nContext);
}

export function I18nProvider({
  lang,
  setLang,
  translations = TRANSLATIONS,
  children,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  translations?: Record<Lang, Translation>;
  children: ReactNode;
}) {
  const t = translations[lang] || translations.en;
  return <I18nContext.Provider value={{ t, lang, setLang }}>{children}</I18nContext.Provider>;
}
