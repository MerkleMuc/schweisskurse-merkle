import Link from 'next/link';
import Image from 'next/image';
import { Icon, Stars } from './Icon';
import { JsonLd } from './JsonLd';
import { breadcrumbLd, faqLd } from '@/lib/schema';
import type { Kurs } from '@/lib/courses';
import { euro } from '@/lib/courses';

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full = [{ label: 'Startseite', href: '/' }, ...trail];
  return (
    <nav className="crumbs" aria-label="Brotkrumen">
      <JsonLd data={breadcrumbLd(full)} />
      <ol>
        {full.map((c, i) => (
          <li key={c.href}>{i === full.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker">{children}</p>;
}

export function SectionHead({ kicker, title, lead, children, split, as = 'h2' }: { kicker?: string; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode; split?: boolean; as?: 'h1' | 'h2' }) {
  const H = as;
  const inner = (
    <div>
      {kicker && <Kicker>{kicker}</Kicker>}
      <H>{title}</H>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
  return split ? <div className="section-head section-head--split reveal">{inner}{children}</div> : <div className="section-head reveal">{inner}{children}</div>;
}

export function PageHero({ kicker, title, lead, trail, aside, dark, children }: { kicker?: string; title: React.ReactNode; lead?: React.ReactNode; trail: Crumb[]; aside?: React.ReactNode; dark?: boolean; children?: React.ReactNode }) {
  return (
    <section className={`page-hero${dark ? ' page-hero--dark on-dark' : ''}`}>
      {dark && <div className="stage__lines" aria-hidden="true" />}
      <div className="container" style={{ position: 'relative' }}>
        <Breadcrumbs trail={trail} />
        <div className="page-hero__grid">
          <div>
            {kicker && <Kicker>{kicker}</Kicker>}
            <h1>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
            {children}
          </div>
          {aside && <div className="page-hero__aside">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export function Faq({ items, withLd = true }: { items: { q: string; a: string }[]; withLd?: boolean }) {
  if (!items.length) return null;
  return (
    <div className="faq">
      {withLd && <JsonLd data={faqLd(items)} />}
      {items.map((f) => (
        <details key={f.q} className="reveal">
          <summary>{f.q}</summary>
          <div className="faq__a" dangerouslySetInnerHTML={{ __html: f.a.startsWith('<') ? f.a : `<p>${f.a}</p>` }} />
        </details>
      ))}
    </div>
  );
}

export function CourseCard({ k, naechster }: { k: Kurs; naechster?: string | null }) {
  return (
    <Link href={`/${k.slug}/`} className="card card--link reveal">
      <div className="card__media">
        <Image src={k.bild} alt={k.bildAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
      </div>
      <div className="card__body">
        <div className="card__meta">
          <span className="chip chip--teal">{k.level}</span>
          <span className="chip">{k.verfahrenLabel}</span>
        </div>
        <h3>{k.name}</h3>
        <p className="small muted" style={{ margin: 0 }}>{k.dauer} · max. {k.maxTeilnehmer} Teilnehmer · {k.standorte.map((s) => (s === 'muenchen' ? 'München' : 'Region Hamburg')).join(', ')}</p>
        <div className="card__foot">
          <span className="price">{k.preis ? <>{euro(k.preis)}<small>{k.slug === 'tuev-gepruefter-schweisskurs' ? 'ab' : 'p. P.'}</small></> : <small style={{ marginLeft: 0 }}>{k.preisHinweis}</small>}</span>
          <span className="textlink">{naechster ? `Nächster: ${naechster}` : 'Details'}<Icon name="arrowRight" /></span>
        </div>
      </div>
    </Link>
  );
}

export function ReviewCard({ text, author, meta, source = 'google' }: { text: string; author: string; meta?: string; source?: 'google' | 'website' }) {
  return (
    <figure className="review reveal">
      <Stars />
      <blockquote>„{text}“</blockquote>
      <footer>
        <b>{author}</b>{meta && <span>{meta}</span>}
        <span className="review__src">{source === 'google' ? <><Icon name="googleG" />Google</> : 'Kundenstimme'}</span>
      </footer>
    </figure>
  );
}

export function Promo({ kicker, title, text, cta, href, img, imgAlt, light, secondary, compact }: { kicker: string; title: React.ReactNode; text: string; cta: string; href: string; img: string; imgAlt: string; light?: boolean; secondary?: { label: string; href: string }; compact?: boolean }) {
  return (
    <aside className={`promo reveal${light ? ' promo--light' : ' on-dark'}${compact ? ' promo--compact' : ''}`}>
      <span className="promo__ring" aria-hidden="true" />
      <div className="promo__body">
        <p className="kicker">{kicker}</p>
        <h2 className={compact ? 'h3' : 'h2'}>{title}</h2>
        <p style={{ margin: 0 }}>{text}</p>
        <div className="btn-row" style={{ marginTop: 8 }}>
          <Link className={`btn ${light ? 'btn--primary' : 'btn--light'}`} href={href}>{cta}<Icon name="arrowRight" /></Link>
          {secondary && <Link className={`btn ${light ? 'btn--secondary' : 'btn--glass'}`} href={secondary.href}>{secondary.label}</Link>}
        </div>
      </div>
      <div className="promo__media"><Image src={img} alt={imgAlt} fill sizes="(max-width: 767px) 100vw, 45vw" /></div>
    </aside>
  );
}

export function Facts({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <dl className="facts">
      {items.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
    </dl>
  );
}

export function Timeline({ items }: { items: { zeit: string; titel: string; text: string }[] }) {
  return (
    <ol className="timeline">
      {items.map((s) => (
        <li key={s.zeit + s.titel} className="reveal">
          <span className="timeline__time">{s.zeit}</span>
          <div><h3>{s.titel}</h3><p>{s.text}</p></div>
        </li>
      ))}
    </ol>
  );
}

export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="steps">
      {items.map((s) => <li key={s.title} className="reveal"><h3>{s.title}</h3><p>{s.text}</p></li>)}
    </ol>
  );
}

export function CtaBand({ title, text, primary, secondary }: { title: React.ReactNode; text: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  return (
    <section className="section section--dark on-dark">
      <div className="stage__lines" aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <div className="split" style={{ alignItems: 'center' }}>
          <div className="span-7 reveal">
            <p className="kicker">Jetzt starten</p>
            <h2>{title}</h2>
            <p className="lead">{text}</p>
          </div>
          <div className="span-5 reveal" style={{ justifySelf: 'end' }}>
            <div className="btn-row">
              <Link className="btn btn--light" href={primary.href}><Icon name="calendar" />{primary.label}</Link>
              {secondary && <Link className="btn btn--glass" href={secondary.href}>{secondary.label}</Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RelatedLinks({ title = 'Weiterlesen', links }: { title?: string; links: { href: string; label: string; text?: string }[] }) {
  if (!links.length) return null;
  return (
    <nav aria-label={title}>
      <p className="divider-label" style={{ marginBottom: 16 }}>{title}</p>
      <div className="grid grid-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="card card--link card--pad reveal" style={{ gap: 8 }}>
            <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{l.label}</b>
            {l.text && <span className="small muted">{l.text}</span>}
            <span className="textlink" style={{ marginTop: 'auto' }}>Lesen<Icon name="arrowRight" /></span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
