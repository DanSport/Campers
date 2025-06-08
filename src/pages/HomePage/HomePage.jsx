import css from "./HomePage.module.css";
export default function HomePage() {
  return (
    <section className={css.hero}>
      <h1>Welcome to Road Riders 🚐</h1>
      <p>Pick a camper-van and start your trip today.</p>
    </section>
  );
}
