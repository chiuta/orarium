# ORARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versión:** 2.3.4 · **Última actualización:** 2026-11-19

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
- **Bolta y .ics** — «↗ Bolta» abre el planetario sin conexión [Bolta](https://chiuta.github.io/apps/Bolta/) para la estación elegida (en el momento fijado o en vivo); para cualquier par de cuerpos, «📅 Exportar las ventanas a .ics» descarga las próximas ventanas de comunicación y la interrupción por conjunción solar como calendario RFC 5545 (UTC) que se importa en Orar o en cualquier calendario. Los enlaces de «Ahora» a TerRa ya no congelan la hora.
- **Planificador de reuniones (2.0)** — para cualquier par de cuerpos (p. ej. Tierra–Marte): las franjas en las que cabe una reunión de la duración elegida dentro del horario laboral local de ambos extremos, con el enlace abierto (sin conjunción solar) y el retardo de la señal (de ida y de ida y vuelta) incluido; muestra la hora local de cada extremo a la salida y a la llegada. Orientativo, no para operaciones reales.
- **Escenarios** — ejemplos concretos (emplazamiento del Apolo 11, Jezero, Titán, Bennu, Venus, Mercurio, Plutón–Caronte, tabla de ida y vuelta).
- **Reloj de referencia terrestre** — UTC o cualquier huso horario IANA (p. ej., Bucarest), usado en toda la aplicación.

## Límites honestos

El cálculo es de primer orden (Sol + planeta madre + superficie + rotación, órbitas circulares en promedio). Para Marte obtiene ≈488 µs/día, mientras que los modelos completos de la literatura dan ≈477 µs/día, con variaciones periódicas de cientos de µs debidas a la excentricidad. Las horas «reales» usan orientaciones IAU medias (sin libraciones) y efemérides keplerianas simplificadas. Verificado frente a la fórmula Mars24 y a la biblioteca astronómica astronomy-engine: la hora solar en Marte se desvía como máximo ≈0,5 min en 1900–2100 (menos de 1 min en 1800–2200, ≈5 min en los años 1000–3000); el tiempo de luz es exacto hasta ≈0,5 % en 1900–2200 (hasta ≈2 % hacia el año 3000); las elevaciones de las estaciones en la Tierra difieren como máximo ≈0,04° para Marte y Venus y ≈0,3° para Júpiter, Saturno y la Luna (2020–2100). TT − UTC = 32,184 s + (TAI − UTC): desde 1972 se usa la tabla de segundos intercalares (69,184 s desde 2017, suponiendo que no seguirán otros); antes de 1972, el ΔT de Espenak–Meeus. Los mapas son esquemáticos. El índice de colonización es orientativo, no una evaluación científica. Para la navegación real se usan efemérides numéricas completas.

## Uso

Abre `index.html` en cualquier navegador moderno (funciona desde `file://`) o publícalo con GitHub Pages (se incluye un flujo de trabajo: **Settings → Pages → Source: GitHub Actions**).

## Desarrollo

`index.html` se genera a partir de `src/template.html` (motor + interfaz, cadenas de origen en rumano) y de los diccionarios de traducción de `src/i18n/`.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html (step 1 of 2; on its own it drops the fff-info block)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # step 2: rewrites fff-info / data-fff-hash in index.html and app.json (sha256, size); needs the fff-kit from chiuta.github.io
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tests/regression.test.mjs   # regression tests: dates/years, ICS, PWA/service worker, unique link
node tools/exercise.js index.html fr   # one language only
```

**Traducciones.** En el código, cada cadena visible para el usuario es `T('romanian source text', …args)`; `src/i18n/keys.json` enumera todas las claves y `tr_<lang>.json` contiene la traducción de cada clave. Para añadir un idioma: añade su entrada a `LANGS` y `UNITS` en `src/template.html`, crea `tr_<lang>.json` con las mismas claves y ejecuta `validate.py` y `build.py`. Las correcciones a las traducciones existentes son muy bienvenidas. Este README también está disponible en todos los idiomas de la interfaz (`README.<lang>.md`); `README.md` (inglés) es la versión de referencia.

## Fuentes y créditos

- Artículo que motivó el proyecto: "[Qué hora es en la Luna…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)" (en rumano; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientaciones del polo y del meridiano origen: IAU WGCCRE 2009. Elementos keplerianos medios: JPL (Standish). Tiempo marciano MSD/MTC: Allison y McEwen. Serie de distancias lunares: J. Meeus, *Astronomical Algorithms*.
- Los valores físicos son las cifras habituales de la literatura, redondeadas. Los datos de colonización son cualitativos y orientativos.

## Historial

### 2.3.3 — 2026-11-18

Auditoría comparativa adversarial (frente a astronomy-engine y la fórmula Mars24, pruebas diferenciales, recorrido en los 8 idiomas) y correcciones:
- Las elevaciones de las estaciones incluyen ahora la precesión de los equinoccios (antes fallaban entre 0,3 y 1,5°; ahora ≲ 0,04° para Marte y Venus, ≲ 0,3° para Júpiter, Saturno y la Luna).
- TT − UTC: tabla de segundos intercalares desde 1972 y ΔT (Espenak–Meeus) antes, en lugar de la constante 69,184 s para cualquier fecha.
- Los años 1–99 se calculaban en silencio como 1901–1999, y las fechas fuera del rango admitido (año 275760 y posteriores) provocaban una excepción; ambos casos se tratan ya, y el conversor indica «La fecha elegida está fuera del rango admitido.»
- Archivos .ics: `PRODID` lleva la versión (ORARIUM 2.3.3).
- Los números del enlace único se escriben en decimal simple para poder leerlos de nuevo (la notación exponencial se perdía).
- PWA: la CSP de la página no permitía el manifiesto web, el service worker ni los iconos, por lo que la aplicación no podía instalarse ni usarse sin conexión; corregido (`manifest-src`, `worker-src 'self'`, `img-src 'self'`) y cubierto por una prueba que sirve la aplicación por HTTP y registra el service worker.
- «Límites honestos» indica ahora la precisión medida.
- Nueva prueba de regresión `tests/regression.test.mjs` (51 comprobaciones; falla en la 2.3.2).

Versiones anteriores: [`CHANGELOG.md`](CHANGELOG.md).

## Licencia

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
