import Layout from "../dashboard/layout";
import Header from "@/components/Header/Header";
import style from "./page.module.css";
import FormClient from "@/components/FormClientes/FormClients";

export default function AddUsers() {
  return (
    <Layout>
      <main className={style.main}>
        <Header />
        <FormClient />
      </main>
    </Layout>
  );
}
