import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, SectionHead, CtaBand } from '@/components/UI';
import { VideoFacade } from '@/components/VideoFacade';
import { JsonLd } from '@/components/JsonLd';
import { videoLd } from '@/lib/schema';
import { SITE, VIDEOS } from '@/lib/site';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'MERKLE VIDEOTHEK für deinen Lehrgang',
  description: 'Die Merkle Videothek: Videos zu Schweißkurs, Lehrgang und Ausbildung – Elektrode, Plasma, Autogen, MIG/MAG und WIG.',
  alternates: { canonical: '/lehrbuch/' }
};

const THEMEN = [
  { t: 'MIG/MAG-Schweißen: Video-Anleitung', h: '/ratgeber/schweissanleitung/mig-mag-schweissen-video-anleitung/' },
  { t: 'WIG (TIG)-Schweißen: Video-Anleitung', h: '/wig-tig-schweisen-video-anleitung/' },
  { t: 'Kehlnaht-Schweißen', h: '/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/kehlnaht-schweissen/' },
  { t: 'Intervall- und Punktschweißen', h: '/ratgeber/schweissanleitung/intervallschweissen-punktschweissen/' },
  { t: 'Haltung beim Schweißen', h: '/ratgeber/schweissanleitung/haltung-beim-schweissen/' },
  { t: 'DVDs zum Schweißen-Lernen', h: '/ratgeber/dvd-schweissen-lernen/' }
];

export default function Page() {
  return (
    <>
      <JsonLd data={VIDEOS.map(videoLd)} />
      <PageHero trail={[{ label: 'Videothek', href: '/lehrbuch/' }]} kicker="Merkle Videothek" title={<>Videos für deinen <b>Lehrgang</b></>} lead="Hier findest du unsere Videos zu deinem Schweißkurs, Lehrgang und deiner Ausbildung – zum Vorbereiten und Nachschauen." />
      <section className="section">
        <div className="container">
          <div className="grid grid-3">{VIDEOS.map((v) => <figure key={v.id} className="reveal" style={{ margin: 0 }}><VideoFacade id={v.id} title={v.title} /><figcaption style={{ marginTop: 12 }}><b style={{ color: 'var(--ink)', fontWeight: 500 }}>{v.title}</b><br /><span className="small muted">{v.text}</span></figcaption></figure>)}</div>
          <p style={{ marginTop: 24 }}><a className="btn btn--secondary" href={SITE.youtube} target="_blank" rel="noopener"><Icon name="youtube" />Alle Videos auf YouTube</a></p>
        </div>
      </section>
      <section className="section section--s1">
        <div className="container">
          <SectionHead kicker="Anleitungen" title={<>Video-Anleitungen im <b>Ratgeber</b></>} />
          <div className="grid grid-3">{THEMEN.map((x) => <Link key={x.h} href={x.h} className="card card--link card--pad reveal" style={{ gap: 8 }}><Icon name="video" /><b style={{ color: 'var(--ink)', fontWeight: 500 }}>{x.t}</b><span className="textlink">Ansehen<Icon name="arrowRight" /></span></Link>)}</div>
        </div>
      </section>
      <CtaBand title={<>Vom Video <b>an den Brenner</b></>} text="Im Kurs zeigen wir es Ihnen live am eigenen Schweißplatz." primary={{ label: 'Termine', href: '/termine-und-anmeldungen/' }} />
    </>
  );
}
