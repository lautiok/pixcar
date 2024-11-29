import Header from "@/components/Header/Header";
import syle from "./page.module.css";
import UserComponents from "@/components/UserComponents/UserComponents";
export default function User() {
  return (
    <main className={syle.main}>
      <Header />
      <UserComponents />
    </main>
  );
}
