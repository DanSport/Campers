import { useOutletContext } from "react-router-dom";

export default function ReviewsPage() {
  const { camper } = useOutletContext() ?? {};

  if (!camper?.reviews?.length) return <p>No reviews yet</p>;

  return (
    <section className="space-y-4">
      {camper.reviews.map(({ reviewer, text }, i) => (
        <article key={i} className="border-l-4 border-primary pl-3">
          <p className="font-medium">{reviewer}</p>
          <p className="text-sm text-gray-700">{text}</p>
        </article>
      ))}
    </section>
  );
}
