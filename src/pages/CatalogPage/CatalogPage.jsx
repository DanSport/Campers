import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../store/vanSlice";
import CamperCard from "../../components/CamperCard/CamperCard";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { campers, status } = useSelector((s) => s.campers);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  if (status === "loading") return <p>Loading…</p>;

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {campers.map((c) => (
        <CamperCard key={c.id} camper={c} />
      ))}
    </section>
  );
}
