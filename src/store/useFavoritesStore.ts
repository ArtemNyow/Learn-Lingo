import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Teacher } from "../type/teacher";

interface FavoritesState {
  favorites: Teacher[];
  toggleFavorite: (teacher: Teacher) => void;
  isFavorite: (teacherId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

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
    }),
    {
      name: "favorites-storage",
    },
  ),
);
