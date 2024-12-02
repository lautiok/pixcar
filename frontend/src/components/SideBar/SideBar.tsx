"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import style from "./sidebar.module.css";
import ButtonCookie from "../ButtonCookie/ButtonCookie";

export default function SideBar() {
  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
        <a href="/dashboard/">
          PIX<span>CAR</span>
        </a>
      </div>
      <ul>
        <li>
          <Link href="/dashboard/">Inicio</Link>
        </li>
        <li>
          <Link href="/dashboard/clientes">Clientes</Link>
        </li>

        <li>
          <Link href="/dashboard/vehiculos">Vehiculos</Link>
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
