/**
 * Body text presets: paragraph, caption, label, and monospace code styling.
 */

import type { CSSProperties, ReactNode } from "react";

export type TextVariant = "body" | "caption" | "label" | "code";

const variantStyles: Record<TextVariant, CSSProperties> = {
  body: {
    fontFamily: "var(--ds-font-body)",
    fontSize: "var(--ds-font-size-md)",
    lineHeight: "var(--ds-line-height-relaxed)",
    fontWeight: "var(--ds-font-weight-normal)",
    color: "var(--ds-color-text)",
  },
  caption: {
    fontFamily: "var(--ds-font-body)",
    fontSize: "var(--ds-font-size-sm)",
    lineHeight: "var(--ds-line-height-normal)",
    fontWeight: "var(--ds-font-weight-normal)",
    color: "var(--ds-color-text-muted)",
  },
  label: {
    fontFamily: "var(--ds-font-body)",
    fontSize: "var(--ds-font-size-xs)",
    lineHeight: "var(--ds-line-height-snug)",
    fontWeight: "var(--ds-font-weight-semibold)",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    color: "var(--ds-color-text-muted)",
  },
  code: {
    fontFamily: "var(--ds-font-mono)",
    fontSize: "var(--ds-font-size-sm)",
    lineHeight: "var(--ds-line-height-normal)",
    fontWeight: "var(--ds-font-weight-normal)",
    color: "var(--ds-color-text)",
    backgroundColor: "var(--ds-color-bg-muted)",
    padding: "var(--ds-space-1) var(--ds-space-2)",
    borderRadius: "var(--ds-radius-sm)",
  },
};

export interface TextProps {
  variant?: TextVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "p" | "span" | "div";
}

export function Text({
  variant = "body",
  children,
  className = "",
  style,
  as: Component = "p",
}: TextProps) {
  const base = variantStyles[variant];
  return (
    <Component className={className} style={{ margin: 0, ...base, ...style }}>
      {children}
    </Component>
  );
}
