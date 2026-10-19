import type { RatgeberSeite } from './types';

export const GASE: RatgeberSeite[] = [
  {
    path: '/ratgeber/gase/',
    title: 'Gase zum Schweißen – Schutzgase, Gassorten, Flaschenfarben',
    h1: 'Gase',
    description: 'Gase beim Schweißen: Aufgaben des Schutzgases, Gassorten wie Argon, Helium und CO₂, welches Gas zu MIG, MAG und WIG passt und wie Gasflaschen gekennzeichnet sind.',
    kicker: 'Ratgeber Gase',
    lead: 'Welches Gas eignet sich für welches Verfahren? Hier finden Sie die Aufgaben der Schutzgase, die wichtigsten Gassorten und die Kennzeichnung der Flaschen.',
    sections: [
      { h: 'Kapitel', html: '<ul><li><a href="/ratgeber/gase/aufgaben-und-auswirkungen-des-schutzgases/">Aufgaben und Auswirkungen des Schutzgases</a></li><li><a href="/ratgeber/gase/gassorten/">Gassorten</a> – <a href="/ratgeber/gase/gassorten/argon/">Argon</a>, <a href="/ratgeber/gase/gassorten/helium/">Helium</a></li><li><a href="/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mig-schweissen/">Welches Schutzgas zum MIG-Schweißen?</a></li><li><a href="/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mag-schweissen/">Welches Schutzgas zum MAG-Schweißen?</a></li><li><a href="/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-wig-schweissen/">Welches Schutzgas zum WIG-Schweißen?</a></li><li><a href="/ratgeber/gase/farben-gasflaschen/">Farben und Kennzeichnungen von Gasflaschen</a></li></ul>' },
      { h: 'Gase bei Merkle', html: '<p>Schweiß- und Industriegase erhalten Sie im Ladengeschäft von Merkle Schweißtechnik in München-Freiham – mit Flaschentausch vor Ort. Mehr auf <a href="https://www.merkle-muenchen.de/gas/" rel="noopener">merkle-muenchen.de</a>.</p>' }
    ],
    viz: ['shield', 'bottles']
  },
  {
    path: '/ratgeber/gase/aufgaben-und-auswirkungen-des-schutzgases/',
    title: 'Aufgaben und Auswirkungen des Schutzgases',
    h1: 'Aufgaben und Auswirkungen des Schutzgases',
    description: 'Was macht das Schutzgas beim Schweißen? Abschirmung gegen Luft, Einfluss auf Lichtbogenstabilität, Tropfenübergang, Einbrand und Nahtbild.',
    kicker: 'Gase',
    lead: 'Das Schutzgas schirmt Lichtbogen und Schmelzbad gegen die Atmosphäre ab. Daneben beeinflusst es Tropfenübergang, Lichtbogenstabilität, Einbrand und Nahtaussehen.',
    sections: [
      { h: 'Schutz vor der Luft', html: '<p>Sauerstoff, Stickstoff und Feuchtigkeit aus der Luft würden das flüssige Metall oxidieren, verspröden oder Poren bilden. Das Schutzgas verdrängt die Luft aus dem Bereich der Schweißstelle.</p>' },
      { h: 'Einfluss auf den Prozess', html: '<ul><li><b>Lichtbogenstabilität</b> – Argon zündet leicht und brennt ruhig.</li><li><b>Einbrand</b> – CO₂ und Helium erhöhen die Wärmeeinbringung und den Einbrand.</li><li><b>Tropfenübergang</b> – argonreiche Gemische ermöglichen einen feinen, spritzerarmen Übergang.</li><li><b>Nahtbild</b> – Oxidationsgrad und Benetzung beeinflussen das Aussehen der Naht.</li></ul>' }
    ],
    viz: ['shield'],
    related: ['/ratgeber/schweisszubehoer/schutzgase-aktive-und-inerte-schutzgase/']
  },
  {
    path: '/ratgeber/gase/gassorten/',
    title: 'Gassorten zum Schweißen – Argon, Helium, CO₂, Stickstoff',
    h1: 'Gassorten',
    description: 'Die gängigsten Schweißgase: Argon, Helium, CO₂, Stickstoff, Gemische sowie Acetylen und Sauerstoff für das Autogenschweißen.',
    kicker: 'Gase',
    lead: 'Die gängigsten Schweißgase sind Argon, Helium, Kohlendioxid, Stickstoff und deren Gemische. Beim Autogenschweißen verbrennt man meist Acetylen mit Sauerstoff – mit einer Flammentemperatur von 3.200 °C.',
    sections: [
      { h: 'Inerte Gase', html: '<p><a href="/ratgeber/gase/gassorten/argon/">Argon</a> und <a href="/ratgeber/gase/gassorten/helium/">Helium</a> reagieren nicht mit dem Schmelzbad. Sie werden beim WIG- und MIG-Schweißen eingesetzt.</p>' },
      { h: 'Aktive Gase', html: '<p>CO₂ und Sauerstoff nehmen am Schweißprozess teil. Sie werden – meist im Gemisch mit Argon – beim MAG-Schweißen von Stahl verwendet.</p>' },
      { h: 'Formiergas', html: '<p>Formiergas ist ein Wurzelschutzgas aus inerten und wasserstoffhaltigen bzw. stickstoffhaltigen Bestandteilen. Es schützt die Nahtwurzel – etwa bei Edelstahlrohren – vor Oxidation. <a href="/glossary/formiergas/">Glossar: Formiergas</a></p>' }
    ],
    viz: ['bottles']
  },
  {
    path: '/ratgeber/gase/gassorten/argon/',
    title: 'Argon Gas – eine Übersicht',
    h1: 'Argon Gas – eine Übersicht',
    description: 'Argon beim Schweißen: inertes Schutzgas für WIG und MIG, rein oder als Gemisch mit Helium – günstig, weil es aus der Luft gewonnen wird.',
    kicker: 'Gassorten',
    lead: 'Argon ist das wichtigste inerte Schutzgas. Es wird entweder rein oder als Gemisch mit Helium beim MIG- und WIG-Schweißen verwendet.',
    sections: [
      { h: 'Eigenschaften', html: '<p>Argon ist ein Edelgas, farb- und geruchlos und schwerer als Luft. Es ist günstiger als andere Edelgase, weil es aus der Luft gewonnen wird, in der es zu knapp einem Prozent enthalten ist.</p>' },
      { h: 'Einsatz', html: '<ul><li>WIG-Schweißen aller Werkstoffe – reines Argon 4.6 ist Standard</li><li>MIG-Schweißen von Aluminium</li><li>Basisgas für MAG-Mischgase (Argon/CO₂, Argon/O₂)</li></ul>' },
      { h: 'Sicherheit', html: '<p>Argon verdrängt Sauerstoff. In engen, schlecht belüfteten Räumen besteht Erstickungsgefahr – auf gute Belüftung achten.</p>' }
    ],
    viz: ['shield'],
    kurs: 'wig-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/gase/gassorten/helium/',
    title: 'Helium Gas – eine Übersicht',
    h1: 'Helium Gas – eine Übersicht',
    description: 'Helium beim Schweißen: inertes Schutzgas mit hoher Wärmeleitfähigkeit für tieferen Einbrand, vor allem bei Aluminium und Kupfer.',
    kicker: 'Gassorten',
    lead: 'Helium ist wie Argon ein inertes Gas, leitet Wärme aber deutlich besser. Das sorgt für einen breiteren, tieferen Einbrand und höhere Schweißgeschwindigkeiten.',
    sections: [
      { h: 'Wofür Helium?', html: '<p>Helium-Argon-Gemische werden vor allem für dicke Bauteile aus Aluminium und Kupfer eingesetzt, die viel Wärme abführen.</p>' },
      { h: 'Kosten', html: '<p>Helium ist deutlich teurer als Argon, weil es nicht aus der Umgebungsluft gewonnen werden kann, sondern aus Erdgasvorkommen gefördert wird. Da es sehr leicht ist, wird zudem eine höhere Durchflussmenge benötigt.</p>' }
    ],
    viz: ['shield']
  },
  {
    path: '/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mig-schweissen/',
    title: 'Welches Schweißschutzgas brauche ich zum MIG-Schweißen?',
    h1: 'Welches Schweißschutzgas brauche ich zum MIG-Schweißen?',
    description: 'Schutzgas zum MIG-Schweißen: inerte Gase wie Argon, Helium oder deren Gemische – für Aluminium, Kupfer und Nickel.',
    kicker: 'Gase',
    lead: 'Beim MIG-Schweißen werden ausschließlich inerte (also inaktive) Gase verwendet wie Helium, Argon oder deren Gemische.',
    sections: [
      { h: 'Empfehlung nach Werkstoff', html: '<table><thead><tr><th>Werkstoff</th><th>Schutzgas</th></tr></thead><tbody><tr><td>Aluminium, dünn</td><td>Argon (I1)</td></tr><tr><td>Aluminium, dick</td><td>Argon/Helium (I3)</td></tr><tr><td>Kupfer</td><td>Argon/Helium</td></tr><tr><td>Nickel und Legierungen</td><td>Argon, Argon/Helium</td></tr></tbody></table>' },
      { h: 'Warum inert?', html: '<p>Inerte Gase reagieren weder mit der Elektrode noch mit dem Schmelzbad und halten die Luft von der Schweißstelle fern. Für Nichteisenmetalle ist das entscheidend, weil sie mit Sauerstoff sofort Oxide bilden.</p>' }
    ],
    viz: ['shield'],
    related: ['/ratgeber/metall/aluminium-schweissen-alu-schweissen/']
  },
  {
    path: '/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mag-schweissen/',
    title: 'Welches Schweißschutzgas brauche ich zum MAG-Schweißen?',
    h1: 'Welches Schweißschutzgas brauche ich zum MAG-Schweißen?',
    description: 'Schutzgas zum MAG-Schweißen: aktive Gase aus Argon, CO₂ und/oder Sauerstoff. Mischgas für Baustahl und Edelstahl richtig wählen.',
    kicker: 'Gase',
    lead: 'Das Gas beim MAG-Schweißen ist aktiv: Es mischt Argon mit CO₂ und/oder Sauerstoff. MAG gehört zu den am weitesten verbreiteten Fügeverfahren überhaupt.',
    sections: [
      { h: 'Empfehlung nach Werkstoff', html: '<table><thead><tr><th>Werkstoff</th><th>Schutzgas</th></tr></thead><tbody><tr><td>Unlegierter Baustahl</td><td>Argon + 8–18 % CO₂ (z. B. „Mischgas 18“) oder reines CO₂</td></tr><tr><td>Edelstahl (hochlegiert)</td><td>Argon + ca. 2 % CO₂ oder O₂ (z. B. „Mischgas 2“)</td></tr></tbody></table><p>Die Handelsnamen unterscheiden sich je nach Gaslieferant – lassen Sie sich im Fachhandel beraten.</p>' },
      { h: 'Achtung bei Edelstahl', html: '<p>Wird hochlegiertes Material mit einem CO₂-reichen Mischgas geschweißt, rostet die Naht mit hoher Wahrscheinlichkeit.</p>' }
    ],
    viz: ['shield', 'mag'],
    kurs: 'mig-mag-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-wig-schweissen/',
    title: 'Welches Schweißschutzgas brauche ich zum WIG-Schweißen?',
    h1: 'Welches Schweißschutzgas brauche ich zum WIG-Schweißen?',
    description: 'Schutzgas zum WIG-Schweißen: reines Argon 4.6 als Standard für Stahl, Edelstahl und Aluminium, Argon/Helium für dicke Bauteile.',
    kicker: 'Gase',
    lead: 'Für die gängigen Zusatzwerkstoffe ist reines Argon 4.6 das Standard-Schutzgas beim WIG-Schweißen.',
    sections: [
      { h: 'Empfehlung', html: '<table><thead><tr><th>Werkstoff</th><th>Schutzgas</th></tr></thead><tbody><tr><td>Stahl, Edelstahl</td><td>Argon 4.6</td></tr><tr><td>Aluminium</td><td>Argon 4.6, bei dicken Teilen Argon/Helium</td></tr><tr><td>Kupfer</td><td>Argon/Helium</td></tr></tbody></table>' },
      { h: 'Wurzelschutz', html: '<p>Bei Edelstahlrohren wird zusätzlich die Rückseite der Naht mit Formiergas oder Argon gespült, damit die Wurzel nicht oxidiert.</p>' }
    ],
    viz: ['wig', 'shield'],
    kurs: 'wig-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/gase/farben-gasflaschen/',
    title: 'Farben & Kennzeichnungen von Gasflaschen (DIN EN 1089-3)',
    h1: 'Farben & Kennzeichnungen von Gasflaschen',
    description: 'Gasflaschen-Farben nach DIN EN 1089-3: Sauerstoff weiß, Acetylen kastanienbraun, Argon dunkelgrün, Argon/CO₂ leuchtendgrün, Stickstoff schwarz, CO₂ grau.',
    kicker: 'Gase',
    lead: 'Die europäische Norm DIN EN 1089-3 regelt die Farbkennzeichnung von Gasflaschen. Sie wurde 1997 eingeführt und ist seit dem 1. Juli 2006 verbindlich.',
    sections: [
      { h: 'Die Farbe sitzt auf der Schulter', html: '<p>Maßgeblich ist die Farbe der <b>Flaschenschulter</b>. Der Flaschenkörper kann je nach Lieferant anders gefärbt sein. Verbindlich für den Inhalt ist immer das <b>Gefahrgutetikett</b>.</p>' },
      { h: 'Die wichtigsten Gase', html: '<table><thead><tr><th>Gas</th><th>Farbe der Schulter</th></tr></thead><tbody><tr><td>Sauerstoff</td><td>weiß (früher blau)</td></tr><tr><td>Acetylen</td><td>kastanienbraun</td></tr><tr><td>Argon</td><td>dunkelgrün</td></tr><tr><td>Argon/CO₂-Gemische, Druckluft</td><td>leuchtendgrün</td></tr><tr><td>Kohlendioxid</td><td>grau</td></tr><tr><td>Stickstoff</td><td>schwarz</td></tr><tr><td>Helium</td><td>braun</td></tr><tr><td>Formiergas (brennbar)</td><td>rot</td></tr></tbody></table>' },
      { h: 'Alte Flaschen', html: '<p>Flaschen mit der alten Kennzeichnung waren noch bis 2016 im Umlauf. Ob wirklich alle umgekennzeichnet wurden, ist fraglich – prüfen Sie im Zweifel das Etikett.</p>' }
    ],
    viz: ['bottles'],
    kurs: 'autogen-einsteiger-schweisskurs'
  }
];

export const METALL: RatgeberSeite[] = [
  {
    path: '/ratgeber/metall/',
    title: 'Metalle schweißen – Stahl, Edelstahl, Aluminium, Kupfer',
    h1: 'Metalle schweißen',
    description: 'Welches Schweißverfahren passt zu welchem Metall? Stahl, rostfreier Stahl, Aluminium, Kupfer, Magnesium, Nickel und Edelmetalle.',
    kicker: 'Ratgeber Metall',
    lead: 'Jeder Werkstoff verhält sich beim Schweißen anders. Ein ganzes Kapitel des Ratgebers widmet sich deshalb dem Schweißen verschiedener Metalle und Legierungen.',
    sections: [
      { h: 'Kapitel', html: '<ul><li><a href="/ratgeber/metall/metalle/">Metalle – Eigenschaften beim Schweißen</a></li><li><a href="/ratgeber/metall/schweissen-mit-stahl/">Schweißen mit Stahl</a></li><li><a href="/ratgeber/metall/schweissen-mit-rostfreiem-stahl/">Schweißen mit rostfreiem Stahl</a></li><li><a href="/ratgeber/metall/aluminium-schweissen-alu-schweissen/">Schweißen mit Aluminium</a></li><li><a href="/ratgeber/metall/schweissen-mit-kupfer-magnesium-nickel-und-edelmetalle/">Kupfer, Magnesium, Nickel und Edelmetalle</a></li></ul>' }
    ],
    viz: ['matrix']
  },
  {
    path: '/ratgeber/metall/metalle/',
    title: 'Metalle – Eigenschaften beim Schweißen',
    h1: 'Metalle: Eigenschaften beim Schweißen',
    description: 'Schmelzpunkt, Wärmeleitfähigkeit, Oxidschicht und Ausdehnung: welche Eigenschaften von Metallen beim Schweißen wichtig sind.',
    kicker: 'Metall',
    lead: 'Ob sich ein Metall gut schweißen lässt, hängt von wenigen Eigenschaften ab: Schmelzpunkt, Wärmeleitfähigkeit, Oxidschicht und Wärmeausdehnung.',
    sections: [
      { h: 'Die wichtigsten Eigenschaften', html: '<ul><li><b>Wärmeleitfähigkeit</b> – Aluminium und Kupfer leiten die Wärme schnell ab und brauchen mehr Energie.</li><li><b>Oxidschicht</b> – die Oxidhaut von Aluminium schmilzt bei über 2.000 °C, das Metall selbst bei rund 660 °C.</li><li><b>Wärmeausdehnung</b> – hohe Ausdehnung bedeutet mehr Verzug.</li><li><b>Kohlenstoffgehalt</b> – bei Stahl entscheidend für Härte und Rissneigung.</li></ul>' }
    ],
    viz: ['matrix'],
    related: ['/ratgeber/metall/schweissen-mit-stahl/', '/ratgeber/metall/aluminium-schweissen-alu-schweissen/']
  },
  {
    path: '/ratgeber/metall/schweissen-mit-stahl/',
    title: 'Schweißen mit Stahl',
    h1: 'Schweißen mit Stahl',
    description: 'Stahl schweißen: Eisenlegierung mit bis zu 2,06 % Kohlenstoff, Abgrenzung zu Gusseisen, geeignete Verfahren und Verzug.',
    kicker: 'Metall',
    lead: 'Stahl ist eine Eisenlegierung mit höchstens etwa 2,06 % Kohlenstoff. Eine Eisenlegierung mit mehr als 2,06 % Kohlenstoff wird als Gusseisen bezeichnet.',
    sections: [
      { h: 'Gut schweißbar', html: '<p>Unlegierte Baustähle mit geringem Kohlenstoffgehalt lassen sich mit allen gängigen Verfahren schweißen – am häufigsten mit MAG. Für große, schwer transportierbare Werkstücke eignet sich das E-Hand-Schweißen wegen der Mobilität der Geräte.</p>' },
      { h: 'Verzug und Risse', html: '<p>Durch die Hitze kann sich der Bereich um die Naht verziehen oder reißen. Gegenmittel: heften, symmetrisch schweißen, in Intervallen arbeiten, bei höherem Kohlenstoffgehalt vorwärmen.</p>' }
    ],
    viz: ['mag', 'matrix'],
    kurs: 'mig-mag-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/metall/schweissen-mit-rostfreiem-stahl/',
    title: 'Schweißen mit rostfreiem Stahl (Edelstahl)',
    h1: 'Schweißen mit rostfreiem Stahl',
    description: 'Edelstahl schweißen: 10–30 % Chrom für Korrosionsbeständigkeit, WIG und MAG, Anlauffarben, Wurzelschutz und Beizen.',
    kicker: 'Metall',
    lead: 'Ein Chromanteil von 10 bis 30 % macht Stahl korrosionsbeständig, häufig ist zusätzlich Nickel enthalten. Beim Schweißen darf diese Schutzwirkung nicht verloren gehen.',
    sections: [
      { h: 'Verfahren', html: '<p>Für sichtbare Nähte an Geländern und Möbeln ist WIG erste Wahl. Für längere Nähte wird MAG mit argonreichem Mischgas (geringer CO₂-Anteil) eingesetzt.</p>' },
      { h: 'Anlauffarben und Nachbehandlung', html: '<p>Anlauffarben zeigen, dass die Oberfläche oxidiert ist – dort kann Rost entstehen. Sie werden durch Beizen oder elektrochemisches Reinigen entfernt. Werkzeuge, die mit Baustahl in Berührung waren, nicht für Edelstahl verwenden (Fremdrost).</p>' }
    ],
    viz: ['wig'],
    kurs: 'wig-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/metall/aluminium-schweissen-alu-schweissen/',
    title: 'Schweißen mit Aluminium – Alu schweißen',
    h1: 'Schweißen mit Aluminium',
    description: 'Aluminium schweißen: Oxidschicht entfernen, fünf- bis sechsfache Wärmeleitfähigkeit gegenüber Stahl, WIG für dünne, MIG für dicke Bauteile, Argon als Schutzgas.',
    kicker: 'Metall',
    lead: 'Aluminium leitet Wärme etwa fünf- bis sechsmal so stark wie Stahl und verformt sich deshalb leichter. Dazu kommt eine Oxidschicht mit sehr hohem Schmelzpunkt.',
    sections: [
      { h: 'Vorbereitung', html: '<p>Den Film aus Aluminiumoxid von der Metalloberfläche abzuziehen ist sinnvoll, da dessen hoher Schmelzpunkt stört. Entfetten und mit einer Edelstahlbürste unmittelbar vor dem Schweißen bürsten.</p>' },
      { h: 'Verfahren', html: '<p>Für dünne Bauteile empfiehlt sich WIG mit Wechselstrom. Bei dickeren Teilen wird MIG eingesetzt, das deutlich schneller als WIG ist – mit Argon als Schutzgas.</p>' }
    ],
    viz: ['alu', 'wig'],
    kurs: 'wig-alu-aufbau-schweisskurs'
  },
  {
    path: '/ratgeber/metall/schweissen-mit-kupfer-magnesium-nickel-und-edelmetalle/',
    title: 'Schweißen mit Kupfer, Magnesium, Nickel und Edelmetallen',
    h1: 'Schweißen mit Kupfer, Magnesium, Nickel und Edelmetallen',
    description: 'Kupfer schweißen mit WIG oder MIG/MAG (Gleichstrom, Minuspol), Magnesium mit Wechselstrom, Nickel und Edelmetalle unter inertem Schutzgas.',
    kicker: 'Metall',
    lead: 'Nichteisenmetalle stellen eigene Anforderungen – vor allem an Wärmeeinbringung und Schutzgas.',
    sections: [
      { h: 'Kupfer', html: '<p>Für dünnere Teile empfiehlt sich WIG-Schweißen, für dickere Werkstücke MIG/MAG. Beim MIG/MAG-Schweißen von Kupfer wird mit Gleichstrom am Minuspol gearbeitet. Wegen der hohen Wärmeleitfähigkeit wird häufig vorgewärmt; Argon/Helium-Gemische erhöhen den Einbrand.</p>' },
      { h: 'Magnesium', html: '<p>Magnesium wird wie Aluminium mit Wechselstrom WIG-geschweißt. Magnesiumspäne sind brennbar – Funkenflug vermeiden.</p>' },
      { h: 'Nickel und Edelmetalle', html: '<p>Nickel und Nickellegierungen werden WIG oder MIG unter Argon geschweißt, saubere Oberflächen sind Pflicht. Edelmetalle werden meist WIG-, Mikroplasma- oder laserverschweißt.</p>' }
    ],
    viz: ['matrix']
  }
];
