import type { RatgeberSeite } from './types';

export const PRAXIS: RatgeberSeite[] = [
  {
    path: '/ratgeber/schweissanleitung/',
    title: 'Video-Anleitung zum Schweißen – Schweißanleitungen',
    h1: 'Video-Anleitung zum Schweißen',
    description: 'Schweißanleitungen mit Video: MIG/MAG und WIG Schritt für Schritt, Nahtformen, Kehlnaht, Punkt- und Intervallschweißen und die richtige Haltung beim Schweißen.',
    kicker: 'Schweißanleitung',
    lead: 'Unsere Anleitungen zeigen Schritt für Schritt, wie eine saubere Naht entsteht – mit Videos, Winkelangaben und den häufigsten Fehlern.',
    sections: [
      { h: 'Anleitungen', html: '<ul><li><a href="/ratgeber/schweissanleitung/mig-mag-schweissen-video-anleitung/">MIG/MAG-Schweißen: Video-Anleitung</a></li><li><a href="/wig-tig-schweisen-video-anleitung/">WIG (TIG)-Schweißen: Video-Anleitung</a></li><li><a href="/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/">Schweißnähte und Schweißnahtformen</a></li><li><a href="/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/kehlnaht-schweissen/">Kehlnaht schweißen</a></li><li><a href="/ratgeber/schweissanleitung/intervallschweissen-punktschweissen/">Intervallschweißen und Punktschweißen</a></li><li><a href="/ratgeber/schweissanleitung/haltung-beim-schweissen/">Haltung beim Schweißen</a></li></ul>' },
      { h: 'Autogen im Video', html: '<p>Beim Autogenschweißen werden Metalle durch Hitzeeinwirkung geschmolzen. Wie die Flamme eingestellt und geführt wird, zeigen wir im <a href="/autogen-einsteiger-schweisskurs/">Autogen-Einsteigerkurs</a> und in der <a href="/lehrbuch/">Merkle Videothek</a>.</p>' }
    ],
    viz: ['torch', 'joints'],
    video: 'Z-NRvJHSq8w',
    kurs: 'mig-mag-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/schweissanleitung/mig-mag-schweissen-video-anleitung/',
    title: 'MIG-MAG-Schweißen: Video-Anleitung',
    h1: 'MIG/MAG-Schweißen: Video-Anleitung',
    description: 'MIG/MAG-Schweißen lernen per Video: Gerät einstellen, Brenner führen, Naht ziehen. MIG = Metall-Inertgas, MAG = Metall-Aktivgas.',
    kicker: 'Video-Anleitung',
    lead: 'MIG steht für Metall-Inertgas: Das ausströmende Gas schützt das Schmelzbad vor dem Sauerstoff der Luft. MAG bezeichnet die Verwendung eines aktiven Gases.',
    sections: [
      { h: 'Schritt für Schritt', html: '<ol><li><b>Vorbereiten:</b> Werkstück blank schleifen, Masseklemme nah an der Schweißstelle anbringen.</li><li><b>Einstellen:</b> Spannung und Drahtvorschub nach Blechdicke wählen, Gasmenge ca. 10–15 l/min.</li><li><b>Haltung:</b> Brenner leicht stechend (10–15°) führen, Drahtüberstand ca. 10 mm.</li><li><b>Schweißen:</b> Gleichmäßig führen und auf ein gleichmäßiges Prasseln des Lichtbogens achten.</li><li><b>Prüfen:</b> Naht auf Poren, Bindefehler und Einbrandkerben kontrollieren.</li></ol>' },
      { h: 'Häufige Fehler', html: '<ul><li>Zu wenig Gas oder Zugluft → Poren</li><li>Zu hohe Geschwindigkeit → schmale, überhöhte Naht ohne Einbrand</li><li>Zu großer Abstand → unruhiger Lichtbogen, viele Spritzer</li></ul>' }
    ],
    viz: ['mag', 'torch'],
    video: 'Z-NRvJHSq8w',
    kurs: 'mig-mag-einsteiger-schweisskurs',
    related: ['/ratgeber/schweissanleitung/haltung-beim-schweissen/', '/ratgeber/schweissverfahren/mig-mag-schweissen/']
  },
  {
    path: '/wig-tig-schweisen-video-anleitung/',
    title: 'WIG (TIG)-Schweißen: Video-Anleitung',
    h1: 'WIG (TIG)-Schweißen: Video-Anleitung',
    description: 'WIG-Schweißen per Video lernen: Elektrode anschleifen, Gas einstellen, Lichtbogen zünden, Schweißstab zuführen.',
    kicker: 'Video-Anleitung',
    lead: 'Beim WIG-Schweißen arbeiten beide Hände: Die eine führt den Brenner, die andere den Schweißstab. So geht es Schritt für Schritt.',
    sections: [
      { h: 'Schritt für Schritt', html: '<ol><li><b>Elektrode anschleifen:</b> längs, für Gleichstrom spitz.</li><li><b>Gas einstellen:</b> Argon, etwa 6–10 l/min.</li><li><b>Zünden:</b> per Hochfrequenz oder Lift-Arc, Abstand 2–3 mm.</li><li><b>Schmelzbad bilden:</b> warten, bis ein glänzendes Bad entsteht.</li><li><b>Stab zuführen:</b> in kurzen Takten am Rand des Schmelzbads tupfen, Brenner gleichmäßig weiterführen.</li><li><b>Ausklingen:</b> Strom absenken, Gasnachströmung abwarten.</li></ol>' }
    ],
    viz: ['wig'],
    kurs: 'wig-einsteiger-schweisskurs',
    related: ['/ratgeber/schweissverfahren/wig-schweissen/wig-schweissverfahren/', '/ratgeber/schweissverfahren/wig-schweissen/zuendung-des-lichtbogens/']
  },
  {
    path: '/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/',
    title: 'Schweißnähte und Schweißnahtformen',
    h1: 'Schweißnähte und Schweißnahtformen',
    description: 'Die wichtigsten Schweißnahtformen: Stumpfnaht, Kehlnaht, Ecknaht und Überlappnaht – mit Querschnitten und Anwendungen.',
    kicker: 'Schweißanleitung',
    lead: 'Wie zwei Bauteile zueinander stehen, bestimmt die Nahtform. Die vier Grundformen begegnen Ihnen in jedem Schweißkurs.',
    sections: [
      { h: 'Die Grundformen', html: '<ul><li><b>Stumpfnaht</b> – Bleche liegen in einer Ebene Kante an Kante. Bei dickeren Blechen werden die Kanten vorbereitet (V-, X-, U-Naht).</li><li><b>Kehlnaht</b> – Bleche stehen im Winkel zueinander (T-Stoß), die Naht liegt in der Kehle. <a href="/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/kehlnaht-schweissen/">Kehlnaht schweißen</a></li><li><b>Ecknaht</b> – eine Kehlnaht, die entlang der äußeren Kante der Werkstücke verläuft.</li><li><b>Überlappnaht</b> – die Bleche überlappen sich, typisch im Karosseriebau.</li></ul>' },
      { h: 'Lagen', html: '<p>Dickere Nähte werden in mehreren Lagen geschweißt: Wurzellage, Füll- und Decklage. Die Wurzel bestimmt die Durchschweißung und ist bei Prüfungen besonders wichtig.</p>' }
    ],
    viz: ['joints', 'positions'],
    related: ['/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/kehlnaht-schweissen/', '/ratgeber/schweissanleitung/haltung-beim-schweissen/']
  },
  {
    path: '/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/kehlnaht-schweissen/',
    title: 'Kehlnaht-Schweißen – Video-Anleitung',
    h1: 'Kehlnaht-Schweißen',
    description: 'Kehlnaht schweißen mit Video: Brennerhaltung (40–45° seitlich), Anstellwinkel, Drahtvorschub und typische Fehler.',
    kicker: 'Schweißanleitung',
    lead: 'Die Kehlnaht ist die häufigste Naht überhaupt. Unsere Video-Anleitung erklärt unter anderem Brennerhaltung und Drahtvorschub.',
    sections: [
      { h: 'Brennerhaltung', html: '<p>Der Brenner wird in einer seitlichen Neigung von 40 bis 45 Grad zu beiden Blechen gehalten und leicht stechend in Schweißrichtung angestellt. Diese Haltung gilt auch für flache Kehlnähte an dickeren Werkstücken.</p>' },
      { h: 'Tipps', html: '<ul><li>Den Lichtbogen auf die Kehle richten, nicht auf ein Blech.</li><li>Bei ungleich dicken Blechen etwas mehr auf das dickere Blech zielen.</li><li>Einbrandkerben am oberen Blech deuten auf zu viel Strom oder zu hohe Geschwindigkeit hin.</li></ul>' }
    ],
    viz: ['joints', 'torch'],
    video: 'Z-NRvJHSq8w',
    kurs: 'mig-mag-einsteiger-schweisskurs',
    related: ['/ratgeber/schweissanleitung/haltung-beim-schweissen/', '/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/']
  },
  {
    path: '/ratgeber/schweissanleitung/haltung-beim-schweissen/',
    title: 'Haltung beim Schweißen – Brennerwinkel für jede Naht',
    h1: 'Haltung beim Schweißen',
    description: 'Die richtige Brennerhaltung: Winkel für Stumpfnaht, Punktnaht, Ecknaht und Kehlnaht, stechend oder schleppend.',
    kicker: 'Schweißanleitung',
    lead: 'Die Haltung des Brenners entscheidet über Einbrand und Nahtform. Je nach Naht gelten unterschiedliche Winkel.',
    sections: [
      { h: 'Winkel nach Nahtform', html: '<table><thead><tr><th>Naht</th><th>Brennerhaltung</th></tr></thead><tbody><tr><td>Stumpfnaht, Punktnaht</td><td>meist senkrecht, 80–90° zum Werkstück</td></tr><tr><td>Stumpfnaht an Eckverbindung</td><td>80–90°, zusätzlich seitlich um etwa 40–45° geneigt</td></tr><tr><td>Kehlnaht</td><td>seitlich 40–45° zu den Blechen, leicht stechend</td></tr></tbody></table>' },
      { h: 'Stechend oder schleppend', html: '<p><b>Stechend</b> (Brenner zeigt in Schweißrichtung): flacher Einbrand, breite Naht – gut für Dünnblech. <b>Schleppend</b> (Brenner zeigt zur fertigen Naht): tieferer Einbrand, schmalere Naht.</p>' },
      { h: 'Körperhaltung', html: '<p>Stabil stehen oder sitzen, Unterarme auflegen, die Bewegung aus dem ganzen Arm führen. Probieren Sie die Bewegung vor dem Zünden einmal ohne Lichtbogen durch.</p>' }
    ],
    viz: ['torch'],
    kurs: 'mig-mag-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/schweissanleitung/intervallschweissen-punktschweissen/',
    title: 'Intervallschweißen und Punktschweißen',
    h1: 'Intervallschweißen und Punktschweißen',
    description: 'Intervall- und Punktschweißen mit MIG/MAG: Abstände der Schweißpunkte (ca. 20–40 mm), Lochpunktnaht im Karosseriebau, Verzug vermeiden.',
    kicker: 'Schweißanleitung',
    lead: 'Bei dünnen Blechen wird nicht durchgehend geschweißt, sondern in Punkten oder Intervallen – das reduziert Wärmeeintrag und Verzug.',
    sections: [
      { h: 'Punktschweißen', html: '<p>Die Schweißpunkte werden in einem Abstand von etwa 20 bis 40 mm gesetzt. Im Karosseriebau ist die <b>Lochpunktnaht</b> verbreitet: Das obere Blech wird gelocht, durch das Loch wird mit dem unteren Blech verschweißt.</p>' },
      { h: 'Intervallschweißen', html: '<p>Kurze Nahtabschnitte wechseln sich mit Pausen ab. Moderne MIG/MAG-Geräte haben dafür eine Intervallfunktion mit einstellbarer Schweiß- und Pausenzeit. Nach dem Abkühlen werden die Lücken geschlossen.</p>' }
    ],
    viz: ['mag'],
    kurs: 'mig-mag-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/dvd-schweissen-lernen/',
    title: 'Unsere DVDs zum Schweißen-Lernen',
    h1: 'Unsere DVDs zum Schweißen-Lernen',
    description: 'Schweißen lernen mit Video: Merkle-Lehrfilme zu MIG/MAG, WIG, Elektrode und Autogen – heute in der Merkle Videothek und auf YouTube.',
    kicker: 'Lernmedien',
    lead: 'Die Lehrfilme von Merkle zum Schweißen-Lernen finden Sie heute online in der Merkle Videothek und auf dem YouTube-Kanal von Merkle Schweißtechnik.',
    sections: [
      { h: 'Videos statt DVD', html: '<p>Die Inhalte unserer früheren Lern-DVDs stehen als Videos bereit – kostenlos und jederzeit abrufbar. Zur <a href="/lehrbuch/">Merkle Videothek</a>.</p>' },
      { h: 'Und dann: selbst schweißen', html: '<p>Ein Video zeigt, wie es geht – ein Kurs zeigt, wie es sich anfühlt. In unseren <a href="/schweisskurse-lehrgaenge/">Schweißkursen</a> üben Sie am eigenen Schweißplatz.</p>' }
    ],
    video: 'Z-NRvJHSq8w'
  }
];
