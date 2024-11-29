import Header from "@/components/Header/Header";
import style from "./page.module.css";
import FormClient from "@/components/FormClientes/FormClients";

export default function AddUsers() {
  return (
      <main className={style.main}>
        <Header />
        <FormClient />
      </main>
  );
}
