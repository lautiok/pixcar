"use client";
import { useEffect, useRef, useState } from "react";
import style from "./header.module.css";
import { User } from "lucide-react";
import ButtonCookie from "../ButtonCookie/ButtonCookie";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const pageName = url.split("/").pop();

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={style.headerDash}>
      <h2>{pageName ? pageName : "Dashboard"}</h2>
      <section className={style.sectionButtons}>
        <div className={style.menu} onClick={handleToggleMenu} ref={menuRef}>
          <User size="30" />
          {isMenuOpen && (
            <div className={style.dropdownMenu}>
              <p className={style.userName}>{user?.name}</p>
              <ButtonCookie />
            </div>
          )}
        </div>
      </section>
    </header>
  );
}
