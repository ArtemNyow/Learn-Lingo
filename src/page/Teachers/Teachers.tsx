import { useMemo, useState, useCallback } from "react";
import Select, { type SingleValue } from "react-select";
import Loader from "../../components/Loader/Loader";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useTeachers } from "../../store/teachersStore"; // Перевірте шлях до хука з п.1
import {
  useTeacherFilters,
  type FilterOption,
} from "../../store/useTeacherFilters";
import css from "./Teachers.module.css";

const PAGE_SIZE = 4;

export default function Teachers() {
  const { teachers, loading } = useTeachers();
  const { languages, levels, prices } = useTeacherFilters(teachers);

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchesLang =
        !selectedLanguage || t.languages.includes(selectedLanguage);
      const matchesLevel = !selectedLevel || t.levels.includes(selectedLevel);

      const matchesPrice =
        !selectedPrice || t.price_per_hour <= Number(selectedPrice);

      return matchesLang && matchesLevel && matchesPrice;
    });
  }, [teachers, selectedLanguage, selectedLevel, selectedPrice]);

  const visibleTeachers = useMemo(() => {
    return filteredTeachers.slice(0, visibleCount);
  }, [filteredTeachers, visibleCount]);

  const hasMore = visibleCount < filteredTeachers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleFilterChange = useCallback(
    (
      newValue: SingleValue<FilterOption>,
      setter: (val: string | null) => void,
    ) => {
      setter(newValue ? newValue.value : null);

      setVisibleCount(PAGE_SIZE);
    },
    [],
  );
  if (loading) {
    return (
      <div className={css.centeredLoader}>
        <Loader />
      </div>
    );
  }

  return (
    <section className={css.teacherSection}>
      <div className={css.filter}>
        <div className={css.WrapFilter}>
          <label className={css.label}>Languages</label>
          <Select<FilterOption>
            options={languages}
            placeholder="All languages"
            isClearable
            onChange={(opt) => handleFilterChange(opt, setSelectedLanguage)}
            classNamePrefix="react-select"
            value={languages.find((l) => l.value === selectedLanguage) || null}
          />
        </div>

        <div className={css.WrapFilter}>
          <label className={css.label}>Level of knowledge</label>
          <Select<FilterOption>
            options={levels}
            placeholder="All levels"
            isClearable
            onChange={(opt) => handleFilterChange(opt, setSelectedLevel)}
            classNamePrefix="react-select"
            value={levels.find((l) => l.value === selectedLevel) || null}
          />
        </div>

        <div className={css.WrapFilter}>
          <label className={css.label}>Price</label>
          <Select<FilterOption>
            options={prices}
            placeholder="All prices"
            isClearable
            onChange={(opt) => handleFilterChange(opt, setSelectedPrice)}
            classNamePrefix="react-select"
            value={prices.find((p) => p.value === selectedPrice) || null}
          />
        </div>
      </div>

      <ul className={css.list}>
        {visibleTeachers.length > 0 ? (
          visibleTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))
        ) : (
          <p className={css.noResults}>
            No teachers found matching your criteria.
          </p>
        )}
      </ul>

      <div className={css.paginationWrapper}>
        {hasMore && (
          <button
            type="button"
            className={css.loadMoreBtn}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
