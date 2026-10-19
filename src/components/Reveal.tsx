'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/*
 * Scroll-Reveal über IntersectionObserver. Der Ausgangszustand hängt an der
 * Klasse .js, die ein Skript im <head> setzt. Ohne JavaScript, ohne
 * IntersectionObserver oder wenn dieses Skript nicht lädt, bleibt alles
 * sichtbar (das Kopfskript nimmt .js nach drei Sekunden wieder weg).
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as { __skReveal?: boolean }).__skReveal = true;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in), .viz:not(.is-in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    // Staffelung innerhalb gemeinsamer Eltern
    const groups = new Map<Element | null, number>();
    els.forEach((el) => {
      if (!el.classList.contains('reveal')) return;
      const n = groups.get(el.parentElement) ?? 0;
      el.style.setProperty('--i', String(n % 4));
      groups.set(el.parentElement, n + 1);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          e.target.classList.add('is-in');
          if (e.target.classList.contains('reveal')) io.unobserve(e.target);
        } else if (e.target.classList.contains('viz')) {
          e.target.classList.remove('is-in'); // Animationen außerhalb des Sichtfelds pausieren
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    els.forEach((el) => {
      // Elemente oberhalb des Viewports (Ankersprung) sofort zeigen
      if (el.getBoundingClientRect().bottom < 0) el.classList.add('is-in');
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
