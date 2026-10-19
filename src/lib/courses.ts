import type { StandortId } from './site';

export type Verfahren = 'mag' | 'wig' | 'e' | 'alu' | 'autogen' | 'loeten' | 'pulse' | 'pruefung' | 'mix';
export type Level = 'Einsteiger' | 'Aufbau' | 'Fortgeschritten' | 'Lehrgang mit Prüfung';

export interface Kurs {
  slug: string;              // = bisherige URL ohne Schrägstriche
  name: string;              // H1
  kurz: string;              // Kurzname für Kalender, Filter, Chips
  verfahren: Verfahren;
  verfahrenLabel: string;
  level: Level;
  standorte: StandortId[];
  preis: number | null;      // Standardpreis in Euro inkl. MwSt.; je Termin im Backend überschreibbar
  preisHinweis?: string;
  dauer: string;
  tage: number;
  zeiten: string;
  maxTeilnehmer: number;
  voraussetzung: string;
  voraussetzungKurs?: string; // slug
  zielgruppe: string;
  lead: string;
  intro: string[];
  inhalte: string[];
  ablauf: { zeit: string; titel: string; text: string }[];
  inklusive: string[];
  abschluss: string;
  hinweise: string[];
  bild: string;
  bildAlt: string;
  ratgeber: { href: string; label: string }[];
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

const INKL_TAG = ['Eigener Schweißplatz', 'Schweißgerät, Gas und Zusatzwerkstoff', 'Getränke und Mittagessen', 'Teilnahmebescheinigung'];

const SICHERHEIT_HINWEIS = 'Bitte tragen Sie feste, geschlossene Schuhe und Kleidung aus Baumwolle (keine Kunstfaser). Brillenträger kommen mit Brille – Kontaktlinsen sind nicht erlaubt.';

export const KURSE: Kurs[] = [
  {
    slug: 'mig-mag-einsteiger-schweisskurs',
    name: 'MIG/MAG Einsteiger-Schweißkurs',
    kurz: 'MAG Einsteiger',
    verfahren: 'mag',
    verfahrenLabel: 'MIG/MAG',
    level: 'Einsteiger',
    standorte: ['muenchen'],
    preis: 415,
    dauer: '1 Tag · ca. 8 Stunden',
    tage: 1,
    zeiten: '8:00 – ca. 16:00 Uhr',
    maxTeilnehmer: 9,
    voraussetzung: 'Keine Vorkenntnisse nötig. Handwerkliches Geschick ist von Vorteil.',
    zielgruppe: 'Heimwerker, Hobbyschrauber, Oldtimer-Fans, Landwirte und alle, die Stahl selbst verbinden wollen.',
    lead: 'In einem Tag vom ersten Lichtbogen zur sauberen Kehlnaht: Das Schutzgasschweißen ist das Verfahren, mit dem die meisten Einsteiger am schnellsten zum Ziel kommen.',
    intro: [
      'Das MAG-Schweißen ist das Arbeitspferd in Werkstatt und Hobbykeller. Der Draht wird automatisch nachgeführt, Sie konzentrieren sich auf Brennerhaltung und Geschwindigkeit. Genau das trainieren wir – mit einem Verhältnis von Theorie zu Praxis von rund 25 zu 75.',
      'Ziel des Kurses ist es, einfache Schweißteile aus Stahl selbst anzufertigen und Reparaturen auszuführen, für die kein Schweißerzeugnis nötig ist.'
    ],
    inhalte: ['Funktionsweise MIG/MAG, Stromquelle, Drahtvorschub, Schutzgas', 'Arbeitssicherheit und Schutzausrüstung', 'Einstellen von Spannung und Drahtgeschwindigkeit', 'Brennerhaltung, stechend und schleppend', 'Stumpfnaht, Kehlnaht, Ecknaht in Wannenlage', 'Punkt- und Intervallschweißen an Dünnblech', 'Typische Fehler erkennen: Poren, Bindefehler, Einbrandkerben'],
    ablauf: [
      { zeit: '08:00', titel: 'Grundlagen', text: 'Begrüßung, Sicherheit, Aufbau des Schutzgasschweißgeräts, Schutzgase und Drähte.' },
      { zeit: '09:30', titel: 'Erste Raupen', text: 'Zünden, Auftragsraupen auf Blech, Gefühl für Abstand und Geschwindigkeit.' },
      { zeit: '12:00', titel: 'Mittagspause', text: 'Gemeinsames Mittagessen – inklusive.' },
      { zeit: '12:45', titel: 'Nahtformen', text: 'Stumpf-, Kehl- und Ecknaht. Der Dozent korrigiert an jedem Platz.' },
      { zeit: '15:00', titel: 'Eigenes Werkstück', text: 'Sie verbinden ein kleines Werkstück und werten die Nähte gemeinsam aus.' },
      { zeit: '16:00', titel: 'Abschluss', text: 'Fragen, Kaufberatung auf Wunsch, Teilnahmebescheinigung.' }
    ],
    inklusive: INKL_TAG,
    abschluss: 'Teilnahmebescheinigung. Nach dem Einsteigerkurs dürfen keine Arbeiten nach EN 1090 ausgeführt werden – dafür ist eine zertifizierte Schweißerprüfung nötig.',
    hinweise: [SICHERHEIT_HINWEIS, 'Eigenes Schweißgerät? Bringen Sie es gerne mit – wir zeigen Ihnen die richtigen Einstellungen.'],
    bild: '/images/kurse/funkenflug-werkstueck.jpg',
    bildAlt: 'Funkenflug beim MAG-Schweißen an einem Stahlwerkstück',
    ratgeber: [
      { href: '/ratgeber/schweissverfahren/mig-mag-schweissen/', label: 'MIG/MAG-Schweißen im Überblick' },
      { href: '/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mag-schweissen/', label: 'Welches Schutzgas zum MAG-Schweißen?' },
      { href: '/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/kehlnaht-schweissen/', label: 'Kehlnaht schweißen' }
    ],
    faq: [
      { q: 'Brauche ich Vorkenntnisse?', a: 'Nein. Der Kurs richtet sich an Einsteiger ohne jede Schweißerfahrung.' },
      { q: 'Was ist der Unterschied zwischen MIG und MAG?', a: 'Im Grunde nur das Schutzgas: MIG arbeitet mit inerten Gasen wie Argon oder Helium, MAG mit aktiven Gasen wie CO₂ oder Mischgas. Im Kurs schweißen Sie Stahl mit MAG.' },
      { q: 'Darf ich danach tragende Teile schweißen?', a: 'Nein. Für prüfpflichtige Bauteile benötigen Sie eine Schweißerprüfung, zum Beispiel in unserem Lehrgang nach DIN EN ISO 9606-1.' }
    ],
    metaTitle: 'MIG/MAG Schweißkurs für Einsteiger in München | 415 €',
    metaDescription: 'MAG-Schweißen an einem Tag lernen: Einsteiger-Schweißkurs in München-Freiham, max. 9 Teilnehmer, 75 % Praxis, eigener Schweißplatz, Mittagessen inklusive. Jetzt Termin buchen.'
  },
  {
    slug: 'wig-einsteiger-schweisskurs',
    name: 'WIG Einsteiger-Schweißkurs',
    kurz: 'WIG Einsteiger',
    verfahren: 'wig',
    verfahrenLabel: 'WIG (TIG)',
    level: 'Einsteiger',
    standorte: ['muenchen'],
    preis: 415,
    dauer: '1 Tag · ca. 8 Stunden',
    tage: 1,
    zeiten: '8:00 – ca. 16:00 Uhr',
    maxTeilnehmer: 9,
    voraussetzung: 'Keine Vorkenntnisse nötig. Ruhige Hand von Vorteil. Wegen der Hochfrequenzzündung ist die Teilnahme mit Herzschrittmacher nicht möglich.',
    zielgruppe: 'Alle, die besonders saubere Nähte an Stahl und Edelstahl schweißen möchten – Geländer, Möbel, Kunst, Fahrzeugbau.',
    lead: 'WIG ist die Königsdisziplin für saubere, spritzerfreie Nähte. Wir zeigen Ihnen, wie Brenner, Zusatzstab und Fußpedal zusammenspielen.',
    intro: [
      'Beim Wolfram-Inertgas-Schweißen brennt der Lichtbogen zwischen einer nicht abschmelzenden Wolframelektrode und dem Werkstück. Den Zusatzwerkstoff führen Sie von Hand zu – das verlangt etwas Übung, belohnt aber mit Nähten, die kaum Nacharbeit brauchen.',
      'Der Kurs beginnt mit zwei Stunden Grundlagen und geht dann an den eigenen Schweißplatz.'
    ],
    inhalte: ['WIG-Verfahren, Wolframelektroden und Anschliff', 'Gleichstrom und Hochfrequenzzündung', 'Argon als Schutzgas, Gasmenge, Gasvorströmung', 'Brennerhaltung und Zuführen des Schweißstabs', 'Stumpf- und Kehlnaht an Stahl und Edelstahl', 'Anlauffarben und deren Vermeidung'],
    ablauf: [
      { zeit: '08:00', titel: 'Die Grundlagen', text: 'Theorie zu Verfahren, Elektrode, Schutzgas und Sicherheit.' },
      { zeit: '10:00', titel: 'Brenner führen', text: 'Schmelzbad halten ohne Zusatz, dann mit Schweißstab.' },
      { zeit: '12:00', titel: 'Mittagspause', text: 'Gemeinsames Mittagessen – inklusive.' },
      { zeit: '12:45', titel: 'Nähte an Stahl und Edelstahl', text: 'Stumpf- und Kehlnaht, Korrektur am Platz.' },
      { zeit: '15:30', titel: 'Auswertung', text: 'Nahtbilder vergleichen, Fragen, Teilnahmebescheinigung.' }
    ],
    inklusive: INKL_TAG,
    abschluss: 'Teilnahmebescheinigung. Nach dem Einsteigerkurs dürfen keine Arbeiten nach EN 1090 ausgeführt werden.',
    hinweise: [SICHERHEIT_HINWEIS, 'Personen mit Herzschrittmacher dürfen wegen der Hochfrequenz nicht teilnehmen.'],
    bild: '/images/kurse/wig-brenner-rotlicht.jpg',
    bildAlt: 'WIG-Schweißbrenner mit Keramikdüse vor rot beleuchtetem Schweißvorhang',
    ratgeber: [
      { href: '/ratgeber/schweissverfahren/wig-schweissen/wig-schweissverfahren/', label: 'Das WIG-Schweißverfahren im Überblick' },
      { href: '/ratgeber/schweissverfahren/wig-schweissen/zuendung-des-lichtbogens/', label: 'Zündung des Lichtbogens' },
      { href: '/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-wig-schweissen/', label: 'Welches Schutzgas zum WIG-Schweißen?' }
    ],
    faq: [
      { q: 'Ist WIG schwerer zu lernen als MAG?', a: 'Etwas, weil Sie Brenner und Zusatzstab mit zwei Händen führen. Dafür lernen Sie Schmelzbad und Wärmeführung besonders gut kennen.' },
      { q: 'Schweißen wir auch Aluminium?', a: 'Aluminium braucht Wechselstrom und eine eigene Technik. Dafür gibt es den Alu-WIG-Aufbaukurs, der auf diesem Kurs aufbaut.' }
    ],
    metaTitle: 'WIG Schweißkurs für Einsteiger in München | 415 €',
    metaDescription: 'WIG-Schweißen (TIG) lernen in München-Freiham: Einsteigerkurs an einem Tag, max. 9 Teilnehmer, eigener Schweißplatz, Stahl und Edelstahl. Jetzt freien Termin buchen.'
  },
  {
    slug: 'elektroden-einsteiger-schweisskurs',
    name: 'E-Schweißkurs (Elektrode) für Einsteiger',
    kurz: 'E-Hand Einsteiger',
    verfahren: 'e',
    verfahrenLabel: 'Elektrode (E-Hand)',
    level: 'Einsteiger',
    standorte: ['muenchen'],
    preis: 466,
    dauer: '1 Tag · ca. 8 Stunden',
    tage: 1,
    zeiten: '8:00 – ca. 16:00 Uhr',
    maxTeilnehmer: 9,
    voraussetzung: 'Keine Vorkenntnisse nötig.',
    zielgruppe: 'Landwirtschaft, Montage, Metallbau im Freien und alle, die robust und ohne Gasflasche schweißen wollen.',
    lead: 'Das Lichtbogenhandschweißen ist eines der ältesten Verfahren – und bis heute unschlagbar auf Montage, im Freien und an verschmutztem Material.',
    intro: [
      'Beim E-Hand-Schweißen schmilzt eine umhüllte Stabelektrode ab. Die Umhüllung bildet Schutzgas und Schlacke – eine Gasflasche ist nicht nötig. Das macht das Verfahren mobil und windunempfindlich.',
      'Im Kurs lernen Sie Zünden, Lichtbogenlänge und Elektrodenwinkel zu beherrschen und Schlacke sauber zu entfernen.'
    ],
    inhalte: ['Stromquelle, Polung, Elektrodentypen (rutil, basisch)', 'Arbeitssicherheit', 'Zünden durch Wischen und Tupfen', 'Lichtbogenlänge und Elektrodenwinkel', 'Kehl- und Stumpfnaht, Schlacke entfernen', 'Anwendungen in Landwirtschaft und Montage'],
    ablauf: [
      { zeit: '08:00', titel: 'Grundlagen', text: 'Verfahren, Elektroden, Polung und Sicherheit.' },
      { zeit: '09:30', titel: 'Zünden üben', text: 'Raupen ziehen, Lichtbogenlänge halten.' },
      { zeit: '12:00', titel: 'Mittagspause', text: 'Gemeinsames Mittagessen – inklusive.' },
      { zeit: '12:45', titel: 'Nähte', text: 'Kehl- und Stumpfnaht, Elektrodenwechsel, Ansatzstellen.' },
      { zeit: '15:30', titel: 'Auswertung', text: 'Fehlerbilder, Fragen, Teilnahmebescheinigung.' }
    ],
    inklusive: INKL_TAG,
    abschluss: 'Teilnahmebescheinigung.',
    hinweise: [SICHERHEIT_HINWEIS],
    bild: '/images/kurse/funkenflug-tuerkis.jpg',
    bildAlt: 'Funken und Lichtbogen beim Elektrodenschweißen',
    ratgeber: [
      { href: '/ratgeber/schweisszubehoer/elektroden-schweissgeraete/', label: 'Elektroden-Schweißgeräte' },
      { href: '/glossary/lichtbogenhandschweissen/', label: 'Glossar: Lichtbogenhandschweißen' }
    ],
    faq: [{ q: 'Brauche ich für E-Hand eine Gasflasche?', a: 'Nein. Die Umhüllung der Elektrode erzeugt beim Abschmelzen selbst Schutzgas und Schlacke.' }],
    metaTitle: 'E-Hand Schweißkurs (Elektrode) für Einsteiger in München | 466 €',
    metaDescription: 'Elektrodenschweißen lernen: E-Hand-Einsteigerkurs in München-Freiham, ein Tag, max. 9 Teilnehmer, eigener Schweißplatz, Mittagessen inklusive. Termin online buchen.'
  },
  {
    slug: 'wig-alu-aufbau-schweisskurs',
    name: 'WIG-Alu Aufbau-Schweißkurs',
    kurz: 'Alu-WIG Aufbau',
    verfahren: 'alu',
    verfahrenLabel: 'WIG Aluminium',
    level: 'Aufbau',
    standorte: ['muenchen'],
    preis: 466,
    dauer: '1 Tag · ca. 8 Stunden',
    tage: 1,
    zeiten: 'Am Wochenende, 8:00 – ca. 16:00 Uhr',
    maxTeilnehmer: 9,
    voraussetzung: 'Besuch unseres WIG-Einsteiger-Schweißkurses.',
    voraussetzungKurs: 'wig-einsteiger-schweisskurs',
    zielgruppe: 'Absolventen des WIG-Einsteigerkurses, die Aluminium sicher verbinden wollen – Boots-, Fahrzeug- und Anlagenbau.',
    lead: 'Aluminium leitet Wärme fünf- bis sechsmal besser als Stahl und trägt eine zähe Oxidschicht. Im Aufbaukurs lernen Sie, beides zu beherrschen.',
    intro: [
      'Aluminium wird mit Wechselstrom WIG-geschweißt: Die Plusphase bricht die Oxidhaut auf, die Minusphase bringt die Wärme ins Werkstück. Wie Sie Balance, Frequenz und Strom einstellen, ist der Kern dieses Kurses.'
    ],
    inhalte: ['Eigenschaften von Aluminium und Oxidschicht', 'Vorbereitung: Entfetten, Bürsten', 'AC-Balance, Frequenz, Elektrodenform', 'Wärmeführung und Verzug', 'Stumpf- und Kehlnaht an Aluminium'],
    ablauf: [
      { zeit: '08:00', titel: 'Werkstoff Aluminium', text: 'Theorie zu Wärmeleitung, Oxid und Wechselstrom.' },
      { zeit: '09:30', titel: 'Einstellen', text: 'Balance und Frequenz an der eigenen Anlage.' },
      { zeit: '12:00', titel: 'Mittagspause', text: 'Inklusive.' },
      { zeit: '12:45', titel: 'Nähte an Alu', text: 'Stumpf- und Kehlnaht mit Korrektur am Platz.' },
      { zeit: '15:30', titel: 'Auswertung', text: 'Nahtbilder, Fragen, Teilnahmebescheinigung.' }
    ],
    inklusive: [...INKL_TAG, 'Umfangreiche Schulungsmappe'],
    abschluss: 'Teilnahmebescheinigung.',
    hinweise: [SICHERHEIT_HINWEIS, 'Personen mit Herzschrittmacher dürfen wegen der Hochfrequenz nicht teilnehmen.'],
    bild: '/images/kurse/wig-brenner-rotlicht.jpg',
    bildAlt: 'WIG-Brenner für das Aluminiumschweißen in der Halterung',
    ratgeber: [
      { href: '/ratgeber/metall/aluminium-schweissen-alu-schweissen/', label: 'Schweißen mit Aluminium' },
      { href: '/ratgeber/gase/gassorten/argon/', label: 'Argon im Überblick' }
    ],
    faq: [{ q: 'Kann ich direkt mit Alu-WIG starten?', a: 'Nein, der Kurs setzt den WIG-Einsteigerkurs voraus, damit wir die Zeit ganz dem Werkstoff Aluminium widmen können.' }],
    metaTitle: 'Alu-WIG Aufbaukurs: Aluminium schweißen lernen in München | 466 €',
    metaDescription: 'Aluminium WIG-schweißen lernen: Aufbaukurs in München für Absolventen des WIG-Einsteigerkurses. Wechselstrom, Balance, Wärmeführung – max. 9 Teilnehmer.'
  },
  {
    slug: 'mag-fortgeschrittenen-schweisskurs',
    name: 'MAG Fortgeschrittenen-Schweißkurs',
    kurz: 'MAG Fortgeschritten',
    verfahren: 'mag',
    verfahrenLabel: 'MIG/MAG',
    level: 'Fortgeschritten',
    standorte: ['muenchen'],
    preis: null,
    preisHinweis: 'Preis siehe Termin',
    dauer: '1 Tag · ca. 8 Stunden',
    tage: 1,
    zeiten: 'Am Wochenende, 8:00 – ca. 16:00 Uhr',
    maxTeilnehmer: 9,
    voraussetzung: 'Besuch unseres MAG-Einsteigerkurses.',
    voraussetzungKurs: 'mig-mag-einsteiger-schweisskurs',
    zielgruppe: 'Teilnehmer, die bereits unseren MAG-Einsteigerkurs besucht haben und ihre Fertigkeiten weiterentwickeln möchten.',
    lead: 'Im Mittelpunkt stehen die Vertiefung und Erweiterung der bereits erlernten Inhalte – mit mehr Zeit am Platz und neuen Schweißpositionen.',
    intro: ['Der Kurs knüpft an den MAG-Einsteigerkurs an. Sie schweißen dickere Bleche, neue Positionen und mehrlagige Nähte und lernen, Ihre Ergebnisse selbst zu beurteilen.'],
    inhalte: ['Wiederholung Einstellwerte', 'Steigende und fallende Position', 'Mehrlagenschweißung', 'Dünnblech und Karosseriereparatur', 'Nahtprüfung und Fehlerbilder'],
    ablauf: [
      { zeit: '08:00', titel: 'Auffrischung', text: 'Einstellwerte, Brennerhaltung, Sicherheit.' },
      { zeit: '09:00', titel: 'Positionen', text: 'Steigend, fallend, Überkopf.' },
      { zeit: '12:00', titel: 'Mittagspause', text: 'Inklusive.' },
      { zeit: '12:45', titel: 'Mehrlagig und Dünnblech', text: 'Wurzel, Füll- und Decklage, Karosserieblech.' },
      { zeit: '15:30', titel: 'Auswertung', text: 'Bruchprobe, Fragen, Teilnahmebescheinigung.' }
    ],
    inklusive: [...INKL_TAG, 'Umfangreiche Schulungsmappe'],
    abschluss: 'Teilnahmebescheinigung.',
    hinweise: [SICHERHEIT_HINWEIS],
    bild: '/images/kurse/funkenflug-werkstueck.jpg',
    bildAlt: 'MAG-Schweißnaht mit Funkenflug',
    ratgeber: [
      { href: '/ratgeber/schweissanleitung/haltung-beim-schweissen/', label: 'Haltung beim Schweißen' },
      { href: '/ratgeber/schweissanleitung/intervallschweissen-punktschweissen/', label: 'Intervall- und Punktschweißen' }
    ],
    faq: [],
    metaTitle: 'MAG Schweißkurs für Fortgeschrittene in München',
    metaDescription: 'MAG-Schweißen vertiefen: Fortgeschrittenenkurs in München für Absolventen des Einsteigerkurses. Positionen, Mehrlagen, Dünnblech – max. 9 Teilnehmer.'
  },
  {
    slug: 'pulse-arc-aufbau-schweisskurs',
    name: 'Pulse-Arc Aufbau-Schweißkurs',
    kurz: 'Pulse-Arc Aufbau',
    verfahren: 'pulse',
    verfahrenLabel: 'MIG/MAG Impuls',
    level: 'Aufbau',
    standorte: ['muenchen'],
    preis: null,
    preisHinweis: 'Preis siehe Termin',
    dauer: '1 Tag · ca. 8 Stunden',
    tage: 1,
    zeiten: 'Am Wochenende, 8:00 – ca. 16:00 Uhr',
    maxTeilnehmer: 8,
    voraussetzung: 'MAG-Einsteigerkurs oder vergleichbare Erfahrung.',
    voraussetzungKurs: 'mig-mag-einsteiger-schweisskurs',
    zielgruppe: 'Anwender von Impuls-Schweißanlagen in Handwerk und Industrie.',
    lead: 'Impulslichtbogen heißt: weniger Spritzer, weniger Wärme, mehr Kontrolle – vor allem bei Edelstahl, Aluminium und dünnen Blechen.',
    intro: ['Moderne Pulse-Arc-Anlagen wechseln in schneller Folge zwischen Grund- und Impulsstrom. Wir zeigen, wann sich der Impulsmodus lohnt und wie Sie die Synergiekennlinien richtig nutzen.'],
    inhalte: ['Prinzip des Impulslichtbogens', 'Synergiekennlinien und Korrekturen', 'Edelstahl und Aluminium mit Impuls', 'Spritzerarme Nähte an Dünnblech'],
    ablauf: [
      { zeit: '08:00', titel: 'Theorie', text: 'Impulsprinzip, Kennlinien, Gase.' },
      { zeit: '09:30', titel: 'Praxis Stahl', text: 'Vergleich Standard- und Impulslichtbogen.' },
      { zeit: '12:00', titel: 'Mittagspause', text: 'Inklusive.' },
      { zeit: '12:45', titel: 'Edelstahl und Alu', text: 'Impulsschweißen an anspruchsvollen Werkstoffen.' },
      { zeit: '15:30', titel: 'Auswertung', text: 'Fragen, Teilnahmebescheinigung.' }
    ],
    inklusive: ['Theorie und Praxis', 'Getränke und Mittagessen', 'Umfangreiche Schulungsmappe', 'Teilnahmebescheinigung'],
    abschluss: 'Teilnahmebescheinigung.',
    hinweise: [SICHERHEIT_HINWEIS],
    bild: '/images/produkte/mekle-schweissgeraete.jpg',
    bildAlt: 'Merkle Schweißanlagen für das Impulsschweißen',
    ratgeber: [{ href: '/ratgeber/schweissverfahren/mig-mag-schweissen/', label: 'MIG/MAG-Schweißen' }],
    faq: [],
    metaTitle: 'Pulse-Arc Aufbaukurs: Impulsschweißen lernen in München',
    metaDescription: 'Impulsschweißen mit Pulse-Arc-Anlagen: Aufbaukurs in München, max. 8 Teilnehmer, Theorie, Praxis, Schulungsmappe und Mittagessen inklusive.'
  },
  {
    slug: 'autogen-einsteiger-schweisskurs',
    name: 'Autogen Einsteiger-Schweißkurs',
    kurz: 'Autogen Einsteiger',
    verfahren: 'autogen',
    verfahrenLabel: 'Autogen (Gasschmelzschweißen)',
    level: 'Einsteiger',
    standorte: ['muenchen'],
    preis: 466,
    dauer: '1 Tag · ca. 8 Stunden',
    tage: 1,
    zeiten: '8:00 – ca. 16:00 Uhr',
    maxTeilnehmer: 9,
    voraussetzung: 'Keine Vorkenntnisse nötig.',
    zielgruppe: 'Oldtimer-Restaurierung, Heizungs- und Rohrleitungsbau, Kunsthandwerk.',
    lead: 'Acetylen und Sauerstoff erzeugen eine 3.200 °C heiße Flamme. Wer sie beherrscht, kann schweißen, löten, wärmen und brennschneiden.',
    intro: ['Beim Gasschmelzschweißen wird das Metall durch die Hitze verbrennender Gase geschmolzen, der Zusatzdraht wird vor oder hinter der Flamme zugeführt. Das Verfahren eignet sich besonders für dünne Bleche, etwa im Karosseriebau, und für Heizungs- und Rohrinstallation.'],
    inhalte: ['Gase, Flaschen, Druckminderer, Sicherheitseinrichtungen', 'Einstellen der neutralen Flamme', 'Nach-links- und Nach-rechts-Schweißen', 'Dünnblech und Rohr', 'Grundlagen Hartlöten und Brennschneiden'],
    ablauf: [
      { zeit: '08:00', titel: 'Gase und Sicherheit', text: 'Flaschen, Kennzeichnung, Rückschlagsicherungen.' },
      { zeit: '09:30', titel: 'Die Flamme', text: 'Zünden, Einstellen, Schmelzbad führen.' },
      { zeit: '12:00', titel: 'Mittagspause', text: 'Inklusive.' },
      { zeit: '12:45', titel: 'Nähte und Löten', text: 'Blech, Rohr, Hartlöten.' },
      { zeit: '15:30', titel: 'Auswertung', text: 'Fragen, Teilnahmebescheinigung.' }
    ],
    inklusive: INKL_TAG,
    abschluss: 'Teilnahmebescheinigung.',
    hinweise: [SICHERHEIT_HINWEIS],
    bild: '/images/produkte/merkle-gase.jpg',
    bildAlt: 'Gasflaschen für Acetylen, Sauerstoff und Schutzgase',
    ratgeber: [
      { href: '/ratgeber/schweissverfahren/autogenschweissen-gasschmelzschweissen/', label: 'Autogenschweißen / Gasschmelzschweißen' },
      { href: '/ratgeber/gase/farben-gasflaschen/', label: 'Farben und Kennzeichnung von Gasflaschen' }
    ],
    faq: [],
    metaTitle: 'Autogen Schweißkurs für Einsteiger in München | 466 €',
    metaDescription: 'Autogenschweißen (Gasschmelzschweißen) lernen in München: Einsteigerkurs mit Acetylen und Sauerstoff, Dünnblech, Rohr und Hartlöten. Termin online buchen.'
  },
  {
    slug: 'gasschweissen-flammloeten-kurs',
    name: 'Gasschweißen & Flammlöten – Einsteigerkurs',
    kurz: 'Gasschweißen & Flammlöten',
    verfahren: 'autogen',
    verfahrenLabel: 'Gasschweißen / Flammlöten',
    level: 'Einsteiger',
    standorte: ['muenchen'],
    preis: 566,
    dauer: '1 Tag · ca. 8 Stunden',
    tage: 1,
    zeiten: '8:00 – ca. 16:00 Uhr',
    maxTeilnehmer: 9,
    voraussetzung: 'Keine Vorkenntnisse nötig.',
    zielgruppe: 'Installateure, Kunsthandwerker, Restauratoren und Heimwerker, die mit der Flamme arbeiten wollen.',
    lead: 'Ein Tag, zwei Techniken: Gasschmelzschweißen und Flamm-Hart- sowie Weichlöten mit der Acetylen-Sauerstoff-Flamme.',
    intro: ['Der Kurs verbindet das Autogenschweißen mit dem Flammlöten. Sie lernen, wann geschweißt und wann gelötet wird, und üben beides an Blech und Rohr.'],
    inhalte: ['Flammeinstellung neutral, reduzierend, oxidierend', 'Gasschweißen an Dünnblech', 'Hart- und Weichlöten, Flussmittel', 'Kupfer- und Stahlrohr verbinden'],
    ablauf: [
      { zeit: '08:00', titel: 'Grundlagen', text: 'Gase, Sicherheit, Flamme.' },
      { zeit: '09:30', titel: 'Gasschweißen', text: 'Schmelzbad und Zusatzdraht.' },
      { zeit: '12:00', titel: 'Mittagspause', text: 'Inklusive.' },
      { zeit: '12:45', titel: 'Flammlöten', text: 'Hart- und Weichlöten an Rohr und Blech.' },
      { zeit: '15:30', titel: 'Auswertung', text: 'Fragen, Teilnahmebescheinigung.' }
    ],
    inklusive: INKL_TAG,
    abschluss: 'Teilnahmebescheinigung.',
    hinweise: [SICHERHEIT_HINWEIS],
    bild: '/images/produkte/merkle-gase.jpg',
    bildAlt: 'Gasflaschen für das Gasschweißen und Flammlöten',
    ratgeber: [{ href: '/ratgeber/schweissverfahren/autogenschweissen-gasschmelzschweissen/', label: 'Autogenschweißen' }],
    faq: [],
    metaTitle: 'Gasschweißen & Flammlöten Kurs in München | 566 €',
    metaDescription: 'Gasschweißen und Flammlöten an einem Tag lernen: Einsteigerkurs in München-Freiham, ohne Vorkenntnisse, Mittagessen inklusive. Jetzt Platz buchen.'
  },
  {
    slug: 'loet-einsteiger-kurs',
    name: 'Löt-Einsteiger-Kurs',
    kurz: 'Löten Einsteiger',
    verfahren: 'loeten',
    verfahrenLabel: 'Hart- und Weichlöten',
    level: 'Einsteiger',
    standorte: ['muenchen'],
    preis: null,
    preisHinweis: 'Preis siehe Termin',
    dauer: '1 Tag',
    tage: 1,
    zeiten: '8:00 – ca. 16:00 Uhr',
    maxTeilnehmer: 9,
    voraussetzung: 'Keine Vorkenntnisse nötig.',
    zielgruppe: 'Heimwerker, Installateure und Kunsthandwerker.',
    lead: 'Löten verbindet Werkstoffe, ohne sie aufzuschmelzen. Wir zeigen Weich- und Hartlöten mit Flamme – sicher und materialgerecht.',
    intro: ['Beim Löten schmilzt nur das Lot, nicht das Grundmaterial. So lassen sich auch unterschiedliche Metalle verbinden. Der Kurs vermittelt Grundlagen, Lote und Flussmittel und viel Praxis.'],
    inhalte: ['Weich- und Hartlöten, Unterschiede', 'Lote und Flussmittel', 'Flamme einstellen', 'Kupfer, Messing, Stahl verbinden'],
    ablauf: [
      { zeit: '08:00', titel: 'Grundlagen', text: 'Lote, Flussmittel, Sicherheit.' },
      { zeit: '09:30', titel: 'Weichlöten', text: 'Kupferrohr und Blech.' },
      { zeit: '12:00', titel: 'Mittagspause', text: 'Inklusive.' },
      { zeit: '12:45', titel: 'Hartlöten', text: 'Stahl, Messing, Mischverbindungen.' },
      { zeit: '15:30', titel: 'Auswertung', text: 'Fragen, Teilnahmebescheinigung.' }
    ],
    inklusive: INKL_TAG,
    abschluss: 'Teilnahmebescheinigung.',
    hinweise: [SICHERHEIT_HINWEIS],
    bild: '/images/produkte/merkle-schweisszubehoer.jpg',
    bildAlt: 'Schweiß- und Lötzubehör mit Druckminderer und Schweißhelm',
    ratgeber: [{ href: '/ratgeber/', label: 'Zum Ratgeber' }],
    faq: [],
    metaTitle: 'Lötkurs für Einsteiger in München: Hart- und Weichlöten lernen',
    metaDescription: 'Löten lernen in München: Einsteigerkurs für Hart- und Weichlöten mit der Flamme. Kleine Gruppe, viel Praxis, Mittagessen inklusive.'
  },
  {
    slug: 'tuev-gepruefter-schweisskurs',
    name: 'Schweißlehrgang mit Prüfung nach DIN EN ISO 9606-1',
    kurz: 'Lehrgang mit Prüfung',
    verfahren: 'pruefung',
    verfahrenLabel: 'MAG / WIG / Elektrode',
    level: 'Lehrgang mit Prüfung',
    standorte: ['muenchen'],
    preis: 1775,
    preisHinweis: 'MAG / WIG 1.775 € · Elektrode 2.075 €',
    dauer: '5 Tage · Montag bis Freitag',
    tage: 5,
    zeiten: 'täglich 8:00 – 16:00 Uhr',
    maxTeilnehmer: 8,
    voraussetzung: 'Schweißerfahrung im gewählten Verfahren wird empfohlen, z. B. durch unseren Einsteigerkurs.',
    zielgruppe: 'Handwerker, Monteure, Quereinsteiger und Betriebe, die einen Schweißerpass für prüfpflichtige Arbeiten brauchen.',
    lead: 'Fünf Tage intensive Vorbereitung, am Ende die zertifizierte Prüfung zum Schweißer nach DIN EN ISO 9606-1 – Ihr Schweißerpass.',
    intro: [
      'Der Lehrgang verbindet Fachtheorie, ausgiebige Praxis am eigenen Platz und die Prüfung durch eine unabhängige Prüfstelle. Er endet mit dem Schweißerschein bzw. Schweißerpass nach DIN EN ISO 9606-1.',
      'Die Gültigkeit der Schweißerprüfung beträgt drei Jahre, sofern die Tätigkeit nicht länger als sechs Monate unterbrochen wird und die Verlängerung bestätigt wird.'
    ],
    inhalte: ['Fachkunde: Werkstoffe, Normen, Nahtvorbereitung', 'Schweißpositionen nach DIN EN ISO 6947', 'Prüfstücke: Blech und/oder Rohr', 'Sicht- und Bruchprüfung verstehen', 'Prüfungssimulation am vierten Tag', 'Prüfung am fünften Tag'],
    ablauf: [
      { zeit: 'Tag 1', titel: 'Fachkunde und Einstieg', text: 'Theorie, Normen, erste Prüfstücke.' },
      { zeit: 'Tag 2', titel: 'Positionen', text: 'Training in den geforderten Schweißpositionen.' },
      { zeit: 'Tag 3', titel: 'Wurzel und Decklage', text: 'Mehrlagig, Fehler erkennen und vermeiden.' },
      { zeit: 'Tag 4', titel: 'Generalprobe', text: 'Prüfstücke unter Prüfungsbedingungen.' },
      { zeit: 'Tag 5', titel: 'Prüfung', text: 'Zertifizierte Prüfung nach DIN EN ISO 9606-1.' }
    ],
    inklusive: ['Eigener Schweißplatz', 'Material und Prüfstücke', 'Getränke und Mittagessen', 'Umfangreiche Schulungsmappe'],
    abschluss: 'Schweißerprüfungsbescheinigung nach DIN EN ISO 9606-1 (Schweißerpass).',
    hinweise: [SICHERHEIT_HINWEIS, 'Der 25-%-Gerätekauf-Rabatt gilt nicht für Lehrgänge mit TÜV-Prüfung.', 'Stornierung schriftlich bis spätestens vier Wochen vor Lehrgangsbeginn.'],
    bild: '/images/kurse/schweisser-portrait.jpg',
    bildAlt: 'Schweißer in Schutzjacke mit Schweißhelm in der Werkstatt',
    ratgeber: [{ href: '/schweisskurse-lehrgaenge/', label: 'Übersicht Lehrgänge' }, { href: '/aufbaukurse/', label: 'Aufbaukurse mit Prüfung' }],
    faq: [
      { q: 'Wie lange ist der Schweißerpass gültig?', a: 'Drei Jahre, sofern Sie nicht länger als sechs Monate pausieren und die Tätigkeit regelmäßig bestätigt wird.' },
      { q: 'Wer nimmt die Prüfung ab?', a: 'Die Prüfung erfolgt als zertifizierte Prüfung durch den TÜV.' }
    ],
    metaTitle: 'Schweißlehrgang mit TÜV-Prüfung (DIN EN ISO 9606-1) in München',
    metaDescription: 'Schweißerpass in 5 Tagen: MAG-, WIG- oder Elektroden-Lehrgang mit zertifizierter Prüfung nach DIN EN ISO 9606-1 in München. Max. 8 Teilnehmer. Ab 1.775 €.'
  },
  {
    slug: 'allgemeiner-schweisskurs-hamburg',
    name: 'Allgemeiner Schweißkurs MAG / WIG / E in der Region Hamburg',
    kurz: 'Allgemeiner Schweißkurs',
    verfahren: 'mix',
    verfahrenLabel: 'MAG + WIG + Elektrode',
    level: 'Einsteiger',
    standorte: ['hamburg'],
    preis: 357,
    preisHinweis: 'inkl. 19 % MwSt.',
    dauer: '1 Tag',
    tage: 1,
    zeiten: 'ganztägig',
    maxTeilnehmer: 9,
    voraussetzung: 'Keine Vorkenntnisse nötig.',
    zielgruppe: 'Einsteiger aus Hamburg und Schleswig-Holstein, die alle drei Lichtbogenverfahren kennenlernen wollen.',
    lead: 'Ein Tag, drei Verfahren: Im Norden bieten wir einen kombinierten Kurs an, in dem MAG-, WIG- und Elektrodenschweißen enthalten sind.',
    intro: ['In München gibt es für jedes Verfahren einen eigenen Kurs. In der Region Hamburg bieten wir ausschließlich einen allgemeinen Kurs an, der alle drei Verfahren verbindet – ideal, um herauszufinden, was zu Ihren Projekten passt.'],
    inhalte: ['Sicherheit und Schutzausrüstung', 'MAG-Schweißen an Stahl', 'WIG-Schweißen mit Zusatzstab', 'Elektrodenschweißen', 'Welches Verfahren für welches Projekt?'],
    ablauf: [
      { zeit: 'Vormittag', titel: 'Grundlagen und MAG', text: 'Sicherheit, Geräte, erste Nähte mit Schutzgas.' },
      { zeit: 'Mittag', titel: 'Pause', text: 'Kurze Stärkung.' },
      { zeit: 'Nachmittag', titel: 'WIG und Elektrode', text: 'Beide Verfahren im direkten Vergleich.' },
      { zeit: 'Abschluss', titel: 'Auswertung', text: 'Fragen, Teilnahmebescheinigung.' }
    ],
    inklusive: ['Eigener Schweißplatz', 'Geräte, Gas und Zusatzwerkstoff', 'Teilnahmebescheinigung'],
    abschluss: 'Teilnahmebescheinigung.',
    hinweise: [SICHERHEIT_HINWEIS, 'Anmeldung auch telefonisch beim Dozenten Bernd Koliwer möglich.'],
    bild: '/images/kurse/funkenflug-tuerkis.jpg',
    bildAlt: 'Funkenflug beim Schweißen im Kurs Region Hamburg',
    ratgeber: [{ href: '/ratgeber/schweissverfahren/', label: 'Welches Schweißverfahren passt?' }],
    faq: [{ q: 'Wo genau findet der Kurs statt?', a: 'Bei MERKLE NORD, Oha 5, 25373 Ellerhoop im Kreis Pinneberg.' }],
    metaTitle: 'Schweißkurs Hamburg: MAG, WIG & E an einem Tag | 357 €',
    metaDescription: 'Schweißen lernen bei Hamburg: Allgemeiner Schweißkurs in Ellerhoop mit MAG, WIG und Elektrode an einem Tag. 357 € inkl. MwSt. Jetzt freien Termin buchen.'
  }
];

export const KURS_BY_SLUG: Record<string, Kurs> = Object.fromEntries(KURSE.map((k) => [k.slug, k]));

export function kurseFuer(standort: StandortId) {
  return KURSE.filter((k) => k.standorte.includes(standort));
}

export const VERFAHREN_LABEL: Record<Verfahren, string> = {
  mag: 'MIG/MAG', wig: 'WIG', e: 'Elektrode', alu: 'Alu-WIG', autogen: 'Autogen', loeten: 'Löten', pulse: 'Pulse-Arc', pruefung: 'Mit Prüfung', mix: 'MAG/WIG/E'
};

export function euro(n: number | null | undefined, opts: { cents?: boolean } = {}) {
  if (n == null) return '';
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: opts.cents ? 2 : 0, maximumFractionDigits: opts.cents ? 2 : 0 }).format(n);
}
