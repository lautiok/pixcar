"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AuthContextProps {
  user: void | null | {
    name: string;
    identification: string;
    email: string;
    role: string | null;
  };
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  errors: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState("");
  const router = useRouter();

  const login = async (data: { email: string; password: string }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/login`,
        data,
        { withCredentials: true }
      );
      setUser(res.data);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data?.message || "Error al iniciar sesión");
      } else {
        setErrors("Error desconocido al iniciar sesión");
      }
      console.error("Login failed", error);
      throw new Error("Error al iniciar sesión");
    }
  };

  const logout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API}/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
          {},
          { withCredentials: true }
        );
        setUser(res.data);

        if (res.status === 400) {
          await logout();
        }
      } catch (error) {
        console.log("User verification failed", error);
        setUser(null);
        router.push("/");
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, errors }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
