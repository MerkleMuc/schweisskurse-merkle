# Übergabe-Prompt: Designsystem Merkle

Dieser Text ist dafür gemacht, **vollständig in eine neue Session kopiert** zu
werden. Er beschreibt ausschließlich das Erscheinungsbild und das Verhalten der
Oberfläche — keine Inhalte, keine Texte, keine Seitenstruktur. Alles darin ist
aus der gebauten Seite abgelesen, nicht aus einem Briefing abgeschrieben.

---

## Der Prompt

> Baue die Oberfläche nach dem folgenden Designsystem. Es ist verbindlich: Wo
> nichts anderes dasteht, gilt das Beschriebene. Erfinde keine zusätzlichen
> Farben, Radien, Schattenstufen oder Schriftgrade.

### 1. Haltung

Technischer Fachhandel, kein Lifestyle. Das Bild ist **kantig, hell und ruhig**,
mit viel Weißraum und wenigen, dafür großen Gesten. Tiefe entsteht durch
Flächenabstufung, Verläufe und weiche Schatten — nie durch Rahmen oder Linien um
alles herum. Der Eindruck soll sein: aufgeräumte Werkstatt, nicht Agenturbüro.

Drei Regeln, die alles andere überstimmen:

1. **Rund ist nur, was man anklickt.** Flächen, Karten, Bilder und Abschnitte
   haben Radius 0. Schaltflächen, Chips und die schwebenden Leisten sind
   vollrund (Pille). Dazwischen gibt es nichts.
2. **Türkis ist Dekoration, nicht Text.** Das helle Markenblau erreicht auf Weiß
   nur 2,6:1. Als Schriftfarbe oder für Flächen mit weißer Schrift kommt
   ausschließlich die tiefe Variante zum Einsatz.
3. **Ein Signalton je Seite.** Die warme Akzentfarbe darf höchstens einmal
   auftauchen. Sonst verliert sie ihre Wirkung.

### 2. Farben

```css
/* Marke */
--teal:        #21B2BA;  /* nur Dekoration: Linien, Glows, Icons auf Dunkel */
--teal-mid:    #15737F;  /* Flächen mit weißer Schrift */
--teal-deep:   #116173;  /* Text, Links, aktive Zustände */
--teal-light:  #5BD8DF;  /* Akzente auf dunklem Grund */
--teal-wash:   #E9F7F8;  /* sehr leise Hinterlegung */

/* Flächen, Stufe 0 bis 3 */
--s0: #FFFFFF;  --s1: #F8FAFB;  --s2: #F2F5F6;  --s3: #ECEFF1;
--dark: #111827;  --dark-2: #1B2434;  --dark-3: #2A3547;

/* Schrift */
--ink:    #151719;   /* Überschriften, kräftiger Fließtext */
--ink-2:  #343A3F;   /* normaler Fließtext */
--muted:  #697077;   /* Beiwerk, Bildunterschriften, Kicker */
--on-dark:   #FFFFFF;
--on-dark-2: #C3CCD8;
--on-dark-3: #93A0B0;

/* Linien — immer transparent, nie Volltonfarbe */
--line:      rgba(20,30,35,.06);
--line-2:    rgba(20,30,35,.10);
--line-dark: rgba(255,255,255,.10);

/* Signal, höchstens einmal je Seite */
--ember: #B0682C;
```

**Verläufe.** Vier Stück, mehr nicht:

```css
--grad:      linear-gradient(135deg, #15737F 0%, #116173 100%);  /* Flächen */
--grad-deco: linear-gradient(135deg, #21B2BA 0%, #116173 100%);  /* Zierlinien, Punkte */
--grad-line: linear-gradient(90deg, #21B2BA 0%, #116173 55%, transparent 100%);
--grad-sheen:linear-gradient(105deg, transparent 32%, rgba(255,255,255,.52) 48%, transparent 64%);
```

**Tiefe ohne Bild.** Große Flächen bekommen zwei versetzte Farbwolken als
Hintergrund, nie ein Foto als Textur:

```css
--mesh-light: radial-gradient(60% 55% at 12% 8%,  rgba(33,178,186,.10), transparent 60%),
              radial-gradient(55% 50% at 92% 72%, rgba(17,97,115,.09),  transparent 62%);
--mesh-dark:  radial-gradient(55% 50% at 85% 6%,  rgba(33,178,186,.20), transparent 64%),
              radial-gradient(50% 45% at 6% 92%,  rgba(91,216,223,.12), transparent 60%);
```

**Glas** nur für Schwebendes — Kopfzeile im gescrollten Zustand, Leisten,
Kontaktkarte. Nie für Inhalt, der mitscrollt:

```css
--glass:      rgba(255,255,255,.68);
--glass-blur: blur(18px) saturate(140%);
--glass-dark: rgba(15,25,30,.58);
```

**Schatten.** Drei Stufen, alle weit und weich, keine harten Kanten:

```css
--sh1: 0 8px 30px  rgba(15,25,30,.05);
--sh2: 0 18px 50px rgba(15,25,30,.09);
--sh3: 0 28px 80px rgba(15,25,30,.14);
```

### 3. Typografie

**Inter**, selbst gehostet, mit einem metrisch passenden Fallback, damit beim
Laden nichts springt. `font-feature-settings: "cv05" 1, "ss03" 1`.

Große Grade stehen **leicht**, kleine Grade kräftig. Das ist der auffälligste
Zug des Systems: eine Überschrift in 5 rem läuft in Gewicht 250, ein Label in
0,75 rem in Gewicht 500.

| Rolle | Größe | Zeilenhöhe | Laufweite | Gewicht |
|---|---|---|---|---|
| Display | `clamp(2.625rem, 6vw, 5.25rem)` | 1.0 | −0.035em | 250 |
| H1 | `clamp(2.25rem, 4.3vw, 3.75rem)` | 1.06 | −0.032em | 250 |
| H2 | `clamp(1.75rem, 2.8vw, 2.75rem)` | 1.14 | −0.028em | 300 |
| H3 | `clamp(1.1875rem, 1.5vw, 1.5rem)` | 1.3 | −0.018em | 450 |
| H4 | 1.0625rem | 1.4 | −0.008em | 500 |
| Lead | `clamp(1.0625rem, 1.25vw, 1.3125rem)` | 1.55 | 0 | 350 |
| Fließtext | 1.0625rem | 1.65 | 0 | 350 |
| Klein | 0.875rem | 1.5 | 0 | 400 |

**Kicker** (das kleine Label über jeder Überschrift) ist ein eigenes Bauteil:
0.75 rem, Gewicht 500, Laufweite +0.16em, Versalien, Farbe `--muted`, davor ein
36 × 2 px Strich im Markenverlauf, Abstand 14 px, darunter 22 px Luft.

**Einzelne Wörter** in einer Überschrift dürfen auf Gewicht 600 und `--ink`
hochgezogen werden. Das ist die einzige erlaubte Hervorhebung in Überschriften —
keine Farbe, keine Kursive, keine Unterstreichung.

**Zeilenlänge** höchstens 68 Zeichen. **Links** im Fließtext in `--teal-deep`,
Unterstreichung 1 px mit 0.18em Abstand, beim Überfahren Wechsel auf `--ink`.

### 4. Raster und Abstände

```css
--container: 1360px;
--gutter:    clamp(20px, 5vw, 64px);
--section-y: clamp(4rem, 8vw, 8rem);
```

Zwölfspaltig. Überschriftenblöcke stehen in 8 Spalten, nie über die volle
Breite. Abschnitte wechseln sich in der Flächenstufe ab: Weiß, dann `--s1` oder
`--s2`, dazwischen gelegentlich ein dunkler Abschnitt oder eine randlose
Bildzäsur. Nie zwei gleich helle Abschnitte hintereinander.

Breakpoints: 640, 768, 1024, 1280. Unter 768 px wird jede mehrspaltige Anordnung
einspaltig, Überlappungen und Drehungen entfallen.

### 5. Bauteile

**Kopfzeile.** Zwei Etagen: eine schmale Servicezeile (40 px) mit
Standortwahl und Beratungsnummer über der Hauptzeile (88 px) mit Logo,
Navigation und Hauptaktion. Fixiert. Über einer dunklen Bühne startet sie
transparent und wird beim Scrollen zu Glas. Die Hauptnavigation trägt **reine
Wortmarken ohne Icons**; Icons gibt es nur im aufklappenden Untermenü und in der
mobilen Navigation.

**Schaltflächen.** Vollrund, Polsterung 14 × 22 px, Gewicht 600. Primär: gefüllt
im Markenverlauf mit weißer Schrift. Sekundär: nur Kontur in `--line-2`. Beim
Überfahren hebt sich die Fläche 1–2 px, beim Drücken sinkt sie auf 0.98.

**Karten und Tabellen.** Radius 0, Hintergrund `--s0`, Kontur `--line`, Schatten
`--sh1`. Beim Überfahren auf `--sh2` und 2 px Anhebung — mehr nicht.

**Schwebende Leisten.** Unten links die Bewertung, unten rechts die
Kontaktkarte, unten mittig eine Aktionsleiste. Alle drei: Glas, vollrund,
erscheinen erst nach dem ersten Bildschirm, 420 ms Einblendung. Die Kontaktkarte
startet **eingeklappt** als kleine Pille mit Portrait und öffnet sich auf Klick.

**Bilder.** Immer `<picture>` mit AVIF, WebP und Rückfall, mit `width`/`height`,
Ladeart `lazy` außer dem ersten Bild. Keine runden Ecken. Produktfreisteller
stehen auf Weiß.

**Logofelder.** Kein Karussell. Festes Raster, alle Logos entsättigt bei 70 %
Deckkraft und auf gleiche Höhe gebracht; die Farbe kommt beim Überfahren zurück.

### 6. Bewegung

```css
--ease:     cubic-bezier(.2,.7,.2,1);
--ease-out: cubic-bezier(.16,1,.3,1);
--fast: 220ms;  --base: 340ms;  --slow: 600ms;  --reveal: 700ms;
```

- **Nur `transform` und `opacity`.** Nie Breite, Höhe, Abstände oder Position.
- **Scroll-Reveal**: 700 ms, 24 px von unten, Staffelung 60–80 ms je Element,
  ausgelöst über `IntersectionObserver` — nie über ein Scroll-Ereignis.
- **Eingänge** laufen mit `ease-out`, Bewegungen auf der Fläche mit
  `ease-in-out`. `ease-in` kommt nicht vor.
- **Keine Dauer über 700 ms** in der Oberfläche. Dekorative Dauerläufe
  (Pulsieren, Fahrzeuge auf der Karte) sind davon ausgenommen.
- **Zeigerreaktionen** nur hinter `@media (hover:hover) and (pointer:fine)`.
- **`prefers-reduced-motion`** schaltet jede Ortsveränderung ab; Ein- und
  Ausblendungen bleiben.
- Alles, was eingeblendet wird, muss **ohne JavaScript sichtbar** sein. Das wird
  geprüft.

### 7. Was es nicht gibt

- Keine abgerundeten Karten, Bilder oder Abschnitte.
- Keine harten, dunklen Schlagschatten.
- Kein Türkis als Schriftfarbe.
- Keine zweite Schriftfamilie, keine Serifen, keine Kursiven.
- Keine Icons in der Hauptnavigation.
- Keine Karussells für Inhalte, die man vergleichen will.
- Kein `transition: all`.
- Keine Bewegung an etwas, das man mehrmals am Tag benutzt.

### 8. Was geprüft wird

Jede Seite muss bestehen:

- **axe-core** bei 375 und 1440 px, WCAG 2.0/2.1/2.2 AA plus Best Practices: null
  Verstöße.
- **Kontrast**: 4,5:1 für Fließtext, 3:1 für große Grade.
- **Struktur**: genau eine H1, keine Lücke in der Überschriftenordnung, `alt` an
  jedem Bild und nie der Dateiname, `width`/`height` überall, Radius innerhalb
  der Skala.
- **Scroll-Reveal** bleibt sichtbar ohne JavaScript, ohne das Skript, ohne
  `IntersectionObserver` und beim Sprung auf einen Anker.
- **Konsole** bleibt leer.

---

## Anwendung

Für ein anderes Unternehmen bleiben Aufbau, Typografie, Radien, Bewegung und
Prüfkriterien unverändert; ausgetauscht werden nur die fünf Markenfarben und das
Logo. Die Regel „Türkis ist Dekoration" wird dann zur Regel für die neue
Markenfarbe: Vor dem Einsetzen den Kontrast auf Weiß messen und bei unter 4,5:1
eine tiefere Variante für Text und gefüllte Flächen anlegen.
