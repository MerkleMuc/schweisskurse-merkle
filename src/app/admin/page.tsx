import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function AdminStart() {
  return (
    <main className="container" style={{ padding: '80px var(--gutter)' }}>
      <p className="kicker">Merkle Schweißkurse · Backend</p>
      <h1>Welchen Standort möchten Sie verwalten?</h1>
      <p className="lead">Jeder Standort hat einen eigenen Zugang. Änderungen an Terminen und Plätzen erscheinen sofort auf der Website.</p>
      <div className="grid grid-2" style={{ marginTop: 32, maxWidth: 800 }}>
        <Link href="/admin/muenchen/" className="card card--link card--pad"><Icon name="pin" /><h2 className="h3" style={{ margin: '12px 0 4px' }}>München-Freiham</h2><span className="muted">Kurstermine, Buchungen, Anfragen</span></Link>
        <Link href="/admin/hamburg/" className="card card--link card--pad"><Icon name="pin" /><h2 className="h3" style={{ margin: '12px 0 4px' }}>Region Hamburg</h2><span className="muted">Kurstermine, Buchungen, Anfragen</span></Link>
      </div>
    </main>
  );
}
