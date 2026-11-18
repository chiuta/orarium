# ORARIUM

[English](README.md) · **Română** · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versiune:** 2.3.3 · **Ultima actualizare:** 2026-11-18

**Stare:** stabil · **Offline:** complet (nu cere internet; legăturile „↗ TerRa” și „↗ Bolta” deschid alte aplicații online doar dacă le apeși)

**Aplicația online:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Timpul pe toate lumile**

**Fișă scurtă:** Timpul pe toate lumile: un etalon, două formule și patru ceasuri pentru Lună, Marte și tot Sistemul Solar. Fișier unic, offline, fără cont.

Limbile interfeței: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## Descriere detaliată

ORARIUM este o aplicație web dintr-un singur fișier, offline (`index.html`, fără server, fără cont, fără urmărire), care propune o metodă unitară de a măsura timpul pe Lună, pe Marte, pe toate planetele, pe planetele pitice, pe asteroizi, pe comete și pe sateliții Sistemului Solar. A pornit de la dezbaterea despre timpul lunar (un decalaj de ceas de ≈56 µs/zi, rezoluția CGPM privind o scară de timp lunară de referință și întrebările deschise despre „altitudinea zero” și rețelele de ceasuri).

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
- **Planificator de întâlniri (2.0)** — pentru orice pereche de corpuri (de exemplu Pământ–Marte): intervalele în care o întâlnire de durata aleasă încape în programul de lucru al orei locale la ambele capete, cu legătura deschisă (fără conjuncție solară) și întârzierea semnalului (unidirecțional și dus-întors) inclusă; ora locală a fiecărui capăt la plecare și la sosire. Orientativ, nu pentru operațiuni reale.
- **Scenarii** — exemple concrete (locul Apollo 11, Jezero, Titan, Bennu, Venus, Mercur, Pluto–Charon, tabel dus-întors).
- **Ceasul Pământului de referință** — UTC sau orice fus IANA (de exemplu București), folosit peste tot.

## Limite oneste

Calculul e de ordinul întâi (Soare + planeta-mamă + suprafață + rotație, orbite circulare în medie). Pentru Marte obține ≈488 µs/zi, iar modelele complete din literatură dau ≈477 µs/zi, cu variații periodice de sute de µs din cauza excentricității. Orele „reale” folosesc orientări IAU medii (fără librații) și efemeride kepleriene simplificate. Verificate față de formula Mars24 și față de biblioteca astronomică astronomy-engine: ora solară de pe Marte are abatere maximă ≈0,5 min în 1900–2100 (sub 1 min în 1800–2200, ≈5 min în anii 1000–3000); timpul-lumină e exact la ≈0,5 % în 1900–2200 (până la ≈2 % spre anul 3000); elevațiile stațiilor de pe Pământ diferă cu cel mult ≈0,04° pentru Marte și Venus și ≈0,3° pentru Jupiter, Saturn și Lună (2020–2100). TT − UTC = 32,184 s + (TAI − UTC): din 1972 se folosește tabelul secundelor intercalare (69,184 s din 2017, presupunând că nu mai urmează altele), înainte de 1972 ΔT după Espenak–Meeus. Hărțile sunt schematice. Indicele de colonizare este orientativ, nu o evaluare științifică. Pentru navigație reală se folosesc efemeride numerice complete.

## Utilizare

Deschide `index.html` în orice browser modern (funcționează și din `file://`) sau publică-l cu GitHub Pages (un workflow este inclus: **Settings → Pages → Source: GitHub Actions**).

## Dezvoltare

`index.html` este generat din `src/template.html` (motorul și interfața, cu textele-sursă în română) și din dicționarele de traducere din `src/i18n/`.

```bash
python3 tools/validate.py     # traduceri: aceleași chei, aceleași variabile {n} și aceleași etichete HTML ca sursa
python3 tools/build.py        # regenerează index.html (pasul 1 din 2; singur, șterge blocul fff-info)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # pasul 2: rescrie fff-info/data-fff-hash în index.html și app.json (sha256, mărime)
npm install && npm test       # parcurge cu jsdom fiecare ecran/corp (pe limbă), raportează chei lipsă/erori/NaN
node tests/regression.test.mjs   # teste de regresie: date/ani, ICS, PWA/service worker, linkul unic
node tools/exercise.js index.html fr   # doar o limbă
```

**Traduceri.** În cod, fiecare text vizibil este `T('text-sursă în română', …argumente)`; `src/i18n/keys.json` listează toate cheile, iar `tr_<limbă>.json` conține traducerea fiecărei chei. Ca să adaugi o limbă: adaugă-i intrarea în `LANGS` și `UNITS` din `src/template.html`, creează `tr_<limbă>.json` cu aceleași chei, apoi rulează `validate.py` și `build.py`. Corecturile la traducerile existente sunt binevenite. Acest README există și în fiecare limbă a interfeței (`README.<limbă>.md`); `README.md` (engleză) este versiunea de referință.

## Surse și mulțumiri

- Articolul care a declanșat proiectul: „[Cât este ceasul pe Lună…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)” (în română; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientările polilor și meridianelor de origine: IAU WGCCRE 2009. Elemente kepleriene medii: JPL (Standish). Timpul marțian MSD/MTC: Allison și McEwen. Seria pentru distanța Pământ–Lună: J. Meeus, *Astronomical Algorithms*.
- Valorile fizice sunt cele uzuale din literatura de specialitate, rotunjite. Datele despre colonizare sunt calitative și orientative.

## Istoric

### 2.3.3 — 2026-11-18

Audit comparativ adversarial (față de astronomy-engine și formula Mars24, teste diferențiale, parcurs în toate cele 8 limbi) și remedieri:
- Elevațiile stațiilor includ acum precesia echinocțiilor (erau greșite cu 0,3–1,5°; acum ≲ 0,04° pentru Marte și Venus, ≲ 0,3° pentru Jupiter, Saturn și Lună).
- TT − UTC: tabelul secundelor intercalare din 1972 și, înainte, ΔT (Espenak–Meeus), nu constanta 69,184 s pentru orice dată.
- Anii 1–99 erau calculați în tăcere ca 1901–1999, iar datele peste limita acceptată (anul 275760 și după) dădeau excepție; ambele cazuri sunt tratate, iar convertorul spune „Data aleasă e în afara intervalului acceptat.”
- Fișierele .ics: `PRODID` conține versiunea (ORARIUM 2.3.3).
- Numerele din linkul unic se scriu zecimal simplu, ca să poată fi citite înapoi (notația cu exponent se pierdea).
- PWA: CSP-ul paginii nu permitea manifestul web, service worker-ul și iconițele, deci aplicația nu putea fi instalată sau folosită offline; remediat (`manifest-src`, `worker-src 'self'`, `img-src 'self'`) și acoperit de un test care servește aplicația prin HTTP și înregistrează service worker-ul.
- „Limite oneste” indică acum precizia măsurată.
- Test de regresie nou `tests/regression.test.mjs` (51 de verificări; pică pe 2.3.2).

Versiunile anterioare: [`CHANGELOG.md`](CHANGELOG.md).

## Licență

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
