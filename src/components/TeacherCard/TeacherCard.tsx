import { IoBookOutline } from "react-icons/io5";
import type { Teacher } from "../../type/teacher";
import css from "./TeacherCard.module.css";
import { FaHeart, FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import { useAuthStore } from "../../store/authStore";
import { useModalStore } from "../../store/modalStore";
interface ITeacherCard {
  teacher: Teacher;
}
export default function TeacherCard({ teacher }: ITeacherCard) {
  const [showMore, setShowMore] = useState(false);

  const { isAuthenticated } = useAuthStore();
  const { openModal } = useModalStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isLiked = isFavorite(teacher.id || "");
  const handleHeardClick = () => {
    if (!isAuthenticated) {
      openModal("login");
      return;
    }
    toggleFavorite(teacher);
  };
  return (
    <>
      <li key={teacher.id} className={css.item}>
        <img
          className={css.avatar}
          src={teacher.avatar_url}
          loading="lazy"
          width={120}
          height={120}
        />
        <div className={css.description}>
          <div className={css.upper}>
            <p className={css.title}>Languages</p>
            <ul className={css.upperList}>
              <li className={css.upperItem}>
                <IoBookOutline className={css.iconBook} />
                Lessons online
              </li>
              <li className={css.upperItem}>
                Lessons done:{teacher.lessons_done}
              </li>
              <li className={css.upperItem}>
                <FaStar color="#FFC531" />
                {teacher.rating}
              </li>
              <li className={css.upperItem}>
                Price / 1 hour:
                <span style={{ color: "#38CD3E" }}>
                  {teacher.price_per_hour}$
                </span>
              </li>
            </ul>
            <button
              type="button"
              className={css.heart}
              onClick={handleHeardClick}
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
              Language:
              <span className={css.underline}>
                {teacher.languages.join(",")}
              </span>
            </li>
            <li className={css.features}>
              Lesson Info:
              <span className={css.featuresText}>{teacher.lesson_info}</span>
            </li>
            <li className={css.features}>
              Conditions:
              <span className={css.featuresText}>{teacher.conditions}</span>
            </li>
          </ul>
          {!showMore && (
            <button
              type="button"
              className={css.btnReadMore}
              onClick={() => setShowMore(true)}
            >
              Read more
            </button>
          )}

          {showMore && (
            <div className={css.extraList}>
              <p className={css.extraItem}>{teacher.experience}</p>

              <ul className={css.reviews}>
                {teacher.reviews.map((review, index) => (
                  <li key={index} className={css.reviewItem}>
                    <div className={css.reviewWrap}>
                      <p className={css.reviewName}>{review.reviewer_name}</p>
                      <p className={css.reviewRating}>
                        <FaStar color="#FFC531" />
                        {review.reviewer_rating.toFixed(1)}
                      </p>
                    </div>
                    <p className={css.reviewComment}>{review.comment}</p>
                  </li>
                ))}
              </ul>

              <ul className={css.levelList}>
                {teacher.levels.map((level, index) => (
                  <li className={css.levelItem} key={index}>
                    {level}
                  </li>
                ))}
              </ul>

              <button className={css.btnTrial} type="button">
                Book trial lesson
              </button>
            </div>
          )}
        </div>
      </li>
    </>
  );
}
