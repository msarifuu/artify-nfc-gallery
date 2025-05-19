
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data for demonstration
const mockArtists = [
  {
    id: "artist-123",
    name: "Alexandra Rivera",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    specialization: "Abstract Expressionism, Mixed Media",
    location: "New York, NY",
    followers: 2345,
    featured: true
  },
  {
    id: "artist-124",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    specialization: "Contemporary Sculpture, Installation Art",
    location: "Los Angeles, CA",
    followers: 1876,
    featured: true
  },
  {
    id: "artist-125",
    name: "Sophia Williams",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    specialization: "Digital Art, Photography",
    location: "Chicago, IL",
    followers: 1598,
    featured: false
  },
  {
    id: "artist-126",
    name: "James Peterson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    specialization: "Oil Painting, Portraiture",
    location: "Miami, FL",
    followers: 2145,
    featured: true
  },
  {
    id: "artist-127",
    name: "Elena Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop",
    specialization: "Watercolor, Botanical Illustration",
    location: "San Francisco, CA",
    followers: 1236,
    featured: false
  },
  {
    id: "artist-128",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    specialization: "Conceptual Art, Performance",
    location: "Boston, MA",
    followers: 978,
    featured: false
  },
  {
    id: "artist-129",
    name: "Olivia Patel",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1998&auto=format&fit=crop",
    specialization: "Ceramic Art, Sculpture",
    location: "Seattle, WA",
    followers: 1482,
    featured: false
  },
  {
    id: "artist-130",
    name: "Thomas Wright",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
    specialization: "Street Art, Murals",
    location: "Philadelphia, PA",
    followers: 1765,
    featured: true
  }
];

const ArtistsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [filterOption, setFilterOption] = useState("all");
  
  // Filter artists based on search query and filters
  const filteredArtists = mockArtists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        artist.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        artist.location.toLowerCase().includes(searchQuery.toLowerCase());
                        
    if (filterOption === "featured") {
      return matchesSearch && artist.featured;
    }
    
    return matchesSearch;
  });
  
  // Sort artists based on selected option
  const sortedArtists = [...filteredArtists].sort((a, b) => {
    if (sortOption === "popular") {
      return b.followers - a.followers;
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
        <title>Explore Artists | Artify</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Explore Artists</h1>
            <div className="flex space-x-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="a-z">Name (A-Z)</SelectItem>
                  <SelectItem value="z-a">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterOption} onValueChange={setFilterOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Artists</SelectItem>
                  <SelectItem value="featured">Featured Artists</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              className="pl-10" 
              placeholder="Search artists by name, specialty, or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {sortedArtists.map((artist) => (
              <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link to={`/artists/${artist.id}`}>
                  <div className="h-full flex flex-col">
                    <div className="bg-amber-50 p-6 flex justify-center">
                      <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                        <AvatarImage src={artist.avatar} alt={artist.name} />
                        <AvatarFallback>{artist.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <CardContent className="flex-grow flex flex-col p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{artist.name}</h3>
                        {artist.featured && (
                          <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-1">{artist.specialization}</p>
                      <p className="text-sm text-gray-600 mb-4">{artist.location}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-semibold">{artist.followers.toLocaleString()}</span> Followers
                        </div>
                        
                        <Button variant="outline" size="sm" className="text-amber-600 border-amber-200 hover:bg-amber-50">
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
          
          {sortedArtists.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-2xl font-semibold text-gray-400 mb-4">No artists found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ArtistsPage;
