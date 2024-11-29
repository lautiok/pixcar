import FormUsuarios from "@/components/FormUsuarios/FormUsuarios";
import Header from "@/components/Header/Header";
import style from "./page.module.css";

export default function AddUsers() {
  return (
    <main className={style.main}>
      <Header />
      <FormUsuarios />
    </main>
  );
}
