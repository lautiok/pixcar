"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface Vehicule {
  _id?: string;
  marca: string;
  modelo: string;
  placa: string;
  color: string;
  cliente: string;
  año: string;
  kilometros: string;
  price: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface VehiculeContextProps {
  vehicules: Vehicule[];
  getVehicules: () => Promise<void>;
  createVehicule: (data: Vehicule) => Promise<void>;
  errors: string;
  vehicule: Vehicule | null;
  getVehicule: (id: string) => Promise<void>;
  deleteVehicule: (id: string) => Promise<void>;
  updateVehicule: (id: string, data: Vehicule) => Promise<void>;
}

const VehiculeContext = createContext<VehiculeContextProps | undefined>(
  undefined
);

export const VehiculeProvider = ({ children }: { children: ReactNode }) => {
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const [vehicule, setVehicule] = useState<Vehicule | null>(null);
  const [errors, setErrors] = useState("");

  const createVehicule = async (data: Vehicule) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/vehicles`,
        data,
        {
          withCredentials: true,
        }
      );
      setVehicules([...vehicules, res.data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data?.message || "Error al crear vehiculo");
      } else {
        setErrors("Error desconocido al crear vehiculo");
      }
      console.error("Create vehicule failed", error);
      throw new Error("Error al crear vehiculo");
    }
  };

  const getVehicules = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/vehicles`, {
        withCredentials: true,
      });
      setVehicules(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(
          error.response?.data?.message || "Error al obtener vehiculos"
        );
      } else {
        setErrors("Error desconocido al obtener vehiculos");
      }
      console.error("Get vehicules failed", error);
      throw new Error("Error al obtener vehiculos");
    }
  };

  const getVehicule = async (id: string) => {
    try {
      const res = await axios.get<Vehicule>(
        `${process.env.NEXT_PUBLIC_API}/vehicles/${id}`,
        {
          withCredentials: true,
        }
      );
      setVehicule(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data?.message || "Error al obtener vehiculo");
      } else {
        setErrors("Error desconocido al obtener vehiculo");
      }
      console.error("Get vehicule failed", error);
      throw new Error("Error al obtener vehiculo");
    }
  };

  const deleteVehicule = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/vehicles/${id}`, {
        withCredentials: true,
      });
      setVehicules(vehicules.filter((vehicule) => vehicule._id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(
          error.response?.data?.message || "Error al eliminar vehiculo"
        );
      } else {
        setErrors("Error desconocido al eliminar vehiculo");
      }
      console.error("Delete vehicule failed", error);
      throw new Error("Error al eliminar vehiculo");
    }
  };

  const updateVehicule = async (id: string, data: Vehicule) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/vehicles/${id}`, data, {
        withCredentials: true,
      });
      setVehicules(
        vehicules.map((vehicule) =>
          vehicule._id === id ? { ...vehicule, ...data } : vehicule
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(
          error.response?.data?.message || "Error al actualizar vehiculo"
        );
      } else {
        setErrors("Error desconocido al actualizar vehiculo");
      }
      console.error("Update vehicule failed", error);
      throw new Error("Error al actualizar vehiculo");
    }
  };

  return (
    <VehiculeContext.Provider
      value={{
        vehicules,
        errors,
        vehicule,
        getVehicule,
        deleteVehicule,
        updateVehicule,
        createVehicule,
        getVehicules,
      }}
    >
      {children}
    </VehiculeContext.Provider>
  );
};

export const useVehicule = () => {
  const context = useContext(VehiculeContext);
  if (!context)
    throw new Error("useVehicule must be used within an VehiculeProvider");
  return context;
};
