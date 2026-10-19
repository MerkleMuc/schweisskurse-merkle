import Link from 'next/link';
import { logout } from '../actions';
import { STANDORTE, type StandortId } from '@/lib/site';
import { Icon } from '@/components/Icon';

export function AdminBar({ standort, aktiv }: { standort: StandortId; aktiv: 'termine' | 'buchungen' | 'anfragen' }) {
  const s = STANDORTE[standort];
  const link = (href: string, key: typeof aktiv, label: string) => <Link href={href} aria-current={aktiv === key ? 'page' : undefined}>{label}</Link>;
  return (
    <header className="admin__bar on-dark">
      <div className="container">
        <Link href={`/admin/${standort}/`} style={{ fontWeight: 600 }}>Schweißkurse · {s.name}</Link>
        <nav aria-label="Backend">
          {link(`/admin/${standort}/`, 'termine', 'Termine')}
          {link(`/admin/${standort}/buchungen/`, 'buchungen', 'Buchungen')}
          {link(`/admin/${standort}/anfragen/`, 'anfragen', 'Anfragen')}
          <Link href={s.regionUrl} target="_blank">Website <Icon name="arrowUpRight" className="icon" /></Link>
          <form action={logout}><input type="hidden" name="standort" value={standort} /><button className="btn btn--glass btn--sm" type="submit"><Icon name="logout" />Abmelden</button></form>
        </nav>
      </div>
    </header>
  );
}
