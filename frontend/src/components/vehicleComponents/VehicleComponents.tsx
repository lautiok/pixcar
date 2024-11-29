"use client";
import style from "./vehiclecomponents.module.css";
import { useParams, useRouter } from "next/navigation";
import { useVehicule } from "@/context/VehiculeContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VehicleComponents() {
  const { id }: { id: string } = useParams();
  const { vehicule, getVehicule, deleteVehicule } = useVehicule();
  const [isloading, setIsloading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      getVehicule(id);
      setIsloading(false);
    } catch (error) {
      console.log("Error al obtener vehiculo", error);
      setIsloading(false);
    }
  }, [id]);

  if (isloading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={style.user}>
      <h1>vehiculo</h1>
      {!vehicule && <div>No hay vehiculo</div>}
      {vehicule && (
        <div className={style.data}>
          <p>Marca: {vehicule?.marca}</p>
          <p>Modelo: {vehicule?.modelo}</p>
          <p>Placa: {vehicule?.placa}</p>
          <p>color: {vehicule?.color}</p>
          <p>Cliente: {vehicule?.cliente}</p>
          <p>Precio: {vehicule?.price}</p>
          <p>Kilometros: {vehicule?.kilometros}</p>
          <p>Año: {vehicule?.año}</p>
          <p>Estado: {vehicule?.status}</p>
          <p>Fecha de creación: {vehicule?.createdAt}</p>
          <p>Fecha de actualización: {vehicule?.updatedAt}</p>
          <div className={style.buttonContainer}>
            <Link href={`/dashboard/vehiculos/${id}/edit`}>
              <button>Editar</button>
            </Link>
            <button
              onClick={() => {
                deleteVehicule(id);
                router.push("/dashboard/vehiculos");
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
