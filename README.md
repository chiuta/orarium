# ORARIUM

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version:** 1.2.2 · **Last updated:** 2026-10-22

**Live app:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Time on every world**

ORARIUM is a single-file, offline web app (`index.html`, no server, no account, no tracking) that proposes one consistent way to tell time on the Moon, Mars, all planets, dwarf planets, asteroids, comets and moons of the Solar System. It was inspired by the debate on lunar time (a ≈56 µs/day clock offset, the CGPM resolution on a lunar reference time scale, and the open questions on "altitude zero" and clock networks).

Interface languages: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## The idea: four clocks, two formulas

| Clock | What it answers |
|---|---|
| **Standard Clock** | How fast does an atomic clock run there? SI second, proper time on the body's reference equipotential surface ("Local Surface Time", TLS), with a rate ρ relative to Earth. |
| **Rhythm Clock** | The local solar day split into 24 local hours of *P*<sub>sol</sub>/24 SI seconds, so noon is 12:00 on every world. |
| **Phase Clock** | What is the actual local hour? From IAU orientation + a Keplerian ephemeris (planets), mean elongation (Moon), MSD/MTC (Mars). Elsewhere the rhythm is exact and the origin is set by convention. |
| **Bridge Clock** | Every message carries (TLS, UTC, ρ); the receiver subtracts light time and applies ρ. |

```
ρ = (Φ⊕ − Φ_b) / c²          Φ = 3·GM☉/2a☉ + 3·GM_p/2a_s + GM_b/R + ½ω²R²
P_sol = 1 / | 1/P_sid ∓ 1/P_year |
```

## What is in the app

- **Now** — live local time on 45 bodies (planets, 22 moons, dwarf planets, asteroids, a comet, a Venus aerostat), with clock rate ρ, day length, **live Earth distance** (km, mi, AU, light-seconds/minutes/hours/years, lunar distances) and **round-trip communication time**.
- **Body sheets** — physical quantities in several units, clock-rate breakdown, worked examples, an altitude calculator, anchoring of the clock origin for bodies without an accepted one, and a colonization assessment.
- **Method** — the four clocks, the formulas, a live recomputation of the Moon's +56 µs/day, answers to the open questions, honest limits.
- **Converter** — "what time is it there when it is … here?" for any body and longitude, with any Earth time zone (DST gaps/overlaps flagged).
- **Colonies** — an indicative, user-weighted ranking of colonization candidates (7 factors, vital-factor gate).
- **Maps** — schematic maps of optimal colonization zones for each body with day/night terminator, local time versus the Earth reference clock, and next local noon.
- **Comms** — when it is local midnight on each body (in your reference time and in UTC) and the Earth–body transmission window (chosen ground station, chosen point on the body, light time included), plus the solar-conjunction periods when the link is interrupted.
- **Communication between bodies** — for any pair of bodies (not only with Earth): the communication window in which each sees the other above the horizon, the light time and the solar-conjunction periods; in addition, every body now also shows its local noon (12:00).
- **TerRa link** — "↗ TerRa" buttons on every computed midnight / noon and in the body sheet: they open [TerRa](https://chiuta.github.io/TerRa/) at that moment, with the 3D globe for Earth or the sky seen from the chosen body (unique link). The link covers all 44 bodies (including Phobos, Charon, Ceres, Eris, Bennu, etc.), and the pair communication window also has a “↗ TerRa” link for each end.
- **Unique link and two-way TerRa connection** — the "🔗 Unique link" button copies the current view (tab, body, fixed moment, station, body pair, solar threshold); [TerRa](https://chiuta.github.io/TerRa/) opens the body, the time and the transmission window from your location here.
- **Bolta and .ics** — "↗ Bolta" opens the offline planetarium [Bolta](https://chiuta.github.io/apps/Bolta/) for the chosen station (at the fixed moment, or live); for any two bodies, "📅 Export windows as .ics" downloads the next communication windows and the solar-conjunction interruption as an RFC 5545 calendar (UTC) that imports into Orar or any calendar. "Now" links to TerRa no longer freeze the time.
- **Scenarios** — concrete examples (Apollo 11 site, Jezero, Titan, Bennu, Venus, Mercury, Pluto–Charon, round-trip table).
- **Earth reference clock** — UTC or any IANA time zone (e.g. Bucharest), used throughout.

## Honest limits

First-order clock-rate model (e.g. ≈488 µs/day for Mars vs ≈477 µs/day in full models); "real" local hours use mean IAU orientations and simplified Keplerian ephemerides (error of the order of minutes, checked against Mars24 for Mars); light time ≈0.5 %; maps are schematic; colonization index is indicative, not a scientific assessment. For real navigation use full numerical ephemerides.

## Use

Open `index.html` in any modern browser (works from `file://`), or publish it with GitHub Pages (a workflow is included: **Settings → Pages → Source: GitHub Actions**).

## Develop

`index.html` is generated from `src/template.html` (engine + UI, Romanian source strings) and the translation dictionaries in `src/i18n/`.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html (step 1 of 2; on its own it drops the fff-info block)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # step 2: rewrites fff-info / data-fff-hash in index.html and app.json (sha256, size); needs the fff-kit from chiuta.github.io
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tools/exercise.js index.html fr   # one language only
```

**Translations.** In the code, every user-visible string is `T('romanian source text', …args)`; `src/i18n/keys.json` lists all keys and `tr_<lang>.json` holds the translation of each key. To add a language: add its entry to `LANGS` and `UNITS` in `src/template.html`, create `tr_<lang>.json` with the same keys, run `validate.py` and `build.py`. Corrections to existing translations are very welcome. This README is also available in every interface language (`README.<lang>.md`); `README.md` (English) is the reference version.

## Sources and credits

- Article that prompted the project: "[What time is it on the Moon…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)" (in Romanian; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Pole and prime-meridian orientations: IAU WGCCRE 2009. Mean Keplerian elements: JPL (Standish). Martian time MSD/MTC: Allison & McEwen. Lunar distance series: J. Meeus, *Astronomical Algorithms*.
- Physical values are the usual literature figures, rounded. Colonization data are qualitative and indicative.

## Changelog

### 1.2.2 — 2026-10-22
- The accessibility label of the schematic map is now translated from the start (it was Romanian until the map tab was opened), and the cited article title in the sources footer is rendered in French, German and Hungarian like in the other languages.

### 1.2.1 — 2026-10-22
- The sources-and-method footer, the meta description and the fff-kit transparency panel (name and description) now follow the interface language.

## License

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
