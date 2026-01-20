import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { FiLogIn } from "react-icons/fi";
import { useModalStore } from "../../store/modalStore";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
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
      {isAuthenticated ? (
        <div className={css.isLogin}>
          <p className={css.helloMessege}>
            Hi, {user?.displayName || user?.email}
          </p>
          <button className={css.btnHello} type="button" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <ul className={css.authList}>
          <li className={css.authItem}>
            <button
              type="button"
              className={css.logBtn}
              onClick={() => openModal("login")}
            >
              <FiLogIn className={css.svgLogo} />
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
      )}
    </header>
  );
}
