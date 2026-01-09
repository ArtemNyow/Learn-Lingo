import type React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={css.modalBackdrop} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.modalClose} onClick={onClose}>
          <AiOutlineClose size={24} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
