import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./VanCard.module.css";

const VanCard = ({ van }) => {
  const equipmentIcons = {
    adults: "icon-users",
    transmission: "icon-automatic",
    engine: "icon-gas-pump",
    kitchen: "icon-kitchen",
    beds: "icon-bed",
    airConditioner: "icon-ac",
    toilet: "icon-wc",
    shower: "icon-shower",
  };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteVans = JSON.parse(localStorage.getItem("favoriteVans")) || [];
    setIsFavorite(favoriteVans.includes(van.id));
  }, [van.id]);

  const handleFavoriteToggle = () => {
    const favoriteVans = JSON.parse(localStorage.getItem("favoriteVans")) || [];
    if (isFavorite) {
      const updatedFavorites = favoriteVans.filter((id) => id !== van.id);
      localStorage.setItem("favoriteVans", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favoriteVans.push(van.id);
      localStorage.setItem("favoriteVans", JSON.stringify(favoriteVans));
      setIsFavorite(true);
    }
  };

  const renderEquipmentIcons = () => {
    const relevantData = van.details || van;

    const displayedFeatures = [
      { key: "adults", text: `${relevantData.adults || 0} adults` },
      { key: "transmission", text: relevantData.transmission },
      { key: "engine", text: relevantData.engine },
      { key: "kitchen", text: "Kitchen" },
      { key: "beds", text: `${relevantData.beds || 0} beds` },
      { key: "airConditioner", text: "AC" },
      { key: "toilet", text: "Toilet" },
      { key: "shower", text: "Shower" },
    ];

    return displayedFeatures
      .filter(
        (feature) =>
          relevantData[feature.key] ||
          (relevantData.details && relevantData.details[feature.key])
      )
      .map((feature, index) => {
        const iconKey = equipmentIcons[feature.key];
        if (!iconKey) return null;

        return (
          <div key={index} className={styles.equipmentIcon}>
            <svg className={styles.icon}>
              <use href={`/images/icons.svg#${iconKey}`}></use>
            </svg>
            {feature.text}
          </div>
        );
      });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const imgSrc =
    van.gallery && van.gallery.length > 0 && van.gallery[0].thumb
      ? van.gallery[0].thumb
      : "/placeholder.jpg";

  return (
    <div className={styles.vanCard}>
      <button onClick={handleFavoriteToggle} className={styles.favoriteButton}>
        <svg className={isFavorite ? styles.starFilled : styles.starOutline}>
          <use href={`/images/icons.svg#icon-star`}></use>
        </svg>
      </button>

      <div className={styles.imageWrapper}>
        <img src={imgSrc} alt={van.name} className={styles.vanImage} />
      </div>

      <div className={styles.vanInfo}>
        <div className={styles.nameAndPrice}>
          <h2 className={styles.vanName}>{van.name}</h2>
          {/* ВИПРАВЛЕНО: Змінюємо форматування ціни */}
          <p className={styles.vanPrice}>€{van.price.toFixed(2)}</p>{" "}
          {/* Використовуємо toFixed(2) для 2 знаків після коми без роздільників */}
        </div>

        <div className={styles.vanReview}>
          <span className={styles.starRating}>
            <svg className={styles.icon}>
              <use href={`/images/icons.svg#icon-star`}></use>
            </svg>
            <span className={styles.textRating}>
              {van.rating} ({van.reviews ? van.reviews.length : 0} Reviews)
            </span>
          </span>
          <span className={styles.vanLocation}>
            <svg className={styles.iconMap}>
              <use href="/images/icons.svg#icon-map"></use>
            </svg>
            {van.location}
          </span>
        </div>

        <div className={styles.vanEquipment}>{renderEquipmentIcons()}</div>
        <p className={styles.vanDescription}>
          {truncateText(van.description, 100)}
        </p>

        <Link to={`/catalog/${van.id}`} className={styles.showMoreButton}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default VanCard;
