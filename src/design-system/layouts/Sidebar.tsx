/**
 * Two-column layout: sidebar + main. Sidebar width uses spacing tokens.
 */

import type { CSSProperties, ReactNode } from "react";

export interface SidebarProps {
  sidebar: ReactNode;
  children: ReactNode;
  /** Sidebar width */
  sideWidth?: "narrow" | "md" | "wide";
  className?: string;
  style?: CSSProperties;
}

export function Sidebar({
  sidebar,
  children,
  sideWidth = "md",
  className = "",
  style,
}: SidebarProps) {
  const w = `var(--ds-sidebar-width-${sideWidth})`;
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `${w} minmax(0, 1fr)`,
        gap: "var(--ds-space-6)",
        alignItems: "start",
        ...style,
      }}
    >
      <aside style={{ position: "sticky", top: "var(--ds-space-4)" }}>{sidebar}</aside>
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );
}
