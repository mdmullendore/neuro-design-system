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

// Color shade scale (50 near-white through 900 near-black)
const shadeStops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type PaletteShade = (typeof shadeStops)[number];

const lightnessRamp: Record<PaletteShade, number> = {
  50: 96,
  100: 91,
  200: 83,
  300: 72,
  400: 60,
  500: 50,
  600: 42,
  700: 34,
  800: 26,
  900: 16,
};

/**
 * Convert to hexcode
 * @param hue 
 * @param saturation 
 * @param lightness 
 * @returns 
 */
const hslToHex = (hue: number, saturation: number, lightness: number): string => {
  const s = saturation / 100;
  const l = lightness / 100;
  const k = (n: number) => (n + hue / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number) => {
    const v = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
};

/**
 * Create color scale
 * @param hue 
 * @param saturation 
 * @returns 
 */
const makeScale = (hue: number, saturation: number): Record<PaletteShade, string> =>
  Object.fromEntries(
    shadeStops.map((stop) => [stop, hslToHex(hue, saturation, lightnessRamp[stop])]),
  ) as Record<PaletteShade, string>;

export const palette = {
  slate: makeScale(222, 15),
  red: makeScale(4, 74),
  orange: makeScale(26, 82),
  amber: makeScale(42, 88),
  green: makeScale(146, 46),
  teal: makeScale(175, 50),
  blue: makeScale(215, 72),
  purple: makeScale(262, 56),
  pink: makeScale(332, 62),
} as const;

export type PaletteHue = keyof typeof palette;

export const brand = {
  primary: "#3B00DB",
  secondary: "#6000DB",
  tertiary: "#8600DB",
} as const;

export type BrandColorToken = keyof typeof brand;
