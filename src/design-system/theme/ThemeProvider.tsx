/**
 * Wraps the app and applies design-token CSS variables for the active theme (light/dark).
 * Sets `data-theme` on the root element for optional selector-based styling.
 */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeContext, type ThemeContextValue } from "./ThemeContext";
import { buildThemeCssVars } from "./cssVars";
import { darkColors, lightColors, type ThemeName } from "./theme.config";

const STORAGE_KEY = "ds-theme";

function readStoredTheme(): ThemeName | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "dark" || v === "light" ? v : null;
}

function applyCssVars(root: HTMLElement, theme: ThemeName): void {
  const colors = theme === "light" ? lightColors : darkColors;
  const vars = buildThemeCssVars(colors);
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme when no stored preference */
  defaultTheme?: ThemeName;
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(() => readStoredTheme() ?? defaultTheme);

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    applyCssVars(root, theme);
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
