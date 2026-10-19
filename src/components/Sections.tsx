import Link from 'next/link';
import Image from 'next/image';
import { Icon } from './Icon';
import { ReviewCard, SectionHead, Faq, CourseCard } from './UI';
import { VideoFacade } from './VideoFacade';
import { JsonLd } from './JsonLd';
import { LocationsViz } from './Visuals';
import { GOOGLE, STANDORTE, VIDEOS, DOZENTEN, type StandortId } from '@/lib/site';
import { REVIEWS } from '@/lib/reviews';
import { FAQ } from '@/lib/faq';
import { KURSE } from '@/lib/courses';
import { videoLd } from '@/lib/schema';

/* ------------------------------------------------------------ Bewertungen --- */
export function ReviewsSection({ tone = 's1', withVideo = true }: { tone?: 's1' | 's0'; withVideo?: boolean }) {
  return (
    <section className={`section${tone === 's1' ? ' section--s1' : ''}`} aria-labelledby="bewertungen">
      <div className="container">
        <div className="split" style={{ alignItems: 'center' }}>
          <div className="span-5 reveal">
            <p className="kicker">Bewertungen</p>
            <h2 id="bewertungen">Was Teilnehmer <b>sagen</b></h2>
            <div className="score" style={{ margin: '24px 0' }}>
              <span className="score__num">{GOOGLE.rating}</span>
              <span>
                <span className="review__stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" />)}</span>
                <span className="small muted" style={{ display: 'block', marginTop: 6 }}>{GOOGLE.count} Google-Bewertungen für Merkle Schweißtechnik München</span>
              </span>
            </div>
            <div className="btn-row">
              <a className="btn btn--secondary" href={GOOGLE.url} target="_blank" rel="noopener"><Icon name="googleG" />Alle Bewertungen</a>
              <a className="btn btn--secondary" href={GOOGLE.writeUrl} target="_blank" rel="noopener"><Icon name="star" />Kurs bewerten</a>
            </div>
          </div>
          <div className="span-7">
            <div className="reviews">
              {REVIEWS.map((r) => <ReviewCard key={r.author} text={r.text} author={r.author} meta={r.meta} source={r.source} />)}
              {withVideo && (
                <figure className="review reveal" style={{ padding: 0, overflow: 'hidden' }}>
                  <VideoFacade id={VIDEOS[0].id} title={VIDEOS[0].title} />
                  <figcaption style={{ padding: '0 22px 20px' }}><b style={{ color: 'var(--ink)' }}>{VIDEOS[0].title}</b><br /><span className="small muted">{VIDEOS[0].text}</span></figcaption>
                </figure>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Videos --- */
export function VideosSection() {
  return (
    <section className="section section--dark on-dark" aria-labelledby="videos">
      <JsonLd data={VIDEOS.map(videoLd)} />
      <div className="container">
        <SectionHead kicker="Video" title={<>Ein Blick in Kurs und <b>Filiale</b></>} lead="Kurzfilme von Merkle Schweißtechnik – vom Einsteigerkurs bis zum Rundgang durch Fachhandel und Werkstatt." />
        <div className="grid grid-3">
          {VIDEOS.map((v) => (
            <figure key={v.id} className="reveal" style={{ margin: 0 }}>
              <VideoFacade id={v.id} title={v.title} />
              <figcaption style={{ marginTop: 14 }}><b style={{ color: 'var(--on-dark)', fontWeight: 500 }}>{v.title}</b><br /><span className="small">{v.text}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- Kurzübersicht Filiale München --- */
export function FilialeMuenchen({ tone = 's0' }: { tone?: 's0' | 's2' }) {
  const m = STANDORTE.muenchen;
  return (
    <section className={`section${tone === 's2' ? ' section--s2' : ''}`} aria-labelledby="filiale">
      <div className="container">
        <SectionHead split kicker="Filiale München-Freiham" title={<>Kursraum, Fachhandel und Werkstatt <b>unter einem Dach</b></>} lead="Unsere Schweißkurse finden im Betriebsgebäude der Wilhelm Merkle Schweißtechnik GmbH statt – seit über 50 Jahren Fachhandel für Schweiß- und Schneidtechnik im Münchner Westen.">
          <Link className="btn btn--secondary" href="/wir-ueber-uns/">Mehr über uns<Icon name="arrowRight" /></Link>
        </SectionHead>
        <div className="mosaic">
          <div className="media m-wide reveal"><Image src="/images/filiale/muenchen-gebaeude.jpg" alt="Firmengebäude von Merkle Schweißtechnik in München-Freiham mit Logo an der Fassade" fill sizes="(max-width: 767px) 100vw, 66vw" /></div>
          <div className="media reveal"><Image src="/images/filiale/muenchen-laden-innen.jpg" alt="Verkaufsraum mit Schweißgeräten und Schweißhelmen" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
          <div className="media reveal"><Image src="/images/kurse/wig-brenner-rotlicht.jpg" alt="WIG-Brenner vor rotem Schweißvorhang im Kursbereich" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
          <div className="media reveal"><Image src="/images/filiale/muenchen-ausstellung.jpg" alt="Ausstellung von Merkle-Schweißanlagen im Ladengeschäft" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
          <div className="media reveal"><Image src="/images/filiale/muenchen-gaslager.jpg" alt="Gaslager mit Flaschenregalen vor dem Merkle-Gebäude" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
          <div className="media reveal"><Image src="/images/team/team-muenchen.jpg" alt="Das Team von Merkle Schweißtechnik München vor dem Firmengebäude" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>
        </div>
        <div className="grid grid-4" style={{ marginTop: 32 }}>
          {[
            { i: 'pin', t: 'Adresse', v: <>{m.street}<br />{m.zip} {m.city}-{m.ortsteil}</> },
            { i: 'clock', t: 'Öffnungszeiten Laden', v: <>{m.hours.map((h) => <span key={h.d}>{h.d}: {h.t}<br /></span>)}</> },
            { i: 'calendar', t: 'Kurstage', v: m.kurstag },
            { i: 'phone', t: 'Kursberatung', v: <a href={m.tel.href}>{m.tel.text}</a> }
          ].map((x) => (
            <div key={x.t} className="feature reveal">
              <span className="iconbox"><Icon name={x.i} /></span>
              <h3 className="h4">{x.t}</h3>
              <p className="small">{x.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ Kursraum & Dozenten --- */
export function KursraumDozenten({ standort }: { standort?: StandortId }) {
  const doz = DOZENTEN.filter((d) => !standort || d.standort === standort);
  return (
    <section className="section section--s1" aria-labelledby="kursraum">
      <div className="container">
        <div className="split">
          <div className="span-6 reveal">
            <div className="media media--43"><Image src="/images/kurse/schweisser-portrait.jpg" alt="Schweißer in Schutzjacke mit Schweißhelm in der Merkle-Werkstatt" fill sizes="(max-width: 767px) 100vw, 50vw" /></div>
          </div>
          <div className="span-6">
            <p className="kicker reveal">Kursraum & Dozenten</p>
            <h2 id="kursraum" className="reveal">Ein eigener Platz. Ein Dozent, <b>der zuschaut.</b></h2>
            <p className="lead reveal">Die Kursräume sind speziell für die Ausbildung eingerichtet: Jede Teilnehmerin und jeder Teilnehmer arbeitet an einem eigenen Schweißplatz mit Schweißvorhang und aktueller Anlagentechnik aus unserem Sortiment.</p>
            <ul className="list-check reveal" style={{ margin: '24px 0' }}>
              <li>Eigener, voll ausgestatteter Schweißplatz je Person</li>
              <li>Kleine Gruppen – höchstens neun Teilnehmer</li>
              <li>Dozenten aus der Praxis von Merkle Schweißtechnik</li>
              <li>Theorie und Praxis im Verhältnis 25 zu 75</li>
            </ul>
            <div className="grid grid-2" style={{ gap: 12 }}>
              {doz.map((d) => (
                <div key={d.name} className="card card--pad reveal" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 16 }}>
                  <span className="berater__avatar" aria-hidden="true">{d.name.split(' ').map((s) => s[0]).join('')}</span>
                  <span><b style={{ color: 'var(--ink)', fontWeight: 500, display: 'block' }}>{d.name}</b><span className="small muted">{d.rolle}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Standorte --- */
export function StandorteSection() {
  return (
    <section className="section section--dark on-dark" aria-labelledby="standorte">
      <div className="stage__lines" aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <div className="split" style={{ alignItems: 'center' }}>
          <div className="span-5 reveal"><LocationsViz /></div>
          <div className="span-7">
            <p className="kicker reveal">Zwei Kursorte</p>
            <h2 id="standorte" className="reveal">Schweißen lernen in <b>München</b> und bei <b>Hamburg</b></h2>
            <div className="grid grid-2" style={{ marginTop: 28 }}>
              {(['muenchen', 'hamburg'] as const).map((id) => {
                const s = STANDORTE[id];
                return (
                  <Link key={id} href={s.regionUrl} className="card card--dark card--link card--pad reveal" style={{ gap: 12 }}>
                    <span className="iconbox iconbox--dark"><Icon name="pin" /></span>
                    <h3 style={{ margin: 0 }}>{s.name}</h3>
                    <p className="small" style={{ margin: 0 }}>{s.street}, {s.zip} {s.city}</p>
                    <ul className="list-check small" style={{ margin: '6px 0 0' }}>{s.vorteile.slice(0, 3).map((v) => <li key={v.title}>{v.title}</li>)}</ul>
                    <span className="textlink" style={{ marginTop: 'auto' }}>Kurse in {s.name}<Icon name="arrowRight" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- FAQ-Block --- */
export function FaqSection({ cats, limit, title = <>Häufige <b>Fragen</b></>, tone = 's0' }: { cats?: string[]; limit?: number; title?: React.ReactNode; tone?: 's0' | 's1' | 's2' }) {
  const items = FAQ.filter((f) => !cats || cats.includes(f.cat)).slice(0, limit);
  return (
    <section className={`section${tone !== 's0' ? ` section--${tone}` : ''}`} aria-labelledby="faq">
      <div className="container">
        <div className="split">
          <div className="span-4">
            <p className="kicker reveal">FAQ</p>
            <h2 id="faq" className="reveal">{title}</h2>
            <p className="reveal">Noch etwas offen? Wir beraten Sie gern persönlich.</p>
            <div className="btn-row reveal"><Link className="btn btn--secondary" href="/faq/">Alle Fragen</Link><Link className="btn btn--secondary" href="/kontakt/">Kontakt</Link></div>
          </div>
          <div className="span-8"><Faq items={items} /></div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Kurs-Raster --- */
export function CourseGrid({ filter, naechste }: { filter?: (k: (typeof KURSE)[number]) => boolean; naechste?: Record<string, string> }) {
  const list = KURSE.filter(filter || (() => true));
  return (
    <div className="grid grid-3">
      {list.map((k) => <CourseCard key={k.slug} k={k} naechster={naechste?.[k.slug]} />)}
    </div>
  );
}
