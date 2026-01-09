import { useForm } from "react-hook-form";
import css from "./LoginForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
    reset();
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

        <button className={css.submitBtn} type="submit">
          Log In
        </button>
      </form>
    </>
  );
}
