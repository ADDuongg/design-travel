import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style */
  variant?: ButtonVariant;
  /** Padding and font size */
  size?: ButtonSize;
  /** Shows spinner and disables interaction */
  loading?: boolean;
  children: ReactNode;
}
