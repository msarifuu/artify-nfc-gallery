
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, TrendingUp, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

const ArtistDashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Total Sales",
      value: "$12,580",
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Artworks Listed",
      value: "24",
      change: "+3",
      trend: "up",
      icon: ArrowUpRight,
    },
    {
      title: "Pending Orders",
      value: "3",
      trend: "neutral",
      icon: Clock,
    },
    {
      title: "Profile Views",
      value: "1,245",
      change: "+22%",
      trend: "up",
      icon: Users,
    },
  ];

  return (
    <DashboardLayout userRole="artist">
      <Helmet>
        <title>Artist Dashboard | Artify</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Artist Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your art.
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
                  {stat.change} from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Artwork Purchase</p>
                <p className="text-sm text-muted-foreground">
                  "Abstract Sunset" was purchased by John D.
                </p>
              </div>
              <p className="text-sm">2 days ago</p>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">New Review</p>
                <p className="text-sm text-muted-foreground">
                  You received a 5-star review from Sarah M.
                </p>
              </div>
              <p className="text-sm">1 week ago</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Gallery Interest</p>
                <p className="text-sm text-muted-foreground">
                  Modern Art Gallery wants to feature your work
                </p>
              </div>
              <p className="text-sm">2 weeks ago</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-amber-500 hover:bg-amber-600">
              Upload New Artwork
            </Button>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full">
              View Sales Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ArtistDashboard;
