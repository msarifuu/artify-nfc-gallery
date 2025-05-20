
import { ReactNode, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children?: ReactNode;
  userRole: "artist" | "gallery" | "collector" | "viewer";
}

const DashboardLayout = ({ children, userRole = "viewer" }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Get page title based on pathname
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path.includes("/dashboard/settings")) return "Settings";
    if (path.includes("/dashboard/artist")) return "Artist Dashboard";
    if (path.includes("/dashboard/gallery")) return "Gallery Dashboard";
    if (path.includes("/dashboard/collector")) return "Collector Dashboard";
    if (path.includes("/dashboard/viewer")) return "Explorer Dashboard";
    
    return "Dashboard";
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-muted/30">
      <DashboardSidebar 
        userRole={userRole} 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userRole={userRole} />
        
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">{getPageTitle()}</h1>
            {children || <Outlet />}
          </div>
        </div>
      </div>
      
      <Toaster />
      <Sonner />
    </div>
  );
};

export default DashboardLayout;
