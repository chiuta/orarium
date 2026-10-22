# ORARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · **Português** · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versão:** 1.2.5 · **Última atualização:** 2026-10-22

**Aplicação online:** [https://chiuta.github.io/orarium/](https://chiuta.github.io/orarium/)

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
- **Ligações** — quando é meia-noite local em cada corpo (na sua hora de referência e em UTC) e a janela de transmissão Terra–corpo (estação terrestre escolhida, ponto escolhido no corpo, tempo-luz incluído), além dos períodos de conjunção solar em que a ligação é interrompida.
- **Comunicação entre corpos** — para qualquer par de corpos (não só com a Terra): a janela de comunicação em que cada um vê o outro acima do horizonte, o tempo-luz e os períodos de conjunção solar; além disso, cada corpo mostra agora também o seu meio-dia local (12:00).
- **Ligação ao TerRa** — botões «↗ TerRa» em cada meia-noite / meio-dia calculado e na ficha do corpo: abrem o [TerRa](https://chiuta.github.io/TerRa/) nesse momento, com o globo 3D para a Terra ou o céu visto do corpo escolhido (ligação única). A ligação cobre os 44 corpos (incluindo Fobos, Caronte, Ceres, Éris, Bennu, etc.) e a janela de comunicação entre dois corpos também tem «↗ TerRa» para cada extremo.
- **Ligação única e ligação bidirecional com o TerRa** — o botão «🔗 Ligação única» copia a vista atual (separador, corpo, momento fixado, estação, par de corpos, limiar solar); o [TerRa](https://chiuta.github.io/TerRa/) abre aqui o corpo, a hora e a janela de transmissão a partir da sua localização.
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
python3 tools/build.py        # regenerates index.html (step 1 of 2; on its own it drops the fff-info block)
node ../chiuta.github.io/fff-kit/build.mjs info . --slug orarium   # step 2: rewrites fff-info / data-fff-hash in index.html and app.json (sha256, size); needs the fff-kit from chiuta.github.io
npm install && npm test       # jsdom walk-through of every screen/body (per language), reports missing keys/errors/NaN
node tools/exercise.js index.html fr   # one language only
```

**Traduções.** No código, cada texto visível para o utilizador é `T('romanian source text', …args)`; `src/i18n/keys.json` lista todas as chaves e `tr_<lang>.json` contém a tradução de cada chave. Para acrescentar um idioma: adicione a respetiva entrada a `LANGS` e `UNITS` em `src/template.html`, crie `tr_<lang>.json` com as mesmas chaves e execute `validate.py` e `build.py`. As correções às traduções existentes são muito bem-vindas. Este README também está disponível em todos os idiomas da interface (`README.<lang>.md`); `README.md` (inglês) é a versão de referência.

## Fontes e créditos

- Artigo que deu origem ao projeto: "[Que horas são na Lua…](https://www.stiripesurse.ro/cat-este-ceasul-pe-luna_3928805)" (em romeno; AFP/Agerpres, stiripesurse.ro, 18.10.2026).
- Orientações do polo e do meridiano de referência: IAU WGCCRE 2009. Elementos keplerianos médios: JPL (Standish). Tempo marciano MSD/MTC: Allison & McEwen. Série de distâncias lunares: J. Meeus, *Astronomical Algorithms*.
- Os valores físicos são os números habituais da literatura, arredondados. Os dados de colonização são qualitativos e indicativos.

## Histórico

### 1.2.5 — 2026-10-22
- fff-kit 1.1.4: alvos táteis e texto mínimo; alvos táteis/texto corrigidos

### 1.2.4 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 com 600.000 iterações, proteção anti-clickjacking.

### 1.2.3 — 2026-10-22
- Offline a sério: foram adicionados um service worker (cache primeiro, cache por versão), um manifesto web e ícones, pelo que a aplicação abre sem rede após a primeira visita e pode ser instalada (a promessa «offline» do catálogo é agora verdadeira). A cadeia de compilação (`npm run build`) aplica os ficheiros PWA e atualiza a etiqueta de transparência.
- Acessibilidade: os 19 campos do conversor, da ligação de comunicação e da janela por pares têm agora etiquetas associadas programaticamente aos campos.
- Móvel: corrigido o excesso horizontal de 10 px nos cartões «Agora» (a etiqueta com o nome do corpo já não sai do cartão); o texto pequeno (etiquetas, notas) tem pelo menos 12 px.

### 1.2.2 — 2026-10-22
- A etiqueta de acessibilidade do mapa esquemático é traduzida desde o início (ficava em romeno até abrir o separador do mapa) e o título do artigo citado no rodapé é apresentado também em francês, alemão e húngaro.

### 1.2.1 — 2026-10-22
- O rodapé «Fontes e método», a meta descrição e o painel de transparência fff-kit (nome e descrição) seguem agora o idioma da interface.

## Licença

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).
