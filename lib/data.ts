export const PROJECT_TYPE_IDS = ['family-home', 'apartment', 'holiday-home', 'residential'] as const;
export type ProjectType = (typeof PROJECT_TYPE_IDS)[number];

export const FILTER_IDS = ['all', 'family', 'apartment', 'holiday', 'small-footprint', 'restoration'] as const;
export type FilterId = (typeof FILTER_IDS)[number];

export type ProjectImage = {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

/** Frontend shape of a project, already resolved for one language. */
export type Project = {
  /** Payload document id (used by live preview to match edited docs). */
  docId?: number;
  id: string;
  name: string;
  location: string;
  year: string;
  type: ProjectType | string;
  sqm: string;
  rooms: string;
  tags: string[];
  blurb: string;
  swatch: string;
  swatch2: string;
  cover?: string;
  feature?: boolean;
  images?: ProjectImage[];
};

export type PressItem = { docId?: number; name: string; edition: string };
