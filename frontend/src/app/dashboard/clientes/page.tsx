import Header from "@/components/Header/Header";
import Layout from "../dashboard/layout";
import style from "./page.module.css";
import ClientsComponent from "@/components/ClientsComponents/ClientsComponents";
export default function Clientes() {
  return (
    <Layout>
      <main className={style.main}>
        <Header />
        <ClientsComponent />
      </main>
    </Layout>
  );
}
