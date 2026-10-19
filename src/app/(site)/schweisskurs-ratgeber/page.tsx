import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, SectionHead } from '@/components/UI';
import { KursFinder } from '@/components/KursFinder';
import { MatrixViz } from '@/components/Visuals';

export const metadata: Metadata = {
  title: 'Schweißkurs-Ratgeber: Welcher Kurs passt zu mir?',
  description: 'Welcher Schweißkurs passt? Kursfinder und Übersicht: Autobleche, Geländer aus Edelstahl, Aluminium, Montage oder Schweißerpass – das richtige Verfahren und der passende Kurs.',
  alternates: { canonical: '/schweisskurs-ratgeber/' }
};

const TABELLE = [
  ['Autobleche, Karosserie, Dünnblech', 'MIG/MAG', '/mig-mag-einsteiger-schweisskurs/'],
  ['Anhänger, Gartentor, Stahlbau im Hobby', 'MIG/MAG', '/mig-mag-einsteiger-schweisskurs/'],
  ['Treppenhandläufe und Geländer aus Edelstahl', 'WIG', '/wig-einsteiger-schweisskurs/'],
  ['Aluminium: Boot, Rahmen, Behälter', 'WIG-Alu (Aufbau)', '/wig-alu-aufbau-schweisskurs/'],
  ['Landmaschinen, Montage im Freien', 'Elektrode', '/elektroden-einsteiger-schweisskurs/'],
  ['Oldtimer, Rohre, Heizung', 'Autogen / Flammlöten', '/autogen-einsteiger-schweisskurs/'],
  ['Tragende, prüfpflichtige Bauteile', 'Lehrgang mit Prüfung', '/tuev-gepruefter-schweisskurs/']
];

export default function Page() {
  return (
    <>
      <PageHero trail={[{ label: 'Schweißkurs-Ratgeber', href: '/schweisskurs-ratgeber/' }]} kicker="Kursfinder" title={<>Welcher Schweißkurs <b>passt zu mir?</b></>} lead="Drei Fragen, eine Empfehlung. Oder schauen Sie direkt in die Tabelle, welches Verfahren zu Ihrer Schweißaufgabe passt." />
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="span-7"><KursFinder /></div>
            <div className="span-5">
              <SectionHead kicker="Aufgabe → Kurs" title={<>Schnell <b>zugeordnet</b></>} />
              <table className="atable reveal">
                <thead><tr><th>Schweißaufgabe</th><th>Kurs</th></tr></thead>
                <tbody>{TABELLE.map(([a, k, h]) => <tr key={a}><td>{a}</td><td><Link href={h}>{k}</Link></td></tr>)}</tbody>
              </table>
              <p className="small muted" style={{ marginTop: 12 }}>Bei tragenden Teilen empfehlen wir ausdrücklich, nur geprüfte Schweißer zu beauftragen.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--s1"><div className="container"><div className="reveal"><MatrixViz /></div></div></section>
    </>
  );
}
