import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./Favorites.module.css";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import { useAuthStore } from "../../store/authStore"; // Додаємо перевірку авторизації

export default function Favorites() {
  const { favorites } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <section className={css.teacherSection}>
        <p className={css.noResults}>
          Please log in to see your favorite teachers.
        </p>
      </section>
    );
  }

  return (
    <section className={css.teacherSection}>
      <ul className={css.list}>
        {favorites.length > 0 ? (
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
