/*
 * Motion-Design-Bibliothek. Reines SVG + CSS-Animationen (nur transform,
 * opacity und stroke-dashoffset). Animationen laufen nur, solange die
 * Grafik im Bild ist (.viz.is-in), und stehen bei reduzierter Bewegung still.
 * Jede Grafik hat einen Titel für Screenreader.
 */
import type { CSSProperties } from 'react';
import type { Verfahren } from '@/lib/courses';

type VizProps = { title?: string; caption?: string; dark?: boolean };

function Frame({ children, caption, dark }: { children: React.ReactNode; caption?: string; dark?: boolean }) {
  return (
    <figure className={`viz-frame${dark ? ' viz-frame--dark' : ''}`} style={{ margin: 0 }}>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

const sx = (x: number, y: number) => ({ '--sx': `${x}px`, '--sy': `${y}px` } as CSSProperties);
const delay = (s: number) => ({ animationDelay: `${s}s` } as CSSProperties);

function Sparks({ cx, cy, n = 7 }: { cx: number; cy: number; n?: number }) {
  const v = [[-26, -30], [22, -34], [34, -10], [-34, -6], [12, -42], [-14, -40], [40, -24], [-40, -22]];
  return (
    <g>
      {v.slice(0, n).map(([x, y], i) => (
        <circle key={i} className="a-spark f-light" cx={cx} cy={cy} r={i % 2 ? 1.6 : 2.2} style={{ ...sx(x, y), ...delay(i * 0.11) }} />
      ))}
    </g>
  );
}

function Plate({ y = 222, dark }: { y?: number; dark?: boolean }) {
  return (
    <g>
      <rect x="30" y={y} width="210" height="34" className={dark ? 'f-dark3' : 'f-s3'} />
      <rect x="240" y={y} width="210" height="34" className={dark ? 'f-dark3' : 'f-s3'} />
      <path d={`M30 ${y}h420`} className={dark ? 's-linedark' : 's-line'} strokeWidth="1" />
    </g>
  );
}

function Grid({ dark }: { dark?: boolean }) {
  return (
    <g opacity=".7">
      {Array.from({ length: 11 }, (_, i) => <path key={'v' + i} d={`M${20 + i * 44} 20V280`} className={dark ? 's-linedark' : 's-line'} strokeWidth=".6" />)}
      {Array.from({ length: 6 }, (_, i) => <path key={'h' + i} d={`M20 ${30 + i * 50}H460`} className={dark ? 's-linedark' : 's-line'} strokeWidth=".6" />)}
    </g>
  );
}

function Labels({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <g>
      {items.map((t, i) => (
        <g key={t} transform={`translate(${30 + i * 112} 34)`}>
          <circle r="4" cx="4" cy="-4" className={i === 0 ? 'f-teal' : dark ? 'f-ondark3' : 'f-muted'} />
          <text x="14" y="0" className="lbl">{t}</text>
        </g>
      ))}
    </g>
  );
}

/* --------------------------------------------------- Verfahrens-Animation --- */

export function ProcessViz({ type, caption, dark = true }: { type: Verfahren } & VizProps) {
  const titles: Record<Verfahren, string> = {
    mag: 'Animation: MAG-Schweißen – Draht wird nachgeführt, Schutzgas schirmt das Schmelzbad ab, die Naht entsteht',
    wig: 'Animation: WIG-Schweißen – Lichtbogen an der Wolframelektrode, Zusatzstab wird von Hand zugeführt',
    e: 'Animation: Elektrodenschweißen – die umhüllte Stabelektrode brennt ab, Schlacke deckt die Naht',
    alu: 'Animation: WIG-Wechselstrom beim Aluminium – Plus- und Minusphase wechseln sich ab',
    autogen: 'Animation: Autogenschweißen – Acetylen-Sauerstoff-Flamme schmilzt das Metall',
    loeten: 'Animation: Löten – flüssiges Lot zieht in den Spalt, das Grundmaterial bleibt fest',
    pulse: 'Animation: Impulslichtbogen – Grund- und Impulsstrom wechseln, Tropfen lösen sich kontrolliert',
    pruefung: 'Animation: Weg zur Schweißerprüfung in fünf Tagen',
    mix: 'Animation: drei Lichtbogenverfahren an einem Kurstag'
  };
  return (
    <Frame caption={caption} dark={dark}>
      <svg className="viz" viewBox="0 0 480 300" role="img" aria-label={titles[type]}>
        <title>{titles[type]}</title>
        <Grid dark={dark} />
        {type === 'mag' && <Mag dark={dark} />}
        {type === 'wig' && <Wig dark={dark} />}
        {type === 'e' && <Stick dark={dark} />}
        {type === 'alu' && <Alu dark={dark} />}
        {type === 'autogen' && <Autogen dark={dark} />}
        {type === 'loeten' && <Loeten dark={dark} />}
        {type === 'pulse' && <Pulse dark={dark} />}
        {type === 'pruefung' && <Pruefung dark={dark} />}
        {type === 'mix' && <Mix dark={dark} />}
      </svg>
    </Frame>
  );
}

function Bead({ y = 220 }: { y?: number }) {
  return <path d={`M70 ${y}H410`} pathLength={1} className="a-bead s-teal" strokeWidth="9" strokeLinecap="round" fill="none" />;
}

function Mag({ dark }: { dark?: boolean }) {
  return (
    <g>
      <Labels items={['Lichtbogen', 'Drahtvorschub', 'Schutzgas', 'Naht']} dark={dark} />
      <Plate dark={dark} />
      <Bead />
      <g className="a-travel" style={{ '--travel': '340px' } as CSSProperties}>
        <g transform="translate(70 0)">
          {/* Schlauchpaket */}
          <path d="M60 62 C40 90 30 110 18 150" className="s-ondark3" strokeWidth="10" fill="none" strokeLinecap="round" opacity=".35" />
          {/* Brenner, schleppend geneigt */}
          <g transform="rotate(-18 0 200)">
            <rect x="-14" y="92" width="28" height="64" className={dark ? 'f-ondark2' : 'f-ink2'} />
            <path d="M-17 156h34l-6 30h-22Z" className={dark ? 'f-ondark3' : 'f-muted'} />
            <path d="M0 120V206" className="a-feed s-light" strokeWidth="2.4" fill="none" />
            {[0, 1, 2].map((i) => <circle key={i} cx={-10 + i * 10} cy={196} r={6 + i} className="a-gas f-light" opacity=".3" style={delay(i * 0.5)} />)}
          </g>
          <circle cx="0" cy="214" r="16" className="a-glow f-light" opacity=".5" />
          <circle cx="0" cy="214" r="6" className="a-flicker f-ondark" />
          <Sparks cx={0} cy={212} />
        </g>
      </g>
    </g>
  );
}

function Wig({ dark }: { dark?: boolean }) {
  return (
    <g>
      <Labels items={['Wolfram', 'Argon', 'Zusatzstab', 'Naht']} dark={dark} />
      <Plate dark={dark} />
      <Bead />
      <g className="a-travel" style={{ '--travel': '340px' } as CSSProperties}>
        <g transform="translate(70 0)">
          <g transform="rotate(-14 0 210)">
            <rect x="-12" y="96" width="24" height="70" className={dark ? 'f-ondark2' : 'f-ink2'} />
            <path d="M-15 166h30l-5 26h-20Z" className={dark ? 'f-ondark3' : 'f-muted'} />
            <path d="M0 186V204" className="s-light" strokeWidth="3" strokeLinecap="round" />
            {[0, 1].map((i) => <circle key={i} cx={-6 + i * 12} cy={198} r={7} className="a-gas f-light" opacity=".25" style={delay(i * 0.6)} />)}
          </g>
          {/* Zusatzstab von vorn */}
          <path d="M80 150 L16 210" className={dark ? 's-ondark3' : 's-muted'} strokeWidth="3" strokeLinecap="round" />
          <circle cx="16" cy="210" r="3" className="a-drop f-light" />
          <circle cx="2" cy="214" r="18" className="a-glow f-light" opacity=".45" />
          <circle cx="2" cy="214" r="5" className="a-flicker f-ondark" />
        </g>
      </g>
    </g>
  );
}

function Stick({ dark }: { dark?: boolean }) {
  return (
    <g>
      <Labels items={['Lichtbogen', 'Umhüllung', 'Schlacke', 'Naht']} dark={dark} />
      <Plate dark={dark} />
      <path d="M70 220H410" pathLength={1} className="a-bead s-teal" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M70 214H410" pathLength={1} className={`a-bead ${dark ? 's-ondark3' : 's-muted'}`} strokeWidth="4" strokeLinecap="round" fill="none" style={delay(0.4)} />
      <g className="a-travel" style={{ '--travel': '340px' } as CSSProperties}>
        <g transform="translate(70 0)">
          <rect x="-26" y="60" width="52" height="22" className={dark ? 'f-ondark3' : 'f-muted'} />
          <g transform="rotate(-20 0 210)">
            <rect x="-5" y="80" width="10" height="126" className={dark ? 'f-ondark2' : 'f-ink2'} />
            <path d="M0 80V206" className="s-light" strokeWidth="2" />
          </g>
          {[0, 1, 2].map((i) => <circle key={i} cx={-8 + i * 8} cy={196} r={5} className="a-gas f-ondark3" opacity=".3" style={delay(i * 0.4)} />)}
          <circle cx="0" cy="214" r="15" className="a-glow f-light" opacity=".5" />
          <circle cx="0" cy="214" r="5" className="a-flicker f-ondark" />
          <Sparks cx={0} cy={212} n={8} />
        </g>
      </g>
    </g>
  );
}

function Alu({ dark }: { dark?: boolean }) {
  return (
    <g>
      <Labels items={['Wechselstrom', 'Plus: Oxid', 'Minus: Wärme']} dark={dark} />
      <path d="M40 150H440" className={dark ? 's-linedark' : 's-line'} strokeWidth="1" />
      <text x="40" y="96" className="lbl">+ Reinigung</text>
      <text x="40" y="214" className="lbl">− Einbrand</text>
      <clipPath id="alu-clip"><rect x="40" y="70" width="400" height="160" /></clipPath>
      <g clipPath="url(#alu-clip)">
        <path className="a-sine s-teal" fill="none" strokeWidth="3"
          d="M40 150 q20 -60 40 0 t40 0 q20 -60 40 0 t40 0 q20 -60 40 0 t40 0 q20 -60 40 0 t40 0 q20 -60 40 0 t40 0 q20 -60 40 0 t40 0 q20 -60 40 0 t40 0" />
      </g>
      <Plate y={240} dark={dark} />
      <circle cx="240" cy="236" r="10" className="a-glow f-light" opacity=".5" />
    </g>
  );
}

function Autogen({ dark }: { dark?: boolean }) {
  return (
    <g>
      <Labels items={['Acetylen', 'Sauerstoff', '3.200 °C', 'Naht']} dark={dark} />
      <Plate dark={dark} />
      <Bead />
      <g className="a-travel" style={{ '--travel': '340px' } as CSSProperties}>
        <g transform="translate(70 0)">
          <g transform="rotate(-35 0 214)">
            <rect x="-6" y="70" width="12" height="110" className={dark ? 'f-ondark2' : 'f-ink2'} />
            <path d="M-4 180h8l-1 18h-6Z" className={dark ? 'f-ondark3' : 'f-muted'} />
            <path className="a-flame f-light" opacity=".35" d="M0 198c10 6 8 18 0 24-8-6-10-18 0-24Z" />
            <path className="a-flame f-ondark" d="M0 200c4 3 4 9 0 12-4-3-4-9 0-12Z" style={delay(0.2)} />
          </g>
          <path d="M44 150 L14 210" className={dark ? 's-ondark3' : 's-muted'} strokeWidth="3" strokeLinecap="round" />
          <circle cx="8" cy="214" r="16" className="a-glow f-light" opacity=".35" />
        </g>
      </g>
    </g>
  );
}

function Loeten({ dark }: { dark?: boolean }) {
  return (
    <g>
      <Labels items={['Flamme', 'Lot', 'Kapillarspalt']} dark={dark} />
      <rect x="60" y="150" width="360" height="26" className={dark ? 'f-dark3' : 'f-s3'} />
      <rect x="60" y="182" width="360" height="26" className={dark ? 'f-dark3' : 'f-s3'} />
      <path d="M60 179H420" pathLength={1} className="a-bead s-teal" strokeWidth="5" fill="none" />
      <path d="M240 90V140" className={dark ? 's-ondark3' : 's-muted'} strokeWidth="4" strokeLinecap="round" />
      {[0, 1, 2].map((i) => <circle key={i} cx="240" cy="142" r="4" className="a-drop f-teal" style={delay(i * 0.5)} />)}
      <path className="a-flame f-light" opacity=".35" d="M180 210c14 8 12 26 0 34-12-8-14-26 0-34Z" />
      <path className="a-flame f-light" opacity=".35" d="M300 210c14 8 12 26 0 34-12-8-14-26 0-34Z" style={delay(0.3)} />
    </g>
  );
}

function Pulse({ dark }: { dark?: boolean }) {
  return (
    <g>
      <Labels items={['Grundstrom', 'Impuls', 'Tropfen']} dark={dark} />
      <path d="M40 200H440" className={dark ? 's-linedark' : 's-line'} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={50 + i * 32} y="80" width="14" height="120" className="a-pulsebar f-teal" opacity={0.35 + (i % 3) * 0.2} style={delay(i * 0.09)} />
      ))}
      <Plate y={236} dark={dark} />
      {[0, 1, 2].map((i) => <circle key={i} cx="240" cy="212" r="4" className="a-drop f-light" style={delay(i * 0.36)} />)}
    </g>
  );
}

function Pruefung({ dark }: { dark?: boolean }) {
  const days = ['Fachkunde', 'Positionen', 'Lagen', 'Generalprobe', 'Prüfung'];
  return (
    <g>
      <Labels items={['5 Tage', 'DIN EN ISO 9606-1']} dark={dark} />
      <path d="M60 160H420" className={dark ? 's-linedark' : 's-line'} strokeWidth="2" />
      <path d="M60 160H420" pathLength={1} className="a-bead s-teal" strokeWidth="3" fill="none" />
      {days.map((d, i) => (
        <g key={d} transform={`translate(${60 + i * 90} 160)`}>
          <circle r="16" className={i === 4 ? 'f-teal' : dark ? 'f-dark2' : 'f-s0'} />
          <circle r="16" className="s-teal f-none" strokeWidth="2" />
          <text y="5" textAnchor="middle" className="t" style={{ fontSize: 13 }}>{i + 1}</text>
          <text y="46" textAnchor="middle" className="lbl">{d}</text>
          {i === 4 && <circle r="16" className="a-ring s-light f-none" strokeWidth="2" />}
        </g>
      ))}
      <g className="a-float" transform="translate(360 70)">
        <rect width="70" height="50" className={dark ? 'f-dark2' : 'f-s0'} />
        <rect width="70" height="50" className="s-teal f-none" />
        <path d="M12 16h46M12 26h30" className={dark ? 's-ondark3' : 's-muted'} strokeWidth="2" />
        <circle cx="54" cy="36" r="7" className="f-teal" />
      </g>
    </g>
  );
}

function Mix({ dark }: { dark?: boolean }) {
  const items = [{ x: 90, t: 'MAG' }, { x: 240, t: 'WIG' }, { x: 390, t: 'E-Hand' }];
  return (
    <g>
      <Labels items={['Ein Tag', 'Drei Verfahren']} dark={dark} />
      <Plate dark={dark} />
      {items.map((it, i) => (
        <g key={it.t}>
          <path d={`M${it.x - 50} 220H${it.x + 50}`} pathLength={1} className="a-bead s-teal" strokeWidth="8" strokeLinecap="round" fill="none" style={delay(i * 1.2)} />
          <circle cx={it.x} cy="214" r="14" className="a-glow f-light" opacity=".45" style={delay(i * 0.7)} />
          <circle cx={it.x} cy="214" r="4" className="a-flicker f-ondark" style={delay(i * 0.3)} />
          <text x={it.x} y="130" textAnchor="middle" className="val">{it.t}</text>
          <path d={`M${it.x} 142V196`} className={dark ? 's-ondark3' : 's-muted'} strokeWidth="1" strokeDasharray="3 4" />
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------ Hero-Visual --- */

export function HeroArc() {
  return (
    <svg className="viz" viewBox="0 0 500 500" role="img" aria-label="Abstrakte Darstellung eines Lichtbogens mit Funkenflug">
      <title>Lichtbogen – abstrakte Darstellung</title>
      <defs>
        <radialGradient id="hero-core"><stop offset="0" className="stop-s0" /><stop offset=".35" className="stop-light" /><stop offset="1" className="stop-dark" stopOpacity="0" /></radialGradient>
      </defs>
      <g className="a-orbit" style={{ transformOrigin: '250px 250px' }}>
        <circle cx="250" cy="250" r="210" className="s-linedark f-none" strokeDasharray="2 10" />
        <circle cx="460" cy="250" r="5" className="f-teal" />
      </g>
      <circle cx="250" cy="250" r="160" className="s-linedark f-none" />
      <circle cx="250" cy="250" r="110" className="s-teal f-none a-dash" strokeWidth="1.2" opacity=".6" />
      {[0, 1, 2].map((i) => <circle key={i} cx="250" cy="250" r="60" className="a-ring s-light f-none" strokeWidth="1.5" style={delay(i * 0.85)} />)}
      <circle cx="250" cy="250" r="90" fill="url(#hero-core)" className="a-glow" />
      <circle cx="250" cy="250" r="12" className="f-ondark a-flicker" />
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return <circle key={i} cx="250" cy="250" r={i % 3 ? 2 : 3} className="a-spark f-light" style={{ ...sx(Math.cos(a) * 150, Math.sin(a) * 150), animationDuration: `${1.4 + (i % 4) * 0.3}s`, ...delay(i * 0.12) }} />;
      })}
      <path d="M90 420 H410" className="s-linedark" />
      <path d="M90 420 H410" pathLength={1} className="a-bead s-teal" strokeWidth="6" strokeLinecap="round" fill="none" />
      <text x="90" y="452" className="lbl">Theorie 25 %</text>
      <text x="410" y="452" textAnchor="end" className="lbl">Praxis 75 %</text>
    </svg>
  );
}

/* ----------------------------------------------------- Theorie/Praxis-Ring --- */

export function RatioViz({ dark }: VizProps) {
  const r = 70, c = 2 * Math.PI * r;
  return (
    <Frame dark={dark} caption="Verhältnis von Theorie zu Praxis in den Einsteigerkursen">
      <svg className="viz" viewBox="0 0 300 200" role="img" aria-label="Theorie 25 Prozent, Praxis 75 Prozent">
        <title>Theorie 25 %, Praxis 75 %</title>
        <g transform="translate(100 100) rotate(-90)">
          <circle r={r} className={dark ? 's-linedark f-none' : 's-s3 f-none'} strokeWidth="18" />
          <circle r={r} className="s-teal f-none" strokeWidth="18" strokeDasharray={`${c * 0.75} ${c}`} pathLength={c} style={{ strokeDashoffset: 0 }} />
          <circle r={r} className="s-deep f-none" strokeWidth="18" strokeDasharray={`${c * 0.25} ${c}`} style={{ strokeDashoffset: -c * 0.75 }} />
        </g>
        <text x="100" y="98" textAnchor="middle" className="val">75 %</text>
        <text x="100" y="118" textAnchor="middle" className="lbl">Praxis</text>
        <g transform="translate(200 76)"><rect width="12" height="12" className="f-teal" /><text x="20" y="11" className="t">Praxis am eigenen Platz</text></g>
        <g transform="translate(200 104)"><rect width="12" height="12" className="f-deep" /><text x="20" y="11" className="t">Theorie</text></g>
      </svg>
    </Frame>
  );
}

/* -------------------------------------------------------- Buchungsablauf --- */

export function BookingFlowViz({ dark }: VizProps) {
  const steps = ['Termin wählen', 'Daten eingeben', 'Zahlungspflichtig buchen', 'Bestätigung per E-Mail', 'PayPal oder Vorkasse', 'Kurstag'];
  return (
    <Frame dark={dark} caption="So läuft Ihre Buchung ab – in wenigen Minuten erledigt">
      <svg className="viz" viewBox="0 0 960 170" role="img" aria-label={'Buchungsablauf: ' + steps.join(', ')}>
        <title>Buchungsablauf in sechs Schritten</title>
        <path d="M80 70H880" className={dark ? 's-linedark' : 's-line'} strokeWidth="2" />
        <path d="M80 70H880" pathLength={1} className="a-bead s-teal" strokeWidth="2" fill="none" style={{ animationDuration: '8s' }} />
        <circle r="6" className="f-teal" cy="70" cx="80" style={{ animation: 'torch-travel 8s var(--ease-io) infinite', '--travel': '800px' } as CSSProperties} />
        {steps.map((s, i) => {
          const x = 80 + i * 160;
          return (
            <g key={s} transform={`translate(${x} 70)`}>
              <circle r="26" className={dark ? 'f-dark2' : 'f-s0'} />
              <circle r="26" className="s-teal f-none" strokeWidth="1.5" />
              <text y="6" textAnchor="middle" className="t" style={{ fontSize: 16 }}>{String(i + 1).padStart(2, '0')}</text>
              <text y="56" textAnchor="middle" className="t" style={{ fontSize: 13 }}>{s.split(' ').slice(0, 2).join(' ')}</text>
              <text y="74" textAnchor="middle" className="t" style={{ fontSize: 13 }}>{s.split(' ').slice(2).join(' ')}</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ------------------------------------------------------------- Kurstag-Uhr --- */

export function DayClockViz({ dark }: VizProps) {
  const seg = [
    { from: 8, to: 10, label: 'Theorie', cls: 's-deep' },
    { from: 10, to: 12, label: 'Praxis', cls: 's-teal' },
    { from: 12, to: 12.75, label: 'Mittag', cls: dark ? 's-ondark3' : 's-muted' },
    { from: 12.75, to: 16, label: 'Praxis', cls: 's-teal' }
  ];
  const ang = (h: number) => ((h - 8) / 8) * 300 - 240;
  const pt = (h: number, r: number) => { const a = (ang(h) * Math.PI) / 180; return [150 + Math.cos(a) * r, 130 + Math.sin(a) * r]; };
  const arc = (a: number, b: number, r: number) => { const [x1, y1] = pt(a, r); const [x2, y2] = pt(b, r); const large = ((b - a) / 8) * 300 > 180 ? 1 : 0; return `M${x1} ${y1}A${r} ${r} 0 ${large} 1 ${x2} ${y2}`; };
  return (
    <Frame dark={dark} caption="Ein Kurstag von 8 bis 16 Uhr – Mittagessen und Getränke inklusive">
      <svg className="viz" viewBox="0 0 300 250" role="img" aria-label="Kurstag: 8 bis 10 Uhr Theorie, danach Praxis, Mittagspause, Praxis bis 16 Uhr">
        <title>Ablauf eines Kurstags</title>
        {seg.map((s, i) => <path key={i} d={arc(s.from, s.to, 92)} className={`${s.cls} f-none`} strokeWidth="16" />)}
        {[8, 10, 12, 14, 16].map((h) => { const [x, y] = pt(h, 120); return <text key={h} x={x} y={y + 4} textAnchor="middle" className="lbl">{h}:00</text>; })}
        <g className="a-orbit" style={{ transformOrigin: '150px 130px', animationDuration: '16s' }}>
          <circle cx="150" cy="38" r="5" className="f-light" />
        </g>
        <text x="150" y="128" textAnchor="middle" className="val">8 h</text>
        <text x="150" y="148" textAnchor="middle" className="lbl">Kurstag</text>
      </svg>
    </Frame>
  );
}

/* --------------------------------------------------- Standortkarte (abstrakt) --- */

export function LocationsViz({ dark = true, focus }: VizProps & { focus?: 'muenchen' | 'hamburg' }) {
  // Grobe Deutschland-Silhouette aus Punkten (generalisiert)
  const rows = [
    '..........##..........', '.........####.........', '........######........', '.......########.......', '......##########......',
    '.....############.....', '....##############....', '....##############....', '...################...', '...################...',
    '...################...', '...###############....', '....##############....', '....##############....', '...###############....',
    '...################...', '....###############...', '.....##############...', '......############....', '.......##########.....'
  ];
  const cell = 14;
  const H = { x: 9, y: 2 }; const M = { x: 13, y: 18 };
  const p = (c: { x: number; y: number }) => [40 + c.x * cell, 20 + c.y * cell];
  const [hx, hy] = p(H); const [mx, my] = p(M);
  return (
    <Frame dark={dark} caption="Zwei Kursorte: München-Freiham und Ellerhoop bei Hamburg">
      <svg className="viz" viewBox="0 0 400 320" role="img" aria-label="Karte mit den Kursorten München und Hamburg">
        <title>Kursorte München und Region Hamburg</title>
        {rows.map((row, y) => row.split('').map((ch, x) => ch === '#' && <circle key={`${x}-${y}`} cx={40 + x * cell} cy={20 + y * cell} r="2.2" className={dark ? 'f-dark3' : 'f-s3'} />))}
        <path d={`M${hx} ${hy} C ${hx + 80} ${hy + 60}, ${mx - 60} ${my - 120}, ${mx} ${my}`} className="a-dash s-teal f-none" strokeWidth="1.5" />
        {[{ x: hx, y: hy, t: 'Region Hamburg', id: 'hamburg' }, { x: mx, y: my, t: 'München', id: 'muenchen' }].map((c) => (
          <g key={c.t}>
            <circle cx={c.x} cy={c.y} r="10" className="a-ring s-light f-none" strokeWidth="2" />
            <circle cx={c.x} cy={c.y} r={focus === c.id ? 9 : 7} className="f-teal" />
            <circle cx={c.x} cy={c.y} r="3" className="f-ondark" />
            <text x={c.x + 16} y={c.y + 4} className="t" style={{ fontSize: 14 }}>{c.t}</text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* --------------------------------------------------------- Lernpfad --- */

export function PathViz({ dark }: VizProps) {
  const steps = [
    { t: 'Einsteiger', s: 'MAG · WIG · E · Autogen' },
    { t: 'Aufbau', s: 'Alu-WIG · Pulse-Arc · MAG+' },
    { t: 'Prüfung', s: 'DIN EN ISO 9606-1' }
  ];
  return (
    <Frame dark={dark} caption="Vom ersten Lichtbogen bis zum Schweißerpass">
      <svg className="viz" viewBox="0 0 480 220" role="img" aria-label="Lernpfad: Einsteigerkurs, Aufbaukurs, Lehrgang mit Prüfung">
        <title>Lernpfad in drei Stufen</title>
        <path d="M60 180 L200 120 L340 60 L440 40" className={dark ? 's-linedark' : 's-line'} strokeWidth="2" fill="none" />
        <path d="M60 180 L200 120 L340 60 L440 40" pathLength={1} className="a-bead s-teal" strokeWidth="3" fill="none" />
        {[[60, 180], [200, 120], [340, 60]].map(([x, y]) => <rect key={x} x={x - 6} y={y} width="12" height={200 - y} className={dark ? 'f-dark3' : 'f-s3'} />)}
        {steps.map((s, i) => {
          const [x, y] = [[60, 180], [200, 120], [340, 60]][i];
          return (
            <g key={s.t}>
              <circle cx={x} cy={y} r="11" className="f-teal" />
              <circle cx={x} cy={y} r="11" className="a-ring s-light f-none" style={delay(i * 0.6)} />
              <text x={x + 18} y={y - 6} className="t">{s.t}</text>
              <text x={x + 18} y={y + 12} className="lbl">{s.s}</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ------------------------------------------------- Werkstoff-Verfahren-Matrix --- */

export function MatrixViz({ dark }: VizProps) {
  const cols = ['MAG', 'MIG', 'WIG', 'E-Hand', 'Autogen'];
  const rows: [string, number[]][] = [
    ['Baustahl', [3, 1, 2, 3, 2]],
    ['Edelstahl', [2, 1, 3, 2, 1]],
    ['Aluminium', [0, 3, 3, 1, 0]],
    ['Dünnblech', [2, 2, 3, 1, 3]],
    ['Montage im Freien', [1, 1, 1, 3, 2]]
  ];
  return (
    <Frame dark={dark} caption="Welches Verfahren passt zu welchem Werkstoff? (3 = sehr gut geeignet)">
      <svg className="viz" viewBox="0 0 520 260" role="img" aria-label="Matrix: Eignung der Schweißverfahren je Werkstoff">
        <title>Eignung der Schweißverfahren nach Werkstoff</title>
        {cols.map((c, i) => <text key={c} x={190 + i * 66} y="30" textAnchor="middle" className="lbl">{c}</text>)}
        {rows.map(([r, v], y) => (
          <g key={r} transform={`translate(0 ${60 + y * 42})`}>
            <text x="20" y="5" className="t">{r}</text>
            {v.map((n, x) => (
              <g key={x} transform={`translate(${190 + x * 66} 0)`}>
                <circle r="16" className={dark ? 'f-dark2' : 'f-s2'} />
                {n > 0 && <circle r={5 + n * 3.6} className="f-teal reveal-dot" opacity={0.3 + n * 0.22} />}
              </g>
            ))}
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* --------------------------------------------------------- Nahtformen --- */

export function JointsViz({ dark }: VizProps) {
  const J = [
    { t: 'Stumpfnaht', d: 'M10 70h60v20H10zM80 70h60v20H80z', w: 'M70 70c3 -8 7 -8 10 0' },
    { t: 'Kehlnaht', d: 'M10 70h130v20H10zM60 10h20v60H60z', w: 'M60 70l-14 0 14 -14z M80 70l14 0 -14 -14z' },
    { t: 'Ecknaht', d: 'M10 70h70v20H10zM80 10h20v80H80z', w: 'M80 70l-12 0 12 -12z' },
    { t: 'Überlappnaht', d: 'M10 74h90v16H10zM60 58h90v16H60z', w: 'M60 74l-10 0 10 -10z' }
  ];
  return (
    <Frame dark={dark} caption="Die vier Grundformen der Schweißnaht im Querschnitt">
      <svg className="viz" viewBox="0 0 640 150" role="img" aria-label="Stumpfnaht, Kehlnaht, Ecknaht und Überlappnaht im Querschnitt">
        <title>Schweißnahtformen</title>
        {J.map((j, i) => (
          <g key={j.t} transform={`translate(${10 + i * 160} 10)`}>
            <path d={j.d} className={dark ? 'f-dark3' : 'f-s3'} />
            <path d={j.w} className="f-teal a-glow" style={delay(i * 0.4)} />
            <text x="75" y="122" textAnchor="middle" className="t">{j.t}</text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* ------------------------------------------------------ Brennerhaltung --- */

export function TorchAngleViz({ dark }: VizProps) {
  return (
    <Frame dark={dark} caption="Brennerhaltung: stechend (Brenner zeigt in Schweißrichtung) und schleppend">
      <svg className="viz" viewBox="0 0 480 220" role="img" aria-label="Stechende und schleppende Brennerhaltung mit Winkeln">
        <title>Stechende und schleppende Brennerhaltung</title>
        {[{ x: 120, r: 15, t: 'stechend' }, { x: 360, r: -15, t: 'schleppend' }].map((g) => (
          <g key={g.t}>
            <rect x={g.x - 100} y="170" width="200" height="20" className={dark ? 'f-dark3' : 'f-s3'} />
            <path d={`M${g.x} 170V60`} className={dark ? 's-ondark3' : 's-muted'} strokeDasharray="3 4" />
            <g transform={`rotate(${g.r} ${g.x} 168)`} className="a-float">
              <rect x={g.x - 9} y="70" width="18" height="80" className={dark ? 'f-ondark2' : 'f-ink2'} />
              <path d={`M${g.x - 11} 150h22l-4 16h-14z`} className="f-teal" />
            </g>
            <path d={`M${g.x} 110 A58 58 0 0 ${g.r > 0 ? 1 : 0} ${g.x + (g.r > 0 ? 15 : -15)} 112`} className="s-teal f-none" strokeWidth="2" />
            <text x={g.x} y="40" textAnchor="middle" className="t">{g.t} · 10–15°</text>
            <path d={`M${g.x - 60} 205h120`} className="s-teal" strokeWidth="2" markerEnd="url(#arrow)" />
          </g>
        ))}
        <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" className="f-teal" /></marker></defs>
        <text x="240" y="216" textAnchor="middle" className="lbl">Schweißrichtung</text>
      </svg>
    </Frame>
  );
}

/* --------------------------------------------------------- Schutzgas --- */

export function ShieldGasViz({ dark = true }: VizProps) {
  return (
    <Frame dark={dark} caption="Das Schutzgas verdrängt die Umgebungsluft und schützt das flüssige Schmelzbad vor Sauerstoff und Stickstoff">
      <svg className="viz" viewBox="0 0 480 260" role="img" aria-label="Schutzgasglocke über dem Schmelzbad">
        <title>Wirkung des Schutzgases</title>
        <Plate y={210} dark={dark} />
        <rect x="222" y="40" width="36" height="110" className={dark ? 'f-ondark2' : 'f-ink2'} />
        <path d="M216 150h48l-8 34h-32Z" className={dark ? 'f-ondark3' : 'f-muted'} />
        {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={210 + (i % 3) * 30} cy={176 + Math.floor(i / 3) * 6} r="10" className="a-gas f-light" opacity=".25" style={delay(i * 0.2)} />)}
        <ellipse cx="240" cy="210" rx="26" ry="6" className="f-teal a-glow" />
        {['O₂', 'N₂', 'H₂O'].map((g, i) => (
          <g key={g} className="a-float" style={delay(i * 0.7)}>
            <circle cx={[90, 390, 120][i]} cy={[150, 140, 90][i]} r="18" className={dark ? 'f-dark2' : 'f-s2'} />
            <text x={[90, 390, 120][i]} y={[155, 145, 95][i]} textAnchor="middle" className="t">{g}</text>
          </g>
        ))}
        <path d="M110 150 L186 178 M370 140 L294 176" className="s-muted a-dash f-none" strokeWidth="1.2" />
      </svg>
    </Frame>
  );
}

/* ------------------------------------------------------- Gasflaschen-Farben --- */

export function BottlesViz({ dark }: VizProps) {
  // Farbangaben nach DIN EN 1089-3 als Text – die Grafik bleibt in den Markenfarben.
  const b = [
    { t: 'Sauerstoff', c: 'weiß' },
    { t: 'Acetylen', c: 'kastanienbraun' },
    { t: 'Argon', c: 'dunkelgrün' },
    { t: 'Argon/CO₂', c: 'leuchtendgrün' },
    { t: 'CO₂', c: 'grau' },
    { t: 'Stickstoff', c: 'schwarz' }
  ];
  return (
    <Frame dark={dark} caption="Die Farbe der Flaschenschulter kennzeichnet das Gas (DIN EN 1089-3). Verbindlich ist immer das Gefahrgutetikett.">
      <svg className="viz" viewBox="0 0 540 250" role="img" aria-label={'Gasflaschen mit Schulterfarben: ' + b.map((x) => `${x.t} ${x.c}`).join(', ')}>
        <title>Kennzeichnung von Gasflaschen</title>
        {b.map((x, i) => (
          <g key={x.t} transform={`translate(${30 + i * 85} 20)`} className="a-float" style={delay(i * 0.3)}>
            <rect x="18" y="0" width="14" height="12" className="f-muted" />
            <path d="M5 40 Q5 14 25 14 Q45 14 45 40Z" className="f-teal" opacity={0.35 + i * 0.1} />
            <rect x="5" y="40" width="40" height="130" className={dark ? 'f-dark3' : 'f-s3'} />
            <text x="25" y="196" textAnchor="middle" className="t" style={{ fontSize: 12 }}>{x.t}</text>
            <text x="25" y="214" textAnchor="middle" className="lbl" style={{ fontSize: 9 }}>Schulter {x.c}</text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* ---------------------------------------------------------- Plätze-Meter --- */

export function SeatsViz({ frei, gesamt }: { frei: number; gesamt: number }) {
  return (
    <svg className="viz" viewBox={`0 0 ${gesamt * 22} 22`} role="img" aria-label={`${frei} von ${gesamt} Plätzen frei`} style={{ maxWidth: gesamt * 22 }}>
      <title>{`${frei} von ${gesamt} Plätzen frei`}</title>
      {Array.from({ length: gesamt }, (_, i) => (
        <rect key={i} x={i * 22 + 2} y="2" width="18" height="18" className={i < gesamt - frei ? 'f-s3' : 'f-teal'} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------ Schweißpositionen --- */

export function PositionsViz({ dark }: VizProps) {
  const P = [
    { c: 'PA', t: 'Wannenlage', r: 0 }, { c: 'PB', t: 'Horizontal', r: 45 }, { c: 'PC', t: 'Quer', r: 90 },
    { c: 'PF', t: 'Steigend', r: -90 }, { c: 'PG', t: 'Fallend', r: 90 }, { c: 'PE', t: 'Überkopf', r: 180 }
  ];
  return (
    <Frame dark={dark} caption="Schweißpositionen nach DIN EN ISO 6947 – Grundlage jeder Schweißerprüfung">
      <svg className="viz" viewBox="0 0 600 150" role="img" aria-label="Schweißpositionen PA, PB, PC, PF, PG und PE">
        <title>Schweißpositionen nach DIN EN ISO 6947</title>
        {P.map((p, i) => (
          <g key={p.c} transform={`translate(${50 + i * 100} 60)`}>
            <circle r="36" className={dark ? 'f-dark2' : 'f-s1'} />
            <g transform={`rotate(${p.r})`}>
              <path d="M-22 6h44" className={dark ? 's-ondark3' : 's-muted'} strokeWidth="6" />
              <path d="M0 0V-24" className="s-teal" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="-26" r="4" className="f-teal a-glow" />
            </g>
            <text y="62" textAnchor="middle" className="t">{p.c}</text>
            <text y="78" textAnchor="middle" className="lbl">{p.t}</text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* -------------------------------------------------- Gültigkeit Schweißerpass --- */

export function ValidityViz({ dark }: VizProps) {
  return (
    <Frame dark={dark} caption="Der Schweißerpass gilt drei Jahre – vorausgesetzt, die Tätigkeit ruht nie länger als sechs Monate">
      <svg className="viz" viewBox="0 0 520 120" role="img" aria-label="Zeitstrahl: drei Jahre Gültigkeit mit halbjährlicher Bestätigung">
        <title>Gültigkeit der Schweißerprüfung</title>
        <path d="M30 60H490" className={dark ? 's-linedark' : 's-line'} strokeWidth="6" />
        <path d="M30 60H490" pathLength={1} className="a-bead s-teal" strokeWidth="6" fill="none" style={{ animationDuration: '7s' }} />
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i} transform={`translate(${30 + i * (460 / 6)} 60)`}>
            <circle r={i % 2 === 0 ? 7 : 4} className={i % 2 === 0 ? 'f-deep' : 'f-teal'} />
            {i % 2 === 0 && <text y="-18" textAnchor="middle" className="lbl">{i === 0 ? 'Prüfung' : `Jahr ${i / 2}`}</text>}
            {i % 2 === 1 && <text y="30" textAnchor="middle" className="lbl">6 Mon.</text>}
          </g>
        ))}
      </svg>
    </Frame>
  );
}
