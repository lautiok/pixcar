"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import style from "./formusuarios.module.css";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

interface User {
  name: string;
  identification: string;
  email: string;
  password?: string;
  role: string;
}

export default function FormUsuarios() {
  const { register, handleSubmit, setValue } = useForm();
  const { createUser, getUser, updateUser, errors, user } = useUser();
  const [role, setRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { id }: { id: string } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      getUser(id);
      if (user) {
        setValue("name", user.name);
        setValue("identification", user.identification);
        setValue("email", user.email);
        setValue("role", user.role);
        setRole(user.role);
      }
    }
  }, []);

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const user: User = {
        name: data.name,
        identification: data.identification,
        email: data.email,
        password: data.password,
        role: role,
      };

      if (isEditing && id) {
        await updateUser(id, user);
      } else {
        await createUser(user);
      }

      router.push("/");
    } catch (error) {
      console.log("Error al enviar formulario", error);
    }
  });

  return (
    <section className={style.login}>
      <form className={style.form} onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Nombre y apellido"
          {...register("name")}
        />
        <input
          type="text"
          placeholder="Identificación"
          {...register("identification")}
        />
        <input type="email" placeholder="Email" {...register("email")} />
        {!isEditing && (
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
          />
        )}
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>
            Seleccione el rol
          </option>
          <option value="admin">Admin</option>
          <option value="seller">Vendedor</option>
          <option value="mecanic">Mecánico</option>
        </select>
        {errors && <p className={style.error}>{errors}</p>}
        <button type="submit">
          {isEditing ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </form>
    </section>
  );
}
