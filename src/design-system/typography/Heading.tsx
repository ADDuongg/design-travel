/**
 * Semantic heading mapped to the typographic scale; uses display font for visual hierarchy.
 */

import type { CSSProperties, ReactNode } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const levelToSize: Record<HeadingLevel, string> = {
  1: "var(--ds-font-size-5xl)",
  2: "var(--ds-font-size-4xl)",
  3: "var(--ds-font-size-3xl)",
  4: "var(--ds-font-size-2xl)",
  5: "var(--ds-font-size-xl)",
  6: "var(--ds-font-size-lg)",
};

const levelToTag = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export interface HeadingProps {
  /** Heading level (h1–h6) — affects default size and semantics */
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Heading({ level = 2, children, className = "", style }: HeadingProps) {
  const Tag = levelToTag[level];

  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--ds-font-display)",
        fontSize: levelToSize[level],
        fontWeight: "var(--ds-font-weight-semibold)",
        lineHeight: "var(--ds-line-height-tight)",
        color: "var(--ds-color-text)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
