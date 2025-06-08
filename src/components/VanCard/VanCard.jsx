import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cls from "./VanCard.module.css";

/**
 * Карточка одного кемпера‑фургона
 * @param {Object} props
 * @param {Object} props.van – об’єкт з API (id, name, price, gallery, location)
 */
export default function VanCard({ van }) {
  const [isFav, setIsFav] = useState(false);

  // завантажуємо стан «обраного» з localStorage
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("favVans")) || [];
    setIsFav(list.includes(van.id));
  }, [van.id]);

  const toggleFav = (e) => {
    e.stopPropagation();
    const list = JSON.parse(localStorage.getItem("favVans")) || [];
    const updated = isFav
      ? list.filter((id) => id !== van.id)
      : [...list, van.id];
    localStorage.setItem("favVans", JSON.stringify(updated));
    setIsFav(!isFav);
  };

  const imgSrc =
    Array.isArray(van?.gallery) && van.gallery.length
      ? van.gallery[0]
      : "/images/placeholder.jpg";

  const priceUA = Number(van.price).toLocaleString("uk-UA", {
    minimumFractionDigits: 2,
  });

  return (
    <article className={cls.card}>
      <img src={imgSrc} alt={van.name} className={cls.thumb} />

      <button
        aria-label="Add to favourites"
        className={cls.favBtn}
        onClick={toggleFav}
      >
        {isFav ? "★" : "☆"}
      </button>

      <div className={cls.body}>
        <h3 className={cls.title}>{van.name}</h3>
        <p className={cls.location}>{van.location}</p>
        <p className={cls.price}>{priceUA} ₴ / day</p>

        <Link
          to={`/catalog/${van.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cls.more}
        >
          Show more →
        </Link>
      </div>
    </article>
  );
}
