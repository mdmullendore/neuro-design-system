# Neuro Design System

A component-based design system organized like the nervous system: Neuron → Synapse → Circuit → Pathway → Cortex, with a cross-cutting utility layer called Neurotransmitters. See [README.md](README.md) for the full narrative and rationale — this file is conventions, not philosophy.

## Stack

React + TypeScript, Sass (CSS Modules), Vite, Storybook. No CSS-in-JS, no Tailwind — styling is Sass Modules scoped per component, plus the global Neurotransmitter utility classes.

## Workspace layout

This is an npm workspaces monorepo (`"workspaces": ["packages/*"]`), so the design system can be installed as a package and run on both web and React Native:

| Package                      | Contains                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| `packages/tokens`            | `@neuro/tokens` — the token source of truth (color, spacing, typography, motion) as plain TS values   |
| `packages/design-system`     | `@neuro/design-system` — the component tiers below, plus the Neurotransmitter Sass layer              |
| root (`src/`, `.storybook/`) | Demo app + web Storybook — both consume `@neuro/design-system` as a package, not via relative imports |

`@neuro/tokens`'s `generate-scss.ts` (run via `npm run tokens:build`) writes `packages/design-system/src/neurotransmitters/_tokens.scss` from the TS values — that generated file is the one source of `--color-*`/`--font-*`/`--motion-*` custom properties; **do not hand-edit it**, edit the token TS files and regenerate. Native code (`.native.tsx`) imports the same TS token values directly (e.g. `color.accent`) instead of CSS custom properties, since React Native has no CSS.

## The tiers (`packages/design-system/src/`)

| Folder               | Tier | Contains                                                       |
| -------------------- | ---- | -------------------------------------------------------------- |
| `neurons/`           | 1    | Smallest indivisible primitives (button, input, icon)          |
| `synapses/`          | 2    | Small functional groupings of neurons (search bar, form field) |
| `circuits/`          | 3    | Self-contained UI sections (navbar, card, modal)               |
| `pathways/`          | 4    | Page-level layout skeletons — placement only, no real content  |
| `cortex/`            | 5    | Fully composed pages — real content, real state                |
| `neurotransmitters/` | —    | Global Sass utility layer, cross-cutting across all tiers      |

A component only belongs one tier up from its most complex direct dependency. If a Circuit imports another Circuit, reconsider whether it's actually a Pathway.

## Component convention

Each component gets its own folder inside its tier, named after the component:

```
packages/design-system/src/neurons/Button/
├── Button.tsx           # web
├── Button.native.tsx    # React Native (optional — add only when a component needs one)
├── Button.variant.ts    # cross-platform prop types shared by both (e.g. the variant union)
├── Button.module.scss
├── Button.stories.tsx
└── index.ts
```

- `index.ts` re-exports the component and its prop types — this is the only import path other files should use (`neurons/Button`, not `neurons/Button/Button`).
- Styles are Sass Modules (`.module.scss`), imported as `styles` and applied via `styles.foo`. Never write global class selectors inside a component's module file.
- Every component that renders visually needs a `.stories.tsx` file, tagged `autodocs`, titled `"<Tier>/<ComponentName>"` (e.g. `"Neurons/Button"`) so Storybook's sidebar mirrors the folder tiers. Story files stay platform-agnostic — `import { Button } from "./Button"` with no extension — since the bundler resolves `Button.tsx` (Vite, tsc) or `Button.native.tsx` (Metro, the RN-Web Storybook) automatically.
- Web (`.tsx`) files use DOM elements + Sass Modules, referencing `--color-*`/`--font-*`/`--motion-*` custom properties. Native (`.native.tsx`) files use `react-native` primitives (`Pressable`, `View`, `Text`) + `StyleSheet.create`, importing values directly from `@neuro/tokens` — there's no CSS on RN, so don't try to share Sass with native code. Don't force a single prop interface across platforms when the underlying APIs genuinely differ (e.g. `ButtonHTMLAttributes` vs `PressableProps`) — share only what's actually cross-platform (like the variant union) via a small shared file.

## Neurotransmitters (global utilities)

`packages/design-system/src/neurotransmitters/index.scss` forwards five partials — the generated `_tokens.scss` (CSS custom properties, from `@neuro/tokens`), then `_serotonin.scss` (spacing utilities), `_dopamine.scss` (color utilities), `_glutamate.scss` (typography utilities), `_adrenaline.scss` (motion utilities). Component Sass Modules should reference the `--color-*`/`--font-*`/`--motion-*` custom properties instead of hardcoding values.

Class prefixes are practical, not literal spellings of the neurotransmitter name: `sero-`, `dop-`, `glu-`, `ad-` (e.g. `.sero-stack-md`, `.dop-text-accent`). This is documented in the README — don't rename prefixes to match "Serotonin" literally.

This file is imported once, globally:

- App entry: [src/main.tsx](src/main.tsx)
- Web Storybook: [.storybook/preview.tsx](.storybook/preview.tsx)
- Native-web Storybook: [.storybook-native/preview.tsx](.storybook-native/preview.tsx)

Don't re-import it inside individual components.

## Commands

- `npm run dev` — Vite dev server for the app shell
- `npm run storybook` — web Storybook dev server (port 6006), the primary place components get built and documented
- `npm run storybook:native` — the same stories rendered through React Native primitives via `react-native-web` (port 6007), for visually verifying `.native.tsx` components without a simulator
- `npm run tokens:build` — regenerate `_tokens.scss` from `@neuro/tokens` after editing token values
- `npm run build` / `npm run build-storybook` — production builds
- `npm run lint` — oxlint (JS/TS, including `jsx-a11y` accessibility rules)
- `npm run lint:css` — stylelint (`.scss`)
- `npm run format` / `npm run format:check` — oxfmt (JS/TS/JSON/Markdown; write vs. check-only)

VS Code is configured (`.vscode/settings.json`) to format JS/TS/JSON on save via the Oxc extension and auto-fix `.scss` lint issues on save via Stylelint. Both extensions are listed in `.vscode/extensions.json`.

## Adding a new component

1. Create the folder under the correct tier.
2. Write the component + its Sass Module, reusing Neurotransmitter tokens/utilities rather than new hardcoded values.
3. Write the story with at least one variant per meaningfully different visual state (not one story per prop combination).
4. Export via `index.ts`.
