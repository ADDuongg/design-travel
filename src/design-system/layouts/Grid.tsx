/**
 * Responsive CSS grid wrapper. Column count can follow breakpoints via inline custom props or a simple default.
 */

import type { CSSProperties, ReactNode } from "react";

export interface GridProps {
  children: ReactNode;
  /** Default column count at base width */
  columns?: number;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8;
  className?: string;
  style?: CSSProperties;
}

export function Grid({ children, columns = 1, gap = 4, className = "", style }: GridProps) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `var(--ds-space-${gap})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
