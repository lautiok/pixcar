"use client";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import style from "./userscomponents.module.css";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface User {
  name: string;
  id?: string;
  email: string;
  role: string;
}

export default function UsersComponents() {
  const { users, getUsers } = useUser();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users) {
      const filtered = users.filter(
        (user: User) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  if (user?.role !== "admin") {
    return null;
  }

  return (
    <section className={style.users}>
      <div>
        <Link className={style.link} href="/addusers">
          {" "}
          Crear usuario
        </Link>
        <search>
          <Search size="20" />
          <input
            type="text"
            placeholder="Buscar usuario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </search>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: User, index: number) => (
            <tr key={index}>
              <td>
                <Link href={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                <Link href={`/users/${user.id}`}>{user.email}</Link>
              </td>
              <td>
                <Link href={`/users/${user.id}`}>{user.role}</Link>
              </td>
            </tr>
          ))}

          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={3}>No hay usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
