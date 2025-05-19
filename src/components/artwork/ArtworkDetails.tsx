
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Types
interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  year: number;
  medium: string;
  dimensions: string;
  edition: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  nfcId: string;
  provenance: {
    date: string;
    owner: string;
    location: string;
    verified: boolean;
  }[];
}

interface ArtworkDetailsProps {
  artwork: Artwork;
}

const ArtworkDetails = ({ artwork }: ArtworkDetailsProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-[400px] overflow-hidden">
            <img 
              src={artwork.image} 
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold">{artwork.title}</h2>
            
            <Link to={`/artists/${artwork.artistId}`} className="text-amber-600 hover:underline">
              <p className="mt-1 text-lg">{artwork.artist}</p>
            </Link>
            
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Year</span>
                <span>{artwork.year}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Medium</span>
                <span>{artwork.medium}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Dimensions</span>
                <span>{artwork.dimensions}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Edition</span>
                <span>{artwork.edition}</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-600 dark:text-gray-400">NFC ID</span>
                <Badge variant="outline" className="font-mono">{artwork.nfcId}</Badge>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-700 dark:text-gray-300">{artwork.description}</p>
            </div>
            
            <div className="mt-6">
              <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price</span>
                  <span className="text-2xl font-bold">{artwork.currency} {artwork.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtworkDetails;
