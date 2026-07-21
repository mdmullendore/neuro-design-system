import { create } from "storybook/theming";

// Mirrors packages/design-system/src/tokens/color.ts. Kept as plain hex here (rather than
// importing the token file) since the manager UI renders in its own iframe outside the
// design system's CSS custom-property layer, and tokens have no public package export.
const color = {
  bg: "#0f1115",
  surface: "#181b21",
  textPrimary: "#f4f5f7",
  textMuted: "#9aa1ac",
  accent: "#7c5cff",
  accentStrong: "#9c85ff",
};

export const neuroTheme = create({
  base: "dark",

  colorPrimary: color.accent,
  colorSecondary: color.accent,

  appBg: color.bg,
  appContentBg: color.surface,
  appPreviewBg: color.surface,
  appBorderColor: "rgba(244, 245, 247, 0.1)",
  appBorderRadius: 6,

  fontBase: '"Inter", system-ui, sans-serif',
  fontCode: '"IBM Plex Mono", monospace',

  textColor: color.textPrimary,
  textMutedColor: color.textMuted,
  textInverseColor: color.bg,

  barBg: color.bg,
  barTextColor: color.textMuted,
  barHoverColor: color.accentStrong,
  barSelectedColor: color.accent,

  buttonBg: color.surface,
  buttonBorder: "rgba(244, 245, 247, 0.1)",
  booleanBg: color.surface,
  booleanSelectedBg: color.accent,

  inputBg: color.surface,
  inputBorder: "rgba(244, 245, 247, 0.1)",
  inputTextColor: color.textPrimary,
  inputBorderRadius: 4,

  brandTitle: "Neuro Design System",
  brandUrl: "https://github.com/mdmullendore/neuro-design-system",
  // Swap for a dedicated wordmark once one exists; falls back to the app favicon mark for now.
  brandImage: "/favicon.svg",
  brandTarget: "_self",
});
