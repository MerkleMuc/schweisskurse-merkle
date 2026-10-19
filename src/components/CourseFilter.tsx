'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Icon } from './Icon';

export interface KursCard {
  slug: string; name: string; kurz: string; verfahren: string; verfahrenLabel: string; level: string; standorte: string[];
  preis: number | null; preisHinweis?: string; dauer: string; tage: number; maxTeilnehmer: number; bild: string; bildAlt: string; lead: string; naechster?: string; freieTermine: number;
}

const ORT: Record<string, string> = { muenchen: 'München', hamburg: 'Region Hamburg' };
const eur = (n: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

/* Gesamtübersicht aller Kurse mit Filter und Sortierung. Ohne JavaScript
   bleibt die vollständige Liste sichtbar. */
export function CourseFilter({ kurse }: { kurse: KursCard[] }) {
  const [ort, setOrt] = useState('alle');
  const [level, setLevel] = useState('alle');
  const [verf, setVerf] = useState('alle');
  const [nurTermine, setNurTermine] = useState(false);
  const [sort, setSort] = useState<'empf' | 'preis' | 'datum'>('empf');

  const levels = useMemo(() => Array.from(new Set(kurse.map((k) => k.level))), [kurse]);
  const verfahren = useMemo(() => Array.from(new Map(kurse.map((k) => [k.verfahren, k.verfahrenLabel])).entries()), [kurse]);

  let list = kurse.filter((k) => (ort === 'alle' || k.standorte.includes(ort)) && (level === 'alle' || k.level === level) && (verf === 'alle' || k.verfahren === verf) && (!nurTermine || k.freieTermine > 0));
  if (sort === 'preis') list = [...list].sort((a, b) => (a.preis ?? 1e9) - (b.preis ?? 1e9));
  if (sort === 'datum') list = [...list].sort((a, b) => (b.freieTermine > 0 ? 1 : 0) - (a.freieTermine > 0 ? 1 : 0));

  return (
    <div>
      <div className="filterbar" role="search" aria-label="Kurse filtern">
        <fieldset><legend>Standort</legend><div className="chips">
          {['alle', 'muenchen', 'hamburg'].map((o) => <button key={o} type="button" className="chip" aria-pressed={ort === o} onClick={() => setOrt(o)}>{o === 'alle' ? 'Alle' : ORT[o]}</button>)}
        </div></fieldset>
        <fieldset><legend>Niveau</legend><div className="chips">
          <button type="button" className="chip" aria-pressed={level === 'alle'} onClick={() => setLevel('alle')}>Alle</button>
          {levels.map((l) => <button key={l} type="button" className="chip" aria-pressed={level === l} onClick={() => setLevel(l)}>{l}</button>)}
        </div></fieldset>
        <fieldset><legend>Verfahren</legend><div className="chips">
          <button type="button" className="chip" aria-pressed={verf === 'alle'} onClick={() => setVerf('alle')}>Alle</button>
          {verfahren.map(([k, l]) => <button key={k} type="button" className="chip" aria-pressed={verf === k} onClick={() => setVerf(k)}>{l}</button>)}
        </div></fieldset>
        <fieldset><legend>Anzeige</legend>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <label className="check" style={{ gridTemplateColumns: '22px auto', fontSize: '.875rem' }}><input type="checkbox" checked={nurTermine} onChange={(e) => setNurTermine(e.target.checked)} /><span>Nur mit freien Terminen</span></label>
            <label className="sr-only" htmlFor="sort">Sortierung</label>
            <select id="sort" className="select" style={{ padding: '8px 36px 8px 12px', fontSize: '.875rem', width: 'auto' }} value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
              <option value="empf">Empfohlen</option><option value="preis">Preis aufsteigend</option><option value="datum">Freie Termine zuerst</option>
            </select>
          </div>
        </fieldset>
        <p className="filterbar__count" aria-live="polite">{list.length} {list.length === 1 ? 'Kurs' : 'Kurse'}</p>
      </div>

      {list.length === 0 ? (
        <div className="empty"><p><b>Kein Kurs passt zu dieser Auswahl.</b></p><button type="button" className="btn btn--secondary btn--sm" onClick={() => { setOrt('alle'); setLevel('alle'); setVerf('alle'); setNurTermine(false); }}>Filter zurücksetzen</button></div>
      ) : (
        <div className="grid grid-3">
          {list.map((k) => (
            <Link key={k.slug} href={`/${k.slug}/`} className="card card--link">
              <div className="card__media"><Image src={k.bild} alt={k.bildAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" /></div>
              <div className="card__body">
                <div className="card__meta"><span className="chip chip--teal">{k.level}</span><span className="chip">{k.verfahrenLabel}</span></div>
                <h3>{k.name}</h3>
                <p className="small" style={{ margin: 0 }}>{k.lead}</p>
                <p className="small muted" style={{ margin: 0 }}><Icon name="clock" className="icon" /> {k.dauer} · max. {k.maxTeilnehmer} · {k.standorte.map((s) => ORT[s]).join(', ')}</p>
                <div className="card__foot">
                  <span className="price">{k.preis ? <>{eur(k.preis)}<small>{k.tage > 1 ? 'ab' : 'p. P.'}</small></> : <small style={{ marginLeft: 0 }}>{k.preisHinweis}</small>}</span>
                  <span className="textlink">{k.naechster ? `Nächster: ${k.naechster}` : k.freieTermine ? 'Termine' : 'Warteliste'}<Icon name="arrowRight" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
