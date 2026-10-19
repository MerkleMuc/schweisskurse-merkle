import type { Metadata } from 'next';
import { LocationPage } from '@/components/LocationPage';

export const revalidate = 300;
export const metadata: Metadata = {
  title: { absolute: 'Schweißkurs München – Schweißen lernen in Freiham | Merkle' },
  description: 'Schweißkurse in München-Freiham: MIG/MAG, WIG, E-Hand, Autogen, Alu-WIG und Lehrgänge mit Prüfung nach DIN EN ISO 9606-1. Eigener Schweißplatz, max. 9 Teilnehmer, ab 415 €. Termine online buchen.',
  alternates: { canonical: '/region-muenchen/' }
};

export default function Page() {
  return <LocationPage id="muenchen" h1={<>Schweißkurs <b>München</b></>} lead="Unsere Schweißkurse finden standardmäßig jeden Samstag im Betriebsgebäude von Merkle Schweißtechnik in München-Freiham statt – für jedes Verfahren ein eigener Kurs, dazu Wochenlehrgänge mit Prüfung." />;
}
