import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { DATENSCHUTZ } from '@/lib/legal-pages';

export const metadata: Metadata = { title: 'Datenschutzerklärung', description: 'Datenschutzerklärung der Merkle Schweißkurse: Kursbuchung, Kontaktformular, Zahlung, Videos und Karten.', alternates: { canonical: '/datenschutz/' } };

export default function Page() {
  return <LegalPage title="Datenschutzerklärung" href="/datenschutz/" lead="Wie wir mit Ihren Daten umgehen – kurz und vollständig." sections={DATENSCHUTZ} />;
}
