
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArtistSpotlight = () => {
  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Artist Spotlight</h2>
            <p className="text-muted-foreground max-w-2xl">
              Meet the talented artists behind our authenticated masterpieces.
            </p>
          </div>
          <Button 
            variant="link" 
            className="mt-4 md:mt-0 text-amber-500 hover:text-amber-600 p-0"
            asChild
          >
            <Link to="/artists" className="flex items-center">
              View All Artists
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-black h-[500px]">
            <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-50"></div>
            <div className="relative h-full flex flex-col justify-end p-8 text-white">
              <span className="text-amber-400 text-sm font-medium mb-2">Featured Artist</span>
              <h3 className="text-3xl font-bold mb-2">Elena Rodriguez</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Contemporary artist whose vibrant abstract works explore the intersection of emotion and color. Based in Barcelona, her pieces are collected worldwide.
              </p>
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/10 w-fit"
                asChild
              >
                <Link to="/artists/elena-rodriguez">
                  View Profile
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Artist 1 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Marcus Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">Marcus Chen</h3>
              <p className="text-sm text-amber-500 mb-3">Sculpture | Digital Art</p>
              <p className="text-sm text-muted-foreground mb-4">
                Pioneering the fusion of traditional sculpture techniques with digital technologies.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-sm text-amber-500"
                asChild
              >
                <Link to="/artists/marcus-chen">
                  View Profile
                </Link>
              </Button>
            </div>

            {/* Artist 2 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">Sarah Johnson</h3>
              <p className="text-sm text-amber-500 mb-3">Painting | Mixed Media</p>
              <p className="text-sm text-muted-foreground mb-4">
                Creates ethereal landscapes that blend reality with dreamlike elements.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-sm text-amber-500"
                asChild
              >
                <Link to="/artists/sarah-johnson">
                  View Profile
                </Link>
              </Button>
            </div>

            {/* Artist 3 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Jamal Williams"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">Jamal Williams</h3>
              <p className="text-sm text-amber-500 mb-3">Photography | Installation</p>
              <p className="text-sm text-muted-foreground mb-4">
                Exploring urban environments through thought-provoking photography and installations.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-sm text-amber-500"
                asChild
              >
                <Link to="/artists/jamal-williams">
                  View Profile
                </Link>
              </Button>
            </div>

            {/* Artist 4 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Aiko Tanaka"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">Aiko Tanaka</h3>
              <p className="text-sm text-amber-500 mb-3">Textiles | Printmaking</p>
              <p className="text-sm text-muted-foreground mb-4">
                Combines traditional Japanese textile techniques with contemporary printmaking approaches.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-sm text-amber-500"
                asChild
              >
                <Link to="/artists/aiko-tanaka">
                  View Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSpotlight;
