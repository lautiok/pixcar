import SideBar from "@/components/SideBar/SideBar";
import styles from "./layout.module.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <SideBar />
      {children}
    </main>
  );
}
