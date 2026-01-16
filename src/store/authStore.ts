import { create } from "zustand";
import type { User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user: user, isAuthenticated: !!user }),
  logout: async () => {
    await signOut(auth);
    set({ user: null, isAuthenticated: false });
  },
}));
