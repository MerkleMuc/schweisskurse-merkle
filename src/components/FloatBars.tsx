'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';

type Ort = 'muenchen' | 'hamburg';
interface Person { standort: Ort; ort: string; name: string; rolle: string; foto: string | null; tel: { text: string; href: string }; mail: string; zeiten: string }

const ORT_LABEL: Record<Ort, string> = { muenchen: 'München', hamburg: 'Hamburg' };

/*
 * Drei schwebende Elemente am unteren Rand: links die Google-Bewertung,
 * mittig die Aktionsleiste, rechts die Kontaktkarte der Kursberatung mit
 * Umschalter München / Hamburg. Sie erscheinen nach dem ersten Bildschirm.
 */
export function FloatBars({ team, rating, count, reviewsUrl, whatsapp }: { team: Person[]; rating: string; count: number; reviewsUrl: string; whatsapp: string }) {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const [ort, setOrt] = useState<Ort>(pathname.includes('hamburg') ? 'hamburg' : 'muenchen');
  const hidden = pathname.startsWith('/admin') || pathname.startsWith('/buchen');

  useEffect(() => {
    const root = document.documentElement;
    const on = () => root.classList.toggle('floats-on', window.scrollY > window.innerHeight * 0.55);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); root.classList.remove('floats-on'); };
  }, []);

  // Standort folgt der Seite; sonst die zuletzt gewählte Auswahl des Besuchers
  useEffect(() => {
    if (pathname.includes('hamburg')) return setOrt('hamburg');
    if (pathname.includes('muenchen')) return setOrt('muenchen');
    try { const v = localStorage.getItem('sk-ort'); if (v === 'hamburg' || v === 'muenchen') setOrt(v); } catch { /* ohne Speicher */ }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  const waehle = (o: Ort) => {
    setOrt(o);
    try { localStorage.setItem('sk-ort', o); } catch { /* ohne Speicher */ }
  };

  if (hidden) return null;
  const p = team.find((x) => x.standort === ort) || team[0];

  return (
    <>
      <aside className="float rating" aria-label="Google-Bewertung"><a className="rating__a" href={reviewsUrl} target="_blank" rel="noopener" aria-label={`${rating} von 5 Sternen aus ${count} Google-Bewertungen – öffnet Google in neuem Tab`}>
        <Icon name="googleG" className="rating__g" />
        <span className="rating__stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" />)}</span>
        <b aria-hidden="true">{rating}</b>
        <span className="rating__count" aria-hidden="true">({count})</span>
        <Icon name="arrowUpRight" className="rating__ext" />
      </a></aside>

      <nav className="float dock" aria-label="Schnellzugriff">
        <Link className="dock__btn dock__btn--primary" href="/termine-und-anmeldungen/">
          <span className="dock__live" aria-hidden="true" />
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
          <div className="berater__top">
            <p className="berater__title"><span className="dock__live" aria-hidden="true" />Kursberatung</p>
            <button className="berater__close" type="button" onClick={() => setOpen(false)} aria-label="Kontaktkarte schließen"><Icon name="close" /></button>
          </div>
          <div className="segmented berater__switch" role="radiogroup" aria-label="Standort wählen">
            {team.map((x) => (
              <label key={x.standort}>
                <input type="radio" name="berater-ort" value={x.standort} checked={ort === x.standort} onChange={() => waehle(x.standort)} />
                <span><Icon name="pin" />{ORT_LABEL[x.standort]}</span>
              </label>
            ))}
          </div>
          <div className="berater__person" aria-live="polite">
            <span className="berater__avatar">
              {p.foto ? <Image src={p.foto} alt={`Portrait von ${p.name}`} width={72} height={72} /> : <span aria-hidden="true">{initials(p.name)}</span>}
            </span>
            <span>
              <span className="berater__name">{p.name}</span>
              <span className="berater__role">{p.rolle}</span>
              <span className="berater__role">{p.ort} · {p.zeiten}</span>
            </span>
          </div>
          <a className="btn btn--primary btn--block berater__call" href={p.tel.href}>
            <Icon name="phone" /><span>Anrufen<small>{p.tel.text}</small></span>
          </a>
          <div className="berater__more">
            <a className="btn btn--secondary" href={`mailto:${p.mail}`}><Icon name="mail" />E-Mail</a>
            <a className="btn btn--secondary" href={whatsapp} target="_blank" rel="noopener"><Icon name="whatsapp" />WhatsApp</a>
          </div>
          <p className="berater__mailtext">{p.mail}</p>
        </div>
        <button className="float mini" type="button" aria-label={`Kursberatung ${ORT_LABEL[ort]}: Kontaktkarte ${open ? 'schließen' : 'öffnen'}`} aria-expanded={open} aria-controls="berater-card" onClick={() => setOpen((v) => !v)}>
          <span className="mini__dot" aria-hidden="true" />
          <span className="mini__text">Kursberatung {ORT_LABEL[ort]}</span>
          <span className="mini__avatars" aria-hidden="true">
            <span>{p.foto ? <Image src={p.foto} alt="" width={34} height={34} /> : initials(p.name)}</span>
          </span>
        </button>
      </aside>
    </>
  );
}

function initials(name: string) {
  return name.split(' ').map((s) => s[0]).join('').slice(0, 2);
}
