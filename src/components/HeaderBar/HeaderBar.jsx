import { NavLink } from "react-router-dom";
import styles from "./HeaderBar.module.css";

const HeaderBar = () => {
  return (
    <header className={styles.appHeader}>
      {" "}
      {/* Переконайтеся, що клас саме appHeader */}
      {/* Блок для логотипу */}
      <NavLink to="/" className={styles.brandLogo}>
        {" "}
        {/* Клас brandLogo */}
        Travel<span>Trucks</span>
      </NavLink>
      {/* Блок для навігації */}
      <nav className={styles.mainNav}>
        {" "}
        {/* Клас mainNav */}
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
      {/* Порожній div для правої секції, щоб flexbox працював правильно */}
      <div className={styles.rightSection}></div>
    </header>
  );
};

export default HeaderBar;
