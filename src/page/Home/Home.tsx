import css from "./Home.module.css";
import { Link } from "react-router-dom";
import { THEMES } from "../../themes/themes";
import { useThemeStore } from "../../store/themeStore";
import { ThemeSwitcher } from "../../components/ThemeSwitcher/ThemeSwitcher";
export default function Home() {
  const variant = useThemeStore((state) => state.variant);
  const theme = THEMES[variant];
  return (
    <>
      <section className={css.section}>
        <div className={css.heroUpper}>
          <div className={css.wrapSection}>
            <h1 className={css.title}>
              Unlock your potential with the best{" "}
              <span className={css.span} style={{ color: theme.color }}>
                language
              </span>{" "}
              tutors
            </h1>
            <p className={css.textHero}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link
              className={css.btnHero}
              style={{ "--dynamic-color": theme.color } as React.CSSProperties}
              to="/teachers"
            >
              Get Started
            </Link>
          </div>
          <img
            className={css.imgHero}
            src={theme.image}
            alt="hero-logo-girl"
            loading="lazy"
            width={568}
            height={530}
          />
        </div>
        <div
          className={css.downHero}
          style={{ border: `2px dashed  ${theme.color}` }}
        >
          <ul className={css.listHero}>
            <li className={css.item}>
              <p className={css.firstText}>32,000 +</p>
              <p className={css.secontText}>Experienced tutors</p>
            </li>
            <li className={css.item}>
              <p className={css.firstText}>300,000 +</p>
              <p className={css.secontText}>5-star tutor reviews</p>
            </li>
            <li className={css.item}>
              <p className={css.firstText}>120 +</p>
              <p className={css.secontText}>Subjects taught</p>
            </li>
            <li className={css.item}>
              <p className={css.firstText}>200 +</p>
              <p className={css.secontText}>Tutor nationalities</p>
            </li>
          </ul>
        </div>
      </section>
      <ThemeSwitcher />
    </>
  );
}
