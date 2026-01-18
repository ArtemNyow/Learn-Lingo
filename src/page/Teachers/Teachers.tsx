import { useMemo, useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import Loader from "../../components/Loader/Loader";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useTeachers } from "../../store/teachersStore";
import { useTeacherFilters } from "../../store/useTeacherFilters";
import css from "./Teachers.module.css";

interface FilterOption {
  value: string | number;
  label: string;
}

export default function Teachers() {
  const { teachers, loading, hasMore, loadTeachers } = useTeachers();
  const { languages, levels, prices } = useTeacherFilters(teachers);

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  const filteredTeachers = useMemo(() => {
    return teachers.filter(
      (t) =>
        (!language || t.languages.includes(language)) &&
        (!level || t.levels.includes(level)) &&
        (!price || t.price_per_hour <= Number(price)),
    );
  }, [teachers, language, level, price]);

  const handleSelectChange = (
    option: SingleValue<FilterOption>,
    setter: (val: string) => void,
  ) => {
    setter(option?.value?.toString() ?? "");
  };

  if (loading && teachers.length === 0) {
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
            onChange={(opt) => handleSelectChange(opt, setLanguage)}
            classNamePrefix="react-select"
          />
        </div>

        <div className={css.WrapFilter}>
          <label className={css.label}>Level of knowledge</label>
          <Select<FilterOption>
            options={levels}
            placeholder="All levels"
            isClearable
            onChange={(opt) => handleSelectChange(opt, setLevel)}
            classNamePrefix="react-select"
          />
        </div>

        <div className={css.WrapFilter}>
          <label className={css.label}>Price</label>
          <Select<FilterOption>
            options={prices}
            placeholder="All price"
            isClearable
            onChange={(opt) => handleSelectChange(opt, setPrice)}
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <ul className={css.list}>
        {filteredTeachers.length > 0
          ? filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))
          : !loading && (
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
            onClick={loadTeachers}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </section>
  );
}
