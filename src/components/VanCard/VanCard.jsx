import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./VanCard.module.css";

const VanCard = ({ van }) => {
  
  const equipmentIcons = {
    adults: "icon-users",
    transmission: "icon-automatic",
    beds: "icon-bed",

    
    AC: "icon-ac",
    Kitchen: "icon-kitchen",
    Bathroom: "icon-bathroom",
    TV: "icon-tv",
    Radio: "icon-radio",
    Refrigerator: "icon-solar_fridge-outline",
    Microwave: "icon-microwave",
    Gas: "icon-gas",
    Water: "icon-water",
  };

 
  const optionDisplayNames = {
    AC: "AC",
    Kitchen: "Kitchen",
    Bathroom: "Bathroom",
    TV: "TV",
    Radio: "Radio",
    Refrigerator: "Refrigerator",
    Microwave: "Microwave",
    Gas: "Gas",
    Water: "Water",
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
    const featuresToRender = [];

    
    if (relevantData.adults) {
      featuresToRender.push({
        key: "adults",
        text: `${relevantData.adults} adults`,
        icon: equipmentIcons.adults,
      });
    }
    if (relevantData.beds) {
      featuresToRender.push({
        key: "beds",
        text: `${relevantData.beds} beds`,
        icon: equipmentIcons.beds,
      });
    }

    
    if (relevantData.transmission) {
      featuresToRender.push({
        key: "transmission",
        text: relevantData.transmission, 
        icon: equipmentIcons.transmission,
      });
    }

    
    const booleanOptionKeys = Object.keys(optionDisplayNames);

    booleanOptionKeys.forEach((key) => {
      
      if (relevantData[key] === true) {
        featuresToRender.push({
          key: key,
          text: optionDisplayNames[key] || key, 
          icon: equipmentIcons[key],
        });
      }
    });

    
    return featuresToRender.map((feature) => {
      if (!feature.icon) return null;

      return (
        <div key={feature.key} className={styles.equipmentIcon}>
          <svg className={styles.icon}>
            <use href={`/images/icons.svg#${feature.icon}`}></use>
          </svg>
          <span>{feature.text}</span>
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
          <use href={`/images/icons.svg#icon-heart`}></use>
        </svg>
      </button>

      <div className={styles.imageWrapper}>
        <img src={imgSrc} alt={van.name} className={styles.vanImage} />
      </div>

      <div className={styles.vanInfo}>
        <div className={styles.nameAndPrice}>
          <h2 className={styles.vanName}>{van.name}</h2>
          <p className={styles.vanPrice}>€{van.price.toFixed(2)}</p>
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
