/**
 * Max-width container with horizontal padding. Use for readable line length and page gutters.
 */

import type { CSSProperties, ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps {
  children: ReactNode;
  /** Content max width preset — maps to `--ds-max-width-{size}` */
  size?: ContainerSize;
  className?: string;
  style?: CSSProperties;
}

export function Container({ children, size = "xl", className = "", style }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: `var(--ds-max-width-${size})`,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "var(--ds-space-4)",
        paddingRight: "var(--ds-space-4)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
