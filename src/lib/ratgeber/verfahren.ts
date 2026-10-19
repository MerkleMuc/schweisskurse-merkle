import type { RatgeberSeite } from './types';

export const VERFAHREN: RatgeberSeite[] = [
  {
    path: '/ratgeber/',
    title: 'Ratgeber Schweißen – Verfahren, Gase, Anleitungen',
    h1: 'Ratgeber Schweißen',
    description: 'Der Merkle-Ratgeber zum Schweißen: MIG/MAG, WIG, E-Hand und Autogen einfach erklärt, welches Verfahren zu welchem Metall passt, Schutzgase, Anleitungen, Zubehör und Glossar.',
    kicker: 'Ratgeber',
    lead: 'Einfache Anleitungen und Erklärungen zu den unterschiedlichen Schweißverfahren – MIG/MAG, WIG, E-Hand und Autogen – und dazu, welches Verfahren für welches Metall geeignet ist: Stahl, Edelstahl, Aluminium oder andere Legierungen.',
    sections: [
      { h: 'Was Sie im Ratgeber finden', html: '<p>Der Ratgeber ist in Kapitel gegliedert: <a href="/ratgeber/schweissverfahren/">Schweißverfahren</a> erklärt, wie die vier wichtigsten Verfahren funktionieren. Unter <a href="/ratgeber/schweissanleitung/">Schweißanleitung</a> finden Sie Videos und Praxistipps zu Nahtformen und Brennerhaltung. Das Kapitel <a href="/ratgeber/gase/">Gase</a> behandelt Schutzgase und die Kennzeichnung von Gasflaschen, das Kapitel <a href="/ratgeber/metall/metalle/">Metall</a> die Eigenschaften der Werkstoffe beim Schweißen. Ergänzt wird alles durch Hinweise zu <a href="/ratgeber/schweisszubehoer/">Schweißgeräten, Zubehör und Schutzkleidung</a> sowie ein <a href="/ratgeber/glossar-2/">Glossar</a> mit den wichtigsten Fachbegriffen.</p>' },
      { h: 'Vom Lesen zum Schweißen', html: '<p>Theorie ersetzt keine Übung. In unseren <a href="/schweisskurse-lehrgaenge/">Schweißkursen</a> in München und der Region Hamburg setzen Sie das Gelesene am eigenen Schweißplatz um – mit einem Dozenten, der Ihre Naht beurteilt. Welcher Kurs zu Ihrer Aufgabe passt, zeigt der <a href="/schweisskurs-ratgeber/">Schweißkurs-Ratgeber</a>.</p>' }
    ],
    viz: ['matrix'],
    related: ['/ratgeber/was-ist-schweissen/', '/ratgeber/schweissverfahren/', '/ratgeber/gase/', '/ratgeber/schweissanleitung/', '/ratgeber/metall/metalle/', '/ratgeber/glossar-2/']
  },
  {
    path: '/ratgeber/was-ist-schweissen/',
    title: 'Schweißen auf einen Blick – was ist Schweißen?',
    h1: 'Schweißen auf einen Blick',
    description: 'Was ist Schweißen? Definition, Unterschied zu Löten, die wichtigsten Verfahren im Überblick und wofür sie eingesetzt werden.',
    kicker: 'Grundlagen',
    lead: 'Schweißen ist das unlösbare Verbinden von Bauteilen unter Anwendung von Wärme und/oder Druck – mit oder ohne Zusatzwerkstoff. Die Werkstoffe werden dabei an der Verbindungsstelle aufgeschmolzen und verbinden sich beim Erstarren.',
    sections: [
      { h: 'Schweißen, Löten, Kleben', html: '<p>Beim <b>Schweißen</b> schmilzt der Grundwerkstoff selbst auf. Beim <b>Löten</b> schmilzt nur das Lot, dessen Schmelzpunkt unter dem des Grundwerkstoffs liegt – das Bauteil bleibt fest. Beim Kleben entsteht die Verbindung durch Adhäsion. Geschweißte Verbindungen erreichen bei richtiger Ausführung die Festigkeit des Grundwerkstoffs.</p>' },
      { h: 'Die wichtigsten Verfahren', html: '<ul><li><b>MIG/MAG</b> – Schutzgasschweißen mit abschmelzender Drahtelektrode, die automatisch nachgeführt wird. <a href="/ratgeber/schweissverfahren/mig-mag-schweissen/">Mehr</a></li><li><b>WIG</b> – Wolfram-Inertgas-Schweißen mit nicht abschmelzender Elektrode und Zusatzstab von Hand. <a href="/ratgeber/schweissverfahren/wig-schweissen/">Mehr</a></li><li><b>E-Hand</b> – Lichtbogenhandschweißen mit umhüllter Stabelektrode, ohne Gasflasche. <a href="/ratgeber/schweissverfahren/elektroden-schweissen/">Mehr</a></li><li><b>Autogen</b> – Gasschmelzschweißen mit der Acetylen-Sauerstoff-Flamme. <a href="/ratgeber/schweissverfahren/autogenschweissen-gasschmelzschweissen/">Mehr</a></li></ul>' },
      { h: 'Sicherheit zuerst', html: '<p>Der Lichtbogen strahlt intensives UV- und IR-Licht ab, dazu kommen Spritzer, Rauch und hohe Temperaturen. Schweißhelm, Handschuhe und schwer entflammbare Kleidung sind Pflicht. Mehr dazu unter <a href="/ratgeber/schweisszubehoer/schweisser-berufskleidung-schutzkleidung-schweisser/">Schutzkleidung</a>.</p>' }
    ],
    viz: ['mag', 'matrix'],
    related: ['/ratgeber/schweissverfahren/', '/ratgeber/glossar-2/'],
    kurs: 'mig-mag-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/schweissverfahren/',
    title: 'Schweißverfahren im Überblick: MIG/MAG, WIG, E-Hand, Autogen',
    h1: 'Schweißverfahren',
    description: 'Die vier wichtigsten Schweißverfahren im Vergleich: MIG/MAG, WIG, E-Hand und Autogenschweißen – Funktionsweise, Vorteile, typische Anwendungen.',
    kicker: 'Schweißverfahren',
    lead: 'Hier gehen wir insbesondere auf die Verfahren des MIG/MAG-Schweißens, des WIG-Schweißens, des E-Hand-Schweißens und des Autogenschweißens ein.',
    sections: [
      { h: 'MIG/MAG-Schweißen', html: '<p>MIG/MAG-Schweißverfahren sind Lichtbogenschweißverfahren, die sich im Grunde nur durch das verwendete Gas unterscheiden. Die abschmelzende Drahtelektrode wird mit einem Motor kontinuierlich nachgeführt. Das Verfahren ist schnell, gut zu lernen und das am weitesten verbreitete in Werkstatt und Industrie. <a href="/ratgeber/schweissverfahren/mig-mag-schweissen/">Zum Kapitel MIG/MAG</a></p>' },
      { h: 'WIG-Schweißen', html: '<p>Beim Wolfram-Inertgas-Schweißen brennt der Lichtbogen zwischen einer nicht abschmelzenden Wolframelektrode und dem Werkstück. Als Schutzgas dienen inerte Gase wie Argon oder Helium. Der Zusatzwerkstoff wird von Hand zugeführt. WIG liefert die saubersten Nähte. <a href="/ratgeber/schweissverfahren/wig-schweissen/">Zum Kapitel WIG</a></p>' },
      { h: 'E-Hand-Schweißen', html: '<p>Das Lichtbogenhandschweißen ist eines der ältesten Schweißverfahren und wird heute hauptsächlich auf Montage angewandt. Die umhüllte Stabelektrode erzeugt Schutzgas und Schlacke selbst. <a href="/ratgeber/schweissverfahren/elektroden-schweissen/">Zum Kapitel Elektroden-Schweißen</a></p>' },
      { h: 'Autogenschweißen', html: '<p>Beim Gasschmelzschweißen wird das Metall durch die Hitze verbrennender Gase – meist Acetylen und Sauerstoff – geschmolzen. Das Verfahren eignet sich für dünne Bleche, Heizungs- und Rohrinstallation. <a href="/ratgeber/schweissverfahren/autogenschweissen-gasschmelzschweissen/">Zum Kapitel Autogen</a></p>' }
    ],
    viz: ['mag', 'wig', 'e', 'autogen', 'matrix'],
    related: ['/ratgeber/schweissverfahren/mig-mag-schweissen/', '/ratgeber/schweissverfahren/wig-schweissen/', '/ratgeber/schweissverfahren/elektroden-schweissen/', '/ratgeber/schweissverfahren/autogenschweissen-gasschmelzschweissen/']
  },
  {
    path: '/ratgeber/schweissverfahren/mig-mag-schweissen/',
    title: 'MIG-MAG-Schweißen – Verfahren, Werkstoffe, Gase',
    h1: 'MIG-MAG-Schweißen',
    description: 'MIG/MAG-Schweißen erklärt: Funktionsweise, Drahtvorschub, Stromstärke, Unterschied zwischen MIG und MAG, Werkstoffe und Schutzgase.',
    kicker: 'Schweißverfahren',
    lead: 'Bei dem Schutzgasschweißverfahren wird ein feiner Draht über eine Motorsteuerung durch einen flexiblen Schlauch zu dem Schweißbrenner geführt. Zwischen Drahtende und Werkstück brennt der Lichtbogen, ein Schutzgas schirmt das Schmelzbad gegen die Luft ab.',
    sections: [
      { h: 'Die zwei wichtigsten Einstellungen', html: '<p>An jedem Gerät lassen sich vor allem zwei Einstellungen vornehmen: die <b>Stromstärke</b> (bzw. Spannung) und der <b>Drahtvorschub</b>. Beide Einstellungsmöglichkeiten können sich allerdings gegenseitig beeinflussen. Für Dünnblech von 0,5 bis 2 mm reicht in der Regel ein Draht mit 0,6 mm Durchmesser.</p>' },
      { h: 'MIG oder MAG?', html: '<p>MIG steht für Metall-Inertgas, MAG für Metall-Aktivgas. Beim MIG-Schweißen werden ausschließlich inerte Gase wie Helium, Argon oder deren Gemische verwendet. Beim MAG-Schweißen kommen aktive Gase wie Kohlendioxid oder Sauerstoff zum Einsatz, meist im Gemisch mit Argon.</p>' },
      { h: 'Weiterlesen', html: '<ul><li><a href="/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen/">MIG/MAG: Verfahren und Anwendungsbereich</a></li><li><a href="/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen-2-2/">MIG/MAG: Werkstoffe</a></li><li><a href="/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen-2-2-2/">MIG/MAG: Gas</a></li><li><a href="/ratgeber/schweissanleitung/mig-mag-schweissen-video-anleitung/">MIG/MAG-Schweißen: Video-Anleitung</a></li></ul>' }
    ],
    viz: ['mag', 'shield'],
    video: 'Z-NRvJHSq8w',
    kurs: 'mig-mag-einsteiger-schweisskurs',
    related: ['/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mag-schweissen/', '/ratgeber/schweissanleitung/haltung-beim-schweissen/']
  },
  {
    path: '/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen/',
    title: 'MIG/MAG: Verfahren und Anwendungsbereich',
    h1: 'MIG/MAG: Verfahren und Anwendungsbereich',
    description: 'So funktioniert das MIG/MAG-Schweißen: Drahtelektrode, Kontaktrohr, Lichtbogen, Schutzgas – und wo das Verfahren eingesetzt wird.',
    kicker: 'MIG/MAG',
    lead: 'Die abschmelzende Drahtelektrode wird mit einem Motor kontinuierlich nachgeführt und mithilfe des Kontaktrohrs direkt an die Schweißstelle herangeführt. Über das Kontaktrohr wird auch der Schweißstrom auf den Draht übertragen.',
    sections: [
      { h: 'Ablauf im Brenner', html: '<ol><li>Das Drahtvorschubgerät schiebt den Draht durch das Schlauchpaket.</li><li>Im Kontaktrohr geht der Strom auf den Draht über.</li><li>Zwischen Drahtende und Werkstück zündet der Lichtbogen und schmilzt Draht und Grundwerkstoff.</li><li>Die Gasdüse umhüllt Lichtbogen und Schmelzbad mit Schutzgas.</li></ol>' },
      { h: 'Anwendungsbereiche', html: '<p>MAG-Schweißen wird vornehmlich bei Stahl angewandt – vom Karosseriebau über den Stahl- und Metallbau bis zur Landtechnik. MIG-Schweißen wird für Nichteisenmetalle wie Aluminium, Kupfer und Nickel sowie für hochlegierte Stähle eingesetzt. Das Verfahren ist leicht zu automatisieren und deshalb auch im Roboterschweißen Standard.</p>' },
      { h: 'Vorteile und Grenzen', html: '<ul><li>Hohe Schweißgeschwindigkeit und Abschmelzleistung</li><li>Gut erlernbar, da der Draht automatisch nachgeführt wird</li><li>Im Freien windempfindlich, weil das Schutzgas verweht</li><li>Spritzer müssen ggf. nachgearbeitet werden</li></ul>' }
    ],
    viz: ['mag'],
    kurs: 'mig-mag-einsteiger-schweisskurs',
    related: ['/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen-2-2/', '/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen-2-2-2/']
  },
  {
    path: '/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen-2-2/',
    title: 'MIG/MAG-Schweißen: Werkstoffe',
    h1: 'MIG/MAG-Schweißen: Werkstoffe',
    description: 'Welche Werkstoffe lassen sich MIG oder MAG schweißen? Unlegierte, niedriglegierte und hochlegierte Stähle, Aluminium, Kupfer und Nickel.',
    kicker: 'MIG/MAG',
    lead: 'MIG und MAG unterscheiden sich vor allem durch das Schutzgas – und damit durch die Werkstoffe, für die sie geeignet sind.',
    sections: [
      { h: 'MAG – aktive Gase', html: '<p>MAG-Schweißen mit aktiven Gasen eignet sich für <b>unlegierte und niedriglegierte Stähle</b> sowie warmfeste Stähle. Der Anteil an CO₂ bzw. Sauerstoff im Mischgas verbessert Einbrand und Nahtform.</p>' },
      { h: 'MIG – inerte Gase', html: '<p>MIG-Schweißen mit inerten Gasen wird für <b>hochlegierte Stähle</b> sowie für <b>Aluminium, Kupfer, Nickel</b> und deren Legierungen verwendet. Bei Aluminium ist reines Argon üblich.</p>' },
      { h: 'Praxis-Tipp: Drahtführung', html: '<p>Rückstände aus verkupferten Stahldrähten in der Drahtführungsseele können hochlegierte Nähte verunreinigen. Eine Seele, die für unlegierten Draht genutzt wurde, sollte deshalb nicht für hochlegierte Werkstoffe weiterverwendet werden. Für Aluminium wird eine Kunststoffseele eingesetzt.</p>' }
    ],
    viz: ['matrix'],
    related: ['/ratgeber/metall/metalle/', '/ratgeber/metall/schweissen-mit-rostfreiem-stahl/', '/ratgeber/metall/aluminium-schweissen-alu-schweissen/']
  },
  {
    path: '/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen-2-2-2/',
    title: 'MIG/MAG-Schweißen – Gas',
    h1: 'MIG/MAG-Schweißen: Gas',
    description: 'Welches Gas zum MIG/MAG-Schweißen? Inerte und aktive Schutzgase, Mischgase und typische Fehler bei der Gaswahl.',
    kicker: 'MIG/MAG',
    lead: 'Das Schutzgas schirmt das Schmelzbad gegen die Umgebungsluft ab und beeinflusst Einbrand, Tropfenübergang und Nahtbild.',
    sections: [
      { h: 'Gaswahl nach Werkstoff', html: '<table><thead><tr><th>Werkstoff</th><th>Verfahren</th><th>Typisches Gas</th></tr></thead><tbody><tr><td>Unlegierter Stahl</td><td>MAG</td><td>Argon/CO₂-Mischgas oder CO₂</td></tr><tr><td>Hochlegierter Stahl (Edelstahl)</td><td>MAG</td><td>Argon mit geringem CO₂- bzw. O₂-Anteil</td></tr><tr><td>Aluminium</td><td>MIG</td><td>Argon, ggf. Argon/Helium</td></tr></tbody></table>' },
      { h: 'Typischer Fehler', html: '<p>Wenn zum Verschweißen von hochlegiertem Material anstatt „Mischgas 2“ ein „Mischgas 18“ verwendet wird, wird die Schweißnaht mit sehr hoher Wahrscheinlichkeit rosten – der hohe CO₂-Anteil verändert die Legierung im Nahtbereich.</p>' }
    ],
    viz: ['shield'],
    related: ['/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mag-schweissen/', '/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mig-schweissen/', '/ratgeber/gase/aufgaben-und-auswirkungen-des-schutzgases/']
  },
  {
    path: '/ratgeber/schweissverfahren/wig-schweissen/',
    title: 'WIG-Schweißen – Verfahren, Zündung, Schweißgerät',
    h1: 'WIG-Schweißen',
    description: 'WIG-Schweißen (TIG) erklärt: Wolframelektrode, inertes Schutzgas, Zündung des Lichtbogens, Schweißgerät und Anwendungen.',
    kicker: 'Schweißverfahren',
    lead: 'Beim Wolfram-Inertgas-Schweißen (WIG, englisch TIG) brennt der Lichtbogen zwischen einer nicht abschmelzenden Wolframelektrode und dem Werkstück. Das Verfahren liefert spritzerfreie, saubere Nähte an nahezu allen schweißbaren Metallen.',
    sections: [
      { h: 'Kapitel', html: '<ul><li><a href="/ratgeber/schweissverfahren/wig-schweissen/wig-schweissverfahren/">Das WIG-Schweißverfahren im Überblick</a></li><li><a href="/ratgeber/schweissverfahren/wig-schweissen/zuendung-des-lichtbogens/">Zündung des Lichtbogens</a></li><li><a href="/ratgeber/schweissverfahren/wig-schweissen/schweissgeraet/">Das WIG-Schweißgerät</a></li><li><a href="/wig-tig-schweisen-video-anleitung/">WIG (TIG)-Schweißen: Video-Anleitung</a></li></ul>' }
    ],
    viz: ['wig', 'alu'],
    kurs: 'wig-einsteiger-schweisskurs',
    related: ['/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-wig-schweissen/', '/ratgeber/schweisszubehoer/wig-schweissgeraete/']
  },
  {
    path: '/ratgeber/schweissverfahren/wig-schweissen/wig-schweissverfahren/',
    title: 'Das WIG-Schweißverfahren im Überblick',
    h1: 'Das WIG-Schweißverfahren im Überblick',
    description: 'WIG-Schweißen: nicht abschmelzende Wolframelektrode, inertes Schutzgas (Argon, Helium), Zusatzwerkstoff von Hand, Gleich- und Wechselstrom.',
    kicker: 'WIG',
    lead: 'WIG steht für Wolfram-Inertgas-Schweißen. Die Elektrode aus Wolfram schmilzt nicht ab, als Schutzgas dienen inerte Gase – zum Beispiel Argon und Helium.',
    sections: [
      { h: 'Funktionsweise', html: '<p>Der Lichtbogen brennt zwischen der Wolframelektrode und dem Werkstück. Den Zusatzwerkstoff – einen Schweißstab – führt der Schweißer mit der zweiten Hand dem Schmelzbad zu. Strom und Zusatz lassen sich dadurch unabhängig voneinander steuern, oft zusätzlich mit einem Fußpedal.</p>' },
      { h: 'Gleichstrom oder Wechselstrom', html: '<p>Stahl, Edelstahl und Kupfer werden mit <b>Gleichstrom</b> geschweißt, die Elektrode liegt am Minuspol. <b>Aluminium und Magnesium</b> werden mit <b>Wechselstrom</b> geschweißt: In der Plusphase wird die Oxidschicht aufgebrochen, in der Minusphase gelangt die Wärme ins Werkstück.</p>' },
      { h: 'Vor- und Nachteile', html: '<ul><li>Saubere, spritzerfreie Nähte mit hoher Qualität</li><li>Für fast alle Metalle und dünne Bleche geeignet</li><li>Langsamer als MIG/MAG, verlangt mehr Übung</li></ul>' }
    ],
    viz: ['wig', 'shield'],
    kurs: 'wig-einsteiger-schweisskurs',
    related: ['/ratgeber/schweissverfahren/wig-schweissen/zuendung-des-lichtbogens/', '/ratgeber/schweissverfahren/wig-schweissen/schweissgeraet/']
  },
  {
    path: '/ratgeber/schweissverfahren/wig-schweissen/zuendung-des-lichtbogens/',
    title: 'Zündung des Lichtbogens beim WIG-Schweißen',
    h1: 'Zündung des Lichtbogens beim WIG-Schweißen',
    description: 'Wie zündet der Lichtbogen beim WIG-Schweißen? Hochfrequenzzündung, Lift-Arc und Kontaktzündung im Vergleich.',
    kicker: 'WIG',
    lead: 'Damit die Wolframelektrode nicht verunreinigt wird, zünden moderne WIG-Geräte den Lichtbogen berührungslos – meist mit Hochfrequenz.',
    sections: [
      { h: 'Hochfrequenzzündung (HF)', html: '<p>Ein Hochspannungsimpuls ionisiert die Gasstrecke zwischen Elektrode und Werkstück, der Lichtbogen springt über, ohne dass die Elektrode das Werkstück berührt. Wichtig: Wegen der Hochfrequenz dürfen Personen mit <b>Herzschrittmacher</b> nicht WIG-schweißen.</p>' },
      { h: 'Lift-Arc', html: '<p>Die Elektrode wird kurz auf das Werkstück aufgesetzt und wieder angehoben. Das Gerät begrenzt dabei den Strom, sodass die Elektrode kaum verschleißt. Lift-Arc stört andere Elektronik nicht.</p>' },
      { h: 'Kontaktzündung', html: '<p>Die einfachste Form: Die Elektrode wird wie ein Streichholz über das Werkstück gestrichen. Dabei kann Wolfram ins Schmelzbad gelangen – für hochwertige Nähte ungeeignet.</p>' }
    ],
    viz: ['wig'],
    kurs: 'wig-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/schweissverfahren/wig-schweissen/schweissgeraet/',
    title: 'Das WIG-Schweißgerät – Aufbau und Brenner',
    h1: 'Das WIG-Schweißgerät',
    description: 'Aufbau eines WIG-Schweißgeräts: Stromquelle, Brenner mit Wolframelektrode und Spannhülse, Gasdüse, Masseklemme und Fußpedal.',
    kicker: 'WIG',
    lead: 'Ein WIG-Schweißgerät besteht aus Stromquelle, Schlauchpaket mit Brenner, Masseleitung und der Gasversorgung. Der Brenner enthält im Wesentlichen eine Wolframelektrode, die von einer Spannhülse gehalten wird.',
    sections: [
      { h: 'Der Brenner', html: '<ul><li><b>Wolframelektrode</b> – angeschliffen, je nach Stromart spitz oder leicht abgestumpft</li><li><b>Spannhülse</b> – hält die Elektrode und überträgt den Strom</li><li><b>Gasdüse</b> aus Keramik – lenkt das Schutzgas über die Schweißstelle</li><li><b>Brennertaster</b> – startet Gasvorströmung und Zündung</li></ul>' },
      { h: 'Die Stromquelle', html: '<p>DC-Geräte schweißen Stahl und Edelstahl. AC/DC-Geräte schweißen zusätzlich Aluminium. Komfortfunktionen wie Pulsen, Up- und Downslope oder ein Fußpedal erleichtern das Arbeiten an dünnen Blechen.</p>' }
    ],
    viz: ['wig'],
    kurs: 'wig-einsteiger-schweisskurs',
    related: ['/ratgeber/schweisszubehoer/wig-schweissgeraete/']
  },
  {
    path: '/ratgeber/schweissverfahren/elektroden-schweissen/',
    title: 'Elektroden-Schweißen (E-Hand) – Verfahren und Praxis',
    h1: 'Elektroden-Schweißen',
    description: 'Elektrodenschweißen erklärt: Lichtbogen zwischen Stabelektrode und Werkstück, Umhüllung, Schlacke, Elektrodentypen und Einsatzbereiche.',
    kicker: 'Schweißverfahren',
    lead: 'Bei diesem Schweißverfahren wird ein elektrischer Lichtbogen, der zwischen einer Elektrode und dem Werkstück brennt, als Wärmequelle zum Schweißen genutzt.',
    sections: [
      { h: 'Funktionsweise', html: '<p>Die Stabelektrode ist zugleich Stromträger und Zusatzwerkstoff. Ihre Umhüllung verbrennt im Lichtbogen, bildet ein Schutzgas und eine Schlacke, die die erkaltende Naht abdeckt. Eine Gasflasche ist nicht nötig – das macht das Verfahren mobil und windunempfindlich.</p>' },
      { h: 'Schwieriger als MAG', html: '<p>Das Nachschieben der kürzer werdenden Stabelektrode und das Abschlagen der Schlacke machen das Verfahren anspruchsvoller als das MAG-Schweißen. Für dünne Bleche ist es nicht geeignet.</p>' },
      { h: 'Elektrodentypen', html: '<ul><li><b>Rutil</b> – gutes Zünd- und Wiederzündverhalten, leicht entfernbare Schlacke, schönes Nahtbild</li><li><b>Basisch</b> – hohe Zähigkeit für tragende Verbindungen, meist am Pluspol</li><li><b>Zellulose</b> – für Fallnähte und Rohrleitungen</li></ul>' }
    ],
    viz: ['e', 'joints'],
    kurs: 'elektroden-einsteiger-schweisskurs',
    related: ['/ratgeber/schweisszubehoer/elektroden-schweissgeraete/', '/glossary/lichtbogenhandschweissen/']
  },
  {
    path: '/ratgeber/schweissverfahren/autogenschweissen-gasschmelzschweissen/',
    title: 'Autogenschweißen / Gasschmelzschweißen',
    h1: 'Autogenschweißen / Gasschmelzschweißen',
    description: 'Autogenschweißen erklärt: Acetylen-Sauerstoff-Flamme mit 3.200 °C, Zusatzdraht, Anwendungen im Karosseriebau und in der Heizungs- und Rohrinstallation.',
    kicker: 'Schweißverfahren',
    lead: 'Beim Autogenschweißen werden Metalle durch die Hitze verbrennender Gase geschmolzen – meist Acetylen und Sauerstoff. Die Flamme erreicht eine Temperatur von rund 3.200 °C.',
    sections: [
      { h: 'Ablauf', html: '<p>Die Flamme schmilzt die Kanten der Werkstücke auf, der Zusatzdraht wird vor oder hinter der Flamme zugeführt (Nach-links- bzw. Nach-rechts-Schweißen). Durch die Einstellung des Gasverhältnisses entsteht eine neutrale, reduzierende oder oxidierende Flamme.</p>' },
      { h: 'Anwendung', html: '<p>Das Verfahren eignet sich für dünne Bleche, etwa im Karosseriebau, und wird in der Heizungs- und Rohrinstallation eingesetzt. Mit derselben Ausrüstung lässt sich auch hartlöten, wärmen und brennschneiden.</p>' },
      { h: 'Grenzen', html: '<p>Im Vergleich zu anderen Schweißverfahren ist das Autogenschweißen sehr langsam und wird deshalb immer weniger eingesetzt. Für Restaurierung und Installation bleibt es unverzichtbar.</p>' }
    ],
    viz: ['autogen', 'bottles'],
    kurs: 'autogen-einsteiger-schweisskurs',
    related: ['/ratgeber/gase/farben-gasflaschen/', '/ratgeber/gase/gassorten/']
  }
];
