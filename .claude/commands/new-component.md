---
description: Scaffold a new Neuro Design System component with the standard tier folder structure
argument-hint: <Tier> <ComponentName>
---

Scaffold a new component for the Neuro Design System following the convention in [CLAUDE.md](../../CLAUDE.md).

Arguments: `$ARGUMENTS` — expects `<tier> <ComponentName>`, e.g. `neurons Badge` or `circuits Modal`.

## Steps

1. Parse the tier (`neurons`, `synapses`, `circuits`, `pathways`, or `cortex`) and component name from `$ARGUMENTS`. If either is missing or the tier isn't one of those five, ask before proceeding.
2. Confirm the tier is correct by checking the component's most complex direct dependency — per CLAUDE.md, a component only belongs one tier up from that dependency. If unsure, look at existing components in `packages/design-system/src/<tier>/` for precedent.
3. Create `packages/design-system/src/<tier>/<ComponentName>/` with:
   - `<ComponentName>.tsx` — web implementation, DOM elements + Sass Module, referencing `--color-*`/`--font-*`/`--motion-*` custom properties. Model the prop interface on the closest existing component in that tier (e.g. `neurons/Button/Button.tsx`) rather than inventing a new shape.
   - `<ComponentName>.module.scss` — Sass Module, class names only (no global selectors), values sourced from Neurotransmitter custom properties, not hardcoded.
   - `<ComponentName>.variant.ts` — only if the component has a cross-platform prop union (like `ButtonVariant`) shared between web and native. Skip it if there's nothing to share.
   - `<ComponentName>.native.tsx` — only if this component actually needs a React Native counterpart (don't create it speculatively). Uses `react-native` primitives (`Pressable`/`View`/`Text`) + `StyleSheet.create`, importing tokens via relative import from `../../tokens` (never CSS custom properties).
   - `<ComponentName>.stories.tsx` — at least one story per meaningfully different visual state (not one per prop combination), tagged `autodocs`, titled `"<Tier>/<ComponentName>"` matching the folder tier (e.g. `"Neurons/Badge"`). Import the component with no extension: `import { ComponentName } from "./ComponentName"`.
   - `index.ts` — re-exports the component and its prop types; this becomes the only import path other files should use.
4. Reuse existing Neurotransmitter utility classes and token custom properties instead of hardcoding colors/spacing/typography/motion values — check `packages/design-system/src/neurotransmitters/` for what's available first.
5. After scaffolding, remind the user to rebuild the package (`npm run build --workspace=@neuro/design-system`) before the component shows up in the demo app or Storybook, since a source edit under `packages/design-system/src` doesn't propagate until the package rebuilds.

Do not add stories or platform variants beyond what's asked — this command scaffolds the convention-compliant skeleton, not a fully designed component. Leave the actual visual implementation to be filled in based on the specific component's requirements.
