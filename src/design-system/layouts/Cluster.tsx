/**
 * Horizontal flex row that wraps; useful for toolbars, tags, and inline actions.
 */

import type { CSSProperties, ReactNode } from "react";

export interface ClusterProps {
  children: ReactNode;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8;
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  className?: string;
  style?: CSSProperties;
}

export function Cluster({
  children,
  gap = 3,
  justify = "flex-start",
  align = "center",
  className = "",
  style,
}: ClusterProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: justify,
        alignItems: align,
        gap: `var(--ds-space-${gap})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
