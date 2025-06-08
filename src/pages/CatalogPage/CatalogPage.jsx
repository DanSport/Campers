import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVans } from "../../store/vanSlice";  
import VanCard from "../../components/VanCard/VanCard";  
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { vans, status } = useSelector((s) => s.vans);

  useEffect(() => {
    dispatch(fetchVans({ page: 1, filters: {} }));
  }, [dispatch]);

  if (status === "loading") return <p>Loading…</p>;

return (
  <section className={styles.grid}>
    {vans.map((v) => <VanCard key={v.id} van={v} />)}
  </section>
);

}
