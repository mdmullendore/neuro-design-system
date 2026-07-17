export const color = {
  bg: "#0f1115",
  surface: "#181b21",
  textPrimary: "#f4f5f7",
  textMuted: "#9aa1ac",
  accent: "#7c5cff",
  accentStrong: "#9c85ff",
  danger: "#ff5c6c",
  success: "#4ade80",
} as const;

export type ColorToken = keyof typeof color;
