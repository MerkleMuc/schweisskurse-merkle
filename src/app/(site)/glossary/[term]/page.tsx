import type { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import { GLOSSAR, GLOSSAR_BY_SLUG } from '@/lib/ratgeber/glossar';
import { PageHero, CtaBand } from '@/components/UI';
import { JsonLd } from '@/components/JsonLd';
import { definedTermLd } from '@/lib/schema';
import { Icon } from '@/components/Icon';

export function generateStaticParams() {
  return GLOSSAR.map((b) => ({ term: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const b = GLOSSAR_BY_SLUG[(await params).term];
  if (!b) return {};
  return { title: `${b.name} – Glossar Schweißen`, description: b.text.slice(0, 155), alternates: { canonical: `/glossary/${b.slug}/` } };
}

export default async function Page({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const b = GLOSSAR_BY_SLUG[term];
  if (!b) permanentRedirect('/ratgeber/glossar-2/');
  const idx = GLOSSAR.findIndex((x) => x.slug === b.slug);
  const nachbarn = [GLOSSAR[idx - 1], GLOSSAR[idx + 1]].filter(Boolean);
  return (
    <>
      <JsonLd data={definedTermLd({ name: b.name, description: b.text, path: `/glossary/${b.slug}/` })} />
      <PageHero trail={[{ label: 'Ratgeber', href: '/ratgeber/' }, { label: 'Glossar', href: '/ratgeber/glossar-2/' }, { label: b.name, href: `/glossary/${b.slug}/` }]} kicker="Glossar" title={b.name} lead={b.text} />
      <section className="section">
        <div className="container">
          <div className="btn-row">
            {(b.links || []).map((l) => <Link key={l.href} className="btn btn--primary" href={l.href}>{l.label}<Icon name="arrowRight" /></Link>)}
            <Link className="btn btn--secondary" href="/ratgeber/glossar-2/">Zum Glossar A–Z</Link>
          </div>
          <p className="divider-label" style={{ margin: '40px 0 16px' }}>Weitere Begriffe</p>
          <div className="btn-row">{nachbarn.map((n) => <Link key={n.slug} className="chip" href={`/glossary/${n.slug}/`}>{n.name}</Link>)}</div>
        </div>
      </section>
      <CtaBand title={<>Vom Begriff <b>zur Naht</b></>} text="Schweißen lernen in München und der Region Hamburg." primary={{ label: 'Kurstermine', href: '/termine-und-anmeldungen/' }} />
    </>
  );
}
