# ORARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · **Português** · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**O tempo em todos os mundos**

O ORARIUM é uma aplicação web de ficheiro único, offline (`index.html`, sem servidor, sem conta, sem rastreio), que propõe uma forma coerente de marcar o tempo na Lua, em Marte, em todos os planetas, planetas anões, asteroides, cometas e luas do Sistema Solar. Foi inspirada pelo debate sobre o tempo lunar (um desvio de relógio de ≈56 µs/dia, a resolução da CGPM sobre uma escala de tempo de referência lunar e as questões em aberto sobre a «altitude zero» e as redes de relógios).

Idiomas da interface: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**.

## A ideia: quatro relógios, duas fórmulas

| Relógio | A que responde |
|---|---|
| **Relógio-Padrão** | Com que rapidez anda aí um relógio atómico? Segundo SI, tempo próprio na superfície equipotencial de referência do corpo («Tempo Local de Superfície», TLS), com uma taxa ρ relativa à Terra. |
| **Relógio-Ritmo** | O dia solar local dividido em 24 horas locais de *P*<sub>sol</sub>/24 segundos SI, pelo que o meio-dia é às 12:00 em todos os mundos. |
| **Relógio-Fase** | Qual é a hora local real? A partir da orientação IAU + uma efeméride kepleriana (planetas), da elongação média (Lua), do MSD/MTC (Marte). Nos restantes casos o ritmo é exato e a origem é fixada por convenção. |
| **Relógio-Ponte** | Cada mensagem leva (TLS, UTC, ρ); o recetor subtrai o tempo-luz e aplica ρ. |

```
ρ = (Φ⊕ − Φ_b) / c²          Φ = 3·GM☉/2a☉ + 3·GM_p/2a_s + GM_b/R + ½ω²R²
P_sol = 1 / | 1/P_sid ∓ 1/P_year |
```

## O que contém a aplicação

- **Agora** — hora local em direto em 45 corpos (planetas, 22 luas, planetas anões, asteroides, um cometa, um aerostato em Vénus), com a taxa do relógio ρ, a duração do dia, a **distância à Terra em direto** (km, mi, UA, segundos/minutos/horas/anos-luz, distâncias lunares) e o **tempo de comunicação de ida e volta**.
- **Fichas dos corpos** — grandezas físicas em várias unidades, decomposição da taxa do relógio, exemplos práticos, uma calculadora de altitude, ancoragem da origem do relógio para corpos sem origem aceite e uma avaliação de colonização.
- **Método** — os quatro relógios, as fórmulas, um recálculo em direto dos +56 µs/dia da Lua, respostas às questões em aberto, limites honestos.
- **Conversor** — «que horas são lá quando aqui são…?» para qualquer corpo e longitude, com qualquer fuso horário da Terra (saltos/sobreposições de hora de verão assinalados).
- **Colónias** — uma classificação indicativa, ponderada pelo utilizador, de candidatos à colonização (7 fatores, filtro de fator vital).
- **Mapas** — mapas esquemáticos das zonas ótimas de colonização de cada corpo, com terminador dia/noite, hora local face ao relógio de referência da Terra e próximo meio-dia local.
- **Cenários** — exemplos concretos (local do Apollo 11, Jezero, Titã, Bennu, Vénus, Mercúrio, Plutão–Caronte, tabela de ida e volta).
- **Relógio de referência da Terra** — UTC ou qualquer fuso horário IANA (p. ex. Bucareste), usado em toda a aplicação.

## Limites honestos

Modelo de taxa do relógio de primeira ordem (p. ex. ≈488 µs/dia para Marte contra ≈477 µs/dia nos modelos completos); as horas locais «reais» usam orientações IAU médias e efemérides keplerianas simplificadas (erro da ordem dos minutos, verificado face ao Mars24 para Marte); tempo-luz ≈0,5 %; os mapas são esquemáticos; o índice de colonização é indicativo, não uma avaliação científica. Para navegação real, use efemérides numéricas completas.

## Utilização

Abra `index.html` em qualquer navegador moderno (funciona a partir de `file://`), ou publique-o com o GitHub Pages (inclui-se um workflow: **Settings → Pages → Source: GitHub Actions**).

## Desenvolvimento

`index.html` é gerado a partir de `src/template.html` (motor + interface, textos de origem em romeno) e dos dicionários de tradução em `src/i18n/`.

```bash
python3 tools/validate.py     # translations: same keys, {n} placeholders and HTML tags as the source
python3 tools/build.py        # regenerates index.html
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tools/exercise.js index.html fr   # one language only
```

**Traduções.** No código, cada texto visível para o utilizador é `T('romanian source text', …args)`; `src/i18n/keys.json` lista todas as chaves e `tr_<lang>.json` contém a tradução de cada chave. Para acrescentar um idioma: adicione a respetiva entrada a `LANGS` e `UNITS` em `src/template.html`, crie `tr_<lang>.json` com as mesmas chaves e execute `validate.py` e `build.py`. As correções às traduções existentes são muito bem-vindas. Este README também está disponível em todos os idiomas da interface (`README.<lang>.md`); `README.md` (inglês) é a versão de referência.

## Fontes e créditos

- Artigo que deu origem ao projeto: "[Que horas são na Lua…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)" (em romeno; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientações do polo e do meridiano de referência: IAU WGCCRE 2009. Elementos keplerianos médios: JPL (Standish). Tempo marciano MSD/MTC: Allison & McEwen. Série de distâncias lunares: J. Meeus, *Astronomical Algorithms*.
- Os valores físicos são os números habituais da literatura, arredondados. Os dados de colonização são qualitativos e indicativos.

## Licença

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
