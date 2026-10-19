export interface NavLink { href: string; label: string; text?: string; icon?: string }
export interface NavGroup { title: string; links: NavLink[] }
export interface NavItem { label: string; href: string; groups?: NavGroup[]; wide?: boolean }

export const NAV: NavItem[] = [
  {
    label: 'Schweißkurse',
    href: '/schweisskurse-lehrgaenge/',
    wide: true,
    groups: [
      {
        title: 'Einsteiger',
        links: [
          { href: '/mig-mag-einsteiger-schweisskurs/', label: 'MIG/MAG Einsteiger', text: '1 Tag · 415 €', icon: 'spark' },
          { href: '/wig-einsteiger-schweisskurs/', label: 'WIG Einsteiger', text: '1 Tag · 415 €', icon: 'target' },
          { href: '/elektroden-einsteiger-schweisskurs/', label: 'E-Hand Einsteiger', text: '1 Tag · 466 €', icon: 'spark' },
          { href: '/autogen-einsteiger-schweisskurs/', label: 'Autogen Einsteiger', text: '1 Tag · 466 €', icon: 'flame' },
          { href: '/gasschweissen-flammloeten-kurs/', label: 'Gasschweißen & Flammlöten', text: '1 Tag · 566 €', icon: 'flame' },
          { href: '/loet-einsteiger-kurs/', label: 'Löt-Einsteiger-Kurs', text: 'Hart- und Weichlöten', icon: 'flame' }
        ]
      },
      {
        title: 'Aufbau & Fortgeschritten',
        links: [
          { href: '/wig-alu-aufbau-schweisskurs/', label: 'Alu-WIG Aufbaukurs', text: 'Aluminium sicher schweißen', icon: 'layers' },
          { href: '/mag-fortgeschrittenen-schweisskurs/', label: 'MAG Fortgeschritten', text: 'Positionen, Mehrlagen', icon: 'layers' },
          { href: '/pulse-arc-aufbau-schweisskurs/', label: 'Pulse-Arc Aufbaukurs', text: 'Impulsschweißen', icon: 'layers' },
          { href: '/aufbaukurse/', label: 'Alle Aufbaukurse', text: 'Übersicht', icon: 'grid' }
        ]
      },
      {
        title: 'Prüfung & Region Hamburg',
        links: [
          { href: '/tuev-gepruefter-schweisskurs/', label: 'Lehrgang mit TÜV-Prüfung', text: 'DIN EN ISO 9606-1 · 5 Tage', icon: 'award' },
          { href: '/allgemeiner-schweisskurs-hamburg/', label: 'Allgemeiner Schweißkurs Hamburg', text: 'MAG / WIG / E · 357 €', icon: 'pin' },
          { href: '/lerninhalte/', label: 'Lerninhalte', text: 'Was Sie im Kurs lernen', icon: 'book' },
          { href: '/gutschein-bestellen/', label: 'Gutschein verschenken', text: 'Personalisiert', icon: 'gift' }
        ]
      }
    ]
  },
  { label: 'Termine', href: '/termine-und-anmeldungen/' },
  {
    label: 'Standorte',
    href: '/region-muenchen/',
    groups: [
      {
        title: 'Kursorte',
        links: [
          { href: '/region-muenchen/', label: 'München-Freiham', text: 'Alle Kurse und Lehrgänge', icon: 'pin' },
          { href: '/region-hamburg/', label: 'Region Hamburg', text: 'Ellerhoop, Kreis Pinneberg', icon: 'pin' },
          { href: '/anfahrt-muenchen/', label: 'Anfahrt München', text: 'Auto, S-Bahn, Parken', icon: 'route' },
          { href: '/anfahrt-hamburg/', label: 'Anfahrt Hamburg', text: 'Auto, Bahn, Parken', icon: 'route' }
        ]
      }
    ]
  },
  {
    label: 'Ratgeber',
    href: '/ratgeber/',
    wide: true,
    groups: [
      {
        title: 'Verfahren',
        links: [
          { href: '/ratgeber/was-ist-schweissen/', label: 'Schweißen auf einen Blick', icon: 'info' },
          { href: '/ratgeber/schweissverfahren/', label: 'Schweißverfahren', icon: 'layers' },
          { href: '/ratgeber/schweissverfahren/mig-mag-schweissen/', label: 'MIG/MAG-Schweißen', icon: 'spark' },
          { href: '/ratgeber/schweissverfahren/wig-schweissen/', label: 'WIG-Schweißen', icon: 'target' }
        ]
      },
      {
        title: 'Praxis',
        links: [
          { href: '/ratgeber/schweissanleitung/', label: 'Schweißanleitungen & Videos', icon: 'video' },
          { href: '/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/', label: 'Schweißnahtformen', icon: 'grid' },
          { href: '/ratgeber/metall/metalle/', label: 'Metalle & Werkstoffe', icon: 'layers' },
          { href: '/ratgeber/schweisszubehoer/', label: 'Zubehör & Geräte', icon: 'wrench' }
        ]
      },
      {
        title: 'Gase & Wissen',
        links: [
          { href: '/ratgeber/gase/', label: 'Schutzgase', icon: 'cylinder' },
          { href: '/ratgeber/gase/farben-gasflaschen/', label: 'Farben von Gasflaschen', icon: 'cylinder' },
          { href: '/ratgeber/glossar-2/', label: 'Glossar A–Z', icon: 'book' },
          { href: '/schweisskurs-ratgeber/', label: 'Welcher Kurs passt?', icon: 'compass' }
        ]
      }
    ]
  },
  {
    label: 'Über uns',
    href: '/wir-ueber-uns/',
    groups: [
      {
        title: 'Merkle Schweißkurse',
        links: [
          { href: '/wir-ueber-uns/', label: 'Wir über uns', text: 'Kursraum, Dozenten, Merkle', icon: 'building' },
          { href: '/referenzen/', label: 'Kundenstimmen', text: 'Bewertungen & Videos', icon: 'star' },
          { href: '/galerie/', label: 'Galerie', text: 'Bilder aus Kurs und Filiale', icon: 'grid' },
          { href: '/faq/', label: 'Häufige Fragen', text: 'Alles vor der Buchung', icon: 'info' },
          { href: '/lehrbuch/', label: 'Merkle Videothek', text: 'Videos zum Lehrgang', icon: 'video' }
        ]
      }
    ]
  },
  { label: 'Kontakt', href: '/kontakt/' }
];

export const FOOTER_COLS: NavGroup[] = [
  {
    title: 'Kurse',
    links: [
      { href: '/termine-und-anmeldungen/', label: 'Alle Termine' },
      { href: '/mig-mag-einsteiger-schweisskurs/', label: 'MIG/MAG Einsteiger' },
      { href: '/wig-einsteiger-schweisskurs/', label: 'WIG Einsteiger' },
      { href: '/elektroden-einsteiger-schweisskurs/', label: 'E-Hand Einsteiger' },
      { href: '/wig-alu-aufbau-schweisskurs/', label: 'Alu-WIG Aufbau' },
      { href: '/tuev-gepruefter-schweisskurs/', label: 'Lehrgang mit Prüfung' },
      { href: '/gutschein-bestellen/', label: 'Gutschein' }
    ]
  },
  {
    title: 'Standorte',
    links: [
      { href: '/region-muenchen/', label: 'Schweißkurs München' },
      { href: '/region-hamburg/', label: 'Schweißkurs Hamburg' },
      { href: '/anmeldung-muenchen/', label: 'Anmeldung München' },
      { href: '/anmeldung-hamburg/', label: 'Anmeldung Hamburg' },
      { href: '/anfahrt-muenchen/', label: 'Anfahrt München' },
      { href: '/anfahrt-hamburg/', label: 'Anfahrt Hamburg' }
    ]
  },
  {
    title: 'Ratgeber',
    links: [
      { href: '/ratgeber/', label: 'Ratgeber Schweißen' },
      { href: '/ratgeber/schweissverfahren/', label: 'Schweißverfahren' },
      { href: '/ratgeber/schweissanleitung/', label: 'Schweißanleitungen' },
      { href: '/ratgeber/gase/', label: 'Schutzgase' },
      { href: '/ratgeber/glossar-2/', label: 'Glossar' },
      { href: '/schweisskurs-ratgeber/', label: 'Kursfinder' }
    ]
  },
  {
    title: 'Service',
    links: [
      { href: '/kontakt/', label: 'Kontakt' },
      { href: '/faq/', label: 'FAQ' },
      { href: '/referenzen/', label: 'Kundenstimmen' },
      { href: '/wir-ueber-uns/', label: 'Wir über uns' },
      { href: '/vertrag-widerrufen/', label: 'Vertrag widerrufen' }
    ]
  }
];

export const LEGAL_LINKS: NavLink[] = [
  { href: '/impressum/', label: 'Impressum' },
  { href: '/datenschutz/', label: 'Datenschutz' },
  { href: '/agb/', label: 'AGB' },
  { href: '/widerruf/', label: 'Widerrufsbelehrung' },
  { href: '/vertrag-widerrufen/', label: 'Vertrag widerrufen' }
];

/* Seiten, die mit einer dunklen Bühne beginnen: Die Kopfzeile startet dort
   transparent und wird beim Scrollen zu Glas. */
export const DARK_TOP_PATHS = new Set([
  '/',
  '/region-muenchen/',
  '/region-hamburg/',
  '/mig-mag-einsteiger-schweisskurs/',
  '/wig-einsteiger-schweisskurs/',
  '/elektroden-einsteiger-schweisskurs/',
  '/wig-alu-aufbau-schweisskurs/',
  '/mag-fortgeschrittenen-schweisskurs/',
  '/pulse-arc-aufbau-schweisskurs/',
  '/autogen-einsteiger-schweisskurs/',
  '/gasschweissen-flammloeten-kurs/',
  '/loet-einsteiger-kurs/',
  '/tuev-gepruefter-schweisskurs/',
  '/allgemeiner-schweisskurs-hamburg/'
]);
