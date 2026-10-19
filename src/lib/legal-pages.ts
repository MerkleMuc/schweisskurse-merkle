import { SITE, STANDORTE } from './site';
import { WIDERRUFSBELEHRUNG, MUSTER_WIDERRUFSFORMULAR, LEGAL_VERSION } from './legal';

/*
 * Rechtstexte als strukturierte Abschnitte. Impressumsangaben aus dem
 * Bestand von merkle-muenchen.de; AGB und Datenschutz sind auf das
 * Kursangebot und die Funktionen dieser Website zugeschnitten.
 * Vor Veröffentlichung juristisch prüfen lassen (siehe docs/TODO.md).
 */
export interface LegalSection { h: string; p: string[] }
const I = SITE.impressum;
const M = STANDORTE.muenchen;
const H = STANDORTE.hamburg;

export const IMPRESSUM: LegalSection[] = [
  { h: 'Angaben gemäß § 5 DDG', p: [`${SITE.legalName}<br>${I.street}<br>${I.zip} ${I.city}`, `Telefon: ${I.tel}<br>E-Mail Schweißkurse: <a href="mailto:${SITE.email}">${SITE.email}</a><br>E-Mail allgemein: <a href="mailto:${I.mail}">${I.mail}</a>`] },
  { h: 'Vertreten durch', p: [`Geschäftsführer: ${I.geschaeftsfuehrer}`] },
  { h: 'Registereintrag', p: [`Registergericht: ${I.registergericht}<br>Registernummer: ${I.hrb}`] },
  { h: 'Umsatzsteuer', p: [`Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: ${I.ustid}`] },
  { h: 'Kursstandort Region Hamburg', p: [`${H.firma}<br>${H.street}, ${H.zip} ${H.city}<br>Telefon: ${H.tel.text}`] },
  { h: 'Verbraucherstreitbeilegung', p: ['Wir nehmen nicht an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil.'] },
  { h: 'Haftung für Inhalte', p: ['Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'] },
  { h: 'Haftung für Links', p: ['Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.'] },
  { h: 'Urheberrecht', p: ['Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'] }
];

export const AGB: LegalSection[] = [
  { h: '§ 1 Geltungsbereich', p: [`Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über die Teilnahme an Schweißkursen, Aufbaukursen und Lehrgängen (nachfolgend „Kurse“) zwischen der ${SITE.legalName}, ${M.street}, ${M.zip} ${M.city} (nachfolgend „Merkle“) und den Kundinnen und Kunden (nachfolgend „Kunde“). Kunde kann ein Verbraucher (§ 13 BGB) oder ein Unternehmer (§ 14 BGB) sein. Abweichende Bedingungen des Kunden gelten nicht.`] },
  { h: '§ 2 Vertragsschluss', p: [
    'Die Darstellung der Kurse und Termine auf der Website ist kein verbindliches Angebot, sondern eine Aufforderung zur Buchung.',
    'Mit Klick auf die Schaltfläche „Zahlungspflichtig buchen“ gibt der Kunde ein verbindliches Angebot zur Teilnahme an dem gewählten Termin ab. Vor dem Absenden kann der Kunde seine Eingaben jederzeit prüfen und korrigieren.',
    'Merkle bestätigt den Eingang der Buchung unverzüglich per E-Mail. Mit dieser Buchungsbestätigung kommt der Vertrag zustande; der Kursplatz ist ab diesem Zeitpunkt verbindlich reserviert. Buchungen per Telefon oder E-Mail werden ebenfalls mit der Bestätigung durch Merkle verbindlich.',
    'Der Vertragstext wird von Merkle gespeichert und dem Kunden mit der Buchungsbestätigung einschließlich dieser AGB und der Widerrufsbelehrung in Textform übermittelt.'
  ] },
  { h: '§ 3 Preise und Zahlung', p: [
    'Es gelten die zum Zeitpunkt der Buchung angegebenen Preise. Alle Preise verstehen sich pro Person in Euro einschließlich der gesetzlichen Umsatzsteuer.',
    'Die Zahlung erfolgt nach Wahl des Kunden per PayPal oder per Vorkasse (Überweisung). Der Kursbeitrag ist innerhalb von 7 Tagen nach Erhalt der Buchungsbestätigung, spätestens jedoch vor Kursbeginn, ohne Abzug fällig.',
    'Bei einem Kauf einer Schweißanlage ab einem Warenwert von 1.250 € bei Merkle nach einem in München absolvierten Kurs gewährt Merkle einen Nachlass in Höhe von 25 % des Kurspreises. Ausgenommen sind Lehrgänge mit TÜV-Prüfung.'
  ] },
  { h: '§ 4 Stornierung durch den Kunden', p: [
    'Der Kunde kann seine Buchung schriftlich (per E-Mail oder Post) stornieren. Eine kostenfreie Stornierung ist bei eintägigen Kursen bis spätestens 14 Tage vor Kursbeginn, bei Wochenend- und Wochenlehrgängen bis spätestens vier Wochen vor Kursbeginn möglich. Maßgeblich ist der Eingang bei Merkle.',
    'Bei späterer Stornierung oder Nichterscheinen ist der volle Kursbeitrag zu zahlen. Dem Kunden bleibt der Nachweis vorbehalten, dass Merkle kein oder ein geringerer Schaden entstanden ist. Der Kunde kann bis zum Kursbeginn eine Ersatzperson benennen, die die Teilnahmevoraussetzungen erfüllt.',
    'Das gesetzliche Widerrufsrecht für Verbraucher bleibt unberührt (siehe Widerrufsbelehrung).'
  ] },
  { h: '§ 5 Absage oder Änderung durch Merkle', p: [
    'Merkle kann einen Kurs aus wichtigem Grund (z. B. Erkrankung des Dozenten, zu geringe Teilnehmerzahl, höhere Gewalt) absagen oder verschieben. Der Kunde wird unverzüglich informiert. Bereits gezahlte Beträge werden vollständig erstattet oder – nach Wahl des Kunden – auf einen Ersatztermin angerechnet. Weitergehende Ansprüche bestehen nur nach § 8.'
  ] },
  { h: '§ 6 Teilnahme, Sicherheit und Voraussetzungen', p: [
    'Die Teilnehmer sind verpflichtet, den Sicherheitsanweisungen des Dozenten Folge zu leisten und geeignete Kleidung (feste, geschlossene Schuhe, Kleidung aus Baumwolle) zu tragen. Kontaktlinsen dürfen während des Kurses nicht getragen werden.',
    'Personen mit Herzschrittmacher dürfen an Kursen mit Hochfrequenzzündung (WIG) nicht teilnehmen. Der Kunde ist verpflichtet, Merkle vor Kursbeginn über gesundheitliche Einschränkungen zu informieren, die die Teilnahme gefährden könnten.',
    'Aufbaukurse setzen den Besuch des jeweils angegebenen Einsteigerkurses oder vergleichbare Kenntnisse voraus.',
    'Merkle kann Teilnehmer, die trotz Hinweis gegen Sicherheitsanweisungen verstoßen, von der weiteren Teilnahme ausschließen. Der Anspruch auf den Kursbeitrag bleibt in diesem Fall bestehen.'
  ] },
  { h: '§ 7 Abschluss und Bescheinigungen', p: [
    'Teilnehmer der Einsteiger-, Aufbau- und Fortgeschrittenenkurse erhalten eine Teilnahmebescheinigung. Diese berechtigt nicht zum Schweißen prüfpflichtiger Bauteile, insbesondere nicht zu Arbeiten nach EN 1090.',
    'Bei Lehrgängen mit Prüfung nach DIN EN ISO 9606-1 erfolgt die Prüfung durch eine unabhängige Prüfstelle. Ein Prüfungserfolg wird nicht geschuldet.'
  ] },
  { h: '§ 8 Haftung', p: [
    'Merkle haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt. Im Übrigen ist die Haftung ausgeschlossen.',
    'Für mitgebrachte Gegenstände und Geräte der Teilnehmer übernimmt Merkle keine Haftung, es sei denn, der Schaden beruht auf Vorsatz oder grober Fahrlässigkeit.'
  ] },
  { h: '§ 9 Gutscheine', p: ['Gutscheine sind personalisiert und für Kurse am Standort München einlösbar. Sie sind drei Jahre ab dem Ende des Jahres der Ausstellung gültig. Eine Barauszahlung ist ausgeschlossen. Der Termin wird nach Verfügbarkeit vereinbart.'] },
  { h: '§ 10 Datenschutz', p: ['Merkle verarbeitet die Daten des Kunden ausschließlich zur Vertragsabwicklung. Einzelheiten enthält die <a href="/datenschutz/">Datenschutzerklärung</a>.'] },
  { h: '§ 11 Schlussbestimmungen', p: [
    'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit dadurch nicht zwingende Verbraucherschutzvorschriften des Staates des gewöhnlichen Aufenthalts entzogen werden.',
    'Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand München.',
    `Stand: ${LEGAL_VERSION}`
  ] }
];

export const WIDERRUF_SEITE: LegalSection[] = [
  ...WIDERRUFSBELEHRUNG.map((b) => ({ h: b.h, p: b.p })),
  { h: 'Elektronische Widerrufsfunktion', p: ['Sie können Ihren Widerruf über unsere Widerrufsfunktion erklären: <a href="/vertrag-widerrufen/">Vertrag widerrufen</a>. Nach dem Absenden erhalten Sie unverzüglich eine Eingangsbestätigung mit Datum und Uhrzeit per E-Mail.'] },
  { h: 'Muster-Widerrufsformular', p: [MUSTER_WIDERRUFSFORMULAR.replace(/\n/g, '<br>')] }
];

export const DATENSCHUTZ: LegalSection[] = [
  { h: '1. Verantwortlicher', p: [`${SITE.legalName}<br>${I.street}, ${I.zip} ${I.city}<br>Telefon: ${I.tel}<br>E-Mail: <a href="mailto:${I.mail}">${I.mail}</a>`, 'Vertreten durch den Geschäftsführer Siegfried Awissus.'] },
  { h: '2. Überblick', p: ['Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Beantwortung von Anfragen und zur Durchführung gebuchter Kurse erforderlich ist. Wir setzen keine Analyse- oder Marketing-Cookies und kein Tracking ein.'] },
  { h: '3. Hosting und Server-Logfiles', p: ['Beim Aufruf der Website werden technisch notwendige Daten verarbeitet (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser, Betriebssystem, Referrer). Die Verarbeitung dient der Auslieferung und Sicherheit der Website (Art. 6 Abs. 1 lit. f DSGVO). Logfiles werden nach spätestens 14 Tagen gelöscht, sofern sie nicht zur Aufklärung eines Sicherheitsvorfalls benötigt werden.'] },
  { h: '4. Kursbuchung', p: ['Für die Buchung verarbeiten wir Name, Rechnungsanschrift, ggf. Firma und USt-IdNr., E-Mail-Adresse, Telefonnummer, Namen der Teilnehmer, bei Lehrgängen mit Prüfung das Geburtsdatum, Angaben zur Schweißerfahrung, gewählte Zahlungsart sowie die abgegebenen Erklärungen mit Zeitstempel. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertrag) sowie Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Aufbewahrungspflichten). Die Teilnehmerdaten für Prüfungslehrgänge werden an die prüfende Stelle übermittelt, soweit dies für die Prüfung erforderlich ist.', 'Buchungs- und Rechnungsdaten bewahren wir entsprechend den handels- und steuerrechtlichen Fristen (§ 257 HGB, § 147 AO) bis zu zehn Jahre auf.'] },
  { h: '5. Zahlung über PayPal', p: ['Wählen Sie PayPal, erfolgt die Zahlung über PayPal (Europe) S.à r.l. et Cie, S.C.A., 22–24 Boulevard Royal, L-2449 Luxemburg. Dabei werden die zur Zahlung erforderlichen Daten (Betrag, Buchungsnummer) an PayPal übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Es gilt zusätzlich die Datenschutzerklärung von PayPal.'] },
  { h: '6. Kontaktformular, E-Mail, Telefon, WhatsApp', p: ['Anfragen über das Kontaktformular, die Gutschein-Bestellung, per E-Mail oder Telefon verarbeiten wir zur Bearbeitung Ihres Anliegens (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO). Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine Aufbewahrungspflichten bestehen.', 'Wenn Sie uns über WhatsApp kontaktieren, werden Ihre Daten durch WhatsApp Ireland Ltd. verarbeitet. Nutzen Sie WhatsApp nur, wenn Sie damit einverstanden sind; alternativ stehen Telefon, E-Mail und Formular zur Verfügung.'] },
  { h: '7. Widerrufsfunktion', p: ['Erklären Sie einen Widerruf über die Widerrufsfunktion, verarbeiten wir Name, E-Mail-Adresse, Buchungsnummer und Zeitpunkt der Erklärung zur Bearbeitung und zum Nachweis (Art. 6 Abs. 1 lit. c DSGVO).'] },
  { h: '8. E-Mail-Versand', p: ['Buchungsbestätigungen und Antworten versenden wir über unseren E-Mail-Server bzw. einen beauftragten E-Mail-Dienstleister im Rahmen einer Auftragsverarbeitung (Art. 28 DSGVO).'] },
  { h: '9. YouTube-Videos', p: ['Videos sind im erweiterten Datenschutzmodus (youtube-nocookie.com) eingebunden und werden erst nach Ihrem Klick geladen. Erst dann werden Daten (u. a. IP-Adresse) an Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, übermittelt. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO). Vorschaubilder werden über unseren eigenen Server ausgeliefert.'] },
  { h: '10. Google Maps', p: ['Karten werden erst nach Ihrem Klick auf „Karte laden“ von Google geladen. Dabei werden Daten an Google übermittelt (Art. 6 Abs. 1 lit. a DSGVO). Ohne Klick findet keine Übertragung statt. Links zu Google-Bewertungen und zum Routenplaner öffnen Google-Seiten, für die die Datenschutzerklärung von Google gilt.'] },
  { h: '11. Cookies und lokale Speicherung', p: ['Diese Website verwendet keine Cookies für Besucher. Im Mitarbeiter-Backend wird ein technisch notwendiges Sitzungs-Cookie gesetzt (§ 25 Abs. 2 TDDDG). Schriften werden von unserem eigenen Server geladen.'] },
  { h: '12. Ihre Rechte', p: ['Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO) sowie das Recht, eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen. Wenden Sie sich dazu an die oben genannten Kontaktdaten.', 'Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren, zuständig ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.'] },
  { h: '13. Stand', p: [`Stand dieser Datenschutzerklärung: ${LEGAL_VERSION}`] }
];
