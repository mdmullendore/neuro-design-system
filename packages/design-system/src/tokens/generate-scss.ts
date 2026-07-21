// Converts the internal token TS values (color, typography, motion) into the
// generated _tokens.scss CSS custom properties consumed by the design system's
// Sass Modules. Runs automatically as part of this package's `build` script.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { color, palette, brand } from "./color.ts";
import { typography } from "./typography.ts";
import { motion } from "./motion.ts";

// camelCase -> kebab-case, since CSS custom property names can't use camelCase.
const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const lines = [
  "// Generated from src/tokens — do not hand-edit.",
  "// Regenerated automatically by this package's `build` script; run `npm run build:tokens` after changing src/tokens/*.ts.",
  "",
  ":root {",
  ...Object.entries(color).map(([name, value]) => `  --color-${kebab(name)}: ${value};`),
  ...Object.entries(brand).map(([name, value]) => `  --color-brand-${kebab(name)}: ${value};`),
  ...Object.entries(palette).flatMap(([hue, shades]) =>
    Object.entries(shades).map(([shade, value]) => `  --color-${hue}-${shade}: ${value};`),
  ),
  `  --font-family-base: ${typography.fontFamilyBase};`,
  // fontFamilyBase is emitted separately above since it isn't a size; the rest
  // are px values in the TS source, converted to rem for the generated CSS.
  ...Object.entries(typography)
    .filter(([name]) => name !== "fontFamilyBase")
    .map(
      ([name, value]) =>
        `  --font-size-${kebab(name).replace("font-size-", "")}: ${(value as number) / 16}rem;`,
    ),
  // `ease` is a timing-function string, not a duration, so it's excluded here
  // and appended separately below without the `ms` suffix.
  ...Object.entries(motion)
    .filter(([name]) => name !== "ease")
    .map(([name, value]) => `  --motion-${kebab(name)}: ${value}ms;`),
  `  --motion-ease: ${motion.ease};`,
  "}",
  "",
].join("\n");

const outPath = fileURLToPath(
  new URL("../neurotransmitters/_tokens.scss", import.meta.url),
);

writeFileSync(outPath, lines);
console.log(`Wrote ${outPath}`);
