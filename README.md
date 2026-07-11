# Kuroko Design System

`@kuroko-studios/design` — the single, **machine-readable** source of truth for Kuroko's
visual language. Design tokens are authored once as W3C DTCG JSON and generated into the
formats every Kuroko surface consumes: CSS variables, a Tailwind v4 theme layer, and JSON.

**v0 is dark-first** — *kuroko* (黒子) means "black": the stagehands dressed head-to-toe in
black who make the show happen unseen. The brand is a warm, teal-tinted near-black with a
teal accent, off-white text, and subtle depth + motion. The interim brand values ship now;
finished brand values swap in later through the same pipeline (that swap is the whole point).

## What's in the box

```
tokens/            DTCG JSON — the source of truth (edit these)
  color.json         raw palette (ink / fog / teal / status)
  semantic.json      roles: surface, text, accent, line, status, focus
  typography.json    families, weights, sizes, line-heights, tracking
  scale.json         space, radius, border, breakpoints, z-index
  elevation.json     subtle dark-tuned shadows
  motion.json        durations + easings
scripts/build.mjs  Style Dictionary build
dist/              generated — do not edit
  kuroko-tokens.css    CSS custom properties (:root)
  kuroko-theme.css     Tailwind v4 @theme layer (imports the vars)
  tokens.json          nested, resolved — for tooling & agents
  tokens.flat.json     flat name→value map
preview/index.html  live dark preview, rendered from dist/
```

## Use it

Install (once published to the private registry):

```bash
npm install @kuroko-studios/design
```

**Plain CSS / any framework** — import the variables and use them:

```css
@import "@kuroko-studios/design/tokens.css";
.card { background: var(--krk-surface-raised); border: 1px solid var(--krk-line-default); }
```

**Tailwind v4** — import the theme layer; utilities like `bg-surface-raised`,
`text-accent`, `rounded-lg`, `text-5xl` become available:

```css
@import "tailwindcss";
@import "@kuroko-studios/design/theme.css";
```

**Code / AI agents** — read resolved values as data:

```js
import tokens from "@kuroko-studios/design/tokens.json" with { type: "json" };
```

**React components** — load the styles once, then use the components:

```tsx
import "@kuroko-studios/design/tokens.css";
import "@kuroko-studios/design/components.css";
import { Button, Card, Badge, ChipSingle } from "@kuroko-studios/design/components";

<Card><Button variant="primary">Start</Button></Card>
```

Components are styled entirely by the token-driven component layer
(`components.css`) — no Tailwind required. They ship as source (`.tsx`); Next.js
consumers add `transpilePackages: ["@kuroko-studios/design"]`. The same
`components.css` classes (`krk-btn`, `krk-card`, `krk-badge--ok`, …) can be used
directly in plain HTML — that's exactly what `preview/index.html` does.

## Change a token

1. Edit the value in the relevant `tokens/*.json` file.
2. `npm run build`.
3. Every consumer updates — no component changes. Semantic roles reference the raw palette,
   so changing one raw colour cascades through surfaces, text and status.

That's the machine-readable promise: values live in one place, in a standard format, and
the CSS/Tailwind/JSON are generated — never hand-edited.

## Build

```bash
npm install
npm run build      # regenerates everything in dist/
```

Open `preview/index.html` in a browser to see the current brand.

## How Kuroko HQ adopts it

HQ is already token-only (every colour/radius lives in a tokens layer). Adoption is a
values swap: replace HQ's `styles/tokens.css` with this package's `tokens.css` + Tailwind
`theme.css`, and apply the new elevation/motion tokens where they earn it (raised cards,
overlays, interactions). No component rewrites.

## Roadmap

- v0 (done): dark blue/purple-glow brand tokens + pipeline + preview.
- v0.3 (done): component library harvested from HQ — Button, Card, Chip family,
  Field (Label/Input/Textarea/Select), Badge, plus Table/Tabs styles — as a
  token-driven `components.css` + React wrappers.
- Next: publish the package (private registry); adopt in HQ (swap tokens + use components);
  a docs site built with the system.
- Later: finished brand values (logo, brand typeface, final palette) via the same pipeline;
  optional light theme; Figma sync; productise as the client-facing "Brand System".

## Format

Tokens follow the [W3C Design Tokens Community Group](https://tr.designtokens.org/) draft
(`$value` / `$type` / `$description`), built with
[Style Dictionary](https://styledictionary.com) v4.
