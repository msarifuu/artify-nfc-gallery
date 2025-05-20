
import { Helmet } from "react-helmet-async";
import { ShoppingBag, Star, Image, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

const CollectorDashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Collection Value",
      value: "$125,800",
      change: "+15%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Artworks Owned",
      value: "18",
      change: "+3",
      trend: "up",
      icon: Image,
    },
    {
      title: "Wishlist Items",
      value: "7",
      trend: "neutral",
      icon: Star,
    },
    {
      title: "Pending Purchases",
      value: "2",
      trend: "neutral",
      icon: ShoppingBag,
    },
  ];

  // Recent acquisitions
  const recentAcquisitions = [
    {
      title: "Sunset Over Mountains",
      artist: "Emma Johnson",
      acquired: "May 15, 2025",
      price: "$3,600",
      verified: true,
    },
    {
      title: "Abstract Composition #4",
      artist: "Michael Chen",
      acquired: "April 30, 2025",
      price: "$2,800",
      verified: true,
    },
    {
      title: "City Lights",
      artist: "Sarah Williams",
      acquired: "March 12, 2025",
      price: "$5,200",
      verified: false,
    },
  ];

  return (
    <DashboardLayout userRole="collector">
      <Helmet>
        <title>Collector Dashboard | Artify</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Collector Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your art collection and discover new pieces
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
              {stat.change && (
                <p
                  className={`text-xs ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                      ? "text-red-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {stat.change} year over year
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Acquisitions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAcquisitions.map((item) => (
              <div key={item.title} className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.title}</p>
                    {item.verified && (
                      <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
                        NFC Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    by {item.artist} • Acquired {item.acquired}
                  </p>
                </div>
                <p className="font-semibold">{item.price}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">
              View Full Collection
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <p className="font-medium">Based on your collection</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Abstract</Badge>
                <Badge variant="secondary">Modern</Badge>
                <Badge variant="secondary">Landscape</Badge>
              </div>
            </div>
            <div className="border-b pb-4">
              <p className="font-medium">Artists you might like</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">David Rodriguez</Badge>
                <Badge variant="secondary">Aisha Khan</Badge>
                <Badge variant="secondary">Thomas Wright</Badge>
              </div>
            </div>
            <div>
              <p className="font-medium">Upcoming opportunities</p>
              <p className="text-sm text-muted-foreground mt-1">
                3 new auctions matching your preferences this month
              </p>
            </div>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 mt-2">
              Explore New Art
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CollectorDashboard;
