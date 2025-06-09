// src/components/Layout/RootHub.jsx
import { Outlet, useLocation } from "react-router-dom";
import HeaderBar from "../HeaderBar/HeaderBar";
import HomePage from "../../pages/HomePage/HomePage";
import styles from "./RootHub.module.css";

export default function RootHub() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={styles.wrapper}>
      <HeaderBar />

      {isHome ? (
        <HomePage />
      ) : (
        <main className={`container ${styles.main}`}>
          <Outlet />
        </main>
      )}
    </div>
  );
}
