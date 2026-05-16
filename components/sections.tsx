'use client';

import { useEffect, useMemo, useState } from 'react';
import { PROJECTS, PRESS, FILTER_IDS, type Project } from '@/lib/data';
import { useI18n, type Lang } from '@/lib/i18n';
import { Marquee, Placeholder, ProjectCard } from './shared';

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const langs: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'uk', label: 'УК' },
    { code: 'cs', label: 'CZ' },
  ];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid var(--line)',
        borderRadius: 999,
        padding: 3,
        background: 'color-mix(in oklab, var(--bg) 70%, transparent)',
      }}
    >
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          style={{
            padding: '5px 11px',
            borderRadius: 999,
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: lang === l.code ? 'var(--fg)' : 'transparent',
            color: lang === l.code ? 'var(--bg)' : 'var(--fg-soft)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({ theme, setTheme }: { theme: 'light' | 'dark'; setTheme: (t: 'light' | 'dark') => void }) {
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
      style={{
        width: 34,
        height: 34,
        borderRadius: 999,
        border: '1px solid var(--line)',
        background: 'color-mix(in oklab, var(--bg) 70%, transparent)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        color: 'var(--fg-soft)',
      }}
    >
      {theme === 'light' ? '◐' : '◑'}
    </button>
  );
}

export function Nav({
  lang,
  setLang,
  theme,
  setTheme,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}) {
  const { t } = useI18n();
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);
  const closeAnd = () => setDrawerOpen(false);
  return (
    <>
      <nav className="nav">
        <a href="#top" className="logo">
          <span className="dot" />
          Slyvka <em>{t.logo.mark}</em>
        </a>
        <div className="nav-links">
          <a href="#work" className="active">
            {t.nav.work}
          </a>
          <a href="#services">{t.nav.services}</a>
          <a href="#study">{t.nav.study}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <LangSwitch lang={lang} setLang={setLang} />
          <a href="#contact" className="nav-cta">
            {t.nav.cta}
          </a>
          <button
            className={'m-burger' + (drawerOpen ? ' open' : '')}
            aria-label="Menu"
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </nav>
      <div className={'m-drawer' + (drawerOpen ? ' open' : '')}>
        <a href="#work" onClick={closeAnd}>
          {t.nav.work}
        </a>
        <a href="#services" onClick={closeAnd}>
          {t.nav.services}
        </a>
        <a href="#study" onClick={closeAnd}>
          {t.nav.study}
        </a>
        <a href="#contact" onClick={closeAnd}>
          {t.nav.contact}
        </a>
        <div style={{ marginTop: 32 }}>
          <a
            href="#contact"
            onClick={closeAnd}
            style={{
              fontSize: 14,
              fontFamily: 'var(--mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              borderBottom: 'none',
              padding: '14px 22px',
              borderRadius: 999,
              background: 'var(--fg)',
              color: 'var(--bg)',
              display: 'inline-block',
            }}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </>
  );
}

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" style={{ padding: '180px 40px 100px', borderBottom: '1px solid var(--line)', position: 'relative' }}>
      <div className="m-hero-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
        <div>
          <div
            className="mono"
            style={{ color: 'var(--fg-soft)', marginBottom: 32, display: 'flex', gap: 14, alignItems: 'center' }}
          >
            <span style={{ width: 24, height: 1, background: 'var(--fg-soft)' }} />
            {t.hero.eyebrow}
          </div>
          <h1 className="display m-h1" style={{ fontSize: 'clamp(52px, 8vw, 124px)' }}>
            {t.hero.title_l1}
            <br />
            <span className="italic" style={{ color: 'var(--accent)' }}>
              {t.hero.title_l2_a}
            </span>
            {t.hero.title_l2_b}
            <br />
            {t.hero.title_l3}
          </h1>
          <div style={{ display: 'flex', gap: 14, marginTop: 48, flexWrap: 'wrap' }}>
            <a
              href="#work"
              style={{
                padding: '14px 26px',
                borderRadius: 999,
                background: 'var(--fg)',
                color: 'var(--bg)',
                fontSize: 13,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {t.hero.cta_work}
              <span style={{ fontSize: 16 }}>↓</span>
            </a>
            <a
              href="#contact"
              style={{
                padding: '14px 26px',
                borderRadius: 999,
                border: '1px solid var(--fg)',
                fontSize: 13,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {t.hero.cta_talk}
            </a>
          </div>
        </div>

        <div className="m-hero-images" style={{ position: 'relative', height: 540 }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 60,
              width: '70%',
              transform: 'rotate(-1.5deg)',
              boxShadow: '0 30px 60px -20px rgba(60,30,40,0.25)',
            }}
          >
            <Placeholder caption="orchard house — living room, afternoon" swatch="#C9A6A6" swatch2="#6B3C4F" ratio="3 / 4" label="N° 01" />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '52%',
              transform: 'rotate(2deg)',
              boxShadow: '0 30px 60px -20px rgba(60,30,40,0.3)',
            }}
          >
            <Placeholder caption="plum pied-à-terre — reading nook" swatch="#3D1F2D" swatch2="#6B3C4F" ratio="4 / 5" label="N° 02" />
          </div>
        </div>
      </div>

      <div
        className="m-hero-foot"
        style={{ marginTop: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40 }}
      >
        <p style={{ maxWidth: 480, fontSize: 17, lineHeight: 1.55, color: 'var(--fg-soft)', fontWeight: 300 }}>
          {t.hero.blurb}
        </p>
        <div style={{ textAlign: 'right' }}>
          <div className="mono" style={{ color: 'var(--fg-soft)' }}>
            {t.hero.booking_label}
          </div>
          <div className="display italic" style={{ fontSize: 32, marginTop: 4 }}>
            {t.hero.booking_value}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MarqueeStrip() {
  const { t } = useI18n();
  return (
    <section style={{ padding: '20px 0', background: 'var(--cream-2)' }}>
      <Marquee items={t.marquee} separator="✶" />
    </section>
  );
}

export function Services() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="services" style={{ padding: '120px 40px', borderBottom: '1px solid var(--line)' }}>
      <div className="m-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 64 }}>
        <div>
          <div className="eyebrow">{t.services.eyebrow}</div>
          <h2 className="display m-h2" style={{ fontSize: 'clamp(40px, 5vw, 68px)', marginTop: 18 }}>
            {t.services.title_l1}
            <br />
            {t.services.title_l2}
          </h2>
        </div>
        <p style={{ fontSize: 19, lineHeight: 1.55, fontFamily: 'var(--serif)', fontWeight: 300, maxWidth: 600, alignSelf: 'end' }}>
          {t.services.intro}
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--fg)' }}>
        {t.services_data.map((s, i) => {
          const isOpen = open === i;
          const no = String(i + 1).padStart(2, '0');
          return (
            <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="m-services-row"
                style={{
                  width: '100%',
                  padding: '32px 0',
                  textAlign: 'left',
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 2fr 60px',
                  gap: 32,
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <span className="mono" style={{ color: 'var(--fg-soft)' }}>
                  {no}
                </span>
                <span className="display m-display-md" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                  {s.name}
                </span>
                <span className="m-services-summary" style={{ fontSize: 15, color: 'var(--fg-soft)', fontWeight: 300 }}>
                  {s.summary}
                </span>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid var(--fg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    justifySelf: 'end',
                    transition: 'transform 0.4s ease, background 0.3s ease, color 0.3s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    background: isOpen ? 'var(--fg)' : 'transparent',
                    color: isOpen ? 'var(--bg)' : 'var(--fg)',
                    fontSize: 18,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              <div style={{ maxHeight: isOpen ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                <div
                  className="m-services-body"
                  style={{ display: 'grid', gridTemplateColumns: '60px 1fr 2fr 60px', gap: 32, paddingBottom: 36 }}
                >
                  <div></div>
                  <div></div>
                  <div>
                    <p style={{ fontSize: 17, lineHeight: 1.6, fontFamily: 'var(--serif)', fontWeight: 300, maxWidth: 560 }}>
                      {s.body}
                    </p>
                    <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {s.deliverables.map((d) => (
                        <span
                          key={d}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 999,
                            border: '1px solid var(--line)',
                            background: 'var(--card)',
                            fontSize: 11,
                            fontFamily: 'var(--mono)',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Work({ onOpen }: { onOpen: (p: Project) => void }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<string>('all');
  const filtered = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter))),
    [filter],
  );

  return (
    <section id="work" style={{ padding: '120px 40px', borderBottom: '1px solid var(--line)' }}>
      <div
        className="m-work-head"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 56 }}
      >
        <div>
          <div className="eyebrow">{t.work.eyebrow}</div>
          <h2 className="display m-h1" style={{ fontSize: 'clamp(48px, 7vw, 96px)', marginTop: 18 }}>
            {t.work.title_l1}
            <br />
            <span className="italic">{t.work.title_l2}</span>
          </h2>
        </div>
        <div className="m-work-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
          {FILTER_IDS.map((id) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                border: '1px solid ' + (filter === id ? 'var(--fg)' : 'var(--line)'),
                background: filter === id ? 'var(--fg)' : 'transparent',
                color: filter === id ? 'var(--bg)' : 'var(--fg)',
                fontSize: 12,
                transition: 'all 0.2s ease',
              }}
            >
              {t.filters[id]}
            </button>
          ))}
        </div>
      </div>

      {(() => {
        const recipes: Record<number, number[][]> = {
          1: [[12]],
          2: [
            [5, 7],
            [7, 5],
            [6, 6],
          ],
          3: [
            [4, 4, 4],
            [3, 6, 3],
            [5, 4, 3],
          ],
        };
        const rows: { items: Project[]; spans: number[] }[] = [];
        let i = 0;
        let rowIdx = 0;
        while (i < filtered.length) {
          const remaining = filtered.length - i;
          let take: number;
          if (remaining >= 5) take = rowIdx % 2 === 0 ? 2 : 3;
          else if (remaining === 4) take = 2;
          else take = remaining;
          const recipeOptions = recipes[take];
          const recipe = recipeOptions[rowIdx % recipeOptions.length];
          rows.push({ items: filtered.slice(i, i + take), spans: recipe });
          i += take;
          rowIdx += 1;
        }
        return (
          <div style={{ display: 'grid', gap: 64 }}>
            {rows.map((row, r) => (
              <div
                key={r}
                className="m-work-row"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32 }}
              >
                {row.items.map((p, j) => {
                  const span = row.spans[j];
                  const size: 'wide' | 'normal' | 'tall' = span >= 7 ? 'wide' : span >= 5 ? 'normal' : 'tall';
                  return (
                    <div key={p.id} style={{ gridColumn: `span ${span}` }}>
                      <ProjectCard project={p} onOpen={onOpen} size={size} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })()}

      {filtered.length === 0 && (
        <div
          style={{
            padding: '80px 0',
            textAlign: 'center',
            fontFamily: 'var(--serif)',
            fontSize: 22,
            fontStyle: 'italic',
            color: 'var(--fg-soft)',
          }}
        >
          {t.work.empty}
        </div>
      )}
    </section>
  );
}

export function CaseStudy({ onOpen }: { onOpen: (p: Project) => void }) {
  const { t } = useI18n();
  const p = PROJECTS[1];
  return (
    <section id="study" style={{ padding: '140px 40px', background: 'var(--cream-2)', borderBottom: '1px solid var(--line)' }}>
      <div className="eyebrow">{t.study.eyebrow}</div>
      <h2 className="display m-h2" style={{ fontSize: 'clamp(40px, 5vw, 68px)', marginTop: 18, maxWidth: 900 }}>
        {t.study.title}
      </h2>

      <div className="m-stack" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, marginTop: 80 }}>
        <div>
          <Placeholder
            caption="plum pied-à-terre — reading nook, evening"
            swatch="#6B3C4F"
            swatch2="#3D1F2D"
            ratio="4 / 5"
            label="Plate 01"
          />
        </div>

        <div style={{ paddingTop: 20 }}>
          <div className="eyebrow">{t.study.brief}</div>
          <p style={{ marginTop: 18, fontSize: 19, lineHeight: 1.55, fontFamily: 'var(--serif)', fontWeight: 300 }}>
            {t.study.brief_p1}
          </p>
          <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.65, color: 'var(--fg-soft)', fontWeight: 300 }}>
            {t.study.brief_p2}
          </p>

          <div
            className="m-case-stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginTop: 48,
              paddingTop: 32,
              borderTop: '1px solid var(--line)',
            }}
          >
            {(
              [
                ['74 m²', t.study.stat_area],
                ['11 mo', t.study.stat_time],
                ['1', t.study.stat_color],
              ] as Array<[string, string]>
            ).map(([n, l]) => (
              <div key={l}>
                <div className="display" style={{ fontSize: 36 }}>
                  {n}
                </div>
                <div className="mono" style={{ color: 'var(--fg-soft)', marginTop: 6 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onOpen(p)}
            style={{
              marginTop: 48,
              padding: '14px 26px',
              borderRadius: 999,
              border: '1px solid var(--fg)',
              fontSize: 13,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--fg)';
              e.currentTarget.style.color = 'var(--bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--fg)';
            }}
          >
            {t.study.cta}
          </button>
        </div>
      </div>

      <div className="m-case-strip" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 56 }}>
        <Placeholder caption="kitchen — brass tap, plaster wall" swatch="#A89380" swatch2="#6B5544" ratio="4 / 5" label="Plate 02" />
        <Placeholder caption="bedroom — linen drape, oak headboard" swatch="#C9A6A6" swatch2="#6B3C4F" ratio="4 / 5" label="Plate 03" />
        <Placeholder caption="hallway — restored cornice detail" swatch="#3D1F2D" swatch2="#221C1A" ratio="4 / 5" label="Plate 04" />
      </div>
    </section>
  );
}

export function Press() {
  const { t } = useI18n();
  return (
    <section style={{ padding: '80px 40px', borderBottom: '1px solid var(--line)' }}>
      <div
        className="m-press"
        style={{ display: 'flex', alignItems: 'center', gap: 60, justifyContent: 'space-between', flexWrap: 'wrap' }}
      >
        <div className="eyebrow">{t.press}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'baseline' }}>
          {PRESS.map((p) => (
            <div key={p.name} style={{ textAlign: 'center' }}>
              <div className="display italic" style={{ fontSize: 'clamp(20px, 2.4vw, 30px)' }}>
                {p.name}
              </div>
              <div className="mono" style={{ color: 'var(--fg-soft)', marginTop: 4, fontSize: 10 }}>
                {p.edition}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" style={{ padding: '140px 40px', background: 'var(--accent-deep)', color: 'var(--cream)' }}>
      <div className="m-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        <div>
          <div className="mono" style={{ opacity: 0.7 }}>
            {t.contact.eyebrow}
          </div>
          <h2 className="display m-h1" style={{ fontSize: 'clamp(56px, 8vw, 124px)', marginTop: 24, color: 'var(--cream)' }}>
            {t.contact.title_l1}
            <br />
            <span className="italic" style={{ color: 'var(--rose)' }}>
              {t.contact.title_l2}
            </span>
          </h2>
        </div>
        <div style={{ paddingTop: 20 }}>
          <p style={{ fontSize: 19, lineHeight: 1.6, fontFamily: 'var(--serif)', fontWeight: 300, opacity: 0.9, maxWidth: 480 }}>
            {t.contact.blurb}
          </p>

          <div
            className="m-contact-grid"
            style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}
          >
            <div>
              <div className="mono" style={{ opacity: 0.6 }}>
                {t.contact.studio}
              </div>
              <div style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6 }}>
                14 Virmenska St., 2nd floor
                <br />
                Lviv 79008, Ukraine
              </div>
            </div>
            <div>
              <div className="mono" style={{ opacity: 0.6 }}>
                {t.contact.hours}
              </div>
              <div style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {t.contact.hours_value}
              </div>
            </div>
            <div>
              <div className="mono" style={{ opacity: 0.6 }}>
                {t.contact.direct}
              </div>
              <a
                href="mailto:hello@slyvka.studio"
                style={{
                  marginTop: 10,
                  display: 'block',
                  fontFamily: 'var(--serif)',
                  fontSize: 22,
                  fontStyle: 'italic',
                  borderBottom: '1px solid currentColor',
                  paddingBottom: 4,
                }}
              >
                hello@slyvka.studio
              </a>
            </div>
            <div>
              <div className="mono" style={{ opacity: 0.6 }}>
                {t.contact.tel}
              </div>
              <div style={{ marginTop: 10, fontFamily: 'var(--serif)', fontSize: 22 }}>+380 32 297 0418</div>
            </div>
          </div>

          <a
            href="mailto:hello@slyvka.studio"
            style={{
              marginTop: 60,
              padding: '18px 30px',
              borderRadius: 999,
              background: 'var(--cream)',
              color: 'var(--accent-deep)',
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {t.contact.cta} <span style={{ fontSize: 18 }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer style={{ padding: '60px 40px 40px', background: 'var(--ink)', color: 'var(--cream)' }}>
      <div
        className="m-footer"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40 }}
      >
        <div>
          <div className="logo" style={{ color: 'var(--cream)' }}>
            <span className="dot" style={{ background: 'var(--rose)' }} />
            Slyvka <em style={{ color: 'rgba(244,239,232,0.6)' }}>{t.logo.mark}</em>
          </div>
          <div className="mono" style={{ marginTop: 14, opacity: 0.5 }}>
            {t.footer.rights}
          </div>
        </div>
        <div className="m-footer-links" style={{ display: 'flex', gap: 40 }}>
          {['Instagram', 'Pinterest', 'Are.na', 'Newsletter'].map((s) => (
            <a key={s} href="#" style={{ fontSize: 13, borderBottom: '1px solid rgba(244,239,232,0.3)', paddingBottom: 4 }}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
