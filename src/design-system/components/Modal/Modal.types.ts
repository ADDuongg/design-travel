import type { ReactNode } from "react";

export interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Called when backdrop or dismiss control activates */
  onClose: () => void;
  /** Accessible dialog title */
  title?: ReactNode;
  children: ReactNode;
  /** Optional accessible description id */
  ariaDescribedBy?: string;
}
