import type { Metadata } from 'next';
import Link from 'next/link';
import { KURSE } from '@/lib/courses';
import { PageHero, SectionHead, CtaBand } from '@/components/UI';
import { RatioViz, DayClockViz, JointsViz, TorchAngleViz, ShieldGasViz } from '@/components/Visuals';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Lerninhalte der Schweißkurse – was Sie lernen',
  description: 'Lerninhalte der Merkle Schweißkurse: Theorie und Praxis im Verhältnis 25:75, eigener Schweißplatz, Inhalte je Kurs von MIG/MAG über WIG bis zur Prüfung nach DIN EN ISO 9606-1.',
  alternates: { canonical: '/lerninhalte/' }
};

export default function Page() {
  return (
    <>
      <PageHero trail={[{ label: 'Lerninhalte', href: '/lerninhalte/' }]} kicker="Lerninhalte" title={<>Was Sie in unseren Kursen <b>lernen</b></>}
        lead="Jede Teilnehmerin und jeder Teilnehmer hat einen eigenen Schweißplatz. Bei den ganztägigen MAG-, WIG- und E-Kursen sowie bei den Wochenlehrgängen sind Getränke und Mittagessen inklusive." />
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            <div className="reveal"><RatioViz /></div>
            <div className="reveal"><DayClockViz /></div>
            <div className="card card--pad reveal">
              <p className="kicker">Wichtig</p>
              <p>Nach dem Einsteiger-Kurs dürfen keine Arbeiten nach EN 1090 ausgeführt werden. Dafür ist eine zertifizierte Prüfung nötig.</p>
              <Link className="textlink" href="/tuev-gepruefter-schweisskurs/">Lehrgang mit Prüfung<Icon name="arrowRight" /></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--s1">
        <div className="container">
          <SectionHead kicker="Je Kurs" title={<>Inhalte nach <b>Kurs</b></>} />
          <div className="grid grid-2">
            {KURSE.map((k) => (
              <article key={k.slug} className="card card--pad reveal" style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
                <div className="card__meta"><span className="chip chip--teal">{k.level}</span><span className="chip">{k.dauer}</span></div>
                <h2 className="h3" style={{ margin: 0 }}><Link href={`/${k.slug}/`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>{k.name}</Link></h2>
                <ul className="list-check small">{k.inhalte.map((i) => <li key={i}>{i}</li>)}</ul>
                <Link className="textlink" href={`/${k.slug}/#termine`}>Termine<Icon name="arrowRight" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead kicker="Grundlagen" title={<>Drei Dinge, die Sie <b>am ersten Tag</b> lernen</>} />
          <div className="grid grid-3"><div className="reveal"><JointsViz /></div><div className="reveal"><TorchAngleViz /></div><div className="reveal"><ShieldGasViz dark={false} /></div></div>
        </div>
      </section>
      <CtaBand title={<>Lust bekommen? <b>Jetzt buchen.</b></>} text="Wählen Sie Ihren Termin in München oder der Region Hamburg." primary={{ label: 'Termine', href: '/termine-und-anmeldungen/' }} />
    </>
  );
}
