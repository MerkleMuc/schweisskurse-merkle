'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV, DARK_TOP_PATHS } from '@/lib/nav';
import { Icon } from './Icon';

export function Header({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const burger = useRef<HTMLDetailsElement>(null);
  const overDark = DARK_TOP_PATHS.has(pathname);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // Mobile Navigation nach Seitenwechsel schließen
  useEffect(() => { if (burger.current) burger.current.open = false; }, [pathname]);

  const isActive = (href: string, groups?: { links: { href: string }[] }[]) =>
    pathname === href || !!groups?.some((g) => g.links.some((l) => l.href === pathname)) || (href === '/ratgeber/' && pathname.startsWith('/ratgeber/'));

  return (
    <header className={`header${overDark ? ' header--over-dark' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header__service on-dark">
        <div className="container">
          <nav className="header__locs" aria-label="Kursorte">
            <Link href="/region-muenchen/" aria-current={pathname === '/region-muenchen/' ? 'page' : undefined}><Icon name="pin" />München</Link>
            <Link href="/region-hamburg/" aria-current={pathname === '/region-hamburg/' ? 'page' : undefined}><Icon name="pin" />Region Hamburg</Link>
          </nav>
          <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
            <span className="header__hours">Kursberatung Mo–Fr</span>
            <a href={phoneHref} aria-label={`Kursberatung anrufen: ${phone}`}><Icon name="headset" /><span className="header__phone">{phone}</span></a>
          </div>
        </div>
      </div>
      <div className="header__main">
        <div className="container">
          <Link href="/" className="logo">
            <span className="logo__mark"><Image src="/images/logos/merkle-logo.png" alt="Merkle – zur Startseite" width={157} height={43} priority /></span>
            <span className="logo__word"><b>Schweißkurse</b><span>München · Hamburg</span></span>
          </Link>

          <nav className="nav" aria-label="Hauptnavigation">
            {NAV.map((item) => (
              <div className="nav__item" key={item.label}>
                <Link href={item.href} className="nav__link" aria-current={isActive(item.href, item.groups) ? 'true' : undefined}>
                  {item.label}
                  {item.groups && <Icon name="chevronDown" />}
                </Link>
                {item.groups && (
                  <div className={`nav__drop${item.wide ? ' nav__drop--wide' : ''}`}>
                    {item.groups.map((g) => (
                      <div key={g.title}>
                        <p className="nav__drop-title">{g.title}</p>
                        {g.links.map((l) => (
                          <Link key={l.href} href={l.href}>
                            {l.icon && <Icon name={l.icon} />}
                            <span><b>{l.label}</b>{l.text && <small>{l.text}</small>}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Link href="/termine-und-anmeldungen/" className="btn btn--primary header__cta"><Icon name="calendar" />Termin buchen</Link>

          <details className="burger" ref={burger}>
            <summary aria-label="Menü öffnen"><Icon name="menu" />Menü</summary>
            <div className="mobile-nav">
              {NAV.map((item) => (
                <div key={item.label}>
                  {item.groups ? (
                    <>
                      <h2>{item.label}</h2>
                      {item.groups.flatMap((g) => g.links).map((l) => (
                        <Link key={l.href} href={l.href}>{l.icon && <Icon name={l.icon} />}{l.label}</Link>
                      ))}
                    </>
                  ) : (
                    <Link href={item.href}><Icon name={item.label === 'Termine' ? 'calendar' : 'mail'} />{item.label}</Link>
                  )}
                </div>
              ))}
              <Link href="/termine-und-anmeldungen/" className="btn btn--primary btn--block"><Icon name="calendar" />Termin buchen</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
