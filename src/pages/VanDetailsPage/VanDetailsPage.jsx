// src/pages/VanDetailsPage/VanDetailsPage.jsx
import { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVanDetails } from "../../store/vanSlice";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import { toast } from "react-hot-toast";
import styles from "./VanDetailsPage.module.css"; // Імпортуємо стилі

export default function VanDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // Отримуємо дані про поточний фургон з Redux
  const { currentVan, status, error } = useSelector((state) => state.vans); // Змінено 's' на 'state' для читабельності

  useEffect(() => {
    // Завантажуємо деталі фургона при монтуванні компонента або зміні id
    dispatch(fetchVanDetails(id));
  }, [dispatch, id]);

  // Відображення станів завантаження та помилок
  if (status === "loading")
    return <div className={styles.statusMessage}>Loading details...</div>;
  if (status === "failed")
    return <div className={styles.statusMessageError}>Error: {error}</div>;
  if (!currentVan)
    return <div className={styles.statusMessage}>Van details not found.</div>;

  // Отримуємо URL першого зображення для мініатюри або плейсхолдер
  const mainImageUrl =
    currentVan.gallery && currentVan.gallery.length > 0
      ? currentVan.gallery[0].original // Або .thumb, залежно від бажаного розміру
      : "/placeholder-large.jpg"; // Замініть на реальний плейсхолдер, якщо є

  return (
    <div className={styles.detailsContainer}>
      {/* Назва фургона */}
      <h1 className={styles.vanName}>{currentVan.name}</h1>

      {/* Рейтинг, локація та ціна */}
      <div className={styles.infoRow}>
        <div className={styles.ratingLocationGroup}>
          <span className={styles.ratingText}>
            <svg className={styles.starIcon}>
              <use href={`/images/icons.svg#icon-star`}></use>
            </svg>
            {currentVan.rating} (
            {currentVan.reviews ? currentVan.reviews.length : 0} Reviews)
          </span>
          <span className={styles.locationText}>
            <svg className={styles.locationIcon}>
              <use href="/images/icons.svg#icon-map"></use>
            </svg>
            {currentVan.location}
          </span>
        </div>
        {/* Ціна без toLocaleString(), тільки два знаки після коми */}
        <div className={styles.vanPrice}>€{currentVan.price.toFixed(2)}</div>
      </div>

      {/* Галерея зображень */}
      <div className={styles.galleryGrid}>
        {currentVan.gallery && currentVan.gallery.length > 0 ? (
          currentVan.gallery.map((img, index) => (
            <img
              key={index}
              src={img.thumb || img.original}
              alt={`${currentVan.name} image ${index + 1}`}
              className={styles.galleryImage}
            />
          ))
        ) : (
          <img
            src="/placeholder.jpg"
            alt="No image available"
            className={styles.galleryImagePlaceholder}
          />
        )}
      </div>

      {/* Опис фургона */}
      <p className={styles.vanDescription}>{currentVan.description}</p>

      {/* Навігаційні вкладки (Features, Reviews) */}
      <div className={styles.tabNavigation}>
        <NavLink
          to="features"
          end // Важливо, щоб "features" була активною тільки коли шлях закінчується на /features
          className={({ isActive }) =>
            isActive ? styles.tabLinkActive : styles.tabLink
          }
        >
          Features
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            isActive ? styles.tabLinkActive : styles.tabLink
          }
        >
          Reviews
        </NavLink>
      </div>

      {/* Основний контент (FeaturesPage або ReviewsPage) та форма бронювання */}
      <div className={styles.contentAndBookingLayout}>
        <div className={styles.outletContent}>
          {/* Outlet передає currentVan до вкладених компонентів (FeaturesPage, ReviewsPage) */}
          <Outlet context={{ van: currentVan }} />
        </div>
        <div className={styles.bookingFormSection}>
          <ReservationForm
            vanName={currentVan.name}
            onSuccess={() => toast.success("Booking request sent! 🎉")}
          />
        </div>
      </div>
    </div>
  );
}
