import { NextResponse } from 'next/server';
import { hasSession, isStandort } from '@/lib/auth';
import { listBuchungen, listTermine } from '@/lib/termine';
import { KURS_BY_SLUG } from '@/lib/courses';

export const dynamic = 'force-dynamic';

const csv = (rows: (string | number | null | undefined)[][]) =>
  '﻿' + rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');

export async function GET(req: Request, { params }: { params: Promise<{ standort: string }> }) {
  const { standort } = await params;
  if (!isStandort(standort) || !(await hasSession(standort))) return new NextResponse('Nicht angemeldet', { status: 401 });
  const u = new URL(req.url);
  const typ = u.searchParams.get('typ');
  let body = '';
  if (typ === 'termine') {
    body = csv([['Datum', 'Bis', 'Kurs', 'Beginn', 'Ende', 'Preis', 'Plätze', 'Extern', 'Online', 'Frei', 'Status', 'Dozent'],
      ...(await listTermine({ standort, nurAktiv: false })).map((t) => [t.datum, t.datum_bis, KURS_BY_SLUG[t.kurs]?.name, t.start_zeit, t.end_zeit, (t.preis_cent / 100).toFixed(2).replace('.', ','), t.plaetze_gesamt, t.plaetze_extern, t.gebucht, t.frei, t.status, t.dozent])]);
  } else {
    const terminId = u.searchParams.get('termin') || undefined;
    const b = await listBuchungen(standort, { terminId });
    if (typ === 'teilnehmer') {
      body = csv([['Datum', 'Kurs', 'Vorname', 'Nachname', 'Geburtsdatum', 'Erfahrung', 'Buchung', 'Status', 'E-Mail', 'Telefon'],
        ...b.filter((x) => ['neu', 'bezahlt'].includes(x.status)).flatMap((x) => x.teilnehmer.map((p) => [x.datum, KURS_BY_SLUG[x.kurs]?.kurz, p.vorname, p.nachname, p.geburtsdatum, (p as { erfahrung?: string }).erfahrung, x.ref, x.status, x.email, x.telefon]))]);
    } else {
      body = csv([['Buchung', 'Eingang', 'Datum', 'Kurs', 'Typ', 'Firma', 'USt-IdNr.', 'Vorname', 'Nachname', 'Straße', 'PLZ', 'Ort', 'Land', 'E-Mail', 'Telefon', 'Personen', 'Betrag', 'Zahlung', 'Status'],
        ...b.map((x) => [x.ref, x.created_at, x.datum, KURS_BY_SLUG[x.kurs]?.kurz, x.kundentyp, x.rechnung.firma, x.rechnung.ustid, x.rechnung.vorname, x.rechnung.nachname, x.rechnung.strasse, x.rechnung.plz, x.rechnung.ort, x.rechnung.land, x.email, x.telefon, x.anzahl, (x.betrag_cent / 100).toFixed(2).replace('.', ','), x.zahlungsart, x.status])]);
    }
  }
  return new NextResponse(body, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="schweisskurse-${standort}-${typ || 'buchungen'}.csv"` } });
}
