import SiteLayout from './(site)/layout';
import NotFoundContent from './(site)/not-found';

/* Nicht zugeordnete Adressen: 404 im normalen Seitenrahmen. */
export default function NotFound() {
  return <SiteLayout><NotFoundContent /></SiteLayout>;
}
