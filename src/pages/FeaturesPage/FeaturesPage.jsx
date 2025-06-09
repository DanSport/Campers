// src/pages/FeaturesPage/FeaturesPage.jsx
import { useOutletContext } from "react-router-dom";
import styles from "./FeaturesPage.module.css";

// Карта для відображення іконок та відповідних текстів для обладнання
const featureDisplayMap = {
  adults: { icon: "icon-users", label: (value) => `${value} adults` },
  transmission: { icon: "icon-automatic", label: "Automatic" },
  engine: {
    icon: "icon-gas-pump",
    label: (value) =>
      value ? value.charAt(0).toUpperCase() + value.slice(1) : "",
  }, // Capitalize first letter
  kitchen: { icon: "icon-kitchen", label: "Kitchen" },
  beds: { icon: "icon-bed", label: (value) => `${value} beds` },
  airConditioner: { icon: "icon-ac", label: "AC" },
  toilet: { icon: "icon-wc", label: "Toilet" },
  shower: { icon: "icon-shower", label: "Shower" },
  // Додайте інші функції, якщо вони є у ваших даних `van.details`
  // і ви хочете їх відобразити. Приклад:
  // tv: { icon: 'icon-tv', label: 'TV' },
  // gas: { icon: 'icon-gas-stove', label: 'Gas' },
  // microwave: { icon: 'icon-lucide-microwave', label: 'Microwave' },
  // refrigerator: { icon: 'icon-solar-fridge', label: 'Refrigerator' },
};

export default function FeaturesPage() {
  // Отримуємо дані про кемпер з контексту Outlet
  const { van } = useOutletContext() ?? {};

  // Якщо даних немає, виводимо повідомлення
  if (!van) {
    return <p>No features or details available for this camper.</p>;
  }

  // Функція для рендерингу іконок обладнання
  const renderEquipmentFeatures = () => {
    const vanDetails = van.details || {}; // Використовуємо van.details, або порожній об'єкт

    // Фільтруємо та відображаємо тільки ті функції, які є в даних про кемпер
    return Object.keys(featureDisplayMap)
      .filter((key) => {
        // Перевіряємо, чи існує ключ у van.details або безпосередньо у van,
        // і чи його значення є true, або числом > 0, або не порожнім рядком.
        const value =
          vanDetails[key] !== undefined ? vanDetails[key] : van[key];
        return (
          (typeof value === "boolean" && value) ||
          (typeof value === "number" && value > 0) ||
          (typeof value === "string" && value.length > 0)
        );
      })
      .map((key) => {
        const { icon, label } = featureDisplayMap[key];
        const featureValue =
          vanDetails[key] !== undefined ? vanDetails[key] : van[key];

        // Форматуємо текст для відображення
        const displayText =
          typeof label === "function" ? label(featureValue) : label;

        return (
          <div key={key} className={styles.featureItem}>
            <svg className={styles.icon}>
              <use href={`/images/icons.svg#${icon}`}></use>
            </svg>
            <span>{displayText}</span>
          </div>
        );
      });
  };

  return (
    <div className={styles.featuresContainer}>
      {/* Секція обладнання */}
      <div className={styles.equipment}>{renderEquipmentFeatures()}</div>

      {/* Секція деталей автомобіля */}
      <div className={styles.details}>
        <h3>Vehicle details</h3>
        <div className={styles.detailList}>
          <div className={styles.detailRow}>
            <p>Form:</p>
            <p>{van.form || "N/A"}</p>
          </div>
          <div className={styles.detailRow}>
            <p>Length:</p>
            <p>{van.length ? `${van.length} m` : "N/A"}</p>
          </div>
          <div className={styles.detailRow}>
            <p>Width:</p>
            <p>{van.width ? `${van.width} m` : "N/A"}</p>
          </div>
          <div className={styles.detailRow}>
            <p>Height:</p>
            <p>{van.height ? `${van.height} m` : "N/A"}</p>
          </div>
          <div className={styles.detailRow}>
            <p>Tank:</p>
            <p>{van.tank ? `${van.tank} l` : "N/A"}</p>
          </div>
          <div className={styles.detailRow}>
            <p>Consumption:</p>
            <p>{van.consumption ? `${van.consumption} l/100km` : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
