import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTermin, heute } from '@/lib/termine';
import { KURS_BY_SLUG } from '@/lib/courses';
import { STANDORTE } from '@/lib/site';
import { CONSENT_TEXT } from '@/lib/legal';
import { formatDatum } from '@/lib/view';
import { BookingWizard } from '@/components/BookingWizard';
import { Breadcrumbs } from '@/components/UI';
import { Icon } from '@/components/Icon';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Kurs buchen', robots: { index: false, follow: true } };

export default async function Buchen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getTermin(id);
  if (!t) notFound();
  const k = KURS_BY_SLUG[t.kurs];
  const ort = STANDORTE[t.standort];
  const buchbar = t.status === 'aktiv' && t.frei > 0 && t.datum >= heute();

  return (
    <section className="section section--mesh-s1 page-top">
      <div className="container">
        <Breadcrumbs trail={[{ label: 'Termine', href: '/termine-und-anmeldungen/' }, { label: k?.kurz || 'Kurs', href: `/${t.kurs}/` }, { label: 'Buchung', href: `/buchen/${t.id}/` }]} />
        <div className="section-head" style={{ marginBottom: 32 }}>
          <p className="kicker">Buchung · {ort.name}</p>
          <h1>In wenigen Schritten zu Ihrem <b>Kursplatz</b></h1>
          <p className="lead">{k?.name} am {formatDatum(t.datum)}. Ihr Platz wird beim Absenden verbindlich für Sie reserviert.</p>
        </div>
        {buchbar ? (
          <BookingWizard
            terminId={t.id}
            kursName={k?.name || t.kurs}
            kursKurz={k?.kurz || t.kurs}
            datumText={t.datum_bis ? `${formatDatum(t.datum, { day: '2-digit', month: '2-digit', year: 'numeric' })} – ${formatDatum(t.datum_bis, { day: '2-digit', month: '2-digit', year: 'numeric' })}` : formatDatum(t.datum, { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}
            zeitText={`${t.start_zeit} – ${t.end_zeit} Uhr`}
            ortText={`${ort.street}, ${ort.zip} ${ort.city}`}
            preisCent={t.preis_cent}
            frei={t.frei}
            pruefung={k?.verfahren === 'pruefung'}
            voraussetzung={k?.voraussetzung || 'Keine.'}
            consent={CONSENT_TEXT}
          />
        ) : (
          <div className="empty">
            <p style={{ color: 'var(--ink)' }}><b>Dieser Termin ist leider nicht mehr buchbar{t.frei < 1 ? ' – er ist ausgebucht' : ''}.</b></p>
            <div className="btn-row" style={{ justifyContent: 'center' }}>
              <Link className="btn btn--primary" href={`/${t.kurs}/#termine`}><Icon name="calendar" />Andere Termine ansehen</Link>
              <Link className="btn btn--secondary" href={`/kontakt/?thema=Warteliste&termin=${t.id}#formular`}>Auf die Warteliste</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
