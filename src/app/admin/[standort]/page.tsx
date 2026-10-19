import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isStandort, requireSession } from '@/lib/auth';
import { heute, listBuchungen, listTermine } from '@/lib/termine';
import { KURS_BY_SLUG, kurseFuer, euro } from '@/lib/courses';
import { STANDORTE } from '@/lib/site';
import { formatDatum } from '@/lib/view';
import { neuerTermin, schnellAenderung, dupliziereTermin, loescheTermin } from '../actions';
import { AdminBar } from './AdminBar';
import { Icon } from '@/components/Icon';

export const dynamic = 'force-dynamic';

export default async function AdminTermine({ params, searchParams }: { params: Promise<{ standort: string }>; searchParams: Promise<{ ok?: string; alle?: string }> }) {
  const { standort } = await params;
  if (!isStandort(standort)) notFound();
  await requireSession(standort);
  const { ok, alle } = await searchParams;
  const s = STANDORTE[standort];
  const h = heute();
  const termine = listTermine({ standort, nurAktiv: false, ab: alle ? undefined : h });
  const kurse = kurseFuer(standort);
  const buchungen = listBuchungen(standort);
  const offen = buchungen.filter((b) => b.status === 'neu').length;
  const kommend = termine.filter((t) => t.datum >= h && t.status === 'aktiv');
  const freiSumme = kommend.reduce((a, t) => a + t.frei, 0);
  const auslastung = kommend.length ? Math.round(100 - (freiSumme / kommend.reduce((a, t) => a + t.plaetze_gesamt, 0)) * 100) : 0;
  const ersterKurs = kurse[0];

  return (
    <>
      <AdminBar standort={standort} aktiv="termine" />
      <main className="container">
        {ok && <div className="flash" role="status">{ok}</div>}
        <h1>Kurstermine {s.name}</h1>
        <div className="kpis">
          <div className="kpi"><b>{kommend.length}</b><span>kommende Termine online</span></div>
          <div className="kpi"><b>{freiSumme}</b><span>freie Plätze gesamt</span></div>
          <div className="kpi"><b>{auslastung} %</b><span>Auslastung kommender Termine</span></div>
          <div className="kpi"><b>{offen}</b><span>Buchungen ohne Zahlungseingang</span></div>
        </div>

        <details className="card card--pad" style={{ marginBottom: 28 }} open={termine.length === 0}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 10 }}><Icon name="plus" />Neuen Termin anlegen</summary>
          <form action={neuerTermin} className="form" style={{ marginTop: 20 }}>
            <input type="hidden" name="standort" value={standort} />
            <div className="form-row">
              <div className="field"><label htmlFor="n-kurs">Kurs</label>
                <select className="select" id="n-kurs" name="kurs" defaultValue={ersterKurs?.slug}>{kurse.map((k) => <option key={k.slug} value={k.slug}>{k.name}{k.preis ? ` (${euro(k.preis)})` : ''}</option>)}</select>
              </div>
              <div className="field"><label htmlFor="n-status">Status</label>
                <select className="select" id="n-status" name="status" defaultValue="aktiv"><option value="aktiv">Aktiv – sofort online buchbar</option><option value="entwurf">Entwurf – nicht sichtbar</option></select>
              </div>
            </div>
            <div className="form-row">
              <div className="field"><label htmlFor="n-datum">Datum (Beginn)</label><input className="input" type="date" id="n-datum" name="datum" required min={h} /></div>
              <div className="field"><label htmlFor="n-bis">Ende (nur bei mehrtägigen Lehrgängen)</label><input className="input" type="date" id="n-bis" name="datum_bis" /></div>
            </div>
            <div className="form-row">
              <div className="field"><label htmlFor="n-von">Beginn</label><input className="input" type="time" id="n-von" name="start_zeit" defaultValue="08:00" /></div>
              <div className="field"><label htmlFor="n-bis-z">Ende</label><input className="input" type="time" id="n-bis-z" name="end_zeit" defaultValue="16:00" /></div>
            </div>
            <div className="form-row">
              <div className="field"><label htmlFor="n-pl">Plätze gesamt</label><input className="input" type="number" id="n-pl" name="plaetze_gesamt" min={1} max={30} defaultValue={ersterKurs?.maxTeilnehmer || 9} /></div>
              <div className="field"><label htmlFor="n-ext">Bereits vergeben (Telefon, E-Mail, Gutschein)</label><input className="input" type="number" id="n-ext" name="plaetze_extern" min={0} defaultValue={0} /></div>
            </div>
            <div className="form-row">
              <div className="field"><label htmlFor="n-preis">Preis pro Person in € inkl. MwSt.</label><input className="input" type="text" inputMode="decimal" id="n-preis" name="preis" placeholder={ersterKurs?.preis ? String(ersterKurs.preis) : 'z. B. 415'} required /><span className="field__hint">Standardpreise: {kurse.filter((k) => k.preis).map((k) => `${k.kurz} ${euro(k.preis)}`).join(' · ')}</span></div>
              <div className="field"><label htmlFor="n-doz">Dozent (optional)</label><input className="input" id="n-doz" name="dozent" list="dozenten" /><datalist id="dozenten">{s.dozenten.map((d) => <option key={d} value={d} />)}</datalist></div>
            </div>
            <div className="field"><label htmlFor="n-hinweis">Hinweis auf der Website (optional)</label><input className="input" id="n-hinweis" name="hinweis" placeholder="z. B. Termin an einem Freitag" /></div>
            <div className="form-row">
              <div className="field"><label htmlFor="n-wdh">Serie: Anzahl Termine</label><input className="input" type="number" id="n-wdh" name="wiederholen" min={1} max={26} defaultValue={1} /><span className="field__hint">1 = nur dieser Termin</span></div>
              <div className="field"><label htmlFor="n-abst">Abstand in Tagen</label><input className="input" type="number" id="n-abst" name="abstand" min={1} defaultValue={7} /></div>
            </div>
            <div><button className="btn btn--primary" type="submit"><Icon name="plus" />Termin speichern und veröffentlichen</button></div>
          </form>
        </details>

        <div className="section-head--split" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
          <h2 className="h3" style={{ margin: 0 }}>{alle ? 'Alle Termine' : 'Kommende Termine'}</h2>
          <div className="btn-row">
            <Link className="btn btn--secondary btn--sm" href={alle ? `/admin/${standort}/` : `/admin/${standort}/?alle=1`}>{alle ? 'Nur kommende' : 'Auch vergangene zeigen'}</Link>
            <a className="btn btn--secondary btn--sm" href={`/admin/${standort}/export/?typ=termine`}><Icon name="download" />CSV</a>
          </div>
        </div>
        <div className="atable-wrap">
          <table className="atable">
            <thead><tr><th>Datum</th><th>Kurs</th><th>Preis</th><th>Plätze gesamt</th><th>Extern vergeben</th><th>Online gebucht</th><th>Frei</th><th>Status</th><th>Aktionen</th></tr></thead>
            <tbody>
              {termine.length === 0 && <tr><td colSpan={9}>Noch keine Termine. Legen Sie oben den ersten Termin an.</td></tr>}
              {termine.map((t) => {
                const f = `f-${t.id}`;
                return (
                  <tr key={t.id} id={`t-${t.id}`} className={t.datum < h ? 'is-past' : ''}>
                    <td><b>{formatDatum(t.datum, { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}</b>{t.datum_bis && <><br />bis {formatDatum(t.datum_bis, { day: '2-digit', month: '2-digit' })}</>}<br /><span className="muted">{t.start_zeit}–{t.end_zeit}</span></td>
                    <td>{KURS_BY_SLUG[t.kurs]?.kurz || t.kurs}{t.dozent && <><br /><span className="muted">{t.dozent}</span></>}</td>
                    <td>{euro(t.preis_cent / 100, { cents: t.preis_cent % 100 !== 0 })}</td>
                    <td><input form={f} className="input" type="number" name="plaetze_gesamt" defaultValue={t.plaetze_gesamt} min={1} aria-label="Plätze gesamt" /></td>
                    <td><input form={f} className="input" type="number" name="plaetze_extern" defaultValue={t.plaetze_extern} min={0} aria-label="Extern vergebene Plätze" /></td>
                    <td><Link href={`/admin/${standort}/termin/${t.id}/`}>{t.gebucht}</Link></td>
                    <td><b>{t.frei}</b></td>
                    <td>
                      <select form={f} className="select" name="status" defaultValue={t.status} aria-label="Status">
                        <option value="aktiv">aktiv</option><option value="entwurf">Entwurf</option><option value="abgesagt">abgesagt</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <form id={f} action={schnellAenderung}><input type="hidden" name="standort" value={standort} /><input type="hidden" name="id" value={t.id} /><button className="btn btn--primary btn--sm" type="submit">Speichern</button></form>
                        <Link className="btn btn--secondary btn--sm" href={`/admin/${standort}/termin/${t.id}/`}><Icon name="edit" />Details</Link>
                        <form action={dupliziereTermin}><input type="hidden" name="standort" value={standort} /><input type="hidden" name="id" value={t.id} /><button className="btn btn--secondary btn--sm" type="submit" title="+7 Tage als Entwurf kopieren"><Icon name="copy" /></button></form>
                        <form action={loescheTermin}><input type="hidden" name="standort" value={standort} /><input type="hidden" name="id" value={t.id} /><button className="btn btn--secondary btn--sm" type="submit" title="Löschen (mit Buchungen: absagen)"><Icon name="trash" /></button></form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="small muted" style={{ marginTop: 16 }}>„Extern vergeben“ sind Plätze, die telefonisch, per E-Mail oder über Gutscheine belegt wurden. Freie Plätze = gesamt − extern − online gebucht. Jede Änderung ist sofort auf der Website sichtbar.</p>
      </main>
    </>
  );
}
