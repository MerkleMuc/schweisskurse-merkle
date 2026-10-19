'use client';

import Link from 'next/link';
import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
import { bucheKurs, type BookingState } from '@/app/(site)/buchen/actions';
import { Icon } from './Icon';

interface Props {
  terminId: string;
  kursName: string;
  kursKurz: string;
  datumText: string;
  zeitText: string;
  ortText: string;
  preisCent: number;
  frei: number;
  pruefung: boolean;
  voraussetzung: string;
  consent: { agb: string; datenschutz: string; widerrufsbelehrung: string; vorzeitigerBeginn: string; zahlungspflichtig: string };
}

const STEPS = ['Teilnehmerzahl', 'Rechnung', 'Teilnehmer', 'Zahlung', 'Prüfen & buchen'];
const eur = (c: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(c / 100);

/*
 * Buchungsweg in fünf Schritten. Alle Schritte stehen in einem einzigen
 * Formular: Ohne JavaScript erscheinen sie untereinander und lassen sich
 * trotzdem absenden. Mit JavaScript wird Schritt für Schritt geprüft.
 */
export function BookingWizard(p: Props) {
  const [state, action, pending] = useActionState<BookingState, FormData>(bucheKurs, { ok: false });
  const [step, setStep] = useState(0);
  const [js, setJs] = useState(false);
  const [anzahl, setAnzahl] = useState(1);
  const [typ, setTyp] = useState<'privat' | 'firma'>('privat');
  const [selbst, setSelbst] = useState(true);
  const [zahlung, setZahlung] = useState<'paypal' | 'vorkasse' | ''>('');
  const [localErr, setLocalErr] = useState<Record<string, string>>({});
  const [snap, setSnap] = useState<Record<string, string>>({});
  const form = useRef<HTMLFormElement>(null);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => setJs(true), []);
  useEffect(() => { setSelbst(typ === 'privat'); }, [typ]);

  const errors = { ...(state.errors || {}), ...localErr };
  const max = Math.min(p.frei, 9);
  const summe = p.preisCent * anzahl;

  // Bei Serverfehlern zum ersten betroffenen Schritt springen
  useEffect(() => {
    if (!state.errors) return;
    const keys = Object.keys(state.errors);
    const s = keys.some((k) => k.startsWith('r_') || k === 'email' || k === 'telefon') ? 1 : keys.some((k) => /^t\d/.test(k)) ? 2 : keys.includes('zahlungsart') ? 3 : 4;
    setStep(s);
  }, [state.errors]);

  const collect = () => {
    const fd = new FormData(form.current!);
    const o: Record<string, string> = {};
    fd.forEach((v, k) => { o[k] = String(v); });
    setSnap(o);
    return o;
  };

  const validate = (s: number) => {
    const o = collect();
    const e: Record<string, string> = {};
    const need = (k: string, msg: string) => { if (!o[k]?.trim()) e[k] = msg; };
    if (s === 1) {
      if (typ === 'firma') need('r_firma', 'Bitte den Firmennamen angeben.');
      need('r_vorname', 'Bitte den Vornamen angeben.');
      need('r_nachname', 'Bitte den Nachnamen angeben.');
      need('r_strasse', 'Bitte Straße und Hausnummer angeben.');
      if (!/^[0-9A-Za-z -]{4,10}$/.test(o.r_plz || '')) e.r_plz = 'Bitte eine gültige Postleitzahl angeben.';
      need('r_ort', 'Bitte den Ort angeben.');
      if (!/^\S+@\S+\.\S+$/.test(o.email || '')) e.email = 'Bitte eine gültige E-Mail-Adresse angeben.';
      if ((o.telefon || '').trim().length < 6) e.telefon = 'Bitte eine Telefonnummer für Rückfragen angeben.';
    }
    if (s === 2) {
      for (let i = 0; i < anzahl; i++) {
        if (!(i === 0 && selbst)) { need(`t${i}_vorname`, 'Bitte den Vornamen angeben.'); need(`t${i}_nachname`, 'Bitte den Nachnamen angeben.'); }
        if (p.pruefung) need(`t${i}_geburtsdatum`, 'Bitte das Geburtsdatum angeben.');
      }
    }
    if (s === 3 && !o.zahlungsart) e.zahlungsart = 'Bitte eine Zahlungsart wählen.';
    setLocalErr(e);
    return Object.keys(e).length === 0;
  };

  const go = (n: number) => {
    if (n > step && !validate(step)) return;
    setLocalErr({});
    if (n === 4) collect();
    setStep(n);
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const shown = (i: number) => !js || step === i;
  const err = (k: string) => errors[k] ? <span className="field__err" id={`${k}-err`}>{errors[k]}</span> : null;
  const inv = (k: string) => (errors[k] ? { 'aria-invalid': true as const, 'aria-describedby': `${k}-err` } : {});

  const rechnungText = useMemo(() => [snap.r_firma, [snap.r_anrede, snap.r_vorname, snap.r_nachname].filter(Boolean).join(' '), snap.r_strasse, [snap.r_plz, snap.r_ort].filter(Boolean).join(' '), snap.r_land].filter(Boolean), [snap]);

  return (
    <div className="wizard" ref={top} style={{ scrollMarginTop: 'calc(var(--header-h) + 24px)' }}>
      <form ref={form} action={action} className="step-panel" noValidate={js}>
        <input type="hidden" name="terminId" value={p.terminId} />
        {js && <input type="hidden" name="anzahl" value={anzahl} />}
        <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

        {js && (
          <ol className="progress" aria-label="Fortschritt">
            {STEPS.map((s, i) => (
              <li key={s} className={i < step ? 'is-done' : i === step ? 'is-active' : ''} aria-current={i === step ? 'step' : undefined}>
                <span>{i + 1}. {s}</span>
              </li>
            ))}
          </ol>
        )}

        {state.message && !state.ok && (
          <div className="notice notice--warn" role="alert"><Icon name="alert" /><p><b>{state.message}</b></p></div>
        )}

        {/* 1 · Teilnehmerzahl */}
        <fieldset hidden={!shown(0)}>
          <legend>Wie viele Personen möchten teilnehmen?</legend>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div className="stepper" role="group" aria-label="Anzahl Teilnehmer">
              <button type="button" onClick={() => setAnzahl((a) => Math.max(1, a - 1))} disabled={anzahl <= 1} aria-label="Eine Person weniger">−</button>
              <output aria-live="polite">{anzahl}</output>
              <button type="button" onClick={() => setAnzahl((a) => Math.min(max, a + 1))} disabled={anzahl >= max} aria-label="Eine Person mehr">+</button>
            </div>
            <span className="muted small">{p.frei} {p.frei === 1 ? 'Platz' : 'Plätze'} frei · {eur(p.preisCent)} pro Person inkl. MwSt.</span>
          </div>
          {!js && (
            <div className="field" style={{ maxWidth: 200 }}>
              <label htmlFor="anzahl-nojs">Anzahl Teilnehmer</label>
              <select id="anzahl-nojs" className="select" name="anzahl" defaultValue="1">{Array.from({ length: max }, (_, i) => <option key={i}>{i + 1}</option>)}</select>
            </div>
          )}
          <div className="notice"><Icon name="info" /><p><b>Voraussetzung:</b> {p.voraussetzung}</p></div>
        </fieldset>

        {/* 2 · Rechnung */}
        <fieldset hidden={!shown(1)}>
          <legend>Wer bucht – und wohin geht die Rechnung?</legend>
          <div className="segmented" role="radiogroup" aria-label="Kundentyp">
            <label><input type="radio" name="kundentyp" value="privat" checked={typ === 'privat'} onChange={() => setTyp('privat')} /><span><Icon name="user" />Privatperson</span></label>
            <label><input type="radio" name="kundentyp" value="firma" checked={typ === 'firma'} onChange={() => setTyp('firma')} /><span><Icon name="building" />Firma</span></label>
          </div>
          {(typ === 'firma' || !js) && (
            <div className="form-row">
              <div className="field"><label htmlFor="r_firma">Firma {js ? <span className="req">*</span> : <span className="muted">(nur bei Firmenbuchung)</span>}</label><input className="input" id="r_firma" name="r_firma" autoComplete="organization" required={js} {...inv('r_firma')} />{err('r_firma')}</div>
              <div className="field"><label htmlFor="r_ustid">USt-IdNr. <span className="muted">(optional)</span></label><input className="input" id="r_ustid" name="r_ustid" placeholder="DE…" /></div>
            </div>
          )}
          <div className="form-row form-row--4">
            <div className="field"><label htmlFor="r_anrede">Anrede</label><select className="select" id="r_anrede" name="r_anrede" defaultValue=""><option value="">–</option><option>Frau</option><option>Herr</option><option>Divers</option></select></div>
            <div className="form-row">
              <div className="field"><label htmlFor="r_vorname">Vorname <span className="req">*</span></label><input className="input" id="r_vorname" name="r_vorname" autoComplete="given-name" required {...inv('r_vorname')} />{err('r_vorname')}</div>
              <div className="field"><label htmlFor="r_nachname">Nachname <span className="req">*</span></label><input className="input" id="r_nachname" name="r_nachname" autoComplete="family-name" required {...inv('r_nachname')} />{err('r_nachname')}</div>
            </div>
          </div>
          <div className="field"><label htmlFor="r_strasse">Straße und Hausnummer <span className="req">*</span></label><input className="input" id="r_strasse" name="r_strasse" autoComplete="street-address" required {...inv('r_strasse')} />{err('r_strasse')}</div>
          <div className="form-row form-row--3">
            <div className="field"><label htmlFor="r_plz">PLZ <span className="req">*</span></label><input className="input" id="r_plz" name="r_plz" inputMode="numeric" autoComplete="postal-code" required {...inv('r_plz')} />{err('r_plz')}</div>
            <div className="field"><label htmlFor="r_ort">Ort <span className="req">*</span></label><input className="input" id="r_ort" name="r_ort" autoComplete="address-level2" required {...inv('r_ort')} />{err('r_ort')}</div>
            <div className="field"><label htmlFor="r_land">Land <span className="req">*</span></label><select className="select" id="r_land" name="r_land" defaultValue="Deutschland" autoComplete="country-name"><option>Deutschland</option><option>Österreich</option><option>Schweiz</option><option>Andere</option></select></div>
          </div>
          <div className="form-row">
            <div className="field"><label htmlFor="email">E-Mail <span className="req">*</span></label><input className="input" type="email" id="email" name="email" autoComplete="email" required {...inv('email')} /><span className="field__hint">Hierhin senden wir die Buchungsbestätigung.</span>{err('email')}</div>
            <div className="field"><label htmlFor="telefon">Telefon <span className="req">*</span></label><input className="input" type="tel" id="telefon" name="telefon" autoComplete="tel" required {...inv('telefon')} /><span className="field__hint">Für kurzfristige Änderungen am Kurstag.</span>{err('telefon')}</div>
          </div>
        </fieldset>

        {/* 3 · Teilnehmer */}
        <fieldset hidden={!shown(2)}>
          <legend>Wer nimmt teil?</legend>
          <label className="check check--box">
            <input type="checkbox" name="selbst" checked={selbst} onChange={(e) => setSelbst(e.target.checked)} />
            <span><b>Rechnungsempfänger und Teilnehmer sind identisch</b><br /><span className="muted small">{typ === 'firma' ? 'Die Ansprechperson der Firma nimmt selbst teil.' : 'Ich nehme selbst teil.'} Deaktivieren, wenn Sie den Kurs für jemand anderen buchen.</span></span>
          </label>
          {Array.from({ length: anzahl }, (_, i) => (
            <div className="person" key={i}>
              <div className="person__head"><span>Teilnehmer {i + 1}</span>{i === 0 && selbst && <span className="chip chip--teal">= Rechnungsempfänger</span>}</div>
              {!(i === 0 && selbst) && (
                <div className="form-row">
                  <div className="field"><label htmlFor={`t${i}_vorname`}>Vorname <span className="req">*</span></label><input className="input" id={`t${i}_vorname`} name={`t${i}_vorname`} required {...inv(`t${i}_vorname`)} />{err(`t${i}_vorname`)}</div>
                  <div className="field"><label htmlFor={`t${i}_nachname`}>Nachname <span className="req">*</span></label><input className="input" id={`t${i}_nachname`} name={`t${i}_nachname`} required {...inv(`t${i}_nachname`)} />{err(`t${i}_nachname`)}</div>
                </div>
              )}
              <div className="form-row">
                {p.pruefung && (
                  <div className="field"><label htmlFor={`t${i}_geburtsdatum`}>Geburtsdatum <span className="req">*</span></label><input className="input" type="date" id={`t${i}_geburtsdatum`} name={`t${i}_geburtsdatum`} required {...inv(`t${i}_geburtsdatum`)} /><span className="field__hint">Wird für die Prüfungsbescheinigung benötigt.</span>{err(`t${i}_geburtsdatum`)}</div>
                )}
                <div className="field"><label htmlFor={`t${i}_erfahrung`}>Schweißerfahrung</label>
                  <select className="select" id={`t${i}_erfahrung`} name={`t${i}_erfahrung`} defaultValue="keine"><option value="keine">Keine – absoluter Neuling</option><option value="wenig">Erste Versuche gemacht</option><option value="regelmaessig">Schweiße regelmäßig</option></select>
                </div>
              </div>
            </div>
          ))}
          <div className="field"><label htmlFor="bemerkung">Anmerkungen <span className="muted">(optional)</span></label><textarea className="textarea" id="bemerkung" name="bemerkung" rows={3} placeholder="z. B. eigenes Schweißgerät, Projekt, das Sie umsetzen möchten" /></div>
        </fieldset>

        {/* 4 · Zahlung */}
        <fieldset hidden={!shown(3)}>
          <legend>Wie möchten Sie bezahlen?</legend>
          <div className="choice" role="radiogroup" aria-label="Zahlungsart">
            <label>
              <input type="radio" name="zahlungsart" value="paypal" checked={zahlung === 'paypal'} onChange={() => setZahlung('paypal')} />
              <span><b><Icon name="paypal" className="icon" /> PayPal</b><small>Sie erhalten nach der Buchung einen PayPal-Link über den Gesamtbetrag.</small></span>
            </label>
            <label>
              <input type="radio" name="zahlungsart" value="vorkasse" checked={zahlung === 'vorkasse'} onChange={() => setZahlung('vorkasse')} />
              <span><b><Icon name="bank" className="icon" /> Vorkasse (Überweisung)</b><small>Bankverbindung auf der Bestätigungsseite und in der E-Mail.</small></span>
            </label>
          </div>
          {err('zahlungsart')}
          <div className="notice"><Icon name="info" /><p>Die Zahlung erfolgt <b>im nächsten Schritt nach Absenden der Buchung</b>. Ihr Platz ist ab dem Absenden fest für Sie reserviert.</p></div>
        </fieldset>

        {/* 5 · Prüfen */}
        <fieldset hidden={!shown(4)}>
          <legend>Angaben prüfen und verbindlich buchen</legend>
          {js && (
            <div className="grid grid-2">
              <div className="review-block"><h3>Kurs</h3><p><b>{p.kursName}</b><br />{p.datumText}<br />{p.zeitText}<br />{p.ortText}</p></div>
              <div className="review-block"><h3>Rechnung an</h3><p>{rechnungText.map((l, i) => <span key={i}>{l}<br /></span>)}{snap.email}<br />{snap.telefon}</p><button type="button" className="textlink" style={{ background: 'none', border: 0, padding: 0, marginTop: 8, cursor: 'pointer' }} onClick={() => go(1)}>Ändern<Icon name="edit" /></button></div>
              <div className="review-block"><h3>Teilnehmer ({anzahl})</h3><p>{Array.from({ length: anzahl }, (_, i) => <span key={i}>{i === 0 && selbst ? `${snap.r_vorname || ''} ${snap.r_nachname || ''}` : `${snap[`t${i}_vorname`] || ''} ${snap[`t${i}_nachname`] || ''}`}<br /></span>)}</p><button type="button" className="textlink" style={{ background: 'none', border: 0, padding: 0, marginTop: 8, cursor: 'pointer' }} onClick={() => go(2)}>Ändern<Icon name="edit" /></button></div>
              <div className="review-block"><h3>Zahlung</h3><p>{snap.zahlungsart === 'paypal' ? 'PayPal' : 'Vorkasse (Überweisung)'}<br /><b>{eur(summe)}</b> inkl. 19 % MwSt.</p><button type="button" className="textlink" style={{ background: 'none', border: 0, padding: 0, marginTop: 8, cursor: 'pointer' }} onClick={() => go(3)}>Ändern<Icon name="edit" /></button></div>
            </div>
          )}

          <div style={{ display: 'grid', gap: 10 }}>
            <label className="check check--box"><input type="checkbox" name="c_agb" required {...inv('c_agb')} /><span>Ich habe die <Link href="/agb/" target="_blank">Allgemeinen Geschäftsbedingungen (AGB)</Link> gelesen und akzeptiere sie. <span className="req">*</span>{err('c_agb')}</span></label>
            <label className="check check--box"><input type="checkbox" name="c_datenschutz" required {...inv('c_datenschutz')} /><span>Ich habe die <Link href="/datenschutz/" target="_blank">Datenschutzhinweise</Link> zur Kenntnis genommen. Meine Angaben werden ausschließlich zur Abwicklung der Buchung verwendet. <span className="req">*</span>{err('c_datenschutz')}</span></label>
            {typ === 'privat' && (
              <>
                <label className="check check--box"><input type="checkbox" name="c_widerruf" required {...inv('c_widerruf')} /><span>Ich habe die <Link href="/widerruf/" target="_blank">Widerrufsbelehrung</Link> einschließlich des Muster-Widerrufsformulars zur Kenntnis genommen. <span className="req">*</span>{err('c_widerruf')}</span></label>
                <label className="check check--box"><input type="checkbox" name="c_beginn" required {...inv('c_beginn')} /><span><b>Ausdrückliches Verlangen auf vorzeitigen Beginn der Dienstleistung und Kenntnisnahme vom Erlöschen des Widerrufsrechts</b> <span className="req">*</span><br /><span className="small">{p.consent.vorzeitigerBeginn.split(': ').slice(1).join(': ')}</span>{err('c_beginn')}</span></label>
              </>
            )}
            {typ === 'firma' && <p className="small muted" style={{ margin: 0 }}>Hinweis: Bei Buchungen durch Unternehmen besteht kein gesetzliches Widerrufsrecht.</p>}
          </div>

          <div className="notice notice--dark on-dark"><Icon name="alert" /><p><b style={{ color: 'var(--on-dark)' }}>Verbindliche Buchung mit Zahlungspflicht.</b> {p.consent.zahlungspflichtig}</p></div>

          <div className="summary__total" style={{ padding: 0 }}>
            <span>Gesamtbetrag inkl. 19 % MwSt.</span><b>{eur(summe)}</b>
          </div>
          <button type="submit" className="btn btn--primary btn--block" disabled={pending} style={{ fontSize: '1rem', padding: '18px 22px' }}>
            {pending ? 'Buchung wird gesendet …' : <><Icon name="check" />Zahlungspflichtig buchen</>}
          </button>
        </fieldset>

        {js && step < 4 && (
          <div className="wizard__nav">
            {step > 0 ? <button type="button" className="btn btn--secondary" onClick={() => go(step - 1)}><Icon name="arrowLeft" />Zurück</button> : <span />}
            <button type="button" className="btn btn--primary" onClick={() => go(step + 1)}>Weiter: {STEPS[step + 1]}<Icon name="arrowRight" /></button>
          </div>
        )}
        {js && step === 4 && <button type="button" className="btn btn--secondary" onClick={() => go(3)} style={{ justifySelf: 'start' }}><Icon name="arrowLeft" />Zurück</button>}
      </form>

      <aside className="wizard__aside">
        <div className="summary sticky">
          <div className="summary__head on-dark">
            <p className="kicker" style={{ marginBottom: 10 }}>Ihre Auswahl</p>
            <h2>{p.kursName}</h2>
            <span className="small">{p.ortText}</span>
          </div>
          <dl>
            <div><dt>Datum</dt><dd>{p.datumText}</dd></div>
            <div><dt>Uhrzeit</dt><dd>{p.zeitText}</dd></div>
            <div><dt>Preis p. P.</dt><dd>{eur(p.preisCent)}</dd></div>
            <div><dt>Teilnehmer</dt><dd>{anzahl}</dd></div>
          </dl>
          <div className="summary__total"><span>Gesamt</span><b>{eur(summe)}</b></div>
          <div style={{ padding: '0 24px 22px', display: 'grid', gap: 8 }} className="small muted">
            <span style={{ display: 'flex', gap: 8 }}><Icon name="shield" />Platz sofort verbindlich reserviert</span>
            <span style={{ display: 'flex', gap: 8 }}><Icon name="mail" />Bestätigung per E-Mail</span>
            <span style={{ display: 'flex', gap: 8 }}><Icon name="headset" />Fragen? {p.ortText.includes('Ellerhoop') ? '+49 4120 3079981' : '+49 89 897717-28'}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
