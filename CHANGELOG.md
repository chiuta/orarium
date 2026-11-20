# CHANGELOG

Format: SemVer (MAJOR.MINOR.PATCH). Intrările mai vechi sunt copiate din README (secțiunea „History / Changelog”), neschimbate.

## 2.3.4 — 2026-11-19

- `<meta charset>` este acum primul element din `<head>`, în primii 1024 de octeți, cum cere specificația HTML; înainte venea după eticheta lungă cu politica CSP (la ~1,3 KB de început), deci în afara ferestrei pe care browserele o citesc înainte de analiză (constatat de scanarea tuturor fișierelor HTML din depozite, 19 noiembrie 2026; nu s-a observat o afișare greșită în Chrome)

## 2.3.3 — 2026-11-18

Audit comparativ adversarial (față de biblioteca astronomy-engine și formula Mars24, teste diferențiale, parcurs în toate cele 8 limbi) și remedieri / Adversarial comparative audit (against astronomy-engine and the Mars24 formula, differential tests, a walkthrough in all 8 languages) and fixes:

- **Elevații / elevations:** efemeridele stațiilor omiteau precesia echinocțiilor (de la J2000), deci elevațiile erau greșite cu 0,3–1,5°; acum diferența față de astronomy-engine este ≲ 0,04° pentru Marte și Venus, ≲ 0,14° Jupiter, ≲ 0,31° Saturn, ≲ 0,21° Lună (2020–2100). / the station ephemerides omitted the precession of the equinoxes (from J2000), so elevations were off by 0.3–1.5°; the difference against astronomy-engine is now ≲ 0.04° for Mars and Venus, ≲ 0.14° Jupiter, ≲ 0.31° Saturn, ≲ 0.21° Moon (2020–2100).
- **TT − UTC:** constanta 69,184 s se aplica oricărei date; acum tabelul secundelor intercalare din 1972 (37 s TAI−UTC din 2017) și ΔT după Espenak–Meeus înainte de 1972. / the constant 69.184 s was applied to every date; now the leap-second table from 1972 (TAI−UTC 37 s since 2017) and ΔT after Espenak–Meeus before 1972.
- **Date / dates:** anii 1–99 erau calculați în tăcere ca 1901–1999 (`Date.UTC`), iar anul 275760 și după dădeau excepție în convertor; acum corect, cu mesajul „Data aleasă e în afara intervalului acceptat.” (8 limbi). / years 1–99 were silently computed as 1901–1999 (`Date.UTC`) and year 275760 onwards raised an exception in the converter; now correct, with the message “The chosen date is outside the supported range.” (8 languages).
- **.ics:** `PRODID` purta o versiune veche; acum `ORARIUM <versiunea aplicației>`. / `PRODID` carried a stale version; now `ORARIUM <app version>`.
- **Link unic / unique link:** numerele mici se scriau cu exponent (`1e-7`) și nu puteau fi citite înapoi; acum zecimal simplu (6 zecimale). / small numbers were written with an exponent (`1e-7`) and could not be read back; now plain decimals (6 places).
- **PWA:** `tools/build.py` regenera CSP-ul fără `manifest-src`/`worker-src 'self'`/`img-src 'self'`, deci manifestul, service worker-ul și iconițele erau blocate la servirea prin HTTP(S); acum CSP-ul se reconstruiește cu directivele PWA când blocul `fff:pwa` este prezent. / `tools/build.py` regenerated the CSP without `manifest-src`/`worker-src 'self'`/`img-src 'self'`, so the manifest, service worker and icons were blocked when served over HTTP(S); the CSP is now rebuilt with the PWA directives when the `fff:pwa` block is present.
- **Documentație / documentation:** „Limite oneste” indică precizia măsurată (ora solară pe Marte ≈ 0,5 min în 1900–2100, < 1 min în 1800–2200, ≈ 5 min în 1000–3000; timp-lumină ≈ 0,5 % în 1900–2200, ≈ 2 % spre 3000), în toate cele 8 limbi (înainte: „≈ 4 min”, nemăsurat); README în fr/de/es/it/pt/hu: lipseau punctele „Bolta și .ics” și „Planificator de întâlniri”, iar istoricul era în engleză; README-urile au acum aceeași structură (11 secțiuni) și trimit la acest fișier pentru versiunile anterioare. / “Honest limits” states the measured accuracy in all 8 languages; the fr/de/es/it/pt/hu READMEs lacked the “Bolta and .ics” and “Meeting planner” items and had the history in English; the READMEs now share one structure (11 sections) and point here for earlier versions.
- **Teste / tests:** `tests/regression.test.mjs` nou (51 de verificări: ani 1–99, 275760, ICS, PWA/service worker prin HTTP, linkul unic, eliminarea excepțiilor); pică pe 2.3.2 (verificat pe copia build-ului vechi). Verificate fără defecte: conversii de fus orar, formula MTC, ora solară pe Marte, durata zilei și rata ceasului, formatul ICS (RFC 5545) în 8 limbi, fuzz de hash/câmpuri, absența rămășițelor românești în traduceri. / new `tests/regression.test.mjs` (51 checks: years 1–99, 275760, ICS, PWA/service worker over HTTP, unique link, no exceptions); it fails on 2.3.2 (checked on a copy of the old build). Checked, no defects: time-zone conversions, MTC formula, Mars solar time, day length and clock rate, ICS format (RFC 5545) in 8 languages, hash/field fuzz, no Romanian leftovers in the translations.

## 2.3.2 — 2026-11-17

- Compatibilitate cu browsere mai vechi (Chrome/Edge 55+, Firefox 52+, Safari 10.1+/iOS 10.3+): kitul 1.8.0 aduce stratul de compatibilitate (rezerve pentru API-urile care lipsesc în motoarele vechi), iar sintaxa JavaScript mai nouă decât ES2017 a fost înlocuită cu forme echivalente acolo unde exista; expresiile regulate noi și `import()` trec prin rezerve. Fără modificări de funcționalitate intenționate. Verificat cu parser ES2017 și într-un motor vechi simulat, nu pe dispozitive reale.

## 2.3.1 — 2026-11-15

- New: social-sharing buttons (vertical, on the left edge; no external scripts, plain links opened only on click); the magnifier zoom and “fit screen” bar returns to the right edge, vertically centred; fixed overlapping layout at high zoom (panels sized in vh/vw no longer overflow the screen).

## 2.3.0 — 2026-11-15

- New: accessibility on every screen — the “Aa” button (text size, high contrast, no animations, readable text, underlined links, read aloud), a “Back to top” arrow and “Skip to content”; the window always fits the screen; the magnifier zoom and “fit screen” controls now sit on the left edge (fff-kit 1.6.0).

## 2.2.9 — 2026-11-15

- Nou: texturi fractale hiper-detaliate (fff-texturi 1.1.2) — fundalul și suprafețele mari (carduri, panouri, antete, butoane; filele și dialogurile ascunse la încărcare, când se deschid) primesc un material generat local (WebGL2, fără rețea și fără imagini), care se repetă fără cusătură; culorile aplicației rămân ale ei. Se oprește din dialogul „Transparență” sau cu `?notex=1`.

## 2.2.2 — 2026-11-03

- Corectat: subsolul arăta versiunea 2.1.0 (și `PRODID` din ICS la fel); urmează acum `app.json`.

## 2.2.1 — 2026-11-03

- Nou (Etapa 6, suita cer–timp): **locația, ora și fusul orar comune** cu Eclipsa-2027, Bolta, Horizons, Universul Observabil 3D, ORARIUM, CLEPSIDRA și Orar (modul `fff-place`): butonul „📍 Locație” (formular, 38 de orașe, geolocalizare doar la cerere și cu acord explicit, plic `place/fff` prin fișier/clipboard/QR/link), panoul **„Astea se întâmplă deasupra ta mâine”** (Soare, Lună, planete, eclipse; calcul local, fără rețea) și **alertă la eclipsă**. Pe aceeași origine locația se propagă singură; între adrese diferite, printr-un link/plic (o apăsare). Vezi docs/SUITA-CER-TIMP.md în hub. Fusul locației devine „Ora Pământului de referință”.

## 2.2.0 — 2026-11-02 (reîmprospătare kit)

- Nou (kit): **Sincronizare între dispozitive** (`FFF.sync`) — în dialogul «Transparență» (clic pe versiune → Copie de siguranță): conectezi două dispozitive direct (WebRTC, cod/QR, fără server și fără cont) și își schimbă datele aplicației; cea mai recentă valoare câștigă, secretele (chei API, parole) nu se trimit, ștergerile nu se propagă. Aplicarea trece prin importul kitului (confirmare, chei permise, rollback).
- Nou (kit): **Istoric local — «mașina timpului»** (`FFF.history`) — instantanee automate ale datelor (IndexedDB, fără secrete), diferență față de starea curentă și restaurare reversibilă; «Șterge datele aplicației» șterge și istoricul.
- Module adăugate: `qr`, `p2p`, `sync`, `history` (+~140 KB). Versiunea aplicației nu se schimbă.

## 2.2.0 — 2026-11-01

- Corectat: adaptorul «Trimite la…» nu mai aruncă eroare când kitul FFF lipsește (gardian pe fiecare bloc; găsit de testul «fără kit» din CI).

Nou: «Trimite la…» (fff-kit, modulul FFF.bridge) — după orice export de fișier (GPX, ICS, CSV, Markdown) apare butonul «Trimite la…» către aplicațiile compatibile, iar importul de fișiere al aplicației primește plicuri .fff.json trimise de ele, cu confirmare înainte de import. Fără rețea, fără telemetrie.

## 2.1.0 — 2026-10-27 (anterior: 2.0.1)

Resincronizarea sursei de build:
- `src/template.html` regenerat din `index.html` (rămăsese la 1.2.5 și la module vechi ale fff-kit; un `npm run build` ar fi produs un `index.html` mai vechi). `tools/build.py` pe noul șablon reproduce `index.html` (diferă doar meta CSP, generată de unelte).
- `tools/check_template.py` nou (fără fff-kit) și `npm run check:template`; `tools/check_fresh.py` ignoră meta CSP. Verificat și lanțul complet build + pwa.mjs apply (check_fresh trece).
- Aplicația nu s-a schimbat funcțional. `tools/exercise.js` (jsdom) neexecutat: jsdom lipsește din sesiune.

---

## 2.0.1 — 2026-10-27 (anterior: 2.0.0)

Recenzie (doar texte, fără modificări de logică):
- README (8 limbi): descrierea lungă a fost mutată într-o secțiune proprie „Descriere detaliată”, iar în capul paginii a rămas o **fișă scurtă** (o propoziție, ≈ 150 de caractere) — gata de folosit pe cardul din catalog. Niciun cuvânt din descrierea inițială nu a fost șters.
- Descrierea din `app.json` și `<meta name="description">` era deja scurtă (120 de caractere) și nu a fost schimbată.
- Adăugat „Stare: stabil” și „Offline: complet” în README; `CHANGELOG.md` creat (istoricul vechi copiat din README).
- Versiunea în `index.html`, `sw.js`, `package.json`, PRODID-ul fișierelor .ics (ORARIUM 2.0.1).

---

## Istoric anterior (din README.md)

#### 2.0.0 — 2026-10-26
- Planificator de întâlniri între două lumi (programul de lucru local, fereastra de legătură, întârzierea semnalului); parametrii intră în „Link unic”. / Meeting planner between two worlds (local working hours, link window, signal delay); the parameters go into the “Unique link”.

#### 1.2.7 — 2026-10-23

Audit: a corrupted `orarium-anchor` value in local storage no longer produces `NaN` hours or replaces the anchor object's prototype (only finite numbers are accepted); Mars sidereal rotation is now 1.02595675 d, so the mean sol is 88 775.243 s (Mars24: 88 775.244 s; it was 88 775.265 s).

#### 1.2.5 — 2026-10-22
- fff-kit 1.1.4: touch targets and minimum text size; touch targets/text fixed

#### 1.2.4 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 600,000 iterations, anti-clickjacking protection.

#### 1.2.3 — 2026-10-22
- Offline for real: a service worker (cache-first, per-version cache), a web manifest and icons were added, so the app opens without network after the first visit and can be installed (the catalogue promise “offline” is now true). The build chain (`npm run build`) applies the PWA files and refreshes the transparency label.
- Accessibility: the 19 converter, communication-link and pair-window fields now have labels programmatically associated with their inputs.
- Mobile: fixed the 10 px horizontal overflow on the “Now” cards (body-name tag no longer sticks out of the card); small text (tags, notes) is at least 12 px.

#### 1.2.2 — 2026-10-22
- The accessibility label of the schematic map is now translated from the start (it was Romanian until the map tab was opened), and the cited article title in the sources footer is rendered in French, German and Hungarian like in the other languages.

#### 1.2.1 — 2026-10-22
- The sources-and-method footer, the meta description and the fff-kit transparency panel (name and description) now follow the interface language.
