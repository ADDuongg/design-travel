import type { ReactNode } from "react";

export type ToastSeverity = "success" | "warning" | "error" | "info";

export interface ToastOptions {
  message: ReactNode;
  severity?: ToastSeverity;
  /** Auto-dismiss duration (ms); default 4200 */
  durationMs?: number;
}

export interface ToastRecord extends Required<Omit<ToastOptions, "durationMs">> {
  id: string;
  durationMs: number;
}
