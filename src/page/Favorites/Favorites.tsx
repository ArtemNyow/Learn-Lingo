import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./Favorites.module.css";
import { useFavoritesStore } from "../../store/useFavoritesStore";

export default function Favorites() {
  const { favorites } = useFavoritesStore();

  return (
    <section className={css.teacherSection}>
      <ul className={css.list}>
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite) => (
            <TeacherCard key={favorite.id} teacher={favorite} />
          ))
        ) : (
          <p className={css.noResults}>No teachers found in your favorites.</p>
        )}
      </ul>
    </section>
  );
}
