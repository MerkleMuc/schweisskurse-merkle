import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/UI';
import { WiderrufForm } from '@/components/WiderrufForm';

export const metadata: Metadata = {
  title: 'Vertrag widerrufen',
  description: 'Elektronische Widerrufsfunktion nach § 356a BGB: Widerrufen Sie Ihre Schweißkurs-Buchung online in zwei Schritten.',
  alternates: { canonical: '/vertrag-widerrufen/' },
  robots: { index: true, follow: true }
};

export default async function Page({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  return (
    <>
      <PageHero trail={[{ label: 'Vertrag widerrufen', href: '/vertrag-widerrufen/' }]} kicker="Widerrufsfunktion" title={<>Vertrag <b>widerrufen</b></>}
        lead="Hier können Sie Ihre Buchung als Verbraucher innerhalb der Widerrufsfrist elektronisch widerrufen. Sie benötigen keinen Grund. Sie erhalten unmittelbar eine Eingangsbestätigung mit Datum und Uhrzeit per E-Mail." />
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="span-7"><WiderrufForm refNr={ref} /></div>
            <div className="span-5">
              <div className="card card--pad">
                <p className="kicker">Hinweise</p>
                <p className="small">Die Widerrufsfrist beträgt 14 Tage ab Vertragsschluss. Haben Sie den vorzeitigen Beginn der Dienstleistung verlangt, schulden Sie für bereits erbrachte Leistungen Wertersatz. Nach vollständiger Erbringung erlischt das Widerrufsrecht.</p>
                <p className="small">Alle Einzelheiten finden Sie in der <Link href="/widerruf/">Widerrufsbelehrung</Link>. Eine Stornierung nach den <Link href="/agb/">AGB</Link> ist davon unabhängig möglich.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
