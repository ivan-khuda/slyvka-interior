'use client';

import { useEffect, useState } from 'react';
import { I18nProvider, type Lang } from '@/lib/i18n';
import type { Project } from '@/lib/data';
import { Lightbox } from './shared';
import { CaseStudy, Contact, Footer, Hero, MarqueeStrip, Nav, Press, Services, Work } from './sections';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [openProject, setOpenProject] = useState<Project | null>(null);
  console.log("openProject", openProject);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  return (
    <I18nProvider lang={lang} setLang={setLang}>
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
    </I18nProvider>
  );
}
