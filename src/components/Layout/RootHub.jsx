import { Outlet } from "react-router-dom";
import HeaderBar from "../HeaderBar/HeaderBar";
import FooterBlock from "../FooterBlock/FooterBlock";
import styles from "./RootHub.module.css";

export default function RootHub() {
  return (
    <div className={styles.wrapper}>
      <HeaderBar />
      <main className={`container ${styles.main}`}>
        <Outlet />
      </main>
      <FooterBlock />
    </div>
  );
}
