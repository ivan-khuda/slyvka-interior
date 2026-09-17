import * as migration_20260916_201112_initial from './20260916_201112_initial';
import * as migration_20260916_203151_site_global from './20260916_203151_site_global';
import * as migration_20260916_210206_drafts_live_preview from './20260916_210206_drafts_live_preview';

export const migrations = [
  {
    up: migration_20260916_201112_initial.up,
    down: migration_20260916_201112_initial.down,
    name: '20260916_201112_initial',
  },
  {
    up: migration_20260916_203151_site_global.up,
    down: migration_20260916_203151_site_global.down,
    name: '20260916_203151_site_global',
  },
  {
    up: migration_20260916_210206_drafts_live_preview.up,
    down: migration_20260916_210206_drafts_live_preview.down,
    name: '20260916_210206_drafts_live_preview'
  },
];
