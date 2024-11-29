"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Client {
  name: string;
  email: string;
  identification: string;
  vehicles?: string[];
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

interface ClientContextProps {
  clients: Client[];
  getClients: () => Promise<void>;
  createClient: (data: Client) => Promise<void>;
  errors: string;
  client: Client | null;
  getClient: (id: string) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  updateClient: (id: string, data: Client) => Promise<void>;
}

const ClientContext = createContext<ClientContextProps | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const [errors, setErrors] = useState("");
  const router = useRouter();

  const createClient = async (data: Client) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/clients`,
        data,
        {
          withCredentials: true,
        }
      );
      setClients([...clients, res.data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data?.message || "Error al crear cliente");
      } else {
        setErrors("Error desconocido al crear cliente");
      }
      console.error("Create client failed", error);
      throw new Error("Error al crear cliente");
    }
  };

  const getClients = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/clients`, {
        withCredentials: true,
      });
      setClients(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data?.message || "Error al obtener clientes");
      } else {
        setErrors("Error desconocido al obtener clientes");
      }
      console.error("Get clients failed", error);
      throw new Error("Error al obtener clientes");
    }
  };

  const getClient = async (id: string) => {
    try {
      const res = await axios.get<Client>(
        `${process.env.NEXT_PUBLIC_API}/clients/${id}`,
        {
          withCredentials: true,
        }
      );
      setClient(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data?.message || "Error al obtener cliente");
      } else {
        setErrors("Error desconocido al obtener cliente");
      }
      console.error("Get client failed", error);
      throw new Error("Error al obtener cliente");
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/clients/${id}`, {
        withCredentials: true,
      });
      setClients(clients.filter((client) => client.id !== id));
      router.push("/dashboard/clientes");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data?.message || "Error al eliminar cliente");
      } else {
        setErrors("Error desconocido al eliminar cliente");
      }
      console.error("Delete client failed", error);
      throw new Error("Error al eliminar cliente");
    }
  };

  const updateClient = async (id: string, data: Client) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/clients/${id}`, data, {
        withCredentials: true,
      });
      setClients(
        clients.map((client) =>
          client.id === id ? { ...client, ...data } : client
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(
          error.response?.data?.message || "Error al actualizar cliente"
        );
      } else {
        setErrors("Error desconocido al actualizar cliente");
      }
      console.error("Update client failed", error);
      throw new Error("Error al actualizar cliente");
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        getClients,
        createClient,
        errors,
        client,
        getClient,
        deleteClient,
        updateClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context)
    throw new Error("useClient must be used within an ClientProvider");
  return context;
};
