# ORARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versión:** 2.1.0 · **Última actualización:** 2026-10-27

**Estado:** estable · **Sin conexión:** completo (no requiere red; los enlaces «↗ TerRa» y «↗ Bolta» abren otras aplicaciones en línea solo si los pulsas)

**Aplicación en línea:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

**El tiempo en todos los mundos**

**Ficha corta:** El tiempo en todos los mundos: un patrón, dos fórmulas y cuatro relojes para la Luna, Marte y todo el Sistema Solar. Un solo archivo, sin conexión, sin cuenta.

Idiomas de la interfaz: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## Descripción detallada

ORARIUM es una aplicación web de un solo archivo y sin conexión (`index.html`, sin servidor, sin cuenta, sin seguimiento) que propone una manera coherente de medir el tiempo en la Luna, Marte, todos los planetas, planetas enanos, asteroides, cometas y lunas del Sistema Solar. Nació a raíz del debate sobre la hora lunar (un desfase de reloj de ≈56 µs/día, la resolución de la CGPM sobre una escala de tiempo de referencia lunar y las cuestiones abiertas sobre la «altitud cero» y las redes de relojes).

## La idea: cuatro relojes, dos fórmulas

| Reloj | A qué responde |
|---|---|
| **Reloj Estándar** | ¿A qué ritmo marcha allí un reloj atómico? Segundo SI, tiempo propio sobre la superficie equipotencial de referencia del cuerpo («Tiempo Local de Superficie», TLS), con una tasa ρ relativa a la Tierra. |
| **Reloj de Ritmo** | El día solar local dividido en 24 horas locales de *P*<sub>sol</sub>/24 segundos SI, de modo que el mediodía son las 12:00 en todos los mundos. |
| **Reloj de Fase** | ¿Cuál es la hora local real? A partir de la orientación de la UAI + una efeméride kepleriana (planetas), la elongación media (Luna), MSD/MTC (Marte). En el resto de los casos el ritmo es exacto y el origen se fija por convención. |
| **Reloj Puente** | Cada mensaje lleva (TLS, UTC, ρ); el receptor resta el tiempo de luz y aplica ρ. |

```
ρ = (Φ⊕ − Φ_b) / c²          Φ = 3·GM☉/2a☉ + 3·GM_p/2a_s + GM_b/R + ½ω²R²
P_sol = 1 / | 1/P_sid ∓ 1/P_year |
```

## Qué incluye la aplicación

- **Ahora** — hora local en directo en 45 cuerpos (planetas, 22 lunas, planetas enanos, asteroides, un cometa, un aerostato en Venus), con la tasa del reloj ρ, la duración del día, la **distancia a la Tierra en directo** (km, mi, UA, segundos/minutos/horas/años luz, distancias lunares) y el **tiempo de comunicación de ida y vuelta**.
- **Fichas de los cuerpos** — magnitudes físicas en varias unidades, desglose de la tasa del reloj, ejemplos resueltos, una calculadora de altitud, anclaje del origen del reloj para los cuerpos que carecen de uno aceptado y una evaluación de colonización.
- **Método** — los cuatro relojes, las fórmulas, un nuevo cálculo en directo de los +56 µs/día de la Luna, respuestas a las cuestiones abiertas y límites honestos.
- **Conversor** — «¿qué hora es allí cuando es … aquí?» para cualquier cuerpo y longitud, con cualquier huso horario de la Tierra (se señalan los saltos y solapamientos del horario de verano).
- **Colonias** — una clasificación orientativa, ponderada por el usuario, de candidatos a la colonización (7 factores, filtro de factores vitales).
- **Mapas** — mapas esquemáticos de las zonas óptimas de colonización de cada cuerpo, con el terminador día/noche, la hora local frente al reloj de referencia terrestre y el próximo mediodía local.
- **Enlaces** — cuándo es medianoche local en cada cuerpo (en tu hora de referencia y en UTC) y la ventana de transmisión Tierra–cuerpo (estación terrestre elegida, punto elegido del cuerpo, con el tiempo luz incluido), además de los periodos de conjunción solar en los que el enlace se interrumpe.
- **Comunicación entre cuerpos** — para cualquier par de cuerpos (no solo con la Tierra): la ventana de comunicación en la que cada uno ve al otro sobre el horizonte, el tiempo luz y los periodos de conjunción solar; además, cada cuerpo muestra ahora también su mediodía local (12:00).
- **Enlace con TerRa** — botones «↗ TerRa» en cada medianoche / mediodía calculado y en la ficha del cuerpo: abren [TerRa](https://chiuta.github.io/TerRa/) en ese momento, con el globo 3D para la Tierra o el cielo visto desde el cuerpo elegido (enlace único). El enlace cubre los 44 cuerpos (incluidos Fobos, Caronte, Ceres, Eris, Bennu, etc.), y la ventana de comunicación entre dos cuerpos también tiene «↗ TerRa» para cada extremo.
- **Enlace único y conexión bidireccional con TerRa** — el botón «🔗 Enlace único» copia la vista actual (pestaña, cuerpo, momento fijado, estación, par de cuerpos, umbral solar); [TerRa](https://chiuta.github.io/TerRa/) abre aquí el cuerpo, la hora y la ventana de transmisión desde tu ubicación.
- **Escenarios** — ejemplos concretos (emplazamiento del Apolo 11, Jezero, Titán, Bennu, Venus, Mercurio, Plutón–Caronte, tabla de ida y vuelta).
- **Reloj de referencia terrestre** — UTC o cualquier huso horario IANA (p. ej., Bucarest), usado en toda la aplicación.

## Límites honestos

Modelo de primer orden de la tasa del reloj (p. ej., ≈488 µs/día para Marte frente a ≈477 µs/día en los modelos completos); las horas locales «reales» usan orientaciones medias de la UAI y efemérides keplerianas simplificadas (error del orden de minutos, comprobado con Mars24 para Marte); tiempo de luz ≈0,5 %; los mapas son esquemáticos; el índice de colonización es orientativo, no una evaluación científica. Para la navegación real, usa efemérides numéricas completas.

## Uso

Abre `index.html` en cualquier navegador moderno (funciona desde `file://`) o publícalo con GitHub Pages (se incluye un flujo de trabajo: **Settings → Pages → Source: GitHub Actions**).

## Desarrollo

`index.html` se genera a partir de `src/template.html` (motor + interfaz, cadenas de origen en rumano) y de los diccionarios de traducción de `src/i18n/`.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html (step 1 of 2; on its own it drops the fff-info block)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # step 2: rewrites fff-info / data-fff-hash in index.html and app.json (sha256, size); needs the fff-kit from chiuta.github.io
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tools/exercise.js index.html fr   # one language only
```

**Traducciones.** En el código, cada cadena visible para el usuario es `T('romanian source text', …args)`; `src/i18n/keys.json` enumera todas las claves y `tr_<lang>.json` contiene la traducción de cada clave. Para añadir un idioma: añade su entrada a `LANGS` y `UNITS` en `src/template.html`, crea `tr_<lang>.json` con las mismas claves y ejecuta `validate.py` y `build.py`. Las correcciones a las traducciones existentes son muy bienvenidas. Este README también está disponible en todos los idiomas de la interfaz (`README.<lang>.md`); `README.md` (inglés) es la versión de referencia.

## Fuentes y créditos

- Artículo que motivó el proyecto: "[Qué hora es en la Luna…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)" (en rumano; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientaciones del polo y del meridiano origen: IAU WGCCRE 2009. Elementos keplerianos medios: JPL (Standish). Tiempo marciano MSD/MTC: Allison y McEwen. Serie de distancias lunares: J. Meeus, *Astronomical Algorithms*.
- Los valores físicos son las cifras habituales de la literatura, redondeadas. Los datos de colonización son cualitativos y orientativos.

## Build source resynchronised (2.1.0)

_(English only; not yet translated into this language. Machine translation intentionally not added to avoid errors in technical statements.)_

`src/template.html` had fallen behind `index.html` (version 1.2.5 versus 2.0.x and older fff-kit modules), so an `npm run build` would have regenerated an older `index.html`. The template was regenerated from `index.html` (translation dictionary and CSP meta replaced by their markers), and `index.html` is **identical** to what `tools/build.py` produces from it (verified; only the tool-generated CSP meta differs).

- `tools/check_template.py` (new, no fff-kit needed; `npm run check:template`): checks that the template plus `src/i18n/tr_*.json` yield `index.html`, ignoring the CSP, the `fff-info` block and `data-fff-hash`.
- `tools/check_fresh.py`: now also ignores the CSP meta when comparing.
- No functional change to the app.

**Unchanged and why:** `tools/exercise.js` (jsdom) could not be run: jsdom is not installed in this session. The existing Playwright tests are the ones kept.

## Historial

### 2.1.0 — 2026-10-27
- `src/template.html` resynchronised with `index.html`; new check `tools/check_template.py`.


### 1.2.5 — 2026-10-22
- fff-kit 1.1.4: objetivos táctiles y texto mínimo; objetivos táctiles/texto corregidos

### 1.2.4 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 con 600.000 iteraciones, protección anti-clickjacking.

### 1.2.3 — 2026-10-22
- Sin conexión de verdad: se añadieron un service worker (caché primero, caché por versión), un manifiesto web e iconos, de modo que la aplicación se abre sin red tras la primera visita y se puede instalar (la promesa «sin conexión» del catálogo ahora es cierta). La cadena de compilación (`npm run build`) aplica los archivos PWA y actualiza la etiqueta de transparencia.
- Accesibilidad: los 19 campos del conversor, del enlace de comunicación y de la ventana por pares tienen ahora etiquetas asociadas mediante programación a sus campos.
- Móvil: corregido el desbordamiento horizontal de 10 px en las tarjetas «Ahora» (la etiqueta con el nombre del cuerpo ya no sobresale de la tarjeta); el texto pequeño (etiquetas, notas) mide al menos 12 px.

### 1.2.2 — 2026-10-22
- La etiqueta de accesibilidad del mapa esquemático se traduce desde el inicio (permanecía en rumano hasta abrir la pestaña del mapa) y el título del artículo citado en el pie se muestra también en francés, alemán y húngaro.

### 1.2.1 — 2026-10-22
- El pie de página «Fuentes y método», la meta descripción y el panel de transparencia fff-kit (nombre y descripción) siguen ahora el idioma de la interfaz.

## Licencia

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
