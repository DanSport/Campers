import { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperDetails } from "../../store/camperSlice";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCamper: camper, status } = useSelector((s) => s.campers);

  useEffect(() => {
    dispatch(fetchCamperDetails(id));
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading…</p>;
  if (!camper) return <p>Camper not found</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{camper.name}</h2>

      <nav className="flex gap-4 mb-6">
        {["features", "reviews"].map((sub) => (
          <NavLink
            key={sub}
            to={sub}
            end
            className="underline-offset-4 hover:underline"
          >
            {sub}
          </NavLink>
        ))}
      </nav>

      <Outlet context={{ camper }} />
    </>
  );
}
