'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { sendeAnfrage, type FormState } from '@/app/(site)/kontakt/actions';
import { Icon } from './Icon';

/* Gutschein-Bestellung mit Live-Vorschau. Die Bestellung geht als Anfrage
   ins Backend; nach Zahlungseingang wird der Gutschein personalisiert versendet. */
export function GutscheinForm({ kurse }: { kurse: { slug: string; name: string; preis: number }[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(sendeAnfrage, { ok: false });
  const [kurs, setKurs] = useState(kurse[0]?.slug);
  const [fuer, setFuer] = useState('');
  const [gruss, setGruss] = useState('');
  const [kaeufer, setKaeufer] = useState('');
  const k = kurse.find((x) => x.slug === kurs) || kurse[0];
  const nachricht = `Gutschein-Bestellung\nKurs: ${k?.name} (${k?.preis} €)\nGutschein für: ${fuer}\nGrußtext: ${gruss || '–'}\nBesteller: ${kaeufer}`;
  const e = state.errors || {};

  if (state.ok) return <div className="notice" role="status"><Icon name="check" /><p><b>Danke für Ihre Bestellung!</b> Wir senden Ihnen die Zahlungsinformationen per E-Mail. Nach Zahlungseingang erhalten Sie den personalisierten Gutschein für {fuer || 'die beschenkte Person'}.</p></div>;

  return (
    <div className="split">
      <div className="span-6">
        <div className="reveal" style={{ position: 'relative', aspectRatio: '1.6 / 1', background: 'var(--mesh-dark), var(--dark)', color: 'var(--on-dark-2)', padding: 'clamp(20px, 3vw, 36px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--sh3)' }} aria-label="Vorschau des Gutscheins">
          <span className="promo__ring" aria-hidden="true" />
          <span className="kicker" style={{ margin: 0 }}>Gutschein · Merkle Schweißkurse</span>
          <span>
            <span style={{ display: 'block', fontSize: 'clamp(1.75rem, 2.8vw, 2.75rem)', fontWeight: 300, letterSpacing: '-.028em', color: 'var(--on-dark)', lineHeight: 1.1 }}>{k?.name}</span>
            <span className="small" style={{ display: 'block', marginTop: 10 }}>für <b style={{ color: 'var(--on-dark)' }}>{fuer || 'Name der beschenkten Person'}</b></span>
            {gruss && <span className="small" style={{ display: 'block', marginTop: 6 }}>„{gruss}“</span>}
          </span>
          <span className="small" style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span>Termin frei wählbar · München</span><span>Nr. wird vergeben</span></span>
        </div>
        <p className="small muted" style={{ marginTop: 14 }}>Nach Bezahlung erhalten Sie einen personalisierten Gutschein auf den Namen der beschenkten Person. Den Termin wählt sie anschließend selbst.</p>
      </div>
      <div className="span-6">
        <form action={action} className="form" noValidate>
          <input type="hidden" name="thema" value="Gutschein" />
          <input type="hidden" name="standort" value="muenchen" />
          <input type="hidden" name="nachricht" value={nachricht} />
          <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          {state.message && <div className="notice notice--warn" role="alert"><Icon name="alert" /><p>{state.message}</p></div>}
          <div className="field"><label htmlFor="g-kurs">Kurs</label><select className="select" id="g-kurs" value={kurs} onChange={(ev) => setKurs(ev.target.value)}>{kurse.map((x) => <option key={x.slug} value={x.slug}>{x.name} – {x.preis} €</option>)}</select></div>
          <div className="field"><label htmlFor="g-fuer">Gutschein für (Name) <span className="req">*</span></label><input className="input" id="g-fuer" required value={fuer} onChange={(ev) => setFuer(ev.target.value)} /></div>
          <div className="field"><label htmlFor="g-gruss">Grußtext <span className="muted">(optional)</span></label><input className="input" id="g-gruss" maxLength={90} value={gruss} onChange={(ev) => setGruss(ev.target.value)} placeholder="Alles Gute zum Geburtstag!" /></div>
          <div className="form-row">
            <div className="field"><label htmlFor="g-name">Ihr Name <span className="req">*</span></label><input className="input" id="g-name" name="name" required autoComplete="name" value={kaeufer} onChange={(ev) => setKaeufer(ev.target.value)} aria-invalid={!!e.name} />{e.name && <span className="field__err">{e.name}</span>}</div>
            <div className="field"><label htmlFor="g-mail">Ihre E-Mail <span className="req">*</span></label><input className="input" id="g-mail" type="email" name="email" required autoComplete="email" aria-invalid={!!e.email} />{e.email && <span className="field__err">{e.email}</span>}</div>
          </div>
          <div className="field"><label htmlFor="g-tel">Telefon <span className="muted">(optional)</span></label><input className="input" id="g-tel" type="tel" name="telefon" /></div>
          <label className="check"><input type="checkbox" name="datenschutz" required /><span>Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Bestellung verarbeitet werden (<Link href="/datenschutz/">Datenschutz</Link>). <span className="req">*</span>{e.datenschutz && <span className="field__err"> {e.datenschutz}</span>}</span></label>
          <div><button className="btn btn--primary" type="submit" disabled={pending || !fuer}>{pending ? 'Wird gesendet …' : <><Icon name="gift" />Gutschein anfragen</>}</button></div>
        </form>
      </div>
    </div>
  );
}
