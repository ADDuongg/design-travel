/**
 * Text link with underline and hover treatments; supports router-friendly `href` or custom `onClick`.
 */

import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

export type LinkVariant = "default" | "subtle" | "inverse";

export interface LinkProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  variant?: LinkVariant;
  /** Opens in new tab when href is external */
  external?: boolean;
  className?: string;
  style?: CSSProperties;
}

const variantColor: Record<LinkVariant, string> = {
  default: "var(--ds-color-primary)",
  subtle: "var(--ds-color-text-muted)",
  inverse: "var(--ds-color-text-inverse)",
};

export function Link({
  children,
  href = "#",
  onClick,
  variant = "default",
  external,
  className = "",
  style,
}: LinkProps) {
  const isExternal =
    external ??
    (typeof href === "string" && (href.startsWith("http") || href.startsWith("//")));

  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      style={{
        fontFamily: "var(--ds-font-body)",
        fontSize: "inherit",
        color: variantColor[variant],
        textDecoration: "underline",
        textDecorationColor: "currentColor",
        textUnderlineOffset: "var(--ds-space-1)",
        transition: `color var(--ds-duration-fast) var(--ds-ease-default), opacity var(--ds-duration-fast) var(--ds-ease-default)`,
        cursor: "pointer",
        outline: "none",
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 2px var(--ds-color-bg), 0 0 0 4px var(--ds-color-focus-ring)`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.88";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
    >
      {children}
    </a>
  );
}
