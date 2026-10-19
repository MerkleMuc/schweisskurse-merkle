'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createBuchung, BuchungsFehler, getTermin } from '@/lib/termine';
import { KURS_BY_SLUG, euro } from '@/lib/courses';
import { CONSENT_TEXT, LEGAL_VERSION, WIDERRUFSBELEHRUNG, MUSTER_WIDERRUFSFORMULAR } from '@/lib/legal';
import { sendMail, teamAdresse } from '@/lib/mail';
import { refToken } from '@/lib/token';
import { SITE, STANDORTE } from '@/lib/site';
import { formatDatum } from '@/lib/view';

export interface BookingState { ok: boolean; message?: string; errors?: Record<string, string> }

const req = (label: string) => z.string().trim().min(1, `Bitte ${label} angeben.`).max(200);

export async function bucheKurs(_prev: BookingState, fd: FormData): Promise<BookingState> {
  if (fd.get('website')) return { ok: false, message: 'Die Anfrage konnte nicht verarbeitet werden.' }; // Honeypot

  const terminId = String(fd.get('terminId') || '');
  const termin = getTermin(terminId);
  if (!termin) return { ok: false, message: 'Der Termin wurde nicht gefunden.' };
  const kurs = KURS_BY_SLUG[termin.kurs];
  const pruefung = kurs?.verfahren === 'pruefung';

  const kundentyp = fd.get('kundentyp') === 'firma' ? 'firma' : 'privat';
  const anzahl = Math.max(1, Math.min(20, Number(fd.get('anzahl') || 1)));
  const selbst = fd.get('selbst') === 'on';

  const errors: Record<string, string> = {};
  const get = (k: string) => String(fd.get(k) ?? '').trim();
  const check = (k: string, schema: z.ZodType<string>) => {
    const r = schema.safeParse(get(k));
    if (!r.success) errors[k] = r.error.issues[0].message;
    return r.success ? r.data : '';
  };

  const rechnung = {
    firma: kundentyp === 'firma' ? check('r_firma', req('den Firmennamen')) : undefined,
    ustid: kundentyp === 'firma' ? get('r_ustid') || undefined : undefined,
    anrede: get('r_anrede') || undefined,
    vorname: check('r_vorname', req('den Vornamen')),
    nachname: check('r_nachname', req('den Nachnamen')),
    strasse: check('r_strasse', req('Straße und Hausnummer')),
    plz: check('r_plz', z.string().trim().regex(/^[0-9A-Za-z -]{4,10}$/, 'Bitte eine gültige Postleitzahl angeben.')),
    ort: check('r_ort', req('den Ort')),
    land: check('r_land', req('das Land'))
  };
  const email = check('email', z.string().trim().email('Bitte eine gültige E-Mail-Adresse angeben.'));
  const telefon = check('telefon', z.string().trim().min(6, 'Bitte eine Telefonnummer für Rückfragen angeben.').max(40));

  const teilnehmer = Array.from({ length: anzahl }, (_, i) => {
    if (i === 0 && selbst) {
      return { anrede: rechnung.anrede, vorname: rechnung.vorname, nachname: rechnung.nachname, geburtsdatum: pruefung ? check('t0_geburtsdatum', req('das Geburtsdatum')) : undefined, erfahrung: get('t0_erfahrung') || undefined };
    }
    return {
      vorname: check(`t${i}_vorname`, req('den Vornamen')),
      nachname: check(`t${i}_nachname`, req('den Nachnamen')),
      geburtsdatum: pruefung ? check(`t${i}_geburtsdatum`, req('das Geburtsdatum')) : undefined,
      erfahrung: get(`t${i}_erfahrung`) || undefined
    };
  });

  const zahlungsart = fd.get('zahlungsart') === 'paypal' ? 'paypal' : fd.get('zahlungsart') === 'vorkasse' ? 'vorkasse' : null;
  if (!zahlungsart) errors.zahlungsart = 'Bitte eine Zahlungsart wählen.';

  const now = new Date().toISOString();
  if (fd.get('c_agb') !== 'on') errors.c_agb = 'Bitte bestätigen Sie die AGB.';
  if (fd.get('c_datenschutz') !== 'on') errors.c_datenschutz = 'Bitte bestätigen Sie die Kenntnisnahme der Datenschutzhinweise.';
  if (kundentyp === 'privat') {
    if (fd.get('c_widerruf') !== 'on') errors.c_widerruf = 'Bitte bestätigen Sie die Kenntnisnahme der Widerrufsbelehrung.';
    if (fd.get('c_beginn') !== 'on') errors.c_beginn = 'Bitte bestätigen Sie den vorzeitigen Beginn der Dienstleistung.';
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors, message: 'Bitte prüfen Sie die markierten Angaben.' };
  }

  let ref: string; let betragCent: number;
  try {
    const r = createBuchung({
      terminId, anzahl, kundentyp, email, telefon,
      rechnung: rechnung as never, teilnehmer: teilnehmer as never,
      zahlungsart: zahlungsart!, bemerkung: get('bemerkung').slice(0, 2000) || undefined,
      consents: {
        agb: now, datenschutz: now,
        widerrufsbelehrung: kundentyp === 'privat' ? now : 'entfällt (Unternehmer)',
        vorzeitigerBeginn: kundentyp === 'privat' ? now : null,
        zahlungspflichtig: now,
        textVersion: LEGAL_VERSION
      }
    });
    ref = r.ref; betragCent = r.betragCent;
  } catch (e) {
    if (e instanceof BuchungsFehler) return { ok: false, message: e.message };
    console.error(e);
    return { ok: false, message: 'Die Buchung konnte gerade nicht gespeichert werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.' };
  }

  // Frontend synchronisieren: freie Plätze sind sofort aktuell
  revalidatePath('/', 'layout');

  const ort = STANDORTE[termin.standort];
  const zeile = `${kurs?.name || termin.kurs} am ${formatDatum(termin.datum)}${termin.datum_bis ? ` bis ${formatDatum(termin.datum_bis)}` : ''}, ${termin.start_zeit}–${termin.end_zeit} Uhr, ${ort.firma}, ${ort.street}, ${ort.zip} ${ort.city}`;
  const betrag = euro(betragCent / 100, { cents: true });
  const zahlText = zahlungsart === 'paypal'
    ? `Zahlung per PayPal: Den Link finden Sie auf der Bestätigungsseite ${SITE.url}/buchen/bestaetigung/${ref}/?t=${refToken(ref)}`
    : `Zahlung per Vorkasse: Bitte überweisen Sie ${betrag} unter Angabe der Buchungsnummer ${ref}.${process.env.BANK_IBAN ? ` Kontoinhaber: ${process.env.BANK_KONTOINHABER || SITE.legalName}, IBAN: ${process.env.BANK_IBAN}${process.env.BANK_BIC ? `, BIC: ${process.env.BANK_BIC}` : ''}.` : ' Die Bankverbindung erhalten Sie mit der Rechnung.'}`;

  const widerruf = kundentyp === 'privat'
    ? `\n\n— Widerrufsbelehrung —\n${WIDERRUFSBELEHRUNG.map((b) => `${b.h}\n${b.p.join('\n')}`).join('\n\n')}\n\n${MUSTER_WIDERRUFSFORMULAR}\n\nIhre Erklärung bei der Buchung (${now}):\n${CONSENT_TEXT.vorzeitigerBeginn}`
    : '';

  await sendMail({
    to: email,
    subject: `Buchungsbestätigung ${ref} – ${kurs?.kurz || 'Schweißkurs'} am ${formatDatum(termin.datum, { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    text: `Guten Tag ${rechnung.vorname} ${rechnung.nachname},

vielen Dank für Ihre verbindliche Buchung bei Merkle Schweißkurse.

Buchungsnummer: ${ref}
Kurs: ${zeile}
Teilnehmer (${anzahl}): ${teilnehmer.map((t) => `${t.vorname} ${t.nachname}`).join(', ')}
Gesamtbetrag: ${betrag} inkl. 19 % MwSt.

${zahlText}

Die Rechnung erhalten Sie in den nächsten Tagen. Bitte seien Sie am Kurstag zehn Minuten vor Beginn vor Ort.

Bei Fragen erreichen Sie uns unter ${ort.tel.text} oder ${SITE.email}.

Ihr Team von Merkle Schweißkurse
${ANBIETER_ZEILE()}${widerruf}`
  });

  await sendMail({
    to: teamAdresse(termin.standort),
    replyTo: email,
    subject: `Neue Buchung ${ref}: ${kurs?.kurz} ${termin.datum} (${anzahl} P.)`,
    text: `Neue Online-Buchung\n\nBuchung: ${ref}\nTermin: ${zeile}\nAnzahl: ${anzahl}\nKundentyp: ${kundentyp}\nRechnung: ${JSON.stringify(rechnung, null, 2)}\nTeilnehmer: ${JSON.stringify(teilnehmer, null, 2)}\nE-Mail: ${email}\nTelefon: ${telefon}\nZahlung: ${zahlungsart}\nBetrag: ${betrag}\nBemerkung: ${get('bemerkung') || '–'}\n\nVerwalten: ${SITE.url}/admin/${termin.standort}/`
  });

  redirect(`/buchen/bestaetigung/${ref}/?t=${refToken(ref)}`);
}

function ANBIETER_ZEILE() {
  return `${SITE.legalName} · ${STANDORTE.muenchen.street} · ${STANDORTE.muenchen.zip} ${STANDORTE.muenchen.city} · Geschäftsführer ${SITE.impressum.geschaeftsfuehrer} · ${SITE.impressum.hrb}, Registergericht ${SITE.impressum.registergericht}`;
}
