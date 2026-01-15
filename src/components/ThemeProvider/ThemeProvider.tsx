import React from "react";
import { useThemeStore } from "../../store/themeStore";
import { THEMES } from "../../themes/themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const variant = useThemeStore((s) => s.variant);
  const theme = THEMES[variant];

  React.useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--color-primary", theme.color);
    root.style.setProperty("--color-primary-hover", theme.hover);
  }, [theme]);
  return <>{children}</>;
}
