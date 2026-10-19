import type { Metadata } from 'next';
import { PageHero, SectionHead, CtaBand } from '@/components/UI';
import { ReviewsSection, VideosSection } from '@/components/Sections';
import { Icon } from '@/components/Icon';
import { GOOGLE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kundenstimmen & Bewertungen zu den Schweißkursen',
  description: 'Was Teilnehmer über die Merkle Schweißkurse sagen: Google-Bewertungen (4,8 von 5) und Videos aus Kurs und Filiale.',
  alternates: { canonical: '/referenzen/' }
};

export default function Page() {
  return (
    <>
      <PageHero trail={[{ label: 'Kundenstimmen', href: '/referenzen/' }]} kicker="Kundenstimmen" title={<>Was unsere Teilnehmer <b>sagen</b></>} lead={`Merkle Schweißtechnik München wird bei Google mit ${GOOGLE.rating} von 5 Sternen bewertet (${GOOGLE.count} Bewertungen). Hier finden Sie die Stimmen, die sich auf die Schweißkurse beziehen.`} />
      <ReviewsSection tone="s0" />
      <section className="section section--s1">
        <div className="container">
          <SectionHead kicker="Ihre Meinung zählt" title={<>Waren Sie schon <b>bei uns im Kurs?</b></>} lead="Wir freuen uns über Ihre Bewertung bei Google – sie hilft anderen bei der Entscheidung." />
          <a className="btn btn--primary" href={GOOGLE.writeUrl} target="_blank" rel="noopener"><Icon name="star" />Jetzt bewerten</a>
        </div>
      </section>
      <VideosSection />
      <CtaBand title={<>Überzeugt? <b>Platz sichern.</b></>} text="Freie Termine in München und der Region Hamburg." primary={{ label: 'Termine', href: '/termine-und-anmeldungen/' }} />
    </>
  );
}
