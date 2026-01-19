import { useForm } from "react-hook-form";
import css from "./BookLesson.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModalStore } from "../../store/modalStore";
import toast from "react-hot-toast";
import type { Teacher } from "../../type/teacher";

interface Props {
  teacher: Teacher;
}

interface LoginFormData {
  name: string;
  email: string;
  phone: string;
  goal: Goal;
}

const options = [
  "Culture, travel or hobby",
  "Exams and coursework",
  "Living abroad",
  "Lesson for kids",
  "Career and business",
] as const;
type Goal = (typeof options)[number];

const loginSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  goal: yup
    .mixed<Goal>()
    .oneOf([...options])
    .required("Please select your goal"),
});

export default function BookLesson({ teacher }: Props) {
  const { closeModal } = useModalStore();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      goal: options[0],
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Booking data:", data);

    toast.success("Trial lesson booked successfully!");
    closeModal();
    reset();
  };
  return (
    <>
      <h1 className={css.title}>Book trial lesson</h1>
      <p className={css.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={css.teacherWrap}>
        <img
          className={css.img}
          src={teacher.avatar_url}
          alt={teacher.name}
          loading="lazy"
        />
        <div className={css.nameWrap}>
          <p className={css.textLight}>Your teacher</p>
          <p className={css.name}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={css.radioTitle}>
          What is your main reason for learning English?
        </label>
        <div className={css.radioGroup}>
          {options.map((item) => (
            <label key={item} className={css.radioLabel}>
              <input type="radio" value={item} {...register("goal")} />
              <span className={css.customRadio} />
              {item}
            </label>
          ))}
          {errors.goal && <p className={css.error}>{errors.goal.message}</p>}
        </div>
        <ul className={css.inputList}>
          <li className={css.itemList}>
            <div className={css.passwordWrap}>
              <input
                className={css.inputPassword}
                type={"text"}
                {...register("name")}
                placeholder="Full Name"
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name.message}</p>
              )}
            </div>
          </li>
          <li className={css.itemList}>
            <input
              className={css.inputEmail}
              type="email"
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </li>
          <li className={css.itemList}>
            <input
              className={css.inputEmail}
              type="tel"
              {...register("phone")}
              placeholder="Phone number"
            />
            {errors.phone && (
              <p style={{ color: "red" }}>{errors.phone.message}</p>
            )}
          </li>
        </ul>

        <button className={css.submitBtn} type="submit">
          Book
        </button>
      </form>
    </>
  );
}
