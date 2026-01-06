import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { FiLogIn } from "react-icons/fi";
interface IHeader {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: IHeader) {
  return (
    <header className={css.header}>
      <Link to="/" className={css.logo}>
        <svg width={28} height={28}>
          <use href="./ukraine.svg"></use>
        </svg>
        LearnLingo
      </Link>
      <nav className={css.nav}>
        <Link to="/" className={css.item}>
          Home
        </Link>
        <Link to="/teachers" className={css.item}>
          Teachers
        </Link>
        {isAuthenticated && (
          <Link to="/favorites" className={css.item}>
            Favorites
          </Link>
        )}
      </nav>
      <ul className={css.authList}>
        <li className={css.authItem}>
          <button type="button" className={css.logBtn}>
            <FiLogIn className={css.svgLogo} />
            Log in
          </button>
        </li>
        <li className={css.authItem}>
          <button className={css.regBtn} type="button">
            Register
          </button>
        </li>
      </ul>
    </header>
  );
}
