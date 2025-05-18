
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Heart,
  Share,
  Eye,
  TagIcon,
  Download,
  MapPin,
  CircleUser,
  ExternalLink
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Mock types
type ArtworkOwnershipRecord = {
  id: string;
  owner: string;
  date: string;
  transaction: string;
  verified: boolean;
};

type ArtworkDetail = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  description: string;
  price: string;
  images: string[];
  medium: string;
  year: number;
  dimensions: string;
  gallery?: string;
  galleryId?: string;
  location?: string;
  isNfcVerified: boolean;
  nfcId?: string;
  isSold: boolean;
  ownershipHistory: ArtworkOwnershipRecord[];
  viewCount: number;
  likeCount: number;
  similarArtworks: {
    id: string;
    title: string;
    artist: string;
    image: string;
    price: string;
  }[];
};

// Mock API call
const fetchArtworkDetails = async (artworkId: string): Promise<ArtworkDetail> => {
  console.log("Fetching artwork details for ID:", artworkId);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data - in a real app this would come from an API
  return {
    id: artworkId,
    title: "Abstract Harmony",
    artist: "Elena Rodriguez",
    artistId: "a1",
    description: "Abstract Harmony is a vibrant exploration of color and form, inspired by the rhythmic patterns found in nature and music. Using bold brushstrokes and a rich palette of blues and gold, the artist creates a sense of movement and emotional resonance. The work invites viewers to find their own meaning within its layers, reflecting the universal language of harmony that transcends cultural boundaries.",
    price: "$2,500",
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      "https://images.unsplash.com/photo-1499988921418-b7df40ff03f9"
    ],
    medium: "Oil on Canvas",
    year: 2023,
    dimensions: "24 × 36 in",
    gallery: "Modern Space Gallery",
    galleryId: "g1",
    location: "New York, NY",
    isNfcVerified: true,
    nfcId: "NFC-4A2B9C-8D7E",
    isSold: false,
    ownershipHistory: [
      {
        id: "h1",
        owner: "Modern Space Gallery",
        date: "June 15, 2023",
        transaction: "Initial Registration",
        verified: true
      }
    ],
    viewCount: 342,
    likeCount: 86,
    similarArtworks: [
      {
        id: "2",
        title: "Urban Reflections",
        artist: "Marcus Chen",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        price: "$1,800"
      },
      {
        id: "5",
        title: "Serene Forest",
        artist: "Lina Park",
        image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
        price: "$4,500"
      },
      {
        id: "7",
        title: "Sunset Meditation",
        artist: "Carmen Diaz",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
        price: "$1,950"
      }
    ]
  };
};

const ArtworkDetailPage = () => {
  const { artworkId } = useParams<{ artworkId: string }>();
  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("original");
  const [selectedFrame, setSelectedFrame] = useState("none");
  
  const { data: artwork, isLoading } = useQuery({
    queryKey: ['artwork', artworkId],
    queryFn: () => fetchArtworkDetails(artworkId || ''),
    enabled: !!artworkId
  });

  // Calculate final price based on selections
  const calculatePrice = () => {
    if (!artwork) return "$0";
    
    let basePrice = parseFloat(artwork.price.replace('$', '').replace(',', ''));
    
    // Add costs for different sizes
    if (selectedSize === "large") {
      basePrice *= 1.5;
    } else if (selectedSize === "small") {
      basePrice *= 0.7;
    }
    
    // Add costs for framing
    if (selectedFrame === "wood") {
      basePrice += 200;
    } else if (selectedFrame === "metal") {
      basePrice += 350;
    } else if (selectedFrame === "floating") {
      basePrice += 450;
    }
    
    return `$${basePrice.toLocaleString()}`;
  };

  const handleLike = () => {
    setLiked(!liked);
    // In a real app, you would call an API to update likes
  };

  const handleShare = () => {
    // In a real app, you would implement sharing functionality
    console.log("Share button clicked");
    alert("Sharing functionality would open here");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="p-0 hover:bg-transparent">
            <Link to="/artworks" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all artworks
            </Link>
          </Button>
        </div>

        {isLoading ? (
          // Loading state
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-[600px] w-full" />
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-20 w-20" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-40 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ) : artwork ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Artwork Images */}
              <div className="space-y-4">
                <AspectRatio ratio={3/4} className="bg-muted overflow-hidden rounded-md">
                  <img 
                    src={artwork.images[0]} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                
                {/* Thumbnail Gallery */}
                {artwork.images.length > 1 && (
                  <div className="flex overflow-x-auto gap-2 py-2">
                    {artwork.images.map((image, index) => (
                      <div 
                        key={index} 
                        className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-muted cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <img 
                          src={image} 
                          alt={`${artwork.title} view ${index + 1}`}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Artwork Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost"
                        className={liked ? "text-red-500" : ""}
                        onClick={handleLike}
                      >
                        <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={handleShare}
                      >
                        <Share className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <Link to={`/artists/${artwork.artistId}`} className="text-lg hover:text-amber-500 transition-colors">
                    {artwork.artist}
                  </Link>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {artwork.isNfcVerified && (
                      <Badge className="bg-amber-500 text-white">NFC Verified</Badge>
                    )}
                    {artwork.isSold && (
                      <Badge variant="destructive">Sold</Badge>
                    )}
                    <Badge variant="outline">{artwork.medium}</Badge>
                    <Badge variant="outline">{artwork.year}</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-muted-foreground py-2">
                  <div className="flex items-center">
                    <Eye className="mr-1 h-4 w-4" />
                    {artwork.viewCount} Views
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-1 h-4 w-4" />
                    {artwork.likeCount + (liked ? 1 : 0)} Likes
                  </div>
                  {artwork.location && (
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {artwork.location}
                    </div>
                  )}
                </div>

                <Separator />

                <Tabs defaultValue="description" className="w-full">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="provenance">Provenance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="pt-4">
                    <p className="text-muted-foreground">{artwork.description}</p>
                  </TabsContent>
                  
                  <TabsContent value="details" className="pt-4">
                    <dl className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:gap-2">
                        <dt className="font-medium min-w-32">Medium:</dt>
                        <dd className="text-muted-foreground">{artwork.medium}</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:gap-2">
                        <dt className="font-medium min-w-32">Year:</dt>
                        <dd className="text-muted-foreground">{artwork.year}</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:gap-2">
                        <dt className="font-medium min-w-32">Dimensions:</dt>
                        <dd className="text-muted-foreground">{artwork.dimensions}</dd>
                      </div>
                      {artwork.gallery && (
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium min-w-32">Gallery:</dt>
                          <dd className="text-muted-foreground">
                            <Link to={`/galleries/${artwork.galleryId}`} className="hover:text-amber-500 transition-colors">
                              {artwork.gallery}
                            </Link>
                          </dd>
                        </div>
                      )}
                      {artwork.isNfcVerified && artwork.nfcId && (
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                          <dt className="font-medium min-w-32">NFC ID:</dt>
                          <dd className="text-muted-foreground font-mono">{artwork.nfcId}</dd>
                        </div>
                      )}
                    </dl>
                  </TabsContent>
                  
                  <TabsContent value="provenance" className="pt-4">
                    {artwork.ownershipHistory.length > 0 ? (
                      <div className="space-y-4">
                        {artwork.ownershipHistory.map((record) => (
                          <div 
                            key={record.id} 
                            className="flex items-start border-l-2 border-amber-500 pl-4 py-1"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{record.date}</p>
                              <p className="text-sm">{record.transaction}</p>
                              <p className="text-muted-foreground text-sm">{record.owner}</p>
                            </div>
                            {record.verified && (
                              <Badge variant="outline" className="text-green-600">Verified</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No ownership history available.</p>
                    )}
                  </TabsContent>
                </Tabs>

                {/* Purchase Options */}
                {!artwork.isSold && (
                  <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Purchase Options</h3>
                      <div className="text-xl font-bold text-amber-600">{calculatePrice()}</div>
                    </div>
                    
                    {/* Size Options */}
                    <div>
                      <label className="text-sm font-medium block mb-2">Size</label>
                      <RadioGroup 
                        className="flex gap-4" 
                        value={selectedSize}
                        onValueChange={setSelectedSize}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="small" id="size-small" />
                          <label htmlFor="size-small" className="text-sm">Small</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="original" id="size-original" />
                          <label htmlFor="size-original" className="text-sm">Original</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="large" id="size-large" />
                          <label htmlFor="size-large" className="text-sm">Large</label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Frame Options */}
                    <div>
                      <label className="text-sm font-medium block mb-2">Frame</label>
                      <RadioGroup 
                        className="flex flex-wrap gap-x-4 gap-y-2" 
                        value={selectedFrame}
                        onValueChange={setSelectedFrame}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="frame-none" />
                          <label htmlFor="frame-none" className="text-sm">No Frame</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="wood" id="frame-wood" />
                          <label htmlFor="frame-wood" className="text-sm">Wood (+$200)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="metal" id="frame-metal" />
                          <label htmlFor="frame-metal" className="text-sm">Metal (+$350)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="floating" id="frame-floating" />
                          <label htmlFor="frame-floating" className="text-sm">Floating (+$450)</label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">
                      Add to Cart
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      Purchase includes NFC authentication certificate and secure shipping
                    </p>
                  </div>
                )}
                
                {/* Sold Notice */}
                {artwork.isSold && (
                  <div className="bg-muted/30 p-4 rounded-lg border border-border text-center space-y-3">
                    <p className="font-semibold">This artwork has been sold</p>
                    <Button variant="outline" className="w-full">
                      Contact Gallery
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Similar works by this artist may be available
                    </p>
                  </div>
                )}
                
                {/* Artwork Download */}
                <div className="flex justify-between border-t border-border pt-4 mt-4">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  
                  <Button variant="outline" size="sm" asChild>
                    <a href={artwork.images[0]} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Artist Section */}
            <section className="mt-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">About the Artist</h2>
                <Button variant="link" asChild className="text-amber-500 hover:text-amber-600 p-0">
                  <Link to={`/artists/${artwork.artistId}`} className="flex items-center">
                    View Profile
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-24 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <CircleUser className="w-full h-full text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-medium mb-2">{artwork.artist}</h3>
                  <p className="text-muted-foreground mb-4">
                    Contemporary artist specializing in abstract expressionism, with a focus on exploring the intersection of color, emotion, and natural forms. Based in New York City.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Abstract</Badge>
                    <Badge variant="outline">Oil Painting</Badge>
                    <Badge variant="outline">Contemporary</Badge>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Similar Artworks Section */}
            {artwork.similarArtworks.length > 0 && (
              <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Similar Artworks</h2>
                
                <Carousel>
                  <CarouselContent>
                    {artwork.similarArtworks.map(similarArtwork => (
                      <CarouselItem key={similarArtwork.id} className="md:basis-1/2 lg:basis-1/3">
                        <Link to={`/artworks/${similarArtwork.id}`}>
                          <Card className="group overflow-hidden transition-all hover:shadow-md dark:hover:shadow-amber-900/10">
                            <CardContent className="p-0">
                              <div className="relative">
                                <AspectRatio ratio={3/4}>
                                  <img 
                                    src={similarArtwork.image}
                                    alt={similarArtwork.title}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                  />
                                </AspectRatio>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                  <div className="p-4 w-full">
                                    <p className="text-white/90 text-sm">{similarArtwork.price}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-medium group-hover:text-amber-500 transition-colors">
                                  {similarArtwork.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{similarArtwork.artist}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              </section>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Artwork not found</h2>
            <p className="text-muted-foreground mb-8">The artwork you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/artworks">Browse All Artworks</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ArtworkDetailPage;
