
import { Helmet } from "react-helmet-async";
import { Building, PaintBucket, Calendar, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const GalleryDashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Monthly Sales",
      value: "$28,650",
      change: "+8%",
      trend: "up",
      icon: ArrowUpRight,
    },
    {
      title: "Total Artists",
      value: "12",
      change: "+2",
      trend: "up",
      icon: PaintBucket,
    },
    {
      title: "Upcoming Exhibitions",
      value: "3",
      trend: "neutral",
      icon: Calendar,
    },
    {
      title: "Collection Size",
      value: "86",
      change: "+5",
      trend: "up",
      icon: Building,
    },
  ];

  // Top performing artists
  const topArtists = [
    { name: "Emma Johnson", sales: "$9,250", percentage: 35 },
    { name: "Michael Chen", sales: "$7,800", percentage: 28 },
    { name: "Sarah Williams", sales: "$5,600", percentage: 21 },
    { name: "David Rodriguez", sales: "$4,200", percentage: 16 },
  ];

  return (
    <DashboardLayout userRole="gallery">
      <Helmet>
        <title>Gallery Dashboard | Artify</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gallery Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your gallery collection and exhibitions
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
                  {stat.change} from last quarter
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Artists</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {topArtists.map((artist) => (
              <div key={artist.name}>
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium">{artist.name}</p>
                  <p className="text-amber-500 font-semibold">{artist.sales}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={artist.percentage} className="h-2" />
                  <span className="text-xs text-muted-foreground w-10">
                    {artist.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exhibitions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between">
                <p className="font-medium">Modern Perspectives</p>
                <p className="text-sm bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full">Next Week</p>
              </div>
              <p className="text-sm text-muted-foreground">May 27 - June 10, 2025</p>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between">
                <p className="font-medium">Abstract Expressions</p>
                <p className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">Upcoming</p>
              </div>
              <p className="text-sm text-muted-foreground">June 15 - July 2, 2025</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-medium">New Talent Showcase</p>
                <p className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">Planning</p>
              </div>
              <p className="text-sm text-muted-foreground">August 5 - August 20, 2025</p>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Exhibitions
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GalleryDashboard;
