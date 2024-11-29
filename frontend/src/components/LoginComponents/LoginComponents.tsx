"use client";
import style from "./logincomponents.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

export default function LoginComponents() {
  const { register, handleSubmit } = useForm();
  const { login, errors } = useAuth();

  const handleLogin = handleSubmit(async (data) => {
    try {
      await login(data as { email: string; password: string });
    } catch (error) {
      console.log("Error al iniciar sesión", error);
    }
  });

  return (
    <section className={style.login}>
      <div className={style.title}>
        <h1>
          PIX<span>CAR</span>
        </h1>
        <p>iniciar sesión</p>
      </div>
      <form className={style.form} onSubmit={handleLogin}>
        <input type="email" placeholder="email" {...register("email")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors && <p className={style.error}>{errors}</p>}{" "}
        <button type="submit">iniciar sesión</button>
      </form>
    </section>
  );
}
