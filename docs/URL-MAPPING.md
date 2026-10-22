# URL-Mapping Altseite → Neubau

Grundlage: per Websuche ermittelte URLs der WordPress-Seite (Okt. 2026). Das vollständige Inventar
liefert `npm run import:wp` (`content/wp-import/urls.json`), geprüft wird mit `npm run check:urls`.

Legende: **=** gleiche URL (200) · **301** dauerhafte Weiterleitung

## Kurse und Standorte
| Alte URL | Neu |
|---|---|
| `/` | = |
| `/termine-und-anmeldungen/` | = |
| `/region-muenchen/` · `/region-hamburg/` | = |
| `/anmeldung-muenchen/` · `/anmeldung-hamburg/` | = |
| `/anfahrt-muenchen/` · `/anfahrt-hamburg/` | = |
| `/region-meckenbeuren/` · `/anfahrt-meckenbeuren/` | 301 → `/termine-und-anmeldungen/` (Standort entfällt) |
| `/mig-mag-einsteiger-schweisskurs/` | = |
| `/wig-einsteiger-schweisskurs/` | = |
| `/elektroden-einsteiger-schweisskurs/` | = |
| `/wig-alu-aufbau-schweisskurs/` | = |
| `/wig-einsteiger-schweisskurs-2/` (Autogen) | 301 → `/autogen-einsteiger-schweisskurs/` |
| `/loet-einsteiger-kurs/` | = |
| `/tuev-gepruefter-schweisskurs/` | = |
| `/vorgang/…` | 301 → `/tuev-gepruefter-schweisskurs/` |
| `/aufbaukurse/` · `/schweisskurse-lehrgaenge/` · `/lerninhalte/` | = |
| — | neu: `/mag-fortgeschrittenen-schweisskurs/`, `/pulse-arc-aufbau-schweisskurs/`, `/gasschweissen-flammloeten-kurs/`, `/allgemeiner-schweisskurs-hamburg/` |

## Info und Service
| Alte URL | Neu |
|---|---|
| `/faq/` · `/kontakt/` · `/wir-ueber-uns/` · `/referenzen/` · `/galerie/` | = |
| `/gutschein-bestellen/` · `/lehrbuch/` · `/schweisskurs-ratgeber/` | = |
| `/impressum/` · `/agb/` | = |
| `/datenschutz/` | = (neu: `/datenschutzerklaerung/` 301 → `/datenschutz/`) |
| `/beispiel-seite/` · `/feed/` | 301 → `/` |
| `/category/…` · `/tag/…` | 301 → passende Ratgeber-Seite bzw. `/ratgeber/` |
| `/wp-admin/` · `/wp-login.php` | 302 → `/admin/` |
| — | neu: `/widerruf/`, `/vertrag-widerrufen/`, `/buchen/…` (noindex) |

## Ratgeber (alle =)
```
/ratgeber/
/ratgeber/was-ist-schweissen/
/ratgeber/schweissverfahren/
/ratgeber/schweissverfahren/mig-mag-schweissen/
/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen/
/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen-2-2/
/ratgeber/schweissverfahren/mig-mag-schweissen/mig-mag-schweissen-2-2-2/
/ratgeber/schweissverfahren/wig-schweissen/
/ratgeber/schweissverfahren/wig-schweissen/wig-schweissverfahren/
/ratgeber/schweissverfahren/wig-schweissen/zuendung-des-lichtbogens/
/ratgeber/schweissverfahren/wig-schweissen/schweissgeraet/
/ratgeber/schweissverfahren/elektroden-schweissen/
/ratgeber/schweissverfahren/autogenschweissen-gasschmelzschweissen/
/ratgeber/schweissanleitung/
/ratgeber/schweissanleitung/mig-mag-schweissen-video-anleitung/
/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/
/ratgeber/schweissanleitung/schweissnaehte-schweissnahtformen/kehlnaht-schweissen/
/ratgeber/schweissanleitung/haltung-beim-schweissen/
/ratgeber/schweissanleitung/intervallschweissen-punktschweissen/
/wig-tig-schweisen-video-anleitung/
/ratgeber/schweisszubehoer/
/ratgeber/schweisszubehoer/elektroden-schweissgeraete/
/ratgeber/schweisszubehoer/wig-schweissgeraete/
/ratgeber/schweisszubehoer/schweisser-berufskleidung-schutzkleidung-schweisser/
/ratgeber/schweisszubehoer/schutzgase-aktive-und-inerte-schutzgase/
/ratgeber/gase/
/ratgeber/gase/aufgaben-und-auswirkungen-des-schutzgases/
/ratgeber/gase/gassorten/
/ratgeber/gase/gassorten/argon/
/ratgeber/gase/gassorten/helium/
/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mig-schweissen/
/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-mag-schweissen/
/ratgeber/gase/welches-schweissschutzgas-brauche-ich-zum-wig-schweissen/
/ratgeber/gase/farben-gasflaschen/
/ratgeber/metall/
/ratgeber/metall/metalle/
/ratgeber/metall/schweissen-mit-stahl/
/ratgeber/metall/schweissen-mit-rostfreiem-stahl/
/ratgeber/metall/aluminium-schweissen-alu-schweissen/
/ratgeber/metall/schweissen-mit-kupfer-magnesium-nickel-und-edelmetalle/
/ratgeber/dvd-schweissen-lernen/
/ratgeber/glossar-2/
/glossary/<begriff>/          (29 Begriffe; unbekannte → 301 /ratgeber/glossar-2/)
/ratgeber/<unbekannt>/        → 301 auf die nächste existierende Elternseite
```
