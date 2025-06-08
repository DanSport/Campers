// src/components/VanCard/VanCard.jsx
import { Link } from "react-router-dom";

export default function VanCard({ van }) {
  /* якщо gallery немає або вона порожня — покажемо placeholder */
  const imgSrc =
    Array.isArray(van?.gallery) && van.gallery.length
      ? van.gallery[0]
      : "/placeholder.jpg"; // покладіть будь-яку stub-картинку у /public

  return (
    <article className="border rounded-2xl shadow p-4 flex flex-col">
      <img
        src={imgSrc}
        alt={van?.name ?? "van"}
        className="rounded-xl mb-3 h-44 object-cover"
      />

      <h3 className="font-semibold text-lg mb-1">
        {van?.name ?? "Unnamed van"}
      </h3>

      <p className="text-sm text-gray-600 mb-2">
        {van?.location ?? "unknown location"}
      </p>

      <Link
        to={`/catalog/${van?.id ?? ""}`}
        className="mt-auto underline text-accent hover:no-underline"
      >
        View details →
      </Link>
    </article>
  );
}
