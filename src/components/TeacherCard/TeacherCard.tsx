import { useState, useCallback } from "react";
import { IoBookOutline } from "react-icons/io5";
import { FaHeart, FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { ref, update } from "firebase/database";
import { db } from "../../firebase/firebase";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import { useAuthStore } from "../../store/authStore";
import { useModalStore } from "../../store/modalStore";
import type { Teacher } from "../../type/teacher";
import css from "./TeacherCard.module.css";

interface ITeacherCard {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: ITeacherCard) {
  const [showMore, setShowMore] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const { openModal } = useModalStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const isLiked = isFavorite(teacher.id || "");

  const handleHeartClick = useCallback(async () => {
    if (!isAuthenticated || !user) {
      openModal("login");
      return;
    }
    toggleFavorite(teacher);
    const currentFavorites = useFavoritesStore.getState().favorites;

    try {
      const userRef = ref(db, `users/${user.uid}`);
      await update(userRef, {
        favorites: currentFavorites,
      });
    } catch (error) {
      console.error("Firebase sync error:", error);
      toggleFavorite(teacher);
    }
  }, [isAuthenticated, user, teacher, toggleFavorite, openModal]);

  return (
    <li className={css.item}>
      <img
        className={css.avatar}
        src={teacher.avatar_url}
        loading="lazy"
        width={120}
        height={120}
        alt={`${teacher.name} avatar`}
      />
      <div className={css.description}>
        <div className={css.upper}>
          <p className={css.title}>Languages</p>
          <ul className={css.upperList}>
            <li className={css.upperItem}>
              <IoBookOutline className={css.iconBook} /> Lessons online
            </li>
            <li className={css.upperItem}>
              Lessons done: {teacher.lessons_done}
            </li>
            <li className={css.upperItem}>
              <FaStar color="#FFC531" /> {teacher.rating}
            </li>
            <li className={css.upperItem}>
              Price / 1 hour:{" "}
              <span className={css.price}>{teacher.price_per_hour}$</span>
            </li>
          </ul>

          <button
            type="button"
            className={css.heart}
            onClick={handleHeartClick}
            aria-label="Toggle favorite"
          >
            {isLiked ? (
              <FaHeart
                size={26}
                color="var(--color-primary)"
                className={css.heartIcon}
              />
            ) : (
              <CiHeart
                size={26}
                color="var(--color-text)"
                className={css.heartIcon}
              />
            )}
          </button>
        </div>

        <h3 className={css.name}>
          {teacher.name} {teacher.surname}
        </h3>

        <ul className={css.featuresList}>
          <li className={css.features}>
            Language:{" "}
            <span className={css.underline}>
              {teacher.languages.join(", ")}
            </span>
          </li>
          <li className={css.features}>
            Lesson Info:{" "}
            <span className={css.featuresText}>{teacher.lesson_info}</span>
          </li>
          <li className={css.features}>
            Conditions:{" "}
            <span className={css.featuresText}>{teacher.conditions}</span>
          </li>
        </ul>

        {!showMore ? (
          <button
            type="button"
            className={css.btnReadMore}
            onClick={() => setShowMore(true)}
          >
            Read more
          </button>
        ) : (
          <div className={css.extraList}>
            <p className={css.extraItem}>{teacher.experience}</p>
            <ul className={css.reviews}>
              {teacher.reviews.map((review, idx) => (
                <li key={idx} className={css.reviewItem}>
                  <div className={css.reviewWrap}>
                    <p className={css.reviewName}>{review.reviewer_name}</p>
                    <p className={css.reviewRating}>
                      <FaStar color="#FFC531" />{" "}
                      {review.reviewer_rating.toFixed(1)}
                    </p>
                  </div>
                  <p className={css.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
            <ul className={css.levelList}>
              {teacher.levels.map((level, idx) => (
                <li className={css.levelItem} key={idx}>
                  #{level}
                </li>
              ))}
            </ul>
            <button
              className={css.btnTrial}
              type="button"
              onClick={() => openModal("book", teacher)}
            >
              Book trial lesson
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
