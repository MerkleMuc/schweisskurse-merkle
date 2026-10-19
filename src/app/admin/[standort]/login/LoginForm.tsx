'use client';

import { useActionState } from 'react';
import { login } from '../../actions';

export function LoginForm({ standort }: { standort: string }) {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="form card card--pad" style={{ maxWidth: 420 }}>
      <input type="hidden" name="standort" value={standort} />
      {state.error && <div className="flash flash--err" role="alert">{state.error}</div>}
      <div className="field"><label htmlFor="pw">Passwort</label><input className="input" id="pw" name="password" type="password" autoComplete="current-password" required autoFocus /></div>
      <button className="btn btn--primary" type="submit" disabled={pending}>{pending ? 'Prüfe …' : 'Anmelden'}</button>
    </form>
  );
}
