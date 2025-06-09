// HomePage.jsx
import { NavLink } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.background} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <NavLink to="/catalog" className={styles.cta}>
          View Now
        </NavLink>
      </div>
    </section>
  );
}
