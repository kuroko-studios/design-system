import StyleDictionary from "style-dictionary";

/*
 * Kuroko Design System — build.
 * DTCG JSON tokens → CSS variables + Tailwind v4 @theme layer + JSON (for code & agents).
 *
 * We use an explicit, minimal transform set rather than the built-in `css`
 * transformGroup so authored values (px, ms, box-shadow, cubic-bezier) pass
 * through exactly as written — only colours are normalised and names kebab-cased.
 */

const TRANSFORMS = ["attribute/cti", "name/kebab", "color/css"];

/* Map a semantic/scale token to its Tailwind v4 @theme key (or null to skip). */
function tailwindKey(token) {
  const [group, ...rest] = token.path;
  const j = rest.join("-");
  switch (group) {
    case "surface":
      return `color-surface-${j}`;
    case "text":
      return `color-text-${j}`;
    case "line":
      return rest[0] === "default" ? "color-line" : `color-line-${j}`;
    case "accent":
      return rest[0] === "default" ? "color-accent" : `color-accent-${j}`;
    case "status":
      return `color-${j}`;
    case "focus":
      return `color-focus-${j}`;
    case "radius":
      return `radius-${j}`;
    case "fontSize":
      return `text-${j}`;
    case "fontFamily":
      return `font-${j}`;
    default:
      return null;
  }
}

/* Custom format: the Tailwind v4 @theme layer, referencing the CSS variables. */
StyleDictionary.registerFormat({
  name: "css/tailwind-theme",
  format: ({ dictionary }) => {
    const lines = dictionary.allTokens
      .map((t) => {
        const key = tailwindKey(t);
        return key ? `  --${key}: var(--${t.name});` : null;
      })
      .filter(Boolean);
    return (
      "/* Kuroko Design System — Tailwind v4 theme layer. */\n" +
      '@import "./kuroko-tokens.css";\n\n' +
      "@theme inline {\n" +
      lines.join("\n") +
      "\n}\n"
    );
  },
});

const sd = new StyleDictionary({
  source: ["tokens/**/*.json"],
  log: { verbosity: "default" },
  platforms: {
    css: {
      transforms: TRANSFORMS,
      prefix: "krk",
      buildPath: "dist/",
      files: [
        {
          destination: "kuroko-tokens.css",
          format: "css/variables",
          options: { outputReferences: true },
        },
        {
          destination: "kuroko-theme.css",
          format: "css/tailwind-theme",
        },
      ],
    },
    json: {
      transforms: TRANSFORMS,
      prefix: "krk",
      buildPath: "dist/",
      files: [
        { destination: "tokens.json", format: "json" },
        { destination: "tokens.flat.json", format: "json/flat" },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log("\n✓ Kuroko Design System built to dist/");
