# ORARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · **Italiano** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**App online:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Il tempo su tutti i mondi**

ORARIUM è un'app web in un unico file, offline (`index.html`, senza server, senza account, senza tracciamento), che propone un modo coerente di misurare il tempo sulla Luna, su Marte, su tutti i pianeti, i pianeti nani, gli asteroidi, le comete e le lune del Sistema Solare. Nasce dal dibattito sul tempo lunare (uno scarto dell'orologio di ≈56 µs/giorno, la risoluzione della CGPM su una scala di tempo di riferimento lunare e le questioni aperte sulla «quota zero» e sulle reti di orologi).

Lingue dell'interfaccia: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## L'idea: quattro orologi, due formule

| Orologio | A cosa risponde |
|---|---|
| **Orologio Standard** | Quanto veloce va un orologio atomico lì? Secondo SI, tempo proprio sulla superficie equipotenziale di riferimento del corpo («Tempo Locale di Superficie», TLS), con un tasso ρ rispetto alla Terra. |
| **Orologio Ritmo** | Il giorno solare locale diviso in 24 ore locali di *P*<sub>sol</sub>/24 secondi SI, così mezzogiorno è le 12:00 su ogni mondo. |
| **Orologio Fase** | Qual è l'ora locale effettiva? Dall'orientamento IAU + un'effemeride kepleriana (pianeti), dall'elongazione media (Luna), da MSD/MTC (Marte). Altrove il ritmo è esatto e l'origine è fissata per convenzione. |
| **Orologio Ponte** | Ogni messaggio porta (TLS, UTC, ρ); il ricevitore sottrae il tempo di luce e applica ρ. |

```
ρ = (Φ⊕ − Φ_b) / c²          Φ = 3·GM☉/2a☉ + 3·GM_p/2a_s + GM_b/R + ½ω²R²
P_sol = 1 / | 1/P_sid ∓ 1/P_year |
```

## Cosa c'è nell'app

- **Adesso** — ora locale in tempo reale su 45 corpi (pianeti, 22 lune, pianeti nani, asteroidi, una cometa, un aerostato su Venere), con tasso dell'orologio ρ, durata del giorno, **distanza dalla Terra in tempo reale** (km, mi, UA, secondi/minuti/ore/anni luce, distanze lunari) e **tempo di comunicazione andata e ritorno**.
- **Schede dei corpi** — grandezze fisiche in varie unità, scomposizione del tasso dell'orologio, esempi svolti, un calcolatore di quota, ancoraggio dell'origine dell'orologio per i corpi che non ne hanno una accettata e una valutazione della colonizzazione.
- **Il metodo** — i quattro orologi, le formule, un ricalcolo in tempo reale dei +56 µs/giorno della Luna, le risposte alle questioni aperte, i limiti onesti.
- **Convertitore** — «che ora è lì quando qui sono le …?» per qualsiasi corpo e longitudine, con qualsiasi fuso orario terrestre (salti e sovrapposizioni dell'ora legale segnalati).
- **Colonie** — una classifica indicativa, con pesi scelti dall'utente, dei candidati alla colonizzazione (7 fattori, soglia del fattore vitale).
- **Mappe** — mappe schematiche delle zone ottimali di colonizzazione per ciascun corpo, con terminatore giorno/notte, ora locale rispetto all'orologio di riferimento terrestre e prossimo mezzogiorno locale.
- **Collegamenti** — quando è mezzanotte locale su ciascun corpo (nella tua ora di riferimento e in UTC) e la finestra di trasmissione Terra–corpo (stazione terrestre scelta, punto scelto sul corpo, tempo-luce incluso), più i periodi di congiunzione solare in cui il collegamento è interrotto.
- **Comunicazione tra corpi** — per qualsiasi coppia di corpi (non solo con la Terra): la finestra di comunicazione in cui ciascuno vede l'altro sopra l'orizzonte, il tempo-luce e i periodi di congiunzione solare; inoltre ogni corpo mostra ora anche il suo mezzogiorno locale (12:00).
- **Collegamento con TerRa** — pulsanti «↗ TerRa» a ogni mezzanotte / mezzogiorno calcolato e nella scheda del corpo: aprono [TerRa](https://chiuta.github.io/TerRa/) in quel momento, con il globo 3D per la Terra o il cielo visto dal corpo scelto (link unico).
- **Scenari** — esempi concreti (sito dell'Apollo 11, Jezero, Titano, Bennu, Venere, Mercurio, Plutone–Caronte, tabella dell'andata e ritorno).
- **Orologio di riferimento terrestre** — UTC o qualsiasi fuso orario IANA (ad es. Bucarest), usato ovunque.

## Limiti onesti

Modello del tasso dell'orologio al primo ordine (ad es. ≈488 µs/giorno per Marte contro ≈477 µs/giorno nei modelli completi); le ore locali «reali» usano orientamenti IAU medi ed effemeridi kepleriane semplificate (errore dell'ordine dei minuti, verificato con Mars24 per Marte); tempo di luce ≈0,5 %; le mappe sono schematiche; l'indice di colonizzazione è indicativo, non una valutazione scientifica. Per la navigazione reale usa effemeridi numeriche complete.

## Uso

Apri `index.html` in un qualsiasi browser moderno (funziona da `file://`), oppure pubblicalo con GitHub Pages (è incluso un workflow: **Settings → Pages → Source: GitHub Actions**).

## Sviluppo

`index.html` è generato da `src/template.html` (motore + interfaccia, stringhe sorgente in rumeno) e dai dizionari di traduzione in `src/i18n/`.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tools/exercise.js index.html fr   # one language only
```

**Traduzioni.** Nel codice, ogni stringa visibile all'utente è `T('romanian source text', …args)`; `src/i18n/keys.json` elenca tutte le chiavi e `tr_<lang>.json` contiene la traduzione di ciascuna chiave. Per aggiungere una lingua: aggiungi la sua voce a `LANGS` e `UNITS` in `src/template.html`, crea `tr_<lang>.json` con le stesse chiavi, esegui `validate.py` e `build.py`. Le correzioni alle traduzioni esistenti sono molto gradite. Questo README è disponibile anche in ogni lingua dell'interfaccia (`README.<lang>.md`); `README.md` (inglese) è la versione di riferimento.

## Fonti e crediti

- Articolo che ha dato avvio al progetto: "[Che ora è sulla Luna…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)" (in rumeno; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientamenti dei poli e dei meridiani di riferimento: IAU WGCCRE 2009. Elementi kepleriani medi: JPL (Standish). Tempo marziano MSD/MTC: Allison & McEwen. Serie delle distanze lunari: J. Meeus, *Astronomical Algorithms*.
- I valori fisici sono le consuete cifre di letteratura, arrotondate. I dati sulla colonizzazione sono qualitativi e indicativi.

## Licenza

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
