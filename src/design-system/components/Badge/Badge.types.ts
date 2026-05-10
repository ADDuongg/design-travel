import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone */
  variant?: BadgeVariant;
  children: ReactNode;
}
