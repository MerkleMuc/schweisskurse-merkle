import { PageHero } from './UI';
import type { LegalSection } from '@/lib/legal-pages';

export function LegalPage({ title, lead, href, sections }: { title: string; lead?: string; href: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero trail={[{ label: title, href }]} kicker="Rechtliches" title={title} lead={lead} />
      <section className="section">
        <div className="container">
          <div className="split">
            <nav className="span-4" aria-label="Inhalt">
              <div className="toc"><h2>Inhalt</h2><ul>{sections.map((s, i) => <li key={s.h}><a href={`#a${i}`}>{s.h}</a></li>)}</ul></div>
            </nav>
            <div className="span-8 prose">
              {sections.map((s, i) => (
                <section key={s.h} id={`a${i}`} style={{ scrollMarginTop: 'calc(var(--header-h) + 24px)' }}>
                  <h2 className="h3">{s.h}</h2>
                  {s.p.map((p, j) => <p key={j} dangerouslySetInnerHTML={{ __html: p }} />)}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
