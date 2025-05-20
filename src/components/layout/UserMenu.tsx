
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  PaintBucket,
  Building,
  ShoppingBag,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  userRole?: "artist" | "gallery" | "collector" | "viewer";
  userName?: string;
}

const UserMenu = ({ userRole = "viewer", userName = "Guest User" }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Get dashboard link based on role
  const getDashboardLink = () => {
    return `/dashboard/${userRole}`;
  };

  // Get role icon
  const getRoleIcon = () => {
    switch (userRole) {
      case "artist":
        return <PaintBucket className="mr-2 h-4 w-4" />;
      case "gallery":
        return <Building className="mr-2 h-4 w-4" />;
      case "collector":
        return <ShoppingBag className="mr-2 h-4 w-4" />;
      case "viewer":
      default:
        return <Eye className="mr-2 h-4 w-4" />;
    }
  };

  // Format role name with first letter capitalized
  const formatRoleName = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted focus:bg-muted"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt={userName} />
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs text-muted-foreground">{formatRoleName(userRole)}</p>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={getDashboardLink()} className="cursor-pointer">
              {getRoleIcon()}
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/" className="cursor-pointer text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
