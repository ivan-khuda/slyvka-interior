'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { PROJECTS, type Project } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import Image from 'next/image';

export function Placeholder({
  image,
  caption,
  swatch = '#C9A6A6',
  swatch2 = '#6B3C4F',
  ratio = '4 / 5',
  label,
  style = {},
}: {
  image?: {
    url: string;
    alt: string;
  };
  caption?: string;
  swatch?: string;
  swatch2?: string;
  ratio?: string;
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className="placeholder"
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(135deg, ${swatch} 0%, ${swatch2} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        className="placeholder-stripes"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg, transparent 0 22px, rgba(255,255,255,0.04) 22px 23px)`,
          pointerEvents: 'none',
        }}
      />
      {label && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            zIndex: 1000,
          }}
        >
          {label}
        </div>
      )}
      {caption && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.5,
          }}
        >
          {image && (
            <Image src={image.url} alt={image.alt} width={1000} height={1000} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}  >
            <span style={{ opacity: 0.6 }}>image · </span>
            {caption}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  onOpen,
  size = 'normal',
}: {
  project: Project;
  onOpen: (p: Project) => void;
  size?: 'normal' | 'tall' | 'wide';
}) {
  const [hovered, setHovered] = useState(false);
  const aspect = size === 'tall' ? '3 / 4' : size === 'wide' ? '4 / 3' : '4 / 5';

  return (
    <button
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: 'left',
        display: 'block',
        width: '100%',
        background: 'transparent',
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
        <div
          style={{
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <Placeholder
            image={project?.images?.[0]}
            caption={project.cover || project.name}
            swatch={project.swatch}
            swatch2={project.swatch2}
            ratio={aspect}
            label={project.type}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 60%, rgba(0,0,0,${hovered ? 0.45 : 0}))`,
            transition: 'background 0.5s ease',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 18,
            right: 18,
            bottom: 18,
            color: '#fff',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.5s ease',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            View project →
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em' }}>{project.sqm} m²</div>
        </div>
      </div>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.1, fontWeight: 400 }}>{project.name}</div>
          <div className="mono" style={{ marginTop: 6, color: 'var(--fg-soft)' }}>
            {project.location} — {project.year}
          </div>
        </div>
        <div className="mono" style={{ color: 'var(--fg-soft)', flexShrink: 0, paddingTop: 6 }}>
          {String(PROJECTS.indexOf(project) + 1).padStart(2, '0')}
        </div>
      </div>
    </button>
  );
}

export function Marquee({ items, separator = '✶', speed = 60 }: { items: string[]; separator?: string; speed?: number }) {
  const items2 = [...items, ...items, ...items];
  return (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: '24px 0',
        maskImage: 'linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'inline-flex',
          gap: 48,
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {items2.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(40px, 6vw, 88px)',
              fontWeight: 300,
              fontStyle: 'italic',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 48,
              color: 'var(--fg)',
            }}
          >
            {item}
            <span style={{ color: 'var(--accent)', fontStyle: 'normal', fontSize: '0.6em', transform: 'translateY(-0.1em)' }}>
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Lightbox({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setImgIdx((i) => Math.min(i + 1, 5));
      if (e.key === 'ArrowLeft') setImgIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const captions = [
    project.cover || `${project.name} — establishing shot`,
    'detail — joinery & material study',
    'kitchen — morning light',
    'reading corner — texture close-up',
    'plan view — overall composition',
    'exterior — context',
    'detail — joinery & material study',
    'kitchen — morning light',
    'reading corner — texture close-up',
    'plan view — overall composition',
    'exterior — context',
    'detail — joinery & material study',
    'kitchen — morning light',
    'reading corner — texture close-up',
    'plan view — overall composition',
    'exterior — context',
    'detail — joinery & material study',
    'kitchen — morning light',
    'reading corner — texture close-up',
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'color-mix(in oklab, var(--bg) 95%, black)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.4s ease',
      }}
    >
      <div
        className="m-lightbox-top"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '22px 40px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="mono" style={{ color: 'var(--fg-soft)' }}>
          {t.lightbox.project} · {String(PROJECTS.indexOf(project) + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
        </div>
        <button
          onClick={onClose}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ display: 'inline-block', width: 18, height: 18, position: 'relative' }}>
            <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--fg)', transform: 'rotate(45deg)' }} />
            <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--fg)', transform: 'rotate(-45deg)' }} />
          </span>
          {t.lightbox.close}
        </button>
      </div>

      <div
        className="m-lightbox-body"
        style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 380px', overflow: 'auto', minHeight: 0 }}
      >
        <div
          className="m-lightbox-stage"
          style={{ padding: '40px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}
        >
          <div style={{ animation: 'slideUp 0.5s ease 0.1s both' }}>

            {/*<Image src={project.images[imgIdx].url} alt={project.images[imgIdx].alt}
              width={1000}
              height={1000}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />*/}
            <Placeholder
              image={project?.images?.[imgIdx]}
              caption={captions[imgIdx]}
              swatch={imgIdx % 2 === 0 ? project.swatch : project.swatch2}
              swatch2={imgIdx % 2 === 0 ? project.swatch2 : project.swatch}
              ratio={imgIdx === 0 ? '4 / 3' : '3 / 4'}
              label={`${t.lightbox.plate} ${imgIdx + 1} ${t.lightbox.of} 6`}
              style={{ maxHeight: '70vh' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {captions.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: 64,
                  height: 64,
                  background: `linear-gradient(135deg, ${i % 2 === 0 ? project.swatch : project.swatch2}, ${i % 2 === 0 ? project.swatch2 : project.swatch})`,
                  border: imgIdx === i ? `2px solid var(--fg)` : '2px solid transparent',
                  outline: imgIdx === i ? `1px solid var(--fg)` : 'none',
                  outlineOffset: 2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: imgIdx === i ? 1 : 0.6,
                }}
              >
                {project.images?.[i]?.url && (
                  <Image src={project.images?.[i]?.url} alt={project.images?.[i]?.alt}
                    width={64}
                    height={64}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <aside
          className="m-lightbox-aside"
          style={{
            borderLeft: '1px solid var(--line)',
            padding: '40px 36px',
            overflow: 'auto',
            background: 'var(--card)',
            animation: 'slideUp 0.5s ease 0.2s both',
          }}
        >
          <div className="eyebrow">{t.project_types[project.type] || project.type}</div>
          <h2 className="display" style={{ fontSize: 48, marginTop: 16 }}>
            {project.name}
          </h2>
          <div className="mono" style={{ marginTop: 12, color: 'var(--fg-soft)' }}>
            {project.location} — {project.year}
          </div>

          <p
            style={{
              marginTop: 28,
              fontSize: 16,
              lineHeight: 1.6,
              color: 'var(--fg)',
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontWeight: 300,
            }}
          >
            &ldquo;{project.blurb}&rdquo;
          </p>

          <div style={{ marginTop: 36, borderTop: '1px solid var(--line)' }}>
            {(
              [
                [t.lightbox.type, t.project_types[project.type] || project.type],
                [t.lightbox.area, `${project.sqm} m²`],
                [t.lightbox.rooms, project.rooms],
                [t.lightbox.year, project.year],
                [t.lightbox.location, project.location],
                [t.lightbox.status, t.lightbox.completed],
              ] as Array<[string, string]>
            ).map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--line)',
                  fontSize: 13,
                }}
              >
                <span className="mono" style={{ color: 'var(--fg-soft)' }}>
                  {k}
                </span>
                <span style={{ fontWeight: 400 }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <div className="eyebrow">{t.lightbox.palette}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              {[project.swatch, project.swatch2, '#EBE3D7', '#5A4F4B', '#221C1A'].map((c, i) => (
                <div key={i} style={{ flex: 1, aspectRatio: '1', background: c, borderRadius: 2 }} />
              ))}
            </div>
            <div className="mono" style={{ marginTop: 10, color: 'var(--fg-soft)', fontSize: 10 }}>
              {t.lightbox.palette_caption}
            </div>
          </div>

          <div style={{ marginTop: 36, fontSize: 13, lineHeight: 1.7, color: 'var(--fg-soft)' }}>
            <div className="eyebrow">{t.lightbox.credits}</div>
            <div style={{ marginTop: 14 }}>
              <div>{t.lightbox.design} — Slyvka Studio</div>
              <div>{t.lightbox.photography} — Mariana K.</div>
              <div>{t.lightbox.joinery} — Verba Workshop</div>
              <div>{t.lightbox.build} — Stolyar Bros.</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
