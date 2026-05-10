import { Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { CityDetailPage } from "@/pages/CityDetailPage";
import { CityDiscoveryPage } from "@/pages/CityDiscoveryPage";
import { HomePage } from "@/pages/HomePage";
import { ProvinceDetailPage } from "@/pages/ProvinceDetailPage";
import { ProvincesListPage } from "@/pages/ProvincesListPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { TeamPage } from "@/pages/TeamPage";
import { TourDetailPage } from "@/pages/TourDetailPage";
import { TourListPage } from "@/pages/TourListPage";
import { TourGuideDetailPage } from "@/pages/TourGuideDetailPage";
import { TourGuideListPage } from "@/pages/TourGuideListPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="cities" element={<CityDiscoveryPage />} />
        <Route path="cities/:slug" element={<CityDetailPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="journeys" element={<TourListPage />} />
        <Route path="journeys/:slug" element={<TourDetailPage />} />
        <Route path="guides" element={<TourGuideListPage />} />
        <Route path="guides/:slug" element={<TourGuideDetailPage />} />
        <Route path="provinces" element={<ProvincesListPage />} />
        <Route path="provinces/:slug" element={<ProvinceDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
