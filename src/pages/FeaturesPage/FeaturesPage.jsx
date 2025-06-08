import { useOutletContext } from "react-router-dom";

export default function FeaturesPage() {
 
  const { camper } = useOutletContext() ?? {};

  if (!camper) return <p>No features available</p>;

  return (
    <section>
      <h3 className="text-xl font-semibold mb-2">Main features</h3>
      <ul className="list-disc pl-5 space-y-1">
        {camper?.features?.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </section>
  );
}
