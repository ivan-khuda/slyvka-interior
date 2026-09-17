import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Projects } from './collections/Projects';
import { Press } from './collections/Press';
import { Site } from './globals/Site';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    livePreview: {
      // Frontend preview route; same origin as the admin, so derive it from the request.
      url: ({ collectionConfig, globalConfig, data, locale, req }) => {
        const params = new URLSearchParams({ locale: locale.code });
        if (globalConfig) params.set('global', globalConfig.slug);
        if (collectionConfig) {
          params.set('collection', collectionConfig.slug);
          params.set('id', String(data.id));
        }
        return `${req.origin}/preview?${params}`;
      },
      collections: ['projects', 'press'],
      globals: ['site'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1194 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Projects, Press, Media, Users],
  globals: [Site],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    // Local: docker-compose Postgres. Production: Neon connection string.
    pool: { connectionString: process.env.DATABASE_URL },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema changes go through migrations in every environment:
    //   bun run migrate:create <name>     migrationDir: path.resolve(dirname, 'migrations'),    migrationDir: path.resolve(dirname, 'migrations'), bun run migrate
    push: false,
  }),
  sharp,
  localization: {
    locales: ['en', 'uk', 'cs'],
    defaultLocale: 'en',
    fallback: true,
  },
  plugins: [
    // Enabled only when a Vercel Blob token is present (Vercel / production).
    // Without it Payload falls back to the local ./media folder.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
