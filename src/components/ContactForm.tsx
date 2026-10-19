'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { sendeAnfrage, type FormState } from '@/app/(site)/kontakt/actions';
import { Icon } from './Icon';

const THEMEN = ['Frage zu einem Kurs', 'Warteliste', 'Firmenschulung / Inhouse-Kurs', 'Gutschein', 'Termin ändern oder stornieren', 'Sonstiges'];

export function ContactForm({ thema, standort, termin }: { thema?: string; standort?: string; termin?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(sendeAnfrage, { ok: false });
  const e = state.errors || {};
  const inv = (k: string) => (e[k] ? { 'aria-invalid': true as const, 'aria-describedby': `${k}-err` } : {});
  const err = (k: string) => e[k] ? <span className="field__err" id={`${k}-err`}>{e[k]}</span> : null;

  if (state.ok) {
    return <div className="notice" role="status"><Icon name="check" /><p><b>{state.message}</b></p></div>;
  }
  const startThema = thema && THEMEN.includes(thema) ? thema : THEMEN[0];

  return (
    <form action={action} className="form" noValidate>
      <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {state.message && <div className="notice notice--warn" role="alert"><Icon name="alert" /><p>{state.message}</p></div>}
      <div className="form-row">
        <div className="field"><label htmlFor="k-thema">Thema</label>
          <select className="select" id="k-thema" name="thema" defaultValue={startThema}>{THEMEN.map((t) => <option key={t}>{t}</option>)}</select>
        </div>
        <div className="field"><label htmlFor="k-standort">Standort</label>
          <select className="select" id="k-standort" name="standort" defaultValue={standort || ''}><option value="">Egal / weiß noch nicht</option><option value="muenchen">München</option><option value="hamburg">Region Hamburg</option></select>
        </div>
      </div>
      <div className="form-row">
        <div className="field"><label htmlFor="k-name">Name <span className="req">*</span></label><input className="input" id="k-name" name="name" autoComplete="name" required {...inv('name')} />{err('name')}</div>
        <div className="field"><label htmlFor="k-email">E-Mail <span className="req">*</span></label><input className="input" id="k-email" type="email" name="email" autoComplete="email" required {...inv('email')} />{err('email')}</div>
      </div>
      <div className="field"><label htmlFor="k-tel">Telefon <span className="muted">(optional, für Rückruf)</span></label><input className="input" id="k-tel" type="tel" name="telefon" autoComplete="tel" /></div>
      <div className="field"><label htmlFor="k-msg">Ihre Nachricht <span className="req">*</span></label>
        <textarea className="textarea" id="k-msg" name="nachricht" required defaultValue={termin ? `Bitte setzen Sie mich auf die Warteliste für den Termin ${termin}.` : ''} {...inv('nachricht')} />{err('nachricht')}
      </div>
      <label className="check"><input type="checkbox" name="datenschutz" required {...inv('datenschutz')} /><span>Ich bin einverstanden, dass meine Angaben zur Beantwortung meiner Anfrage verarbeitet werden. Hinweise in der <Link href="/datenschutz/">Datenschutzerklärung</Link>. <span className="req">*</span>{err('datenschutz')}</span></label>
      <div><button className="btn btn--primary" type="submit" disabled={pending}>{pending ? 'Wird gesendet …' : <>Nachricht senden<Icon name="arrowRight" /></>}</button></div>
    </form>
  );
}
