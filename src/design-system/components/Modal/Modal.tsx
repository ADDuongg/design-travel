/**
 * Modal dialog with backdrop, focus management, and entrance animation (framer-motion).
 */

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef } from "react";
import styles from "./Modal.module.css";
import type { ModalProps } from "./Modal.types";

export function Modal({ open, onClose, title, children, ariaDescribedBy }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const node = panelRef.current;
    if (!node) return;
    const focusable = node.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    (focusable ?? node).focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className={styles.root}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-hidden
            tabIndex={-1}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={ariaDescribedBy}
            className={styles.panel}
            tabIndex={-1}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            {title ? (
              <div className={styles.header}>
                <h2 id={titleId} className={styles.title}>
                  {title}
                </h2>
                <button type="button" className={styles.close} onClick={onClose}>
                  Close
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "var(--ds-space-4)",
                }}
              >
                <button type="button" className={styles.close} onClick={onClose}>
                  Close
                </button>
              </div>
            )}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
