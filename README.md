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

```
src/
├── neurons/           # Tier 1 — smallest UI primitives
├── synapses/          # Tier 2 — small functional groupings
├── circuits/          # Tier 3 — self-contained UI sections
├── pathways/          # Tier 4 — page-level layout templates
├── cortex/            # Tier 5 — fully composed pages
└── neurotransmitters/ # Global utility classes (spacing, color, type, motion)
```

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
