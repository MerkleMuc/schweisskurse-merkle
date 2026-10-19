'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icon } from './Icon';

type Ziel = 'stahl' | 'edel' | 'alu' | 'pruefung' | 'flamme' | 'montage';
type Erf = 'keine' | 'kurs';
type Ort = 'muenchen' | 'hamburg';

const ZIELE: { id: Ziel; t: string; s: string }[] = [
  { id: 'stahl', t: 'Stahl verbinden & reparieren', s: 'Anhänger, Gartentor, Werkstatt' },
  { id: 'edel', t: 'Saubere Nähte, Edelstahl', s: 'Geländer, Möbel, Kunst' },
  { id: 'alu', t: 'Aluminium schweißen', s: 'Boot, Rahmen, Behälter' },
  { id: 'montage', t: 'Robust, draußen, ohne Gas', s: 'Landwirtschaft, Montage' },
  { id: 'flamme', t: 'Mit der Flamme arbeiten', s: 'Löten, Gasschweißen, Oldtimer' },
  { id: 'pruefung', t: 'Schweißerpass für den Beruf', s: 'Prüfung nach DIN EN ISO 9606-1' }
];

function empfehlung(z: Ziel, e: Erf, o: Ort): { slug: string; name: string; warum: string }[] {
  if (o === 'hamburg') return [{ slug: 'allgemeiner-schweisskurs-hamburg', name: 'Allgemeiner Schweißkurs MAG / WIG / E', warum: 'In der Region Hamburg lernen Sie alle drei Lichtbogenverfahren an einem Tag kennen.' }];
  switch (z) {
    case 'stahl': return e === 'keine'
      ? [{ slug: 'mig-mag-einsteiger-schweisskurs', name: 'MIG/MAG Einsteiger-Schweißkurs', warum: 'Der schnellste Weg zu belastbaren Nähten an Stahl.' }]
      : [{ slug: 'mag-fortgeschrittenen-schweisskurs', name: 'MAG Fortgeschrittenen-Schweißkurs', warum: 'Vertieft Positionen, Mehrlagen und Dünnblech.' }, { slug: 'pulse-arc-aufbau-schweisskurs', name: 'Pulse-Arc Aufbaukurs', warum: 'Spritzerarm schweißen mit Impulsanlagen.' }];
    case 'edel': return [{ slug: 'wig-einsteiger-schweisskurs', name: 'WIG Einsteiger-Schweißkurs', warum: 'WIG liefert die saubersten Nähte an Stahl und Edelstahl.' }];
    case 'alu': return e === 'keine'
      ? [{ slug: 'wig-einsteiger-schweisskurs', name: 'WIG Einsteiger-Schweißkurs', warum: 'Grundlage und Voraussetzung für den Alu-Kurs.' }, { slug: 'wig-alu-aufbau-schweisskurs', name: 'WIG-Alu Aufbau-Schweißkurs', warum: 'Danach: Aluminium mit Wechselstrom.' }]
      : [{ slug: 'wig-alu-aufbau-schweisskurs', name: 'WIG-Alu Aufbau-Schweißkurs', warum: 'Aluminium sicher WIG-schweißen.' }];
    case 'montage': return [{ slug: 'elektroden-einsteiger-schweisskurs', name: 'E-Schweißkurs (Elektrode)', warum: 'Ohne Gasflasche, windunempfindlich, mobil.' }];
    case 'flamme': return [{ slug: 'autogen-einsteiger-schweisskurs', name: 'Autogen Einsteiger-Schweißkurs', warum: 'Schweißen mit Acetylen und Sauerstoff.' }, { slug: 'gasschweissen-flammloeten-kurs', name: 'Gasschweißen & Flammlöten', warum: 'Schweißen und Löten an einem Tag.' }];
    case 'pruefung': return [{ slug: 'tuev-gepruefter-schweisskurs', name: 'Lehrgang mit Prüfung nach DIN EN ISO 9606-1', warum: 'Fünf Tage Training, dann die zertifizierte Prüfung.' }];
  }
}

export function KursFinder() {
  const [z, setZ] = useState<Ziel | null>(null);
  const [e, setE] = useState<Erf | null>(null);
  const [o, setO] = useState<Ort | null>(null);
  const step = !z ? 0 : !e ? 1 : !o ? 2 : 3;
  const res = z && e && o ? empfehlung(z, e, o) : [];

  return (
    <div className="card card--pad" style={{ display: 'grid', gap: 22 }}>
      <ol className="progress" aria-label="Fortschritt">
        {['Ziel', 'Erfahrung', 'Standort', 'Empfehlung'].map((s, i) => <li key={s} className={i < step ? 'is-done' : i === step ? 'is-active' : ''}><span>{s}</span></li>)}
      </ol>
      {step === 0 && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="h3" style={{ marginBottom: 16 }}>Was möchten Sie schweißen?</legend>
          <div className="choice">{ZIELE.map((x) => <label key={x.id}><input type="radio" name="ziel" onChange={() => setZ(x.id)} /><span><b>{x.t}</b><small>{x.s}</small></span></label>)}</div>
        </fieldset>
      )}
      {step === 1 && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="h3" style={{ marginBottom: 16 }}>Haben Sie schon geschweißt?</legend>
          <div className="choice">
            <label><input type="radio" name="erf" onChange={() => setE('keine')} /><span><b>Nein, ich fange neu an</b><small>Keine oder kaum Erfahrung</small></span></label>
            <label><input type="radio" name="erf" onChange={() => setE('kurs')} /><span><b>Ja, ich habe Erfahrung</b><small>z. B. Einsteigerkurs besucht</small></span></label>
          </div>
        </fieldset>
      )}
      {step === 2 && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="h3" style={{ marginBottom: 16 }}>Wo möchten Sie lernen?</legend>
          <div className="choice">
            <label><input type="radio" name="ort" onChange={() => setO('muenchen')} /><span><b>München-Freiham</b><small>Alle Kurse und Lehrgänge</small></span></label>
            <label><input type="radio" name="ort" onChange={() => setO('hamburg')} /><span><b>Region Hamburg</b><small>Ellerhoop, Kreis Pinneberg</small></span></label>
          </div>
        </fieldset>
      )}
      {step === 3 && (
        <div aria-live="polite" style={{ display: 'grid', gap: 12 }}>
          <h3 style={{ margin: 0 }}>Unsere Empfehlung</h3>
          {res.map((r) => (
            <Link key={r.slug} href={`/${r.slug}/`} className="card card--link card--pad" style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <span className="iconbox"><Icon name="target" /></span>
              <span style={{ flex: 1 }}><b style={{ color: 'var(--ink)', fontWeight: 500 }}>{r.name}</b><br /><span className="small muted">{r.warum}</span></span>
              <Icon name="arrowRight" />
            </Link>
          ))}
        </div>
      )}
      {step > 0 && <button type="button" className="btn btn--secondary btn--sm" style={{ justifySelf: 'start' }} onClick={() => { setZ(null); setE(null); setO(null); }}><Icon name="undo" />Neu starten</button>}
    </div>
  );
}
