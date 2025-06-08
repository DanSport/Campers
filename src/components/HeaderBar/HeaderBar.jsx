
import { NavLink } from "react-router-dom";
import s from "./HeaderBar.module.css";

export default function HeaderBar() {
  return (
    <header className={s.header}>
      <nav className={`${s.nav} container`}>
        <NavLink
          to="/"
          className={({ isActive }) => `${s.link} ${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => `${s.link} ${isActive ? "active" : ""}`}
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
