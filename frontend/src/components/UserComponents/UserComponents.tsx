"use client";
import style from "./usercomponents.module.css";
import { useParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function UserComponents() {
  const { id }: { id: string } = useParams();
  const { user, getUser, deleteUser } = useUser();
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    try {
      getUser(id);
      setIsloading(false);
    } catch (error) {
      console.log("Error al obtener usuario", error);
      setIsloading(false);
    }
  }, [id]);

  if (isloading) {
    return <div>Loading...</div>;
  }
  return (
    <section className={style.user}>
      <h1>Usuario</h1>
      {!user && <div>No hay usuario</div>}
      {user && (
        <div className={style.data}>
          <p>Nombre: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <p>Identificación: {user?.identification}</p>
          <p>Fecha de creación: {user?.createdAt}</p>
          <p>Fecha de actualización: {user?.updatedAt}</p>
          <div className={style.buttonContainer}>
            <Link href={`/dashboard/users/${id}/edit`}>
              <button>Editar</button>
            </Link>
            <button
              onClick={() => {
                deleteUser(id);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
