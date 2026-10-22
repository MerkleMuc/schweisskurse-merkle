'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { checkPassword, endSession, isStandort, requireSession, startSession } from '@/lib/auth';
import { createTermin, deleteTermin, getTermin, setAnfrageErledigt, setBuchungStatus, updateTermin, type TerminInput } from '@/lib/termine';
import { KURS_BY_SLUG } from '@/lib/courses';
import type { StandortId } from '@/lib/site';

/* Nach jeder Änderung wird das gesamte Frontend neu validiert: Kurs-,
   Standort- und Terminseiten zeigen sofort den neuen Stand. */
function sync() {
  revalidatePath('/', 'layout');
}

function standortOf(fd: FormData): StandortId {
  const s = String(fd.get('standort') || '');
  if (!isStandort(s)) throw new Error('Ungültiger Standort');
  return s;
}

export async function login(_p: { error?: string }, fd: FormData): Promise<{ error?: string }> {
  const standort = standortOf(fd);
  await new Promise((r) => setTimeout(r, 400)); // Bremse gegen Durchprobieren
  if (!checkPassword(standort, String(fd.get('password') || ''))) return { error: 'Das Passwort ist nicht korrekt.' };
  await startSession(standort);
  redirect(`/admin/${standort}/`);
}

export async function logout(fd: FormData) {
  const standort = standortOf(fd);
  await endSession(standort);
  redirect(`/admin/${standort}/login/`);
}

function readTermin(fd: FormData, standort: StandortId): TerminInput {
  const kurs = String(fd.get('kurs') || '');
  if (!KURS_BY_SLUG[kurs]) throw new Error('Unbekannter Kurs');
  const num = (k: string, d = 0) => { const n = Number(String(fd.get(k) ?? '').replace(',', '.')); return Number.isFinite(n) ? n : d; };
  const datum = String(fd.get('datum') || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) throw new Error('Datum fehlt');
  const bis = String(fd.get('datum_bis') || '');
  const status = String(fd.get('status') || 'aktiv');
  return {
    standort, kurs, datum,
    datum_bis: /^\d{4}-\d{2}-\d{2}$/.test(bis) && bis > datum ? bis : null,
    start_zeit: String(fd.get('start_zeit') || '08:00'),
    end_zeit: String(fd.get('end_zeit') || '16:00'),
    plaetze_gesamt: Math.max(1, Math.round(num('plaetze_gesamt', 9))),
    plaetze_extern: Math.max(0, Math.round(num('plaetze_extern', 0))),
    preis_cent: Math.round(num('preis', 0) * 100),
    dozent: String(fd.get('dozent') || '').trim() || null,
    hinweis: String(fd.get('hinweis') || '').trim() || null,
    status: (['aktiv', 'abgesagt', 'entwurf'].includes(status) ? status : 'aktiv') as TerminInput['status']
  };
}

export async function neuerTermin(fd: FormData) {
  const standort = standortOf(fd);
  await requireSession(standort);
  const t = readTermin(fd, standort);
  const wiederholen = Math.min(26, Math.max(1, Number(fd.get('wiederholen') || 1)));
  const abstand = Math.max(1, Number(fd.get('abstand') || 7));
  for (let i = 0; i < wiederholen; i++) {
    const shift = (d: string | null | undefined) => {
      if (!d) return d ?? null;
      const x = new Date(d + 'T12:00:00Z'); x.setUTCDate(x.getUTCDate() + i * abstand); return x.toISOString().slice(0, 10);
    };
    await createTermin({ ...t, datum: shift(t.datum)!, datum_bis: shift(t.datum_bis) });
  }
  sync();
  redirect(`/admin/${standort}/?ok=${wiederholen > 1 ? `${wiederholen}+Termine+angelegt` : 'Termin+angelegt'}`);
}

export async function speichereTermin(fd: FormData) {
  const standort = standortOf(fd);
  await requireSession(standort);
  const id = String(fd.get('id'));
  await updateTermin(id, standort, readTermin(fd, standort));
  sync();
  redirect(String(fd.get('zurueck') || `/admin/${standort}/`) + '?ok=Gespeichert');
}

/* Schnelländerung direkt in der Tabelle: Plätze und Status */
export async function schnellAenderung(fd: FormData) {
  const standort = standortOf(fd);
  await requireSession(standort);
  const id = String(fd.get('id'));
  const gesamt = Number(fd.get('plaetze_gesamt'));
  const extern = Number(fd.get('plaetze_extern'));
  const status = String(fd.get('status') || '');
  await updateTermin(id, standort, {
    plaetze_gesamt: Number.isFinite(gesamt) && gesamt > 0 ? Math.round(gesamt) : undefined,
    plaetze_extern: Number.isFinite(extern) && extern >= 0 ? Math.round(extern) : undefined,
    status: ['aktiv', 'abgesagt', 'entwurf'].includes(status) ? (status as TerminInput['status']) : undefined
  });
  sync();
  redirect(`/admin/${standort}/?ok=Aktualisiert#t-${id}`);
}

export async function dupliziereTermin(fd: FormData) {
  const standort = standortOf(fd);
  await requireSession(standort);
  const t = await getTermin(String(fd.get('id')));
  if (!t || t.standort !== standort) redirect(`/admin/${standort}/`);
  const x = new Date(t!.datum + 'T12:00:00Z'); x.setUTCDate(x.getUTCDate() + 7);
  const id = await createTermin({ standort, kurs: t!.kurs, datum: x.toISOString().slice(0, 10), datum_bis: null, start_zeit: t!.start_zeit, end_zeit: t!.end_zeit, plaetze_gesamt: t!.plaetze_gesamt, plaetze_extern: 0, preis_cent: t!.preis_cent, dozent: t!.dozent, hinweis: t!.hinweis, status: 'entwurf' });
  sync();
  redirect(`/admin/${standort}/termin/${id}/?ok=Kopie+als+Entwurf+angelegt`);
}

export async function loescheTermin(fd: FormData) {
  const standort = standortOf(fd);
  await requireSession(standort);
  const r = await deleteTermin(String(fd.get('id')), standort);
  sync();
  redirect(`/admin/${standort}/?ok=${r === 'geloescht' ? 'Termin+gel%C3%B6scht' : 'Termin+hat+Buchungen+und+wurde+abgesagt'}`);
}

export async function buchungStatus(fd: FormData) {
  const standort = standortOf(fd);
  await requireSession(standort);
  const status = String(fd.get('status'));
  if (!['neu', 'bezahlt', 'storniert', 'widerrufen'].includes(status)) return;
  await setBuchungStatus(Number(fd.get('id')), standort, status as 'neu');
  sync();
  redirect(String(fd.get('zurueck') || `/admin/${standort}/buchungen/`) + '?ok=Status+ge%C3%A4ndert');
}

export async function anfrageErledigt(fd: FormData) {
  const standort = standortOf(fd);
  await requireSession(standort);
  await setAnfrageErledigt(Number(fd.get('id')), fd.get('erledigt') === '1');
  redirect(`/admin/${standort}/anfragen/`);
}
