import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { IMPRESSUM } from '@/lib/legal-pages';

export const metadata: Metadata = { title: 'Impressum', description: 'Impressum der Wilhelm Merkle Schweißtechnik GmbH, Anbieter der Merkle Schweißkurse in München und Hamburg.', alternates: { canonical: '/impressum/' } };

export default function Page() {
  return <LegalPage title="Impressum" href="/impressum/" lead="Angaben gemäß § 5 DDG." sections={IMPRESSUM} />;
}
