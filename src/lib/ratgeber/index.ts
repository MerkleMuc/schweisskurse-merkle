import { VERFAHREN } from './verfahren';
import { PRAXIS } from './praxis';
import { GASE, METALL } from './gase-metall';
import { ZUBEHOER } from './zubehoer';
import type { RatgeberSeite } from './types';

export const RATGEBER: RatgeberSeite[] = [...VERFAHREN, ...PRAXIS, ...GASE, ...METALL, ...ZUBEHOER];
export const RATGEBER_BY_PATH: Record<string, RatgeberSeite> = Object.fromEntries(RATGEBER.map((r) => [r.path, r]));

const LABEL: Record<string, string> = {
  '/ratgeber/': 'Ratgeber', '/ratgeber/schweissverfahren/': 'Schweißverfahren', '/ratgeber/schweissanleitung/': 'Schweißanleitung',
  '/ratgeber/gase/': 'Gase', '/ratgeber/metall/': 'Metall', '/ratgeber/schweisszubehoer/': 'Zubehör', '/ratgeber/gase/gassorten/': 'Gassorten',
  '/ratgeber/schweissverfahren/mig-mag-schweissen/': 'MIG/MAG', '/ratgeber/schweissverfahren/wig-schweissen/': 'WIG',
  '/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/': 'Nahtformen'
};

/** Brotkrumen aus den Pfadsegmenten – nur existierende Seiten werden verlinkt. */
export function trailFor(path: string) {
  if (!path.startsWith('/ratgeber/')) return [{ label: 'Ratgeber', href: '/ratgeber/' }, { label: RATGEBER_BY_PATH[path]?.h1 || path, href: path }];
  const parts = path.split('/').filter(Boolean);
  const out: { label: string; href: string }[] = [];
  for (let i = 1; i <= parts.length; i++) {
    const p = '/' + parts.slice(0, i).join('/') + '/';
    const page = RATGEBER_BY_PATH[p];
    if (page) out.push({ label: LABEL[p] || page.h1, href: p });
  }
  return out;
}

export function childrenOf(path: string) {
  const depth = path.split('/').filter(Boolean).length;
  return RATGEBER.filter((r) => r.path !== path && r.path.startsWith(path) && r.path.split('/').filter(Boolean).length === depth + 1);
}

/** Nächste existierende Elternseite – Ziel für 301 bei unbekannten Alt-URLs. */
export function nearestExisting(path: string) {
  const parts = path.split('/').filter(Boolean);
  for (let i = parts.length - 1; i >= 1; i--) {
    const p = '/' + parts.slice(0, i).join('/') + '/';
    if (RATGEBER_BY_PATH[p]) return p;
  }
  return '/ratgeber/';
}

export type { RatgeberSeite };
