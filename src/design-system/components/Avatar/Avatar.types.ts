import type { ImgHTMLAttributes, ReactNode } from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  /** Initials shown when `src` fails or is absent */
  fallback?: ReactNode;
  size?: AvatarSize;
}
