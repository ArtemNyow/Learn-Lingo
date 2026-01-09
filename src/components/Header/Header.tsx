import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { FiLogIn } from "react-icons/fi";
import { useThemeStore } from "../../store/themeStore";
import { THEMES } from "../../themes/themes";
import { useModalStore } from "../../store/modalStore";
interface IHeader {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: IHeader) {
  const variant = useThemeStore((state) => state.variant);
  const theme = THEMES[variant];
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${css.item} ${css.active}` : css.item;
  const { openModal } = useModalStore();
  return (
    <header className={css.header}>
      <Link to="/" className={css.logo}>
        <svg width={28} height={28}>
          <use href="./ukraine.svg"></use>
        </svg>
        LearnLingo
      </Link>
      <nav className={css.nav}>
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>

        <NavLink to="/teachers" className={navClass}>
          Teachers
        </NavLink>
        {isAuthenticated && (
          <NavLink to="/favorites" className={navClass}>
            Favorites
          </NavLink>
        )}
      </nav>
      <ul className={css.authList}>
        <li className={css.authItem}>
          <button
            type="button"
            className={css.logBtn}
            onClick={() => openModal("login")}
          >
            <FiLogIn className={css.svgLogo} style={{ color: theme.color }} />
            Log in
          </button>
        </li>
        <li className={css.authItem}>
          <button
            className={css.regBtn}
            type="button"
            onClick={() => openModal("register")}
          >
            Register
          </button>
        </li>
      </ul>
    </header>
  );
}
