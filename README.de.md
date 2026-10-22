# ORARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · **Deutsch** · [Magyar](README.hu.md)

**Version:** 1.2.1 · **Zuletzt aktualisiert:** 2026-10-22

**Online-App:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Zeit auf allen Welten**

ORARIUM ist eine Web-App in einer einzigen Datei, offline nutzbar (`index.html`, ohne Server, ohne Konto, ohne Tracking), die eine einheitliche Art vorschlägt, die Zeit auf dem Mond, dem Mars, allen Planeten, Zwergplaneten, Asteroiden, Kometen und Monden des Sonnensystems anzugeben. Anlass war die Debatte über die Mondzeit (ein Uhrenversatz von ≈56 µs/Tag, die CGPM-Resolution zu einer lunaren Referenzzeitskala sowie die offenen Fragen zur „Nullhöhe“ und zu Uhrennetzen).

Oberflächensprachen: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## Die Idee: vier Uhren, zwei Formeln

| Uhr | Was sie beantwortet |
|---|---|
| **Standarduhr** | Wie schnell geht dort eine Atomuhr? SI-Sekunde, Eigenzeit auf der äquipotentialen Bezugsfläche des Körpers („Lokale Oberflächenzeit“, LOZ), mit einer Rate ρ relativ zur Erde. |
| **Rhythmusuhr** | Der lokale Sonnentag wird in 24 lokale Stunden zu je *P*<sub>sol</sub>/24 SI-Sekunden geteilt, sodass auf jeder Welt um 12:00 Mittag ist. |
| **Phasenuhr** | Wie spät ist es tatsächlich vor Ort? Aus der IAU-Orientierung + einer keplerschen Ephemeride (Planeten), der mittleren Elongation (Mond), MSD/MTC (Mars). Anderswo ist der Rhythmus exakt und der Ursprung wird per Konvention festgelegt. |
| **Brückenuhr** | Jede Nachricht trägt (LOZ, UTC, ρ); der Empfänger subtrahiert die Lichtlaufzeit und wendet ρ an. |

```
ρ = (Φ⊕ − Φ_b) / c²          Φ = 3·GM☉/2a☉ + 3·GM_p/2a_s + GM_b/R + ½ω²R²
P_sol = 1 / | 1/P_sid ∓ 1/P_year |
```

## Was die App enthält

- **Jetzt** — lokale Live-Zeit auf 45 Körpern (Planeten, 22 Monde, Zwergplaneten, Asteroiden, ein Komet, ein Venus-Aerostat), mit Uhrenrate ρ, Tageslänge, **Live-Entfernung zur Erde** (km, mi, AE, Lichtsekunden/-minuten/-stunden/-jahre, Mondentfernungen) und **Hin-und-zurück-Kommunikationszeit**.
- **Datenblätter** — physikalische Größen in mehreren Einheiten, Aufschlüsselung der Uhrenrate, durchgerechnete Beispiele, ein Höhenrechner, Verankerung des Uhrenursprungs für Körper ohne anerkannten Ursprung und eine Besiedlungsbewertung.
- **Methode** — die vier Uhren, die Formeln, eine Live-Neuberechnung der +56 µs/Tag des Mondes, Antworten auf die offenen Fragen, ehrliche Grenzen.
- **Konverter** — „Wie spät ist es dort, wenn es hier … ist?“ für jeden Körper und jede Länge, mit beliebiger Erdzeitzone (Lücken/Überlappungen durch die Sommerzeit werden markiert).
- **Kolonien** — eine richtungsweisende, vom Nutzer gewichtete Rangliste von Besiedlungskandidaten (7 Faktoren, Vitalfaktor-Schwelle).
- **Karten** — schematische Karten optimaler Besiedlungszonen für jeden Körper mit Tag-Nacht-Grenze, Ortszeit im Vergleich zur Referenz-Erdzeit und dem nächsten lokalen Mittag.
- **Funk** — wann auf jedem Körper Ortsmitternacht ist (in Ihrer Referenzzeit und in UTC) und das Sendefenster Erde–Körper (gewählte Bodenstation, gewählter Punkt auf dem Körper, Lichtlaufzeit eingerechnet), dazu die Zeiten der Sonnenkonjunktion, in denen die Verbindung unterbrochen ist.
- **Kommunikation zwischen Körpern** — für jedes beliebige Körperpaar (nicht nur mit der Erde): das Kommunikationsfenster, in dem jeder den anderen über dem Horizont sieht, die Lichtlaufzeit und die Zeiten der Sonnenkonjunktion; außerdem zeigt jeder Körper jetzt auch seinen Ortsmittag (12:00).
- **Verbindung zu TerRa** — „↗ TerRa“-Schaltflächen bei jeder berechneten Mitternacht / jedem Mittag und im Körperblatt: Sie öffnen [TerRa](https://chiuta.github.io/TerRa/) zu diesem Zeitpunkt, mit dem 3D-Globus für die Erde oder dem Himmel vom gewählten Körper aus (eindeutiger Link). Die Verbindung deckt alle 44 Körper ab (u. a. Phobos, Charon, Ceres, Eris, Bennu) und das Kommunikationsfenster zwischen zwei Körpern hat für jedes Ende ebenfalls „↗ TerRa“.
- **Eindeutiger Link und beidseitige TerRa-Verbindung** — die Schaltfläche „🔗 Eindeutiger Link“ kopiert die aktuelle Ansicht (Tab, Körper, fixierter Zeitpunkt, Station, Körperpaar, Sonnenschwelle); [TerRa](https://chiuta.github.io/TerRa/) öffnet hier den Körper, die Zeit und das Sendefenster von Ihrem Standort.
- **Szenarien** — konkrete Beispiele (Apollo-11-Landeplatz, Jezero, Titan, Bennu, Venus, Merkur, Pluto–Charon, Tabelle der Hin-und-zurück-Zeiten).
- **Referenz-Erdzeit** — UTC oder eine beliebige IANA-Zeitzone (z. B. Bukarest), durchgängig verwendet.

## Ehrliche Grenzen

Uhrenratenmodell erster Ordnung (z. B. ≈488 µs/Tag für den Mars gegenüber ≈477 µs/Tag in vollständigen Modellen); die „realen“ Ortszeiten verwenden mittlere IAU-Orientierungen und vereinfachte keplersche Ephemeriden (Fehler in der Größenordnung von Minuten, am Mars gegen Mars24 geprüft); Lichtlaufzeit ≈0,5 %; die Karten sind schematisch; der Besiedlungsindex ist ein Richtwert, keine wissenschaftliche Bewertung. Für reale Navigation sind vollständige numerische Ephemeriden zu verwenden.

## Nutzung

Öffnen Sie `index.html` in einem beliebigen modernen Browser (funktioniert über `file://`) oder veröffentlichen Sie die Datei mit GitHub Pages (ein Workflow ist enthalten: **Settings → Pages → Source: GitHub Actions**).

## Entwicklung

`index.html` wird aus `src/template.html` (Engine + Oberfläche, rumänische Quelltexte) und den Übersetzungswörterbüchern in `src/i18n/` erzeugt.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html (step 1 of 2; on its own it drops the fff-info block)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # step 2: rewrites fff-info / data-fff-hash in index.html and app.json (sha256, size); needs the fff-kit from chiuta.github.io
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tools/exercise.js index.html fr   # one language only
```

**Übersetzungen.** Im Code ist jeder für Nutzer sichtbare Text als `T('romanian source text', …args)` angegeben; `src/i18n/keys.json` listet alle Schlüssel auf, und `tr_<lang>.json` enthält die Übersetzung jedes Schlüssels. Um eine Sprache hinzuzufügen: ihren Eintrag in `LANGS` und `UNITS` in `src/template.html` ergänzen, `tr_<lang>.json` mit denselben Schlüsseln anlegen und `validate.py` sowie `build.py` ausführen. Korrekturen an bestehenden Übersetzungen sind sehr willkommen. Dieses README ist auch in jeder Oberflächensprache verfügbar (`README.<lang>.md`); `README.md` (Englisch) ist die maßgebliche Referenzversion.

## Quellen und Danksagungen

- Artikel, der das Projekt angeregt hat: "[Wie spät ist es auf dem Mond…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)" (auf Rumänisch; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Pol- und Nullmeridian-Orientierungen: IAU WGCCRE 2009. Mittlere keplersche Elemente: JPL (Standish). Marszeit MSD/MTC: Allison & McEwen. Reihe der Mondentfernung: J. Meeus, *Astronomical Algorithms*.
- Die physikalischen Werte sind die üblichen, gerundeten Literaturangaben. Die Besiedlungsdaten sind qualitativ und richtungsweisend.

## Verlauf

### 1.2.1 — 2026-10-22
- Die Fußzeile „Quellen und Methode“, die Meta-Beschreibung und das fff-kit-Transparenzpanel (Name und Beschreibung) folgen jetzt der Oberflächensprache.

## Lizenz

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
