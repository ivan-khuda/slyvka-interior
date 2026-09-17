import type { CollectionConfig } from 'payload';
import { revalidateHomeAfterChange, revalidateHomeAfterDelete } from '@/lib/revalidate';

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateHomeAfterChange],
    afterDelete: [revalidateHomeAfterDelete],
  },
  upload: {
    // Local dev: files land in ./media (git-ignored). On Vercel the Blob adapter
    // takes over and disables local storage automatically.
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 320, height: 320, position: 'centre' },
      { name: 'card', width: 1200, withoutEnlargement: true },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
};
