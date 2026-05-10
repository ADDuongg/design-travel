/**
 * Vertical stack with consistent gap from the spacing scale.
 */

import type { CSSProperties, ReactNode } from "react";

export interface StackProps {
  children: ReactNode;
  /** Gap between items — maps to `--ds-space-{gap}` */
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
  align?: CSSProperties["alignItems"];
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "article" | "main" | "aside";
}

export function Stack({
  children,
  gap = 4,
  align = "stretch",
  className = "",
  style,
  as: Component = "div",
}: StackProps) {
  return (
    <Component
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align,
        gap: `var(--ds-space-${gap})`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
