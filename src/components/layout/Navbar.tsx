
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogIn, Bell, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserMenu from "./UserMenu";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock authentication state - this would be replaced with actual authentication
  // In a real app, this would come from your auth context or state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"artist" | "gallery" | "collector" | "viewer">("viewer");
  const [userName, setUserName] = useState("John Doe");

  // For demo purposes, check URL to simulate logged in state
  // In a real app, this would be handled by your auth system
  useEffect(() => {
    // If on dashboard, simulate logged in
    const isDashboard = location.pathname.includes('/dashboard');
    const isProfile = location.pathname.includes('/profile');
    setIsLoggedIn(isDashboard || isProfile);
    
    // Extract user role from URL path for demo
    if (location.pathname.includes('/artist') || location.pathname.includes('/dashboard/artist')) {
      setUserRole('artist');
      setUserName('Maria Rodriguez');
    } else if (location.pathname.includes('/gallery') || location.pathname.includes('/dashboard/gallery')) {
      setUserRole('gallery');
      setUserName('Modern Art Gallery');
    } else if (location.pathname.includes('/collector') || location.pathname.includes('/dashboard/collector')) {
      setUserRole('collector');
      setUserName('James Wilson');
    } else if (location.pathname.includes('/viewer') || location.pathname.includes('/dashboard/viewer')) {
      setUserRole('viewer');
      setUserName('Sarah Johnson');
    }
  }, [location]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Artworks", path: "/artworks" },
    { name: "Artists", path: "/artists" },
    { name: "Galleries", path: "/galleries" },
    { name: "Fairs & Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
              Artify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                  location.pathname === item.path
                    ? "text-amber-500"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons or User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link to="/inbox">
                    <Inbox className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-amber-500"></span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link to="/notifications">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-amber-500"></span>
                  </Link>
                </Button>
                <UserMenu 
                  userRole={userRole} 
                  userName={userName}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600" asChild>
                  <Link to="/signup">
                    <User className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors hover:bg-muted ${
                    location.pathname === item.path
                      ? "bg-muted text-amber-500"
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center p-3">
                      <div className="flex items-center">
                        <Avatar className="w-8 h-8 mr-3">
                          <AvatarImage src="/placeholder.svg" alt={userName} />
                          <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{userName}</p>
                          <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="justify-start" asChild>
                      <Link to="/inbox">
                        <Inbox className="mr-2 h-4 w-4" />
                        Messages
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start" asChild>
                      <Link to="/notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start" asChild>
                      <Link to={`/dashboard/${userRole}`}>
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="justify-start text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="justify-start" asChild>
                      <Link to="/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 justify-start" asChild>
                      <Link to="/signup">
                        <User className="mr-2 h-4 w-4" />
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
