import Header from "@/components/Header/Header";
import syle from "./page.module.css";
import ClientComponents from "@/components/clientComponents/ClientComponents";
export default function User() {
  return (
      <main className={syle.main}>
        <Header />
        <ClientComponents />
      </main>
  );
}
