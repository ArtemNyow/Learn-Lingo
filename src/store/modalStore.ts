import { create } from "zustand";
import type { Teacher } from "../type/teacher";

type ModalType = "login" | "register" | "book" | null;

interface ModalState {
  isOpen: boolean;
  contentType: ModalType;
  payload: Teacher | null;
  openModal: (type: ModalType, payload?: Teacher | null) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  contentType: null,
  payload: null,
  openModal: (type, payload = null) =>
    set({ isOpen: true, contentType: type, payload }),
  closeModal: () => set({ isOpen: false, contentType: null, payload: null }),
}));
