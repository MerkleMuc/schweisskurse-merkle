import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero, SectionHead, CtaBand } from '@/components/UI';
import { FilialeMuenchen, KursraumDozenten, VideosSection, StandorteSection } from '@/components/Sections';
import { Icon } from '@/components/Icon';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Wir über uns – Merkle Schweißkurse beim Fachhandel',
  description: 'Merkle Schweißkurse sind ein Angebot der Wilhelm Merkle Schweißtechnik GmbH – seit über 50 Jahren Fachhandel für Schweiß- und Schneidtechnik. Kursraum, Dozenten und Standorte in München und Hamburg.',
  alternates: { canonical: '/wir-ueber-uns/' }
};

export default function Page() {
  return (
    <>
      <PageHero trail={[{ label: 'Wir über uns', href: '/wir-ueber-uns/' }]} kicker="Wir über uns" title={<>Schweißen lernen <b>beim Fachhandel</b></>}
        lead="Merkle Schweißkurse sind ein Angebot der Wilhelm Merkle Schweißtechnik GmbH. Seit über 50 Jahren beraten wir Handwerk, Industrie und Heimwerker rund um das Schweißen und Schneiden – die Kurse werden von erfahrenen Schweißspezialisten aus dem Hause Merkle geleitet." />
      <section className="section">
        <div className="container">
          <div className="split" style={{ alignItems: 'center' }}>
            <div className="span-6 reveal"><div className="media media--43"><Image src="/images/team/team-muenchen.jpg" alt="Das Team von Merkle Schweißtechnik vor dem Firmengebäude in München" fill sizes="(max-width: 767px) 100vw, 50vw" /></div></div>
            <div className="span-6">
              <SectionHead kicker="Warum Merkle" title={<>Kurs, Beratung und Gerät <b>aus einer Hand</b></>} />
              <ul className="list-check reveal">
                <li>Dozenten aus der Praxis, die täglich mit Schweißtechnik arbeiten</li>
                <li>Aktuelle Anlagen aus dem Sortiment des Fachhandels</li>
                <li>Kleine Gruppen, eigener Schweißplatz, 75 % Praxis</li>
                <li>Nach dem Kurs: Beratung zum passenden Gerät im Ladengeschäft</li>
              </ul>
              <div className="btn-row reveal" style={{ marginTop: 24 }}><a className="btn btn--secondary" href={SITE.mutter} rel="noopener">merkle-muenchen.de<Icon name="arrowUpRight" /></a><a className="btn btn--secondary" href={SITE.shop} rel="noopener">Merkle-Shop<Icon name="arrowUpRight" /></a></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--s1" id="vorteile">
        <div className="container">
          <SectionHead kicker="Ihr Kursvorteil" title={<>25 % zurück beim <b>Gerätekauf</b></>} lead="Bei einem Anlagenkauf ab 1.250 € erhalten Sie einen Nachlass in Höhe von 25 % auf den Schweißkurspreis – sofern der Kurs in München absolviert wurde. Ausgenommen sind die Wochen-Schweißkurse mit anschließender TÜV-Prüfung." />
          <Link className="btn btn--primary" href="/termine-und-anmeldungen/"><Icon name="calendar" />Kurs buchen</Link>
        </div>
      </section>
      <FilialeMuenchen />
      <KursraumDozenten />
      <StandorteSection />
      <VideosSection />
      <CtaBand title={<>Lernen Sie uns <b>kennen</b></>} text="Am besten an Ihrem ersten Kurstag." primary={{ label: 'Termine', href: '/termine-und-anmeldungen/' }} secondary={{ label: 'Kontakt', href: '/kontakt/' }} />
    </>
  );
}
