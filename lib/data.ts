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
    id: 'tjachiv',
    name: 'Дизайн проект квартири',
    location: 'Тячів',
    year: '2026',
    type: 'Житловий простір',
    sqm: '43',
    rooms: '2',
    tags: ['family', 'warm-modern', 'full-renovation'],
    // blurb: 'A century-old townhouse reimagined for a young family of four, with hand-plastered walls and a kitchen built around the morning light.',
    blurb: 'Невелика квартира для молодої сімї. Дизайн проект квартири в Ужгороді, УКР',
    swatch: '#C9A6A6',
    swatch2: '#6B3C4F',
    cover: 'living room — afternoon light, plaster walls, oak floor',
    feature: true,
    images: [
      {
        id: '1',
        url: '/images/tjachiv/1.tif',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '2',
        url: '/images/tjachiv/2.tif',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '3',
        url: '/images/tjachiv/3.png',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '4',
        url: '/images/tjachiv/4.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '5',
        url: '/images/tjachiv/5.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '6',
        url: '/images/tjachiv/6.png',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '7',
        url: '/images/tjachiv/7.png',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '8',
        url: '/images/tjachiv/8.tif',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '9',
        url: '/images/tjachiv/9.tif',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '10',
        url: '/images/tjachiv/10.tif',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '11',
        url: '/images/tjachiv/11.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '12',
        url: '/images/tjachiv/12.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '13',
        url: '/images/tjachiv/13.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '14',
        url: '/images/tjachiv/14.tif',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '15',
        url: '/images/tjachiv/15.tif',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '16',
        url: '/images/tjachiv/16.png',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '17',
        url: '/images/tjachiv/17.png',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '18',
        url: '/images/tjachiv/18.png',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '19',
        url: '/images/tjachiv/19.png',
        alt: 'Дизайн проект квартири',
      },
    ],
  },
  {
    id: 'uzhorod',
    name: 'Дизайн-проєкт квартири',
    location: 'Ужгород',
    year: '2025',
    type: 'Житловий простір',
    sqm: '58',
    rooms: '2',
    tags: ['apartment', 'small-footprint', 'colour'],
    blurb: 'Невелика квартира для молодої сімї. Дизайн проект квартири в Ужгороді, УКР',
    swatch: '#6B3C4F',
    swatch2: '#3D1F2D',
    cover: 'reading nook — plum velvet, brass sconce, linen drape',
    feature: true,
    images: [
      {
        id: '1',
        url: '/images/uzhorod/1.jpg',
        alt: 'Plum Pied-à-terre',
      },
      {
        id: '2',
        url: '/images/uzhorod/2.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '3',
        url: '/images/uzhorod/3.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '4',
        url: '/images/uzhorod/4.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '5',
        url: '/images/uzhorod/5.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '6',
        url: '/images/uzhorod/6.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '7',
        url: '/images/uzhorod/7.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '8',
        url: '/images/uzhorod/8.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '9',
        url: '/images/uzhorod/9.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '10',
        url: '/images/uzhorod/10.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '11',
        url: '/images/uzhorod/11.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '12',
        url: '/images/uzhorod/12.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '13',
        url: '/images/uzhorod/13.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '14',
        url: '/images/uzhorod/14.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '15',
        url: '/images/uzhorod/15.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '16',
        url: '/images/uzhorod/16.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '17',
        url: '/images/uzhorod/17.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '18',
        url: '/images/uzhorod/18.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '19',
        url: '/images/uzhorod/19.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '20',
        url: '/images/uzhorod/20.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '21',
        url: '/images/uzhorod/21.jpg',
        alt: 'Дизайн проект квартири',
      },
    ],
  },
  {
    id: 'prague',
    name: 'Дизайн-проєкт квартири',
    location: 'Прага',
    year: '2024',
    type: 'Житловий простір',
    sqm: '96',
    rooms: '3',
    tags: ['holiday', 'coastal', 'warm-modern'],
    blurb: 'A weekend cottage half a kilometre from the Black Sea, finished entirely in lime-washed pine and unbleached linen.',
    swatch: '#EBE3D7',
    swatch2: '#DCD2C2',
    cover: 'sunroom — pine ceiling, linen curtains, slate floor',
    images: [
      {
        id: '1',
        url: '/images/prague/1.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '2',
        url: '/images/prague/2.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '3',
        url: '/images/prague/3.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '4',
        url: '/images/prague/4.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '5',
        url: '/images/prague/5.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '6',
        url: '/images/prague/6.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '7',
        url: '/images/prague/7.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '8',
        url: '/images/prague/8.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '9',
        url: '/images/prague/9.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '10',
        url: '/images/prague/10.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '11',
        url: '/images/prague/11.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '12',
        url: '/images/prague/12.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '13',
        url: '/images/prague/13.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '14',
        url: '/images/prague/14.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '15',
        url: '/images/prague/15.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '16',
        url: '/images/prague/16.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '17',
        url: '/images/prague/17.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '18',
        url: '/images/prague/18.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '19',
        url: '/images/prague/19.jpg',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '20',
        url: '/images/prague/20.png',
        alt: 'Дизайн проект квартири',
      },
      {
        id: '21',
        url: '/images/prague/21.jpg',
        alt: 'Дизайн проект квартири',
      },
    ], 
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
