export const typography = {
  fontFamilyBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSizeSm: 14,
  fontSizeMd: 16,
  fontSizeLg: 20,
  fontSizeXl: 28,
} as const;

export type TypographyToken = keyof typeof typography;
