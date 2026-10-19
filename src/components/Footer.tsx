import Link from 'next/link';
import { FOOTER_COLS, LEGAL_LINKS } from '@/lib/nav';
import { SITE, STANDORTE, TEL } from '@/lib/site';
import { Icon } from './Icon';

export function Footer() {
  const m = STANDORTE.muenchen;
  const h = STANDORTE.hamburg;
  return (
    <footer className="footer on-dark">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <p className="kicker">Merkle Schweißkurse</p>
            <p>Schweißen lernen beim Fachhandel: Einsteigerkurse, Aufbaukurse und Lehrgänge mit Prüfung nach DIN EN ISO 9606-1 in München und in der Region Hamburg.</p>
            <address style={{ fontStyle: 'normal', display: 'grid', gap: 14, marginTop: 24 }}>
              <span><b style={{ color: 'var(--on-dark)' }}>{m.firma}</b><br />{m.street}, {m.zip} {m.city}-{m.ortsteil}<br /><a href={TEL.kurse.href}>{TEL.kurse.text}</a></span>
              <span><b style={{ color: 'var(--on-dark)' }}>{h.firma}</b><br />{h.street}, {h.zip} {h.city}<br /><a href={h.tel.href}>{h.tel.text}</a></span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </address>
          </div>
          {FOOTER_COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2>{c.title}</h2>
              <ul>{c.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {SITE.legalName} · Ein Angebot von <a href={SITE.mutter} rel="noopener">Merkle Schweißtechnik</a> · <a href={SITE.shop} rel="noopener">Merkle-Shop</a></span>
          <ul>
            {LEGAL_LINKS.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
            <li><a href={SITE.youtube} rel="noopener" aria-label="Merkle auf YouTube" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="youtube" />YouTube</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
