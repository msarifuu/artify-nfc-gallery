import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store, Instagram, Twitter, Facebook, MapPin, Briefcase } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockArtist = {
  id: "artist-123",
  name: "Alexandra Rivera",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2070&auto=format&fit=crop",
  bio: "Contemporary artist specializing in abstract expressionism and mixed media. My work explores the intersection of color, emotion, and form, drawing inspiration from urban landscapes and natural phenomena.",
  location: "New York, NY",
  experience: "15+ years",
  specialization: "Abstract Expressionism, Mixed Media",
  followersCount: 2345,
  exhibitionCount: 27,
  artworksCount: 89,
  socialMedia: {
    instagram: "alexandra.rivera",
    twitter: "alexrivera_art",
    facebook: "alexandrariveraart"
  },
  partnerGalleries: [
    { id: "gallery-1", name: "Modern Visions Gallery" },
    { id: "gallery-2", name: "Artemis Contemporary" },
    { id: "gallery-3", name: "Blue Horizon Fine Arts" }
  ],
  exhibitions: [
    { 
      id: "exhibition-1", 
      title: "Urban Reflections", 
      year: 2023,
      gallery: "Modern Visions Gallery",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2080&auto=format&fit=crop"
    },
    { 
      id: "exhibition-2", 
      title: "Chromatic Journeys", 
      year: 2022,
      gallery: "Artemis Contemporary",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=2069&auto=format&fit=crop"
    },
    { 
      id: "exhibition-3", 
      title: "Metamorphosis", 
      year: 2021,
      gallery: "Blue Horizon Fine Arts",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=2070&auto=format&fit=crop"
    }
  ],
  artworks: [
    {
      id: "artwork-1",
      title: "Urban Dreams #7",
      year: 2023,
      medium: "Oil on canvas",
      dimensions: "48 x 60 inches",
      price: 4800,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2058&auto=format&fit=crop",
      nfcVerified: true
    },
    {
      id: "artwork-2",
      title: "Chromatic Symphony",
      year: 2022,
      medium: "Mixed media on panel",
      dimensions: "36 x 48 inches",
      price: 3600,
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974&auto=format&fit=crop",
      nfcVerified: true
    },
    {
      id: "artwork-3",
      title: "Cityscape Abstraction",
      year: 2023,
      medium: "Acrylic and charcoal on canvas",
      dimensions: "40 x 40 inches",
      price: 3200,
      image: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=1974&auto=format&fit=crop",
      nfcVerified: true
    },
    {
      id: "artwork-4",
      title: "Ethereal Passage",
      year: 2021,
      medium: "Oil and cold wax on panel",
      dimensions: "24 x 36 inches",
      price: 2800,
      image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2070&auto=format&fit=crop",
      nfcVerified: false
    }
  ]
};

const ArtistProfilePage = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const artist = mockArtist; // In a real app, fetch artist data based on artistId

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed Artist" : "Following Artist",
      description: isFollowing 
        ? `You have unfollowed ${artist.name}` 
        : `You are now following ${artist.name}`,
    });
  };

  const handleContact = () => {
    toast({
      title: "Contact Request Sent",
      description: `Your message has been sent to ${artist.name}. They will respond shortly.`,
    });
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{artist.name} | Artist Profile</title>
      </Helmet>
      
      {/* Cover Image */}
      <div className="w-full h-64 md:h-80 overflow-hidden relative">
        <img 
          src={artist.coverImage} 
          alt={`${artist.name}'s studio`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* Artist Info */}
      <div className="container px-4 mx-auto relative -mt-20">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-white shadow-md">
              <AvatarImage src={artist.avatar} alt={artist.name} />
              <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{artist.name}</h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{artist.location}</span>
                    <span className="mx-2">•</span>
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{artist.experience}</span>
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
                  <div className="text-xl font-semibold">{artist.artworksCount}</div>
                  <div className="text-gray-600">Artworks</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">{artist.exhibitionCount}</div>
                  <div className="text-gray-600">Exhibitions</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">{artist.followersCount}</div>
                  <div className="text-gray-600">Followers</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-gray-700">{artist.bio}</p>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Specialization</h3>
            <p className="text-gray-700">{artist.specialization}</p>
            
            <div className="flex gap-4 mt-4">
              {artist.socialMedia.instagram && (
                <a href={`https://instagram.com/${artist.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-gray-700 hover:text-gold-500" />
                </a>
              )}
              {artist.socialMedia.twitter && (
                <a href={`https://twitter.com/${artist.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5 text-gray-700 hover:text-gold-500" />
                </a>
              )}
              {artist.socialMedia.facebook && (
                <a href={`https://facebook.com/${artist.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-gray-700 hover:text-gold-500" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="mt-8">
          <Tabs defaultValue="artworks">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="artworks">Artworks</TabsTrigger>
              <TabsTrigger value="exhibitions">Exhibitions</TabsTrigger>
              <TabsTrigger value="galleries">Partner Galleries</TabsTrigger>
            </TabsList>
            
            {/* Artworks Tab */}
            <TabsContent value="artworks">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {artist.artworks.map((artwork) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {artist.exhibitions.map((exhibition) => (
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
                      <p className="text-sm text-gray-600">{exhibition.year}</p>
                      <p className="text-sm text-gray-600">{exhibition.gallery}, {exhibition.location}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Partner Galleries Tab */}
            <TabsContent value="galleries">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {artist.partnerGalleries.map((gallery) => (
                  <Link to={`/galleries/${gallery.id}`} key={gallery.id}>
                    <Card className="hover:shadow-lg transition-shadow p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-gold-100">
                          <Store className="h-6 w-6 text-gold-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{gallery.name}</h3>
                          <Button variant="link" className="p-0 text-gold-600 h-auto">
                            View Gallery
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ArtistProfilePage;
