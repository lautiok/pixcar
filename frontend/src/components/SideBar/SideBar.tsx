"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import style from "./sidebar.module.css";
import ButtonCookie from "../ButtonCookie/ButtonCookie";

export default function SideBar() {
  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
        <h1>
          PIX<span>CAR</span>
        </h1>
      </div>
      <ul>
        <li>
          <Link href="/">Inicio</Link>
        </li>

        <li>
          <Link href="/dashboard/vehiculos">Vehiculos</Link>
        </li>

        <li>
          <Link href="/dashboard/clientes">Clientes</Link>
        </li>

        <li>
          <Link href="/dashboard/ventas">Ventas</Link>
        </li>

        <li>
          <Link href="/dashboard/taller">Taller</Link>
        </li>
      </ul>
      <div className={style.footer}>
        <ButtonCookie />
      </div>
    </div>
  );
}
