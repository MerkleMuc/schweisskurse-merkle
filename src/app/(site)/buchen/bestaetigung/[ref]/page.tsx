import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBuchung, getTermin } from '@/lib/termine';
import { checkRefToken } from '@/lib/token';
import { KURS_BY_SLUG, euro } from '@/lib/courses';
import { SITE, STANDORTE } from '@/lib/site';
import { formatDatum } from '@/lib/view';
import { Icon } from '@/components/Icon';
import { BookingFlowViz } from '@/components/Visuals';
import { ScrollToTop } from '@/components/ScrollToTop';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Buchung bestätigt', robots: { index: false, follow: false } };

export default async function Bestaetigung({ params, searchParams }: { params: Promise<{ ref: string }>; searchParams: Promise<{ t?: string }> }) {
  const { ref } = await params;
  const { t: token } = await searchParams;
  if (!checkRefToken(ref, token)) notFound();
  const b = getBuchung(ref);
  if (!b) notFound();
  const t = getTermin(b.termin_id)!;
  const k = KURS_BY_SLUG[t.kurs];
  const ort = STANDORTE[t.standort];
  const betrag = b.betrag_cent / 100;
  const paypal = process.env.PAYPAL_ME_HANDLE ? `https://www.paypal.com/paypalme/${process.env.PAYPAL_ME_HANDLE}/${betrag.toFixed(2)}EUR` : null;

  return (
    <section className="section section--mesh-s1 page-top">
      <ScrollToTop />
      <div className="container">
        <div className="split">
          <div className="span-7">
            <p className="kicker">Buchung {b.ref}</p>
            <h1>Vielen Dank, Ihr Platz ist <b>reserviert.</b></h1>
            <p className="lead">Wir haben Ihre verbindliche Buchung erhalten und eine Bestätigung an <b>{b.email}</b> gesendet. Jetzt fehlt nur noch die Zahlung.</p>

            <div className="card card--pad" style={{ marginTop: 32 }}>
              <h2 className="h3" style={{ marginTop: 0 }}>Nächster Schritt: Zahlung über {euro(betrag, { cents: true })}</h2>
              {b.zahlungsart === 'paypal' ? (
                <>
                  <p>Sie haben PayPal gewählt. Bitte geben Sie bei der Zahlung die Buchungsnummer <b>{b.ref}</b> an.</p>
                  {paypal
                    ? <a className="btn btn--primary" href={paypal} target="_blank" rel="noopener"><Icon name="paypal" />Jetzt {euro(betrag, { cents: true })} mit PayPal zahlen</a>
                    : <p className="notice"><Icon name="info" /><span>Den PayPal-Zahlungslink senden wir Ihnen in Kürze per E-Mail.</span></p>}
                </>
              ) : (
                <>
                  <p>Sie haben Vorkasse gewählt. Bitte überweisen Sie den Betrag innerhalb von 7 Tagen, spätestens jedoch vor Kursbeginn.</p>
                  <dl className="facts">
                    <div><dt>Empfänger</dt><dd>{process.env.BANK_KONTOINHABER || SITE.legalName}</dd></div>
                    <div><dt>IBAN</dt><dd>{process.env.BANK_IBAN || 'folgt mit der Rechnung'}</dd></div>
                    {process.env.BANK_BIC && <div><dt>BIC</dt><dd>{process.env.BANK_BIC}</dd></div>}
                    <div><dt>Verwendungszweck</dt><dd>{b.ref}</dd></div>
                    <div><dt>Betrag</dt><dd>{euro(betrag, { cents: true })}</dd></div>
                  </dl>
                </>
              )}
            </div>
            <div style={{ marginTop: 28 }}><BookingFlowViz /></div>
          </div>
          <aside className="span-5">
            <div className="summary">
              <div className="summary__head on-dark"><p className="kicker" style={{ marginBottom: 10 }}>Ihr Kurs</p><h2>{k?.name}</h2><span className="small">{ort.firma}</span></div>
              <dl>
                <div><dt>Datum</dt><dd>{formatDatum(t.datum)}</dd></div>
                <div><dt>Uhrzeit</dt><dd>{t.start_zeit} – {t.end_zeit} Uhr</dd></div>
                <div><dt>Ort</dt><dd>{ort.street}, {ort.zip} {ort.city}</dd></div>
                <div><dt>Teilnehmer</dt><dd>{b.teilnehmer.map((p) => `${p.vorname} ${p.nachname}`).join(', ')}</dd></div>
              </dl>
              <div className="summary__total"><span>Gesamt inkl. MwSt.</span><b>{euro(betrag, { cents: true })}</b></div>
              <div style={{ padding: '0 24px 24px', display: 'grid', gap: 10 }}>
                <Link className="btn btn--secondary btn--block" href={ort.anfahrtUrl}><Icon name="route" />Anfahrt planen</Link>
                <Link className="btn btn--secondary btn--block" href="/faq/"><Icon name="info" />Was muss ich mitbringen?</Link>
                <Link className="small" href={`/vertrag-widerrufen/?ref=${b.ref}`}>Vertrag widerrufen</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
