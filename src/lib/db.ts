import 'server-only';
import path from 'node:path';
import fs from 'node:fs';

/*
 * Datenbank: Postgres.
 *
 * - Produktion (Vercel): DATABASE_URL bzw. POSTGRES_URL einer gehosteten
 *   Postgres-Datenbank (z. B. Neon über den Vercel Marketplace).
 * - Lokal ohne DATABASE_URL: PGlite – vollwertiges Postgres als WebAssembly,
 *   gespeichert in DATA_DIR (Standard ./data/pglite). Kein Server nötig.
 *
 * Beide sprechen denselben SQL-Dialekt; der Rest der Anwendung kennt nur
 * query() und tx().
 */

export type Row = Record<string, unknown>;
export type Query = <T = Row>(sql: string, params?: unknown[]) => Promise<T[]>;

interface Backend { query: Query; tx: <T>(fn: (q: Query) => Promise<T>) => Promise<T>; kind: 'postgres' | 'pglite' }

const g = globalThis as unknown as { __skdb?: Promise<Backend> };

export function databaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || '';
}

async function openPostgres(url: string): Promise<Backend> {
  const { default: postgres } = await import('postgres');
  const local = /localhost|127\.0\.0\.1/.test(url);
  const sql = postgres(url, { prepare: false, max: 5, idle_timeout: 20, connect_timeout: 15, ssl: local ? false : 'require', onnotice: () => {} });
  const wrap = (s: typeof sql): Query => async (text, params = []) => (await s.unsafe(text, params as never[])) as never;
  return {
    kind: 'postgres',
    query: wrap(sql),
    tx: (fn) => sql.begin((t) => fn(wrap(t as unknown as typeof sql))) as never
  };
}

async function openPglite(): Promise<Backend> {
  const { PGlite } = await import('@electric-sql/pglite');
  const vercel = !!process.env.VERCEL;
  // Im Build laufen mehrere Prozesse parallel – eine Datei-Datenbank darf nur einer öffnen.
  const build = process.env.NEXT_PHASE === 'phase-production-build';
  let pg: InstanceType<typeof PGlite>;
  if (build) {
    pg = new PGlite();
  } else if (vercel) {
    // Ohne DATABASE_URL hat Vercel kein dauerhaftes Dateisystem: nur flüchtig im Speicher.
    console.warn('[db] Keine DATABASE_URL gesetzt – Daten werden nicht dauerhaft gespeichert.');
    pg = new PGlite();
  } else {
    const dir = path.resolve(/* turbopackIgnore: true */ process.cwd(), process.env.DATA_DIR || 'data', 'pglite');
    fs.mkdirSync(path.dirname(dir), { recursive: true });
    pg = new PGlite(dir);
  }
  const q: Query = async (text, params = []) => (await pg.query(text, params as unknown[])).rows as never;
  return {
    kind: 'pglite',
    query: q,
    tx: (fn) => pg.transaction((t) => fn(async (text, params = []) => (await t.query(text, params as unknown[])).rows as never))
  };
}

const NOW = `to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')`;

async function migrate(b: Backend) {
  const stmts = [
    `CREATE TABLE IF NOT EXISTS termine (
      id TEXT PRIMARY KEY,
      standort TEXT NOT NULL CHECK (standort IN ('muenchen','hamburg')),
      kurs TEXT NOT NULL,
      datum TEXT NOT NULL,
      datum_bis TEXT,
      start_zeit TEXT NOT NULL DEFAULT '08:00',
      end_zeit TEXT NOT NULL DEFAULT '16:00',
      plaetze_gesamt INTEGER NOT NULL DEFAULT 9,
      plaetze_extern INTEGER NOT NULL DEFAULT 0,
      preis_cent INTEGER NOT NULL,
      dozent TEXT,
      hinweis TEXT,
      status TEXT NOT NULL DEFAULT 'aktiv' CHECK (status IN ('aktiv','abgesagt','entwurf')),
      created_at TEXT NOT NULL DEFAULT ${NOW},
      updated_at TEXT NOT NULL DEFAULT ${NOW}
    )`,
    `CREATE INDEX IF NOT EXISTS idx_termine_datum ON termine (standort, datum)`,
    `CREATE TABLE IF NOT EXISTS buchungen (
      id SERIAL PRIMARY KEY,
      ref TEXT NOT NULL UNIQUE,
      termin_id TEXT NOT NULL REFERENCES termine(id),
      anzahl INTEGER NOT NULL,
      kundentyp TEXT NOT NULL CHECK (kundentyp IN ('privat','firma')),
      email TEXT NOT NULL,
      telefon TEXT,
      rechnung TEXT NOT NULL,
      teilnehmer TEXT NOT NULL,
      zahlungsart TEXT NOT NULL CHECK (zahlungsart IN ('paypal','vorkasse')),
      betrag_cent INTEGER NOT NULL,
      bemerkung TEXT,
      consents TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'neu' CHECK (status IN ('neu','bezahlt','storniert','widerrufen')),
      created_at TEXT NOT NULL DEFAULT ${NOW},
      updated_at TEXT NOT NULL DEFAULT ${NOW}
    )`,
    `CREATE INDEX IF NOT EXISTS idx_buchungen_termin ON buchungen (termin_id)`,
    `CREATE TABLE IF NOT EXISTS anfragen (
      id SERIAL PRIMARY KEY,
      standort TEXT,
      thema TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      telefon TEXT,
      nachricht TEXT NOT NULL,
      erledigt INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT ${NOW}
    )`,
    `CREATE TABLE IF NOT EXISTS widerrufe (
      id SERIAL PRIMARY KEY,
      ref TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      nachricht TEXT,
      created_at TEXT NOT NULL DEFAULT ${NOW}
    )`
  ];
  for (const s of stmts) await b.query(s);
}

async function open(): Promise<Backend> {
  const url = databaseUrl();
  const b = url ? await openPostgres(url) : await openPglite();
  await migrate(b);
  return b;
}

function backend(): Promise<Backend> {
  if (!g.__skdb) {
    g.__skdb = open().catch((e) => {
      g.__skdb = undefined;
      throw e;
    });
  }
  return g.__skdb;
}

export const query: Query = async (text, params) => (await backend()).query(text, params);
export async function tx<T>(fn: (q: Query) => Promise<T>): Promise<T> {
  return (await backend()).tx(fn);
}
export async function dbKind() {
  return (await backend()).kind;
}
export const SQL_NOW = NOW;
