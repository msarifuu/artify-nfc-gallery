
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  PaintBucket,
  Building,
  ShoppingBag,
  Eye,
  Home,
  LayoutDashboard,
  Image,
  Users,
  Calendar,
  ShoppingCart,
  Settings,
  Mail,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DashboardSidebarProps {
  userRole: "artist" | "gallery" | "collector" | "viewer";
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const DashboardSidebar = ({
  userRole,
  collapsed = false,
  onToggleCollapse,
}: DashboardSidebarProps) => {
  const location = useLocation();

  // Base menu items for all roles
  const baseMenuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: `/dashboard/${userRole}`,
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  // Role-specific menu items
  const roleSpecificItems = {
    artist: [
      { title: "My Artworks", icon: Image, path: "/dashboard/artworks" },
      { title: "My Exhibitions", icon: Calendar, path: "/dashboard/exhibitions" },
      { title: "Sales", icon: ShoppingCart, path: "/dashboard/sales" },
      { title: "Analytics", icon: BarChart, path: "/dashboard/analytics" },
    ],
    gallery: [
      { title: "Artists", icon: Users, path: "/dashboard/gallery-artists" },
      { title: "Exhibitions", icon: Calendar, path: "/dashboard/exhibitions" },
      { title: "Artworks", icon: Image, path: "/dashboard/gallery-artworks" },
      { title: "Sales", icon: ShoppingCart, path: "/dashboard/sales" },
    ],
    collector: [
      { title: "My Collection", icon: Image, path: "/dashboard/collection" },
      { title: "Wishlists", icon: ShoppingCart, path: "/dashboard/wishlists" },
      { title: "Transactions", icon: BarChart, path: "/dashboard/transactions" },
    ],
    viewer: [
      { title: "Saved Artworks", icon: Image, path: "/dashboard/saved" },
      { title: "Follow", icon: Users, path: "/dashboard/following" },
      { title: "Events", icon: Calendar, path: "/dashboard/upcoming-events" },
    ],
  };

  // Public navigation items
  const publicNavItems = [
    { title: "Home", icon: Home, path: "/" },
    { title: "Artworks", icon: Image, path: "/artworks" },
    { title: "Artists", icon: Users, path: "/artists" },
    { title: "Galleries", icon: Building, path: "/galleries" },
    { title: "Events", icon: Calendar, path: "/events" },
    { title: "Contact", icon: Mail, path: "/contact" },
  ];

  // Combine the base items with role-specific items
  const menuItems = [...baseMenuItems, ...roleSpecificItems[userRole]];

  // Function to determine if a menu item is active
  const isActive = (path: string) => {
    if (path === `/dashboard/${userRole}` && location.pathname === path) {
      return true;
    }
    return location.pathname.startsWith(path) && path !== `/dashboard/${userRole}`;
  };

  // Get the Icon component for the role
  const getRoleIcon = () => {
    switch (userRole) {
      case "artist":
        return PaintBucket;
      case "gallery":
        return Building;
      case "collector":
        return ShoppingBag;
      case "viewer":
      default:
        return Eye;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div
      className={`h-screen flex flex-col bg-white dark:bg-gray-950 border-r border-border transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[250px]"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center overflow-hidden">
          {!collapsed && (
            <Link
              to="/"
              className="flex items-center gap-2 overflow-hidden"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent truncate">
                Artify
              </span>
            </Link>
          )}
          {collapsed && (
            <Link to="/" className="mx-auto">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-200 to-yellow-500 flex items-center justify-center text-black font-bold">
                A
              </div>
            </Link>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-muted-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Role Badge */}
      <div className={`px-4 py-2 ${collapsed ? "text-center" : ""}`}>
        <div
          className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md bg-amber-500/10 text-amber-600 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <RoleIcon className="h-4 w-4" />
          {!collapsed && <span>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>}
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-amber-500/10 text-amber-600"
                    : "text-muted-foreground hover:bg-muted"
                } ${collapsed ? "justify-center" : ""}`
              }
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        <Separator className="my-4" />

        {/* Public Navigation */}
        <div className={`px-4 ${collapsed ? "text-center" : ""}`}>
          <h3 className="text-xs uppercase font-medium text-muted-foreground mb-2">
            {!collapsed && "Public Pages"}
          </h3>
          <nav className="space-y-1">
            {publicNavItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-muted/80 text-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default DashboardSidebar;
