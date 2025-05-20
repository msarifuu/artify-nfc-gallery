
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  PaintBucket, 
  Palette, 
  Building, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Image, 
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: "artist" | "gallery" | "collector" | "viewer";
}

const DashboardLayout = ({ children, userRole = "viewer" }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Simulate logout - in real app, would clear auth state
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader>
            <div className="px-2 py-4 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
                Artify
              </span>
              <SidebarTrigger className="ml-auto" />
            </div>
            <Separator />
            <div className="px-4 py-3 flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  {userRole === "artist" ? "AR" : userRole === "gallery" ? "GA" : userRole === "collector" ? "CO" : "VI"}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">
                  {userRole === "artist" ? "Artist Name" : 
                   userRole === "gallery" ? "Gallery Name" : 
                   userRole === "collector" ? "Collector Name" : "Art Viewer"}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {/* Common Menu */}
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(`/dashboard/${userRole}`)}>
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/artworks")}>
                        <Image className="mr-2 h-4 w-4" />
                        Browse Artworks
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/events")}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Events & Fairs
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Role-Specific Menus */}
            {userRole === "artist" && (
              <SidebarGroup>
                <SidebarGroupLabel>Artist Tools</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/artist/artworks")}>
                          <Palette className="mr-2 h-4 w-4" />
                          My Artworks
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/artist/sales")}>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Sales History
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {userRole === "gallery" && (
              <SidebarGroup>
                <SidebarGroupLabel>Gallery Management</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/gallery/artworks")}>
                          <Palette className="mr-2 h-4 w-4" />
                          Gallery Collection
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/gallery/artists")}>
                          <PaintBucket className="mr-2 h-4 w-4" />
                          Represented Artists
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/gallery/exhibitions")}>
                          <Building className="mr-2 h-4 w-4" />
                          Exhibitions
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {userRole === "collector" && (
              <SidebarGroup>
                <SidebarGroupLabel>Collection Management</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/collector/collection")}>
                          <Image className="mr-2 h-4 w-4" />
                          My Collection
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/collector/wishlist")}>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Wishlist
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {/* Settings - Common for all roles */}
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/dashboard/settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <DashboardHeader userRole={userRole} />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
