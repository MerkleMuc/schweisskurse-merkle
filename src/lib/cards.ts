import 'server-only';
import { KURSE, type Kurs } from './courses';
import { kommendeTermine } from './termine';
import { naechsteJeKurs } from './view';
import type { KursCard } from '@/components/CourseFilter';

export function kursCards(filter?: (k: Kurs) => boolean): KursCard[] {
  const termine = kommendeTermine();
  const naechste = naechsteJeKurs(termine);
  return KURSE.filter(filter || (() => true)).map((k) => ({
    slug: k.slug, name: k.name, kurz: k.kurz, verfahren: k.verfahren, verfahrenLabel: k.verfahrenLabel, level: k.level, standorte: k.standorte,
    preis: k.preis, preisHinweis: k.preisHinweis, dauer: k.dauer, tage: k.tage, maxTeilnehmer: k.maxTeilnehmer, bild: k.bild, bildAlt: k.bildAlt, lead: k.lead,
    naechster: naechste[k.slug], freieTermine: termine.filter((t) => t.kurs === k.slug && t.frei > 0).length
  }));
}
