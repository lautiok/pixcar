"use client";
import style from "./formClients.module.css";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useClient } from "@/context/ClientContext";
import { useEffect, useState } from "react";

interface clients {
  name: string;
  email: string;
  identification: string;
}

export default function FormClient() {
  const { register, handleSubmit, setValue } = useForm();
  const { createClient, errors, getClient, client, updateClient } = useClient();
  const [isEditing, setIsEditing] = useState(false);
  const { id }: { id: string } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      getClient(id);
      if (client) {
        setValue("name", client.name);
        setValue("identification", client.identification);
        setValue("email", client.email);
      }
    }
  }, []);

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const clients: clients = {
        name: data.name,
        identification: data.identification,
        email: data.email,
      };

      if (isEditing && id) {
        await updateClient(id, clients);
        router.push(`/clientes/${id}`);
      } else {
        await createClient(clients);
        router.push("/clientes");
      }
    } catch (error) {
      console.log("Error al crear usuario", error);
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

        {errors && <p className={style.error}>{errors}</p>}
        <button type="submit">
          {isEditing ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </form>
    </section>
  );
}
