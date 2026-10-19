import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isStandort, loginConfigured } from '@/lib/auth';
import { STANDORTE } from '@/lib/site';
import { LoginForm } from './LoginForm';

export default async function Login({ params }: { params: Promise<{ standort: string }> }) {
  const { standort } = await params;
  if (!isStandort(standort)) notFound();
  const s = STANDORTE[standort];
  return (
    <main className="container" style={{ padding: '80px var(--gutter)' }}>
      <p className="kicker"><Link href="/admin/">Backend</Link> · {s.name}</p>
      <h1>Anmeldung {s.name}</h1>
      {loginConfigured(standort) ? (
        <>
          <p className="lead">Zugang für das Kursteam {s.name}.</p>
          <LoginForm standort={standort} />
          {process.env.NODE_ENV !== 'production' && !process.env[`ADMIN_PASSWORD_${standort.toUpperCase()}`] && (
            <p className="small muted" style={{ marginTop: 16 }}>Entwicklungsmodus: Passwort <code>{standort}-demo</code>. In Produktion über ADMIN_PASSWORD_{standort.toUpperCase()} setzen.</p>
          )}
        </>
      ) : (
        <div className="flash flash--err">Für diesen Standort ist noch kein Passwort hinterlegt (Umgebungsvariable ADMIN_PASSWORD_{standort.toUpperCase()}).</div>
      )}
    </main>
  );
}
