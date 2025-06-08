import { Link } from "react-router-dom";

export default function CamperCard({ camper }) {
  return (
    <article className="border rounded-2xl shadow p-4 flex flex-col">
      <img
        src={camper.gallery[0]}
        alt={camper.name}
        className="rounded-xl mb-3 h-44 object-cover"
      />
      <h3 className="font-semibold text-lg mb-1">{camper.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{camper.location}</p>
      <Link
        to={`/catalog/${camper.id}`}
        className="mt-auto underline text-accent hover:no-underline"
      >
        View details →
      </Link>
    </article>
  );
}
