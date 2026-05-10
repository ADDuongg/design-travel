/**
 * Semantic colors for light and dark themes (oklch — aligned with Vietnam Discovery palette).
 */

export type ThemeName = "light" | "dark";

export interface SemanticColors {
  bg: string;
  bgElevated: string;
  bgMuted: string;
  bgInverse: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textInverse: string;
  primary: string;
  primaryHover: string;
  primaryFg: string;
  secondary: string;
  secondaryHover: string;
  secondaryFg: string;
  success: string;
  successBg: string;
  successFg: string;
  warning: string;
  warningBg: string;
  warningFg: string;
  error: string;
  errorBg: string;
  errorFg: string;
  info: string;
  infoBg: string;
  infoFg: string;
  focusRing: string;
  overlay: string;
}

export const lightColors: SemanticColors = {
  bg: "oklch(98% 0.012 85)",
  bgElevated: "oklch(99.5% 0.008 85)",
  bgMuted: "oklch(96% 0.025 82)",
  bgInverse: "oklch(22% 0.015 75)",
  surface: "oklch(99% 0.01 85 / 0.72)",
  surfaceHover: "oklch(96% 0.02 82 / 0.85)",
  border: "oklch(90% 0.02 85 / 0.55)",
  borderStrong: "oklch(82% 0.03 80 / 0.7)",
  text: "oklch(22% 0.015 75)",
  textMuted: "oklch(55% 0.02 75)",
  textInverse: "oklch(98% 0.01 85)",
  primary: "oklch(28% 0.045 165)",
  primaryHover: "oklch(32% 0.05 165)",
  primaryFg: "oklch(98% 0.01 85)",
  secondary: "oklch(52% 0.14 38)",
  secondaryHover: "oklch(46% 0.13 38)",
  secondaryFg: "oklch(99% 0.01 85)",
  success: "oklch(48% 0.12 155)",
  successBg: "oklch(95% 0.04 155)",
  successFg: "oklch(28% 0.08 155)",
  warning: "oklch(72% 0.14 75)",
  warningBg: "oklch(96% 0.05 85)",
  warningFg: "oklch(35% 0.08 65)",
  error: "oklch(52% 0.2 25)",
  errorBg: "oklch(96% 0.04 25)",
  errorFg: "oklch(35% 0.15 25)",
  info: "oklch(55% 0.12 240)",
  infoBg: "oklch(96% 0.03 240)",
  infoFg: "oklch(30% 0.1 240)",
  focusRing: "oklch(52% 0.14 38 / 0.45)",
  overlay: "oklch(22% 0.02 75 / 0.45)",
};

export const darkColors: SemanticColors = {
  bg: "oklch(18% 0.02 75)",
  bgElevated: "oklch(22% 0.022 78)",
  bgMuted: "oklch(26% 0.025 78)",
  bgInverse: "oklch(96% 0.02 85)",
  surface: "oklch(24% 0.025 78 / 0.85)",
  surfaceHover: "oklch(30% 0.03 78 / 0.9)",
  border: "oklch(38% 0.03 78 / 0.55)",
  borderStrong: "oklch(48% 0.04 78 / 0.65)",
  text: "oklch(96% 0.015 85)",
  textMuted: "oklch(72% 0.02 80)",
  textInverse: "oklch(18% 0.02 75)",
  primary: "oklch(72% 0.08 165)",
  primaryHover: "oklch(78% 0.09 165)",
  primaryFg: "oklch(16% 0.02 165)",
  secondary: "oklch(72% 0.12 45)",
  secondaryHover: "oklch(78% 0.13 45)",
  secondaryFg: "oklch(18% 0.02 45)",
  success: "oklch(72% 0.12 155)",
  successBg: "oklch(28% 0.06 155)",
  successFg: "oklch(92% 0.04 155)",
  warning: "oklch(78% 0.12 80)",
  warningBg: "oklch(32% 0.06 75)",
  warningFg: "oklch(95% 0.04 85)",
  error: "oklch(68% 0.16 25)",
  errorBg: "oklch(30% 0.08 25)",
  errorFg: "oklch(96% 0.03 25)",
  info: "oklch(72% 0.1 240)",
  infoBg: "oklch(28% 0.06 240)",
  infoFg: "oklch(94% 0.03 240)",
  focusRing: "oklch(72% 0.12 45 / 0.5)",
  overlay: "oklch(8% 0.02 75 / 0.65)",
};
