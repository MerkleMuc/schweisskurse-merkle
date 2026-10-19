#!/usr/bin/env node
/* Prüft jede URL aus dem WordPress-Inventar gegen den laufenden Neubau
   (Standard http://localhost:3000). Erwartet 200 oder 301/308. */
import fs from 'node:fs/promises';
const BASE = process.env.CHECK_BASE || 'http://localhost:3000';
const list = JSON.parse(await fs.readFile('content/wp-import/urls.json', 'utf8'));
let bad = 0;
for (const u of list) {
  const r = await fetch(BASE + u.path, { redirect: 'manual' });
  const ok = r.status === 200 || r.status === 301 || r.status === 308;
  if (!ok) bad++;
  console.log(`${ok ? '✓' : '✗'} ${r.status} ${u.path}${r.headers.get('location') ? ' → ' + r.headers.get('location') : ''}`);
}
console.log(`\n${list.length - bad}/${list.length} erreichbar`);
process.exit(bad ? 1 : 0);
