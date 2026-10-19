import { SITE, STANDORTE } from './site';

/*
 * Rechtstexte für den Buchungsweg. Version wird mit jeder Buchung gespeichert,
 * damit nachvollziehbar bleibt, welchem Wortlaut zugestimmt wurde.
 * Vor dem Livegang anwaltlich prüfen lassen.
 */
export const LEGAL_VERSION = '2026-10-19';

export const CONSENT_TEXT = {
  agb: 'Ich habe die Allgemeinen Geschäftsbedingungen (AGB) gelesen und akzeptiere sie.',
  datenschutz: 'Ich habe die Datenschutzhinweise zur Kenntnis genommen. Meine Angaben werden ausschließlich zur Abwicklung der Buchung verwendet.',
  widerrufsbelehrung: 'Ich habe die Widerrufsbelehrung einschließlich des Muster-Widerrufsformulars zur Kenntnis genommen.',
  vorzeitigerBeginn:
    'Ausdrückliches Verlangen auf vorzeitigen Beginn der Dienstleistung und Kenntnisnahme vom Erlöschen des Widerrufsrechts (§ 356 Abs. 4, § 357a Abs. 2 BGB): Ich verlange ausdrücklich, dass Merkle mit der Ausführung der gebuchten Dienstleistung (Kursdurchführung und Vorbereitung des Kursplatzes) vor Ablauf der Widerrufsfrist beginnt. Mir ist bekannt, dass ich bei Widerruf nach Beginn der Ausführung einen angemessenen Betrag für die bis dahin erbrachten Leistungen (Wertersatz) zahlen muss und dass mein Widerrufsrecht bei vollständiger Vertragserfüllung durch Merkle erlischt.',
  zahlungspflichtig:
    'Mit Klick auf „Zahlungspflichtig buchen“ gebe ich eine verbindliche Buchung ab und verpflichte mich, den Kursbeitrag zu zahlen. Die Zahlung erfolgt im nächsten Schritt per PayPal oder Vorkasse (Überweisung).'
};

export const ANBIETER = `${SITE.legalName}, ${STANDORTE.muenchen.street}, ${STANDORTE.muenchen.zip} ${STANDORTE.muenchen.city}, Telefon ${SITE.impressum.tel}, E-Mail ${SITE.email}`;

/* Muster-Widerrufsbelehrung für Dienstleistungen (Anlage 1 zu Art. 246a § 1 Abs. 2 S. 2 EGBGB),
   ergänzt um den Hinweis auf die elektronische Widerrufsfunktion nach § 356a BGB. */
export const WIDERRUFSBELEHRUNG = [
  { h: 'Widerrufsrecht', p: [
    'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
    'Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.',
    `Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (${ANBIETER}) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Sie können Ihren Widerruf außerdem jederzeit über die Schaltfläche „Vertrag widerrufen“ auf unserer Website unter ${SITE.url}/vertrag-widerrufen/ erklären.`,
    'Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.'
  ] },
  { h: 'Folgen des Widerrufs', p: [
    'Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.',
    'Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.'
  ] },
  { h: 'Besondere Hinweise', p: [
    'Ihr Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen, wenn wir die Dienstleistung vollständig erbracht haben und Sie vor Beginn der Ausführung Ihre ausdrückliche Zustimmung dazu gegeben haben, dass wir mit der Ausführung der Dienstleistung vor Ablauf der Widerrufsfrist beginnen, und Sie Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlieren.',
    'Ein Widerrufsrecht besteht nur für Verbraucher im Sinne des § 13 BGB. Buchungen durch Unternehmen (§ 14 BGB) sind vom Widerrufsrecht ausgenommen.'
  ] }
];

export const MUSTER_WIDERRUFSFORMULAR = `Muster-Widerrufsformular
(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)

An ${ANBIETER}:

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung (*):
______________________________________
Bestellt am (*) / erhalten am (*): ____________
Name des/der Verbraucher(s): ____________
Anschrift des/der Verbraucher(s): ____________
Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): ____________
Datum: ____________

(*) Unzutreffendes streichen.`;
