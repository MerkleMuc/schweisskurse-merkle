import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { AGB } from '@/lib/legal-pages';

export const metadata: Metadata = { title: 'Allgemeine Geschäftsbedingungen', description: 'AGB der Merkle Schweißkurse: Vertragsschluss, Zahlung, Stornierung, Teilnahme und Haftung.', alternates: { canonical: '/agb/' } };

export default function Page() {
  return <LegalPage title="Allgemeine Geschäftsbedingungen" href="/agb/" lead="Teilnahmebedingungen für Schweißkurse und Lehrgänge." sections={AGB} />;
}
