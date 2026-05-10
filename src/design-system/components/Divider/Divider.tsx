/**
 * Visual separator for stacked sections or inline clusters; supports horizontal and vertical axes.
 */

import type { CSSProperties, HTMLAttributes } from "react";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
}

export function Divider({
  orientation = "horizontal",
  className,
  style,
  ...rest
}: DividerProps) {
  const base: CSSProperties =
    orientation === "horizontal"
      ? {
          width: "100%",
          height: "1px",
          border: "none",
          margin: 0,
          backgroundColor: "var(--ds-color-border)",
        }
      : {
          width: "1px",
          alignSelf: "stretch",
          minHeight: "var(--ds-space-6)",
          border: "none",
          margin: 0,
          backgroundColor: "var(--ds-color-border)",
        };

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={className}
      style={{ ...base, ...style }}
      {...rest}
    />
  );
}
