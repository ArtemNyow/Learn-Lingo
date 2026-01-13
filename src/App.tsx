import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Teachers from "./page/Teachers/Teachers";
import Favorites from "./page/Favorites/Favorites";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import { useModalStore } from "./store/modalStore";
import Modal from "./components/Modal/Modal";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { Toaster } from "react-hot-toast";

function App() {
  const isAuthenticated = true;
  const { isOpen, contentType, closeModal } = useModalStore();
  return (
    <BrowserRouter>
      <Toaster />
      <Header isAuthenticated={isAuthenticated} />
      <Modal isOpen={isOpen} onClose={closeModal}>
        {contentType === "login" && <LoginForm />}
        {contentType === "register" && <RegisterForm />}
      </Modal>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route
          path="/favorites"
          element={isAuthenticated ? <Favorites /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
