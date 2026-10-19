import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { KURSE, KURS_BY_SLUG, euro } from '@/lib/courses';
import { kommendeTermine } from '@/lib/termine';
import { toView, KURSE_MINI } from '@/lib/view';
import { STANDORTE } from '@/lib/site';
import { courseLd } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { Breadcrumbs, Facts, Faq, SectionHead, Timeline, CtaBand, RelatedLinks, CourseCard } from '@/components/UI';
import { TerminExplorer } from '@/components/TerminExplorer';
import { ProcessViz, DayClockViz, RatioViz, PositionsViz, ValidityViz, TorchAngleViz, ShieldGasViz, BottlesViz, JointsViz, BookingFlowViz } from '@/components/Visuals';
import { ReviewsSection, KursraumDozenten } from '@/components/Sections';
import { FAQ } from '@/lib/faq';

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return KURSE.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = KURS_BY_SLUG[slug];
  if (!k) return {};
  return {
    title: { absolute: k.metaTitle },
    description: k.metaDescription,
    alternates: { canonical: `/${k.slug}/` },
    openGraph: { title: k.metaTitle, description: k.metaDescription, images: [{ url: k.bild, alt: k.bildAlt }] }
  };
}

export default async function KursSeite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = KURS_BY_SLUG[slug];
  if (!k) notFound();
  const termine = kommendeTermine({ kurs: k.slug });
  const frei = termine.filter((t) => t.frei > 0);
  const vor = k.voraussetzungKurs ? KURS_BY_SLUG[k.voraussetzungKurs] : null;
  const ort = STANDORTE[k.standorte[0]];
  const verwandt = KURSE.filter((x) => x.slug !== k.slug && x.standorte.some((s) => k.standorte.includes(s)) && (x.verfahren === k.verfahren || x.voraussetzungKurs === k.slug || x.slug === k.voraussetzungKurs || x.level === k.level)).slice(0, 3);
  const faq = [...k.faq, ...FAQ.filter((f) => ['Wie viel Theorie und wie viel Praxis gibt es?', 'Was muss ich mitbringen?', 'Kann ich stornieren?', 'Wie bezahle ich?'].includes(f.q)).map((f) => ({ q: f.q, a: f.a }))];

  return (
    <>
      <JsonLd data={courseLd(k, termine)} />

      <section className="stage on-dark">
        <div className="stage__bg" aria-hidden="true"><Image src={k.bild} alt="" fill priority sizes="100vw" /></div>
        <div className="stage__lines" aria-hidden="true" />
        <div className="container stage__inner" style={{ paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <Breadcrumbs trail={[{ label: 'Schweißkurse', href: '/schweisskurse-lehrgaenge/' }, { label: k.kurz, href: `/${k.slug}/` }]} />
          <div className="stage__grid">
            <div>
              <p className="kicker">{k.level} · {k.verfahrenLabel} · {k.standorte.map((s) => STANDORTE[s].name).join(', ')}</p>
              <h1>{k.name}</h1>
              <p className="lead">{k.lead}</p>
              <div className="stage__facts">
                <span className="chip chip--dark"><Icon name="clock" />{k.dauer}</span>
                <span className="chip chip--dark"><Icon name="users" />max. {k.maxTeilnehmer} Teilnehmer</span>
                <span className="chip chip--dark"><Icon name="pin" />{ort.city}{ort.id === 'muenchen' ? '-Freiham' : ''}</span>
              </div>
              <div className="btn-row">
                <a className="btn btn--light" href="#termine"><Icon name="calendar" />{frei.length ? `${frei.length} freie Termine` : 'Termine ansehen'}</a>
                <Link className="btn btn--glass" href="/kontakt/"><Icon name="headset" />Beratung</Link>
              </div>
            </div>
            <div className="stage__visual" style={{ aspectRatio: 'auto' }}>
              <ProcessViz type={k.verfahren} />
            </div>
          </div>
        </div>
      </section>

      {/* Steckbrief */}
      <section className="section section--tight" aria-label="Steckbrief">
        <div className="container">
          <Facts items={[
            ['Preis', k.preis ? <>{euro(k.preis)} {k.slug === 'tuev-gepruefter-schweisskurs' ? '' : 'p. P.'}<br /><span className="small muted">{k.preisHinweis || 'inkl. 19 % MwSt.'}</span></> : (k.preisHinweis || '–')],
            ['Dauer', k.dauer],
            ['Uhrzeit', k.zeiten],
            ['Gruppe', `max. ${k.maxTeilnehmer} Teilnehmer`],
            ['Voraussetzung', vor ? <Link href={`/${vor.slug}/`}>{vor.name}</Link> : k.voraussetzung.split('.')[0]],
            ['Abschluss', k.abschluss.split('.')[0]]
          ]} />
        </div>
      </section>

      {/* Intro */}
      <section className="section section--s1">
        <div className="container">
          <div className="split">
            <div className="span-7">
              <SectionHead kicker="Der Kurs" title={<>Was Sie <b>lernen</b></>} />
              <div className="prose reveal">{k.intro.map((p) => <p key={p}>{p}</p>)}</div>
              <ul className="list-check reveal" style={{ marginTop: 24 }}>{k.inhalte.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div className="span-5">
              <div className="card card--pad reveal sticky">
                <p className="kicker">Inklusive</p>
                <ul className="list-check">{k.inklusive.map((i) => <li key={i}>{i}</li>)}</ul>
                <hr style={{ margin: '22px 0' }} />
                <p className="small" style={{ margin: '0 0 6px', color: 'var(--ink)' }}><b>Für wen?</b></p>
                <p className="small">{k.zielgruppe}</p>
                <a className="btn btn--primary btn--block" href="#termine"><Icon name="calendar" />Termin wählen</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Termine */}
      <section className="section" id="termine" aria-labelledby="termine-h">
        <div className="container">
          <SectionHead kicker="Termine & Buchung" title={<span id="termine-h">Freie Termine für den <b>{k.kurz}</b></span>} lead="Klicken Sie einen Termin im Kalender an oder wählen Sie direkt aus der Liste. Die freien Plätze sind live." />
          <TerminExplorer initial={termine.map(toView)} kurse={KURSE_MINI} kurs={k.slug} showFilter={false}
            emptyHint={<p className="muted" style={{ margin: 0 }}>Neue Termine für diesen Kurs werden gerade geplant. Tragen Sie sich auf die Warteliste ein – wir melden uns zuerst bei Ihnen.</p>} />
        </div>
      </section>

      {/* Ablauf */}
      <section className="section section--mesh-s1" aria-labelledby="ablauf-h">
        <div className="container">
          <div className="split">
            <div className="span-5">
              <SectionHead kicker="Ablauf" title={<span id="ablauf-h">So läuft der <b>{k.tage > 1 ? 'Lehrgang' : 'Kurstag'}</b></span>} />
              <div className="grid" style={{ gap: 16 }}>
                {k.tage === 1 && <div className="reveal"><DayClockViz /></div>}
                <div className="reveal"><RatioViz /></div>
              </div>
            </div>
            <div className="span-7">
              <Timeline items={k.ablauf} />
              <div className="grid" style={{ gap: 10, marginTop: 12 }}>
                <div className="notice reveal"><Icon name="info" /><p><b>Voraussetzungen:</b> {k.voraussetzung}</p></div>
                {k.hinweise.map((h) => <div key={h} className="notice reveal"><Icon name="shield" /><p>{h}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fachgrafiken je Verfahren */}
      <section className="section" aria-label="Fachgrafiken">
        <div className="container">
          <SectionHead kicker="Wissen vorab" title={<>Gut vorbereitet in den <b>Kurs</b></>} lead="Ein paar Grundlagen, die Ihnen am Kurstag begegnen – ausführlich erklärt im Ratgeber." />
          <div className="grid grid-2">
            {k.verfahren === 'pruefung' ? (<><div className="reveal"><PositionsViz /></div><div className="reveal"><ValidityViz /></div></>) : null}
            {['mag', 'pulse', 'mix'].includes(k.verfahren) ? (<><div className="reveal"><TorchAngleViz /></div><div className="reveal"><ShieldGasViz /></div></>) : null}
            {['wig', 'alu'].includes(k.verfahren) ? (<><div className="reveal"><ShieldGasViz /></div><div className="reveal"><ProcessViz type={k.verfahren === 'wig' ? 'alu' : 'wig'} caption={k.verfahren === 'wig' ? 'Im Aufbaukurs: Wechselstrom für Aluminium' : 'Grundlage aus dem WIG-Einsteigerkurs'} /></div></>) : null}
            {k.verfahren === 'e' ? (<><div className="reveal"><JointsViz /></div><div className="reveal"><TorchAngleViz /></div></>) : null}
            {['autogen', 'loeten'].includes(k.verfahren) ? (<><div className="reveal"><BottlesViz /></div><div className="reveal"><ProcessViz type={k.verfahren === 'autogen' ? 'loeten' : 'autogen'} dark={false} /></div></>) : null}
          </div>
          <div style={{ marginTop: 40 }}><RelatedLinks title="Passend im Ratgeber" links={k.ratgeber} /></div>
        </div>
      </section>

      <KursraumDozenten standort={k.standorte[0]} />

      <ReviewsSection tone="s0" withVideo />

      <section className="section section--s2" aria-labelledby="faq-k">
        <div className="container">
          <div className="split">
            <div className="span-4"><SectionHead kicker="FAQ" title={<span id="faq-k">Fragen zum <b>{k.kurz}</b></span>} /></div>
            <div className="span-8"><Faq items={faq} /></div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="buchung-k">
        <div className="container">
          <SectionHead kicker="So buchen Sie" title={<span id="buchung-k">Termin wählen, buchen, <b>loslegen</b></span>} />
          <div className="reveal"><BookingFlowViz /></div>
          {verwandt.length > 0 && (
            <>
              <p className="divider-label" style={{ margin: '56px 0 20px' }}>Das könnte Sie auch interessieren</p>
              <div className="grid grid-3">{verwandt.map((x) => <CourseCard key={x.slug} k={x} />)}</div>
            </>
          )}
        </div>
      </section>

      <CtaBand title={<>Ihr Platz im <b>{k.kurz}</b></>} text={frei.length ? `Nächster freier Termin: ${new Date(frei[0].datum + 'T12:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })} – ${frei[0].frei} Plätze frei.` : 'Lassen Sie sich für den nächsten Termin vormerken.'} primary={{ label: frei.length ? 'Jetzt buchen' : 'Warteliste', href: frei.length ? `/buchen/${frei[0].id}/` : '/kontakt/?thema=Warteliste#formular' }} secondary={{ label: 'Alle Termine', href: '/termine-und-anmeldungen/' }} />
    </>
  );
}
