"use client";
import { useEffect, useState } from "react";
import style from "./clients.module.css";
import { useClient } from "@/context/ClientContext";
import Link from "next/link";
import { Search } from "lucide-react";

interface Client {
  name: string;
  id?: string;
  email: string;
  identification: string;
}

export default function ClientsComponent() {
  const { clients, getClients } = useClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<Client[]>([]);

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (clients) {
      const filtered = clients.filter(
        (client: Client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.identification.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, clients]);

  return (
    <section className={style.users}>
      <div>
        <Link className={style.link} href="/addclients">
          {" "}
          Crear Cliente
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
            <th>identificacion</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((client: Client, index: number) => (
            <tr key={index}>
              <td>
                <Link href={`/clientes/${client.id}`}>{client.name}</Link>
              </td>
              <td>
                <Link href={`/clientes/${client.id}`}>{client.email}</Link>
              </td>
              <td>
                <Link href={`/clientes/${client.id}`}>
                  {client.identification}
                </Link>
              </td>
            </tr>
          ))}

          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={3}>No hay clientes</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
