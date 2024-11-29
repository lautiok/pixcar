import Header from "@/components/Header/Header";
import UsersComponents from "@/components/UsersComponents/UsersComponents";

export default function Home() {
  return (
    <main style={{ width: "100%" }}>
      <Header />
      <UsersComponents />
    </main>
  );
}
