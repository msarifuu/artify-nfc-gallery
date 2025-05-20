
import { Helmet } from "react-helmet-async";
import { Bookmark, Eye, Calendar, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

const ViewerDashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Artworks Viewed",
      value: "247",
      icon: Eye,
    },
    {
      title: "Saved Items",
      value: "32",
      icon: Bookmark,
    },
    {
      title: "Followed Artists",
      value: "15",
      icon: Heart,
    },
    {
      title: "Events Interested",
      value: "6",
      icon: Calendar,
    },
  ];

  // Recommended artists
  const recommendedArtists = [
    {
      name: "Emma Johnson",
      style: "Contemporary, Abstract",
      image: "/placeholder.svg",
      followers: "12.5K",
    },
    {
      name: "Michael Chen",
      style: "Minimalist, Sculpture",
      image: "/placeholder.svg",
      followers: "8.3K",
    },
    {
      name: "Sarah Williams",
      style: "Digital Art, NFTs",
      image: "/placeholder.svg",
      followers: "45.2K",
    },
  ];

  return (
    <DashboardLayout userRole="viewer">
      <Helmet>
        <title>Art Explorer Dashboard | Artify</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Art Explorer Dashboard</h1>
        <p className="text-muted-foreground">
          Discover new artwork and artists based on your preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Artists</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendedArtists.map((artist) => (
              <div key={artist.name} className="flex items-center gap-4 border-b pb-4">
                <Avatar>
                  <AvatarImage src={artist.image} alt={artist.name} />
                  <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{artist.name}</p>
                  <p className="text-sm text-muted-foreground">{artist.style}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{artist.followers} followers</p>
                  <Button variant="outline" size="sm" className="mt-1">
                    Follow
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">
              Discover More Artists
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between">
                <p className="font-medium">Modern Art Exhibit</p>
                <Badge>Next Week</Badge>
              </div>
              <p className="text-sm text-muted-foreground">May 27 - June 10, 2025</p>
              <p className="text-sm text-muted-foreground">Downtown Gallery, New York</p>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between">
                <p className="font-medium">Digital Art Summit</p>
                <Badge variant="outline">In 2 Weeks</Badge>
              </div>
              <p className="text-sm text-muted-foreground">June 5 - June 7, 2025</p>
              <p className="text-sm text-muted-foreground">Tech Center, San Francisco</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-medium">Sculpture Fair</p>
                <Badge variant="outline">In 3 Weeks</Badge>
              </div>
              <p className="text-sm text-muted-foreground">June 15 - June 20, 2025</p>
              <p className="text-sm text-muted-foreground">Riverside Park, Chicago</p>
            </div>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 mt-4">
              Browse All Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ViewerDashboard;
