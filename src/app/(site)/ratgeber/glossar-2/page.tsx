import type { Metadata } from 'next';
import Link from 'next/link';
import { GLOSSAR } from '@/lib/ratgeber/glossar';
import { PageHero, CtaBand } from '@/components/UI';
import { JsonLd } from '@/components/JsonLd';
import { absUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Glossar – die wichtigsten Fachbegriffe rund ums Schweißen',
  description: 'Schweiß-Glossar von A bis Z: Abbrand, Aktivgas, Lichtbogen, Schutzgas, Schweißgut, Wolframelektrode und viele weitere Fachbegriffe kurz erklärt.',
  alternates: { canonical: '/ratgeber/glossar-2/' }
};

export default function Page() {
  const sorted = [...GLOSSAR].sort((a, b) => a.name.localeCompare(b.name, 'de'));
  const letters = Array.from(new Set(sorted.map((b) => b.name[0].toUpperCase())));
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: 'Glossar Schweißen', url: absUrl('/ratgeber/glossar-2/'), hasDefinedTerm: sorted.map((b) => ({ '@type': 'DefinedTerm', name: b.name, description: b.text, url: absUrl(`/glossary/${b.slug}/`) })) }} />
      <PageHero trail={[{ label: 'Ratgeber', href: '/ratgeber/' }, { label: 'Glossar', href: '/ratgeber/glossar-2/' }]} kicker="Glossar" title={<>Die wichtigsten Fachbegriffe <b>im Überblick</b></>} lead="Von Abbrand bis Zusatzwerkstoff – kurz und verständlich erklärt." />
      <section className="section">
        <div className="container">
          <nav className="glossar-nav" aria-label="Buchstaben">{letters.map((l) => <a key={l} href={`#b-${l}`}>{l}</a>)}</nav>
          {letters.map((l) => (
            <section key={l} id={`b-${l}`} style={{ scrollMarginTop: 'calc(var(--header-h) + 24px)', marginBottom: 32 }}>
              <h2 className="h3">{l}</h2>
              <dl className="glossar-list prose">
                {sorted.filter((b) => b.name[0].toUpperCase() === l).map((b) => (
                  <div key={b.slug}><dt><Link href={`/glossary/${b.slug}/`}>{b.name}</Link></dt><dd>{b.text}</dd></div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </section>
      <CtaBand title={<>Begriffe verstanden? <b>Jetzt anwenden.</b></>} text="In unseren Einsteigerkursen lernen Sie die Praxis hinter den Fachbegriffen." primary={{ label: 'Kurstermine', href: '/termine-und-anmeldungen/' }} />
    </>
  );
}
