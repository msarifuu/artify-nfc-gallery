
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, CalendarDays, MapPin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for demonstration
const mockEvents = [
  {
    id: "event-101",
    name: "International Art Fair 2025",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1280&auto=format&fit=crop",
    startDate: "2025-06-15",
    endDate: "2025-06-20",
    location: "New York, NY",
    type: "Art Fair",
    featured: true,
    ticketsAvailable: true
  },
  {
    id: "event-102",
    name: "Contemporary Sculpture Exhibition",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1280&auto=format&fit=crop",
    startDate: "2025-07-10",
    endDate: "2025-08-15",
    location: "Chicago, IL",
    type: "Exhibition",
    featured: true,
    ticketsAvailable: true
  },
  {
    id: "event-103",
    name: "Digital Art Symposium",
    image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=1280&auto=format&fit=crop",
    startDate: "2025-08-05",
    endDate: "2025-08-07",
    location: "San Francisco, CA",
    type: "Conference",
    featured: false,
    ticketsAvailable: true
  },
  {
    id: "event-104",
    name: "Photography Masterclass with Elena Martinez",
    image: "https://images.unsplash.com/photo-1554757388-29a2a86ef02f?q=80&w=1280&auto=format&fit=crop",
    startDate: "2025-09-12",
    endDate: "2025-09-12",
    location: "Los Angeles, CA",
    type: "Workshop",
    featured: false,
    ticketsAvailable: false
  },
  {
    id: "event-105",
    name: "Urban Arts Festival",
    image: "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=1280&auto=format&fit=crop",
    startDate: "2025-10-01",
    endDate: "2025-10-03",
    location: "Miami, FL",
    type: "Festival",
    featured: true,
    ticketsAvailable: true
  },
  {
    id: "event-106",
    name: "Classical Paintings Auction",
    image: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?q=80&w=1280&auto=format&fit=crop",
    startDate: "2025-11-15",
    endDate: "2025-11-15",
    location: "Boston, MA",
    type: "Auction",
    featured: false,
    ticketsAvailable: true
  }
];

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState("all");
  const [sortOption, setSortOption] = useState("date");
  
  // Filter events based on search query, tab selection, and sort option
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (tabValue === "featured") {
      return matchesSearch && event.featured;
    } else if (tabValue === "fairs") {
      return matchesSearch && event.type === "Art Fair";
    } else if (tabValue === "exhibitions") {
      return matchesSearch && event.type === "Exhibition";
    } else if (tabValue === "workshops") {
      return matchesSearch && (event.type === "Workshop" || event.type === "Conference");
    }
    
    return matchesSearch;
  });
  
  // Sort events based on selected option
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
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
        <title>Fairs & Events | Artify</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Fairs & Events</h1>
            <div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Upcoming</SelectItem>
                  <SelectItem value="a-z">Name (A-Z)</SelectItem>
                  <SelectItem value="z-a">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              className="pl-10" 
              placeholder="Search events by name, type, or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" value={tabValue} onValueChange={setTabValue} className="w-full">
            <TabsList className="grid grid-cols-5 md:w-auto">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="fairs">Art Fairs</TabsTrigger>
              <TabsTrigger value="exhibitions">Exhibitions</TabsTrigger>
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
            </TabsList>
            
            <TabsContent value={tabValue} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <Link to={`/events/${event.id}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {event.featured && (
                          <Badge className="absolute top-3 right-3 bg-amber-500">
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{event.name}</h3>
                          <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                            {event.type}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-2 text-gray-600">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {formatDate(event.startDate)}
                            {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-4 text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button 
                            variant={event.ticketsAvailable ? "default" : "outline"} 
                            size="sm" 
                            className={event.ticketsAvailable ? "bg-amber-500 hover:bg-amber-600" : "text-gray-600"}
                          >
                            {event.ticketsAvailable ? "Get Tickets" : "Sold Out"}
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
              
              {sortedEvents.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-2xl font-semibold text-gray-400 mb-4">No events found</p>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
