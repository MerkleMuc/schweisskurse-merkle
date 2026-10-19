'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createAnfrage, createWiderruf } from '@/lib/termine';
import { sendMail, teamAdresse } from '@/lib/mail';
import { SITE } from '@/lib/site';

export interface FormState { ok: boolean; message?: string; errors?: Record<string, string> }

const Anfrage = z.object({
  name: z.string().trim().min(2, 'Bitte Ihren Namen angeben.').max(120),
  email: z.string().trim().email('Bitte eine gültige E-Mail-Adresse angeben.'),
  telefon: z.string().trim().max(40).optional(),
  thema: z.string().trim().min(1).max(80),
  standort: z.enum(['muenchen', 'hamburg', '']).optional(),
  nachricht: z.string().trim().min(10, 'Bitte schreiben Sie uns ein paar Worte (mind. 10 Zeichen).').max(5000)
});

export async function sendeAnfrage(_p: FormState, fd: FormData): Promise<FormState> {
  if (fd.get('website')) return { ok: true, message: 'Danke!' };
  if (fd.get('datenschutz') !== 'on') return { ok: false, errors: { datenschutz: 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.' } };
  const r = Anfrage.safeParse(Object.fromEntries(fd));
  if (!r.success) {
    const errors: Record<string, string> = {};
    r.error.issues.forEach((i) => { errors[String(i.path[0])] = i.message; });
    return { ok: false, errors, message: 'Bitte prüfen Sie die markierten Felder.' };
  }
  const a = r.data;
  createAnfrage({ ...a, standort: a.standort || undefined });
  await sendMail({ to: teamAdresse(a.standort), replyTo: a.email, subject: `Anfrage Schweißkurse: ${a.thema}`, text: `${a.nachricht}\n\n— ${a.name}\n${a.email}\n${a.telefon || ''}\nStandort: ${a.standort || 'egal'}` });
  await sendMail({ to: a.email, subject: 'Ihre Anfrage bei Merkle Schweißkurse', text: `Guten Tag ${a.name},\n\nvielen Dank für Ihre Nachricht. Wir melden uns in der Regel innerhalb eines Werktags.\n\nIhre Nachricht:\n${a.nachricht}\n\nIhr Team von Merkle Schweißkurse\n${SITE.email}` });
  return { ok: true, message: 'Vielen Dank! Ihre Nachricht ist bei uns angekommen. Wir melden uns in der Regel innerhalb eines Werktags.' };
}

const Widerruf = z.object({
  name: z.string().trim().min(2, 'Bitte Ihren Namen angeben.').max(120),
  email: z.string().trim().email('Bitte die E-Mail-Adresse der Buchung angeben.'),
  ref: z.string().trim().max(40).optional(),
  nachricht: z.string().trim().max(2000).optional()
});

/* Elektronische Widerrufsfunktion nach § 356a BGB: Es werden nur Angaben
   abgefragt, die zur Zuordnung des Vertrags nötig sind – kein Grund. */
export async function sendeWiderruf(_p: FormState, fd: FormData): Promise<FormState> {
  if (fd.get('website')) return { ok: true };
  const r = Widerruf.safeParse(Object.fromEntries(fd));
  if (!r.success) {
    const errors: Record<string, string> = {};
    r.error.issues.forEach((i) => { errors[String(i.path[0])] = i.message; });
    return { ok: false, errors, message: 'Bitte prüfen Sie die markierten Felder.' };
  }
  const w = r.data;
  const zeit = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
  createWiderruf({ ...w });
  await sendMail({ to: teamAdresse('muenchen'), replyTo: w.email, subject: `Widerruf ${w.ref || ''} von ${w.name}`, text: `Widerrufserklärung über die Website (${zeit})\n\nName: ${w.name}\nE-Mail: ${w.email}\nBuchungsnummer: ${w.ref || '–'}\nNachricht: ${w.nachricht || '–'}` });
  await sendMail({ to: w.email, subject: 'Eingangsbestätigung Ihres Widerrufs', text: `Guten Tag ${w.name},\n\nwir bestätigen den Eingang Ihrer Widerrufserklärung am ${zeit}${w.ref ? ` zur Buchung ${w.ref}` : ''}.\n\nIhre Merkle Schweißkurse\n${SITE.email}` });
  revalidatePath('/', 'layout');
  return { ok: true, message: `Ihr Widerruf ist am ${zeit} bei uns eingegangen. Sie erhalten eine Eingangsbestätigung per E-Mail an ${w.email}.` };
}
