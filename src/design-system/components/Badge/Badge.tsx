/**
 * Compact status chip for labels, filters, and lightweight metadata.
 */

import styles from "./Badge.module.css";
import type { BadgeProps } from "./Badge.types";

function cx(...parts: (string | undefined | false)[]): string {
  return parts.filter(Boolean).join(" ");
}

export function Badge({ variant = "default", children, className, ...rest }: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[variant], className)} {...rest}>
      {children}
    </span>
  );
}
