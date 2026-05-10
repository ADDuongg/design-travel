import {
  breakpoint,
  duration,
  easing,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  maxWidth,
  radius,
  sidebarWidth,
  shadow,
  space,
  zIndex,
} from "../tokens";
import type { SemanticColors } from "./theme.config";

function entries<T extends object>(o: T): [keyof T, T[keyof T]][] {
  return Object.entries(o) as [keyof T, T[keyof T]][];
}

/** Flatten semantic colors to `--ds-color-*` */
export function semanticColorsToCssVars(colors: SemanticColors): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of entries(colors)) {
    out[`--ds-color-${camelToKebab(String(key))}`] = value;
  }
  return out;
}

function camelToKebab(s: string): string {
  return s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/** Primitive scales → `--ds-space-*`, `--ds-font-*`, etc. */
export function primitivesToCssVars(): Record<string, string> {
  const out: Record<string, string> = {};

  for (const [key, value] of entries(space)) {
    out[`--ds-space-${key}`] = value;
  }
  for (const [key, value] of entries(fontSize)) {
    out[`--ds-font-size-${key}`] = value;
  }
  for (const [key, value] of entries(fontWeight)) {
    out[`--ds-font-weight-${key}`] = value;
  }
  for (const [key, value] of entries(lineHeight)) {
    out[`--ds-line-height-${key}`] = value;
  }
  for (const [key, value] of entries(radius)) {
    out[`--ds-radius-${key}`] = value;
  }
  for (const [key, value] of entries(shadow)) {
    out[`--ds-shadow-${key}`] = value;
  }
  for (const [key, value] of entries(zIndex)) {
    out[`--ds-z-${key}`] = String(value);
  }
  for (const [key, value] of entries(breakpoint)) {
    out[`--ds-bp-${key}`] = value;
  }
  for (const [key, value] of entries(maxWidth)) {
    out[`--ds-max-width-${key}`] = value;
  }
  for (const [key, value] of entries(sidebarWidth)) {
    out[`--ds-sidebar-width-${key}`] = value;
  }
  for (const [key, value] of entries(duration)) {
    out[`--ds-duration-${key}`] = value;
  }
  for (const [key, value] of entries(easing)) {
    out[`--ds-ease-${key}`] = value;
  }

  out["--ds-font-display"] = fontFamily.display;
  out["--ds-font-body"] = fontFamily.body;
  out["--ds-font-mono"] = fontFamily.mono;

  return out;
}

export function buildThemeCssVars(colors: SemanticColors): Record<string, string> {
  return {
    ...primitivesToCssVars(),
    ...semanticColorsToCssVars(colors),
  };
}
