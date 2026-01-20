import { useForm } from "react-hook-form";
import css from "./RegisterForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { useModalStore } from "../../store/modalStore";
import { useAuthStore } from "../../store/authStore";
interface RegistFormData {
  name: string;
  email: string;
  password: string;
}
const loginSchema = yup
  .object({
    name: yup.string().min(2, "Name too short").required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 chars")
      .required("Password is required"),
  })
  .required();

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { closeModal } = useModalStore();
  const { setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistFormData>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: RegistFormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(userCredential.user, { displayName: data.name });
      setUser(userCredential.user);
      toast.success(`Welcome, ${data.name}! Registration successful.`);
      reset();
      closeModal();
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={css.title}>Registration</p>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <ul className={css.inputList}>
          <li className={css.itemList}>
            <input
              className={css.inputName}
              type="text"
              {...register("name")}
              placeholder="Name"
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
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
            <div className={css.passwordWrap}>
              <input
                className={css.inputPassword}
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
              <button
                className={css.hideBtn}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </li>
        </ul>

        <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </>
  );
}
