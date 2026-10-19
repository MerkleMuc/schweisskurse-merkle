import type { Metadata } from 'next';
import { FAQ } from '@/lib/faq';
import { PageHero, Faq, SectionHead, CtaBand } from '@/components/UI';
import { JsonLd } from '@/components/JsonLd';
import { faqLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'FAQ – Häufige Fragen zu den Schweißkursen',
  description: 'Antworten auf häufige Fragen: Preise, Voraussetzungen, Ablauf, Zahlung, Stornierung, Gutscheine, Schweißerpass und Kursorte der Merkle Schweißkurse in München und Hamburg.',
  alternates: { canonical: '/faq/' }
};

export default function Page() {
  const cats = Array.from(new Set(FAQ.map((f) => f.cat)));
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero trail={[{ label: 'FAQ', href: '/faq/' }]} kicker="FAQ" title={<>Häufige <b>Fragen</b></>} lead="Alles Wichtige vor der Buchung. Ihre Frage ist nicht dabei? Rufen Sie uns an oder schreiben Sie uns." />
      {cats.map((c, i) => (
        <section key={c} className={`section${i % 2 ? ' section--s1' : ''}`} id={c.toLowerCase().replace(/[^a-z]+/g, '-')}>
          <div className="container">
            <div className="split">
              <div className="span-4"><SectionHead kicker={`${i + 1} / ${cats.length}`} title={c} /></div>
              <div className="span-8"><Faq items={FAQ.filter((f) => f.cat === c)} withLd={false} /></div>
            </div>
          </div>
        </section>
      ))}
      <CtaBand title={<>Noch eine <b>Frage?</b></>} text="Wir beraten Sie persönlich – telefonisch oder per Nachricht." primary={{ label: 'Termine', href: '/termine-und-anmeldungen/' }} secondary={{ label: 'Kontakt', href: '/kontakt/' }} />
    </>
  );
}
