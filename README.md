# 🧠 Neuro Design System [WIP]

> A component-based design system inspired by neuroanatomy — building interfaces the way the brain builds thought, from single neurons up to fully functioning cortex.

**Status:** 🚧 Work in progress. Structure, naming, and APIs are still evolving. Not production-ready. Contributions, critiques, and issues are welcome.

---

## What is this?

Neuro Design System organizes components the way the nervous system is organized: from a single cell, to a connection, to a functioning circuit, to a mapped pathway, to a fully active region of cortex.

The goal is a component hierarchy that's scalable and composable, with a naming system that's memorable, narratively coherent, and (hopefully) a little more fun to build with while keeping one's neurvous system in a calm state.

## The Anatomy

| Tier | Neuro Term  | Description                                                                                                                                    |
| ---- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | **Neuron**  | The smallest indivisible unit. Can't be broken down further without losing function. _(button, input, icon, label, badge)_                     |
| 2    | **Synapse** | A small, functional connection between neurons — the smallest thing that "does" something. _(search bar, form field, labeled toggle)_          |
| 3    | **Circuit** | A self-contained cluster of synapses performing a recognizable job in the UI. _(navbar, card, modal, pricing table)_                           |
| 4    | **Pathway** | The structural layout that arranges circuits into a page skeleton — placement logic, no real content yet. _(dashboard layout, article layout)_ |
| 5    | **Cortex**  | A fully realized, populated instance of a pathway — real content, real state, ready to ship. _(the actual /dashboard page)_                    |

## Neurotransmitters (Global Utility Classes)

Neurons are the structure. **Neurotransmitters are what flows between them.**

In the nervous system, neurotransmitters are the chemical signals that cross synapses and influence neurons throughout the entire system — regardless of which circuit or pathway they belong to. That's exactly the role global utility classes play in this design system: small, reusable declarations (spacing, color, typography, motion) that apply across every tier, independent of hierarchy.

Unlike Neurons through Cortex, Neurotransmitters aren't a rung on the structural ladder — they're a cross-cutting layer that flows through all of them.

| Utility Category            | Neurotransmitter Analogy | Reasoning                                                                        |
| --------------------------- | ------------------------ | -------------------------------------------------------------------------------- |
| Spacing/layout utilities    | **Serotonin**            | Regulates balance and rhythm — spacing does the same visually                    |
| Color utilities             | **Dopamine**             | Associated with reward and visual salience — color drives attention              |
| Typography utilities        | **Glutamate**            | The brain's primary excitatory signal — carries the core message, like text does |
| Motion/transition utilities | **Adrenaline**           | Governs speed and urgency — maps to animation and transition timing              |

> **Note:** this sub-mapping is documentation flavor, not a naming convention. Actual utility classes should stay practical and legible (e.g. `.sero-spacing-md`, `.dop-text-primary`, `.ad-motion-fast`) — "Neurotransmitters" is the conceptual label for the utility layer as a whole, not a prefix to bake into class names.

## Project Structure

This is an npm workspaces monorepo. The design system itself is a single package, installable and consumable on both web and React Native:

```
packages/
└── design-system/  # @neuro/design-system — component tiers, Neurotransmitter Sass layer, internal tokens
    └── src/
        ├── neurons/           # Tier 1 — smallest UI primitives
        ├── synapses/          # Tier 2 — small functional groupings
        ├── circuits/          # Tier 3 — self-contained UI sections
        ├── pathways/          # Tier 4 — page-level layout templates
        ├── cortex/            # Tier 5 — fully composed pages
        ├── neurotransmitters/ # Global utility classes (spacing, color, type, motion)
        └── tokens/            # Internal design tokens (TS values) — not exported publicly

src/            # Demo app + web Storybook — consume @neuro/design-system as a package
.storybook/     # Web Storybook config
```

## Installation

`@neuro/design-system` is a single package — one install gets you both the components and the token-driven styling system:

```bash
npm install @neuro/design-system
```

```ts
import { Button } from "@neuro/design-system/neurons/Button";
import "@neuro/design-system/neurotransmitters/index.scss";
```

**Developing this repo locally:** run `npm install` from the repo root to link workspace packages, then `npm run dev` / `npm run storybook` / `npm run storybook:native` — each of these builds `packages/design-system` first, since the demo app and both Storybooks consume it through its compiled `dist/` output, not raw source.

## Design Tokens

`packages/design-system/src/tokens/` is the single source of truth for color, spacing, typography, and motion values — defined as plain TypeScript objects, not CSS. These are **internal to the package**: there's no public `@neuro/design-system/tokens` export, since consumers are meant to reach tokens only through the components or the generated CSS layer below.

```ts
// packages/design-system/src/tokens/color.ts
export const color = {
  bg: "#0f1115",
  accent: "#7c5cff",
  // ...
} as const;
```

Two things consume those TS values, for two different platforms:

- **Web:** the package's `build` script runs `src/tokens/generate-scss.ts`, which converts every token into a CSS custom property and writes `packages/design-system/src/neurotransmitters/_tokens.scss`. Web components (`.tsx` + `.module.scss`) reference those as `--color-*` / `--font-*` / `--motion-*` custom properties. This generated file is never hand-edited — it's regenerated from the TS source on every build.
- **React Native:** there's no CSS on RN, so `.native.tsx` components import the same TS values directly (e.g. `color.accent`) via a relative import within the package, instead of going through custom properties.

This keeps one authored source of truth (TypeScript) feeding both a CSS layer for web and direct values for native.

## Why this exists

This is a portfolio project built to demonstrate:

- Component architecture and design system thinking
- Scalable, composable UI patterns
- A naming taxonomy that's intentional rather than decorative — each tier maps to a real, escalating scale in neuroanatomy (cell → connection → circuit → pathway → region)

## Roadmap

- [ ] Finalize component API conventions across tiers
- [ ] Set up Storybook (or equivalent) for isolated component development
- [ ] Build out core Neuron-tier components
- [ ] Document contribution guidelines
- [ ] Add theming/token system
- [ ] Add usage examples per tier

## Contributing

This project is early and actively taking shape. If you have thoughts on the naming, structure, or architecture, feel free to open an issue or discussion — feedback at this stage is especially valuable.

## License

TBD

---

_Built as an open-source portfolio project. Docs and structure are a work in progress and will evolve as the system matures. No more messy systems that cause your neurvous system to go into fight or flight (aka stress)._
