/**
 * Global toast queue with severity styling and auto-dismiss; pair with `useToast`.
 */

import { motion, AnimatePresence } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styles from "./Toast.module.css";
import type { ToastOptions, ToastRecord, ToastSeverity } from "./toast.types";

export interface ToastContextValue {
  notify: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

function severityClass(severity: ToastSeverity): string {
  switch (severity) {
    case "success":
      return styles.success;
    case "warning":
      return styles.warning;
    case "error":
      return styles.error;
    case "info":
    default:
      return styles.info;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastRecord[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    const handle = timers.current.get(id);
    if (handle !== undefined) {
      window.clearTimeout(handle);
      timers.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    (options: ToastOptions) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now());
      const severity = options.severity ?? "info";
      const durationMs = options.durationMs ?? 4200;
      const record: ToastRecord = {
        id,
        message: options.message,
        severity,
        durationMs,
      };
      setItems((prev) => [...prev, record]);
      const t = window.setTimeout(() => remove(id), durationMs);
      timers.current.set(id, t);
    },
    [remove],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.viewport} aria-live="polite" aria-relevant="additions">
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.div
              key={t.id}
              layout
              role="status"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`${styles.item} ${severityClass(t.severity)}`}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
