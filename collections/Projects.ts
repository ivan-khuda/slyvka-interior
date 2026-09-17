import type { CollectionConfig } from 'payload';
import { revalidateHomeAfterChange, revalidateHomeAfterDelete } from '@/lib/revalidate';

export const PROJECT_TYPES = [
  { label: 'Family Home', value: 'family-home' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Holiday Home', value: 'holiday-home' },
  { label: 'Residential space', value: 'residential' },
] as const;

export const PROJECT_TAGS = [
  { label: 'Family', value: 'family' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Holiday', value: 'holiday' },
  { label: 'Small footprint', value: 'small-footprint' },
  { label: 'Restoration', value: 'restoration' },
] as const;

export const Projects: CollectionConfig = {
  slug: 'projects',
  orderable: true,
  versions: { drafts: { autosave: { interval: 375 } } },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'year', 'type', 'feature'],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateHomeAfterChange],
    afterDelete: [revalidateHomeAfterDelete],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-safe identifier, e.g. "tjachiv".' },
    },
    { name: 'name', type: 'text', localized: true, required: true },
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'text', localized: true, required: true },
        { name: 'year', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'type', type: 'select', options: [...PROJECT_TYPES], required: true },
        { name: 'sqm', type: 'text', required: true, admin: { description: 'Area in m²' } },
        { name: 'rooms', type: 'text', required: true },
      ],
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [...PROJECT_TAGS],
      admin: { description: 'Used by the portfolio filter.' },
    },
    { name: 'blurb', type: 'textarea', localized: true, required: true },
    {
      name: 'cover',
      type: 'text',
      localized: true,
      admin: { description: 'Caption shown on the cover placeholder.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'swatch', type: 'text', required: true, defaultValue: '#C9A6A6', admin: { description: 'Hex colour' } },
        { name: 'swatch2', type: 'text', required: true, defaultValue: '#6B3C4F', admin: { description: 'Hex colour' } },
      ],
    },
    { name: 'feature', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'images',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
};
