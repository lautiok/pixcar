"use client";
import { useEffect, useState } from "react";
import style from "./vehiclescomponents.module.css";
import Link from "next/link";
import { Search } from "lucide-react";
import { useVehicule } from "@/context/VehiculeContext";
import { useAuth } from "@/context/AuthContext";

interface Vehicule {
  _id?: string;
  marca: string;
  modelo: string;
  placa: string;
  color: string;
  año: string;
  price: string;
  kilometros: string;
  status?: string;
}

export default function VehiclesComponents() {
  const { vehicules, getVehicules } = useVehicule();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const [filteredUsers, setFilteredUsers] = useState<Vehicule[]>([]);

  useEffect(() => {
    getVehicules();
  }, []);

  useEffect(() => {
    if (vehicules) {
      const filtered = vehicules.filter(
        (vehicule: Vehicule) =>
          vehicule.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicule.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicule.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicule.año.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicule.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicule.kilometros
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          vehicule.color.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, vehicules]);

  return (
    <section className={style.users}>
      <div>
        <Link className={style.link} href="/dashboard/addvehicle">
          {" "}
          Crear vehiculos
        </Link>
        <search>
          <Search size="20" />
          <input
            type="text"
            placeholder="Buscar vehiculos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </search>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Año</th>
            <th>Kilometros</th>
            <th>Precio</th>
            {user?.role === "admin" && <th>Estado</th>}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((vehicule: Vehicule, index: number) => (
            <tr key={index}>
              <td>
                <Link href={`/dashboard/vehiculos/${vehicule._id}`}>
                  {vehicule.marca}
                </Link>
              </td>
              <td>
                <Link href={`/dashboard/vehiculos/${vehicule._id}`}>
                  {vehicule.modelo}
                </Link>
              </td>
              <td>
                <Link href={`/dashboard/vehiculos/${vehicule._id}`}>
                  {vehicule.color}
                </Link>
              </td>
              <td>
                <Link href={`/dashboard/vehiculos/${vehicule._id}`}>
                  {vehicule.año}
                </Link>
              </td>
              <td>
                <Link href={`/dashboard/vehiculos/${vehicule._id}`}>
                  {vehicule.kilometros} km
                </Link>
              </td>
              <td>
                <Link href={`/dashboard/vehiculos/${vehicule._id}`}>
                  {vehicule.price} usd
                </Link>
              </td>
              {user?.role === "admin" && (
                <td>
                  <Link href={`/dashboard/vehiculos/${vehicule._id}`}>
                    {vehicule.status}
                  </Link>
                </td>
              )}
            </tr>
          ))}

          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={3}>No hay vehiculos</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
