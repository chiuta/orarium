# ORARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · **Italiano** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versione:** 2.3.3 · **Ultimo aggiornamento:** 2026-11-18

**Stato:** stabile · **Offline:** completo (nessuna rete richiesta; i link «↗ TerRa» e «↗ Bolta» aprono altre app online solo se li premi)

**App online:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Il tempo su tutti i mondi**

**Scheda breve:** Il tempo su tutti i mondi: un campione, due formule e quattro orologi per la Luna, Marte e tutto il Sistema solare. File unico, offline, senza account.

Lingue dell'interfaccia: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## Descrizione dettagliata

ORARIUM è un'app web in un unico file, offline (`index.html`, senza server, senza account, senza tracciamento), che propone un modo coerente di misurare il tempo sulla Luna, su Marte, su tutti i pianeti, i pianeti nani, gli asteroidi, le comete e le lune del Sistema Solare. Nasce dal dibattito sul tempo lunare (uno scarto dell'orologio di ≈56 µs/giorno, la risoluzione della CGPM su una scala di tempo di riferimento lunare e le questioni aperte sulla «quota zero» e sulle reti di orologi).

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
- **Collegamento con TerRa** — pulsanti «↗ TerRa» a ogni mezzanotte / mezzogiorno calcolato e nella scheda del corpo: aprono [TerRa](https://chiuta.github.io/TerRa/) in quel momento, con il globo 3D per la Terra o il cielo visto dal corpo scelto (link unico). Il collegamento copre tutti i 44 corpi (inclusi Phobos, Caronte, Cerere, Eris, Bennu, ecc.) e anche la finestra di comunicazione tra due corpi ha «↗ TerRa» per ciascun estremo.
- **Link unico e collegamento bidirezionale con TerRa** — il pulsante «🔗 Link unico» copia la vista attuale (scheda, corpo, momento fissato, stazione, coppia di corpi, soglia solare); [TerRa](https://chiuta.github.io/TerRa/) apre qui il corpo, l'ora e la finestra di trasmissione dalla tua posizione.
- **Bolta e .ics** — «↗ Bolta» apre il planetario offline [Bolta](https://chiuta.github.io/apps/Bolta/) per la stazione scelta (all'istante fissato o in tempo reale); per qualsiasi coppia di corpi, «📅 Esporta le finestre in .ics» scarica le prossime finestre di comunicazione e l'interruzione per congiunzione solare come calendario RFC 5545 (UTC), importabile in Orar o in qualsiasi calendario. I link di «Adesso» verso TerRa non bloccano più l'ora.
- **Pianificatore di riunioni (2.0)** — per qualsiasi coppia di corpi (ad es. Terra–Marte): le fasce in cui una riunione della durata scelta rientra nell'orario di lavoro locale a entrambi i capi, con il collegamento aperto (senza congiunzione solare) e il ritardo del segnale (andata e andata e ritorno) incluso; mostra l'ora locale di ciascun capo alla partenza e all'arrivo. Indicativo, non per operazioni reali.
- **Scenari** — esempi concreti (sito dell'Apollo 11, Jezero, Titano, Bennu, Venere, Mercurio, Plutone–Caronte, tabella dell'andata e ritorno).
- **Orologio di riferimento terrestre** — UTC o qualsiasi fuso orario IANA (ad es. Bucarest), usato ovunque.

## Limiti onesti

Il calcolo è del primo ordine (Sole + pianeta madre + superficie + rotazione, orbite circolari in media). Per Marte ottiene ≈488 µs/giorno, mentre i modelli completi in letteratura danno ≈477 µs/giorno, con variazioni periodiche di centinaia di µs a causa dell'eccentricità. Le ore «reali» usano orientamenti IAU medi (senza librazioni) e effemeridi kepleriane semplificate. Verificato rispetto alla formula Mars24 e alla libreria astronomica astronomy-engine: l'ora solare su Marte si scosta al massimo di ≈0,5 min tra il 1900 e il 2100 (meno di 1 min tra il 1800 e il 2200, ≈5 min negli anni 1000–3000); il tempo di luce è esatto a ≈0,5 % tra il 1900 e il 2200 (fino a ≈2 % verso l'anno 3000); le elevazioni delle stazioni sulla Terra differiscono al massimo di ≈0,04° per Marte e Venere e di ≈0,3° per Giove, Saturno e la Luna (2020–2100). TT − UTC = 32,184 s + (TAI − UTC): dal 1972 si usa la tabella dei secondi intercalari (69,184 s dal 2017, supponendo che non ne seguano altri); prima del 1972, il ΔT di Espenak–Meeus. Le mappe sono schematiche. L'indice di colonizzazione è indicativo, non una valutazione scientifica. Per la navigazione reale si usano effemeridi numeriche complete.

## Uso

Apri `index.html` in un qualsiasi browser moderno (funziona da `file://`), oppure pubblicalo con GitHub Pages (è incluso un workflow: **Settings → Pages → Source: GitHub Actions**).

## Sviluppo

`index.html` è generato da `src/template.html` (motore + interfaccia, stringhe sorgente in rumeno) e dai dizionari di traduzione in `src/i18n/`.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html (step 1 of 2; on its own it drops the fff-info block)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # step 2: rewrites fff-info / data-fff-hash in index.html and app.json (sha256, size); needs the fff-kit from chiuta.github.io
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tests/regression.test.mjs   # regression tests: dates/years, ICS, PWA/service worker, unique link
node tools/exercise.js index.html fr   # one language only
```

**Traduzioni.** Nel codice, ogni stringa visibile all'utente è `T('romanian source text', …args)`; `src/i18n/keys.json` elenca tutte le chiavi e `tr_<lang>.json` contiene la traduzione di ciascuna chiave. Per aggiungere una lingua: aggiungi la sua voce a `LANGS` e `UNITS` in `src/template.html`, crea `tr_<lang>.json` con le stesse chiavi, esegui `validate.py` e `build.py`. Le correzioni alle traduzioni esistenti sono molto gradite. Questo README è disponibile anche in ogni lingua dell'interfaccia (`README.<lang>.md`); `README.md` (inglese) è la versione di riferimento.

## Fonti e crediti

- Articolo che ha dato avvio al progetto: "[Che ora è sulla Luna…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)" (in rumeno; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientamenti dei poli e dei meridiani di riferimento: IAU WGCCRE 2009. Elementi kepleriani medi: JPL (Standish). Tempo marziano MSD/MTC: Allison & McEwen. Serie delle distanze lunari: J. Meeus, *Astronomical Algorithms*.
- I valori fisici sono le consuete cifre di letteratura, arrotondate. I dati sulla colonizzazione sono qualitativi e indicativi.

## Cronologia

### 2.3.3 — 2026-11-18

Audit comparativo avversariale (rispetto ad astronomy-engine e alla formula Mars24, test differenziali, percorso in tutte le 8 lingue) e correzioni:
- Le elevazioni delle stazioni includono ora la precessione degli equinozi (prima sbagliate di 0,3–1,5°; ora ≲ 0,04° per Marte e Venere, ≲ 0,3° per Giove, Saturno e la Luna).
- TT − UTC: tabella dei secondi intercalari dal 1972 e, prima, ΔT (Espenak–Meeus), invece della costante 69,184 s per ogni data.
- Gli anni 1–99 venivano calcolati in silenzio come 1901–1999 e le date oltre il limite supportato (anno 275760 e successivi) generavano un'eccezione; ora entrambi i casi sono gestiti e il convertitore indica «La data scelta è fuori dall'intervallo supportato.»
- File .ics: `PRODID` riporta la versione (ORARIUM 2.3.3).
- I numeri nel link unico sono scritti in decimale semplice per poter essere riletti (la notazione esponenziale andava persa).
- PWA: la CSP della pagina non consentiva il manifest web, il service worker e le icone, quindi l'app non poteva essere installata né usata offline; corretto (`manifest-src`, `worker-src 'self'`, `img-src 'self'`) e coperto da un test che serve l'app via HTTP e registra il service worker.
- «Limiti onesti» indica ora la precisione misurata.
- Nuovo test di regressione `tests/regression.test.mjs` (51 verifiche; fallisce sulla 2.3.2).

Versioni precedenti: [`CHANGELOG.md`](CHANGELOG.md).

## Licenza

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
