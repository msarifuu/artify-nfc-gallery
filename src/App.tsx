
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ArtworksPage from "./pages/Artworks";
import ArtworkDetailPage from "./pages/ArtworkDetail";
import ArtistsPage from "./pages/Artists";
import ArtistProfilePage from "./pages/ArtistProfile";
import GalleryProfilePage from "./pages/GalleryProfile";
import GalleriesPage from "./pages/Galleries";
import EventsPage from "./pages/Events";
import ContactPage from "./pages/Contact";
import ArtworkTransactionPage from "./pages/ArtworkTransaction";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/artworks" element={<ArtworksPage />} />
          <Route path="/artworks/:artworkId" element={<ArtworkDetailPage />} />
          <Route path="/artworks/:artworkId/purchase" element={<ArtworkTransactionPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artists/:artistId" element={<ArtistProfilePage />} />
          <Route path="/galleries" element={<GalleriesPage />} />
          <Route path="/galleries/:galleryId" element={<GalleryProfilePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
