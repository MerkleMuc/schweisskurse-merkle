'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from './Icon';

export interface TerminView {
  id: string; standort: 'muenchen' | 'hamburg'; kurs: string; datum: string; datum_bis: string | null;
  start_zeit: string; end_zeit: string; plaetze_gesamt: number; frei: number; preis_cent: number; hinweis: string | null; dozent: string | null;
}
export interface KursMini { slug: string; name: string; kurz: string; verfahren: string; verfahrenLabel: string; level: string }

const ORT: Record<string, string> = { muenchen: 'München', hamburg: 'Region Hamburg' };
const DOW = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const fmtEuro = (c: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: c % 100 ? 2 : 0 }).format(c / 100);
const d = (s: string) => new Date(s + 'T12:00:00');
const ym = (s: string) => s.slice(0, 7);

/*
 * Terminübersicht mit Kalender, Filter und Liste. Die Liste wird serverseitig
 * vollständig gerendert (auch ohne JavaScript lesbar und buchbar). Mit
 * JavaScript kommen Filter, Kalender und eine minütliche Aktualisierung
 * der freien Plätze hinzu – Änderungen im Backend erscheinen ohne Neuladen.
 */
export function TerminExplorer({ initial, kurse, standort, kurs, showFilter = true, showStandortFilter = true, compact = false, emptyHint }: {
  initial: TerminView[]; kurse: KursMini[]; standort?: 'muenchen' | 'hamburg'; kurs?: string; showFilter?: boolean; showStandortFilter?: boolean; compact?: boolean; emptyHint?: React.ReactNode;
}) {
  const [termine, setTermine] = useState(initial);
  const [ort, setOrt] = useState<string>(standort || 'alle');
  const [verf, setVerf] = useState<string>('alle');
  const [level, setLevel] = useState<string>('alle');
  const [nurFrei, setNurFrei] = useState(false);
  const [tag, setTag] = useState<string | null>(null);
  const [monat, setMonat] = useState<string>(() => ym(initial[0]?.datum || new Date().toISOString().slice(0, 10)));
  const [stand, setStand] = useState<string | null>(null);

  const kursMap = useMemo(() => Object.fromEntries(kurse.map((k) => [k.slug, k])), [kurse]);

  const refresh = useCallback(async () => {
    try {
      const qs = new URLSearchParams();
      if (standort) qs.set('standort', standort);
      if (kurs) qs.set('kurs', kurs);
      const r = await fetch(`/api/termine/?${qs}`, { cache: 'no-store' });
      if (!r.ok) return;
      const j = await r.json();
      setTermine(j.termine);
      setStand(new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));
    } catch { /* offline – Anzeige bleibt */ }
  }, [standort, kurs]);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 60_000);
    const vis = () => document.visibilityState === 'visible' && refresh();
    document.addEventListener('visibilitychange', vis);
    return () => { clearInterval(t); document.removeEventListener('visibilitychange', vis); };
  }, [refresh]);

  const verfahren = useMemo(() => Array.from(new Map(termine.map((t) => [kursMap[t.kurs]?.verfahren, kursMap[t.kurs]?.verfahrenLabel])).entries()).filter(([k]) => k), [termine, kursMap]);
  const levels = useMemo(() => Array.from(new Set(termine.map((t) => kursMap[t.kurs]?.level).filter(Boolean))), [termine, kursMap]);

  const gefiltert = termine.filter((t) => {
    const k = kursMap[t.kurs];
    if (ort !== 'alle' && t.standort !== ort) return false;
    if (verf !== 'alle' && k?.verfahren !== verf) return false;
    if (level !== 'alle' && k?.level !== level) return false;
    if (nurFrei && t.frei < 1) return false;
    return true;
  });
  const liste = tag ? gefiltert.filter((t) => t.datum <= tag && (t.datum_bis || t.datum) >= tag) : gefiltert;

  // Kalender
  const byDay = useMemo(() => {
    const m = new Map<string, TerminView[]>();
    gefiltert.forEach((t) => {
      const start = d(t.datum); const end = d(t.datum_bis || t.datum);
      for (let x = new Date(start); x <= end; x.setDate(x.getDate() + 1)) {
        const key = x.toISOString().slice(0, 10);
        m.set(key, [...(m.get(key) || []), t]);
      }
    });
    return m;
  }, [gefiltert]);

  const [y, mo] = monat.split('-').map(Number);
  const first = new Date(y, mo - 1, 1);
  const offset = (first.getDay() + 6) % 7;
  const daysIn = new Date(y, mo, 0).getDate();
  const heute = new Date().toLocaleDateString('sv-SE');
  const cells: { key: string; n: number; out: boolean }[] = [];
  for (let i = 0; i < offset; i++) { const dd = new Date(y, mo - 1, i - offset + 1); cells.push({ key: dd.toLocaleDateString('sv-SE'), n: dd.getDate(), out: true }); }
  for (let i = 1; i <= daysIn; i++) { const dd = new Date(y, mo - 1, i); cells.push({ key: dd.toLocaleDateString('sv-SE'), n: i, out: false }); }
  const rest = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= rest; i++) { const dd = new Date(y, mo, i); cells.push({ key: dd.toLocaleDateString('sv-SE'), n: i, out: true }); }

  const monate = useMemo(() => Array.from(new Set(termine.map((t) => ym(t.datum)))).sort(), [termine]);
  const curMonth = ym(heute);
  const canPrev = monat > curMonth;
  const shift = (n: number) => { const dt = new Date(y, mo - 1 + n, 1); setMonat(`${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`); setTag(null); };

  const reset = () => { setOrt(standort || 'alle'); setVerf('alle'); setLevel('alle'); setNurFrei(false); setTag(null); };

  return (
    <div>
      {showFilter && (
        <div className="filterbar" role="search" aria-label="Termine filtern">
          {showStandortFilter && !standort && (
            <fieldset>
              <legend>Standort</legend>
              <div className="chips">
                {['alle', 'muenchen', 'hamburg'].map((o) => (
                  <button key={o} type="button" className="chip" aria-pressed={ort === o} onClick={() => { setOrt(o); setTag(null); }}>{o === 'alle' ? 'Alle' : ORT[o]}</button>
                ))}
              </div>
            </fieldset>
          )}
          {!kurs && verfahren.length > 1 && (
            <fieldset>
              <legend>Verfahren</legend>
              <div className="chips">
                <button type="button" className="chip" aria-pressed={verf === 'alle'} onClick={() => setVerf('alle')}>Alle</button>
                {verfahren.map(([k, l]) => <button key={k} type="button" className="chip" aria-pressed={verf === k} onClick={() => { setVerf(k!); setTag(null); }}>{l}</button>)}
              </div>
            </fieldset>
          )}
          {!kurs && levels.length > 1 && (
            <fieldset>
              <legend>Niveau</legend>
              <div className="chips">
                <button type="button" className="chip" aria-pressed={level === 'alle'} onClick={() => setLevel('alle')}>Alle</button>
                {levels.map((l) => <button key={l} type="button" className="chip" aria-pressed={level === l} onClick={() => { setLevel(l!); setTag(null); }}>{l}</button>)}
              </div>
            </fieldset>
          )}
          <fieldset>
            <legend>Verfügbarkeit</legend>
            <label className="check" style={{ gridTemplateColumns: '22px auto', fontSize: '.875rem' }}>
              <input type="checkbox" checked={nurFrei} onChange={(e) => setNurFrei(e.target.checked)} />
              <span>Nur mit freien Plätzen</span>
            </label>
          </fieldset>
          <p className="filterbar__count" aria-live="polite">{liste.length} {liste.length === 1 ? 'Termin' : 'Termine'}{tag ? ` am ${d(tag).toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}` : ''}</p>
        </div>
      )}

      <div className={compact ? '' : 'split'}>
        {!compact && (
          <div className="span-4">
            <div className="cal sticky" aria-label="Kurskalender">
              <div className="cal__head">
                <span className="cal__month" aria-live="polite">{first.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}</span>
                <div className="cal__nav">
                  <button type="button" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Vorheriger Monat"><Icon name="chevronLeft" /></button>
                  <button type="button" onClick={() => shift(1)} aria-label="Nächster Monat"><Icon name="chevronRight" /></button>
                </div>
              </div>
              <div className="cal__grid">
                {DOW.map((x) => <span key={x} className="cal__dow" aria-hidden="true">{x}</span>)}
                {cells.map((c) => {
                  const ts = c.out ? [] : byDay.get(c.key) || [];
                  const has = ts.length > 0;
                  const full = has && ts.every((t) => t.frei < 1);
                  const label = has ? `${d(c.key).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}: ${ts.map((t) => kursMap[t.kurs]?.kurz).join(', ')}` : undefined;
                  const cls = `cal__day${c.out ? ' cal__day--out' : ''}${c.key === heute ? ' cal__day--today' : ''}${has ? ' cal__day--has' : ''}${full ? ' cal__day--full' : ''}${tag === c.key ? ' cal__day--sel' : ''}`;
                  return has ? (
                    <button key={c.key} type="button" className={cls} onClick={() => setTag(tag === c.key ? null : c.key)} aria-pressed={tag === c.key} aria-label={label}>
                      <span className="n">{c.n}</span>
                      <span className="cal__dots" aria-hidden="true">{ts.slice(0, 3).map((t) => <i key={t.id} className={t.frei < 1 ? 'full' : ''} />)}</span>
                    </button>
                  ) : (
                    <span key={c.key} className={cls} aria-hidden="true">{!c.out && <span className="n">{c.n}</span>}</span>
                  );
                })}
              </div>
              {tag && (byDay.get(tag) || []).length > 0 && (
                <div className="cal__pop">
                  <h3>{d(tag).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                  {(byDay.get(tag) || []).map((t) => (
                    <Link key={t.id} href={`/buchen/${t.id}/`} className="btn btn--primary btn--sm" aria-disabled={t.frei < 1}>
                      {kursMap[t.kurs]?.kurz} · {t.frei > 0 ? `${t.frei} frei` : 'ausgebucht'}<Icon name="arrowRight" />
                    </Link>
                  ))}
                  <button type="button" className="textlink" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }} onClick={() => setTag(null)}>Alle Termine zeigen</button>
                </div>
              )}
              <div className="cal__legend">
                <span><i />Termin mit freien Plätzen</span>
                <span><i className="full" />Ausgebucht</span>
                {monate.length > 0 && <span>{monate.length} {monate.length === 1 ? 'Monat' : 'Monate'} mit Terminen</span>}
              </div>
            </div>
          </div>
        )}

        <div className={compact ? '' : 'span-8'}>
          {liste.length === 0 ? (
            <div className="empty">
              <p style={{ margin: '0 0 12px', color: 'var(--ink)' }}><b>Für diese Auswahl sind gerade keine Termine geplant.</b></p>
              {emptyHint || <p className="muted" style={{ margin: 0 }}>Lassen Sie sich vormerken – wir melden uns, sobald neue Termine feststehen.</p>}
              <div className="btn-row" style={{ justifyContent: 'center', marginTop: 16 }}>
                <Link className="btn btn--primary btn--sm" href="/kontakt/?thema=Warteliste#formular">Für Warteliste vormerken</Link>
                <button className="btn btn--secondary btn--sm" type="button" onClick={reset}>Filter zurücksetzen</button>
              </div>
            </div>
          ) : (
            <ul className="tlist" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {liste.map((t) => {
                const k = kursMap[t.kurs];
                const dt = d(t.datum);
                const quote = t.plaetze_gesamt ? 1 - t.frei / t.plaetze_gesamt : 1;
                return (
                  <li key={t.id} id={`termin-${t.id}`} className="trow">
                    <div className="trow__date">
                      <span>{dt.toLocaleDateString('de-DE', { weekday: 'short' })}</span>
                      <b>{dt.getDate()}</b>
                      <span>{dt.toLocaleDateString('de-DE', { month: 'short' })}</span>
                    </div>
                    <div>
                      <h3 className="trow__title"><Link href={`/${t.kurs}/`}>{k?.name || t.kurs}</Link></h3>
                      <div className="trow__meta">
                        <span><Icon name="pin" />{ORT[t.standort]}</span>
                        <span><Icon name="clock" />{t.datum_bis ? `${dt.toLocaleDateString('de-DE')} – ${d(t.datum_bis).toLocaleDateString('de-DE')}` : dt.toLocaleDateString('de-DE', { weekday: 'long' })}, {t.start_zeit}–{t.end_zeit} Uhr</span>
                        <span><Icon name="euro" />{fmtEuro(t.preis_cent)} p. P. inkl. MwSt.</span>
                        {t.hinweis && <span><Icon name="info" />{t.hinweis}</span>}
                      </div>
                    </div>
                    <div className="trow__seats">
                      <span className={`seats${t.frei === 0 ? ' seats--full' : t.frei <= 3 ? ' seats--few' : ''}`}>
                        {t.frei === 0 ? 'Ausgebucht' : t.frei <= 3 ? `Nur noch ${t.frei} ${t.frei === 1 ? 'Platz' : 'Plätze'}` : `${t.frei} Plätze frei`}
                        <span className="seats__bar" aria-hidden="true"><i style={{ transform: `scaleX(${quote})` }} /></span>
                      </span>
                    </div>
                    <div className="trow__cta">
                      {t.frei > 0
                        ? <Link className="btn btn--primary btn--sm" href={`/buchen/${t.id}/`}>Platz buchen<Icon name="arrowRight" /></Link>
                        : <Link className="btn btn--secondary btn--sm" href={`/kontakt/?thema=Warteliste&termin=${t.id}#formular`}>Warteliste</Link>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {stand && <p className="small muted" style={{ marginTop: 12 }}>Freie Plätze live aktualisiert · Stand {stand} Uhr</p>}
        </div>
      </div>
    </div>
  );
}
