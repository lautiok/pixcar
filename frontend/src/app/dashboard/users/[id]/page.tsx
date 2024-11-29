import Layout from "@/app/dashboard/layout";
import Header from "@/components/Header/Header";
import syle from "./page.module.css";
import UserComponents from "@/components/UserComponents/UserComponents";
export default function User() {
  return (
    <Layout>
      <main className={syle.main}>
        <Header />
        <UserComponents />
      </main>
    </Layout>
  );
}
