
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Grid, LayoutGrid, LayoutList, ChevronDown, Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock types
type Artwork = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  price: string;
  image: string;
  medium: string;
  year: number;
  dimensions: string;
  gallery?: string;
  galleryId?: string;
  isNfcVerified: boolean;
  isSold: boolean;
};

// Mock API call
const fetchArtworks = async (): Promise<Artwork[]> => {
  console.log("Fetching artworks...");
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data - in a real app this would come from an API
  return [
    {
      id: "1",
      title: "Abstract Harmony",
      artist: "Elena Rodriguez",
      artistId: "a1",
      price: "$2,500",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      medium: "Oil on Canvas",
      year: 2023,
      dimensions: "24 × 36 in",
      gallery: "Modern Space Gallery",
      galleryId: "g1",
      isNfcVerified: true,
      isSold: false
    },
    {
      id: "2",
      title: "Urban Reflections",
      artist: "Marcus Chen",
      artistId: "a2",
      price: "$1,800",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      medium: "Acrylic on Panel",
      year: 2022,
      dimensions: "18 × 24 in",
      gallery: "City View Art Space",
      galleryId: "g2",
      isNfcVerified: true,
      isSold: false
    },
    {
      id: "3",
      title: "Ocean Whispers",
      artist: "Sarah Johnson",
      artistId: "a3",
      price: "$3,200",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      medium: "Watercolor",
      year: 2023,
      dimensions: "16 × 20 in",
      gallery: "Coastal Arts Gallery",
      galleryId: "g3",
      isNfcVerified: true,
      isSold: true
    },
    {
      id: "4",
      title: "Digital Dreams",
      artist: "Jamal Williams",
      artistId: "a4",
      price: "$2,100",
      image: "https://images.unsplash.com/photo-1515729713600-f06dd16b3113",
      medium: "Digital Art, Limited Print",
      year: 2022,
      dimensions: "24 × 36 in",
      isNfcVerified: true,
      isSold: false
    },
    {
      id: "5",
      title: "Serene Forest",
      artist: "Lina Park",
      artistId: "a5",
      price: "$4,500",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      medium: "Oil on Canvas",
      year: 2023,
      dimensions: "30 × 40 in",
      gallery: "Nature's Touch Gallery",
      galleryId: "g4",
      isNfcVerified: false,
      isSold: false
    },
    {
      id: "6",
      title: "Architectural Vision",
      artist: "Alexander Wright",
      artistId: "a6",
      price: "$3,800",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      medium: "Mixed Media",
      year: 2022,
      dimensions: "24 × 36 in",
      gallery: "Modern Space Gallery",
      galleryId: "g1",
      isNfcVerified: true,
      isSold: false
    },
    {
      id: "7",
      title: "Sunset Meditation",
      artist: "Carmen Diaz",
      artistId: "a7",
      price: "$1,950",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      medium: "Acrylic on Canvas",
      year: 2023,
      dimensions: "20 × 24 in",
      isNfcVerified: true,
      isSold: false
    },
    {
      id: "8",
      title: "Modern Abstract Study #4",
      artist: "Elena Rodriguez",
      artistId: "a1",
      price: "$2,200",
      image: "https://images.unsplash.com/photo-1500630417200-63156e226754",
      medium: "Oil on Canvas",
      year: 2023,
      dimensions: "18 × 24 in",
      gallery: "Modern Space Gallery",
      galleryId: "g1",
      isNfcVerified: true,
      isSold: true
    }
  ];
};

const ArtworksPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    artist: "",
    medium: "",
    price: "",
    gallery: "",
    nfcVerified: false
  });
  const [searchQuery, setSearchQuery] = useState("");

  const { data: artworks, isLoading } = useQuery({
    queryKey: ['artworks'],
    queryFn: fetchArtworks,
  });

  // Filter artworks based on search and filters
  const filteredArtworks = artworks?.filter(artwork => {
    const matchesSearch = searchQuery === "" || 
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesArtist = filters.artist === "" || artwork.artist === filters.artist;
    const matchesMedium = filters.medium === "" || artwork.medium.includes(filters.medium);
    const matchesGallery = filters.gallery === "" || artwork.gallery === filters.gallery;
    const matchesNfc = !filters.nfcVerified || artwork.isNfcVerified;
    
    return matchesSearch && matchesArtist && matchesMedium && matchesGallery && matchesNfc;
  });

  // Get unique values for filter dropdowns
  const uniqueArtists = artworks ? [...new Set(artworks.map(a => a.artist))] : [];
  const uniqueMediums = artworks ? [...new Set(artworks.map(a => a.medium.split(',')[0].trim()))] : [];
  const uniqueGalleries = artworks ? [...new Set(artworks.filter(a => a.gallery).map(a => a.gallery!))] : [];
  
  // Handle filter changes
  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      artist: "",
      medium: "",
      price: "",
      gallery: "",
      nfcVerified: false
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Artworks</h1>
          <p className="text-muted-foreground">
            Discover and collect authentic artworks from talented artists worldwide
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex items-center flex-1">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search artworks or artists..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4 p-2">
                  <h4 className="font-medium">Filter Artworks</h4>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Artist</label>
                    <Select
                      value={filters.artist}
                      onValueChange={(value) => handleFilterChange('artist', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Artists" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Artists</SelectItem>
                        {uniqueArtists.map(artist => (
                          <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Medium</label>
                    <Select
                      value={filters.medium}
                      onValueChange={(value) => handleFilterChange('medium', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Mediums" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Mediums</SelectItem>
                        {uniqueMediums.map(medium => (
                          <SelectItem key={medium} value={medium}>{medium}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price</label>
                    <Select
                      value={filters.price}
                      onValueChange={(value) => handleFilterChange('price', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Prices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Prices</SelectItem>
                        <SelectItem value="low">Under $1,000</SelectItem>
                        <SelectItem value="mid">$1,000 - $3,000</SelectItem>
                        <SelectItem value="high">Above $3,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gallery</label>
                    <Select
                      value={filters.gallery}
                      onValueChange={(value) => handleFilterChange('gallery', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Galleries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Galleries</SelectItem>
                        {uniqueGalleries.map(gallery => (
                          <SelectItem key={gallery} value={gallery}>{gallery}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="nfc-verified"
                      checked={filters.nfcVerified}
                      onChange={(e) => handleFilterChange('nfcVerified', e.target.checked)}
                      className="h-4 w-4 text-amber-500"
                    />
                    <label htmlFor="nfc-verified" className="text-sm font-medium">
                      NFC Verified Only
                    </label>
                  </div>

                  <Button 
                    onClick={clearFilters}
                    variant="outline" 
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* View mode toggle */}
            <Tabs 
              defaultValue="grid" 
              value={viewMode}
              onValueChange={(value) => setViewMode(value as 'grid' | 'list')}
              className="hidden md:flex"
            >
              <TabsList className="grid w-24 grid-cols-2">
                <TabsTrigger value="grid" className="px-3">
                  <LayoutGrid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3">
                  <LayoutList className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Active filters display */}
        {(filters.artist || filters.medium || filters.price || filters.gallery || filters.nfcVerified) && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-muted-foreground py-1">Active filters:</span>
            
            {filters.artist && (
              <Badge variant="outline" className="flex items-center gap-1">
                Artist: {filters.artist}
              </Badge>
            )}
            
            {filters.medium && (
              <Badge variant="outline" className="flex items-center gap-1">
                Medium: {filters.medium}
              </Badge>
            )}
            
            {filters.price && (
              <Badge variant="outline" className="flex items-center gap-1">
                Price: {filters.price === 'low' ? 'Under $1,000' : filters.price === 'mid' ? '$1,000 - $3,000' : 'Above $3,000'}
              </Badge>
            )}
            
            {filters.gallery && (
              <Badge variant="outline" className="flex items-center gap-1">
                Gallery: {filters.gallery}
              </Badge>
            )}
            
            {filters.nfcVerified && (
              <Badge variant="outline" className="flex items-center gap-1">
                NFC Verified Only
              </Badge>
            )}
            
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
            {Array(8).fill(null).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div>
                    <AspectRatio ratio={3/4}>
                      <Skeleton className="h-full w-full" />
                    </AspectRatio>
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading && filteredArtworks?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-medium mb-2">No artworks found</p>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria</p>
            <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
          </div>
        )}

        {/* Artworks Grid View */}
        {!isLoading && filteredArtworks && filteredArtworks.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map((artwork) => (
              <Link to={`/artworks/${artwork.id}`} key={artwork.id}>
                <Card className="group overflow-hidden transition-all hover:shadow-md dark:hover:shadow-amber-900/10">
                  <CardContent className="p-0">
                    <div className="relative">
                      <AspectRatio ratio={3/4}>
                        <img 
                          src={artwork.image}
                          alt={artwork.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 w-full">
                          <p className="text-white/90 text-sm">{artwork.price}</p>
                        </div>
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        {artwork.isNfcVerified && (
                          <Badge className="bg-amber-500 text-white text-xs">NFC Verified</Badge>
                        )}
                        {artwork.isSold && (
                          <Badge className="bg-red-500 text-white text-xs">Sold</Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium group-hover:text-amber-500 transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                      <p className="text-xs text-muted-foreground mt-1">{artwork.medium}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Artworks List View */}
        {!isLoading && filteredArtworks && filteredArtworks.length > 0 && viewMode === 'list' && (
          <div className="space-y-4">
            {filteredArtworks.map((artwork) => (
              <Link to={`/artworks/${artwork.id}`} key={artwork.id} className="block">
                <Card className="group overflow-hidden transition-all hover:shadow-md dark:hover:shadow-amber-900/10">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48">
                        <img 
                          src={artwork.image}
                          alt={artwork.title}
                          className="object-cover w-full h-full"
                        />
                        {/* Badges */}
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                          {artwork.isNfcVerified && (
                            <Badge className="bg-amber-500 text-white text-xs">NFC Verified</Badge>
                          )}
                          {artwork.isSold && (
                            <Badge className="bg-red-500 text-white text-xs">Sold</Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium group-hover:text-amber-500 transition-colors">
                              {artwork.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                          </div>
                          <p className="font-medium">{artwork.price}</p>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">{artwork.medium}, {artwork.year}</p>
                          <p className="text-sm">{artwork.dimensions}</p>
                          {artwork.gallery && (
                            <p className="text-sm text-muted-foreground">Gallery: {artwork.gallery}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && filteredArtworks && filteredArtworks.length > 0 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }} />
              </PaginationItem>
              {[1, 2, 3].map(page => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(currentPage + 1);
                }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </MainLayout>
  );
};

export default ArtworksPage;
