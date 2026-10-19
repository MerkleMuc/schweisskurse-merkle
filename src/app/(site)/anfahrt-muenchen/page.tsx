import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { STANDORTE } from '@/lib/site';
import { localBusinessLd } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/UI';
import { MapConsent } from '@/components/MapConsent';
import { LocationsViz } from '@/components/Visuals';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Anfahrt Schweißkurs München',
  description: 'Anfahrt zum Schweißkurs München: Adresse, Route mit Auto und öffentlichen Verkehrsmitteln, Parken und Hinweise für den Kurstag.',
  alternates: { canonical: '/anfahrt-muenchen/' }
};

export default function Page() {
  const s = STANDORTE.muenchen;
  return (
    <>
      <JsonLd data={localBusinessLd(s)} />
      <PageHero trail={[{ label: s.name, href: s.regionUrl }, { label: 'Anfahrt', href: s.anfahrtUrl }]} kicker="Anfahrt" title={<>Anfahrt <b>München</b></>} lead={`${s.firma}, ${s.street}, ${s.zip} ${s.city}`}
        aside={<a className="btn btn--primary btn--block" href={s.maps} target="_blank" rel="noopener"><Icon name="route" />Route in Google Maps</a>} />
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="span-7 reveal"><MapConsent query={`${s.firma}, ${s.street}, ${s.zip} ${s.city}`} title={`Karte ${s.name}`} /></div>
            <div className="span-5">
              <SectionHead kicker="Wege zu uns" title={<>Mit Auto, Bahn <b>oder Bus</b></>} />
              {s.anfahrt.map((a) => <div key={a.title} className="card card--pad reveal" style={{ marginBottom: 12 }}><h2 className="h4" style={{ marginBottom: 6 }}>{a.title}</h2><p className="small" style={{ margin: 0 }}>{a.text}</p></div>)}
              <p className="small"><Icon name="phone" className="icon" /> Fragen zur Anfahrt: <a href={s.tel.href}>{s.tel.text}</a></p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--s1">
        <div className="container">
          <div className="split" style={{ alignItems: 'center' }}>
            <div className="span-6 reveal">{s.id === 'muenchen' ? <div className="media media--43"><Image src="/images/filiale/muenchen-gebaeude.jpg" alt="Firmengebäude Merkle Schweißtechnik in München-Freiham – hier finden die Schweißkurse statt" fill sizes="(max-width: 767px) 100vw, 50vw" /></div> : <LocationsViz focus="hamburg" />}</div>
            <div className="span-6">
              <SectionHead kicker="Am Kurstag" title={<>Gut <b>ankommen</b></>} lead="Bitte seien Sie zehn Minuten vor Kursbeginn vor Ort. Bringen Sie feste Schuhe und Baumwollkleidung mit, Brillenträger ihre Brille." />
              <div className="btn-row reveal"><Link className="btn btn--primary" href={s.regionUrl + '#termine'}><Icon name="calendar" />Termine München</Link><Link className="btn btn--secondary" href="/faq/">FAQ</Link></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
