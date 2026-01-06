import type { THEMES } from "../themes/themes";
import { create } from "zustand";

type ThemeVariant = keyof typeof THEMES;

interface ThemeState {
  variant: ThemeVariant;
  setVariant: (variant: ThemeVariant) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  variant: "orange",
  setVariant: (variant) => set({ variant }),
}));
