/*
 * Stammdaten. Alles hier stammt aus dem Bestand von schweisskurse-merkle.de
 * bzw. merkle-muenchen.de. Nicht belegte Werte werden nicht geraten, sondern
 * leer gelassen und auf der Seite weggelassen.
 */

export const SITE = {
  name: 'Merkle Schweißkurse',
  legalName: 'Wilhelm Merkle Schweißtechnik GmbH',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.schweisskurse-merkle.de').replace(/\/$/, ''),
  email: 'info@schweisskurse-merkle.de',
  locale: 'de_DE',
  shop: 'https://www.merkle-shop.de/',
  mutter: 'https://www.merkle-muenchen.de/',
  gutscheinShop: 'https://www.merkle-shop.de/schweisskurs-gutschein.html',
  youtube: 'https://www.youtube.com/user/MerkleMuenchen',
  whatsapp: 'https://api.whatsapp.com/send/?phone=49898977170&text=Ich+habe+eine+Frage+zu+den+Schwei%C3%9Fkursen&type=phone_number&app_absent=0',
  gruendung: '1970',
  impressum: {
    street: 'Anton-Böck-Str. 31',
    zip: '81249',
    city: 'München',
    tel: '+49 89 897717-0',
    mail: 'info@merkle-muenchen.de',
    geschaeftsfuehrer: 'Siegfried Awissus',
    registergericht: 'München',
    hrb: 'HRB 61 102',
    ustid: 'DE129494432'
  }
} as const;

export type Tel = { text: string; href: string };

export const TEL = {
  kurse: { text: '+49 89 897717-28', href: 'tel:+498989771728' },
  zentrale: { text: '+49 89 897717-0', href: 'tel:+498989771700' },
  hamburg: { text: '+49 4120 3079981', href: 'tel:+4941203079981' },
  hamburgDozent: { text: '+49 160 4530356', href: 'tel:+491604530356' }
} satisfies Record<string, Tel>;

/* Google-Unternehmensprofil der Münchner Filiale (Stand Okt. 2026,
   übernommen aus dem Relaunch merkle-muenchen.de). */
export const GOOGLE = {
  rating: '4,8',
  ratingNum: 4.8,
  count: 78,
  placeId: 'ChIJX68Zh8HXnUcRppq3vUDfgVs',
  url: 'https://search.google.com/local/reviews?placeid=ChIJX68Zh8HXnUcRppq3vUDfgVs',
  writeUrl: 'https://search.google.com/local/writereview?placeid=ChIJX68Zh8HXnUcRppq3vUDfgVs'
};

export type StandortId = 'muenchen' | 'hamburg';

export interface Hours { d: string; t: string; days: string[]; open: string; close: string }

export interface Standort {
  id: StandortId;
  name: string;
  claim: string;
  firma: string;
  street: string;
  zip: string;
  city: string;
  ortsteil: string;
  tel: Tel;
  mail: string;
  geo: { lat: number; lon: number };
  maps: string;
  regionUrl: string;
  anmeldungUrl: string;
  anfahrtUrl: string;
  kurstag: string;
  hours: Hours[];
  vorteile: { title: string; text: string; icon: string }[];
  anfahrt: { title: string; text: string }[];
  einzugsgebiet: string[];
  dozenten: string[];
}

export const STANDORTE: Record<StandortId, Standort> = {
  muenchen: {
    id: 'muenchen',
    name: 'München',
    claim: 'Das Kurszentrum im Münchner Westen',
    firma: 'Wilhelm Merkle Schweißtechnik GmbH',
    street: 'Anton-Böck-Straße 31',
    zip: '81249',
    city: 'München',
    ortsteil: 'Freiham',
    tel: TEL.kurse,
    mail: 'info@schweisskurse-merkle.de',
    /* Koordinaten über OpenStreetMap zur Adresse ermittelt (16.10.2026). */
    geo: { lat: 48.136052, lon: 11.413829 },
    maps: 'https://www.google.com/maps/dir/?api=1&destination=Anton-B%C3%B6ck-Stra%C3%9Fe+31%2C+81249+M%C3%BCnchen',
    regionUrl: '/region-muenchen/',
    anmeldungUrl: '/anmeldung-muenchen/',
    anfahrtUrl: '/anfahrt-muenchen/',
    kurstag: 'Standardmäßig jeden Samstag, Wochenlehrgänge Montag bis Freitag',
    hours: [
      { d: 'Montag bis Freitag', t: '6:30–18:00 Uhr', days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], open: '06:30', close: '18:00' },
      { d: 'Samstag', t: '8:00–12:00 Uhr', days: ['Sa'], open: '08:00', close: '12:00' }
    ],
    vorteile: [
      { icon: 'layers', title: 'Alle Verfahren, eigene Kurse', text: 'MIG/MAG, WIG, Elektrode, Autogen, Löten und Alu-WIG – in München gibt es für jedes Verfahren einen eigenen Kurs statt eines Mischkurses.' },
      { icon: 'shield', title: 'Prüfung nach DIN EN ISO 9606-1', text: 'Nur in München: fünftägige Lehrgänge mit zertifizierter Schweißerprüfung und Schweißerpass.' },
      { icon: 'factory', title: 'Mitten im Fachhandel', text: 'Der Kursraum liegt im Betriebsgebäude von Merkle Schweißtechnik – mit Ladengeschäft, Werkstatt und Gaslager unter einem Dach.' },
      { icon: 'route', title: 'Schnell erreichbar', text: 'Über die Lindauer Autobahn A 96 und die A 99 in kürzester Zeit erreichbar, Parkplätze direkt am Haus.' },
      { icon: 'euro', title: '25 % auf Ihr Schweißgerät', text: 'Wer nach dem Kurs in München eine Anlage ab 1.250 € kauft, erhält 25 % des Kurspreises zurück (ausgenommen Lehrgänge mit TÜV-Prüfung).' },
      { icon: 'user', title: 'Eigener Schweißplatz', text: 'Jede Teilnehmerin und jeder Teilnehmer schweißt an einem eigenen, voll ausgestatteten Platz.' }
    ],
    anfahrt: [
      { title: 'Mit dem Auto', text: 'Über die Lindauer Autobahn A 96 und die A 99 sind Sie in kürzester Zeit bei uns. Die genaue Route zeigt der Routenplaner. Parkplätze direkt vor dem Gebäude.' },
      { title: 'Mit S-Bahn und Bus', text: 'Mit der S-Bahn bis Freiham, von dort weiter zu Fuß oder mit dem Bus in das Gewerbegebiet an der Anton-Böck-Straße.' },
      { title: 'Ankunft am Kurstag', text: 'Bitte seien Sie zehn Minuten vor Kursbeginn am Haupteingang. Wir holen Sie dort ab und bringen Sie in den Kursraum.' }
    ],
    einzugsgebiet: ['München', 'Germering', 'Puchheim', 'Fürstenfeldbruck', 'Starnberg', 'Dachau', 'Augsburg', 'Landsberg am Lech', 'Freising', 'Erding', 'Rosenheim', 'Landshut'],
    dozenten: ['Michael Jäger', 'Robin Kovacs', 'Michael Felber']
  },
  hamburg: {
    id: 'hamburg',
    name: 'Region Hamburg',
    claim: 'Schweißen lernen im Norden – in Ellerhoop',
    firma: 'MERKLE NORD – Merkle Schweißtechnik GmbH',
    street: 'Oha 5',
    zip: '25373',
    city: 'Ellerhoop',
    ortsteil: 'bei Hamburg',
    tel: TEL.hamburg,
    mail: 'info@schweisskurse-merkle.de',
    /* Ortsmitte Ellerhoop – exakte Hauskoordinate vor Livegang prüfen. */
    geo: { lat: 53.7105, lon: 9.7697 },
    maps: 'https://www.google.com/maps/dir/?api=1&destination=Oha+5%2C+25373+Ellerhoop',
    regionUrl: '/region-hamburg/',
    anmeldungUrl: '/anmeldung-hamburg/',
    anfahrtUrl: '/anfahrt-hamburg/',
    kurstag: 'Samstags, einzelne Termine auch unter der Woche',
    hours: [],
    vorteile: [
      { icon: 'layers', title: 'Drei Verfahren an einem Tag', text: 'Der allgemeine Schweißkurs verbindet MAG, WIG und Elektrode – ideal, um herauszufinden, welches Verfahren zu Ihnen passt.' },
      { icon: 'euro', title: 'Fairer Kurspreis', text: '357 € inklusive 19 % MwSt. für einen ganzen Praxistag.' },
      { icon: 'user', title: 'Kleine Gruppe, ein Dozent', text: 'Bernd Koliwer begleitet jede Gruppe persönlich – vom ersten Zünden bis zur sauberen Naht.' },
      { icon: 'route', title: 'Gut erreichbar aus Hamburg', text: 'Ellerhoop liegt im Kreis Pinneberg nordwestlich von Hamburg, gut erreichbar über die A 23.' }
    ],
    anfahrt: [
      { title: 'Mit dem Auto', text: 'Über die A 23 in Richtung Heide, dann über Tornesch nach Ellerhoop. Parkplätze vor Ort.' },
      { title: 'Mit Bahn und Bus', text: 'Bis Bahnhof Tornesch oder Elmshorn, von dort mit dem Bus Richtung Ellerhoop.' },
      { title: 'Ankunft am Kurstag', text: 'Bitte seien Sie zehn Minuten vor Kursbeginn vor Ort. Bei Fragen erreichen Sie den Dozenten direkt.' }
    ],
    einzugsgebiet: ['Hamburg', 'Pinneberg', 'Elmshorn', 'Tornesch', 'Quickborn', 'Norderstedt', 'Itzehoe', 'Bad Segeberg', 'Wedel', 'Lübeck', 'Kiel'],
    dozenten: ['Bernd Koliwer']
  }
};

/* Ansprechpersonen der schwebenden Kontaktkarte (rechts unten).
   Portrait der zweiten Person liegt noch nicht vor – es wird ein
   Monogramm gezeigt, bis /public/images/team/<slug>.jpg existiert. */
export const KURS_TEAM = [
  { standort: 'muenchen' as StandortId, ort: 'München-Freiham', name: 'Vanessa Mendes', rolle: 'Kursberatung & Anmeldung München', foto: '/images/team/vanessa-mendes.jpg', tel: TEL.kurse, mail: 'info@schweisskurse-merkle.de', zeiten: 'Mo–Fr erreichbar' },
  { standort: 'hamburg' as StandortId, ort: 'Ellerhoop bei Hamburg', name: 'Bernd Koliwer', rolle: 'Dozent & Anmeldung Region Hamburg', foto: null as string | null, tel: TEL.hamburgDozent, mail: 'info@schweisskurse-merkle.de', zeiten: 'Anmeldung auch telefonisch' }
];

/* Namen aus dem Bestand. Kurzbiografien und Portraits liefert das Team nach. */
export const DOZENTEN = [
  { name: 'Michael Jäger', standort: 'muenchen' as StandortId, rolle: 'Dozent Schweißkurse München' },
  { name: 'Robin Kovacs', standort: 'muenchen' as StandortId, rolle: 'Dozent Schweißkurse München' },
  { name: 'Michael Felber', standort: 'muenchen' as StandortId, rolle: 'Dozent Schweißkurse München' },
  { name: 'Bernd Koliwer', standort: 'hamburg' as StandortId, rolle: 'Dozent Schweißkurse Region Hamburg' }
];

export const VIDEOS = [
  { id: 'Z-NRvJHSq8w', title: 'Schweißkurs für Einsteiger bei Merkle Schweißtechnik', text: 'So läuft ein Einsteiger-Schweißkurs bei Merkle ab – vom Theorieblock bis zur eigenen Naht.' },
  { id: 'onZ8zQtn8hU', title: 'Merkle Schweißtechnik München stellt sich vor', text: 'Ein Blick in Fachhandel, Werkstatt und Kursbereich in München-Freiham.' },
  { id: 'VW4gpunAh5I', title: 'Wilhelm Merkle Schweißtechnik GmbH in München', text: 'Das Unternehmen hinter den Schweißkursen: seit über 50 Jahren Fachhandel für Schweiß- und Schneidtechnik.' }
];

export function absUrl(path: string) {
  return SITE.url + path;
}
