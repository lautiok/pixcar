"use client";
import style from "./formvehicle.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useVehicule } from "@/context/VehiculeContext";
import { useEffect, useState } from "react";
import { useClient } from "@/context/ClientContext";

interface VehicleFormInputs {
  placa: string;
  color: string;
  modelo: string;
  cliente: string;
  marca: string;
  price: string;
  kilometros: string;
  año: string;
}

interface Client {
  id: string;
  name: string;
}

export default function FormVehicle() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VehicleFormInputs>();
  const {
    createVehicule,
    getVehicule,
    vehicule,
    updateVehicule,
    errors: vehiculeErrors,
  } = useVehicule();
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { clients, getClients } = useClient();
  const [client, setClient] = useState<Client | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    getClients();
  }, [getClients]);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      getVehicule(id);
    }
  }, [id, getVehicule]);

  useEffect(() => {
    if (vehicule) {
      console.log(vehicule);
      setValue("placa", vehicule.placa);
      setValue("color", vehicule.color);
      setValue("modelo", vehicule.modelo);
      setValue("cliente", vehicule.cliente);
      setValue("marca", vehicule.marca);
      setValue("price", vehicule.price);
      setValue("kilometros", vehicule.kilometros);
      setValue("año", vehicule.año);
    }
  }, []);

  const handleFormSubmit: SubmitHandler<VehicleFormInputs> = async (data) => {
    try {
      const vehicle = {
        ...data,
        cliente: client?.id || "",
        status: status,
      };

      if (isEditing && id) {
        await updateVehicule(id, vehicle);
      } else {
        await createVehicule(vehicle);
      }

      router.push("/dashboard/vehiculos");
    } catch (error) {
      console.log("Error al procesar el vehículo:", error);
    }
  };

  return (
    <section className={style.login}>
      <form className={style.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <input
          type="text"
          placeholder="Marca"
          {...register("marca", { required: "La marca es obligatoria" })}
        />
        {errors.marca && <p className={style.error}>{errors.marca.message}</p>}

        <input
          type="text"
          placeholder="Modelo"
          {...register("modelo", { required: "El modelo es obligatorio" })}
        />
        {errors.modelo && (
          <p className={style.error}>{errors.modelo.message}</p>
        )}

        <input
          type="text"
          placeholder="Patente"
          {...register("placa", { required: "La patente es obligatoria" })}
        />
        {errors.placa && <p className={style.error}>{errors.placa.message}</p>}

        <input
          type="text"
          placeholder="Color"
          {...register("color", { required: "El color es obligatorio" })}
        />
        {errors.color && <p className={style.error}>{errors.color.message}</p>}

        {!id && (
          <select
            onChange={(e) =>
              setClient(clients.find((c) => c.id === e.target.value) || null)
            }
          >
            <option value="">Seleccione un cliente</option>
            {clients.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.name}
              </option>
            ))}
          </select>
        )}

        {id && (
          <select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value="">Seleccione un estado</option>
            <option value="taller">Taller</option>
            <option value="venta">Venta</option>
            <option value="reservado">Reservado</option>
          </select>
        )}

        <input
          type="text"
          placeholder="Precio"
          {...register("price", {
            required: "El precio es obligatorio",
            pattern: {
              value: /^\d+$/,
              message: "Debe ser un número válido",
            },
          })}
        />
        {errors.price && <p className={style.error}>{errors.price.message}</p>}

        <input
          type="text"
          placeholder="Kilometros"
          {...register("kilometros", {
            required: "Los kilómetros son obligatorios",
            pattern: {
              value: /^\d+$/,
              message: "Debe ser un número válido",
            },
          })}
        />
        {errors.kilometros && (
          <p className={style.error}>{errors.kilometros.message}</p>
        )}

        <input
          type="text"
          placeholder="Año"
          {...register("año", {
            required: "El año es obligatorio",
            pattern: {
              value: /^\d{4}$/,
              message: "Debe ser un año válido (4 dígitos)",
            },
          })}
        />
        {errors.año && <p className={style.error}>{errors.año.message}</p>}

        {vehiculeErrors && <p className={style.error}>{vehiculeErrors}</p>}

        <button type="submit">
          {isEditing ? "Actualizar Vehículo" : "Crear Vehículo"}
        </button>
      </form>
    </section>
  );
}
