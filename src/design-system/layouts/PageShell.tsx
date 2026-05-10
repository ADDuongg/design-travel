/**
 * Base page scaffold with optional header, footer, and full-height main region.
 */

import type { CSSProperties, ReactNode } from "react";

export interface PageShellProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function PageShell({ header, footer, children, className = "", style }: PageShellProps) {
  return (
    <div
      className={className}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--ds-color-bg)",
        color: "var(--ds-color-text)",
        ...style,
      }}
    >
      {header ? (
        <header
          style={{
            flexShrink: 0,
            borderBottom: "1px solid var(--ds-color-border)",
            padding: "var(--ds-space-4) var(--ds-space-6)",
          }}
        >
          {header}
        </header>
      ) : null}
      <main style={{ flex: 1, minHeight: 0, width: "100%" }}>{children}</main>
      {footer ? (
        <footer
          style={{
            flexShrink: 0,
            borderTop: "1px solid var(--ds-color-border)",
            padding: "var(--ds-space-6)",
            marginTop: "auto",
          }}
        >
          {footer}
        </footer>
      ) : null}
    </div>
  );
}
