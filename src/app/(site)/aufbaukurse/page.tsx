import type { Metadata } from 'next';
import { kursCards } from '@/lib/cards';
import { PageHero, SectionHead, CtaBand } from '@/components/UI';
import { CourseFilter } from '@/components/CourseFilter';
import { PathViz, PositionsViz, ValidityViz } from '@/components/Visuals';

export const revalidate = 300;
export const metadata: Metadata = {
  title: 'Aufbaukurse mit Prüfung – Alu-WIG, Pulse-Arc, MAG Fortgeschritten',
  description: 'Aufbau-Schweißkurse bei Merkle in München: WIG-Alu, MAG für Fortgeschrittene, Pulse-Arc und Lehrgänge für prüfpflichtige Bauteile mit Schweißerprüfung nach DIN EN ISO 9606-1.',
  alternates: { canonical: '/aufbaukurse/' }
};

export default function Page() {
  return (
    <>
      <PageHero trail={[{ label: 'Schweißkurse', href: '/schweisskurse-lehrgaenge/' }, { label: 'Aufbaukurse', href: '/aufbaukurse/' }]} kicker="Weiter lernen" title={<>Aufbaukurse <b>mit Prüfung</b></>}
        lead="Wir bieten Aufbau-Schweißkurse für das WIG-Schweißen von Aluminium, für Fortgeschrittene im MAG-Schweißen und für das Impulsschweißen – sowie Lehrgänge für prüfpflichtige Bauteile inklusive Schweißerprüfung." />
      <section className="section"><div className="container"><h2 className="sr-only">Aufbaukurse und Lehrgänge</h2><CourseFilter kurse={kursCards((k) => k.level !== 'Einsteiger')} /></div></section>
      <section className="section section--s1">
        <div className="container">
          <SectionHead kicker="Prüfung" title={<>Was die Schweißerprüfung <b>bedeutet</b></>} lead="Bei der Prüfung nach DIN EN ISO 9606-1 schweißen Sie Prüfstücke in festgelegten Positionen. Bestanden, gilt der Schweißerpass drei Jahre." />
          <div className="grid grid-2"><div className="reveal"><PositionsViz /></div><div className="reveal"><ValidityViz /></div></div>
          <div className="reveal" style={{ marginTop: 20 }}><PathViz /></div>
        </div>
      </section>
      <CtaBand title={<>Zur <b>Prüfung</b> in fünf Tagen</>} text="Lehrgang mit Prüfung nach DIN EN ISO 9606-1 in München – MAG / WIG ab 1.775 €." primary={{ label: 'Zum Lehrgang', href: '/tuev-gepruefter-schweisskurs/' }} secondary={{ label: 'Alle Termine', href: '/termine-und-anmeldungen/' }} />
    </>
  );
}
