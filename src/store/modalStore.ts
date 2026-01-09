import { create } from "zustand";

type ModalContent = "login" | "register" | null;

interface ModalState {
  isOpen: boolean;
  contentType: ModalContent;
  openModal: (type: ModalContent) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  contentType: null,
  openModal: (type) => set({ isOpen: true, contentType: type }),
  closeModal: () => set({ isOpen: false }),
}));
