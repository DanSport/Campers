import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RootHub from "../components/Layout/RootHub";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../pages/CatalogPage/CatalogPage"));
const CamperDetailsPage = lazy(() =>
  import("../pages/CamperDetailsPage/CamperDetailsPage")
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <Routes>
        <Route element={<RootHub />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id/*" element={<CamperDetailsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
