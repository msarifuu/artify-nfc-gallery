
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Zap, 
  PaintBucket,
  Building,
  ShoppingBag,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";
import FeaturedArtworks from "@/components/home/FeaturedArtworks";
import ArtistSpotlight from "@/components/home/ArtistSpotlight";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NfcShowcase from "@/components/home/NfcShowcase";

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const roleOptions = [
    {
      id: "artist",
      name: "Artist",
      description: "Create, showcase, and sell your artwork",
      icon: PaintBucket,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      id: "gallery",
      name: "Gallery",
      description: "Manage exhibitions and represent artists",
      icon: Building,
      color: "bg-amber-500 hover:bg-amber-600"
    },
    {
      id: "collector",
      name: "Collector",
      description: "Discover and collect authentic artwork",
      icon: ShoppingBag,
      color: "bg-emerald-500 hover:bg-emerald-600"
    },
    {
      id: "viewer",
      name: "Art Enthusiast",
      description: "Explore art from around the world",
      icon: Eye,
      color: "bg-rose-500 hover:bg-rose-600"
    }
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Artify - NFC Art Authentication & Marketplace</title>
        <meta
          name="description"
          content="Discover, collect, and authenticate art pieces with NFC technology. Join our global marketplace connecting artists, galleries, and collectors."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
                Revolutionize
              </span>{" "}
              How Art Is Authenticated & Traded
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Connect artists, galleries and collectors with cutting-edge NFC technology.
              Verify authenticity, track provenance, and trade with confidence.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
                asChild
              >
                <Link to="/artworks">
                  Explore Artworks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/20 hover:bg-white/10"
                asChild
              >
                <Link to="/about-nfc">
                  Learn About NFC
                  <ShieldCheck className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative bottom-0 w-full transform translate-y-1/2">
          <div className="container mx-auto px-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search for artworks, artists, galleries..." 
                      className="pl-10 h-11 bg-background"
                    />
                  </div>
                </div>
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 text-black h-11"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-black pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
              <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900 text-amber-500 flex items-center justify-center rounded-lg mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authenticate Art</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Verify artwork authenticity instantly with our secure NFC technology, ensuring complete protection against forgeries.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
              <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900 text-amber-500 flex items-center justify-center rounded-lg mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trade Securely</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Buy and sell art with confidence through our secure marketplace, with built-in provenance tracking and verification.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
              <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900 text-amber-500 flex items-center justify-center rounded-lg mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Art</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore curated collections from leading artists and galleries around the world, all authenticated with NFC technology.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Artworks */}
      <FeaturedArtworks />
      
      {/* NFC Showcase */}
      <NfcShowcase />
      
      {/* Artist Spotlight */}
      <ArtistSpotlight />
      
      {/* Upcoming Events */}
      <UpcomingEvents />

      {/* Role Selection CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Artify as a...</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the role that best describes you and get started with personalized features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {roleOptions.map((role) => (
              <div key={role.id} className="flex flex-col">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm flex-1">
                  <div className="mb-4">
                    <div className={`w-12 h-12 rounded-full ${role.color.split(' ')[0]} flex items-center justify-center text-white`}>
                      <role.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{role.name}</h3>
                  <p className="text-muted-foreground mb-6">{role.description}</p>
                  <Button 
                    className={`w-full ${role.color}`}
                    asChild
                  >
                    <Link to="/signup">
                      Sign up as {role.name}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* General CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Future of Art Authentication
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Whether you're an artist, gallery owner, or collector, our platform provides the tools 
              and technology to authenticate, showcase, and trade art securely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
                asChild
              >
                <Link to="/signup">
                  Get Started
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/20 hover:bg-white/10"
                asChild
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
