"use client";
import style from "./clientcomponents.module.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useClient } from "@/context/ClientContext";

export default function ClientComponents() {
  const { id }: { id: string } = useParams();
  const { getClient, deleteClient, client } = useClient();
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    try {
      getClient(id);
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
      {!client && <div>No hay cliente</div>}
      {client && (
        <div className={style.data}>
          <p>Nombre: {client?.name}</p>
          <p>Email: {client?.email}</p>
          <p>Identificación: {client?.identification}</p>
          <p>Fecha de creación: {client?.createdAt}</p>
          <p>Fecha de actualización: {client?.updatedAt}</p>
          <div className={style.buttonContainer}>
            <Link href={`/dashboard/clientes/${id}/edit`}>
              <button>Editar</button>
            </Link>
            <button
              onClick={() => {
                deleteClient(id);                
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
