import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import type { RatgeberSeite, VizKey } from '@/lib/ratgeber/types';
import { RATGEBER_BY_PATH, childrenOf, trailFor } from '@/lib/ratgeber';
import { KURS_BY_SLUG, euro } from '@/lib/courses';
import { articleLd } from '@/lib/schema';
import { JsonLd } from './JsonLd';
import { Icon } from './Icon';
import { PageHero, RelatedLinks, CtaBand } from './UI';
import { VideoFacade } from './VideoFacade';
import { ProcessViz, ShieldGasViz, BottlesViz, JointsViz, TorchAngleViz, PositionsViz, MatrixViz, RatioViz, ValidityViz, PathViz } from './Visuals';

function Viz({ k }: { k: VizKey }) {
  switch (k) {
    case 'shield': return <ShieldGasViz />;
    case 'bottles': return <BottlesViz />;
    case 'joints': return <JointsViz />;
    case 'torch': return <TorchAngleViz />;
    case 'positions': return <PositionsViz />;
    case 'matrix': return <MatrixViz />;
    case 'ratio': return <RatioViz />;
    case 'validity': return <ValidityViz />;
    case 'path': return <PathViz />;
    default: return <ProcessViz type={k} />;
  }
}

/* Originaltext aus dem WordPress-Import, falls vorhanden (content/wp/). */
function importierterText(p: string): string | null {
  const file = path.join(/* turbopackIgnore: true */ process.cwd(), 'content', 'wp', p.replace(/^\/|\/$/g, '').replace(/\//g, '__') + '.html');
  try {
    const raw = fs.readFileSync(file, 'utf8');
    return raw
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/ on\w+="[^"]*"/gi, '')
      .replace(/https?:\/\/(www\.)?schweisskurse-merkle\.de\//gi, '/')
      .replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '');
  } catch {
    return null;
  }
}

export function RatgeberView({ page }: { page: RatgeberSeite }) {
  const original = importierterText(page.path);
  const kurs = page.kurs ? KURS_BY_SLUG[page.kurs] : null;
  const kinder = childrenOf(page.path);
  const related = (page.related || []).map((p) => RATGEBER_BY_PATH[p]).filter(Boolean);
  const viz = page.viz || [];

  return (
    <>
      <JsonLd data={articleLd({ title: page.h1, description: page.description, path: page.path })} />
      <PageHero trail={trailFor(page.path)} kicker={page.kicker} title={page.h1} lead={page.lead} />

      <section className="section">
        <div className="container">
          <div className="split">
            <article className="span-8">
              {original
                ? <div className="prose" dangerouslySetInnerHTML={{ __html: original }} />
                : (
                  <div className="prose">
                    {page.sections.map((s) => (
                      <section key={s.h}>
                        <h2>{s.h}</h2>
                        <div dangerouslySetInnerHTML={{ __html: s.html }} />
                      </section>
                    ))}
                  </div>
                )}
              {viz.length > 0 && (
                <div className="grid" style={{ gap: 20, marginTop: 40 }}>
                  {viz.map((k) => <div key={k} className="reveal"><Viz k={k} /></div>)}
                </div>
              )}
              {page.video && (
                <figure className="reveal" style={{ margin: '40px 0 0' }}>
                  <VideoFacade id={page.video} title={`Video zu ${page.h1}`} />
                  <figcaption className="small muted" style={{ marginTop: 10 }}>Video von Merkle Schweißtechnik auf YouTube</figcaption>
                </figure>
              )}
            </article>

            <aside className="span-4" style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
              {kurs && (
                <div className="card card--pad reveal" style={{ display: 'grid', gap: 12 }}>
                  <p className="kicker" style={{ margin: 0 }}>Passender Kurs</p>
                  <h2 className="h3" style={{ margin: 0 }}>{kurs.name}</h2>
                  <p className="small" style={{ margin: 0 }}>{kurs.dauer} · max. {kurs.maxTeilnehmer} Teilnehmer{kurs.preis ? ` · ${euro(kurs.preis)}` : ''}</p>
                  <Link className="btn btn--primary btn--block" href={`/${kurs.slug}/#termine`}><Icon name="calendar" />Termine ansehen</Link>
                  <Link className="textlink" href={`/${kurs.slug}/`}>Zum Kurs<Icon name="arrowRight" /></Link>
                </div>
              )}
              {kinder.length > 0 && (
                <nav className="toc" aria-label="In diesem Kapitel" style={{ position: 'static' }}>
                  <h2>In diesem Kapitel</h2>
                  <ul>{kinder.map((c) => <li key={c.path}><Link href={c.path}>{c.h1}</Link></li>)}</ul>
                </nav>
              )}
              <nav className="toc" aria-label="Ratgeber-Kapitel" style={{ position: 'static' }}>
                <h2>Ratgeber</h2>
                <ul>
                  <li><Link href="/ratgeber/schweissverfahren/">Schweißverfahren</Link></li>
                  <li><Link href="/ratgeber/schweissanleitung/">Schweißanleitung</Link></li>
                  <li><Link href="/ratgeber/gase/">Gase</Link></li>
                  <li><Link href="/ratgeber/metall/">Metall</Link></li>
                  <li><Link href="/ratgeber/schweisszubehoer/">Zubehör</Link></li>
                  <li><Link href="/ratgeber/glossar-2/">Glossar</Link></li>
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--s1">
          <div className="container"><RelatedLinks title="Verwandte Themen" links={related.map((r) => ({ href: r.path, label: r.h1, text: r.description.slice(0, 110) + '…' }))} /></div>
        </section>
      )}

      <CtaBand title={<>Lesen ist gut. <b>Schweißen ist besser.</b></>} text="Im Kurs setzen Sie das Gelernte am eigenen Schweißplatz um – mit einem Dozenten an Ihrer Seite." primary={{ label: 'Kurstermine', href: '/termine-und-anmeldungen/' }} secondary={{ label: 'Welcher Kurs passt?', href: '/schweisskurs-ratgeber/' }} />
    </>
  );
}
