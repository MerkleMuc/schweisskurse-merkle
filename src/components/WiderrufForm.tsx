'use client';

import { useActionState, useState } from 'react';
import { sendeWiderruf, type FormState } from '@/app/(site)/kontakt/actions';
import { Icon } from './Icon';

/* Zweistufige Widerrufsfunktion nach § 356a BGB:
   1. Schaltfläche „Vertrag widerrufen“, 2. Angaben + „Widerruf bestätigen“. */
export function WiderrufForm({ refNr }: { refNr?: string }) {
  const [open, setOpen] = useState(!!refNr);
  const [state, action, pending] = useActionState<FormState, FormData>(sendeWiderruf, { ok: false });
  const e = state.errors || {};
  if (state.ok) return <div className="notice" role="status"><Icon name="check" /><p><b>{state.message}</b></p></div>;
  if (!open) return <button className="btn btn--primary" type="button" onClick={() => setOpen(true)}><Icon name="undo" />Vertrag widerrufen</button>;
  return (
    <form action={action} className="form" noValidate>
      <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {state.message && <div className="notice notice--warn" role="alert"><Icon name="alert" /><p>{state.message}</p></div>}
      <div className="form-row">
        <div className="field"><label htmlFor="w-name">Name <span className="req">*</span></label><input className="input" id="w-name" name="name" required autoComplete="name" aria-invalid={!!e.name} />{e.name && <span className="field__err">{e.name}</span>}</div>
        <div className="field"><label htmlFor="w-email">E-Mail-Adresse der Buchung <span className="req">*</span></label><input className="input" id="w-email" type="email" name="email" required autoComplete="email" aria-invalid={!!e.email} />{e.email && <span className="field__err">{e.email}</span>}</div>
      </div>
      <div className="field"><label htmlFor="w-ref">Buchungsnummer <span className="muted">(falls zur Hand)</span></label><input className="input" id="w-ref" name="ref" defaultValue={refNr} placeholder="SK-M2026-…" /></div>
      <div className="field"><label htmlFor="w-msg">Weitere Angaben zur Zuordnung <span className="muted">(optional)</span></label><textarea className="textarea" id="w-msg" name="nachricht" rows={3} placeholder="z. B. Kurs und Datum" /></div>
      <div><button className="btn btn--primary" type="submit" disabled={pending}>{pending ? 'Wird gesendet …' : <><Icon name="check" />Widerruf bestätigen</>}</button></div>
    </form>
  );
}
