/**
 * Elevated surface grouping content with optional header and footer slots.
 */

import styles from "./Card.module.css";
import type { CardProps } from "./Card.types";

export function Card({
  header,
  footer,
  children,
  pad = true,
  className,
  style,
  ...rest
}: CardProps) {
  return (
    <div className={`${styles.card} ${className ?? ""}`} style={style} {...rest}>
      {header ? <div className={styles.header}>{header}</div> : null}
      {pad ? <div className={styles.section}>{children}</div> : children}
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  );
}
