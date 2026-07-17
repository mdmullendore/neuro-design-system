# Neuro Design System

A component-based design system organized like the nervous system: Neuron → Synapse → Circuit → Pathway → Cortex, with a cross-cutting utility layer called Neurotransmitters. See [README.md](README.md) for the full narrative and rationale — this file is conventions, not philosophy.

## Stack

React + TypeScript, Sass (CSS Modules), Vite, Storybook. No CSS-in-JS, no Tailwind — styling is Sass Modules scoped per component, plus the global Neurotransmitter utility classes.

## The tiers (`src/`)

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
src/neurons/Button/
├── Button.tsx
├── Button.module.scss
├── Button.stories.tsx
└── index.ts
```

- `index.ts` re-exports the component and its prop types — this is the only import path other files should use (`neurons/Button`, not `neurons/Button/Button`).
- Styles are Sass Modules (`.module.scss`), imported as `styles` and applied via `styles.foo`. Never write global class selectors inside a component's module file.
- Every component that renders visually needs a `.stories.tsx` file, tagged `autodocs`, titled `"<Tier>/<ComponentName>"` (e.g. `"Neurons/Button"`) so Storybook's sidebar mirrors the folder tiers.

## Neurotransmitters (global utilities)

`src/neurotransmitters/index.scss` forwards four partials — `_serotonin.scss` (spacing), `_dopamine.scss` (color), `_glutamate.scss` (typography), `_adrenaline.scss` (motion) — plus CSS custom properties (`--color-*`, `--font-*`, `--motion-*`) that component Sass Modules should reference instead of hardcoding values.

Class prefixes are practical, not literal spellings of the neurotransmitter name: `sero-`, `dop-`, `glu-`, `ad-` (e.g. `.sero-stack-md`, `.dop-text-accent`). This is documented in the README — don't rename prefixes to match "Serotonin" literally.

This file is imported once, globally:

- App entry: [src/main.tsx](src/main.tsx)
- Storybook: [.storybook/preview.tsx](.storybook/preview.tsx)

Don't re-import it inside individual components.

## Commands

- `npm run dev` — Vite dev server for the app shell
- `npm run storybook` — Storybook dev server (port 6006), the primary place components get built and documented
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
