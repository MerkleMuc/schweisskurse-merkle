import type { Metadata } from 'next';
import Link from 'next/link';
import { STANDORTE, SITE, KURS_TEAM, TEL } from '@/lib/site';
import { PageHero, SectionHead } from '@/components/UI';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import { FaqSection } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'Kontakt – Fragen zu den Schweißkursen',
  description: 'Kontakt zu Merkle Schweißkurse: Kursberatung München +49 89 897717-28, Region Hamburg +49 4120 3079981, E-Mail info@schweisskurse-merkle.de oder Kontaktformular.',
  alternates: { canonical: '/kontakt/' }
};

export default async function Page({ searchParams }: { searchParams: Promise<{ thema?: string; termin?: string; standort?: string }> }) {
  const sp = await searchParams;
  return (
    <>
      <PageHero trail={[{ label: 'Kontakt', href: '/kontakt/' }]} kicker="Kontakt" title={<>Fragen? <b>Wir sind für Sie da.</b></>} lead="Rufen Sie uns an, schreiben Sie uns oder nutzen Sie das Formular. Wir antworten in der Regel innerhalb eines Werktags." />
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="span-7" id="formular" style={{ scrollMarginTop: 'calc(var(--header-h) + 24px)' }}>
              <SectionHead kicker="Kontaktformular" title={<>Ihre <b>Nachricht</b></>} />
              <ContactForm thema={sp.thema} termin={sp.termin} standort={sp.standort} />
            </div>
            <aside className="span-5" style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
              {KURS_TEAM.map((p) => (
                <div key={p.name} className="card card--pad reveal" style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 16, alignItems: 'center' }}>
                  <span className="berater__avatar" style={{ width: 64, height: 64 }}>{p.foto ? <Image src={p.foto} alt={`Portrait von ${p.name}`} width={64} height={64} /> : <span aria-hidden="true">{p.name.split(' ').map((s) => s[0]).join('')}</span>}</span>
                  <span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>{p.name}</b><br /><span className="small muted">{p.rolle}</span><br /><a href={p.tel.href}>{p.tel.text}</a></span>
                </div>
              ))}
              {(['muenchen', 'hamburg'] as const).map((id) => {
                const s = STANDORTE[id];
                return (
                  <address key={id} className="card card--pad reveal" style={{ fontStyle: 'normal' }}>
                    <p className="kicker">{s.name}</p>
                    <b style={{ color: 'var(--ink)' }}>{s.firma}</b><br />{s.street}<br />{s.zip} {s.city}<br />
                    <a href={s.tel.href}>{s.tel.text}</a><br />
                    <div className="btn-row" style={{ marginTop: 12 }}><Link className="btn btn--secondary btn--sm" href={s.anfahrtUrl}><Icon name="route" />Anfahrt</Link><Link className="btn btn--secondary btn--sm" href={s.regionUrl}><Icon name="calendar" />Termine</Link></div>
                  </address>
                );
              })}
              <div className="card card--pad reveal"><p className="kicker">E-Mail & Chat</p><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a href={SITE.whatsapp} target="_blank" rel="noopener">WhatsApp an die Zentrale</a><br /><span className="small muted">Zentrale München: <a href={TEL.zentrale.href}>{TEL.zentrale.text}</a></span></div>
            </aside>
          </div>
        </div>
      </section>
      <FaqSection limit={6} tone="s1" />
    </>
  );
}
