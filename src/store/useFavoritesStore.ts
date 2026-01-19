import { create } from "zustand";
import type { Teacher } from "../type/teacher";

interface FavoritesState {
  favorites: Teacher[];
  setFavorites: (favorites: Teacher[]) => void;
  toggleFavorite: (teacher: Teacher) => void;
  isFavorite: (teacherId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  favorites: [],

  setFavorites: (favorites) => set({ favorites }),

  toggleFavorite: (teacher) => {
    const { favorites } = get();
    const isExist = favorites.some((fav) => fav.id === teacher.id);

    if (isExist) {
      set({ favorites: favorites.filter((fav) => fav.id !== teacher.id) });
    } else {
      set({ favorites: [...favorites, teacher] });
    }
  },

  isFavorite: (teacherId) => {
    return get().favorites.some((fav) => fav.id === teacherId);
  },

  clearFavorites: () => set({ favorites: [] }),
}));
