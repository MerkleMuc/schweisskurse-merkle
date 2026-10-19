import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function NotFound() {
  return (
    <section className="section section--mesh-s1 page-top">
      <div className="container">
        <p className="kicker">Fehler 404</p>
        <h1>Diese Seite gibt es <b>nicht (mehr).</b></h1>
        <p className="lead">Vielleicht finden Sie hier, was Sie suchen:</p>
        <div className="btn-row" style={{ marginTop: 24 }}>
          <Link className="btn btn--primary" href="/termine-und-anmeldungen/"><Icon name="calendar" />Kurstermine</Link>
          <Link className="btn btn--secondary" href="/schweisskurse-lehrgaenge/">Alle Kurse</Link>
          <Link className="btn btn--secondary" href="/ratgeber/">Ratgeber</Link>
          <Link className="btn btn--secondary" href="/kontakt/">Kontakt</Link>
        </div>
      </div>
    </section>
  );
}
