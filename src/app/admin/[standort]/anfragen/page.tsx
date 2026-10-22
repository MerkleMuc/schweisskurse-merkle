import { notFound } from 'next/navigation';
import { isStandort, requireSession } from '@/lib/auth';
import { listAnfragen } from '@/lib/termine';
import { anfrageErledigt } from '../../actions';
import { AdminBar } from '../AdminBar';

export const dynamic = 'force-dynamic';

export default async function Anfragen({ params }: { params: Promise<{ standort: string }> }) {
  const { standort } = await params;
  if (!isStandort(standort)) notFound();
  await requireSession(standort);
  const liste = await listAnfragen(standort);
  return (
    <>
      <AdminBar standort={standort} aktiv="anfragen" />
      <main className="container">
        <h1>Anfragen &amp; Warteliste</h1>
        <div className="atable-wrap">
          <table className="atable">
            <thead><tr><th>Eingang</th><th>Thema</th><th>Kontakt</th><th>Nachricht</th><th>Erledigt</th></tr></thead>
            <tbody>
              {liste.length === 0 && <tr><td colSpan={5}>Keine Anfragen.</td></tr>}
              {liste.map((a) => (
                <tr key={a.id} className={a.erledigt ? 'is-past' : ''}>
                  <td>{new Date(a.created_at + 'Z').toLocaleString('de-DE')}</td>
                  <td>{a.thema}<br /><span className="muted">{a.standort || 'egal'}</span></td>
                  <td>{a.name}<br /><a href={`mailto:${a.email}`}>{a.email}</a><br />{a.telefon}</td>
                  <td style={{ maxWidth: 420, whiteSpace: 'pre-wrap' }}>{a.nachricht}</td>
                  <td>
                    <form action={anfrageErledigt}><input type="hidden" name="standort" value={standort} /><input type="hidden" name="id" value={a.id} /><input type="hidden" name="erledigt" value={a.erledigt ? '0' : '1'} />
                      <button className="btn btn--secondary btn--sm" type="submit">{a.erledigt ? 'Wieder öffnen' : 'Erledigt'}</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
