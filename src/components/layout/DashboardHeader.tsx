
import { Bell, Search, Inbox } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  userRole?: "artist" | "gallery" | "collector" | "viewer";
}

const DashboardHeader = ({ userRole = "viewer" }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Based on role, set appropriate name
  const getUserName = () => {
    switch (userRole) {
      case "artist":
        return "Maria Rodriguez";
      case "gallery":
        return "Modern Art Gallery";
      case "collector":
        return "James Wilson";
      case "viewer":
      default:
        return "Sarah Johnson";
    }
  };

  // Fake notifications for UI demonstration
  const notifications = [
    {
      id: 1,
      title: "New message",
      description: "You have a new message from Gallery XYZ",
      time: "5 min ago",
    },
    {
      id: 2,
      title: "New transaction",
      description: `${userRole === "artist" || userRole === "gallery" ? "Your artwork was sold" : "Your purchase was confirmed"}`,
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Event reminder",
      description: "Exhibition 'Modern Art' starts tomorrow",
      time: "1 day ago",
    },
  ];
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    
    navigate("/");
  };

  return (
    <header className="border-b border-border h-16 px-4 flex items-center justify-between">
      <div className="w-96 relative hidden md:block">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search artworks, artists, galleries..."
          className="pl-8"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Button variant="outline" size="icon" className="relative border-gold/30 hover:border-gold hover:text-gold" asChild>
          <Link to="/inbox">
            <Inbox className="h-4 w-4" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-gold"></span>
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative border-gold/30 hover:border-gold hover:text-gold">
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-gold"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="cursor-pointer p-3">
                <div>
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {notification.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center font-medium text-sm">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <UserMenu 
          userRole={userRole} 
          userName={getUserName()}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
