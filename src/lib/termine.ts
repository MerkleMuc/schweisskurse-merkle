import 'server-only';
import crypto from 'node:crypto';
import { query, tx, SQL_NOW, type Query } from './db';
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
    COALESCE((SELECT SUM(b.anzahl) FROM buchungen b WHERE b.termin_id = t.id AND b.status IN ('neu','bezahlt')), 0)::int AS gebucht
  FROM termine t`;

function hydrate(row: Record<string, unknown>): Termin {
  const r = row as unknown as Termin;
  const gebucht = Number(r.gebucht || 0);
  return { ...r, plaetze_gesamt: Number(r.plaetze_gesamt), plaetze_extern: Number(r.plaetze_extern), preis_cent: Number(r.preis_cent), gebucht, frei: Math.max(0, Number(r.plaetze_gesamt) - Number(r.plaetze_extern) - gebucht) };
}

export function heute(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' });
}

export async function listTermine(opts: { standort?: StandortId; kurs?: string; ab?: string; bis?: string; nurAktiv?: boolean } = {}): Promise<Termin[]> {
  await ensureSeed();
  const where: string[] = [];
  const params: (string | number)[] = [];
  const p = (v: string | number) => { params.push(v); return `$${params.length}`; };
  if (opts.standort) where.push(`t.standort = ${p(opts.standort)}`);
  if (opts.kurs) where.push(`t.kurs = ${p(opts.kurs)}`);
  if (opts.ab) where.push(`COALESCE(t.datum_bis, t.datum) >= ${p(opts.ab)}`);
  if (opts.bis) where.push(`t.datum <= ${p(opts.bis)}`);
  if (opts.nurAktiv !== false) where.push("t.status = 'aktiv'");
  const sql = `${BASE_SELECT} ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY t.datum, t.start_zeit`;
  return (await query(sql, params)).map(hydrate);
}

/** Kommende, öffentlich sichtbare Termine. Fällt bei Datenbankfehlern auf eine leere Liste zurück. */
export async function kommendeTermine(opts: { standort?: StandortId; kurs?: string } = {}) {
  try {
    return await listTermine({ ...opts, ab: heute(), nurAktiv: true });
  } catch (e) {
    console.error('[termine] Datenbank nicht erreichbar', e);
    return [];
  }
}

export async function getTermin(id: string): Promise<Termin | null> {
  await ensureSeed();
  const [r] = await query(`${BASE_SELECT} WHERE t.id = $1`, [id]);
  return r ? hydrate(r) : null;
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

export async function createTermin(input: TerminInput, q: Query = query): Promise<string> {
  const id = crypto.randomBytes(6).toString('hex');
  await q(`INSERT INTO termine (id, standort, kurs, datum, datum_bis, start_zeit, end_zeit, plaetze_gesamt, plaetze_extern, preis_cent, dozent, hinweis, status)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`, [id, input.standort, input.kurs, input.datum, input.datum_bis || null, input.start_zeit, input.end_zeit,
      input.plaetze_gesamt, input.plaetze_extern, input.preis_cent, input.dozent || null, input.hinweis || null, input.status]);
  return id;
}

const SPALTEN = new Set(['kurs', 'datum', 'datum_bis', 'start_zeit', 'end_zeit', 'plaetze_gesamt', 'plaetze_extern', 'preis_cent', 'dozent', 'hinweis', 'status']);

export async function updateTermin(id: string, standort: StandortId, input: Partial<TerminInput>) {
  const fields = Object.entries(input).filter(([k, v]) => v !== undefined && SPALTEN.has(k));
  if (!fields.length) return;
  const set = fields.map(([k], i) => `${k} = $${i + 1}`).join(', ');
  const n = fields.length;
  await query(`UPDATE termine SET ${set}, updated_at = ${SQL_NOW} WHERE id = $${n + 1} AND standort = $${n + 2}`,
    [...fields.map(([, v]) => v as string | number | null), id, standort]);
}

export async function deleteTermin(id: string, standort: StandortId) {
  const [{ n }] = await query<{ n: number }>('SELECT COUNT(*)::int AS n FROM buchungen WHERE termin_id = $1', [id]);
  if (Number(n) > 0) {
    // Termine mit Buchungen werden nicht gelöscht, sondern abgesagt – die Buchungen bleiben nachvollziehbar.
    await updateTermin(id, standort, { status: 'abgesagt' });
    return 'abgesagt' as const;
  }
  await query('DELETE FROM termine WHERE id = $1 AND standort = $2', [id, standort]);
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

/* Platzvergabe in einer Transaktion: Die Terminzeile wird gesperrt (FOR UPDATE),
   damit zwei gleichzeitige Buchungen den letzten Platz nicht doppelt vergeben. */
export async function createBuchung(input: BuchungInput): Promise<{ ref: string; betragCent: number; termin: Termin }> {
  return tx(async (q) => {
    await q('SELECT id FROM termine WHERE id = $1 FOR UPDATE', [input.terminId]);
    const [raw] = await q(`${BASE_SELECT} WHERE t.id = $1`, [input.terminId]);
    if (!raw) throw new BuchungsFehler('Der Termin existiert nicht mehr.');
    const termin = hydrate(raw);
    if (termin.status !== 'aktiv') throw new BuchungsFehler('Dieser Termin ist nicht mehr buchbar.');
    if (termin.datum < heute()) throw new BuchungsFehler('Dieser Termin liegt in der Vergangenheit.');
    if (input.anzahl < 1 || input.anzahl > termin.frei) {
      throw new BuchungsFehler(termin.frei === 0 ? 'Der Termin ist inzwischen ausgebucht.' : `Für diesen Termin sind nur noch ${termin.frei} Plätze frei.`);
    }
    const ref = neueRef(termin.standort);
    const betragCent = termin.preis_cent * input.anzahl;
    await q(`INSERT INTO buchungen (ref, termin_id, anzahl, kundentyp, email, telefon, rechnung, teilnehmer, zahlungsart, betrag_cent, bemerkung, consents)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`, [ref, termin.id, input.anzahl, input.kundentyp, input.email, input.telefon || null,
        JSON.stringify(input.rechnung), JSON.stringify(input.teilnehmer), input.zahlungsart, betragCent, input.bemerkung || null, JSON.stringify(input.consents)]);
    return { ref, betragCent, termin };
  });
}

function hydrateBuchung(r: Record<string, unknown>): Buchung {
  return {
    ...(r as unknown as Buchung),
    id: Number(r.id),
    anzahl: Number(r.anzahl),
    betrag_cent: Number(r.betrag_cent),
    rechnung: JSON.parse(String(r.rechnung)),
    teilnehmer: JSON.parse(String(r.teilnehmer)),
    consents: JSON.parse(String(r.consents))
  };
}

export async function getBuchung(ref: string): Promise<Buchung | null> {
  const [r] = await query('SELECT * FROM buchungen WHERE ref = $1', [ref]);
  return r ? hydrateBuchung(r) : null;
}

export async function listBuchungen(standort: StandortId, opts: { terminId?: string } = {}) {
  const params: string[] = [standort];
  let sql = `SELECT b.*, t.datum, t.kurs FROM buchungen b JOIN termine t ON t.id = b.termin_id WHERE t.standort = $1`;
  if (opts.terminId) { params.push(opts.terminId); sql += ' AND b.termin_id = $2'; }
  sql += ' ORDER BY b.created_at DESC';
  return (await query(sql, params)).map((row) => ({ ...hydrateBuchung(row), datum: String(row.datum), kurs: String(row.kurs) }));
}

export async function setBuchungStatus(id: number, standort: StandortId, status: Buchung['status']) {
  await query(`UPDATE buchungen SET status = $1, updated_at = ${SQL_NOW}
    WHERE id = $2 AND termin_id IN (SELECT id FROM termine WHERE standort = $3)`, [status, id, standort]);
}

/* --------------------------------------------------------------- Anfragen */

export async function createAnfrage(a: { standort?: string; thema: string; name: string; email: string; telefon?: string; nachricht: string }) {
  await query('INSERT INTO anfragen (standort, thema, name, email, telefon, nachricht) VALUES ($1,$2,$3,$4,$5,$6)',
    [a.standort || null, a.thema, a.name, a.email, a.telefon || null, a.nachricht]);
}

export interface Anfrage { id: number; standort: string | null; thema: string; name: string; email: string; telefon: string | null; nachricht: string; erledigt: number; created_at: string }

export async function listAnfragen(standort: StandortId) {
  return query<Anfrage>("SELECT * FROM anfragen WHERE standort = $1 OR standort IS NULL OR standort = '' ORDER BY created_at DESC LIMIT 200", [standort]);
}

export async function setAnfrageErledigt(id: number, erledigt: boolean) {
  await query('UPDATE anfragen SET erledigt = $1 WHERE id = $2', [erledigt ? 1 : 0, id]);
}

export async function createWiderruf(w: { ref?: string; name: string; email: string; nachricht?: string }) {
  await query('INSERT INTO widerrufe (ref, name, email, nachricht) VALUES ($1,$2,$3,$4)', [w.ref || null, w.name, w.email, w.nachricht || null]);
  if (w.ref) {
    await query(`UPDATE buchungen SET status = 'widerrufen', updated_at = ${SQL_NOW} WHERE ref = $1 AND lower(email) = lower($2) AND status = 'neu'`, [w.ref, w.email]);
  }
}

export async function listWiderrufe() {
  return query<{ id: number; ref: string | null; name: string; email: string; nachricht: string | null; created_at: string }>('SELECT * FROM widerrufe ORDER BY created_at DESC LIMIT 200');
}

/* ------------------------------------------------------------------ Seed */

/*
 * Erstbefüllung mit den zuletzt auf schweisskurse-merkle.de veröffentlichten
 * Münchner Terminen (freie Plätze laut Terminseite). Läuft nur, solange die
 * Tabelle leer ist. Hamburger Termine legt das Team im Backend an.
 */
let seeded: Promise<void> | null = null;
function ensureSeed() {
  if (!seeded) seeded = seed().catch((e) => { seeded = null; throw e; });
  return seeded;
}

async function seed() {
  if (process.env.SEED_TERMINE === 'false') return;
  const [{ n }] = await query<{ n: number }>('SELECT COUNT(*)::int AS n FROM termine');
  if (Number(n) > 0) return;
  const daten: Array<[string, string, number, number, string?]> = [
    ['mig-mag-einsteiger-schweisskurs', '2026-10-24', 9, 2],
    ['wig-einsteiger-schweisskurs', '2026-10-31', 9, 4],
    ['mig-mag-einsteiger-schweisskurs', '2026-11-14', 9, 2],
    ['wig-einsteiger-schweisskurs', '2026-11-20', 9, 2, 'Termin an einem Freitag'],
    ['wig-alu-aufbau-schweisskurs', '2026-11-21', 9, 0, 'Aufbaukurs – Voraussetzung ist ein WIG-Einsteigerkurs'],
    ['gasschweissen-flammloeten-kurs', '2026-11-28', 9, 1]
  ];
  await tx(async (q) => {
    const [{ n: m }] = await q<{ n: number }>('SELECT COUNT(*)::int AS n FROM termine');
    if (Number(m) > 0) return;
    for (const [kurs, datum, gesamt, extern, hinweis] of daten) {
      const k = KURS_BY_SLUG[kurs];
      await createTermin({ standort: 'muenchen', kurs, datum, start_zeit: '08:00', end_zeit: '16:00', plaetze_gesamt: gesamt, plaetze_extern: extern, preis_cent: (k.preis || 0) * 100, hinweis: hinweis || null, status: 'aktiv' }, q);
    }
  });
}
