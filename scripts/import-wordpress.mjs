#!/usr/bin/env node
/*
 * Übernimmt die Originaltexte der bisherigen WordPress-Seite
 * schweisskurse-merkle.de über die WordPress-REST-API.
 *
 *   npm run import:wp                 # Standard: https://www.schweisskurse-merkle.de
 *   WP_BASE=https://… npm run import:wp
 *
 * Ergebnis:
 *   content/wp/<pfad>.html            Inhalt je Seite/Beitrag/Glossareintrag
 *   content/wp-import/urls.json       vollständiges URL-Inventar (für Redirect-Abgleich)
 *   content/wp-import/raw/*.json      Rohdaten (nicht versioniert)
 *
 * Existiert für eine Ratgeber-Seite eine Datei in content/wp/, zeigt die neue
 * Website automatisch den Originaltext an.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = (process.env.WP_BASE || 'https://www.schweisskurse-merkle.de').replace(/\/$/, '');
const OUT = path.resolve('content/wp');
const RAW = path.resolve('content/wp-import/raw');

async function all(type) {
  const items = [];
  for (let page = 1; page < 50; page++) {
    const r = await fetch(`${BASE}/wp-json/wp/v2/${type}?per_page=100&page=${page}&_fields=id,link,slug,title,content,excerpt,modified,parent`);
    if (r.status === 400 || r.status === 404) break;
    if (!r.ok) throw new Error(`${type}: HTTP ${r.status}`);
    const batch = await r.json();
    items.push(...batch);
    if (batch.length < 100) break;
  }
  return items;
}

async function types() {
  try {
    const r = await fetch(`${BASE}/wp-json/wp/v2/types`);
    const j = await r.json();
    return Object.values(j).map((t) => t.rest_base).filter((b) => b && !['media', 'blocks', 'menu-items', 'navigation', 'templates', 'template-parts', 'global-styles', 'font-families', 'wp_pattern_category'].includes(b));
  } catch {
    return ['pages', 'posts', 'glossary'];
  }
}

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(RAW, { recursive: true });
const inventar = [];
for (const t of await types()) {
  let items = [];
  try { items = await all(t); } catch (e) { console.warn(`⚠ ${t}: ${e.message}`); continue; }
  await fs.writeFile(path.join(RAW, `${t}.json`), JSON.stringify(items, null, 2));
  for (const it of items) {
    const u = new URL(it.link);
    const p = u.pathname.endsWith('/') ? u.pathname : u.pathname + '/';
    inventar.push({ type: t, path: p, title: it.title?.rendered, modified: it.modified });
    const html = it.content?.rendered || '';
    if (!html.trim()) continue;
    const file = path.join(OUT, p.replace(/^\/|\/$/g, '').replace(/\//g, '__') + '.html');
    if (p === '/') continue;
    await fs.writeFile(file, html);
  }
  console.log(`✓ ${t}: ${items.length}`);
}
inventar.sort((a, b) => a.path.localeCompare(b.path));
await fs.writeFile(path.resolve('content/wp-import/urls.json'), JSON.stringify(inventar, null, 2));
console.log(`\n${inventar.length} URLs inventarisiert → content/wp-import/urls.json`);
console.log('Abgleich mit dem Neubau: node scripts/check-urls.mjs');
