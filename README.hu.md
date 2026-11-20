# ORARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

**Verzió:** 2.3.4 · **Utolsó frissítés:** 2026-11-19

**Állapot:** stabil · **Offline:** teljes (nem igényel hálózatot; a „↗ TerRa” és „↗ Bolta” hivatkozások csak kattintásra nyitnak meg más online alkalmazásokat)

A felület nyelvei: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

**Online alkalmazás:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Idő minden világon**

**Rövid ismertető:** Idő minden világon: egy etalon, két képlet és négy óra a Holdra, a Marsra és az egész Naprendszerre. Egyetlen fájl, offline, fiók nélkül.

Kezelőfelületi nyelvek: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## Részletes leírás

Az ORARIUM egyetlen fájlból álló, offline webalkalmazás (`index.html`, szerver, fiók és követés nélkül), amely egységes módot javasol az idő megadására a Holdon, a Marson, valamennyi bolygón, törpebolygón, aszteroidán, üstökösön és a Naprendszer holdjain. A holdidőről folyó vita ihlette (≈56 µs/nap óraeltérés, a CGPM határozata a holdi referencia-időskáláról, valamint a „nulla magasságról” és az órahálózatokról szóló nyitott kérdések).

## Az alapgondolat: négy óra, két képlet

| Óra | Mire felel |
|---|---|
| **Etalon Óra** | Milyen gyorsan jár ott egy atomóra? SI-másodperc, az égitest referencia-ekvipotenciális felszínén mért saját idő („Helyi Felszíni Idő”, HFI), a Földhöz viszonyított ρ rátával. |
| **Ritmus Óra** | A helyi szoláris nap 24 helyi órára osztva, egy-egy óra *P*<sub>sol</sub>/24 SI-másodperc, így dél minden világon 12:00-kor van. |
| **Fázis Óra** | Mennyi valójában a helyi idő? Az IAU-tájolásból + Kepler-féle efemeridából (bolygók), az átlagos elongációból (Hold), az MSD/MTC-ből (Mars) számítva. Máshol a ritmus pontos, a kezdőpontot megállapodás rögzíti. |
| **Híd Óra** | Minden üzenet a (HFI, UTC, ρ) hármast hordozza; a vevő levonja a fényidőt és alkalmazza a ρ-t. |

```
ρ = (Φ⊕ − Φ_b) / c²          Φ = 3·GM☉/2a☉ + 3·GM_p/2a_s + GM_b/R + ½ω²R²
P_sol = 1 / | 1/P_sid ∓ 1/P_year |
```

## Mit tartalmaz az alkalmazás

- **Most** — élő helyi idő 45 égitesten (bolygók, 22 hold, törpebolygók, aszteroidák, egy üstökös, egy vénuszi aerosztát), az óra ρ rátájával, a nap hosszával, **élő Föld-távolsággal** (km, mérföld, CSE, fénymásodperc/-perc/-óra/-év, holdtávolság) és **oda-vissza kommunikációs idővel**.
- **Égitestlapok** — fizikai mennyiségek több mértékegységben, az óraráta részletezése, kidolgozott példák, magasságszámító, az óra kezdőpontjának horgonyzása az elfogadott kezdőponttal nem rendelkező égitesteknél, valamint kolonizációs értékelés.
- **Módszer** — a négy óra, a képletek, a Hold +56 µs/napjának élő újraszámítása, válaszok a nyitott kérdésekre, őszinte korlátok.
- **Átváltó** — „hány óra van ott, amikor itt … van?” bármely égitestre és hosszúsági fokra, tetszőleges földi időzónával (a nyári időszámítás kihagyásai/átfedései jelezve).
- **Kolóniák** — kolonizációs jelöltek tájékoztató jellegű, felhasználó által súlyozott rangsora (7 tényező, létfontosságú-tényező kapu).
- **Térképek** — az optimális kolonizációs övezetek sematikus térképei minden égitestre, nappal/éjszaka határvonallal, a helyi idővel a földi referenciaórához képest, valamint a következő helyi déllel.
- **Adás** — mikor van helyi éjfél az egyes égitesteken (a megadott referenciaidőben és UTC-ben), valamint a Föld–égitest adási ablak (választott földi állomás, választott pont az égitesten, a fényidővel együtt), továbbá a napkonjunkciók időszakai, amikor a kapcsolat megszakad.
- **Kommunikáció égitestek között** — bármely égitestpárra (nemcsak a Földdel): a kommunikációs ablak, amikor mindkettő látja a másikat a horizont felett, a fényidő és a napkonjunkció időszakai; ezen kívül minden égitest mostantól a helyi délét (12:00) is mutatja.
- **Kapcsolat a TerRával** — „↗ TerRa” gombok minden kiszámolt éjfélnél / délnél és az égitestlapon: megnyitják a [TerRát](https://chiuta.github.io/TerRa/) az adott pillanatban, a Földnél a 3D-s földgömbbel, másoknál a kiválasztott égitestről látott éggel (egyedi link). A kapcsolat mind a 44 égitestet lefedi (pl. Phobos, Charon, Ceres, Eris, Bennu), és a két égitest közötti kommunikációs ablaknál is van „↗ TerRa” mindkét végponthoz.
- **Egyedi link és kétirányú kapcsolat a TerRával** — a „🔗 Egyedi link” gomb a jelenlegi nézetet másolja (fül, égitest, rögzített pillanat, állomás, égitestpár, napküszöb); a [TerRa](https://chiuta.github.io/TerRa/) itt nyitja meg az égitestet, az időt és a helyedről számolt adási ablakot.
- **Bolta és .ics** — a „↗ Bolta” megnyitja a [Bolta](https://chiuta.github.io/apps/Bolta/) offline planetáriumot a kiválasztott állomásra (a rögzített időpontra vagy élőben); bármely két égitestre a „📅 Ablakok exportálása .ics-be” letölti a következő kommunikációs ablakokat és a napkonjunkció okozta megszakítást RFC 5545 naptárként (UTC), amely importálható az Orarba vagy bármely naptárba. A „Most” fül TerRa-hivatkozásai már nem fagyasztják be az időt.
- **Találkozótervező (2.0)** — bármely két égitestre (pl. Föld–Mars): azok a sávok, amelyekben a választott hosszúságú találkozó belefér mindkét vég helyi munkaidejébe, nyitott összeköttetéssel (napkonjunkció nélkül) és a jelkésleltetéssel (egyirányú és oda-vissza) együtt; megmutatja mindkét vég helyi idejét az indulásnál és az érkezésnél. Tájékoztató jellegű, valós műveletekhez nem alkalmas.
- **Forgatókönyvek** — konkrét példák (az Apollo–11 helyszíne, Jezero, Titán, Bennu, Vénusz, Merkúr, Plútó–Charon, oda-vissza táblázat).
- **Referencia földi idő** — UTC vagy bármely IANA-időzóna (pl. Bukarest), mindenhol ezt használja.

## Őszinte korlátok

A számítás elsőrendű (Nap + anyabolygó + felszín + forgás, átlagosan körpályák). A Marsra ≈488 µs/napot ad, a szakirodalom teljes modelljei pedig ≈477 µs/napot, a pálya excentricitása miatti, több száz µs-os periodikus ingadozásokkal. A „valós” idők átlagos IAU-tájolásokat (libráció nélkül) és egyszerűsített Kepler-féle efemeridákat használnak. A Mars24 képlettel és az astronomy-engine csillagászati függvénykönyvtárral összevetve: a Mars helyi szoláris ideje legfeljebb ≈0,5 percet tér el 1900–2100 között (1 percnél kevesebbet 1800–2200 között, ≈5 percet az 1000–3000 közötti években); a fényidő ≈0,5 %-ra pontos 1900–2200 között (a 3000. év felé akár ≈2 %-ig); a földi állomások magassága legfeljebb ≈0,04°-kal tér el a Mars és a Vénusz esetében, és ≈0,3°-kal a Jupiternél, a Szaturnusznál és a Holdnál (2020–2100). TT − UTC = 32,184 s + (TAI − UTC): 1972-től a szökőmásodperc-táblázatot használja (2017 óta 69,184 s, feltéve, hogy nem jön több), 1972 előtt az Espenak–Meeus-féle ΔT-t. A térképek sematikusak. A kolonizációs index tájékoztató jellegű, nem tudományos értékelés. Valós navigációhoz teljes numerikus efemeridákat használnak.

## Használat

Nyissa meg az `index.html` fájlt bármely modern böngészőben (`file://` alatt is működik), vagy tegye közzé a GitHub Pages segítségével (a tárolóban található egy munkafolyamat: **Settings → Pages → Source: GitHub Actions**).

## Fejlesztés

Az `index.html` a `src/template.html` fájlból (motor + felület, román nyelvű forrásszövegek) és a `src/i18n/` könyvtár fordítási szótáraiból készül.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html (step 1 of 2; on its own it drops the fff-info block)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # step 2: rewrites fff-info / data-fff-hash in index.html and app.json (sha256, size); needs the fff-kit from chiuta.github.io
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tests/regression.test.mjs   # regression tests: dates/years, ICS, PWA/service worker, unique link
node tools/exercise.js index.html fr   # one language only
```

**Fordítások.** A kódban minden, a felhasználó számára látható szöveg `T('romanian source text', …args)` alakú; a `src/i18n/keys.json` felsorolja az összes kulcsot, a `tr_<lang>.json` pedig az egyes kulcsok fordítását tartalmazza. Új nyelv hozzáadásához: vegye fel a nyelvet a `src/template.html` fájl `LANGS` és `UNITS` részébe, hozza létre ugyanazokkal a kulcsokkal a `tr_<lang>.json` fájlt, majd futtassa a `validate.py` és a `build.py` programot. A meglévő fordítások javítását szívesen fogadjuk. Ez a README minden kezelőfelületi nyelven elérhető (`README.<lang>.md`); a `README.md` (angol) a referenciaváltozat.

## Források és köszönetnyilvánítás

- A projektet elindító cikk: „[Hány óra van a Holdon…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)” (románul; AFP/Agerpres, stiripesurse.ro, 2026.10.18.).
- A pólusok és a kezdőmeridiánok tájolása: IAU WGCCRE 2009. Átlagos Kepler-féle pályaelemek: JPL (Standish). Marsi idő MSD/MTC: Allison & McEwen. Holdtávolság-sorozat: J. Meeus, *Astronomical Algorithms*.
- A fizikai értékek a szokásos, kerekített szakirodalmi adatok. A kolonizációs adatok kvalitatívak és tájékoztató jellegűek.

## Előzmények

### 2.3.3 — 2026-11-18

Ellenséges összehasonlító audit (az astronomy-engine-nel és a Mars24 képlettel szemben, differenciális tesztek, végigjárás mind a 8 nyelven) és javítások:
- Az állomások magassági szögei mostantól tartalmazzák a napéjegyenlőségek precesszióját (korábban 0,3–1,5°-kal tévedtek; most ≲ 0,04° a Marsnál és a Vénusznál, ≲ 0,3° a Jupiternél, a Szaturnuszánál és a Holdnál).
- TT − UTC: 1972-től a szökőmásodperc-táblázat, előtte a ΔT (Espenak–Meeus) a minden dátumra érvényes 69,184 s állandó helyett.
- Az 1–99. éveket csendben 1901–1999-ként számolta, a támogatott tartományon túli dátumok (275760. év és később) pedig kivételt okoztak; mindkettő kezelve van, és az átváltó ezt jelzi: „A kiválasztott dátum a támogatott tartományon kívül esik.”
- .ics fájlok: a `PRODID` tartalmazza a verziót (ORARIUM 2.3.3).
- Az egyedi link számai egyszerű tizedes alakban íródnak, hogy visszaolvashatók legyenek (a hatványkitevős alak elveszett).
- PWA: az oldal CSP-je nem engedte a webes jegyzéket, a service workert és az ikonokat, így az alkalmazás nem volt telepíthető és offline sem használható; javítva (`manifest-src`, `worker-src 'self'`, `img-src 'self'`), és lefedi egy teszt, amely HTTP-n szolgálja ki az alkalmazást és regisztrálja a service workert.
- Az „Őszinte korlátok” mostantól a mért pontosságot adja meg.
- Új regressziós teszt: `tests/regression.test.mjs` (51 ellenőrzés; a 2.3.2-n elbukik).

Korábbi verziók: [`CHANGELOG.md`](CHANGELOG.md).

## Licenc

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
