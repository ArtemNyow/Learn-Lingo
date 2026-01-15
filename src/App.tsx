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
import { useAuthStore } from "./store/authStore";
import AuthMiddleware from "./components/AuthMiddleware/AuthMiddleware";

function App() {
  const { isAuthenticated } = useAuthStore();
  const { isOpen, contentType, closeModal } = useModalStore();
  return (
    <BrowserRouter>
      <Toaster />
      <AuthMiddleware>
        <Header />
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
      </AuthMiddleware>
    </BrowserRouter>
  );
}

export default App;
