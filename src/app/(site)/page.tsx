import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { kommendeTermine } from '@/lib/termine';
import { KURS_BY_SLUG } from '@/lib/courses';
import { toView, KURSE_MINI, naechsteJeKurs, formatDatum } from '@/lib/view';
import { Icon } from '@/components/Icon';
import { SectionHead, Timeline, Promo, CtaBand, Steps } from '@/components/UI';
import { HeroArc, ProcessViz, DayClockViz, RatioViz, PathViz, BookingFlowViz, MatrixViz } from '@/components/Visuals';
import { TerminExplorer } from '@/components/TerminExplorer';
import { ReviewsSection, FilialeMuenchen, StandorteSection, FaqSection, CourseGrid, KursraumDozenten, VideosSection } from '@/components/Sections';
import { JsonLd } from '@/components/JsonLd';
import { localBusinessLd, eventLd } from '@/lib/schema';
import { STANDORTE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: 'Schweißkurse München & Hamburg – Schweißen lernen | Merkle' },
  description: 'Schweißkurse beim Fachhandel: MIG/MAG, WIG, E-Hand und Autogen für Einsteiger ab 357 €, Aufbaukurse und Lehrgänge mit Prüfung nach DIN EN ISO 9606-1. Max. 9 Teilnehmer, 75 % Praxis. Freie Termine online buchen.',
  alternates: { canonical: '/' }
};

export default function Home() {
  const termine = kommendeTermine();
  const naechste = naechsteJeKurs(termine);
  const erster = termine.find((t) => t.frei > 0);
  const ersterKurs = erster ? KURS_BY_SLUG[erster.kurs] : null;

  return (
    <>
      <JsonLd data={[localBusinessLd(STANDORTE.muenchen), localBusinessLd(STANDORTE.hamburg), ...termine.slice(0, 12).map((t) => eventLd(KURS_BY_SLUG[t.kurs], t))]} />

      {/* Bühne */}
      <section className="stage on-dark">
        <div className="stage__bg" aria-hidden="true"><Image src="/images/kurse/funkenflug-tuerkis.jpg" alt="" fill priority sizes="100vw" /></div>
        <div className="stage__lines" aria-hidden="true" />
        <div className="container stage__inner">
          <div className="stage__grid">
            <div>
              <p className="kicker">Schweißkurse in München & Region Hamburg</p>
              <h1 className="display">Schweißen lernen. <b>An einem Tag.</b></h1>
              <p className="lead">Einsteigerkurse, Aufbaukurse und Lehrgänge mit Prüfung beim Fachhandel für Schweißtechnik – mit eigenem Schweißplatz, kleinen Gruppen und Dozenten aus der Praxis.</p>
              <div className="stage__facts">
                <span className="chip chip--dark"><Icon name="users" />max. 9 Teilnehmer</span>
                <span className="chip chip--dark"><Icon name="spark" />75 % Praxis</span>
                <span className="chip chip--dark"><Icon name="award" />DIN EN ISO 9606-1</span>
                <span className="chip chip--dark"><Icon name="euro" />ab 357 €</span>
              </div>
              <div className="btn-row">
                <Link className="btn btn--light" href="/termine-und-anmeldungen/"><Icon name="calendar" />Freie Termine ansehen</Link>
                <Link className="btn btn--glass" href="/schweisskurs-ratgeber/"><Icon name="compass" />Welcher Kurs passt?</Link>
              </div>
              {erster && ersterKurs && (
                <Link href={`/buchen/${erster.id}/`} className="card card--dark card--link" style={{ marginTop: 34, padding: '16px 20px', flexDirection: 'row', alignItems: 'center', gap: 16, maxWidth: 520, background: 'var(--glass-dark)', backdropFilter: 'var(--glass-blur)' }}>
                  <span className="mini__dot" aria-hidden="true" />
                  <span style={{ flex: 1 }}>
                    <span className="small" style={{ display: 'block', color: 'var(--on-dark-3)' }}>Nächster freier Termin</span>
                    <b style={{ color: 'var(--on-dark)', fontWeight: 500 }}>{ersterKurs.kurz} · {formatDatum(erster.datum, { weekday: 'short', day: '2-digit', month: 'long' })} · {STANDORTE[erster.standort].name}</b>
                  </span>
                  <span className="chip chip--dark">{erster.frei} frei</span>
                  <Icon name="arrowRight" />
                </Link>
              )}
            </div>
            <div className="stage__visual"><HeroArc /></div>
          </div>
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="section section--tight" aria-label="Kennzahlen">
        <div className="container">
          <div className="grid grid-4">
            {[
              { v: '50+', l: 'Jahre Fachhandel für Schweiß- und Schneidtechnik' },
              { v: '9', l: 'Teilnehmer höchstens – jeder an seinem eigenen Platz' },
              { v: '75 %', l: 'Praxis am Schweißgerät, 25 % Theorie' },
              { v: '11', l: 'Kursformate vom Einsteiger bis zur Prüfung' }
            ].map((s) => (
              <div className="stat reveal" key={s.l}><span className="stat__value">{s.v}</span><span className="stat__label">{s.l}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Kurse */}
      <section className="section section--s1" aria-labelledby="kurse">
        <div className="container">
          <SectionHead split kicker="Kursangebot" title={<><span id="kurse">Vom ersten Lichtbogen</span> bis zum <b>Schweißerpass</b></>} lead="Für jedes Verfahren gibt es in München einen eigenen Kurs. Wählen Sie nach Werkstoff, Projekt oder Ziel.">
            <Link className="btn btn--secondary" href="/schweisskurse-lehrgaenge/">Alle Kurse vergleichen<Icon name="arrowRight" /></Link>
          </SectionHead>
          <CourseGrid filter={(k) => ['mig-mag-einsteiger-schweisskurs', 'wig-einsteiger-schweisskurs', 'elektroden-einsteiger-schweisskurs', 'wig-alu-aufbau-schweisskurs', 'tuev-gepruefter-schweisskurs', 'allgemeiner-schweisskurs-hamburg'].includes(k.slug)} naechste={naechste} />
        </div>
      </section>

      {/* Verfahren in Bewegung */}
      <section className="section section--dark on-dark" aria-labelledby="verfahren">
        <div className="stage__lines" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <SectionHead kicker="Die Verfahren" title={<span id="verfahren">Drei Lichtbögen, <b>drei Techniken</b></span>} lead="So funktionieren die Verfahren, die Sie in unseren Einsteigerkursen lernen – in Bewegung erklärt." />
          <div className="grid grid-3">
            {[
              { t: 'mag' as const, h: 'MIG/MAG', p: 'Der Draht läuft automatisch nach, Schutzgas schirmt das Schmelzbad ab. Schnell zu lernen, ideal für Stahl.', href: '/mig-mag-einsteiger-schweisskurs/' },
              { t: 'wig' as const, h: 'WIG', p: 'Wolframelektrode, Argon und ein Zusatzstab von Hand – für die saubersten Nähte an Stahl, Edelstahl und Alu.', href: '/wig-einsteiger-schweisskurs/' },
              { t: 'e' as const, h: 'Elektrode', p: 'Die umhüllte Stabelektrode bringt ihr Schutzgas selbst mit – robust, mobil, ideal auf Montage.', href: '/elektroden-einsteiger-schweisskurs/' }
            ].map((x) => (
              <div key={x.t} className="reveal" style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
                <ProcessViz type={x.t} />
                <h3 style={{ margin: 0 }}>{x.h}</h3>
                <p style={{ margin: 0 }}>{x.p}</p>
                <Link className="textlink" href={x.href}>Zum {x.h}-Kurs<Icon name="arrowRight" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Termine */}
      <section className="section" aria-labelledby="termine" id="termine-vorschau">
        <div className="container">
          <SectionHead split kicker="Terminkalender" title={<span id="termine">Freie Termine <b>auf einen Blick</b></span>} lead="Wählen Sie im Kalender einen Tag oder filtern Sie nach Standort und Verfahren. Freie Plätze werden live aktualisiert.">
            <Link className="btn btn--primary" href="/termine-und-anmeldungen/"><Icon name="calendar" />Alle Termine</Link>
          </SectionHead>
          <TerminExplorer initial={termine.map(toView)} kurse={KURSE_MINI} />
        </div>
      </section>

      {/* Ablauf Kurstag */}
      <section className="section section--mesh-s1" aria-labelledby="ablauf">
        <div className="container">
          <div className="split">
            <div className="span-5">
              <SectionHead kicker="Ablauf" title={<span id="ablauf">So läuft Ihr <b>Kurstag</b></span>} lead="Ein Tag, ein klarer Plan: zwei Stunden Grundlagen, danach Praxis am eigenen Platz – mit Pause und gemeinsamem Mittagessen." />
              <div className="grid" style={{ gap: 16 }}>
                <div className="reveal"><DayClockViz /></div>
                <div className="reveal"><RatioViz /></div>
              </div>
            </div>
            <div className="span-7">
              <Timeline items={KURS_BY_SLUG['mig-mag-einsteiger-schweisskurs'].ablauf} />
              <div className="notice reveal" style={{ marginTop: 12 }}><Icon name="info" /><p><b>Voraussetzungen:</b> Für Einsteigerkurse keine. Mitbringen: feste Schuhe, Baumwollkleidung, ggf. Brille (keine Kontaktlinsen). WIG-Kurse sind mit Herzschrittmacher nicht möglich.</p></div>
            </div>
          </div>
        </div>
      </section>

      <StandorteSection />

      <FilialeMuenchen tone="s0" />

      <KursraumDozenten />

      {/* Lernpfad */}
      <section className="section" aria-labelledby="lernpfad">
        <div className="container">
          <div className="split" style={{ alignItems: 'center' }}>
            <div className="span-6 reveal"><PathViz /></div>
            <div className="span-6">
              <SectionHead kicker="Lernpfad" title={<span id="lernpfad">Vom Hobby zum <b>geprüften Schweißer</b></span>} lead="Starten Sie mit einem Einsteigerkurs, vertiefen Sie im Aufbaukurs und legen Sie im Wochenlehrgang die Prüfung nach DIN EN ISO 9606-1 ab." />
              <div className="btn-row reveal"><Link className="btn btn--primary" href="/tuev-gepruefter-schweisskurs/">Lehrgang mit Prüfung</Link><Link className="btn btn--secondary" href="/aufbaukurse/">Aufbaukurse</Link></div>
            </div>
          </div>
          <div style={{ marginTop: 56 }} className="reveal"><MatrixViz /></div>
        </div>
      </section>

      <ReviewsSection />

      {/* Werbebanner */}
      <section className="section" aria-label="Angebote">
        <div className="container" style={{ display: 'grid', gap: 20 }}>
          <Promo kicker="Geschenkidee" title={<>Einen Schweißkurs <b>verschenken</b></>} text="Personalisierter Gutschein auf den Namen der beschenkten Person – den Termin wählt sie später selbst." cta="Gutschein bestellen" href="/gutschein-bestellen/" img="/images/kurse/schweisser-portrait.jpg" imgAlt="Schweißer mit Helm – Motiv für den Schweißkurs-Gutschein" />
          <div className="grid grid-2">
            <Promo light compact kicker="Nach dem Kurs" title={<>25 % zurück beim <b>Gerätekauf</b></>} text="Wer nach dem Kurs in München eine Anlage ab 1.250 € bei Merkle kauft, erhält 25 % des Kurspreises zurück." cta="Zum Merkle-Shop" href="/wir-ueber-uns/#vorteile" img="/images/filiale/muenchen-ausstellung.jpg" imgAlt="Schweißanlagen in der Ausstellung von Merkle München" />
            <Promo light compact kicker="Für Betriebe" title={<>Inhouse-Kurse & <b>Sondertermine</b></>} text="Schulungen für Ihr Team – auf Wunsch mit Schweißerprüfung. Wir stellen das Programm passend zusammen." cta="Anfrage stellen" href="/kontakt/?thema=Firmenschulung%20%2F%20Inhouse-Kurs#formular" img="/images/team/team-muenchen-2.jpg" imgAlt="Team von Merkle Schweißtechnik München" />
          </div>
        </div>
      </section>

      {/* Buchung */}
      <section className="section section--s2" aria-labelledby="buchung">
        <div className="container">
          <SectionHead kicker="Buchung" title={<span id="buchung">In zwei Minuten <b>gebucht</b></span>} lead="Termin im Kalender anklicken, Daten eingeben, verbindlich buchen – bezahlt wird danach bequem per PayPal oder Überweisung." />
          <div className="reveal"><BookingFlowViz /></div>
          <div style={{ marginTop: 40 }}>
            <Steps items={[
              { title: 'Termin wählen', text: 'Im Kalender oder in der Liste – mit Live-Anzeige der freien Plätze.' },
              { title: 'Firma oder privat', text: 'Rechnungsadresse und Teilnehmer getrennt oder identisch angeben.' },
              { title: 'Verbindlich buchen', text: 'Ihr Platz ist sofort reserviert, die Bestätigung kommt per E-Mail.' },
              { title: 'Bezahlen', text: 'Per PayPal oder Vorkasse – Rechnung inklusive.' }
            ]} />
          </div>
        </div>
      </section>

      <VideosSection />

      {/* Ratgeber */}
      <section className="section" aria-labelledby="ratgeber">
        <div className="container">
          <SectionHead split kicker="Ratgeber" title={<span id="ratgeber">Wissen für <b>Ihre Schweißnaht</b></span>} lead="Verfahren, Schutzgase, Werkstoffe und Anleitungen – der Merkle-Ratgeber erklärt das Schweißen Schritt für Schritt.">
            <Link className="btn btn--secondary" href="/ratgeber/">Zum Ratgeber<Icon name="arrowRight" /></Link>
          </SectionHead>
          <div className="grid grid-4">
            {[
              { href: '/ratgeber/schweissverfahren/mig-mag-schweissen/', t: 'MIG/MAG-Schweißen', s: 'Verfahren, Werkstoffe, Gase' },
              { href: '/ratgeber/schweissverfahren/wig-schweissen/wig-schweissverfahren/', t: 'WIG-Schweißverfahren', s: 'Wolfram, Argon, Zündung' },
              { href: '/ratgeber/gase/farben-gasflaschen/', t: 'Farben von Gasflaschen', s: 'Kennzeichnung nach DIN EN 1089-3' },
              { href: '/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/kehlnaht-schweissen/', t: 'Kehlnaht schweißen', s: 'Video-Anleitung' },
              { href: '/ratgeber/metall/aluminium-schweissen-alu-schweissen/', t: 'Aluminium schweißen', s: 'Oxidschicht, Wärme, Verfahren' },
              { href: '/ratgeber/schweissanleitung/haltung-beim-schweissen/', t: 'Haltung beim Schweißen', s: 'Winkel für jede Naht' },
              { href: '/ratgeber/schweisszubehoer/schweisser-berufskleidung-schutzkleidung-schweisser/', t: 'Schutzkleidung', s: 'Helm, Handschuhe, Jacke' },
              { href: '/ratgeber/glossar-2/', t: 'Glossar A–Z', s: 'Fachbegriffe kurz erklärt' }
            ].map((r) => (
              <Link key={r.href} href={r.href} className="card card--link card--pad reveal" style={{ gap: 6 }}>
                <b style={{ color: 'var(--ink)', fontWeight: 500 }}>{r.t}</b>
                <span className="small muted">{r.s}</span>
                <span className="textlink" style={{ marginTop: 10 }}>Lesen<Icon name="arrowRight" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection limit={6} tone="s1" />

      <CtaBand title={<>Bereit für Ihre <b>erste Naht?</b></>} text={`${termine.filter((t) => t.frei > 0).length} Termine mit freien Plätzen. Sichern Sie sich Ihren Schweißplatz – in wenigen Minuten online.`} primary={{ label: 'Termin buchen', href: '/termine-und-anmeldungen/' }} secondary={{ label: 'Persönlich beraten lassen', href: '/kontakt/' }} />
    </>
  );
}

