import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={css.wrapper}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>Сторінку не знайдено</p>
      <Link to="/" className={css.link}>
        Повернутись на головну
      </Link>
    </section>
  );
}
