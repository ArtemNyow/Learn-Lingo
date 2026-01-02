import { useState } from "react";
import Modal from "../../components/Modal/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Привіт! Це модалка</h2>
      </Modal>
    </div>
  );
}
