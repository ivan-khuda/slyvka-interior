import type { Site } from '@/payload-types';
import type { Translation } from '@/lib/translations';

const unslug = (s: string) => s.replace(/_/g, '-');

function group(g: Record<string, string | null | undefined> | undefined, fallback: Record<string, string>) {
  if (!g) return fallback;
  const out: Record<string, string> = { ...fallback };
  for (const [k, v] of Object.entries(g)) if (typeof v === 'string' && v) out[unslug(k)] = v;
  return out;
}

/** Overlay the CMS "Site" global onto the code-defined translation (nav etc. stay in code). */
export function siteToTranslation(site: Site | null | undefined, base: Translation): Translation {
  if (!site) return base;
  const { hero, work, services, study, contact, footer, lightbox } = site;
  return {
    ...base,
    logo: { mark: hero.logo_mark ?? base.logo.mark },
    hero: {
      eyebrow: hero.eyebrow,
      title_l1: hero.title_l1,
      title_l2_a: hero.title_l2_a,
      title_l2_b: hero.title_l2_b,
      title_l3: hero.title_l3,
      cta_work: hero.cta_work,
      cta_talk: hero.cta_talk,
      blurb: hero.blurb,
      booking_label: hero.booking_label,
      booking_value: hero.booking_value,
    },
    marquee: hero.marquee?.length ? hero.marquee.map((m) => m.word) : base.marquee,
    work: { eyebrow: work.eyebrow, title_l1: work.title_l1, title_l2: work.title_l2, empty: work.empty, view: work.view },
    filters: group(work.filters, base.filters),
    project_types: group(work.project_types, base.project_types),
    services: { eyebrow: services.eyebrow, title_l1: services.title_l1, title_l2: services.title_l2, intro: services.intro },
    services_data: services.items?.length
      ? services.items.map((s) => ({
          name: s.name,
          summary: s.summary,
          body: s.body,
          deliverables: (s.deliverables ?? []).map((d) => d.item),
        }))
      : base.services_data,
    study: {
      eyebrow: study.eyebrow,
      title: study.title,
      brief: study.brief,
      brief_p1: study.brief_p1,
      brief_p2: study.brief_p2,
      stat_area: study.stat_area,
      stat_time: study.stat_time,
      stat_color: study.stat_color,
      stat_area_value: study.stat_area_value,
      stat_time_value: study.stat_time_value,
      stat_color_value: study.stat_color_value,
      cta: study.cta,
    },
    press: contact.press_eyebrow,
    contact: {
      eyebrow: contact.eyebrow,
      title_l1: contact.title_l1,
      title_l2: contact.title_l2,
      blurb: contact.blurb,
      studio: contact.studio,
      hours: contact.hours,
      direct: contact.direct,
      tel: contact.tel,
      hours_value: contact.hours_value,
      address: contact.address,
      email: contact.email,
      phone: contact.phone,
      cta: contact.cta,
    },
    footer: {
      rights: footer.rights,
      socials: footer.socials?.length ? footer.socials.map((s) => ({ label: s.label, url: s.url })) : base.footer.socials,
    },
    lightbox: {
      project: lightbox.project,
      close: lightbox.close,
      type: lightbox.type,
      area: lightbox.area,
      rooms: lightbox.rooms,
      year: lightbox.year,
      location: lightbox.location,
      status: lightbox.status,
      completed: lightbox.completed,
      palette: lightbox.palette,
      palette_caption: lightbox.palette_caption,
      credits: lightbox.credits,
      design: lightbox.design,
      photography: lightbox.photography,
      joinery: lightbox.joinery,
      build: lightbox.build,
      plate: lightbox.plate,
      of: lightbox.of,
    },
  };
}

/** Inverse mapping, used by the seed to load the code-defined copy into the CMS. */
export function translationToSite(t: Translation) {
  const g = (obj: Record<string, string>) =>
    Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.replace(/-/g, '_'), v]));
  return {
    hero: { logo_mark: t.logo.mark, ...t.hero, marquee: t.marquee.map((word) => ({ word })) },
    work: { ...t.work, filters: g(t.filters), project_types: g(t.project_types) },
    services: {
      ...t.services,
      items: t.services_data.map((s) => ({ ...s, deliverables: s.deliverables.map((item) => ({ item })) })),
    },
    study: t.study,
    contact: { press_eyebrow: t.press, ...t.contact },
    footer: t.footer,
    lightbox: t.lightbox,
  };
}
