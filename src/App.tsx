import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Teachers from "./page/Teachers/Teachers";
import Favorites from "./page/Favorites/Favorites";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  const isAuthenticated = true;
  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} />
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
