import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional title region */
  header?: ReactNode;
  /** Optional footer actions / meta */
  footer?: ReactNode;
  children: ReactNode;
  pad?: boolean;
  style?: CSSProperties;
}
