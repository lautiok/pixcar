"use client";
import { useUser } from "@/context/UserContext";
import style from "./formusuarios.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface User {
  name: string;
  identification: string;
  email: string;
  password: string;
  role: string;
}

export default function FormUsuariosUpdate() {
  const { register, handleSubmit } = useForm();
  const [role, setRole] = useState("");
  const { createUser, errors } = useUser();

  const handleLogin = handleSubmit(async (data) => {
    try {
      const user: User = {
        name: data.name,
        identification: data.identification,
        email: data.email,
        password: data.password,
        role: role,
      };
      await createUser(user);
    } catch (error) {
      console.log("Error al crear usuario", error);
    }
  });

  return (
    <section className={style.login}>
      <form className={style.form} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="nombre y apellido"
          {...register("name")}
        />
        <input
          type="text"
          placeholder="identificacion"
          {...register("identification")}
        />
        <input type="email" placeholder="email" {...register("email")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>
            seleccione el rol
          </option>
          <option value="admin">admin</option>
          <option value="seller">vendedor</option>
          <option value="mecanic">mecánico</option>
        </select>
        {errors && <p className={style.error}>{errors}</p>}{" "}
        <button type="submit">crear usuario</button>
      </form>
    </section>
  );
}
