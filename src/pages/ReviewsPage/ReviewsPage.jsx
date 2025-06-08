import { useOutletContext } from "react-router-dom";
import styles from "./ReviewsPage.module.css";

const Star = ({ filled }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill={filled ? "#facc15" : "none"}
    stroke="#facc15"
  >
    <polygon points="10,1 12.9,7.1 19.5,7.6 14,12.1 15.8,18.7 10,15 4.2,18.7 6,12.1 0.5,7.6 7.1,7.1" />
  </svg>
);

export default function ReviewsPage() {
  const { van } = useOutletContext(); 
  if (!van?.reviews?.length) return <p>No reviews yet</p>;

  return (
    <section className={styles.list}>
      {van.reviews.map(({ reviewer, rating, comment }, i) => (
        <article key={i} className={styles.card}>
          <header>
            <strong>{reviewer}</strong>
            <div className={styles.stars}>
              {Array.from({ length: 5 }, (_, idx) => (
                <Star key={idx} filled={idx < rating} />
              ))}
            </div>
          </header>
          <p>{comment}</p>
        </article>
      ))}
    </section>
  );
}
