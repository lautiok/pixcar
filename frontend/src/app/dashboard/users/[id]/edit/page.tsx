import Layout from "@/app/dashboard/layout";
import FormUsuarios from "@/components/FormUsuarios/FormUsuarios";
import Header from "@/components/Header/Header";

export default function EditUser() {
  return (
    <Layout>
      <main style={{ width: "100%" }}>
        <Header />
        <FormUsuarios />
      </main>
    </Layout>
  );
}
