import type { Metadata } from 'next';
import { KURSE } from '@/lib/courses';
import { PageHero, SectionHead, Steps } from '@/components/UI';
import { GutscheinForm } from '@/components/GutscheinForm';
import { FaqSection } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'Schweißkurs-Gutschein bestellen – die Geschenkidee',
  description: 'Einen Schweißkurs verschenken: personalisierter Gutschein für MAG-, WIG-, E-Hand- oder Alu-WIG-Kurse in München. Der Termin ist frei wählbar.',
  alternates: { canonical: '/gutschein-bestellen/' }
};

export default function Page() {
  const kurse = KURSE.filter((k) => k.preis && k.standorte.includes('muenchen') && k.tage === 1).map((k) => ({ slug: k.slug, name: k.name, preis: k.preis! }));
  return (
    <>
      <PageHero trail={[{ label: 'Gutschein bestellen', href: '/gutschein-bestellen/' }]} kicker="Geschenkidee" title={<>Einen Schweißkurs <b>verschenken</b></>} lead="Personalisierter Gutschein für die Kurse in München – die beschenkte Person wählt ihren Termin später selbst." />
      <section className="section"><div className="container"><GutscheinForm kurse={kurse} /></div></section>
      <section className="section section--s1">
        <div className="container">
          <SectionHead kicker="So funktioniert's" title={<>In drei Schritten zum <b>Gutschein</b></>} />
          <Steps items={[
            { title: 'Kurs wählen', text: 'MAG, WIG, Elektrode, Alu-WIG oder Autogen.' },
            { title: 'Bezahlen', text: 'Sie erhalten die Zahlungsinformationen per E-Mail.' },
            { title: 'Gutschein erhalten', text: 'Personalisiert auf den Namen der beschenkten Person.' },
            { title: 'Termin einlösen', text: 'Wunschtermin telefonisch oder per E-Mail reservieren.' }
          ]} />
        </div>
      </section>
      <FaqSection cats={['Buchung & Zahlung']} />
    </>
  );
}
