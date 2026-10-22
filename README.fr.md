# ORARIUM

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version :** 1.2.4 · **Dernière mise à jour :** 2026-10-22

**Application en ligne :** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Le temps sur tous les mondes**

ORARIUM est une application web autonome en un seul fichier, hors ligne (`index.html`, sans serveur, sans compte, sans pistage), qui propose une manière cohérente de mesurer le temps sur la Lune, sur Mars, sur toutes les planètes, planètes naines, astéroïdes, comètes et lunes du Système solaire. Elle s'inspire du débat sur l'heure lunaire (un décalage d'horloge d'environ 56 µs/jour, la résolution de la CGPM sur une échelle de temps de référence lunaire, et les questions ouvertes sur l'« altitude zéro » et les réseaux d'horloges).

Langues de l'interface : **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## L'idée : quatre horloges, deux formules

| Horloge | À quoi elle répond |
|---|---|
| **Horloge-Étalon** | À quelle vitesse une horloge atomique y marche-t-elle ? Seconde SI, temps propre sur la surface équipotentielle de référence du corps (« Temps Local de Surface », TLS), avec un taux ρ par rapport à la Terre. |
| **Horloge-Rythme** | Le jour solaire local divisé en 24 heures locales de *P*<sub>sol</sub>/24 secondes SI, de sorte que midi est à 12:00 sur tous les mondes. |
| **Horloge-Phase** | Quelle est l'heure locale réelle ? À partir de l'orientation IAU + une éphéméride képlérienne (planètes), l'élongation moyenne (Lune), MSD/MTC (Mars). Ailleurs, le rythme est exact et l'origine est fixée par convention. |
| **Horloge-Pont** | Chaque message porte (TLS, UTC, ρ) ; le récepteur soustrait le temps-lumière et applique ρ. |

```
ρ = (Φ⊕ − Φ_b) / c²          Φ = 3·GM☉/2a☉ + 3·GM_p/2a_s + GM_b/R + ½ω²R²
P_sol = 1 / | 1/P_sid ∓ 1/P_year |
```

## Contenu de l'application

- **Maintenant** — l'heure locale en direct sur 45 corps (planètes, 22 lunes, planètes naines, astéroïdes, une comète, un aérostat vénusien), avec le taux d'horloge ρ, la durée du jour, la **distance à la Terre en direct** (km, mi, UA, secondes/minutes/heures/années-lumière, distances lunaires) et le **temps de communication aller-retour**.
- **Fiches des corps** — grandeurs physiques en plusieurs unités, décomposition du taux d'horloge, exemples détaillés, calculateur d'altitude, ancrage de l'origine de l'horloge pour les corps qui n'en ont pas d'admise, et évaluation de colonisation.
- **Méthode** — les quatre horloges, les formules, un recalcul en direct des +56 µs/jour de la Lune, les réponses aux questions ouvertes, les limites assumées.
- **Convertisseur** — « quelle heure est-il là-bas quand il est … ici ? » pour n'importe quel corps et n'importe quelle longitude, avec n'importe quel fuseau horaire terrestre (sauts et chevauchements de l'heure d'été signalés).
- **Colonies** — un classement indicatif, pondéré par l'utilisateur, des candidats à la colonisation (7 facteurs, filtre sur le facteur vital).
- **Cartes** — cartes schématiques des zones de colonisation optimales pour chaque corps, avec terminateur jour/nuit, heure locale par rapport à l'horloge de référence terrestre, et prochain midi local.
- **Liaisons** — quand il est minuit local sur chaque corps (dans votre heure de référence et en UTC) et la fenêtre de transmission Terre–corps (station terrestre choisie, point choisi sur le corps, temps-lumière inclus), ainsi que les périodes de conjonction solaire où la liaison est interrompue.
- **Communication entre corps** — pour n'importe quelle paire de corps (pas seulement avec la Terre) : la fenêtre de communication où chacun voit l'autre au-dessus de l'horizon, le temps-lumière et les périodes de conjonction solaire ; de plus, chaque corps affiche désormais aussi son midi local (12:00).
- **Lien avec TerRa** — boutons « ↗ TerRa » à chaque minuit / midi calculé et dans la fiche du corps : ils ouvrent [TerRa](https://chiuta.github.io/TerRa/) à ce moment, avec le globe 3D pour la Terre ou le ciel vu depuis le corps choisi (lien unique). Le lien couvre les 44 corps (dont Phobos, Charon, Cérès, Éris, Bennu, etc.), et la fenêtre de communication entre deux corps a aussi « ↗ TerRa » pour chaque extrémité.
- **Lien unique et liaison dans les deux sens avec TerRa** — le bouton « 🔗 Lien unique » copie la vue actuelle (onglet, corps, moment fixé, station, paire de corps, seuil solaire) ; [TerRa](https://chiuta.github.io/TerRa/) ouvre ici le corps, l'heure et la fenêtre de transmission depuis votre position.
- **Scénarios** — exemples concrets (site d'Apollo 11, Jezero, Titan, Bennu, Vénus, Mercure, Pluton–Charon, tableau des aller-retour).
- **Horloge de référence terrestre** — UTC ou n'importe quel fuseau horaire IANA (p. ex. Bucarest), utilisé partout.

## Limites assumées

Modèle de taux d'horloge au premier ordre (p. ex. ≈488 µs/jour pour Mars contre ≈477 µs/jour dans les modèles complets) ; les heures locales « réelles » utilisent les orientations IAU moyennes et des éphémérides képlériennes simplifiées (erreur de l'ordre de quelques minutes, vérifiée avec Mars24 pour Mars) ; temps-lumière ≈0,5 % ; les cartes sont schématiques ; l'indice de colonisation est indicatif, pas une évaluation scientifique. Pour une navigation réelle, utilisez des éphémérides numériques complètes.

## Utilisation

Ouvrez `index.html` dans n'importe quel navigateur moderne (fonctionne depuis `file://`), ou publiez-le avec GitHub Pages (un workflow est inclus : **Settings → Pages → Source: GitHub Actions**).

## Développement

`index.html` est généré à partir de `src/template.html` (moteur + interface, chaînes sources en roumain) et des dictionnaires de traduction dans `src/i18n/`.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html (step 1 of 2; on its own it drops the fff-info block)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # step 2: rewrites fff-info / data-fff-hash in index.html and app.json (sha256, size); needs the fff-kit from chiuta.github.io
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tools/exercise.js index.html fr   # one language only
```

**Traductions.** Dans le code, chaque chaîne visible par l'utilisateur est `T('romanian source text', …args)` ; `src/i18n/keys.json` liste toutes les clés et `tr_<lang>.json` contient la traduction de chaque clé. Pour ajouter une langue : ajoutez son entrée à `LANGS` et `UNITS` dans `src/template.html`, créez `tr_<lang>.json` avec les mêmes clés, puis exécutez `validate.py` et `build.py`. Les corrections apportées aux traductions existantes sont les bienvenues. Ce README est également disponible dans chaque langue de l'interface (`README.<lang>.md`) ; `README.md` (anglais) est la version de référence.

## Sources et crédits

- Article à l'origine du projet : « [Quelle heure est-il sur la Lune…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805) » (en roumain; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientations des pôles et des méridiens origines : IAU WGCCRE 2009. Éléments képlériens moyens : JPL (Standish). Temps martien MSD/MTC : Allison & McEwen. Séries de la distance lunaire : J. Meeus, *Astronomical Algorithms*.
- Les valeurs physiques sont les chiffres usuels de la littérature, arrondis. Les données de colonisation sont qualitatives et indicatives.

## Historique

### 1.2.4 — 2026-10-22
- fff-kit 1.1.2 : PBKDF2 à 600 000 itérations, protection anti-clickjacking.

### 1.2.3 — 2026-10-22
- Hors ligne pour de bon : un service worker (cache d'abord, cache par version), un manifeste web et des icônes ont été ajoutés ; l'application s'ouvre donc sans réseau après la première visite et peut être installée (la promesse « hors ligne » du catalogue est désormais vraie). La chaîne de build (`npm run build`) applique les fichiers PWA et actualise l'étiquette de transparence.
- Accessibilité : les 19 champs du convertisseur, de la liaison de communication et de la fenêtre par paires ont désormais des étiquettes associées par programmation à leurs champs.
- Mobile : correction du débordement horizontal de 10 px sur les cartes « Maintenant » (l'étiquette du nom du corps ne dépasse plus de la carte) ; le petit texte (étiquettes, notes) fait au moins 12 px.

### 1.2.2 — 2026-10-22
- L'étiquette d'accessibilité de la carte schématique est traduite dès le départ (elle restait en roumain avant l'ouverture de l'onglet carte), et le titre de l'article cité en pied de page est rendu en français, allemand et hongrois comme dans les autres langues.

### 1.2.1 — 2026-10-22
- Le pied de page « Sources et méthode », la méta-description et le panneau de transparence fff-kit (nom et description) suivent désormais la langue de l'interface.

## Licence

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
