import type { THEMES } from "../themes/themes";
import { create } from "zustand";

type ThemeVariant = keyof typeof THEMES;

interface ThemeState {
  variant: ThemeVariant;
  setVariant: (variant: ThemeVariant) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  variant: (localStorage.getItem("theme") as ThemeVariant) || "orange",
  setVariant: (variant: ThemeVariant) => {
    localStorage.setItem("theme", variant);
    set({ variant });
  },
}));
