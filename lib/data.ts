export type Project = {
  id: string;
  name: string;
  location: string;
  year: string;
  type: 'Family Home' | 'Apartment' | 'Holiday Home';
  sqm: string;
  rooms: string;
  tags: string[];
  blurb: string;
  swatch: string;
  swatch2: string;
  cover?: string;
  feature?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 'orchard-house',
    name: 'Orchard House',
    location: 'Lviv, UA',
    year: '2025',
    type: 'Family Home',
    sqm: '212',
    rooms: '4',
    tags: ['family', 'warm-modern', 'full-renovation'],
    blurb: 'A century-old townhouse reimagined for a young family of four, with hand-plastered walls and a kitchen built around the morning light.',
    swatch: '#C9A6A6',
    swatch2: '#6B3C4F',
    cover: 'living room — afternoon light, plaster walls, oak floor',
    feature: true,
  },
  {
    id: 'plum-pied-a-terre',
    name: 'Plum Pied-à-terre',
    location: 'Kyiv, UA',
    year: '2024',
    type: 'Apartment',
    sqm: '74',
    rooms: '2',
    tags: ['apartment', 'small-footprint', 'colour'],
    blurb: 'A 74-square-metre apartment built around a single piece of inherited furniture and a love of plum jam.',
    swatch: '#6B3C4F',
    swatch2: '#3D1F2D',
    cover: 'reading nook — plum velvet, brass sconce, linen drape',
    feature: true,
  },
  {
    id: 'salt-cottage',
    name: 'Salt Cottage',
    location: 'Odesa, UA',
    year: '2024',
    type: 'Holiday Home',
    sqm: '96',
    rooms: '3',
    tags: ['holiday', 'coastal', 'warm-modern'],
    blurb: 'A weekend cottage half a kilometre from the Black Sea, finished entirely in lime-washed pine and unbleached linen.',
    swatch: '#EBE3D7',
    swatch2: '#DCD2C2',
    cover: 'sunroom — pine ceiling, linen curtains, slate floor',
  },
  {
    id: 'archivist-flat',
    name: 'The Archivist',
    location: 'Lviv, UA',
    year: '2023',
    type: 'Apartment',
    sqm: '88',
    rooms: '2',
    tags: ['apartment', 'library', 'restoration'],
    blurb: 'For a book conservator — floor-to-ceiling shelves in stained ash, a writing desk by the window, and not much else.',
    swatch: '#5A4F4B',
    swatch2: '#221C1A',
  },
  {
    id: 'pear-tree',
    name: 'Pear Tree',
    location: 'Carpathians, UA',
    year: '2023',
    type: 'Family Home',
    sqm: '180',
    rooms: '4',
    tags: ['family', 'rural', 'full-renovation'],
    blurb: 'A converted barn at the foot of the mountains — three generations under one slate roof.',
    swatch: '#A89380',
    swatch2: '#6B5544',
  },
  {
    id: 'south-light',
    name: 'South Light',
    location: 'Kyiv, UA',
    year: '2022',
    type: 'Apartment',
    sqm: '62',
    rooms: '1',
    tags: ['apartment', 'small-footprint', 'colour'],
    blurb: 'A single-bedroom flat reorganised around the only south-facing window in the building.',
    swatch: '#D4B896',
    swatch2: '#9C7E5F',
  },
];

export const FILTER_IDS = ['all', 'family', 'apartment', 'holiday', 'small-footprint', 'restoration'] as const;
export type FilterId = (typeof FILTER_IDS)[number];

export const PRESS = [
  { name: 'Architectural Digest', edition: 'Spring 2025' },
  { name: 'Dezeen', edition: 'May 2024' },
  { name: 'Domus', edition: 'No. 1082' },
  { name: 'Wallpaper*', edition: 'Apr 2024' },
  { name: 'Kinfolk', edition: 'Issue 51' },
];
