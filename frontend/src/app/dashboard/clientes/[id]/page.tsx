import Layout from "@/app/dashboard/layout";
import Header from "@/components/Header/Header";
import syle from "./page.module.css";
import ClientComponents from "@/components/clientComponents/ClientComponents";
export default function User() {
  return (
    <Layout>
      <main className={syle.main}>
        <Header />
        <ClientComponents />
      </main>
    </Layout>
  );
}
