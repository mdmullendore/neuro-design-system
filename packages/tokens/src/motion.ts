export const motion = {
  fast: 120,
  base: 200,
  slow: 320,
  ease: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export type MotionToken = keyof typeof motion;
