import { SITE, STANDORTE, GOOGLE, absUrl, type Standort } from './site';
import type { Kurs } from './courses';

/* schema.org-Bausteine. Sie werden auf jeder Seite als JSON-LD ausgegeben
   und sind die wichtigste Quelle für Suchmaschinen und KI-Antwortsysteme (GEO). */

const ORG_ID = `${SITE.url}/#organization`;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url + '/',
    logo: absUrl('/images/logos/merkle-logo.png'),
    email: SITE.email,
    telephone: STANDORTE.muenchen.tel.text.replace(/\s/g, ''),
    parentOrganization: { '@type': 'Organization', name: SITE.legalName, url: SITE.mutter },
    sameAs: [SITE.mutter, SITE.shop, SITE.youtube],
    address: { '@type': 'PostalAddress', streetAddress: STANDORTE.muenchen.street, postalCode: STANDORTE.muenchen.zip, addressLocality: STANDORTE.muenchen.city, addressCountry: 'DE' },
    areaServed: ['München', 'Bayern', 'Hamburg', 'Schleswig-Holstein', 'Deutschland'],
    knowsAbout: ['MIG/MAG-Schweißen', 'WIG-Schweißen', 'Elektrodenschweißen', 'Autogenschweißen', 'Aluminiumschweißen', 'Schweißerprüfung DIN EN ISO 9606-1', 'Schutzgase']
  };
}

export function websiteLd() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url + '/', name: SITE.name, inLanguage: 'de-DE', publisher: { '@id': ORG_ID } };
}

export function placeLd(s: Standort) {
  return {
    '@type': 'Place',
    name: `${s.firma}, ${s.city}`,
    address: { '@type': 'PostalAddress', streetAddress: s.street, postalCode: s.zip, addressLocality: s.city, addressCountry: 'DE' },
    geo: { '@type': 'GeoCoordinates', latitude: s.geo.lat, longitude: s.geo.lon }
  };
}

export function localBusinessLd(s: Standort) {
  const days: Record<string, string> = { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' };
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': `${absUrl(s.regionUrl)}#standort`,
    name: `Merkle Schweißkurse ${s.name}`,
    parentOrganization: { '@id': ORG_ID },
    url: absUrl(s.regionUrl),
    telephone: s.tel.text.replace(/\s/g, ''),
    email: s.mail,
    image: absUrl(s.id === 'muenchen' ? '/images/filiale/muenchen-gebaeude.jpg' : '/images/kurse/funkenflug-tuerkis.jpg'),
    priceRange: s.id === 'muenchen' ? '415 € – 2.075 €' : '357 €',
    address: placeLd(s).address,
    geo: placeLd(s).geo,
    hasMap: s.maps,
    areaServed: s.einzugsgebiet.map((n) => ({ '@type': 'City', name: n })),
    ...(s.hours.length ? { openingHoursSpecification: s.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days.map((d) => days[d]), opens: h.open, closes: h.close })) } : {}),
    ...(s.id === 'muenchen' ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: GOOGLE.ratingNum, reviewCount: GOOGLE.count, bestRating: 5 } } : {})
  };
}

export interface TerminLite { id: string; datum: string; datum_bis: string | null; start_zeit: string; end_zeit: string; preis_cent: number; frei: number; standort: 'muenchen' | 'hamburg' }

export function courseLd(k: Kurs, termine: TerminLite[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${absUrl('/' + k.slug + '/')}#kurs`,
    name: k.name,
    description: k.metaDescription,
    url: absUrl('/' + k.slug + '/'),
    provider: { '@id': ORG_ID },
    inLanguage: 'de',
    educationalLevel: k.level,
    coursePrerequisites: k.voraussetzung,
    teaches: k.inhalte,
    timeRequired: k.tage === 1 ? 'PT8H' : `P${k.tage}D`,
    image: absUrl(k.bild),
    ...(k.preis ? { offers: { '@type': 'Offer', category: 'Paid', price: k.preis, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: absUrl('/' + k.slug + '/') } } : {}),
    hasCourseInstance: termine.length
      ? termine.map((t) => courseInstance(k, t))
      : k.standorte.map((s) => ({ '@type': 'CourseInstance', courseMode: 'Onsite', location: placeLd(STANDORTE[s]), courseWorkload: k.tage === 1 ? 'PT8H' : `P${k.tage}D` }))
  };
}

export function courseInstance(k: Kurs, t: TerminLite) {
  return {
    '@type': 'CourseInstance',
    courseMode: 'Onsite',
    startDate: `${t.datum}T${t.start_zeit}`,
    endDate: `${t.datum_bis || t.datum}T${t.end_zeit}`,
    location: placeLd(STANDORTE[t.standort]),
    courseSchedule: { '@type': 'Schedule', startDate: t.datum, endDate: t.datum_bis || t.datum, repeatFrequency: k.tage > 1 ? 'P1D' : undefined, duration: k.tage === 1 ? 'PT8H' : 'PT8H', repeatCount: k.tage },
    offers: { '@type': 'Offer', price: t.preis_cent / 100, priceCurrency: 'EUR', availability: t.frei > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut', url: absUrl(`/buchen/${t.id}/`), validFrom: new Date().toISOString().slice(0, 10) }
  };
}

export function eventLd(k: Kurs, t: TerminLite) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: `${k.name} – ${STANDORTE[t.standort].name}`,
    startDate: `${t.datum}T${t.start_zeit}:00${berlinOffset(t.datum)}`,
    endDate: `${t.datum_bis || t.datum}T${t.end_zeit}:00${berlinOffset(t.datum_bis || t.datum)}`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: placeLd(STANDORTE[t.standort]),
    image: absUrl(k.bild),
    description: k.lead,
    organizer: { '@id': ORG_ID, name: SITE.name, url: SITE.url },
    offers: { '@type': 'Offer', price: t.preis_cent / 100, priceCurrency: 'EUR', availability: t.frei > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut', url: absUrl(`/buchen/${t.id}/`), validFrom: new Date().toISOString().slice(0, 10) },
    remainingAttendeeCapacity: t.frei
  };
}

/** Zeitzonen-Versatz Europe/Berlin für ein Datum (+01:00 bzw. +02:00 in der Sommerzeit). */
export function berlinOffset(datum: string) {
  const d = new Date(`${datum}T12:00:00Z`);
  const name = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Berlin', timeZoneName: 'shortOffset' }).formatToParts(d).find((p) => p.type === 'timeZoneName')?.value || 'GMT+1';
  const h = Number(name.replace('GMT', '')) || 1;
  return `+0${h}:00`;
}

export function breadcrumbLd(trail: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: absUrl(c.href) }))
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } }))
  };
}

export function articleLd(a: { title: string; description: string; path: string; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    mainEntityOfPage: absUrl(a.path),
    image: absUrl(a.image || '/images/kurse/funkenflug-tuerkis.jpg'),
    author: { '@id': ORG_ID, '@type': 'Organization', name: SITE.name },
    publisher: { '@id': ORG_ID, '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: absUrl('/images/logos/merkle-logo.png') } },
    inLanguage: 'de-DE'
  };
}

export function definedTermLd(t: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.name,
    description: t.description,
    url: absUrl(t.path),
    inDefinedTermSet: absUrl('/ratgeber/glossar-2/')
  };
}

export function videoLd(v: { id: string; title: string; text: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.text,
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`
  };
}
