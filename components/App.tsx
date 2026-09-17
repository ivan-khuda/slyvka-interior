'use client';

import { useEffect, useState } from 'react';
import { I18nProvider, type Lang } from '@/lib/i18n';
import { ContentProvider, type ContentByLang } from '@/lib/content-context';
import type { Project } from '@/lib/data';
import { Lightbox } from './shared';
import { CaseStudy, Contact, Footer, Hero, MarqueeStrip, Nav, Press, Services, Work } from './sections';

export default function App({ content, initialLang = 'en' }: { content: ContentByLang; initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [openProject, setOpenProject] = useState<Project | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  return (
    <I18nProvider lang={lang} setLang={setLang} translations={content.translations}>
      <ContentProvider content={content}>
        <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
        <Hero />
        <MarqueeStrip />
        <Work onOpen={setOpenProject} />
        <Services />
        <CaseStudy onOpen={setOpenProject} />
        <Press />
        <Contact />
        <Footer />
        <Lightbox project={openProject} onClose={() => setOpenProject(null)} />
      </ContentProvider>
    </I18nProvider>
  );
}
