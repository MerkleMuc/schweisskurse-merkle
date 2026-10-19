import type { Metadata } from 'next';
import Link from 'next/link';
import { kommendeTermine } from '@/lib/termine';
import { KURS_BY_SLUG } from '@/lib/courses';
import { toView, KURSE_MINI } from '@/lib/view';
import { eventLd } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead, Steps } from '@/components/UI';
import { TerminExplorer } from '@/components/TerminExplorer';
import { BookingFlowViz, LocationsViz } from '@/components/Visuals';
import { FaqSection } from '@/components/Sections';
import { Icon } from '@/components/Icon';

export const revalidate = 300;
export const metadata: Metadata = {
  title: { absolute: 'Termine & Anmeldung – Schweißkurse München & Hamburg | Merkle' },
  description: 'Alle Schweißkurs-Termine in München und der Region Hamburg im Kalender: nach Standort, Verfahren und freien Plätzen filtern und den Kursplatz direkt online buchen.',
  alternates: { canonical: '/termine-und-anmeldungen/' }
};

export default function Page() {
  const termine = kommendeTermine();
  return (
    <>
      <JsonLd data={termine.slice(0, 30).map((t) => eventLd(KURS_BY_SLUG[t.kurs], t))} />
      <PageHero trail={[{ label: 'Termine & Anmeldung', href: '/termine-und-anmeldungen/' }]} kicker="Terminkalender" title={<>Termine & <b>Anmeldung</b></>}
        lead="Alle Kurstermine in München und der Region Hamburg auf einen Blick. Filtern Sie nach Standort, Verfahren und Niveau, klicken Sie einen Tag im Kalender an und buchen Sie Ihren Platz in wenigen Schritten."
        aside={<div style={{ display: 'grid', gap: 10 }}><Link className="btn btn--secondary btn--block" href="/region-muenchen/#termine"><Icon name="pin" />Nur München</Link><Link className="btn btn--secondary btn--block" href="/region-hamburg/#termine"><Icon name="pin" />Nur Region Hamburg</Link></div>} />
      <section className="section" id="termine">
        <div className="container">
          <h2 className="sr-only">Alle Kurstermine</h2>
          <TerminExplorer initial={termine.map(toView)} kurse={KURSE_MINI} />
        </div>
      </section>
      <section className="section section--s1">
        <div className="container">
          <div className="split" style={{ alignItems: 'center' }}>
            <div className="span-7">
              <SectionHead kicker="So funktioniert's" title={<>Buchen in <b>fünf Schritten</b></>} lead="Mit dem Absenden ist Ihr Platz verbindlich reserviert. Danach bezahlen Sie per PayPal oder Überweisung." />
              <Steps items={[
                { title: 'Termin wählen', text: 'Im Kalender oder in der Liste.' },
                { title: 'Daten eingeben', text: 'Firma oder privat, Rechnung und Teilnehmer.' },
                { title: 'Verbindlich buchen', text: 'Zahlungspflichtig – mit AGB und Widerrufsbelehrung.' },
                { title: 'Bezahlen', text: 'PayPal oder Vorkasse.' }
              ]} />
            </div>
            <div className="span-5 reveal"><LocationsViz /></div>
          </div>
          <div className="reveal" style={{ marginTop: 40 }}><BookingFlowViz /></div>
        </div>
      </section>
      <FaqSection cats={['Buchung & Zahlung', 'Standorte']} />
    </>
  );
}
