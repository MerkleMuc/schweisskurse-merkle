import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero, CtaBand } from '@/components/UI';

export const metadata: Metadata = {
  title: 'Galerie – Bilder aus Kurs und Filiale',
  description: 'Bilder aus den Schweißkursen und der Filiale von Merkle Schweißtechnik in München-Freiham: Kursbereich, Ladengeschäft, Ausstellung und Team.',
  alternates: { canonical: '/galerie/' }
};

const BILDER = [
  { src: '/images/filiale/muenchen-gebaeude.jpg', alt: 'Firmengebäude von Merkle Schweißtechnik in München-Freiham', cls: 'm-wide' },
  { src: '/images/kurse/wig-brenner-rotlicht.jpg', alt: 'WIG-Brenner mit Keramikdüse vor rotem Schweißvorhang', cls: 'm-tall' },
  { src: '/images/kurse/funkenflug-werkstueck.jpg', alt: 'Funkenflug beim Schweißen an einem Stahlwerkstück', cls: '' },
  { src: '/images/kurse/schweisser-portrait.jpg', alt: 'Schweißer mit Schweißhelm und Brenner in der Werkstatt', cls: '' },
  { src: '/images/filiale/muenchen-laden-innen.jpg', alt: 'Verkaufsraum mit Schweißgeräten und Schweißhelmen', cls: '' },
  { src: '/images/filiale/muenchen-ausstellung.jpg', alt: 'Ausstellung von Schweißanlagen im Ladengeschäft', cls: 'm-wide' },
  { src: '/images/filiale/muenchen-laden-eingang.jpg', alt: 'Eingangsbereich des Ladengeschäfts mit Schutzausrüstung', cls: '' },
  { src: '/images/filiale/muenchen-empfang.jpg', alt: 'Empfangstheke mit Kaffeeautomat im Ladengeschäft', cls: '' },
  { src: '/images/filiale/muenchen-gaslager.jpg', alt: 'Gaslager mit Flaschenregalen vor dem Gebäude', cls: 'm-tall' },
  { src: '/images/filiale/muenchen-einfahrt.jpg', alt: 'Einfahrt und Parkplatz vor dem Merkle-Gebäude', cls: '' },
  { src: '/images/filiale/beratung-schweisshelm.jpg', alt: 'Beratung zu Schweißhelmen am Verkaufstresen', cls: '' },
  { src: '/images/team/team-muenchen.jpg', alt: 'Das Team von Merkle Schweißtechnik München', cls: 'm-wide' },
  { src: '/images/kurse/funkenflug-tuerkis.jpg', alt: 'Lichtbogen und Funken in türkisfarbenem Licht', cls: '' },
  { src: '/images/team/team-muenchen-2.jpg', alt: 'Teil des Merkle-Teams im Ladengeschäft', cls: '' }
];

export default function Page() {
  return (
    <>
      <PageHero trail={[{ label: 'Galerie', href: '/galerie/' }]} kicker="Galerie" title={<>Einblicke in Kurs <b>und Filiale</b></>} lead="So sieht es bei uns in München-Freiham aus – vom Kursbereich über das Ladengeschäft bis zum Gaslager." />
      <section className="section">
        <div className="container">
          <div className="mosaic">
            {BILDER.map((b) => <figure key={b.src} className={`media reveal ${b.cls}`} style={{ margin: 0 }}><Image src={b.src} alt={b.alt} fill sizes="(max-width: 767px) 100vw, 50vw" /></figure>)}
          </div>
        </div>
      </section>
      <CtaBand title={<>Selbst <b>dabei sein</b></>} text="Buchen Sie Ihren Platz im nächsten Kurs." primary={{ label: 'Termine', href: '/termine-und-anmeldungen/' }} />
    </>
  );
}
