import { type Lang } from '@/lib/i18n';

export function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
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
