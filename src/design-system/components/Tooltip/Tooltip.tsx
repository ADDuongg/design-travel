/**
 * Lightweight hover/focus tooltip; keeps content in a high z-index layer for overlays.
 */

import { useId, useState, type ReactNode } from "react";
import styles from "./Tooltip.module.css";

export interface TooltipProps {
  /** Tooltip copy */
  content: ReactNode;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className={styles.anchor}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span tabIndex={0} aria-describedby={open ? id : undefined}>
        {children}
      </span>
      {open ? (
        <span id={id} role="tooltip" className={styles.bubble}>
          {content}
        </span>
      ) : null}
    </span>
  );
}
