import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
