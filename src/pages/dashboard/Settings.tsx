
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<"artist" | "gallery" | "collector" | "viewer">("artist");

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleRoleChange = (value: string) => {
    setUserRole(value as "artist" | "gallery" | "collector" | "viewer");
    toast({
      title: "Role Updated",
      description: `You are now using Artify as a ${value}`,
    });
  };

  return (
    <DashboardLayout userRole={userRole}>
      <Helmet>
        <title>Account Settings | Artify</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, preferences, and account settings
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback>{userRole === "artist" ? "AR" : userRole === "gallery" ? "GA" : userRole === "collector" ? "CO" : "VI"}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or GIF. 1MB max.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" defaultValue={userRole === "artist" ? "Artist Name" : userRole === "gallery" ? "Gallery Name" : "User Name"} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="you@example.com" defaultValue="user@example.com" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="location">
                    Location
                  </label>
                  <Input id="location" placeholder="City, Country" defaultValue="New York, USA" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="website">
                    Website
                  </label>
                  <Input id="website" type="url" placeholder="https://yourwebsite.com" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium" htmlFor="bio">
                    Bio
                  </label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself" 
                    className="min-h-32" 
                    defaultValue={
                      userRole === "artist" 
                        ? "Contemporary artist specializing in abstract expressionism and digital art." 
                        : userRole === "gallery" 
                        ? "Modern art gallery showcasing emerging artists and contemporary works." 
                        : userRole === "collector" 
                        ? "Art collector with a passion for contemporary and digital artworks." 
                        : "Art enthusiast exploring various styles and movements."
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} className="bg-amber-500 hover:bg-amber-600">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your activity
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <span className="relative inline-block h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-amber-500"></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">New Artwork Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new artworks match your interests
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <span className="relative inline-block h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-amber-500"></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Event Invitations</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about upcoming events and exhibitions
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <span className="relative inline-block h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-amber-500"></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Communications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive newsletters and promotional content
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" />
                      <span className="relative inline-block h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-amber-500"></span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences} className="bg-amber-500 hover:bg-amber-600">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account role and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">User Role</label>
                <Select onValueChange={handleRoleChange} defaultValue={userRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="artist">Artist</SelectItem>
                    <SelectItem value="gallery">Gallery</SelectItem>
                    <SelectItem value="collector">Collector</SelectItem>
                    <SelectItem value="viewer">Art Enthusiast</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  This determines how you interact with the platform and what features are available to you.
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    Change Password
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Enable Two-Factor Auth
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-red-600">Danger Zone</h3>
                <div className="mt-4 flex gap-4">
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                    Deactivate Account
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
