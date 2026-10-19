import { KURSE } from './courses';
import { RATGEBER } from './ratgeber';
import { GLOSSAR } from './ratgeber/glossar';

/* Alle indexierbaren Seiten – Grundlage für Sitemap und llms.txt. */
export const STATIC_PAGES: { path: string; title: string; prio: number; freq: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', title: 'Startseite', prio: 1, freq: 'daily' },
  { path: '/termine-und-anmeldungen/', title: 'Termine & Anmeldung', prio: 0.95, freq: 'daily' },
  { path: '/region-muenchen/', title: 'Schweißkurs München', prio: 0.9, freq: 'daily' },
  { path: '/region-hamburg/', title: 'Schweißkurs Region Hamburg', prio: 0.9, freq: 'daily' },
  { path: '/anmeldung-muenchen/', title: 'Anmeldung München', prio: 0.7, freq: 'daily' },
  { path: '/anmeldung-hamburg/', title: 'Anmeldung Region Hamburg', prio: 0.7, freq: 'daily' },
  { path: '/anfahrt-muenchen/', title: 'Anfahrt München', prio: 0.5, freq: 'yearly' },
  { path: '/anfahrt-hamburg/', title: 'Anfahrt Region Hamburg', prio: 0.5, freq: 'yearly' },
  { path: '/schweisskurse-lehrgaenge/', title: 'Schweißkurse & Lehrgänge', prio: 0.85, freq: 'weekly' },
  { path: '/aufbaukurse/', title: 'Aufbaukurse mit Prüfung', prio: 0.7, freq: 'weekly' },
  { path: '/lerninhalte/', title: 'Lerninhalte', prio: 0.6, freq: 'monthly' },
  { path: '/schweisskurs-ratgeber/', title: 'Schweißkurs-Ratgeber (Kursfinder)', prio: 0.7, freq: 'monthly' },
  { path: '/gutschein-bestellen/', title: 'Gutschein bestellen', prio: 0.7, freq: 'monthly' },
  { path: '/faq/', title: 'FAQ', prio: 0.7, freq: 'monthly' },
  { path: '/kontakt/', title: 'Kontakt', prio: 0.6, freq: 'yearly' },
  { path: '/wir-ueber-uns/', title: 'Wir über uns', prio: 0.5, freq: 'yearly' },
  { path: '/referenzen/', title: 'Kundenstimmen', prio: 0.5, freq: 'monthly' },
  { path: '/galerie/', title: 'Galerie', prio: 0.4, freq: 'yearly' },
  { path: '/lehrbuch/', title: 'Merkle Videothek', prio: 0.5, freq: 'monthly' },
  { path: '/ratgeber/glossar-2/', title: 'Glossar', prio: 0.6, freq: 'monthly' },
  { path: '/vertrag-widerrufen/', title: 'Vertrag widerrufen', prio: 0.2, freq: 'yearly' },
  { path: '/impressum/', title: 'Impressum', prio: 0.1, freq: 'yearly' },
  { path: '/datenschutz/', title: 'Datenschutz', prio: 0.1, freq: 'yearly' },
  { path: '/agb/', title: 'AGB', prio: 0.2, freq: 'yearly' },
  { path: '/widerruf/', title: 'Widerrufsbelehrung', prio: 0.2, freq: 'yearly' }
];

export function allPages() {
  return [
    ...STATIC_PAGES,
    ...KURSE.map((k) => ({ path: `/${k.slug}/`, title: k.name, prio: 0.9, freq: 'daily' as const })),
    ...RATGEBER.map((r) => ({ path: r.path, title: r.h1, prio: r.path === '/ratgeber/' ? 0.8 : 0.6, freq: 'monthly' as const })),
    ...GLOSSAR.map((g) => ({ path: `/glossary/${g.slug}/`, title: g.name, prio: 0.3, freq: 'yearly' as const }))
  ];
}
