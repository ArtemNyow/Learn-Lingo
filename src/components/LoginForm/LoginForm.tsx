import { useForm } from "react-hook-form";
import css from "./LoginForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuthStore } from "../../store/authStore";
import { useModalStore } from "../../store/modalStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

interface LoginFormData {
  email: string;
  password: string;
}
const loginSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 chars")
      .required("Password is required"),
  })
  .required();

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuthStore();
  const { closeModal } = useModalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      toast.success(
        `Welcome back,${userCredential.user.displayName || data.email}!`,
      );
      setUser(userCredential.user);
      closeModal();
      reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={css.title}>Log In</p>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
        <ul className={css.inputList}>
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
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </>
  );
}
