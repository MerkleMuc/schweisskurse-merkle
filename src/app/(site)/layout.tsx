import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatBars } from '@/components/FloatBars';
import { GOOGLE, KURS_TEAM, SITE, TEL } from '@/lib/site';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#inhalt">Zum Inhalt springen</a>
      <Header phone={TEL.kurse.text} phoneHref={TEL.kurse.href} />
      <main id="inhalt">{children}</main>
      <Footer />
      <FloatBars team={KURS_TEAM} rating={GOOGLE.rating} count={GOOGLE.count} reviewsUrl={GOOGLE.url} whatsapp={SITE.whatsapp} />
    </>
  );
}
