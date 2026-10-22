#!/usr/bin/env node
/*
 * Statischer Vorschau-Export für GitHub Pages.
 *
 * Crawlt die laufende Anwendung (EXPORT_FROM, Standard http://localhost:3000)
 * und schreibt jede Seite als <pfad>/index.html nach EXPORT_OUT (Standard ./preview).
 * Alle internen Links, Bilder und Stylesheets werden auf BASE_PATH umgeschrieben
 * (für https://<org>.github.io/<repo>/ z. B. BASE_PATH=/schweisskurse-merkle).
 *
 * Die Vorschau enthält kein JavaScript: Inhalte, Bilder und Animationen sind
 * vollständig sichtbar, Buchung, Live-Filter und Backend brauchen den Server.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const FROM = (process.env.EXPORT_FROM || 'http://localhost:3000').replace(/\/$/, '');
const OUT = path.resolve(process.env.EXPORT_OUT || 'preview');
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
const ROOT = process.cwd();
const SKIP = /^\/(_next|images|fonts|admin|buchen|api)\b|\.(svg|png|jpg|webmanifest|xml|txt)$/;

await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(path.join(OUT, '_static'), { recursive: true });

const pages = new Set();
const queue = ['/'];
const html = new Map();
while (queue.length) {
  const p = queue.shift();
  if (pages.has(p)) continue;
  pages.add(p);
  const r = await fetch(FROM + p, { redirect: 'manual' });
  if (r.status !== 200) continue;
  const t = await r.text();
  html.set(p, t);
  for (const [, h] of t.matchAll(/href="(\/[^"#?]*)/g)) if (!SKIP.test(h) && !pages.has(h)) queue.push(h);
}

const css = new Map();
async function cssFile(href) {
  if (css.has(href)) return css.get(href);
  let c = await (await fetch(FROM + href)).text();
  for (const m of new Set(c.match(/url\([^)]*?\/media\/[^)]+\)/g) || [])) {
    const name = path.basename(m.slice(4, -1));
    await fs.copyFile(path.join(ROOT, '.next/static/media', name), path.join(OUT, '_static', name));
    c = c.split(m).join(`url(${BASE}/_static/${name})`);
  }
  const name = `_static/${path.basename(href)}`;
  await fs.writeFile(path.join(OUT, name), c);
  css.set(href, `${BASE}/${name}`);
  return css.get(href);
}

const bilder = new Set();
const HINWEIS = `<div style="position:sticky;top:0;z-index:999;background:var(--ember);color:var(--on-dark);font:600 12px/1.4 system-ui,sans-serif;padding:6px 16px;text-align:center">Vorschau – Buchung, Kalender-Filter und Backend funktionieren nur in der laufenden Anwendung</div>`;

for (const [p, raw] of html) {
  let t = raw
    .replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/g, '')
    .replace(/<link[^>]*rel="(preload|modulepreload|manifest)"[^>]*\/?>/g, '')
    .replace('class="header header--over-dark', 'class="header');
  for (const [tag, href] of [...t.matchAll(/<link rel="stylesheet" href="(\/_next\/static\/[^"]+\.css)"[^>]*\/?>/g)]) {
    t = t.replace(tag, `<link rel="stylesheet" href="${await cssFile(href)}"/>`);
  }
  t = t.replace(/<img[^>]*>/g, (tag) => {
    const m = tag.match(/ src="\/_next\/image\/?\?url=([^&"]+)/);
    if (m) {
      const real = decodeURIComponent(m[1]);
      if (/^https?:/.test(real)) {
        tag = tag.replace(/ src="[^"]+"/, ` src="${real}"`);
      } else {
        bilder.add(real);
        tag = tag.replace(/ src="[^"]+"/, ` src="${BASE}${real}"`);
      }
    }
    return tag.replace(/ srcSet="[^"]*"/, '').replace(/ sizes="[^"]*"/, '');
  });
  t = t.replace(/href="(\/[^"]*)"/g, (all, h) => {
    if (h.startsWith('/_static') || (BASE && h.startsWith(BASE + '/_static/'))) return all;
    if (/^\/(buchen|admin|api)\b/.test(h)) return `href="${BASE}/vorschau-hinweis/"`;
    return `href="${BASE}${h}"`;
  });
  t = t.replace(/ action="[^"]*"/g, ` action="${BASE}/vorschau-hinweis/"`).replace('<body>', '<body>' + HINWEIS);
  const file = path.join(OUT, p, 'index.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, t);
}

for (const b of bilder) {
  await fs.mkdir(path.join(OUT, path.dirname(b)), { recursive: true });
  await fs.copyFile(path.join(ROOT, 'public', b), path.join(OUT, b));
}
for (const f of ['favicon.svg', 'images/logos/merkle-logo.png']) {
  await fs.mkdir(path.join(OUT, path.dirname(f)), { recursive: true });
  await fs.copyFile(path.join(ROOT, 'public', f), path.join(OUT, f));
}

await fs.mkdir(path.join(OUT, 'vorschau-hinweis'), { recursive: true });
await fs.writeFile(path.join(OUT, 'vorschau-hinweis/index.html'), `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nur in der Anwendung</title><link rel="stylesheet" href="${[...css.values()][0] || ''}"></head><body><section class="section page-hero"><div class="container"><p class="kicker">Vorschau</p><h1>Nur in der laufenden <b>Anwendung</b></h1><p class="lead">Buchungsweg, Formulare, Live-Filter im Terminkalender und das Mitarbeiter-Backend brauchen den Next.js-Server. In dieser statischen Vorschau sind sie deaktiviert.</p><p><a class="btn btn--primary" href="${BASE}/">Zur Startseite</a> <a class="btn btn--secondary" href="${BASE}/termine-und-anmeldungen/">Termine</a></p></div></section></body></html>`);
await fs.writeFile(path.join(OUT, '.nojekyll'), '');
await fs.writeFile(path.join(OUT, '404.html'), (await fs.readFile(path.join(OUT, 'index.html'), 'utf8')));
console.log(`${html.size} Seiten, ${bilder.size} Bilder → ${OUT}`);
