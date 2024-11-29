import Header from "@/components/Header/Header";
import style from "./page.module.css";
import ClientsComponent from "@/components/ClientsComponents/ClientsComponents";
export default function Clientes() {
  return (
      <main className={style.main}>
        <Header />
        <ClientsComponent />
      </main>
  );
}
