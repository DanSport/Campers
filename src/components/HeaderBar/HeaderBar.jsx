import { NavLink } from "react-router-dom";

export default function HeaderBar() {
  return (
    <header className="bg-primary text-white p-4 flex gap-6">
      {["/", "/catalog"].map((p) => (
        <NavLink key={p} to={p} className="hover:underline">
          {p === "/" ? "Home" : "Catalog"}
        </NavLink>
      ))}
    </header>
  );
}
