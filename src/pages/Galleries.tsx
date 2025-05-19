
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, MapPin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockGalleries = [
  {
    id: "gallery-101",
    name: "Modern Art Space",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1280&auto=format&fit=crop",
    location: "New York, NY",
    type: "Contemporary",
    featuredArtists: 24,
    rating: 4.8,
    verified: true
  },
  {
    id: "gallery-102",
    name: "The Renaissance Gallery",
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?q=80&w=1280&auto=format&fit=crop",
    location: "Chicago, IL",
    type: "Classical & Modern",
    featuredArtists: 18,
    rating: 4.6,
    verified: true
  },
  {
    id: "gallery-103",
    name: "Avant-Garde Studio",
    image: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=1280&auto=format&fit=crop",
    location: "Los Angeles, CA",
    type: "Experimental",
    featuredArtists: 15,
    rating: 4.5,
    verified: false
  },
  {
    id: "gallery-104",
    name: "Heritage Art House",
    image: "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?q=80&w=1280&auto=format&fit=crop",
    location: "Boston, MA",
    type: "Traditional",
    featuredArtists: 22,
    rating: 4.7,
    verified: true
  },
  {
    id: "gallery-105",
    name: "Urban Expression",
    image: "https://images.unsplash.com/photo-1545178803-4056671c6696?q=80&w=1280&auto=format&fit=crop",
    location: "Miami, FL",
    type: "Street Art",
    featuredArtists: 30,
    rating: 4.9,
    verified: true
  },
  {
    id: "gallery-106",
    name: "Digital Horizons",
    image: "https://images.unsplash.com/photo-1568780900338-92d442cd15e4?q=80&w=1280&auto=format&fit=crop",
    location: "San Francisco, CA",
    type: "Digital & NFT",
    featuredArtists: 12,
    rating: 4.4,
    verified: false
  }
];

const GalleriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("rating");
  const [filterOption, setFilterOption] = useState("all");
  
  // Filter galleries based on search query and filters
  const filteredGalleries = mockGalleries.filter(gallery => {
    const matchesSearch = gallery.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          gallery.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          gallery.type.toLowerCase().includes(searchQuery.toLowerCase());
                          
    if (filterOption === "verified") {
      return matchesSearch && gallery.verified;
    }
    
    return matchesSearch;
  });
  
  // Sort galleries based on selected option
  const sortedGalleries = [...filteredGalleries].sort((a, b) => {
    if (sortOption === "rating") {
      return b.rating - a.rating;
    } else if (sortOption === "artists") {
      return b.featuredArtists - a.featuredArtists;
    } else if (sortOption === "a-z") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "z-a") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <MainLayout>
      <Helmet>
        <title>Explore Galleries | Artify</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Explore Galleries</h1>
            <div className="flex space-x-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="artists">Most Artists</SelectItem>
                  <SelectItem value="a-z">Name (A-Z)</SelectItem>
                  <SelectItem value="z-a">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterOption} onValueChange={setFilterOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Galleries</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              className="pl-10" 
              placeholder="Search galleries by name, type, or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {sortedGalleries.map((gallery) => (
              <Card key={gallery.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link to={`/galleries/${gallery.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={gallery.image} 
                      alt={gallery.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {gallery.verified && (
                      <Badge className="absolute top-3 right-3 bg-amber-500">
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-5">
                    <h3 className="font-bold text-xl mb-1">{gallery.name}</h3>
                    <div className="flex items-center mb-3 text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{gallery.location}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                        {gallery.type}
                      </span>
                      <div className="flex items-center">
                        <span className="text-amber-500 mr-1">★</span>
                        <span className="font-medium">{gallery.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {gallery.featuredArtists} Featured Artists
                      </span>
                      <Button variant="outline" size="sm" className="text-amber-600 border-amber-200 hover:bg-amber-50">
                        View Gallery
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          
          {sortedGalleries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-2xl font-semibold text-gray-400 mb-4">No galleries found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default GalleriesPage;
