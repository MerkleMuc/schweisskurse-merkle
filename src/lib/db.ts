import 'server-only';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

/*
 * Eine SQLite-Datei hält Kurstermine, Buchungen, Anfragen und Widerrufe.
 * node:sqlite ist in Node ≥ 22.5 eingebaut – keine nativen Abhängigkeiten,
 * kein externer Datenbankserver. Für den Betrieb genügt ein beschreibbares
 * Verzeichnis (DATA_DIR), das bei Deployments erhalten bleibt.
 */

const g = globalThis as unknown as { __skdb?: DatabaseSync };

function open(): DatabaseSync {
  const dir = path.resolve(/* turbopackIgnore: true */ process.cwd(), process.env.DATA_DIR || 'data');
  fs.mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(path.join(dir, 'schweisskurse.db'));
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
  migrate(db);
  return db;
}

function migrate(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS termine (
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
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_termine_datum ON termine (standort, datum);

    CREATE TABLE IF NOT EXISTS buchungen (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_buchungen_termin ON buchungen (termin_id);

    CREATE TABLE IF NOT EXISTS anfragen (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      standort TEXT,
      thema TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      telefon TEXT,
      nachricht TEXT NOT NULL,
      erledigt INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS widerrufe (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ref TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      nachricht TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

export function db(): DatabaseSync {
  if (!g.__skdb) g.__skdb = open();
  return g.__skdb;
}

/** Führt fn in einer Transaktion aus (IMMEDIATE sperrt sofort – wichtig für die Platzvergabe). */
export function tx<T>(fn: (d: DatabaseSync) => T): T {
  const d = db();
  d.exec('BEGIN IMMEDIATE');
  try {
    const r = fn(d);
    d.exec('COMMIT');
    return r;
  } catch (e) {
    d.exec('ROLLBACK');
    throw e;
  }
}
