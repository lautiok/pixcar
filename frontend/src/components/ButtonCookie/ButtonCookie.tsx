"use client";
import { useRouter } from "next/navigation";
import style from "./buttoncookie.module.css";
export default function ButtonCookie() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };
  return (
    <button className={style.button} onClick={handleLogout}>
      cerrar sesión
    </button>
  );
}
