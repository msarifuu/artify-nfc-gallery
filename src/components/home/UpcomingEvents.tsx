
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
};

const UpcomingEvents = () => {
  // Mock data for upcoming events
  const events: Event[] = [
    {
      id: "1",
      title: "Contemporary Art Fair",
      date: "May 15-20, 2025",
      location: "New York City, USA",
      image: "/placeholder.svg"
    },
    {
      id: "2",
      title: "Digital Art Exhibition",
      date: "June 5-12, 2025",
      location: "London, UK",
      image: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Emerging Artists Showcase",
      date: "July 8-14, 2025",
      location: "Tokyo, Japan",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Upcoming Fairs & Events</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover exciting art fairs, exhibitions, and events happening around the world.
            </p>
          </div>
          <Button 
            variant="link" 
            className="mt-4 md:mt-0 text-amber-500 hover:text-amber-600 p-0"
            asChild
          >
            <Link to="/events" className="flex items-center">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="outline"
                      className="border-white/20 hover:bg-white/10 text-white"
                      asChild
                    >
                      <Link to={`/events/${event.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-amber-500 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-amber-500 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
