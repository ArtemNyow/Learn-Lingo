import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.center}>
      <div className={css.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
