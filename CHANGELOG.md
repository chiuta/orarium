# CHANGELOG

Format: SemVer (MAJOR.MINOR.PATCH). Intrările mai vechi sunt copiate din README (secțiunea „History / Changelog”), neschimbate.

## 2.0.1 — 2026-10-27 (anterior: 2.0.0)

Recenzie (doar texte, fără modificări de logică):
- README (8 limbi): descrierea lungă a fost mutată într-o secțiune proprie „Descriere detaliată”, iar în capul paginii a rămas o **fișă scurtă** (o propoziție, ≈ 150 de caractere) — gata de folosit pe cardul din catalog. Niciun cuvânt din descrierea inițială nu a fost șters.
- Descrierea din `app.json` și `<meta name="description">` era deja scurtă (120 de caractere) și nu a fost schimbată.
- Adăugat „Stare: stabil” și „Offline: complet” în README; `CHANGELOG.md` creat (istoricul vechi copiat din README).
- Versiunea în `index.html`, `sw.js`, `package.json`, PRODID-ul fișierelor .ics (ORARIUM 2.0.1).

---

## Istoric anterior (din README.md)

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
