
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Instagram, Twitter, Facebook, Link as LinkIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockGallery = {
  id: "gallery-123",
  name: "Modern Visions Gallery",
  logo: "https://images.unsplash.com/photo-1499336315816-097655dcfbda?q=80&w=2070&auto=format&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1594215741519-f56f85b89091?q=80&w=2070&auto=format&fit=crop",
  description: "Modern Visions Gallery is a leading contemporary art space dedicated to showcasing innovative and thought-provoking works from both established and emerging artists. Founded in 2005, our gallery has become a cultural hub for artistic exploration and discourse.",
  location: "457 West Broadway, New York, NY",
  established: 2005,
  specialization: "Contemporary Art, Abstract Expressionism, Digital Media",
  hoursOfOperation: "Tuesday to Saturday: 10am - 6pm | Sunday: 12pm - 5pm",
  followersCount: 4879,
  artistsCount: 45,
  exhibitionsCount: 120,
  socialMedia: {
    instagram: "modernvisions",
    twitter: "modernvisionsgallery",
    facebook: "modernvisionsgallery",
    website: "www.modernvisionsgallery.com"
  },
  featuredArtists: [
    { id: "artist-1", name: "Alexandra Rivera", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" },
    { id: "artist-2", name: "Marcus Chen", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" },
    { id: "artist-3", name: "Sophia Williams", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
    { id: "artist-4", name: "James Rodriguez", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" }
  ],
  upcomingExhibitions: [
    {
      id: "exhibition-1",
      title: "Digital Frontiers",
      date: "May 15 - June 30, 2025",
      artists: ["Marcus Chen", "Olivia Parks"],
      image: "https://images.unsplash.com/photo-1595599512948-b9571208699a?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: "exhibition-2",
      title: "Urban Abstractions",
      date: "July 10 - August 28, 2025",
      artists: ["Alexandra Rivera", "James Rodriguez"],
      image: "https://images.unsplash.com/photo-1482245294234-b3f2f8d5f1a4?q=80&w=2070&auto=format&fit=crop"
    }
  ],
  currentExhibitions: [
    {
      id: "exhibition-3",
      title: "Chromatic Harmony",
      date: "April 1 - May 12, 2025",
      artists: ["Sophia Williams"],
      image: "https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=2070&auto=format&fit=crop"
    }
  ],
  featuredArtworks: [
    {
      id: "artwork-1",
      title: "Urban Dreams #7",
      artist: "Alexandra Rivera",
      year: 2023,
      medium: "Oil on canvas",
      price: 4800,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2058&auto=format&fit=crop",
      nfcVerified: true
    },
    {
      id: "artwork-2",
      title: "Digital Nebula",
      artist: "Marcus Chen",
      year: 2024,
      medium: "Digital print on aluminum",
      price: 3200,
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974&auto=format&fit=crop",
      nfcVerified: true
    },
    {
      id: "artwork-3",
      title: "Emotional Landscapes",
      artist: "Sophia Williams",
      year: 2023,
      medium: "Mixed media on canvas",
      price: 5600,
      image: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=1974&auto=format&fit=crop",
      nfcVerified: true
    },
    {
      id: "artwork-4",
      title: "Concrete Jungle",
      artist: "James Rodriguez",
      year: 2024,
      medium: "Acrylic and spray paint on canvas",
      price: 3800,
      image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2070&auto=format&fit=crop",
      nfcVerified: false
    }
  ]
};

const GalleryProfilePage = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const gallery = mockGallery; // In a real app, fetch gallery data based on galleryId

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed Gallery" : "Following Gallery",
      description: isFollowing 
        ? `You have unfollowed ${gallery.name}` 
        : `You are now following ${gallery.name}`,
    });
  };

  const handleContact = () => {
    toast({
      title: "Contact Request Sent",
      description: `Your message has been sent to ${gallery.name}. They will respond shortly.`,
    });
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{gallery.name} | Gallery Profile</title>
      </Helmet>
      
      {/* Cover Image */}
      <div className="w-full h-64 md:h-80 overflow-hidden relative">
        <img 
          src={gallery.coverImage} 
          alt={`${gallery.name} interior`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* Gallery Info */}
      <div className="container px-4 mx-auto relative -mt-20">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-white shadow-md">
              <AvatarImage src={gallery.logo} alt={gallery.name} />
              <AvatarFallback>{gallery.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{gallery.name}</h1>
                  <div className="flex flex-wrap items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="mr-3">{gallery.location}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Est. {gallery.established}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant={isFollowing ? "outline" : "default"}
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="secondary" onClick={handleContact}>
                    Contact
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-8 mt-4">
                <div>
                  <div className="text-xl font-semibold">{gallery.artistsCount}</div>
                  <div className="text-gray-600">Artists</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">{gallery.exhibitionsCount}</div>
                  <div className="text-gray-600">Exhibitions</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">{gallery.followersCount}</div>
                  <div className="text-gray-600">Followers</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-gray-700">{gallery.description}</p>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-md font-semibold mb-1">Specialization</h3>
                <p className="text-gray-700">{gallery.specialization}</p>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-1">Hours</h3>
                <p className="text-gray-700">{gallery.hoursOfOperation}</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-4">
              {gallery.socialMedia.website && (
                <a href={`https://${gallery.socialMedia.website}`} target="_blank" rel="noopener noreferrer">
                  <LinkIcon className="h-5 w-5 text-gray-700 hover:text-gold-500" />
                </a>
              )}
              {gallery.socialMedia.instagram && (
                <a href={`https://instagram.com/${gallery.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-gray-700 hover:text-gold-500" />
                </a>
              )}
              {gallery.socialMedia.twitter && (
                <a href={`https://twitter.com/${gallery.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5 text-gray-700 hover:text-gold-500" />
                </a>
              )}
              {gallery.socialMedia.facebook && (
                <a href={`https://facebook.com/${gallery.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-gray-700 hover:text-gold-500" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="mt-8">
          <Tabs defaultValue="artists">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="artists">Featured Artists</TabsTrigger>
              <TabsTrigger value="artworks">Featured Artworks</TabsTrigger>
              <TabsTrigger value="exhibitions">Exhibitions</TabsTrigger>
            </TabsList>
            
            {/* Featured Artists Tab */}
            <TabsContent value="artists">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {gallery.featuredArtists.map((artist) => (
                  <Link to={`/artists/${artist.id}`} key={artist.id}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow p-4">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={artist.avatar} alt={artist.name} />
                          <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left">
                          <h3 className="font-medium">{artist.name}</h3>
                          <Button variant="link" className="p-0 text-gold-600 h-auto">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            {/* Featured Artworks Tab */}
            <TabsContent value="artworks">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {gallery.featuredArtworks.map((artwork) => (
                  <Link to={`/artworks/${artwork.id}`} key={artwork.id}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium truncate">{artwork.title}</h3>
                        <p className="text-sm text-gray-600">by {artwork.artist}</p>
                        <p className="text-sm text-gray-600">{artwork.year}, {artwork.medium}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold text-gold-600">${artwork.price.toLocaleString()}</span>
                          {artwork.nfcVerified && (
                            <div className="text-xs px-2 py-0.5 bg-gold-100 text-gold-800 rounded-full">
                              NFC Verified
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            {/* Exhibitions Tab */}
            <TabsContent value="exhibitions">
              {/* Current Exhibitions */}
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Current Exhibitions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.currentExhibitions.map((exhibition) => (
                    <Card key={exhibition.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={exhibition.image}
                          alt={exhibition.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{exhibition.title}</h3>
                        <p className="text-sm text-gray-600">{exhibition.date}</p>
                        <p className="text-sm text-gray-600">
                          {exhibition.artists.join(", ")}
                        </p>
                        <Button variant="link" className="p-0 text-gold-600 h-auto mt-2">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
                
              {/* Upcoming Exhibitions */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Upcoming Exhibitions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.upcomingExhibitions.map((exhibition) => (
                    <Card key={exhibition.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={exhibition.image}
                          alt={exhibition.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{exhibition.title}</h3>
                        <p className="text-sm text-gray-600">{exhibition.date}</p>
                        <p className="text-sm text-gray-600">
                          {exhibition.artists.join(", ")}
                        </p>
                        <Button variant="link" className="p-0 text-gold-600 h-auto mt-2">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default GalleryProfilePage;
