import type { CollectionConfig } from 'payload';
import { revalidateHomeAfterChange, revalidateHomeAfterDelete } from '@/lib/revalidate';

export const Press: CollectionConfig = {
  slug: 'press',
  orderable: true,
  versions: { drafts: { autosave: { interval: 375 } } },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'edition'] },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateHomeAfterChange],
    afterDelete: [revalidateHomeAfterDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'edition', type: 'text', required: true },
  ],
};
