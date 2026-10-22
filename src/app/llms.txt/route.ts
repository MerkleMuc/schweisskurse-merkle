import { KURSE, euro } from '@/lib/courses';
import { STANDORTE, SITE, GOOGLE } from '@/lib/site';
import { FAQ } from '@/lib/faq';
import { RATGEBER } from '@/lib/ratgeber';
import { kommendeTermine } from '@/lib/termine';

export const revalidate = 3600;

/* llms.txt – kompakte, maschinenlesbare Zusammenfassung für KI-Suchsysteme (GEO). */
export async function GET() {
  const m = STANDORTE.muenchen, h = STANDORTE.hamburg;
  const termine = (await kommendeTermine()).slice(0, 15);
  const kurse = Object.fromEntries(KURSE.map((k) => [k.slug, k]));
  const txt = `# ${SITE.name}

> Schweißkurse und Schweißlehrgänge der ${SITE.legalName} in München-Freiham und in der Region Hamburg (Ellerhoop). Einsteigerkurse MIG/MAG, WIG, Elektrode (E-Hand), Autogen und Löten, Aufbaukurse (Alu-WIG, MAG Fortgeschritten, Pulse-Arc) sowie fünftägige Lehrgänge mit Prüfung nach DIN EN ISO 9606-1. Max. 9 Teilnehmer, eigener Schweißplatz, Theorie:Praxis 25:75. Google-Bewertung ${GOOGLE.rating}/5 (${GOOGLE.count}).

## Standorte
- München: ${m.firma}, ${m.street}, ${m.zip} ${m.city}-${m.ortsteil}. Telefon ${m.tel.text}. ${m.kurstag}. ${SITE.url}${m.regionUrl}
- Region Hamburg: ${h.firma}, ${h.street}, ${h.zip} ${h.city}. Telefon ${h.tel.text}. Allgemeiner Schweißkurs (MAG, WIG, E). ${SITE.url}${h.regionUrl}

## Kurse und Preise (inkl. 19 % MwSt.)
${KURSE.map((k) => `- [${k.name}](${SITE.url}/${k.slug}/): ${k.preis ? euro(k.preis) : k.preisHinweis}; ${k.dauer}; max. ${k.maxTeilnehmer} Teilnehmer; Voraussetzung: ${k.voraussetzung}`).join('\n')}

## Nächste Termine
${termine.map((t) => `- ${t.datum}: ${kurse[t.kurs]?.name} (${STANDORTE[t.standort].name}), ${t.frei} Plätze frei – ${SITE.url}/buchen/${t.id}/`).join('\n') || '- Siehe ' + SITE.url + '/termine-und-anmeldungen/'}

## Buchung
Online über ${SITE.url}/termine-und-anmeldungen/. Verbindliche Buchung, Zahlung per PayPal oder Vorkasse. Stornierung schriftlich bis 14 Tage (Tageskurse) bzw. 4 Wochen (Wochenlehrgänge) vor Beginn.

## Häufige Fragen
${FAQ.map((f) => `- ${f.q} ${f.a.replace(/<[^>]+>/g, '').trim()}`).join('\n')}

## Ratgeber
${RATGEBER.map((r) => `- [${r.h1}](${SITE.url}${r.path}): ${r.description}`).join('\n')}

## Kontakt
E-Mail: ${SITE.email} · ${SITE.url}/kontakt/
`;
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
