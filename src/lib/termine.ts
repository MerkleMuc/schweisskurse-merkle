import 'server-only';
import crypto from 'node:crypto';
import { db, tx } from './db';
import { KURS_BY_SLUG } from './courses';
import type { StandortId } from './site';

export interface Termin {
  id: string;
  standort: StandortId;
  kurs: string;
  datum: string;       // YYYY-MM-DD
  datum_bis: string | null;
  start_zeit: string;
  end_zeit: string;
  plaetze_gesamt: number;
  plaetze_extern: number;
  preis_cent: number;
  dozent: string | null;
  hinweis: string | null;
  status: 'aktiv' | 'abgesagt' | 'entwurf';
  gebucht: number;     // Online-Buchungen (neu + bezahlt)
  frei: number;
  updated_at: string;
}

const BASE_SELECT = `
  SELECT t.*,
    COALESCE((SELECT SUM(b.anzahl) FROM buchungen b WHERE b.termin_id = t.id AND b.status IN ('neu','bezahlt')), 0) AS gebucht
  FROM termine t`;

function hydrate(row: Record<string, unknown>): Termin {
  const r = row as unknown as Termin;
  const gebucht = Number(r.gebucht || 0);
  return { ...r, gebucht, frei: Math.max(0, Number(r.plaetze_gesamt) - Number(r.plaetze_extern) - gebucht) };
}

export function heute(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' });
}

export function listTermine(opts: { standort?: StandortId; kurs?: string; ab?: string; bis?: string; nurAktiv?: boolean } = {}): Termin[] {
  ensureSeed();
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (opts.standort) { where.push('t.standort = ?'); params.push(opts.standort); }
  if (opts.kurs) { where.push('t.kurs = ?'); params.push(opts.kurs); }
  if (opts.ab) { where.push('COALESCE(t.datum_bis, t.datum) >= ?'); params.push(opts.ab); }
  if (opts.bis) { where.push('t.datum <= ?'); params.push(opts.bis); }
  if (opts.nurAktiv !== false) where.push("t.status = 'aktiv'");
  const sql = `${BASE_SELECT} ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY t.datum, t.start_zeit`;
  return db().prepare(sql).all(...params).map((r) => hydrate(r as Record<string, unknown>));
}

/** Kommende, öffentlich sichtbare Termine. */
export function kommendeTermine(opts: { standort?: StandortId; kurs?: string } = {}) {
  return listTermine({ ...opts, ab: heute(), nurAktiv: true });
}

export function getTermin(id: string): Termin | null {
  ensureSeed();
  const r = db().prepare(`${BASE_SELECT} WHERE t.id = ?`).get(id);
  return r ? hydrate(r as Record<string, unknown>) : null;
}

export interface TerminInput {
  standort: StandortId;
  kurs: string;
  datum: string;
  datum_bis?: string | null;
  start_zeit: string;
  end_zeit: string;
  plaetze_gesamt: number;
  plaetze_extern: number;
  preis_cent: number;
  dozent?: string | null;
  hinweis?: string | null;
  status: Termin['status'];
}

export function createTermin(input: TerminInput): string {
  const id = crypto.randomBytes(6).toString('hex');
  db().prepare(`INSERT INTO termine (id, standort, kurs, datum, datum_bis, start_zeit, end_zeit, plaetze_gesamt, plaetze_extern, preis_cent, dozent, hinweis, status)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(id, input.standort, input.kurs, input.datum, input.datum_bis || null, input.start_zeit, input.end_zeit,
      input.plaetze_gesamt, input.plaetze_extern, input.preis_cent, input.dozent || null, input.hinweis || null, input.status);
  return id;
}

export function updateTermin(id: string, standort: StandortId, input: Partial<TerminInput>) {
  const fields = Object.entries(input).filter(([k, v]) => v !== undefined && k !== 'standort');
  if (!fields.length) return;
  const set = fields.map(([k]) => `${k} = ?`).join(', ');
  db().prepare(`UPDATE termine SET ${set}, updated_at = datetime('now') WHERE id = ? AND standort = ?`)
    .run(...fields.map(([, v]) => (v as string | number | null)), id, standort);
}

export function deleteTermin(id: string, standort: StandortId) {
  const n = db().prepare('SELECT COUNT(*) AS n FROM buchungen WHERE termin_id = ?').get(id) as { n: number };
  if (n.n > 0) {
    // Termine mit Buchungen werden nicht gelöscht, sondern abgesagt – die Buchungen bleiben nachvollziehbar.
    updateTermin(id, standort, { status: 'abgesagt' });
    return 'abgesagt' as const;
  }
  db().prepare('DELETE FROM termine WHERE id = ? AND standort = ?').run(id, standort);
  return 'geloescht' as const;
}

/* ------------------------------------------------------------- Buchungen */

export interface Person { anrede?: string; vorname: string; nachname: string; geburtsdatum?: string; erfahrung?: string }
export interface Rechnung {
  firma?: string; ustid?: string; anrede?: string; vorname: string; nachname: string;
  strasse: string; plz: string; ort: string; land: string;
}
export interface Consents {
  agb: string; datenschutz: string; widerrufsbelehrung: string; vorzeitigerBeginn: string | null; zahlungspflichtig: string;
  textVersion: string;
}

export interface BuchungInput {
  terminId: string;
  anzahl: number;
  kundentyp: 'privat' | 'firma';
  email: string;
  telefon: string;
  rechnung: Rechnung;
  teilnehmer: Person[];
  zahlungsart: 'paypal' | 'vorkasse';
  bemerkung?: string;
  consents: Consents;
}

export interface Buchung {
  id: number; ref: string; termin_id: string; anzahl: number; kundentyp: 'privat' | 'firma'; email: string; telefon: string | null;
  rechnung: Rechnung; teilnehmer: Person[]; zahlungsart: 'paypal' | 'vorkasse'; betrag_cent: number; bemerkung: string | null;
  consents: Consents; status: 'neu' | 'bezahlt' | 'storniert' | 'widerrufen'; created_at: string;
}

export class BuchungsFehler extends Error {}

function neueRef(standort: StandortId) {
  const jahr = new Date().getFullYear();
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `SK-${standort === 'muenchen' ? 'M' : 'H'}${jahr}-${code}`;
}

export function createBuchung(input: BuchungInput): { ref: string; betragCent: number; termin: Termin } {
  return tx((d) => {
    const raw = d.prepare(`${BASE_SELECT} WHERE t.id = ?`).get(input.terminId);
    if (!raw) throw new BuchungsFehler('Der Termin existiert nicht mehr.');
    const termin = hydrate(raw as Record<string, unknown>);
    if (termin.status !== 'aktiv') throw new BuchungsFehler('Dieser Termin ist nicht mehr buchbar.');
    if (termin.datum < heute()) throw new BuchungsFehler('Dieser Termin liegt in der Vergangenheit.');
    if (input.anzahl < 1 || input.anzahl > termin.frei) {
      throw new BuchungsFehler(termin.frei === 0 ? 'Der Termin ist inzwischen ausgebucht.' : `Für diesen Termin sind nur noch ${termin.frei} Plätze frei.`);
    }
    const ref = neueRef(termin.standort);
    const betragCent = termin.preis_cent * input.anzahl;
    d.prepare(`INSERT INTO buchungen (ref, termin_id, anzahl, kundentyp, email, telefon, rechnung, teilnehmer, zahlungsart, betrag_cent, bemerkung, consents)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).run(ref, termin.id, input.anzahl, input.kundentyp, input.email, input.telefon || null,
        JSON.stringify(input.rechnung), JSON.stringify(input.teilnehmer), input.zahlungsart, betragCent, input.bemerkung || null, JSON.stringify(input.consents));
    return { ref, betragCent, termin };
  });
}

function hydrateBuchung(r: Record<string, unknown>): Buchung {
  return {
    ...(r as unknown as Buchung),
    rechnung: JSON.parse(String(r.rechnung)),
    teilnehmer: JSON.parse(String(r.teilnehmer)),
    consents: JSON.parse(String(r.consents))
  };
}

export function getBuchung(ref: string): Buchung | null {
  const r = db().prepare('SELECT * FROM buchungen WHERE ref = ?').get(ref);
  return r ? hydrateBuchung(r as Record<string, unknown>) : null;
}

export function listBuchungen(standort: StandortId, opts: { terminId?: string } = {}) {
  const params: string[] = [standort];
  let sql = `SELECT b.*, t.datum, t.kurs FROM buchungen b JOIN termine t ON t.id = b.termin_id WHERE t.standort = ?`;
  if (opts.terminId) { sql += ' AND b.termin_id = ?'; params.push(opts.terminId); }
  sql += ' ORDER BY b.created_at DESC';
  return db().prepare(sql).all(...params).map((r) => {
    const row = r as Record<string, unknown>;
    return { ...hydrateBuchung(row), datum: String(row.datum), kurs: String(row.kurs) };
  });
}

export function setBuchungStatus(id: number, standort: StandortId, status: Buchung['status']) {
  db().prepare(`UPDATE buchungen SET status = ?, updated_at = datetime('now')
    WHERE id = ? AND termin_id IN (SELECT id FROM termine WHERE standort = ?)`).run(status, id, standort);
}

/* --------------------------------------------------------------- Anfragen */

export function createAnfrage(a: { standort?: string; thema: string; name: string; email: string; telefon?: string; nachricht: string }) {
  db().prepare('INSERT INTO anfragen (standort, thema, name, email, telefon, nachricht) VALUES (?,?,?,?,?,?)')
    .run(a.standort || null, a.thema, a.name, a.email, a.telefon || null, a.nachricht);
}

export function listAnfragen(standort: StandortId) {
  return db().prepare("SELECT * FROM anfragen WHERE standort = ? OR standort IS NULL OR standort = '' ORDER BY created_at DESC LIMIT 200").all(standort) as Array<{
    id: number; standort: string | null; thema: string; name: string; email: string; telefon: string | null; nachricht: string; erledigt: number; created_at: string;
  }>;
}

export function setAnfrageErledigt(id: number, erledigt: boolean) {
  db().prepare('UPDATE anfragen SET erledigt = ? WHERE id = ?').run(erledigt ? 1 : 0, id);
}

export function createWiderruf(w: { ref?: string; name: string; email: string; nachricht?: string }) {
  db().prepare('INSERT INTO widerrufe (ref, name, email, nachricht) VALUES (?,?,?,?)').run(w.ref || null, w.name, w.email, w.nachricht || null);
  if (w.ref) {
    db().prepare("UPDATE buchungen SET status = 'widerrufen', updated_at = datetime('now') WHERE ref = ? AND lower(email) = lower(?) AND status = 'neu'").run(w.ref, w.email);
  }
}

export function listWiderrufe() {
  return db().prepare('SELECT * FROM widerrufe ORDER BY created_at DESC LIMIT 200').all() as Array<{ id: number; ref: string | null; name: string; email: string; nachricht: string | null; created_at: string }>;
}

/* ------------------------------------------------------------------ Seed */

/*
 * Erstbefüllung mit den zuletzt auf schweisskurse-merkle.de veröffentlichten
 * Münchner Terminen (freie Plätze laut Terminseite). Läuft nur, solange die
 * Tabelle leer ist. Hamburger Termine legt das Team im Backend an.
 */
let seeded = false;
function ensureSeed() {
  if (seeded) return;
  seeded = true;
  if (process.env.SEED_TERMINE === 'false') return;
  const n = db().prepare('SELECT COUNT(*) AS n FROM termine').get() as { n: number };
  if (n.n > 0) return;
  const seed: Array<[string, string, number, number, string?]> = [
    ['mig-mag-einsteiger-schweisskurs', '2026-10-24', 9, 2],
    ['wig-einsteiger-schweisskurs', '2026-10-31', 9, 4],
    ['mig-mag-einsteiger-schweisskurs', '2026-11-14', 9, 2],
    ['wig-einsteiger-schweisskurs', '2026-11-20', 9, 2, 'Termin an einem Freitag'],
    ['wig-alu-aufbau-schweisskurs', '2026-11-21', 9, 0, 'Aufbaukurs – Voraussetzung ist ein WIG-Einsteigerkurs'],
    ['gasschweissen-flammloeten-kurs', '2026-11-28', 9, 1]
  ];
  for (const [kurs, datum, gesamt, extern, hinweis] of seed) {
    const k = KURS_BY_SLUG[kurs];
    createTermin({ standort: 'muenchen', kurs, datum, start_zeit: '08:00', end_zeit: '16:00', plaetze_gesamt: gesamt, plaetze_extern: extern, preis_cent: (k.preis || 0) * 100, hinweis: hinweis || null, status: 'aktiv' });
  }
}
