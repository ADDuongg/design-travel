import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/design-system";
import "@/design-system/theme/tokens.css";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
