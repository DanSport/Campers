// src/components/HeaderBar/HeaderBar.jsx
import { NavLink } from "react-router-dom";
import styles from "./HeaderBar.module.css";

const HeaderBar = () => {
  return (
    <header className={styles.appHeader}>
      {}
      <div className={styles.headerContentWrapper}>
        {" "}
        {}
        {}
        <NavLink to="/" className={styles.brandLogo}>
          Travel<span>Trucks</span>
        </NavLink>
        {}
        <nav className={styles.mainNav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ""}`
            }
          >
            Catalog
          </NavLink>
        </nav>
        {}
        <div className={styles.rightSection}></div>
      </div>{" "}
      {}
    </header>
  );
};

export default HeaderBar;
