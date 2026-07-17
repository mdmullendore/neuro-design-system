const unit = 4;

const multiplier = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 10,
  "2xl": 16,
} as const;

export const spacing = Object.fromEntries(
  Object.entries(multiplier).map(([name, m]) => [name, unit * m]),
) as Record<keyof typeof multiplier, number>;

export type SpacingToken = keyof typeof spacing;
