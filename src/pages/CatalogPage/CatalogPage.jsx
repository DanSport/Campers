// src/pages/CatalogPage/CatalogPage.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVans, loadMore } from "../../store/vanSlice";
import VanCard from "../../components/VanCard/VanCard";
import SidebarFilters from "../../components/SidebarFilters/SidebarFilters";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();

  const {
    vans: vansArray = [],
    status,
    error,
    page,
  } = useSelector((state) => state.vans);

  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    dispatch(fetchVans({ page: 1, filters: {} }));
  }, [dispatch]);

  const handleFilter = (filterData) => {
    setCurrentFilters(filterData);
    dispatch(fetchVans({ page: 1, filters: filterData }));
  };

  const handleLoadMore = () => {
    dispatch(loadMore());
    dispatch(fetchVans({ page: page + 1, filters: currentFilters }));
  };

  return (
    <div className={styles.catalogPageWrapper}>
      {" "}
      {/* Новий клас для кореневої обгортки */}
      <div className={styles.catalogPageContent}>
        {" "}
        {/* Клас для обмеження ширини та розміщення вмісту */}
        {/* Ліва колонка — фільтри */}
        <aside className={styles.filtersSection}>
          {" "}
          {/* Використовуємо aside і новий клас */}
          <SidebarFilters onFilter={handleFilter} />
        </aside>
        {/* Права колонка — список карток і Load More */}
        <div className={styles.camperContainer}>
          {/* сітка карток */}
          <div className={styles.camperList}>
            {status === "loading" && <p>Loading vans...</p>}

            {status === "failed" && (
              <p className={styles.error}>Error: {error}</p>
            )}

            {status === "succeeded" && vansArray.length === 0 && (
              <p className={styles.noResults}>
                No vans found for the selected filters.
              </p>
            )}

            {status === "succeeded" &&
              vansArray.length > 0 &&
              vansArray.map((van) => <VanCard key={van.id} van={van} />)}
          </div>

          {/* кнопка підвантаження наступної сторінки */}
          {status === "succeeded" && vansArray.length > 0 && (
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
