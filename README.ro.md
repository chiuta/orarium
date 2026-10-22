# ORARIUM

[English](README.md) · **Română** · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versiune:** 1.2.3 · **Ultima actualizare:** 2026-10-22

**Aplicația online:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Timpul pe toate lumile**

ORARIUM este o aplicație web dintr-un singur fișier, offline (`index.html`, fără server, fără cont, fără urmărire), care propune o metodă unitară de a măsura timpul pe Lună, pe Marte, pe toate planetele, pe planetele pitice, pe asteroizi, pe comete și pe sateliții Sistemului Solar. A pornit de la dezbaterea despre timpul lunar (un decalaj de ceas de ≈56 µs/zi, rezoluția CGPM privind o scară de timp lunară de referință și întrebările deschise despre „altitudinea zero” și rețelele de ceasuri).

Limbile interfeței: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## Ideea: patru ceasuri, două formule

| Ceas | La ce întrebare răspunde |
|---|---|
| **Ceasul-Etalon** | Cât de repede merge un ceas atomic acolo? Secunda SI, timpul propriu pe suprafața echipotențială de referință a corpului („Timp Local de Suprafață”, TLS), cu o rată ρ față de Pământ. |
| **Ceasul-Ritm** | Ziua solară locală împărțită în 24 de ore locale de *P*<sub>sol</sub>/24 secunde SI, astfel încât amiaza e la 12:00 pe orice lume. |
| **Ceasul-Fază** | Care este ora locală reală? Din orientarea IAU și o efemeridă kepleriană (planete), din elongația medie (Lună), din MSD/MTC (Marte). În rest, ritmul este exact, iar originea se stabilește prin convenție. |
| **Ceasul-Punte** | Fiecare mesaj poartă (TLS, UTC, ρ); receptorul scade timpul-lumină și aplică ρ. |

```
ρ = (Φ⊕ − Φ_b) / c²          Φ = 3·GM☉/2a☉ + 3·GM_p/2a_s + GM_b/R + ½ω²R²
P_sol = 1 / | 1/P_sid ∓ 1/P_year |
```

## Ce conține aplicația

- **Acum** — ora locală în direct pe 45 de corpuri (planete, 22 de sateliți, planete pitice, asteroizi, o cometă, un aerostat venusian), cu rata ceasului ρ, lungimea zilei, **distanța live față de Pământ** (km, mile, UA, secunde/minute/ore/ani-lumină, distanțe Pământ–Lună) și **timpul de comunicare dus-întors**.
- **Fișa corpului** — mărimi fizice în mai multe unități, descompunerea ratei ceasului, exemple concrete, un calculator de altitudine, ancorarea originii ceasului pentru corpurile fără o origine acceptată și o evaluare a colonizării.
- **Metoda** — cele patru ceasuri, formulele, recalcularea în direct a celor +56 µs/zi de pe Lună, răspunsuri la întrebările deschise, limite oneste.
- **Convertor** — „ce oră e acolo când aici e…?” pentru orice corp și orice longitudine, cu orice fus orar de pe Pământ (cu avertizare pentru orele inexistente sau duble de la schimbarea orei).
- **Colonii** — un clasament orientativ al candidaților la colonizare, cu ponderi alese de utilizator (7 factori, filtru pentru factorii vitali).
- **Hărți** — hărți schematice ale zonelor optime de colonizare pentru fiecare corp, cu terminatorul zi/noapte, ora locală față de ceasul Pământului de referință și următoarea amiază locală.
- **Transmisii** — când e miezul nopții locale pe fiecare corp (în ora ta de referință și în UTC) și fereastra de transmisie Pământ–corp (stație terestră aleasă, punct ales pe corp, timp-lumină inclus), plus perioadele de conjuncție solară în care legătura e întreruptă.
- **Comunicare între corpuri** — pentru orice pereche de corpuri (nu doar cu Pământul): fereastra de comunicare în care fiecare îl vede pe celălalt peste orizont, timpul-lumină și perioadele de conjuncție solară; în plus, fiecare corp are acum și amiaza locală (12:00).
- **Legătură cu TerRa** — butoane „↗ TerRa” la fiecare miez de noapte / amiază calculat și în fișa corpului: deschid [TerRa](https://chiuta.github.io/TerRa/) la momentul respectiv, cu globul 3D pentru Pământ sau cerul văzut de pe corpul ales (link unic). Legătura acoperă toate cele 44 de corpuri (inclusiv Phobos, Charon, Ceres, Eris, Bennu etc.), iar fereastra de comunicare dintre două corpuri are și ea „↗ TerRa” pentru fiecare capăt.
- **Link unic și legătura cu TerRa din ambele părți** — butonul „🔗 Link unic” copiază vederea curentă (filă, corp, moment fixat, stație, pereche de corpuri, prag solar); [TerRa](https://chiuta.github.io/TerRa/) deschide aici corpul, ora și fereastra de transmisie din locația ta.
- **Bolta și .ics** — „↗ Bolta” deschide planetariul offline [Bolta](https://chiuta.github.io/apps/Bolta/) pentru stația aleasă (la momentul fixat sau live); pentru orice pereche de corpuri, „📅 Exportă ferestrele în .ics” descarcă următoarele ferestre de comunicare și întreruperea prin conjuncție solară într-un calendar RFC 5545 (UTC), importabil în Orar sau în orice calendar. Linkurile „acum” spre TerRa nu mai îngheață ora.
- **Scenarii** — exemple concrete (locul Apollo 11, Jezero, Titan, Bennu, Venus, Mercur, Pluto–Charon, tabel dus-întors).
- **Ceasul Pământului de referință** — UTC sau orice fus IANA (de exemplu București), folosit peste tot.

## Limite oneste

Model de ordinul întâi pentru rata ceasului (de exemplu ≈488 µs/zi pentru Marte, față de ≈477 µs/zi în modelele complete); orele locale „reale” folosesc orientări IAU medii și efemeride kepleriene simplificate (eroare de ordinul minutelor, verificată pe Marte față de Mars24); timpul-lumină are o precizie de ≈0,5 %; hărțile sunt schematice; indicele de colonizare este orientativ, nu o evaluare științifică. Pentru navigație reală se folosesc efemeride numerice complete.

## Utilizare

Deschide `index.html` în orice browser modern (funcționează și din `file://`) sau publică-l cu GitHub Pages (un workflow este inclus: **Settings → Pages → Source: GitHub Actions**).

## Dezvoltare

`index.html` este generat din `src/template.html` (motorul și interfața, cu textele-sursă în română) și din dicționarele de traducere din `src/i18n/`.

```bash
python3 tools/validate.py     # traduceri: aceleași chei, aceleași variabile {n} și aceleași etichete HTML ca sursa
python3 tools/build.py        # regenerează index.html (pasul 1 din 2; singur, șterge blocul fff-info)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # pasul 2: rescrie fff-info/data-fff-hash în index.html și app.json (sha256, mărime)
npm install && npm test       # parcurge cu jsdom fiecare ecran/corp (pe limbă), raportează chei lipsă/erori/NaN
node tools/exercise.js index.html fr   # doar o limbă
```

**Traduceri.** În cod, fiecare text vizibil este `T('text-sursă în română', …argumente)`; `src/i18n/keys.json` listează toate cheile, iar `tr_<limbă>.json` conține traducerea fiecărei chei. Ca să adaugi o limbă: adaugă-i intrarea în `LANGS` și `UNITS` din `src/template.html`, creează `tr_<limbă>.json` cu aceleași chei, apoi rulează `validate.py` și `build.py`. Corecturile la traducerile existente sunt binevenite. Acest README există și în fiecare limbă a interfeței (`README.<limbă>.md`); `README.md` (engleză) este versiunea de referință.

## Surse și mulțumiri

- Articolul care a declanșat proiectul: „Cât este ceasul pe Lună…” (AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientările polilor și meridianelor de origine: IAU WGCCRE 2009. Elemente kepleriene medii: JPL (Standish). Timpul marțian MSD/MTC: Allison și McEwen. Seria pentru distanța Pământ–Lună: J. Meeus, *Astronomical Algorithms*.
- Valorile fizice sunt cele uzuale din literatura de specialitate, rotunjite. Datele despre colonizare sunt calitative și orientative.

## Istoric

### 1.2.3 — 2026-10-22
- Offline pe bune: au fost adăugate un service worker (cache-first, cache pe versiune), un manifest web și pictograme, astfel încât aplicația se deschide fără rețea după prima vizită și poate fi instalată (promisiunea „offline” din catalog e acum adevărată). Lanțul de build (`npm run build`) aplică fișierele PWA și reîmprospătează eticheta de transparență.
- Accesibilitate: cele 19 câmpuri din convertor, legătura de comunicație și fereastra pe perechi au acum etichete asociate programatic cu câmpurile.
- Mobil: corectat depășirea orizontală de 10 px la cardurile „Acum” (eticheta cu numele corpului nu mai iese din card); textul mic (etichete, note) are cel puțin 12 px.

### 1.2.2 — 2026-10-22
- Eticheta de accesibilitate a hărții schematice este tradusă încă de la început (rămânea în română până la deschiderea filei Hartă), iar titlul articolului citat din subsol este redat și în franceză, germană și maghiară.

### 1.2.1 — 2026-10-22
- Subsolul „Surse și metodă”, meta descrierea și panoul de transparență fff-kit (nume și descriere) urmează acum limba interfeței.

## Licență

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
