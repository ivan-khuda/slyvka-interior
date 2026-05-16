'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type Lang = 'en' | 'uk' | 'cs';

type ServiceData = {
  name: string;
  summary: string;
  body: string;
  deliverables: string[];
};

export type Translation = {
  code: string;
  name: string;
  nav: { work: string; services: string; study: string; contact: string; cta: string };
  logo: { mark: string };
  hero: {
    eyebrow: string;
    title_l1: string;
    title_l2_a: string;
    title_l2_b: string;
    title_l3: string;
    cta_work: string;
    cta_talk: string;
    blurb: string;
    booking_label: string;
    booking_value: string;
  };
  marquee: string[];
  work: { eyebrow: string; title_l1: string; title_l2: string; empty: string; view: string };
  filters: Record<string, string>;
  services: { eyebrow: string; title_l1: string; title_l2: string; intro: string };
  study: {
    eyebrow: string;
    title: string;
    brief: string;
    brief_p1: string;
    brief_p2: string;
    stat_area: string;
    stat_time: string;
    stat_color: string;
    cta: string;
  };
  press: string;
  contact: {
    eyebrow: string;
    title_l1: string;
    title_l2: string;
    blurb: string;
    studio: string;
    hours: string;
    direct: string;
    tel: string;
    hours_value: string;
    cta: string;
  };
  footer: { rights: string };
  lightbox: {
    project: string;
    close: string;
    type: string;
    area: string;
    rooms: string;
    year: string;
    location: string;
    status: string;
    completed: string;
    palette: string;
    palette_caption: string;
    credits: string;
    design: string;
    photography: string;
    joinery: string;
    build: string;
    plate: string;
    of: string;
  };
  services_data: ServiceData[];
  project_types: Record<string, string>;
};

export const TRANSLATIONS: Record<Lang, Translation> = {
  en: {
    code: 'EN',
    name: 'English',
    nav: { work: 'Work', services: 'Services', study: 'Case study', contact: 'Contact', cta: 'Begin a project →' },
    logo: { mark: 'interior' },
    hero: {
      eyebrow: 'Residential design studio · Est. 2018',
      title_l1: 'Homes that',
      title_l2_a: 'ripen',
      title_l2_b: ' with you,',
      title_l3: 'not against you.',
      cta_work: 'Selected projects',
      cta_talk: 'Talk to us',
      blurb: 'A small residential design practice in Lviv. We work with twelve households a year, patiently and at close range — drawing rooms that age well, hold things gently, and feel inevitable by the time we hand over the keys.',
      booking_label: 'Currently booking',
      booking_value: 'Spring 2026',
    },
    marquee: ['Lviv', 'Kyiv', 'Odesa', 'Carpathians', 'Warsaw', 'Vienna', 'and home'],
    work: {
      eyebrow: '— Selected work, 2022 — 2025',
      title_l1: 'Six rooms',
      title_l2: "we'd come back to.",
      empty: 'Nothing in that drawer yet. Try another filter.',
      view: 'View project →',
    },
    filters: {
      all: 'All work', family: 'Family homes', apartment: 'Apartments',
      holiday: 'Holiday homes', 'small-footprint': 'Small footprint', restoration: 'Restoration',
    },
    services: {
      eyebrow: '— Services',
      title_l1: 'Four ways',
      title_l2: 'we work.',
      intro: 'Every commission begins with a long, slow conversation about how you actually live — where the morning light falls, what you cook on Sundays, which heirlooms travel with you. From there, we shape one of four engagements.',
    },
    study: {
      eyebrow: '— A closer look',
      title: 'A 74-square-metre apartment built around a single piece of inherited furniture.',
      brief: 'The brief',
      brief_p1: "Olena had inherited her grandmother's plum-velvet armchair. She also had a north-facing two-room flat in a 1903 building in Podil, no real budget for joinery, and a strong opinion about ceiling lights.",
      brief_p2: "We kept the chair. We restored four of the original cornices. We removed every overhead fixture, painted the walls a single colour mixed three times until it matched the armchair's deepest fold, and put the rest of the budget into linen, brass, and a single, uncompromising kitchen.",
      stat_area: 'Floor area',
      stat_time: 'Concept to handover',
      stat_color: 'Wall colour',
      cta: 'Read the full case study →',
    },
    press: '— Recent press',
    contact: {
      eyebrow: '— Begin a project',
      title_l1: 'Tell us about',
      title_l2: 'your home.',
      blurb: 'We open four new commissions each season. The first conversation is always unhurried, in person where possible, and free of charge.',
      studio: 'Studio',
      hours: 'Hours',
      direct: 'Direct',
      tel: 'Telephone',
      hours_value: 'Tuesday — Friday\n10:00 — 18:00, by appointment',
      cta: 'Write to the studio',
    },
    footer: { rights: '© 2018 — 2026, all rights reserved.' },
    lightbox: {
      project: 'Project', close: 'Close',
      type: 'Type', area: 'Area', rooms: 'Rooms', year: 'Year', location: 'Location', status: 'Status', completed: 'Completed',
      palette: 'Material palette',
      palette_caption: 'Plaster · oak · linen · brass · slate',
      credits: 'Credits',
      design: 'Design', photography: 'Photography', joinery: 'Joinery', build: 'Build',
      plate: 'Plate', of: 'of',
    },
    services_data: [
      { name: 'Full interior design', summary: 'From first sketch to the day you hang the last picture.', body: 'A complete service for clients renovating or building a home — concept, layout, materials, joinery, lighting, soft furnishings, and on-site supervision through to handover.', deliverables: ['Concept book', 'Floor & lighting plans', 'Joinery drawings', 'FF&E schedule', 'Site visits'] },
      { name: 'Design consultation', summary: 'A focused two-week engagement for one room or one decision.', body: 'For homeowners who want a clear direction without the full scope. We visit, listen, and come back with a single document — palette, materials, and a shopping list — that you can take to your own builder.', deliverables: ['Site visit', 'Mood document', 'Material samples', 'Sourcing list'] },
      { name: 'Furniture & styling', summary: 'For finished spaces that have not yet found their voice.', body: 'You have the bones; we bring the warmth. Sourcing, custom upholstery, vintage finds, art curation, and a long afternoon of moving things half a metre to the left.', deliverables: ['Floor plan review', 'Sourcing & procurement', 'Install day', 'Art curation'] },
      { name: 'Restoration consulting', summary: 'Older buildings, treated with care.', body: 'For pre-war apartments and historic townhouses. We work alongside conservators and craftspeople to keep what matters and quietly modernise the rest.', deliverables: ['Heritage assessment', 'Conservator coordination', 'Material specification'] },
    ],
    project_types: { 'Family Home': 'Family Home', 'Apartment': 'Apartment', 'Holiday Home': 'Holiday Home' },
  },

  uk: {
    code: 'УК',
    name: 'Українська',
    nav: { work: 'Проєкти', services: 'Послуги', study: 'Кейс', contact: 'Контакти', cta: 'Розпочати проєкт →' },
    logo: { mark: 'інтер’єр' },
    hero: {
      eyebrow: 'Студія житлового дизайну · Заснована 2018',
      title_l1: 'Оселі, що',
      title_l2_a: 'дозрівають',
      title_l2_b: ' із вами,',
      title_l3: 'а не проти вас.',
      cta_work: 'Обрані проєкти',
      cta_talk: 'Поговорити',
      blurb: 'Невелика практика житлового дизайну у Львові. Щороку ми працюємо з дванадцятьма родинами — повільно й уважно, створюючи інтер’єри, які гарно старіють, обережно тримають речі та здаються неминучими, коли ми передаємо ключі.',
      booking_label: 'Зараз набираємо',
      booking_value: 'Весна 2026',
    },
    marquee: ['Львів', 'Київ', 'Одеса', 'Карпати', 'Варшава', 'Відень', 'і дім'],
    work: {
      eyebrow: '— Обрані роботи, 2022 — 2025',
      title_l1: 'Шість кімнат,',
      title_l2: 'до яких хочеться повернутись.',
      empty: 'У цій шухляді поки порожньо. Спробуйте інший фільтр.',
      view: 'Переглянути проєкт →',
    },
    filters: {
      all: 'Усі роботи', family: 'Родинні оселі', apartment: 'Квартири',
      holiday: 'Заміські оселі', 'small-footprint': 'Малий метраж', restoration: 'Реставрація',
    },
    services: {
      eyebrow: '— Послуги',
      title_l1: 'Чотири способи',
      title_l2: 'співпраці.',
      intro: 'Кожен проєкт починається з довгої, неспішної розмови про те, як ви насправді живете — куди падає ранкове світло, що готуєте в неділю, які речі переїжджають із вами. Звідти ми обираємо один із чотирьох форматів.',
    },
    study: {
      eyebrow: '— Ближче',
      title: 'Квартира 74 м², побудована навколо однієї успадкованої меблі.',
      brief: 'Бриф',
      brief_p1: 'Олена успадкувала бабусине крісло з оксамиту кольору сливи. Також у неї була двокімнатна квартира на північний бік у будинку 1903 року на Подолі, дуже скромний бюджет на столярку та чітка думка про стельові світильники.',
      brief_p2: 'Крісло залишили. Чотири оригінальні карнизи відреставрували. Прибрали всі стельові світильники, пофарбували стіни одним кольором, який змішували тричі, аж поки він не зійшовся з найглибшою складкою крісла — і весь решту бюджет витратили на льон, латунь і одну безкомпромісну кухню.',
      stat_area: 'Площа',
      stat_time: 'Від концепту до здачі',
      stat_color: 'Колір стін',
      cta: 'Читати весь кейс →',
    },
    press: '— У пресі',
    contact: {
      eyebrow: '— Розпочати проєкт',
      title_l1: 'Розкажіть',
      title_l2: 'про свій дім.',
      blurb: 'Кожного сезону ми відкриваємо чотири нові проєкти. Перша розмова — завжди неспішна, по можливості особиста, і безкоштовна.',
      studio: 'Студія', hours: 'Години', direct: 'Пряма пошта', tel: 'Телефон',
      hours_value: 'Вівторок — П’ятниця\n10:00 — 18:00, за домовленістю',
      cta: 'Написати в студію',
    },
    footer: { rights: '© 2018 — 2026, усі права захищені.' },
    lightbox: {
      project: 'Проєкт', close: 'Закрити',
      type: 'Тип', area: 'Площа', rooms: 'Кімнати', year: 'Рік', location: 'Місто', status: 'Статус', completed: 'Завершено',
      palette: 'Палітра матеріалів',
      palette_caption: 'Тиньк · дуб · льон · латунь · сланець',
      credits: 'Команда',
      design: 'Дизайн', photography: 'Фотографія', joinery: 'Столярка', build: 'Будівництво',
      plate: 'Кадр', of: 'з',
    },
    services_data: [
      { name: 'Повний дизайн інтер’єру', summary: 'Від першого ескізу до дня, коли ви вішаєте останню картину.', body: 'Повний цикл для клієнтів, що ремонтують чи будують дім — концепт, планування, матеріали, столярка, світло, текстиль і авторський нагляд до моменту здачі.', deliverables: ['Концепт-бук', 'Плани підлоги та світла', 'Креслення столярки', 'Специфікація меблів', 'Виїзди на об’єкт'] },
      { name: 'Консультація з дизайну', summary: 'Сфокусована двотижнева робота над однією кімнатою чи одним рішенням.', body: 'Для тих, хто хоче чіткий напрямок без повного супроводу. Ми приїжджаємо, слухаємо та повертаємося з одним документом — палітра, матеріали і список покупок, з яким можна йти до свого будівельника.', deliverables: ['Виїзд на об’єкт', 'Мудборд', 'Зразки матеріалів', 'Список постачальників'] },
      { name: 'Меблі та стилізація', summary: 'Для готових просторів, які ще не знайшли свого голосу.', body: 'У вас є основа — ми додаємо тепло. Підбір, авторська оббивка, вінтажні знахідки, кураторство мистецтва і довгий день, коли пересуваємо речі на пів метра ліворуч.', deliverables: ['Аналіз планування', 'Підбір та закупівля', 'День встановлення', 'Кураторство мистецтва'] },
      { name: 'Реставраційний консалтинг', summary: 'Старі будівлі — з належною турботою.', body: 'Для довоєнних квартир і історичних кам’яниць. Працюємо разом із реставраторами та майстрами, щоб зберегти важливе та тихо осучаснити решту.', deliverables: ['Експертиза спадщини', 'Координація з реставраторами', 'Специфікація матеріалів'] },
    ],
    project_types: { 'Family Home': 'Родинна оселя', 'Apartment': 'Квартира', 'Holiday Home': 'Заміська оселя' },
  },

  cs: {
    code: 'CZ',
    name: 'Čeština',
    nav: { work: 'Projekty', services: 'Služby', study: 'Případovka', contact: 'Kontakt', cta: 'Začít projekt →' },
    logo: { mark: 'interiér' },
    hero: {
      eyebrow: 'Studio bytového designu · Zal. 2018',
      title_l1: 'Domovy, které',
      title_l2_a: 'zrají',
      title_l2_b: ' s vámi,',
      title_l3: 'ne proti vám.',
      cta_work: 'Vybrané projekty',
      cta_talk: 'Promluvme si',
      blurb: 'Malé studio bytového designu ve Lvově. Ročně pracujeme s dvanácti domácnostmi — trpělivě a zblízka, navrhujeme prostory, které dobře stárnou, jemně drží věci a v den předání klíčů působí samozřejmě.',
      booking_label: 'Aktuálně přijímáme',
      booking_value: 'Jaro 2026',
    },
    marquee: ['Lvov', 'Kyjev', 'Oděsa', 'Karpaty', 'Varšava', 'Vídeň', 'a domů'],
    work: {
      eyebrow: '— Vybraná tvorba, 2022 — 2025',
      title_l1: 'Šest místností,',
      title_l2: 'kam bychom se rádi vrátili.',
      empty: 'Tato přihrádka je zatím prázdná. Zkuste jiný filtr.',
      view: 'Zobrazit projekt →',
    },
    filters: {
      all: 'Vše', family: 'Rodinné domy', apartment: 'Byty',
      holiday: 'Rekreační domy', 'small-footprint': 'Malé prostory', restoration: 'Rekonstrukce',
    },
    services: {
      eyebrow: '— Služby',
      title_l1: 'Čtyři způsoby,',
      title_l2: 'jak pracujeme.',
      intro: 'Každá zakázka začíná dlouhým, klidným rozhovorem o tom, jak vlastně žijete — kam dopadá ranní světlo, co vaříte v neděli, jaké památné věci s vámi cestují. Z toho vzejde jedna ze čtyř spoluprací.',
    },
    study: {
      eyebrow: '— Zblízka',
      title: 'Byt o 74 metrech čtverečních postavený kolem jednoho zděděného kusu nábytku.',
      brief: 'Zadání',
      brief_p1: 'Olena zdědila po babičce křeslo ze švestkového sametu. Měla také severně orientovaný dvoupokojový byt v domě z roku 1903 v Podilu, nevelký rozpočet na truhlařinu a pevný názor na stropní svítidla.',
      brief_p2: 'Křeslo jsme nechali. Čtyři původní římsy jsme zrestaurovali. Sundali jsme každé stropní svítidlo, stěny natřeli jedinou barvou, kterou jsme třikrát míchali, dokud neseděla s nejhlubší řasou křesla, a zbytek rozpočtu jsme dali do lnu, mosazi a jediné nekompromisní kuchyně.',
      stat_area: 'Plocha',
      stat_time: 'Koncept až předání',
      stat_color: 'Barva stěn',
      cta: 'Přečíst celou případovou studii →',
    },
    press: '— V tisku',
    contact: {
      eyebrow: '— Začít projekt',
      title_l1: 'Povězte nám',
      title_l2: 'o svém domově.',
      blurb: 'Každou sezónu otevíráme čtyři nové zakázky. První rozhovor je vždy nespěchaný, pokud možno osobní, a zdarma.',
      studio: 'Studio', hours: 'Otevírací doba', direct: 'Přímo', tel: 'Telefon',
      hours_value: 'Úterý — Pátek\n10:00 — 18:00, po domluvě',
      cta: 'Napsat do studia',
    },
    footer: { rights: '© 2018 — 2026, všechna práva vyhrazena.' },
    lightbox: {
      project: 'Projekt', close: 'Zavřít',
      type: 'Typ', area: 'Plocha', rooms: 'Pokoje', year: 'Rok', location: 'Místo', status: 'Stav', completed: 'Dokončeno',
      palette: 'Paleta materiálů',
      palette_caption: 'Omítka · dub · len · mosaz · břidlice',
      credits: 'Tým',
      design: 'Návrh', photography: 'Fotografie', joinery: 'Truhlařina', build: 'Realizace',
      plate: 'Snímek', of: 'z',
    },
    services_data: [
      { name: 'Kompletní bytový design', summary: 'Od první skicy po den, kdy věšíte poslední obraz.', body: 'Kompletní služba pro klienty, kteří renovují nebo staví dům — koncept, dispozice, materiály, truhlařina, světlo, textil a autorský dozor až do předání.', deliverables: ['Koncept-book', 'Půdorys a plán světel', 'Výkresy truhlařiny', 'Specifikace nábytku', 'Návštěvy stavby'] },
      { name: 'Designová konzultace', summary: 'Soustředěná dvoutýdenní spolupráce nad jednou místností nebo jedním rozhodnutím.', body: 'Pro majitele, kteří chtějí jasný směr bez plného vedení. Přijedeme, vyslechneme a vrátíme se s jedním dokumentem — palety, materiály a nákupní seznam, se kterým můžete jít ke svému stavebnímu týmu.', deliverables: ['Návštěva místa', 'Moodboard', 'Vzorky materiálů', 'Seznam dodavatelů'] },
      { name: 'Nábytek a styling', summary: 'Pro hotové prostory, které ještě nenašly svůj hlas.', body: 'Máte kostru, my dodáme teplo. Výběr, atypické čalounění, vintage nálezy, kurátorství umění a dlouhé odpoledne posouvání věcí o půl metru doleva.', deliverables: ['Revize dispozice', 'Výběr a nákup', 'Den instalace', 'Kurátorství umění'] },
      { name: 'Konzultace rekonstrukcí', summary: 'Starší budovy s patřičnou péčí.', body: 'Pro prvorepublikové byty a historické měšťanské domy. Spolupracujeme s restaurátory a řemeslníky — ponechat to podstatné a tiše modernizovat zbytek.', deliverables: ['Posouzení památky', 'Koordinace s restaurátory', 'Specifikace materiálů'] },
    ],
    project_types: { 'Family Home': 'Rodinný dům', 'Apartment': 'Byt', 'Holiday Home': 'Rekreační dům' },
  },
};

type I18nValue = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

const I18nContext = createContext<I18nValue>({ t: TRANSLATIONS.en, lang: 'en', setLang: () => {} });

export function useI18n(): I18nValue {
  return useContext(I18nContext);
}

export function I18nProvider({ lang, setLang, children }: { lang: Lang; setLang: (l: Lang) => void; children: ReactNode }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return <I18nContext.Provider value={{ t, lang, setLang }}>{children}</I18nContext.Provider>;
}
