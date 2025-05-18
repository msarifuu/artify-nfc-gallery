
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type Artwork = {
  id: string;
  title: string;
  artist: string;
  image: string;
  price: string;
};

const FeaturedArtworks = () => {
  // Mock data for featured artworks
  const artworks: Artwork[] = [
    {
      id: "1",
      title: "Abstract Harmony",
      artist: "Elena Rodriguez",
      image: "/placeholder.svg",
      price: "$2,500"
    },
    {
      id: "2",
      title: "Urban Reflections",
      artist: "Marcus Chen",
      image: "/placeholder.svg",
      price: "$1,800"
    },
    {
      id: "3",
      title: "Ocean Whispers",
      artist: "Sarah Johnson",
      image: "/placeholder.svg",
      price: "$3,200"
    },
    {
      id: "4",
      title: "Digital Dreams",
      artist: "Jamal Williams",
      image: "/placeholder.svg",
      price: "$2,100"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Artworks</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover exceptional pieces from talented artists around the world, all authenticated with NFC technology.
            </p>
          </div>
          <Button 
            variant="link" 
            className="mt-4 md:mt-0 text-amber-500 hover:text-amber-600 p-0"
            asChild
          >
            <Link to="/artworks" className="flex items-center">
              View All Artworks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artworks.map((artwork) => (
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
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-amber-500 transition-colors">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtworks;
