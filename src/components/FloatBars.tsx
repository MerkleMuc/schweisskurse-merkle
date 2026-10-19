'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';

interface Person { name: string; rolle: string; foto: string | null; tel: { text: string; href: string }; mail: string }

/*
 * Drei schwebende Elemente am unteren Rand, alle aus Glas und vollrund:
 * links die Google-Bewertung, mittig die Aktionsleiste, rechts die
 * Kontaktkarte mit den beiden Ansprechpersonen für Schweißkurse.
 * Sie erscheinen erst nach dem ersten Bildschirm.
 */
export function FloatBars({ team, rating, count, reviewsUrl, whatsapp }: { team: Person[]; rating: string; count: number; reviewsUrl: string; whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '';
  const hidden = pathname.startsWith('/admin') || pathname.startsWith('/buchen');

  useEffect(() => {
    const root = document.documentElement;
    const on = () => root.classList.toggle('floats-on', window.scrollY > window.innerHeight * 0.55);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); root.classList.remove('floats-on'); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  if (hidden) return null;

  return (
    <>
      <aside className="float rating" aria-label="Google-Bewertung">
        <a className="rating__pill" href={reviewsUrl} target="_blank" rel="noopener">
          <Icon name="googleG" className="rating__g" />
          <span className="rating__stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" />)}</span>
          <span>{rating}</span>
          <span className="rating__count">({count})</span>
          <span className="sr-only">{rating} von 5 Sternen aus {count} Google-Bewertungen</span>
        </a>
        <Link className="rating__link" href="/referenzen/">Kundenstimmen <Icon name="arrowUpRight" /></Link>
      </aside>

      <nav className="float dock" aria-label="Schnellzugriff">
        <Link className="dock__btn dock__btn--primary" href="/termine-und-anmeldungen/">
          <span className="dock__ember" aria-hidden="true" />
          <span className="dock__full">Freie Termine ansehen</span><span className="dock__short">Termine</span>
        </Link>
        <Link className="dock__btn" href="/kontakt/#formular">
          <Icon name="headset" /><span className="dock__full">Frage stellen</span><span className="dock__short">Frage</span>
        </Link>
        <a className="dock__btn" href={whatsapp} target="_blank" rel="noopener">
          <Icon name="whatsapp" /><span className="dock__full">WhatsApp</span><span className="dock__short">Chat</span>
        </a>
      </nav>

      <aside className="berater-wrap" aria-label="Persönlicher Kontakt">
        <div className="float berater" hidden={!open} id="berater-card">
          <button className="berater__close" type="button" onClick={() => setOpen(false)} aria-label="Kontaktkarte schließen"><Icon name="close" /></button>
          <p className="berater__title"><Icon name="check" />Ihre Ansprechpartner für Schweißkurse</p>
          {team.map((p) => (
            <div className="berater__person" key={p.name}>
              <span className="berater__avatar">
                {p.foto ? <Image src={p.foto} alt={`Portrait von ${p.name}`} width={56} height={56} /> : <span aria-hidden="true">{initials(p.name)}</span>}
              </span>
              <span>
                <span className="berater__name">{p.name}</span>
                <span className="berater__role">{p.rolle}</span>
              </span>
              <div className="berater__actions">
                <a className="btn btn--primary btn--sm" href={p.tel.href}><Icon name="phone" />{p.tel.text}</a>
                <a className="btn btn--secondary btn--sm btn--icon" href={`mailto:${p.mail}`} aria-label={`E-Mail an ${p.name}`}><Icon name="mail" /></a>
              </div>
            </div>
          ))}
        </div>
        <button className="float mini" type="button" aria-label="Kursberatung: Kontaktkarte öffnen" aria-expanded={open} aria-controls="berater-card" onClick={() => setOpen((v) => !v)}>
          <span className="mini__dot" aria-hidden="true" />
          <span className="mini__text">Kursberatung</span>
          <span className="mini__avatars" aria-hidden="true">
            {team.map((p) => (
              <span key={p.name}>{p.foto ? <Image src={p.foto} alt="" width={34} height={34} /> : initials(p.name)}</span>
            ))}
          </span>
        </button>
      </aside>
    </>
  );
}

function initials(name: string) {
  return name.split(' ').map((s) => s[0]).join('').slice(0, 2);
}
