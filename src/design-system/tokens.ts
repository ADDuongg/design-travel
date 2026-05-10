/**
 * Design tokens — primitive scales used with CSS variables (`--ds-*`).
 * Components must reference `var(--ds-...)` only; no raw hex/px in UI code.
 */

/** Spacing scale: 4px base grid, keys 1–24 → n × 4px (max 96px). */
export const space = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

export type SpaceKey = keyof typeof space;

/** Typography — font families (match project display/body pairing). */
export const fontFamily = {
  display: '"Cormorant Garamond", "Iowan Old Style", Georgia, serif',
  body: "Inter, system-ui, sans-serif",
  mono: 'ui-monospace, "Cascadia Code", "Segoe UI Mono", monospace',
} as const;

/** Font sizes xs → 5xl */
export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
} as const;

export type FontSizeKey = keyof typeof fontSize;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const lineHeight = {
  none: "1",
  tight: "1.2",
  snug: "1.35",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

/** Border radius */
export const radius = {
  none: "0",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

export type RadiusKey = keyof typeof radius;

/** Shadow levels */
export const shadow = {
  none: "none",
  sm: "0 1px 2px oklch(22% 0.02 75 / 0.06)",
  md: "0 4px 12px oklch(22% 0.02 75 / 0.08)",
  lg: "0 12px 40px -8px oklch(22% 0.02 75 / 0.15)",
  xl: "0 24px 80px -32px oklch(22% 0.02 75 / 0.35)",
} as const;

export type ShadowKey = keyof typeof shadow;

/** Z-index layers */
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
} as const;

/** Breakpoints (px) — for JS matchMedia if needed */
export const breakpoint = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/** Sidebar column widths */
export const sidebarWidth = {
  narrow: "12rem",
  md: "16rem",
  wide: "20rem",
} as const;

/** Container max widths */
export const maxWidth = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  full: "100%",
} as const;

/** Motion */
export const duration = {
  instant: "50ms",
  fast: "150ms",
  normal: "250ms",
  slow: "400ms",
  slower: "600ms",
} as const;

export const easing = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/** CSS variable name prefixes used across the design system */
export const cssVar = {
  prefix: "--ds",
} as const;
