/**
 * Neutral loading placeholder block with shimmer animation for deferred content.
 */

import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** CSS height — prefer spacing tokens e.g. `var(--ds-space-10)` */
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
}

export function Skeleton({
  height = "var(--ds-space-4)",
  width = "100%",
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className ?? ""}`}
      style={{ height, width, ...style }}
      aria-hidden
      {...rest}
    />
  );
}
