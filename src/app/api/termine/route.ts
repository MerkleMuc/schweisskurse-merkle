import { NextResponse } from 'next/server';
import { kommendeTermine } from '@/lib/termine';
import { toView } from '@/lib/view';

export const dynamic = 'force-dynamic';

/* Öffentliche, schreibgeschützte Terminliste – das Frontend aktualisiert
   damit freie Plätze ohne Neuladen. */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const s = u.searchParams.get('standort');
  const standort = s === 'muenchen' || s === 'hamburg' ? s : undefined;
  const kurs = u.searchParams.get('kurs') || undefined;
  const termine = (await kommendeTermine({ standort, kurs })).map(toView);
  return NextResponse.json({ termine, stand: new Date().toISOString() }, { headers: { 'Cache-Control': 'no-store' } });
}
