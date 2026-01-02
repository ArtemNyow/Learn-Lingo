import { Link } from "react-router-dom";
interface IHeader {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: IHeader) {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/teachers">Teachers</Link>
        {isAuthenticated && <Link to="/favorites">Favorites</Link>}
      </nav>
    </header>
  );
}
