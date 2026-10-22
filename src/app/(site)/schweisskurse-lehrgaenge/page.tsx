import type { Metadata } from 'next';
import Link from 'next/link';
import { KURSE, euro } from '@/lib/courses';
import { kursCards } from '@/lib/cards';
import { PageHero, SectionHead, CtaBand } from '@/components/UI';
import { CourseFilter } from '@/components/CourseFilter';
import { PathViz, MatrixViz } from '@/components/Visuals';
import { FaqSection } from '@/components/Sections';
import { JsonLd } from '@/components/JsonLd';
import { absUrl } from '@/lib/site';

export const revalidate = 300;
export const metadata: Metadata = {
  title: { absolute: 'Schweißkurse & Lehrgänge im Überblick – alle Kurse vergleichen | Merkle' },
  description: 'Alle Schweißkurse und Schweißlehrgänge von Merkle im Vergleich: Einsteiger, Aufbau, Fortgeschrittene und Lehrgänge mit Prüfung nach DIN EN ISO 9606-1. Nach Standort, Verfahren und Niveau filtern.',
  alternates: { canonical: '/schweisskurse-lehrgaenge/' }
};

export default async function Page() {
  const cards = await kursCards();
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: KURSE.map((k, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(`/${k.slug}/`), name: k.name })) }} />
      <PageHero trail={[{ label: 'Schweißkurse & Lehrgänge', href: '/schweisskurse-lehrgaenge/' }]} kicker="Gesamtübersicht" title={<>Schweißkurse & <b>Lehrgänge</b></>}
        lead="Vom eintägigen Hobbykurs bis zum Lehrgang mit zertifizierter Prüfung. Hobbykurse schließen mit einer Teilnahmebescheinigung ab – für prüfpflichtige Arbeiten brauchen Sie den Lehrgang mit Prüfung." />
      <section className="section">
        <div className="container"><h2 className="sr-only">Alle Kurse</h2><CourseFilter kurse={cards} /></div>
      </section>
      <section className="section section--s1">
        <div className="container">
          <SectionHead kicker="Vergleich" title={<>Alle Kurse <b>auf einen Blick</b></>} />
          <div className="atable-wrap reveal">
            <table className="atable" style={{ fontSize: '.9375rem' }}>
              <caption className="sr-only">Vergleich aller Schweißkurse</caption>
              <thead><tr><th scope="col">Kurs</th><th scope="col">Niveau</th><th scope="col">Dauer</th><th scope="col">Gruppe</th><th scope="col">Standort</th><th scope="col">Preis</th></tr></thead>
              <tbody>{KURSE.map((k) => <tr key={k.slug}><th scope="row" style={{ background: 'none', textTransform: 'none', letterSpacing: 0, fontSize: '.9375rem', fontWeight: 500 }}><Link href={`/${k.slug}/`}>{k.name}</Link></th><td>{k.level}</td><td>{k.dauer}</td><td>max. {k.maxTeilnehmer}</td><td>{k.standorte.map((s) => (s === 'muenchen' ? 'München' : 'Region Hamburg')).join(', ')}</td><td>{k.preis ? euro(k.preis) : k.preisHinweis}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-2"><div className="reveal"><PathViz /></div><div className="reveal"><MatrixViz /></div></div>
        </div>
      </section>
      <FaqSection cats={['Kurse', 'Prüfung']} tone="s2" />
      <CtaBand title={<>Noch unsicher, welcher <b>Kurs passt?</b></>} text="Der Kursfinder empfiehlt Ihnen in drei Fragen den passenden Kurs." primary={{ label: 'Termine ansehen', href: '/termine-und-anmeldungen/' }} secondary={{ label: 'Kursfinder starten', href: '/schweisskurs-ratgeber/' }} />
    </>
  );
}
