// src/components/ReservationForm/ReservationForm.jsx
import { useState } from "react";
import styles from "./ReservationForm.module.css";

export default function ReservationForm({ vanName, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setTimeout(() => {
      onSuccess?.();
      setForm({ name: "", email: "", date: "", comment: "" });
    }, 500);
  };

  return (

    <>
      {" "}
      {}
      <h3 className={styles.mainTitle}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={styles.form} onSubmit={submit}>
        {" "}
        {}
        <input
          required
          name="name"
          placeholder="Name*"
          value={form.name}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email*"
          value={form.email}
          onChange={handleChange}
          className={styles.inputField}
        />
        <input
          required
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className={styles.dateInput}
        />
        <textarea
          name="comment"
          placeholder="Comment"
          value={form.comment}
          onChange={handleChange}
          className={styles.textarea}
        />
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </>
  );
}
