import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { organizationLd, websiteLd } from '@/lib/schema';

const inter = localFont({
  src: '../../public/fonts/inter-var-latin.woff2',
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
  adjustFontFallback: 'Arial',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Schweißkurse München & Hamburg | Merkle Schweißkurse', template: '%s | Merkle Schweißkurse' },
  description: 'Schweißen lernen beim Fachhandel: MIG/MAG-, WIG-, E-Hand- und Autogen-Schweißkurse für Einsteiger, Aufbaukurse und Lehrgänge mit Prüfung nach DIN EN ISO 9606-1 in München und Hamburg.',
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: { type: 'website', locale: 'de_DE', siteName: SITE.name, images: [{ url: '/images/kurse/schweisser-portrait.jpg', width: 1200, height: 500, alt: 'Schweißer mit Schweißhelm bei Merkle' }] },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  icons: { icon: '/favicon.svg' },
  other: { 'geo.region': 'DE-BY', 'geo.placename': 'München', 'geo.position': '48.136052;11.413829', ICBM: '48.136052, 11.413829' }
};

export const viewport: Viewport = { themeColor: '#111827', width: 'device-width', initialScale: 1 };

const HEAD_SCRIPT = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__skReveal)document.documentElement.classList.remove('js')},3000);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
