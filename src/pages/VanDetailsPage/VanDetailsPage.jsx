import { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVanDetails } from "../../store/vanSlice"; 
import BookingForm from "../../components/BookingForm/BookingForm";
import { toast } from "react-hot-toast"; 

export default function VanDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentVan, status, error } = useSelector((s) => s.vans);

  useEffect(() => {
    dispatch(fetchVanDetails(id));
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "failed") return <p className="text-red-500">{error}</p>;
  if (!currentVan) return <p>Van not found</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{currentVan.name}</h2>

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

      <Outlet context={{ van: currentVan }} />
      <BookingForm
        vanName={currentVan.name}
        onSuccess={() => toast.success("Booking request sent! 🎉")}
      />
    </>
  );
}
