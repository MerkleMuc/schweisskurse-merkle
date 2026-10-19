import type { RatgeberSeite } from './types';

export const ZUBEHOER: RatgeberSeite[] = [
  {
    path: '/ratgeber/schweisszubehoer/',
    title: 'Schweißzubehör / Schweißgeräte – Ratgeber',
    h1: 'Schweißzubehör / Schweißgeräte',
    description: 'Schweißgeräte, Verbrauchsmaterial und Schutzkleidung: worauf es beim Kauf ankommt – Stromquelle, Drahtvorschub, Schutzgas und Ersatzteile.',
    kicker: 'Ratgeber Zubehör',
    lead: 'Rund ums Schweißen unterscheidet man Schweißgeräte, Verbrauchsmaterial und Schutzkleidung. Geräte unterscheiden sich nach Stromquelle, Drahtvorschub und danach, ob überhaupt ein Schutzgas genutzt wird.',
    sections: [
      { h: 'Schweißgeräte', html: '<ul><li><a href="/ratgeber/schweisszubehoer/elektroden-schweissgeraete/">Elektroden-Schweißgeräte</a> – günstig, mobil, robust</li><li><a href="/ratgeber/schweisszubehoer/wig-schweissgeraete/">WIG-Schweißgeräte</a> – für nahezu alle Metalle und Blechstärken</li><li>MIG/MAG-Schutzgasgeräte – die Allrounder für Werkstatt und Hobby</li></ul>' },
      { h: 'Ersatzteile beachten', html: '<p>Nicht alle Bauteile an Schweißgeräten sind genormt. Achten Sie beim Kauf darauf, dass Verschleißteile wie Stromdüsen, Gasdüsen und Drahtrollen langfristig verfügbar sind – im Fachhandel bekommen Sie Beratung und Service aus einer Hand.</p>' },
      { h: 'Verbrauchsmaterial und Schutz', html: '<p>Drähte, Elektroden, Schweißstäbe, Gas und Schutzausrüstung bestimmen die Qualität der Naht und Ihre Sicherheit. Mehr unter <a href="/ratgeber/schweisszubehoer/schweisser-berufskleidung-schutzkleidung-schweisser/">Schutzkleidung</a> und <a href="/ratgeber/schweisszubehoer/schutzgase-aktive-und-inerte-schutzgase/">Schutzgase</a>.</p>' }
    ],
    viz: ['matrix'],
    related: ['/ratgeber/schweisszubehoer/elektroden-schweissgeraete/', '/ratgeber/schweisszubehoer/wig-schweissgeraete/']
  },
  {
    path: '/ratgeber/schweisszubehoer/elektroden-schweissgeraete/',
    title: 'Elektroden-Schweißgeräte – Ratgeber',
    h1: 'Elektroden-Schweißgeräte',
    description: 'Elektroden-Schweißgeräte (E-Hand): die günstigsten Schweißgeräte, Inverter-Technik, Betrieb am Generator und Tipps zum Gebrauchtkauf.',
    kicker: 'Zubehör',
    lead: 'Elektroden-Schweißgeräte sind die günstigsten Schweißgeräte. Sie sind auch dort nützlich, wo keine Stromversorgung vorhanden ist – am Generator oder mit eingebautem Aggregat.',
    sections: [
      { h: 'Inverter-Geräte', html: '<p>Inverter-Schweißgeräte sind dank kleiner Transformatoren leicht und kompakt und lassen sich gut auf die Baustelle mitnehmen. Sie zünden leichter und bieten Komfortfunktionen wie Hot-Start und Anti-Stick.</p>' },
      { h: 'Gebraucht kaufen?', html: '<p>Ein gebrauchtes Gerät kann eine sinnvolle Anschaffung sein – idealerweise geprüft und mit Gewährleistung, etwa über <a href="https://www.gebrauchte-schweissgeraete.de/" rel="noopener">gebrauchte-schweissgeraete.de</a> von Merkle.</p>' }
    ],
    viz: ['e'],
    kurs: 'elektroden-einsteiger-schweisskurs'
  },
  {
    path: '/ratgeber/schweisszubehoer/wig-schweissgeraete/',
    title: 'WIG-Schweißgeräte – Ratgeber',
    h1: 'WIG-Schweißgeräte',
    description: 'WIG-Schweißgeräte: für nahezu alle Metalle und Materialstärken einsetzbar, DC oder AC/DC, Puls, Fußpedal – worauf es beim Kauf ankommt.',
    kicker: 'Zubehör',
    lead: 'WIG-Schweißgeräte lassen sich für fast alle Metallarten und Materialstärken einsetzen.',
    sections: [
      { h: 'DC oder AC/DC?', html: '<p>Wer nur Stahl und Edelstahl schweißt, kommt mit einem DC-Gerät aus. Für Aluminium und Magnesium wird ein AC/DC-Gerät benötigt.</p>' },
      { h: 'Ausstattung', html: '<ul><li>Hochfrequenzzündung oder Lift-Arc</li><li>Pulsfunktion für dünne Bleche</li><li>Fußpedal zur Stromregelung während des Schweißens</li><li>Gasvor- und Gasnachströmung einstellbar</li></ul>' }
    ],
    viz: ['wig'],
    kurs: 'wig-einsteiger-schweisskurs',
    related: ['/ratgeber/schweissverfahren/wig-schweissen/schweissgeraet/']
  },
  {
    path: '/ratgeber/schweisszubehoer/schweisser-berufskleidung-schutzkleidung-schweisser/',
    title: 'Schweißer-Schutzkleidung und Berufskleidung',
    h1: 'Schweißer-Schutzkleidung und Berufskleidung',
    description: 'Schutzkleidung für Schweißer: Schweißhelm mit Automatikfilter gegen UV- und IR-Strahlung, Handschuhe, Schweißerjacke, Schürze, Sicherheitsschuhe und Atemschutz.',
    kicker: 'Zubehör',
    lead: 'Schweißen ohne Schutz ist gefährlich: Der Lichtbogen strahlt UV- und Infrarotlicht ab, dazu kommen Funken, Spritzer und Rauch.',
    sections: [
      { h: 'Schweißhelm', html: '<p>Der Schweißhelm hat zwei Aufgaben: Er schützt Kopf und Augen vor Funken und Metallsplittern und er filtert das grelle Licht sowie die UV- und IR-Strahlung des Lichtbogens. Moderne Helme haben einen <b>Automatikfilter</b>, der sich innerhalb von Millisekunden nach dem Zünden verdunkelt.</p>' },
      { h: 'Die komplette Ausrüstung', html: '<ul><li>Schweißerhandschuhe – für WIG dünn und feinfühlig, für MAG/E-Hand robust</li><li>Schweißerjacke oder schwer entflammbare Kleidung aus Baumwolle</li><li>Lederschürze bei Überkopfarbeit</li><li>Sicherheitsschuhe</li><li>Atemschutz bzw. Absaugung bei Schweißrauch</li></ul>' }
    ],
    viz: ['shield']
  },
  {
    path: '/ratgeber/schweisszubehoer/schutzgase-aktive-und-inerte-schutzgase/',
    title: 'Schutzgasschweißen – aktive und inerte Schutzgase',
    h1: 'Schutzgasschweißen: aktive und inerte Schutzgase',
    description: 'Unterschied zwischen aktiven und inerten Schutzgasen: Argon und Helium reagieren nicht, CO₂ und O₂ nehmen am Prozess teil. Einsatz bei MIG, MAG und WIG.',
    kicker: 'Zubehör',
    lead: 'Inerte Gase wie Argon und Helium reagieren weder mit der Elektrode noch mit dem Schmelzbad und halten die Luft von der Schweißstelle fern. Aktive Gase nehmen am Schweißprozess teil.',
    sections: [
      { h: 'Inert', html: '<p>Argon, Helium und ihre Gemische – für WIG und MIG. Helium ist deutlich teurer, weil es nicht in der Umgebungsluft vorkommt und gewonnen werden muss.</p>' },
      { h: 'Aktiv', html: '<p>CO₂ und Sauerstoff, meist mit Argon gemischt – für MAG an Stahl. Sie verbessern Einbrand und Benetzung.</p>' }
    ],
    viz: ['shield'],
    related: ['/ratgeber/gase/aufgaben-und-auswirkungen-des-schutzgases/']
  }
];
