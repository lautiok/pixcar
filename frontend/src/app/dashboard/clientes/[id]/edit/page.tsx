import Layout from "@/app/dashboard/layout";
import FormClient from "@/components/FormClientes/FormClients";
import Header from "@/components/Header/Header";

export default function EditUser() {
  return (
    <Layout>
      <main style={{ width: "100%" }}>
        <Header />
        <FormClient />
      </main>
    </Layout>
  );
}
