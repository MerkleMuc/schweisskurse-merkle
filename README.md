# schweisskurse-merkle.de – Relaunch

Neubau der Website **Merkle Schweißkurse** (Wilhelm Merkle Schweißtechnik GmbH) als
Next.js-Anwendung mit Online-Buchung und einem einfachen Mitarbeiter-Backend je Standort.

- **Gestaltung:** verbindlich nach [`docs/DESIGN-PROMPT.md`](docs/DESIGN-PROMPT.md)
- **Konzept:** [`docs/KONZEPT.md`](docs/KONZEPT.md) – Informationsarchitektur, Seitenvorlagen, Conversion, SEO/GEO
- **URL-Übernahme:** [`docs/URL-MAPPING.md`](docs/URL-MAPPING.md)
- **Offene Punkte:** [`docs/TODO.md`](docs/TODO.md)

---

## Schnellstart

```bash
npm install
cp .env.example .env.local      # Werte eintragen
npm run dev                     # http://localhost:3000
```

Produktion:

```bash
npm run build
npm start                       # Port 3000, PORT=… zum Ändern
```

Voraussetzung: **Node.js ≥ 22.5** (für das eingebaute `node:sqlite`). Es gibt keinen
externen Datenbankserver und keine nativen Abhängigkeiten.

## Was drin ist

| Bereich | Umsetzung |
|---|---|
| Seiten | 113 vorgerenderte Seiten: Startseite, 11 Kursseiten, Standort-, Anmelde- und Anfahrtsseiten München/Hamburg, Termine, Kursübersicht mit Filter, Kursfinder, FAQ, Kontakt, Gutschein, Videothek, Galerie, Kundenstimmen, 45 Ratgeber-Seiten, 29 Glossar-Einträge, Rechtstexte |
| HTML first | Alle Inhalte werden serverseitig gerendert. Kalender, Filter und Buchungsweg sind zusätzlich interaktiv, ohne JavaScript aber vollständig lesbar und bedienbar |
| Terminkalender | Monatskalender mit markierten Kurstagen, Filter nach Standort/Verfahren/Niveau/freien Plätzen, Liste mit Live-Platzanzeige (Aktualisierung jede Minute über `/api/termine/`) |
| Buchung | 5 Schritte: Teilnehmerzahl → Rechnung (Privat/Firma) → Teilnehmer (identisch/abweichend) → Zahlung (PayPal/Vorkasse) → Prüfen & „Zahlungspflichtig buchen“. AGB, Datenschutz, Widerrufsbelehrung, ausdrückliches Verlangen auf vorzeitigen Beginn (§ 356 Abs. 4, § 357a Abs. 2 BGB) |
| Widerruf | Elektronische Widerrufsfunktion „Vertrag widerrufen“ nach § 356a BGB (seit 19.06.2026 Pflicht) unter `/vertrag-widerrufen/` |
| Backend | `/admin/muenchen/` und `/admin/hamburg/` mit getrennten Zugängen: Termine anlegen (auch als Serie), Plätze/Preis/Status ändern, kopieren, absagen; Teilnehmerlisten; Buchungsstatus; Anfragen/Warteliste; CSV-Export |
| Synchronisation | Jede Änderung im Backend und jede Buchung validiert das Frontend sofort neu (`revalidatePath`) |
| E-Mail | Buchungsbestätigung inkl. Widerrufsbelehrung und Muster-Widerrufsformular an Kunden, Benachrichtigung ans Team (SMTP) |
| SEO / GEO | JSON-LD (Organization, LocalBusiness, Course + CourseInstance, EducationEvent, FAQPage, Article, DefinedTerm, BreadcrumbList, VideoObject), Sitemap, robots.txt mit KI-Crawlern, `llms.txt`, kanonische URLs, interne Verlinkung |
| Motion Design | 23 animierte SVG-Grafiken (Verfahren MAG/WIG/E/Alu/Autogen/Löten/Impuls/Prüfung, Buchungsablauf, Kurstag, Standorte, Lernpfad, Nahtformen, Brennerhaltung, Schutzgas, Gasflaschen, Positionen, Gültigkeit) – nur `transform`, `opacity`, `stroke-dashoffset`, pausieren außerhalb des Sichtfelds, aus bei `prefers-reduced-motion` |
| UI | Schwebende Leisten wie merklemuc.github.io/merkle: Google-Bewertung links, Aktionsleiste mittig, Kontaktkarte mit den Kursansprechpartnern rechts |
| Qualität | axe-core WCAG 2.2 AA: 0 Verstöße (11 Stichproben × 375/1440 px); interner Link-Crawl: 0 Fehler |

## Umgebungsvariablen

Siehe [`.env.example`](.env.example). Pflicht in Produktion:

| Variable | Zweck |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.schweisskurse-merkle.de` |
| `DATA_DIR` | Verzeichnis der SQLite-Datei – **muss Deployments überdauern** |
| `ADMIN_PASSWORD_MUENCHEN`, `ADMIN_PASSWORD_HAMBURG` | Zugänge zum Backend. Ohne Wert ist der Login gesperrt |
| `ADMIN_SESSION_SECRET` | Zufallswert zum Signieren der Sitzungen (`openssl rand -hex 32`) |
| `SMTP_*`, `MAIL_*` | E-Mail-Versand. Ohne SMTP wird nur protokolliert |
| `PAYPAL_ME_HANDLE` | PayPal.me-Name für den Zahlungslink |
| `BANK_*` | Bankverbindung für Vorkasse |

Im Entwicklungsmodus (`npm run dev`) gelten ohne gesetzte Passwörter `muenchen-demo` bzw. `hamburg-demo`.

## Backend bedienen

1. `https://…/admin/` aufrufen, Standort wählen, mit dem Standort-Passwort anmelden.
2. **Neuen Termin anlegen:** Kurs, Datum, Uhrzeit, Plätze, Preis. Für Reihen „Serie: Anzahl Termine“ und „Abstand in Tagen“ setzen (z. B. 6 × alle 7 Tage).
3. **Plätze ändern:** In der Tabelle „Plätze gesamt“ oder „Extern vergeben“ (telefonische Buchungen, Gutscheine) ändern → *Speichern*. Freie Plätze = gesamt − extern − online gebucht.
4. **Status:** *Entwurf* (unsichtbar), *aktiv* (buchbar), *abgesagt*. Termine mit Buchungen werden beim Löschen automatisch abgesagt statt gelöscht.
5. **Buchungen:** Zahlungseingang auf *bezahlt* setzen; *storniert* oder *widerrufen* geben die Plätze frei.
6. **Export:** Termine, Buchungen und Teilnehmerlisten als CSV (Excel-kompatibel, Semikolon).

Die Seed-Daten (zuletzt veröffentlichte Münchner Termine Okt./Nov. 2026) werden nur bei leerer Datenbank angelegt; abschalten mit `SEED_TERMINE=false`.

## Inhalte pflegen

| Was | Wo |
|---|---|
| Kurse (Texte, Preise, Ablauf, Voraussetzungen) | `src/lib/courses.ts` |
| Standorte, Telefon, Dozenten, Kontaktkarte, Videos | `src/lib/site.ts` |
| FAQ | `src/lib/faq.ts` |
| Bewertungen | `src/lib/reviews.ts` (nur echte, wörtliche Stimmen) |
| Ratgeber / Glossar | `src/lib/ratgeber/*.ts` |
| Rechtstexte | `src/lib/legal.ts`, `src/lib/legal-pages.ts` |
| Navigation | `src/lib/nav.ts` |
| Bilder | `public/images/…` (Next.js liefert automatisch AVIF/WebP in passenden Größen) |

### Originaltexte der Altseite übernehmen

```bash
npm run import:wp           # holt alle Seiten über die WordPress-REST-API
npm run build && npm start
npm run check:urls          # prüft jede alte URL gegen den Neubau (200/301)
```

`import:wp` legt je Seite eine Datei in `content/wp/` ab. Ratgeber-Seiten zeigen dann
automatisch den **Originalwortlaut** statt der neu formulierten Fassung (Grafiken, Meta-Daten
und Verlinkung bleiben). `content/wp-import/urls.json` enthält danach das vollständige
URL-Inventar der Altseite.

## Deployment

Die Anwendung braucht einen Node-Prozess und ein beschreibbares, dauerhaftes Verzeichnis
(`DATA_DIR`) – z. B. ein vServer, Docker auf einem Server, Render, Railway oder Fly.io mit Volume.

```bash
docker build -t schweisskurse .
docker run -p 3000:3000 -v /srv/schweisskurse-data:/app/data --env-file .env schweisskurse
```

Rein serverlose Plattformen (z. B. Vercel) haben kein dauerhaftes Dateisystem; dort müsste
`src/lib/db.ts` auf eine gehostete Datenbank (Postgres/Turso) umgestellt werden.

Backups: Die Datei `${DATA_DIR}/schweisskurse.db` regelmäßig sichern (z. B. nächtlich per `sqlite3 … ".backup …"`).

## Struktur

```
src/
  app/(site)/            öffentliche Seiten (Header, Footer, schwebende Leisten)
    [slug]/              Kursseiten (Slug = bisherige URL)
    ratgeber/[[...path]] Ratgeber, unbekannte Alt-URLs → 301 auf nächste Elternseite
    glossary/[term]/     Glossar, unbekannte Begriffe → 301 auf Glossar
    buchen/              Buchungsweg + Bestätigung (noindex)
  app/admin/             Mitarbeiter-Backend
  app/api/termine/       öffentliche Terminliste für Live-Aktualisierung
  app/llms.txt, sitemap.ts, robots.ts
  components/            UI, Visuals (Motion Design), Kalender, Formulare
  lib/                   Daten, Datenbank, Auth, Schema.org, Rechtstexte
scripts/                 WordPress-Import, URL-Prüfung
docs/                    Designsystem, Konzept, URL-Mapping, TODO
```
