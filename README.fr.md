# ORARIUM

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version :** 2.3.3 · **Dernière mise à jour :** 2026-11-18

**État :** stable · **Hors ligne :** complet (aucun réseau requis ; les liens « ↗ TerRa » et « ↗ Bolta » ouvrent d'autres applications en ligne seulement si vous cliquez)

**Application en ligne :** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**Le temps sur tous les mondes**

**Fiche courte:** Le temps sur tous les mondes : un étalon, deux formules et quatre horloges pour la Lune, Mars et tout le Système solaire. Fichier unique, hors ligne, sans compte.

Langues de l'interface : **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## Description détaillée

ORARIUM est une application web autonome en un seul fichier, hors ligne (`index.html`, sans serveur, sans compte, sans pistage), qui propose une manière cohérente de mesurer le temps sur la Lune, sur Mars, sur toutes les planètes, planètes naines, astéroïdes, comètes et lunes du Système solaire. Elle s'inspire du débat sur l'heure lunaire (un décalage d'horloge d'environ 56 µs/jour, la résolution de la CGPM sur une échelle de temps de référence lunaire, et les questions ouvertes sur l'« altitude zéro » et les réseaux d'horloges).

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
- **Bolta et .ics** — « ↗ Bolta » ouvre le planétarium hors ligne [Bolta](https://chiuta.github.io/apps/Bolta/) pour la station choisie (au moment fixé ou en direct) ; pour n'importe quelle paire de corps, « 📅 Exporter les fenêtres en .ics » télécharge les prochaines fenêtres de communication et l'interruption par conjonction solaire sous forme de calendrier RFC 5545 (UTC), importable dans Orar ou dans n'importe quel calendrier. Les liens « Maintenant » vers TerRa ne figent plus l'heure.
- **Planificateur de réunions (2.0)** — pour n'importe quelle paire de corps (p. ex. Terre–Mars) : les créneaux où une réunion de la durée choisie tient dans les heures de travail locales aux deux extrémités, avec la liaison ouverte (hors conjonction solaire) et le délai du signal (aller et aller-retour) pris en compte ; affiche l'heure locale de chaque extrémité au départ et à l'arrivée. Indicatif, pas pour des opérations réelles.
- **Scénarios** — exemples concrets (site d'Apollo 11, Jezero, Titan, Bennu, Vénus, Mercure, Pluton–Charon, tableau des aller-retour).
- **Horloge de référence terrestre** — UTC ou n'importe quel fuseau horaire IANA (p. ex. Bucarest), utilisé partout.

## Limites assumées

Le calcul est du premier ordre (Soleil + planète-mère + surface + rotation, orbites circulaires en moyenne). Pour Mars, il donne ≈ 488 µs/j, alors que les modèles complets de la littérature donnent ≈ 477 µs/j, avec des variations périodiques de plusieurs centaines de µs dues à l'excentricité. Les heures « réelles » utilisent des orientations IAU moyennes (sans librations) et des éphémérides képlériennes simplifiées. Vérifié par rapport à la formule Mars24 et à la bibliothèque astronomique astronomy-engine : l'heure solaire sur Mars s'écarte au plus de ≈ 0,5 min en 1900–2100 (moins de 1 min en 1800–2200, ≈ 5 min dans les années 1000–3000) ; le temps-lumière est exact à ≈ 0,5 % en 1900–2200 (jusqu'à ≈ 2 % vers l'an 3000) ; les élévations des stations sur Terre diffèrent d'au plus ≈ 0,04° pour Mars et Vénus et ≈ 0,3° pour Jupiter, Saturne et la Lune (2020–2100). TT − UTC = 32,184 s + (TAI − UTC) : à partir de 1972 on utilise la table des secondes intercalaires (69,184 s depuis 2017, en supposant qu'aucune autre ne suivra), avant 1972 le ΔT d'Espenak–Meeus. Les cartes sont schématiques . L'indice de colonisation est indicatif, pas une évaluation scientifique. Pour une navigation réelle, on utilise des éphémérides numériques complètes.

## Utilisation

Ouvrez `index.html` dans n'importe quel navigateur moderne (fonctionne depuis `file://`), ou publiez-le avec GitHub Pages (un workflow est inclus : **Settings → Pages → Source: GitHub Actions**).

## Développement

`index.html` est généré à partir de `src/template.html` (moteur + interface, chaînes sources en roumain) et des dictionnaires de traduction dans `src/i18n/`.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html (step 1 of 2; on its own it drops the fff-info block)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # step 2: rewrites fff-info / data-fff-hash in index.html and app.json (sha256, size); needs the fff-kit from chiuta.github.io
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tests/regression.test.mjs   # regression tests: dates/years, ICS, PWA/service worker, unique link
node tools/exercise.js index.html fr   # one language only
```

**Traductions.** Dans le code, chaque chaîne visible par l'utilisateur est `T('romanian source text', …args)` ; `src/i18n/keys.json` liste toutes les clés et `tr_<lang>.json` contient la traduction de chaque clé. Pour ajouter une langue : ajoutez son entrée à `LANGS` et `UNITS` dans `src/template.html`, créez `tr_<lang>.json` avec les mêmes clés, puis exécutez `validate.py` et `build.py`. Les corrections apportées aux traductions existantes sont les bienvenues. Ce README est également disponible dans chaque langue de l'interface (`README.<lang>.md`) ; `README.md` (anglais) est la version de référence.

## Sources et crédits

- Article à l'origine du projet : « [Quelle heure est-il sur la Lune…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805) » (en roumain; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientations des pôles et des méridiens origines : IAU WGCCRE 2009. Éléments képlériens moyens : JPL (Standish). Temps martien MSD/MTC : Allison & McEwen. Séries de la distance lunaire : J. Meeus, *Astronomical Algorithms*.
- Les valeurs physiques sont les chiffres usuels de la littérature, arrondis. Les données de colonisation sont qualitatives et indicatives.

## Historique

### 2.3.3 — 2026-11-18

Audit comparatif contradictoire (face à astronomy-engine et à la formule Mars24, tests différentiels, parcours dans les 8 langues) et corrections :
- Les élévations des stations tiennent désormais compte de la précession des équinoxes (erreur de 0,3–1,5° auparavant ; maintenant ≲ 0,04° pour Mars et Vénus, ≲ 0,3° pour Jupiter, Saturne et la Lune).
- TT − UTC : table des secondes intercalaires depuis 1972 et ΔT (Espenak–Meeus) avant, au lieu de la constante 69,184 s pour toute date.
- Les années 1–99 étaient calculées silencieusement comme 1901–1999, et les dates au-delà de la limite admise (année 275760 et après) provoquaient une exception ; les deux cas sont traités, et le convertisseur indique « La date choisie est hors de la plage prise en charge. »
- Fichiers .ics : `PRODID` contient la version (ORARIUM 2.3.3).
- Les nombres du lien unique sont écrits en décimal simple pour pouvoir être relus (la notation exponentielle se perdait).
- PWA : la CSP de la page n'autorisait ni le manifeste web, ni le service worker, ni les icônes, si bien que l'application ne pouvait ni s'installer ni fonctionner hors ligne ; corrigé (`manifest-src`, `worker-src 'self'`, `img-src 'self'`) et couvert par un test qui sert l'application en HTTP et enregistre le service worker.
- « Limites assumées » indique désormais la précision mesurée.
- Nouveau test de régression `tests/regression.test.mjs` (51 vérifications ; il échoue sur la 2.3.2).

Versions antérieures : [`CHANGELOG.md`](CHANGELOG.md).

## Licence

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
