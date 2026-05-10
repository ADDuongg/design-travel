import { createContext, useContext } from "react";
import type { ThemeName } from "./theme.config";

export interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
