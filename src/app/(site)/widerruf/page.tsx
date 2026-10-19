import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { WIDERRUF_SEITE } from '@/lib/legal-pages';

export const metadata: Metadata = { title: 'Widerrufsbelehrung', description: 'Widerrufsbelehrung und Muster-Widerrufsformular für Buchungen der Merkle Schweißkurse durch Verbraucher.', alternates: { canonical: '/widerruf/' } };

export default function Page() {
  return <LegalPage title="Widerrufsbelehrung" href="/widerruf/" lead="Für Verbraucher im Sinne des § 13 BGB." sections={WIDERRUF_SEITE} />;
}
