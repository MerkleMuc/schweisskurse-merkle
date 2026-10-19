import type { Metadata } from 'next';
import { LocationPage } from '@/components/LocationPage';

export const revalidate = 300;
export const metadata: Metadata = {
  title: { absolute: 'Schweißkurs Hamburg – MAG, WIG & E in Ellerhoop | Merkle' },
  description: 'Schweißkurs in der Region Hamburg: allgemeiner Schweißkurs mit MAG, WIG und Elektrode an einem Tag bei MERKLE NORD in Ellerhoop (Kreis Pinneberg). 357 € inkl. MwSt. Jetzt Termin buchen.',
  alternates: { canonical: '/region-hamburg/' }
};

export default function Page() {
  return <LocationPage id="hamburg" h1={<>Schweißkurs <b>Region Hamburg</b></>} lead="In der Region Hamburg bieten wir einen allgemeinen Schweißkurs an, in dem MAG-, WIG- und Elektrodenschweißen enthalten sind. Die Kurse finden bei MERKLE NORD in der Oha 5 in 25373 Ellerhoop statt." />;
}
