import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RootHub from "../components/Layout/RootHub";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../pages/CatalogPage/CatalogPage"));
const CamperDetailsPage = lazy(() =>
  import("../pages/VanDetailsPage/VanDetailsPage")
);
const FeaturesPage = lazy(() => import("../pages/FeaturesPage/FeaturesPage"));
const ReviewsPage = lazy(() => import("../pages/ReviewsPage/ReviewsPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <Routes>
        <Route element={<RootHub />}>
          <Route index element={<HomePage />} />

          <Route path="catalog" element={<CatalogPage />} />

          <Route path="catalog/:id" element={<CamperDetailsPage />}>
            <Route path="features" element={<FeaturesPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
