import { useState } from "react";
import styles from "./ReservationForm.module.css";

export default function ReservationForm({ vanName, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", date: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      onSuccess?.();
      setForm({ name: "", email: "", date: "" });
    }, 500);
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <h4 className={styles.title}>Book “{vanName}”</h4>

      <input
        required
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        required
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <button type="submit">Reserve now</button>
    </form>
  );
}
