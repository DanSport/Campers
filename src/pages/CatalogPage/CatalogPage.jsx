import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVans } from "../../store/vanSlice";
import SidebarFilters from "../../components/SidebarFilters/SidebarFilters";
import VanCard from "../../components/VanCard/VanCard";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { displayedVans, isLoading, error, savedFilters, hasMore } =
    useSelector((state) => state.vans);

  useEffect(() => {
    dispatch(fetchVans({ page: 1, filters: savedFilters }));
  }, [dispatch, savedFilters]);

  const handleFilterChange = (newFilters) => {
    dispatch(fetchVans({ page: 1, filters: newFilters }));
  };

  const handleLoadMore = () => {
    const nextPage = Math.floor(displayedVans.length / 6) + 1;
    dispatch(fetchVans({ page: nextPage, filters: savedFilters }));
  };

  return (
    <div className={styles.catalogPageWrapper}>
      <div className={styles.catalogPageContent}>
        {" "}
        {}
        {}
        <div className={styles.filtersSection}>
          {" "}
          {}
          <SidebarFilters onFilter={handleFilterChange} />
        </div>
        {}
        <div className={styles.camperContainer}>
          {" "}
          {}
          {isLoading && (
            <div className={styles.loaderWrapper}>
              <p className={styles.loadingMessage}>Vans are loading...</p>
            </div>
          )}
          {error && <p className={styles.errorMessage}>Error: {error}</p>}
          {!isLoading && displayedVans.length === 0 && (
            <p className={styles.noVansMessage}>
              No vans found matching your criteria.
            </p>
          )}
          {}
          <div className={styles.camperList}>
            {displayedVans.map((van) => (
              <VanCard key={van.id} van={van} />
            ))}
          </div>
          {!isLoading && hasMore && (
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
