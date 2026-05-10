import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label */
  label?: ReactNode;
  /** Inline hint below control */
  hint?: ReactNode;
  /** Error message — sets aria-invalid and styles */
  error?: ReactNode;
  /** htmlFor id — auto-linked when omitted */
  id?: string;
}
