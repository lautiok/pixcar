import FormUsuarios from "@/components/FormUsuarios/FormUsuarios";
import Layout from "../dashboard/layout";
import Header from "@/components/Header/Header";
import style from "./page.module.css";

export default function AddUsers() {
  return (
    <Layout>
      <main className={style.main}>
        <Header />
        <FormUsuarios />
      </main>
    </Layout>
  );
}
