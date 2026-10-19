import Link from 'next/link';
import Image from 'next/image';
import { STANDORTE, type StandortId } from '@/lib/site';
import { kurseFuer } from '@/lib/courses';
import { kommendeTermine } from '@/lib/termine';
import { toView, KURSE_MINI, naechsteJeKurs } from '@/lib/view';
import { localBusinessLd, eventLd } from '@/lib/schema';
import { KURS_BY_SLUG } from '@/lib/courses';
import { JsonLd } from './JsonLd';
import { Icon } from './Icon';
import { Breadcrumbs, SectionHead, Steps, CtaBand, CourseCard } from './UI';
import { TerminExplorer } from './TerminExplorer';
import { LocationsViz, DayClockViz, BookingFlowViz, ProcessViz } from './Visuals';
import { MapConsent } from './MapConsent';
import { FilialeMuenchen, KursraumDozenten, ReviewsSection, FaqSection, VideosSection } from './Sections';

/* Gemeinsame Vorlage der Standortseiten /region-muenchen/ und /region-hamburg/. */
export function LocationPage({ id, h1, lead }: { id: StandortId; h1: React.ReactNode; lead: string }) {
  const s = STANDORTE[id];
  const termine = kommendeTermine({ standort: id });
  const kurse = kurseFuer(id);
  const naechste = naechsteJeKurs(termine);

  return (
    <>
      <JsonLd data={[localBusinessLd(s), ...termine.slice(0, 15).map((t) => eventLd(KURS_BY_SLUG[t.kurs], t))]} />
      <section className="stage on-dark">
        <div className="stage__bg" aria-hidden="true"><Image src={id === 'muenchen' ? '/images/filiale/muenchen-einfahrt.jpg' : '/images/kurse/funkenflug-tuerkis.jpg'} alt="" fill priority sizes="100vw" /></div>
        <div className="stage__lines" aria-hidden="true" />
        <div className="container stage__inner">
          <Breadcrumbs trail={[{ label: 'Standorte', href: '/termine-und-anmeldungen/' }, { label: s.name, href: s.regionUrl }]} />
          <div className="stage__grid">
            <div>
              <p className="kicker">{s.claim}</p>
              <h1>{h1}</h1>
              <p className="lead">{lead}</p>
              <div className="stage__facts">
                <span className="chip chip--dark"><Icon name="pin" />{s.street}, {s.zip} {s.city}</span>
                <span className="chip chip--dark"><Icon name="calendar" />{termine.length} Termine geplant</span>
              </div>
              <div className="btn-row">
                <a className="btn btn--light" href="#termine"><Icon name="calendar" />Termine & Anmeldung</a>
                <a className="btn btn--glass" href={s.tel.href}><Icon name="phone" />{s.tel.text}</a>
              </div>
            </div>
            <div className="stage__visual" style={{ aspectRatio: 'auto' }}><LocationsViz focus={id} /></div>
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="section" aria-labelledby="vorteile">
        <div className="container">
          <SectionHead kicker={`Ihre Vorteile in ${s.name}`} title={<span id="vorteile">Warum Sie hier <b>schweißen lernen</b></span>} />
          <div className="grid grid-3">
            {s.vorteile.map((v) => (
              <div key={v.title} className="card card--pad card--hover feature reveal">
                <span className="iconbox"><Icon name={v.icon} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Termine */}
      <section className="section section--s1" id="termine" aria-labelledby="termine-h">
        <div className="container">
          <SectionHead kicker="Kurstermine" title={<span id="termine-h">Termine in <b>{s.name}</b></span>} lead="Klicken Sie im Kalender auf einen markierten Tag oder filtern Sie nach Verfahren. Mit „Platz buchen“ starten Sie die Anmeldung." />
          <TerminExplorer initial={termine.map(toView)} kurse={KURSE_MINI} standort={id}
            emptyHint={id === 'hamburg' ? <p className="muted" style={{ margin: 0 }}>Die neuen Termine in Ellerhoop werden gerade geplant. Melden Sie sich gern direkt bei Dozent Bernd Koliwer unter <a href="tel:+491604530356">0160 4530356</a> oder setzen Sie sich auf die Warteliste.</p> : undefined} />
        </div>
      </section>

      {/* Kurse */}
      <section className="section" aria-labelledby="kurse-h">
        <div className="container">
          <SectionHead kicker="Kursangebot" title={<span id="kurse-h">{kurse.length > 1 ? `${kurse.length} Kursformate` : 'Unser Kurs'} in <b>{s.name}</b></span>} />
          <div className="grid grid-3">{kurse.map((k) => <CourseCard key={k.slug} k={k} naechster={naechste[k.slug]} />)}</div>
          {id === 'hamburg' && (
            <div className="grid grid-2" style={{ marginTop: 32 }}>
              <div className="reveal"><ProcessViz type="mix" caption="MAG, WIG und Elektrode an einem Tag" /></div>
              <div className="card card--pad reveal">
                <p className="kicker">Anmeldung Region Hamburg</p>
                <h3>Online oder direkt beim Dozenten</h3>
                <p>Buchen Sie Ihren Platz online über den Terminkalender – oder melden Sie sich per E-Mail bzw. telefonisch beim Dozenten Herrn Bernd Koliwer an.</p>
                <div className="btn-row"><a className="btn btn--primary" href="tel:+491604530356"><Icon name="phone" />0160 4530356</a><Link className="btn btn--secondary" href="/kontakt/?thema=Frage%20zu%20einem%20Kurs#formular">E-Mail schreiben</Link></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Ablauf + Voraussetzungen */}
      <section className="section section--mesh-s1" aria-labelledby="ablauf-h">
        <div className="container">
          <div className="split">
            <div className="span-5 reveal"><DayClockViz /></div>
            <div className="span-7">
              <SectionHead kicker="Ablauf & Voraussetzungen" title={<span id="ablauf-h">Was Sie am Kurstag <b>erwartet</b></span>} />
              <Steps items={[
                { title: 'Ankommen', text: `Zehn Minuten vor Beginn am Eingang, ${s.street}.` },
                { title: 'Grundlagen', text: 'Sicherheit, Gerät, Verfahren – kompakt erklärt.' },
                { title: 'Praxis', text: 'Am eigenen Schweißplatz, mit Korrektur durch den Dozenten.' },
                { title: 'Abschluss', text: 'Auswertung der Nähte und Teilnahmebescheinigung.' }
              ]} />
              <div className="grid grid-2" style={{ marginTop: 32 }}>
                <div className="notice reveal"><Icon name="check" /><p><b>Voraussetzungen:</b> Für Einsteigerkurse keine Vorkenntnisse. Handwerkliches Geschick ist von Vorteil.</p></div>
                <div className="notice reveal"><Icon name="shield" /><p><b>Mitbringen:</b> feste Schuhe, Baumwollkleidung, ggf. Brille (keine Kontaktlinsen).</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {id === 'muenchen' ? <FilialeMuenchen /> : null}
      <KursraumDozenten standort={id} />

      {/* Anfahrt */}
      <section className="section" aria-labelledby="anfahrt-h">
        <div className="container">
          <div className="split">
            <div className="span-5">
              <SectionHead kicker="Anfahrt" title={<span id="anfahrt-h">So finden Sie <b>zu uns</b></span>} />
              <address className="reveal" style={{ fontStyle: 'normal', marginBottom: 20 }}><b style={{ color: 'var(--ink)' }}>{s.firma}</b><br />{s.street}<br />{s.zip} {s.city}<br /><a href={s.tel.href}>{s.tel.text}</a> · <a href={`mailto:${s.mail}`}>{s.mail}</a></address>
              {s.anfahrt.map((a) => <div key={a.title} className="reveal" style={{ marginBottom: 14 }}><h3 className="h4" style={{ marginBottom: 4 }}>{a.title}</h3><p className="small" style={{ margin: 0 }}>{a.text}</p></div>)}
              <div className="btn-row reveal"><a className="btn btn--primary" href={s.maps} target="_blank" rel="noopener"><Icon name="route" />Route planen</a><Link className="btn btn--secondary" href={s.anfahrtUrl}>Anfahrtsseite</Link></div>
            </div>
            <div className="span-7 reveal"><MapConsent query={`${s.firma}, ${s.street}, ${s.zip} ${s.city}`} title={`Karte ${s.name}`} /></div>
          </div>
          <p className="small muted" style={{ marginTop: 28 }}>Teilnehmer kommen zu uns aus {s.einzugsgebiet.join(', ')} und Umgebung.</p>
        </div>
      </section>

      {id === 'muenchen' ? <ReviewsSection /> : null}
      {id === 'muenchen' ? <VideosSection /> : null}

      <section className="section section--s2"><div className="container"><div className="reveal"><BookingFlowViz /></div></div></section>

      <FaqSection cats={['Kurse', 'Buchung & Zahlung', 'Standorte']} limit={8} />

      <CtaBand title={<>Schweißkurs in <b>{s.name}</b> buchen</>} text="Wählen Sie Ihren Termin und sichern Sie sich Ihren Schweißplatz." primary={{ label: 'Zu den Terminen', href: '#termine' }} secondary={{ label: 'Kontakt', href: '/kontakt/' }} />
    </>
  );
}
