import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isStandort, requireSession } from '@/lib/auth';
import { getTermin, listBuchungen } from '@/lib/termine';
import { KURS_BY_SLUG, kurseFuer, euro } from '@/lib/courses';
import { STANDORTE } from '@/lib/site';
import { formatDatum } from '@/lib/view';
import { speichereTermin, buchungStatus } from '../../../actions';
import { AdminBar } from '../../AdminBar';
import { Icon } from '@/components/Icon';

export const dynamic = 'force-dynamic';

export default async function TerminDetail({ params, searchParams }: { params: Promise<{ standort: string; id: string }>; searchParams: Promise<{ ok?: string }> }) {
  const { standort, id } = await params;
  if (!isStandort(standort)) notFound();
  await requireSession(standort);
  const { ok } = await searchParams;
  const t = getTermin(id);
  if (!t || t.standort !== standort) notFound();
  const buchungen = listBuchungen(standort, { terminId: id });
  const self = `/admin/${standort}/termin/${id}/`;
  const k = KURS_BY_SLUG[t.kurs];

  return (
    <>
      <AdminBar standort={standort} aktiv="termine" />
      <main className="container">
        {ok && <div className="flash" role="status">{ok}</div>}
        <p><Link href={`/admin/${standort}/`}>← Alle Termine</Link></p>
        <h1>{k?.name} · {formatDatum(t.datum)}</h1>
        <div className="kpis">
          <div className="kpi"><b>{t.plaetze_gesamt}</b><span>Plätze gesamt</span></div>
          <div className="kpi"><b>{t.plaetze_extern}</b><span>extern vergeben</span></div>
          <div className="kpi"><b>{t.gebucht}</b><span>online gebucht</span></div>
          <div className="kpi"><b>{t.frei}</b><span>frei</span></div>
        </div>
        <div className="split">
          <div className="span-5">
            <form action={speichereTermin} className="form card card--pad">
              <h2 className="h3" style={{ margin: 0 }}>Termin bearbeiten</h2>
              <input type="hidden" name="standort" value={standort} /><input type="hidden" name="id" value={id} /><input type="hidden" name="zurueck" value={self} />
              <div className="field"><label htmlFor="e-kurs">Kurs</label><select className="select" id="e-kurs" name="kurs" defaultValue={t.kurs}>{kurseFuer(standort).map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select></div>
              <div className="form-row">
                <div className="field"><label htmlFor="e-d">Datum</label><input className="input" type="date" id="e-d" name="datum" defaultValue={t.datum} required /></div>
                <div className="field"><label htmlFor="e-db">Ende (mehrtägig)</label><input className="input" type="date" id="e-db" name="datum_bis" defaultValue={t.datum_bis || ''} /></div>
              </div>
              <div className="form-row">
                <div className="field"><label htmlFor="e-v">Beginn</label><input className="input" type="time" id="e-v" name="start_zeit" defaultValue={t.start_zeit} /></div>
                <div className="field"><label htmlFor="e-b">Ende</label><input className="input" type="time" id="e-b" name="end_zeit" defaultValue={t.end_zeit} /></div>
              </div>
              <div className="form-row">
                <div className="field"><label htmlFor="e-g">Plätze gesamt</label><input className="input" type="number" id="e-g" name="plaetze_gesamt" defaultValue={t.plaetze_gesamt} min={1} /></div>
                <div className="field"><label htmlFor="e-x">Extern vergeben</label><input className="input" type="number" id="e-x" name="plaetze_extern" defaultValue={t.plaetze_extern} min={0} /></div>
              </div>
              <div className="form-row">
                <div className="field"><label htmlFor="e-p">Preis p. P. (€)</label><input className="input" id="e-p" name="preis" inputMode="decimal" defaultValue={(t.preis_cent / 100).toString().replace('.', ',')} /></div>
                <div className="field"><label htmlFor="e-s">Status</label><select className="select" id="e-s" name="status" defaultValue={t.status}><option value="aktiv">aktiv</option><option value="entwurf">Entwurf</option><option value="abgesagt">abgesagt</option></select></div>
              </div>
              <div className="field"><label htmlFor="e-doz">Dozent</label><input className="input" id="e-doz" name="dozent" defaultValue={t.dozent || ''} /></div>
              <div className="field"><label htmlFor="e-h">Hinweis (Website)</label><input className="input" id="e-h" name="hinweis" defaultValue={t.hinweis || ''} /></div>
              <button className="btn btn--primary" type="submit">Speichern</button>
              <Link className="small" href={`/buchen/${t.id}/`} target="_blank">Buchungsseite öffnen</Link>
            </form>
          </div>
          <div className="span-7">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <h2 className="h3">Teilnehmerliste ({buchungen.reduce((a, b) => a + (['neu', 'bezahlt'].includes(b.status) ? b.anzahl : 0), 0)})</h2>
              <a className="btn btn--secondary btn--sm" href={`/admin/${standort}/export/?typ=teilnehmer&termin=${id}`}><Icon name="download" />Teilnehmer CSV</a>
            </div>
            <div className="atable-wrap">
              <table className="atable">
                <thead><tr><th>Buchung</th><th>Teilnehmer</th><th>Rechnung / Kontakt</th><th>Betrag</th><th>Status</th></tr></thead>
                <tbody>
                  {buchungen.length === 0 && <tr><td colSpan={5}>Noch keine Online-Buchungen.</td></tr>}
                  {buchungen.map((b) => (
                    <tr key={b.id}>
                      <td><b>{b.ref}</b><br /><span className="muted">{new Date(b.created_at + 'Z').toLocaleString('de-DE')}</span><br />{b.kundentyp === 'firma' ? 'Firma' : 'Privat'} · {b.zahlungsart === 'paypal' ? 'PayPal' : 'Vorkasse'}</td>
                      <td>{b.teilnehmer.map((p, i) => <div key={i}>{p.vorname} {p.nachname}{p.geburtsdatum ? ` (${p.geburtsdatum})` : ''}</div>)}</td>
                      <td>{b.rechnung.firma && <>{b.rechnung.firma}<br /></>}{b.rechnung.vorname} {b.rechnung.nachname}<br />{b.rechnung.strasse}, {b.rechnung.plz} {b.rechnung.ort}<br /><a href={`mailto:${b.email}`}>{b.email}</a><br />{b.telefon}{b.bemerkung && <><br /><i>„{b.bemerkung}“</i></>}</td>
                      <td>{euro(b.betrag_cent / 100, { cents: true })}</td>
                      <td>
                        <span className={`status status--${b.status}`}>{b.status}</span>
                        <form action={buchungStatus} style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                          <input type="hidden" name="standort" value={standort} /><input type="hidden" name="id" value={b.id} /><input type="hidden" name="zurueck" value={self} />
                          <select className="select" name="status" defaultValue={b.status} aria-label="Status ändern"><option value="neu">neu</option><option value="bezahlt">bezahlt</option><option value="storniert">storniert</option><option value="widerrufen">widerrufen</option></select>
                          <button className="btn btn--secondary btn--sm" type="submit">OK</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="small muted">Stornierte und widerrufene Buchungen geben ihre Plätze automatisch wieder frei.</p>
          </div>
        </div>
      </main>
    </>
  );
}
