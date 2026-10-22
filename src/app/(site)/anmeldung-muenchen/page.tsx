import type { Metadata } from 'next';
import Link from 'next/link';
import { STANDORTE } from '@/lib/site';
import { kommendeTermine } from '@/lib/termine';
import { toView, KURSE_MINI } from '@/lib/view';
import { PageHero, SectionHead, Steps } from '@/components/UI';
import { TerminExplorer } from '@/components/TerminExplorer';
import { BookingFlowViz } from '@/components/Visuals';
import { Icon } from '@/components/Icon';
import { FaqSection } from '@/components/Sections';

export const revalidate = 300;
export const metadata: Metadata = {
  title: 'Anmeldung Schweißkurs München',
  description: 'Online-Anmeldung für Schweißkurse in München: Termin im Kalender wählen, Daten eingeben, verbindlich buchen. Ihr Kursplatz wird sofort für Sie reserviert.',
  alternates: { canonical: '/anmeldung-muenchen/' }
};

export default async function Page() {
  const s = STANDORTE.muenchen;
  const termine = await kommendeTermine({ standort: 'muenchen' });
  return (
    <>
      <PageHero trail={[{ label: s.name, href: s.regionUrl }, { label: 'Anmeldung', href: s.anmeldungUrl }]} kicker="Online-Anmeldung" title={<>Anmeldung <b>München</b></>}
        lead="Über die Online-Anmeldung buchen Sie Ihren Kursplatz direkt. Ihre Angaben gehen sofort an die zuständigen Mitarbeiter, der Kursplatz wird umgehend für Sie belegt. Anschließend erhalten Sie die Auftragsbestätigung und die Rechnung."
        aside={<div className="card card--pad"><p className="kicker">Lieber persönlich?</p><a className="btn btn--primary btn--block" href={s.tel.href}><Icon name="phone" />{s.tel.text}</a><p className="small muted" style={{ margin: '12px 0 0' }}>{s.firma}<br />{s.street}, {s.zip} {s.city}</p></div>} />
      <section className="section" id="termine">
        <div className="container">
          <h2 className="sr-only">Kurstermine</h2>
          <TerminExplorer initial={termine.map(toView)} kurse={KURSE_MINI} standort="muenchen" />
        </div>
      </section>
      <section className="section section--s1">
        <div className="container">
          <SectionHead kicker="Ablauf der Buchung" title={<>Fünf Schritte zu Ihrem <b>Kursplatz</b></>} />
          <div className="reveal"><BookingFlowViz /></div>
          <div style={{ marginTop: 40 }}>
            <Steps items={[
              { title: 'Teilnehmerzahl', text: 'Wie viele Personen kommen mit?' },
              { title: 'Rechnung', text: 'Privatperson oder Firma, Rechnungsadresse.' },
              { title: 'Teilnehmer', text: 'Identisch mit Rechnungsempfänger oder abweichend.' },
              { title: 'Zahlungspflichtig buchen', text: 'AGB, Widerrufsbelehrung, Zahlung per PayPal oder Vorkasse.' }
            ]} />
          </div>
          <div className="notice reveal" style={{ marginTop: 32 }}><Icon name="info" /><p>Stornierungen nehmen wir schriftlich per E-Mail oder Post an: bei Tageskursen bis 14 Tage, bei Wochenend- und Wochenlehrgängen bis vier Wochen vor Kursbeginn. Details in den <Link href="/agb/">AGB</Link> und der <Link href="/widerruf/">Widerrufsbelehrung</Link>.</p></div>
        </div>
      </section>
      <FaqSection cats={['Buchung & Zahlung']} />
    </>
  );
}
