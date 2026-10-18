# ORARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

**Online alkalmazás:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Idő minden világon**

Az ORARIUM egyetlen fájlból álló, offline webalkalmazás (`index.html`, szerver, fiók és követés nélkül), amely egységes módot javasol az idő megadására a Holdon, a Marson, valamennyi bolygón, törpebolygón, aszteroidán, üstökösön és a Naprendszer holdjain. A holdidőről folyó vita ihlette (≈56 µs/nap óraeltérés, a CGPM határozata a holdi referencia-időskáláról, valamint a „nulla magasságról” és az órahálózatokról szóló nyitott kérdések).

Kezelőfelületi nyelvek: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

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
- **Forgatókönyvek** — konkrét példák (az Apollo–11 helyszíne, Jezero, Titán, Bennu, Vénusz, Merkúr, Plútó–Charon, oda-vissza táblázat).
- **Referencia földi idő** — UTC vagy bármely IANA-időzóna (pl. Bukarest), mindenhol ezt használja.

## Őszinte korlátok

Elsőrendű óraráta-modell (pl. a Marsra ≈488 µs/nap, szemben a teljes modellek ≈477 µs/napjával); a „valós” helyi idők átlagos IAU-tájolásokat és egyszerűsített Kepler-féle efemeridákat használnak (a hiba nagyságrendje percekben mérhető, a Marson a Mars24-hez képest ellenőrizve); a fényidő ≈0,5 %-ra pontos; a térképek sematikusak; a kolonizációs index tájékoztató jellegű, nem tudományos értékelés. Valós navigációhoz teljes numerikus efemeridákat kell használni.

## Használat

Nyissa meg az `index.html` fájlt bármely modern böngészőben (`file://` alatt is működik), vagy tegye közzé a GitHub Pages segítségével (a tárolóban található egy munkafolyamat: **Settings → Pages → Source: GitHub Actions**).

## Fejlesztés

Az `index.html` a `src/template.html` fájlból (motor + felület, román nyelvű forrásszövegek) és a `src/i18n/` könyvtár fordítási szótáraiból készül.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tools/exercise.js index.html fr   # one language only
```

**Fordítások.** A kódban minden, a felhasználó számára látható szöveg `T('romanian source text', …args)` alakú; a `src/i18n/keys.json` felsorolja az összes kulcsot, a `tr_<lang>.json` pedig az egyes kulcsok fordítását tartalmazza. Új nyelv hozzáadásához: vegye fel a nyelvet a `src/template.html` fájl `LANGS` és `UNITS` részébe, hozza létre ugyanazokkal a kulcsokkal a `tr_<lang>.json` fájlt, majd futtassa a `validate.py` és a `build.py` programot. A meglévő fordítások javítását szívesen fogadjuk. Ez a README minden kezelőfelületi nyelven elérhető (`README.<lang>.md`); a `README.md` (angol) a referenciaváltozat.

## Források és köszönetnyilvánítás

- A projektet elindító cikk: „[Hány óra van a Holdon…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)” (románul; AFP/Agerpres, stiripesurse.ro, 2026.10.18.).
- A pólusok és a kezdőmeridiánok tájolása: IAU WGCCRE 2009. Átlagos Kepler-féle pályaelemek: JPL (Standish). Marsi idő MSD/MTC: Allison & McEwen. Holdtávolság-sorozat: J. Meeus, *Astronomical Algorithms*.
- A fizikai értékek a szokásos, kerekített szakirodalmi adatok. A kolonizációs adatok kvalitatívak és tájékoztató jellegűek.

## Licenc

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
