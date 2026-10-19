import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isStandort, requireSession } from '@/lib/auth';
import { listBuchungen, listWiderrufe } from '@/lib/termine';
import { KURS_BY_SLUG, euro } from '@/lib/courses';
import { formatDatum } from '@/lib/view';
import { buchungStatus } from '../../actions';
import { AdminBar } from '../AdminBar';
import { Icon } from '@/components/Icon';

export const dynamic = 'force-dynamic';

export default async function Buchungen({ params, searchParams }: { params: Promise<{ standort: string }>; searchParams: Promise<{ ok?: string; status?: string }> }) {
  const { standort } = await params;
  if (!isStandort(standort)) notFound();
  await requireSession(standort);
  const { ok, status } = await searchParams;
  const alle = listBuchungen(standort);
  const liste = status ? alle.filter((b) => b.status === status) : alle;
  const widerrufe = listWiderrufe();
  const self = `/admin/${standort}/buchungen/`;
  return (
    <>
      <AdminBar standort={standort} aktiv="buchungen" />
      <main className="container">
        {ok && <div className="flash" role="status">{ok}</div>}
        <h1>Buchungen</h1>
        <div className="btn-row" style={{ marginBottom: 16 }}>
          {['', 'neu', 'bezahlt', 'storniert', 'widerrufen'].map((s) => <Link key={s} className="chip" aria-current={(status || '') === s ? 'true' : undefined} href={s ? `${self}?status=${s}` : self}>{s || 'alle'} ({s ? alle.filter((b) => b.status === s).length : alle.length})</Link>)}
          <a className="btn btn--secondary btn--sm" href={`/admin/${standort}/export/?typ=buchungen`}><Icon name="download" />CSV-Export</a>
        </div>
        <div className="atable-wrap">
          <table className="atable">
            <thead><tr><th>Buchung</th><th>Kurs / Datum</th><th>Kunde</th><th>Pers.</th><th>Betrag</th><th>Zahlung</th><th>Status</th></tr></thead>
            <tbody>
              {liste.length === 0 && <tr><td colSpan={7}>Keine Buchungen.</td></tr>}
              {liste.map((b) => (
                <tr key={b.id}>
                  <td><b>{b.ref}</b><br /><span className="muted">{new Date(b.created_at + 'Z').toLocaleString('de-DE')}</span></td>
                  <td><Link href={`/admin/${standort}/termin/${b.termin_id}/`}>{KURS_BY_SLUG[b.kurs]?.kurz}</Link><br />{formatDatum(b.datum, { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                  <td>{b.rechnung.firma ? <>{b.rechnung.firma}<br /></> : null}{b.rechnung.vorname} {b.rechnung.nachname}<br /><a href={`mailto:${b.email}`}>{b.email}</a></td>
                  <td>{b.anzahl}</td>
                  <td>{euro(b.betrag_cent / 100, { cents: true })}</td>
                  <td>{b.zahlungsart === 'paypal' ? 'PayPal' : 'Vorkasse'}</td>
                  <td>
                    <form action={buchungStatus} style={{ display: 'flex', gap: 4 }}>
                      <input type="hidden" name="standort" value={standort} /><input type="hidden" name="id" value={b.id} /><input type="hidden" name="zurueck" value={self} />
                      <select className="select" name="status" defaultValue={b.status} aria-label="Status"><option value="neu">neu</option><option value="bezahlt">bezahlt</option><option value="storniert">storniert</option><option value="widerrufen">widerrufen</option></select>
                      <button className="btn btn--secondary btn--sm" type="submit">OK</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="h3" style={{ marginTop: 48 }}>Eingegangene Widerrufe (§ 356a BGB)</h2>
        <div className="atable-wrap">
          <table className="atable">
            <thead><tr><th>Eingang</th><th>Buchung</th><th>Name</th><th>E-Mail</th><th>Nachricht</th></tr></thead>
            <tbody>
              {widerrufe.length === 0 && <tr><td colSpan={5}>Keine Widerrufe.</td></tr>}
              {widerrufe.map((w) => <tr key={w.id}><td>{new Date(w.created_at + 'Z').toLocaleString('de-DE')}</td><td>{w.ref || '–'}</td><td>{w.name}</td><td><a href={`mailto:${w.email}`}>{w.email}</a></td><td>{w.nachricht || '–'}</td></tr>)}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
