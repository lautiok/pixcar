"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id?: string;
  name: string;
  identification: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserContextProps {
  users: User[];
  getUsers: () => Promise<void>;
  createUser: (data: User) => Promise<void>;
  errors: string;
  user: User | null;
  getUser: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUser: (id: string, data: User) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [errors, setErrors] = useState("");
  const router = useRouter();

  const createUser = async (data: User) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/users`,
        data,
        {
          withCredentials: true,
        }
      );
      setUsers([...users, res.data]);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data?.message || "Error al crear usuario");
      } else {
        setErrors("Error desconocido al crear usuario");
      }
      console.error("Create user failed", error);
      throw new Error("Error al crear usuario");
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get<User[]>(
        `${process.env.NEXT_PUBLIC_API}/users`,
        {
          withCredentials: true,
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.log("Error al obtener usuarios", error);
    }
  };

  const getUser = async (id: string) => {
    try {
      const res = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_API}/users/${id}`,
        {
          withCredentials: true,
        }
      );
      setUser(res.data);
    } catch (error) {
      console.log("Error al obtener usuario", error);
    }
  };

  const updateUser = async (id: string, data: User) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/users/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      setUsers(users.map((user) => (user.id === id ? res.data : user)));
      router.push("/");
    } catch (error) {
      console.log("Error al actualizar usuario", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/users/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user.id !== id));
      router.push("/");
    } catch (error) {
      console.log("Error al eliminar usuario", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        createUser,
        errors,
        user,
        getUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within an UserProvider");
  return context;
};
