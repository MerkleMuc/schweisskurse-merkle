# Übernommene Originaltexte

`npm run import:wp` legt hier für jede Seite der bisherigen WordPress-Seite
eine HTML-Datei ab (Dateiname = Pfad, `/` durch `__` ersetzt, z. B.
`ratgeber__gase__farben-gasflaschen.html`).

Existiert eine Datei, zeigt die Ratgeber-Seite den **Originaltext** anstelle
der neu formulierten Fassung aus `src/lib/ratgeber/*.ts`. Titel, Meta-Daten,
Grafiken, interne Verlinkung und Kurs-Empfehlung bleiben erhalten.
