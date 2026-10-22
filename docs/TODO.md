# Offene Punkte vor dem Livegang

## Zugänge / Infrastruktur
- [ ] **GitHub:** Claude-GitHub-App für `MerkleMuc/schweisskurse-merkle` freigeben (Push wurde mit 403 abgelehnt).
- [ ] **Netzwerk:** `www.schweisskurse-merkle.de` in der Umgebung freigeben, dann `npm run import:wp` und `npm run check:urls` ausführen. Damit werden die Ratgeber-Texte im Originalwortlaut übernommen und das komplette URL-Inventar geprüft.
- [ ] Hosting mit dauerhaftem `DATA_DIR` einrichten (Docker/vServer), Backups der SQLite-Datei.
- [ ] Umgebungsvariablen setzen: Admin-Passwörter je Standort, `ADMIN_SESSION_SECRET`, SMTP, `PAYPAL_ME_HANDLE`, Bankverbindung.

## Inhalte prüfen (bewusst nicht geraten)
- [ ] Preise für **Löt-Einsteiger-Kurs, MAG Fortgeschritten, Pulse-Arc** (stehen als „Preis siehe Termin“; Preis wird je Termin im Backend gesetzt).
- [ ] Telefon Kursberatung: im Neubau +49 89 897717-28 (laut merkle-muenchen.de); die alte FAQ nannte -12.
- [ ] Hamburg: exakte Geokoordinate Oha 5, Ellerhoop (derzeit Ortsmitte) und Termine für 2027 im Backend anlegen.
- [ ] Zweite Person der Kontaktkarte: Bernd Koliwer (Hamburg) – Portrait nach `public/images/team/bernd-koliwer.jpg` und in `src/lib/site.ts` eintragen, oder andere Person benennen.
- [ ] Kursinhalte, Ablaufzeiten und „Inklusive“-Listen je Kurs fachlich gegenlesen (`src/lib/courses.ts`).
- [ ] Ratgeber-Texte: Neu formulierte Fassung gegen das Original prüfen bzw. per Import ersetzen.
- [ ] Anfahrtstexte München/Hamburg prüfen.

## Bilder
- [ ] Fotos des Kursraums (Google Drive, Ordner „Merkle Schweißtechnik München – Filiale und Mitarbeiter“, `IMG_1196`–`IMG_1212`) sichten und in Galerie, Kursraum-Abschnitt und Kursseiten einsetzen.
- [ ] Portraits der Dozenten (Michael Jäger, Robin Kovacs, Michael Felber, Bernd Koliwer).

## Bewertungen
- [ ] Weitere **kursbezogene** Google-Rezensionen von Merkle Schweißtechnik wörtlich in `src/lib/reviews.ts` übernehmen (bisher belegt: 1 Rezension).
- [ ] Kundenstimmen der alten Seite `/referenzen/` übernehmen (kommen mit dem Import).
- [ ] YouTube: Es wurden keine Erfahrungsvideos ehemaliger Teilnehmer gefunden. Eingebunden sind die drei Merkle-Videos.

## Recht (anwaltlich prüfen lassen)
- [ ] AGB (`src/lib/legal-pages.ts`): Stornoregeln, Ersatzperson, Absage durch Merkle, Gutschein-Gültigkeit.
- [ ] Datenschutzerklärung: Hoster, E-Mail-Dienstleister, ggf. Datenschutzbeauftragter ergänzen.
- [ ] Prüfen, ob Hobbykurse unter § 312g Abs. 2 Nr. 9 BGB (Freizeitbetätigung mit festem Termin, kein Widerrufsrecht) fallen. Der Neubau gewährt vorsorglich das Widerrufsrecht und fragt das Verlangen auf vorzeitigen Beginn ab.
