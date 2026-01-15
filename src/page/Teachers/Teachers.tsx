import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useTeachers } from "../../store/teachersStore";
import css from "./Teachers.module.css";
export default function Teachers() {
  const { teachers, loading } = useTeachers();
  if (loading) return <p>loader</p>;
  return (
    <>
      <section className={css.teacherSection}>
        <ul className={css.list}>
          {teachers.map((teacher) => (
            <TeacherCard teacher={teacher} />
          ))}
        </ul>
      </section>
    </>
  );
}
