import type { Field, GlobalConfig } from 'payload';
import { FILTER_IDS, PROJECT_TYPE_IDS } from '@/lib/data';
import { revalidateHomeAfterGlobalChange } from '@/lib/revalidate';

const text = (name: string, opts: Partial<Field> & { label?: string } = {}): Field =>
  ({ name, type: 'text', localized: true, required: true, ...opts }) as Field;

const textarea = (name: string, opts: Partial<Field> & { label?: string } = {}): Field =>
  ({ name, type: 'textarea', localized: true, required: true, ...opts }) as Field;

/**
 * All page copy except the navigation menu.
 * Mirrors the `Translation` type in lib/i18n.tsx; merged over it in lib/content.ts.
 */
export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site content',
  versions: { drafts: { autosave: { interval: 375 } } },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHomeAfterGlobalChange] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            text('logo_mark', { label: 'Logo word after "Slyvka"' }),
            text('eyebrow'),
            text('title_l1', { label: 'Title line 1' }),
            {
              type: 'row',
              fields: [
                text('title_l2_a', { label: 'Title line 2 (italic word)' }),
                text('title_l2_b', { label: 'Title line 2 (rest)' }),
              ],
            },
            text('title_l3', { label: 'Title line 3' }),
            { type: 'row', fields: [text('cta_work'), text('cta_talk')] },
            textarea('blurb'),
            { type: 'row', fields: [text('booking_label'), text('booking_value')] },
            {
              name: 'marquee',
              type: 'array',
              localized: true,
              labels: { singular: 'Word', plural: 'Marquee words' },
              fields: [{ name: 'word', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Work',
          name: 'work',
          fields: [
            text('eyebrow'),
            { type: 'row', fields: [text('title_l1'), text('title_l2')] },
            text('empty', { label: 'Empty filter message' }),
            text('view', { label: '"View project" link' }),
            {
              name: 'filters',
              type: 'group',
              label: 'Filter labels',
              fields: FILTER_IDS.map((id) => text(id.replace(/-/g, '_'), { label: id })),
            },
            {
              name: 'project_types',
              type: 'group',
              label: 'Project type labels',
              fields: PROJECT_TYPE_IDS.map((id) => text(id.replace(/-/g, '_'), { label: id })),
            },
          ],
        },
        {
          label: 'Services',
          name: 'services',
          fields: [
            text('eyebrow'),
            { type: 'row', fields: [text('title_l1'), text('title_l2')] },
            textarea('intro'),
            {
              name: 'items',
              type: 'array',
              localized: true,
              labels: { singular: 'Service', plural: 'Services' },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'summary', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                {
                  name: 'deliverables',
                  type: 'array',
                  fields: [{ name: 'item', type: 'text', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'Case study',
          name: 'study',
          fields: [
            text('eyebrow'),
            textarea('title'),
            text('brief', { label: '"The brief" heading' }),
            textarea('brief_p1'),
            textarea('brief_p2'),
            {
              type: 'row',
              fields: [text('stat_area_value', { localized: false }), text('stat_area')],
            },
            {
              type: 'row',
              fields: [text('stat_time_value', { localized: false }), text('stat_time')],
            },
            {
              type: 'row',
              fields: [text('stat_color_value', { localized: false }), text('stat_color')],
            },
            text('cta'),
          ],
        },
        {
          label: 'Press & Contact',
          name: 'contact',
          fields: [
            text('press_eyebrow', { label: 'Press section eyebrow' }),
            text('eyebrow'),
            { type: 'row', fields: [text('title_l1'), text('title_l2')] },
            textarea('blurb'),
            { type: 'row', fields: [text('studio'), text('hours'), text('direct'), text('tel')] },
            textarea('address'),
            textarea('hours_value'),
            { type: 'row', fields: [text('email', { localized: false }), text('phone', { localized: false })] },
            text('cta'),
          ],
        },
        {
          label: 'Footer',
          name: 'footer',
          fields: [
            text('rights'),
            {
              name: 'socials',
              type: 'array',
              labels: { singular: 'Link', plural: 'Links' },
              fields: [
                { type: 'row', fields: [{ name: 'label', type: 'text', required: true }, { name: 'url', type: 'text', required: true }] },
              ],
            },
          ],
        },
        {
          label: 'Lightbox labels',
          name: 'lightbox',
          fields: [
            { type: 'row', fields: [text('project'), text('close'), text('plate'), text('of')] },
            { type: 'row', fields: [text('type'), text('area'), text('rooms'), text('year')] },
            { type: 'row', fields: [text('location'), text('status'), text('completed')] },
            text('palette'),
            text('palette_caption'),
            { type: 'row', fields: [text('credits'), text('design'), text('photography'), text('joinery'), text('build')] },
          ],
        },
      ],
    },
  ],
};
