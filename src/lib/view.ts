import 'server-only';
import { KURSE } from './courses';
import type { Termin } from './termine';
import type { KursMini, TerminView } from '@/components/TerminExplorer';

export function toView(t: Termin): TerminView {
  return {
    id: t.id, standort: t.standort, kurs: t.kurs, datum: t.datum, datum_bis: t.datum_bis, start_zeit: t.start_zeit, end_zeit: t.end_zeit,
    plaetze_gesamt: t.plaetze_gesamt, frei: t.frei, preis_cent: t.preis_cent, hinweis: t.hinweis, dozent: t.dozent
  };
}

export const KURSE_MINI: KursMini[] = KURSE.map((k) => ({ slug: k.slug, name: k.name, kurz: k.kurz, verfahren: k.verfahren, verfahrenLabel: k.verfahrenLabel, level: k.level }));

export function formatDatum(datum: string, opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Date(datum + 'T12:00:00').toLocaleDateString('de-DE', opts);
}

/** Nächster freier Termin je Kurs als kurzer Text, z. B. „Sa 24.10.“ */
export function naechsteJeKurs(termine: { kurs: string; datum: string; frei: number }[]) {
  const out: Record<string, string> = {};
  for (const t of termine) {
    if (t.frei < 1 || out[t.kurs]) continue;
    out[t.kurs] = formatDatum(t.datum, { weekday: 'short', day: '2-digit', month: '2-digit' });
  }
  return out;
}
