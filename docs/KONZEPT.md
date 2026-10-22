# Gesamtkonzept Relaunch schweisskurse-merkle.de

Stand: Oktober 2026 · Grundlage: Bestand schweisskurse-merkle.de (WordPress), Designsystem `docs/DESIGN-PROMPT.md`,
Referenz-UI merklemuc.github.io/merkle

---

## 1. Ziele

1. **Mehr Buchungen** – jede Seite führt in höchstens zwei Klicks zu einem buchbaren Termin.
2. **Kein Traffic-Verlust** – jede bisherige URL bleibt erreichbar (200) oder leitet per 301 sinnvoll weiter. Der Ratgeber bringt den meisten organischen Traffic und bleibt vollständig unter seinen Adressen.
3. **Sichtbarkeit in Suchmaschinen und KI-Antworten (SEO + GEO)** – vollständiges HTML, strukturierte Daten, klare Fakten (Preis, Dauer, Ort, Termin) in maschinenlesbarer Form.
4. **Weniger Verwaltungsaufwand** – Termine und Plätze pflegt das Team selbst, getrennt nach München und Hamburg; die Website ist sofort aktuell.
5. **Rechtssicherer Buchungsweg** wie in einem Onlineshop.
6. **Erscheinungsbild** nach Merkle-Designsystem: technisch, hell, ruhig, kantig – mit Bewegung, die Verfahren erklärt statt zu dekorieren.

## 2. Informationsarchitektur

```
Startseite
├── Schweißkurse (Mega-Menü)
│   ├── Einsteiger: MIG/MAG · WIG · E-Hand · Autogen · Gasschweißen & Flammlöten · Löten
│   ├── Aufbau & Fortgeschritten: Alu-WIG · MAG Fortgeschritten · Pulse-Arc · Übersicht Aufbaukurse
│   ├── Prüfung & Hamburg: Lehrgang mit TÜV-Prüfung · Allgemeiner Schweißkurs Hamburg
│   └── Lerninhalte · Gutschein · Gesamtübersicht mit Filter · Kursfinder
├── Termine & Anmeldung (Kalender + Filter, alle Standorte)
├── Standorte
│   ├── München-Freiham: Region · Anmeldung · Anfahrt
│   └── Region Hamburg (Ellerhoop): Region · Anmeldung · Anfahrt
├── Ratgeber (45 Seiten, unveränderte URLs)
│   ├── Schweißverfahren (MIG/MAG, WIG, Elektrode, Autogen)
│   ├── Schweißanleitung (Videos, Nahtformen, Haltung, Punkt/Intervall)
│   ├── Gase (Aufgaben, Gassorten, Gaswahl je Verfahren, Flaschenfarben)
│   ├── Metall (Stahl, Edelstahl, Aluminium, NE-Metalle)
│   ├── Zubehör (Geräte, Schutzkleidung, Schutzgase)
│   └── Glossar A–Z (29 Begriffe unter /glossary/…)
├── Über uns: Wir über uns · Kundenstimmen · Galerie · FAQ · Videothek
├── Kontakt
└── Rechtliches: Impressum · Datenschutz · AGB · Widerrufsbelehrung · Vertrag widerrufen
```

Prinzip: **drei Einstiege, ein Ziel.** Nutzer kommen über ein Verfahren (Kursseite), einen Ort (Standortseite) oder eine Frage (Ratgeber). Alle drei Wege enden im Terminkalender.

## 3. Seitenvorlagen – vereinheitlicht

Jede Seite folgt einer von sechs Vorlagen. Wiederkehrende Bausteine sind identisch gestaltet und an derselben Stelle.

### 3.1 Kursseite (11 ×, `/[kurs]/`)
| Reihenfolge | Baustein | Zweck |
|---|---|---|
| 1 | Dunkle Bühne mit Kursbild, H1, Lead, Chips (Dauer, Gruppe, Ort), **animierte Verfahrensgrafik** | Sofort verstehen, was passiert |
| 2 | Steckbrief: Preis · Dauer · Uhrzeit · Gruppe · Voraussetzung · Abschluss | Alle Kauffakten auf einen Blick (auch für KI-Antworten) |
| 3 | „Was Sie lernen“ + Inklusive-Karte mit CTA | Nutzen |
| 4 | **Terminkalender des Kurses** mit Live-Plätzen | Conversion |
| 5 | Ablauf (Zeitleiste + Kurstag-Uhr + Theorie/Praxis-Ring), Voraussetzungen, Sicherheitshinweise | Einwände abbauen |
| 6 | Fachgrafiken je Verfahren + passende Ratgeber-Artikel | Kompetenz, interne Verlinkung |
| 7 | Kursraum & Dozenten | Vertrauen |
| 8 | Bewertungen + Video | Social Proof |
| 9 | FAQ (kursbezogen + allgemein, FAQPage-Schema) | Einwände, Rich Results |
| 10 | Buchungsablauf + verwandte Kurse | Cross-Selling |
| 11 | CTA-Band mit nächstem freien Termin | Abschluss |

### 3.2 Standortseite (`/region-muenchen/`, `/region-hamburg/`)
Bühne mit Standortkarte → **Vorteile des Standorts** (6 bzw. 4 Karten) → Kalender des Standorts → Kursangebot → Ablauf & Voraussetzungen → (München: Kurzübersicht Filiale mit Bildmosaik, Öffnungszeiten) → Kursraum & Dozenten → Anfahrt mit Karte (Zwei-Klick-Lösung) → Bewertungen & Videos (München) → Buchungsablauf → FAQ → CTA.

### 3.3 Termin- und Anmeldeseiten
Kopf mit Direktwahl → Kalender + Filter + Liste → Buchungsablauf in 5 Schritten → Storno-Hinweis → FAQ Buchung & Zahlung.

### 3.4 Übersichts- und Infoseiten
Kursübersicht mit **Filter (Standort, Niveau, Verfahren, nur freie Termine, Sortierung)** und Vergleichstabelle; Kursfinder in drei Fragen; Lerninhalte; FAQ nach Kategorien; Gutschein mit Live-Vorschau; Kundenstimmen; Galerie; Videothek; Wir über uns.

### 3.5 Ratgeber-Artikel (45 ×)
Hero mit Brotkrumen → Text (neu strukturiert oder Originalwortlaut aus dem Import) → einfache Grafiken (animiertes SVG) → Video, falls vorhanden → Seitenleiste: **passender Kurs mit Terminlink**, Kapitelnavigation → verwandte Artikel → CTA.

### 3.6 Rechtstexte
Hero → Inhaltsverzeichnis (sticky) → Text.

## 4. Conversion-Optimierung

| Maßnahme | Wo |
|---|---|
| „Nächster freier Termin“ als Karte in der Startbühne | Startseite |
| Kalender mit Live-Plätzen und Knappheit („Nur noch 2 Plätze“) | Start, Kurs, Standort, Termine |
| Termin anklicken → direkt in den Buchungsweg | überall |
| Schwebende Aktionsleiste „Freie Termine ansehen · Frage stellen · WhatsApp“ (einziger Signalton je Seite) | global |
| Google-Bewertung 4,8 als schwebende Pille | global |
| Kontaktkarte mit den beiden Kursansprechpartnern (eingeklappt, öffnet auf Klick) | global |
| Steckbrief mit allen Kauffakten | Kursseiten |
| Warteliste statt Sackgasse bei ausgebuchten Terminen | Kalender |
| Kursfinder für Unentschlossene | Start, Übersicht |
| Gutschein mit Live-Vorschau | Gutscheinseite, Werbebanner |
| Werbebanner neu: Gutschein, 25 %-Gerätekauf-Rabatt, Inhouse-Kurse | Start |
| Verwandte Kurse und Aufbaupfad (Lernpfad-Grafik) | Kursseiten |
| Ratgeber → „Passender Kurs“ in der Seitenleiste | alle Ratgeber-Seiten |
| Kurzer Buchungsweg: 5 Schritte, Fortschrittsbalken, Zusammenfassung mitlaufend, Fehler direkt am Feld | Buchung |

## 5. Buchungsweg und Rechtliches

1. **Teilnehmerzahl** (begrenzt auf freie Plätze)
2. **Rechnung:** Privatperson oder Firma (Firmenname, USt-IdNr.), Anschrift, E-Mail, Telefon
3. **Teilnehmer:** Schalter „Rechnungsempfänger und Teilnehmer sind identisch“ (bei Firma standardmäßig aus); je Person Name, Schweißerfahrung; bei Prüfungslehrgängen Geburtsdatum
4. **Zahlung:** PayPal oder Vorkasse – Zahlung erfolgt **nach** dem Absenden
5. **Prüfen & buchen:** Zusammenfassung mit „Ändern“-Links, Pflicht-Checkboxen, Hinweis auf Zahlungspflicht, Schaltfläche **„Zahlungspflichtig buchen“** (§ 312j Abs. 3 BGB)

Pflichtfelder (Verbraucher):
- AGB gelesen und akzeptiert
- Datenschutzhinweise zur Kenntnis genommen
- Widerrufsbelehrung inkl. Muster-Widerrufsformular zur Kenntnis genommen
- **„Ausdrückliches Verlangen auf vorzeitigen Beginn der Dienstleistung und Kenntnisnahme vom Erlöschen des Widerrufsrechts“** (§ 356 Abs. 4, § 357a Abs. 2 BGB) – das ist die korrekte Bezeichnung für die gewünschte Bestätigung, dass das Widerrufsrecht bei Leistungserbringung erlischt.

Bei Firmen entfallen die beiden Widerrufs-Checkboxen (kein Widerrufsrecht für Unternehmer). Zustimmungen werden mit Zeitstempel und Textversion gespeichert. Die Bestätigungs-E-Mail enthält Vertragsdaten, Widerrufsbelehrung, Muster-Formular und die abgegebene Erklärung (Bestätigung auf dauerhaftem Datenträger). Zusätzlich gibt es die seit 19.06.2026 vorgeschriebene **elektronische Widerrufsfunktion „Vertrag widerrufen“** (§ 356a BGB) mit Eingangsbestätigung.

## 6. SEO

- **Vollständiges HTML** für alle Inhalte (Next.js App Router, statisch vorgerendert, alle 5 Minuten bzw. bei jeder Backend-Änderung neu validiert).
- **Alle Alt-URLs erhalten**, Schrägstrich am Ende wie bisher; gezielte 301-Weiterleitungen (siehe `URL-MAPPING.md`); unbekannte Ratgeber- und Glossar-URLs werden auf die nächste Elternseite umgeleitet statt 404.
- **Title/Description** je Seite einzeln mit Keyword, Ort und Preis („Schweißkurs München“, „WIG Schweißkurs“, „Schweißkurs Hamburg“).
- **Kanonische URLs**, Sitemap mit Prioritäten, robots.txt (Buchung/Backend gesperrt).
- **Strukturierte Daten:** Organization/EducationalOrganization, LocalBusiness je Standort (Geo, Öffnungszeiten, AggregateRating), Course + CourseInstance mit Angebot je Termin, EducationEvent je Termin, FAQPage, Article, DefinedTermSet, BreadcrumbList, VideoObject, ItemList.
- **Interne Verlinkung:** Mega-Menü, Footer mit 30 Links, Ratgeber ↔ Kurs in beide Richtungen, verwandte Artikel, Glossar ↔ Ratgeber, Brotkrumen überall.
- **Lokale Signale:** Adressen, Einzugsgebiet (Städte im Umkreis), Anfahrtsseiten, Karten, Geo-Meta.
- **Performance:** selbst gehostete Schrift mit metrischem Fallback, Bilder automatisch AVIF/WebP mit width/height, YouTube und Google Maps erst nach Klick, keine Tracking-Skripte.

## 7. GEO (Generative Engine Optimization)

- `/llms.txt` mit allen Kursen, Preisen, Standorten, nächsten Terminen, FAQ und Ratgeber-Index – automatisch aktuell.
- KI-Crawler (GPTBot, ClaudeBot, PerplexityBot, Google-Extended …) ausdrücklich zugelassen.
- Faktenblöcke in klaren Sätzen („Der MAG-Einsteigerkurs kostet 415 € und dauert einen Tag“) und Tabellen statt Fließtext-Verstecken.
- FAQ als Frage-Antwort-Paare mit Schema.

## 8. Motion Design

23 animierte SVG-Grafiken, alle in Markenfarben, ohne Bilddateien:
Verfahren (MAG, WIG, Elektrode, Alu-Wechselstrom, Autogen, Löten, Impuls, Prüfungsweg, Kombikurs), Hero-Lichtbogen, Theorie/Praxis-Ring, Kurstag-Uhr, Buchungsablauf, Standortkarte, Lernpfad, Werkstoff-Matrix, Nahtformen, Brennerhaltung, Schutzgasglocke, Gasflaschen, Schweißpositionen, Gültigkeit Schweißerpass, Plätze-Anzeige.
Regeln aus dem Designsystem: nur `transform`/`opacity`, Einblendung 700 ms per IntersectionObserver, Pause außerhalb des Sichtfelds, aus bei reduzierter Bewegung, ohne JavaScript sichtbar.

## 9. Backend

Je Standort ein eigener Zugang (`/admin/muenchen/`, `/admin/hamburg/`). Funktionen: Termine anlegen (einzeln oder als Serie), Plätze gesamt / extern vergeben / Status direkt in der Tabelle ändern, Details bearbeiten, kopieren, absagen; Teilnehmerliste je Termin; Buchungsstatus (neu, bezahlt, storniert, widerrufen); Anfragen und Warteliste; Widerrufe; CSV-Export. Jede Änderung ist sofort auf der Website sichtbar.

## 10. Ausbau (Vorschläge)

| Priorität | Maßnahme |
|---|---|
| hoch | Originaltexte per `npm run import:wp` übernehmen, sobald der Server die Altseite erreicht |
| hoch | Fotos des Kursraums (Drive: „IMG_1196–1212“) einbinden, Portrait Bernd Koliwer |
| hoch | Weitere echte Kursbewertungen aus Google und der alten Seite „Kundenstimmen“ übernehmen |
| mittel | PayPal Checkout per API (automatischer Zahlungsabgleich statt PayPal.me) |
| mittel | Automatische Rechnung als PDF aus dem Backend |
| mittel | Erinnerungs-E-Mail 3 Tage vor Kursbeginn mit Anfahrt |
| mittel | Bewertungsanfrage nach dem Kurs (Google-Link) – stärkt das Profil |
| niedrig | Mehrsprachigkeit (EN) für internationale Teilnehmer |
| niedrig | Ratgeber-Ausbau: Schweißfehler, Schweißpositionen, Kaufberatung Schweißgerät (Bilder in Drive „Merkle Blog Assets“) |
