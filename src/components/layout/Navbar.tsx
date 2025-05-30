
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogIn, Bell, Inbox, LogOut } from "lucide-react";
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Artify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  location.pathname === item.path
                    ? "text-gold"
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
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link to="/inbox">
                    <Inbox className="h-5 w-5 text-foreground hover:text-gold transition-colors" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-gold"></span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link to="/notifications">
                    <Bell className="h-5 w-5 text-foreground hover:text-gold transition-colors" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-gold"></span>
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
                <Button variant="outline" size="sm" asChild className="border-gold hover:bg-gold/10 hover:text-gold">
                  <Link to="/login" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button size="sm" className="bg-gold hover:bg-gold-600 text-white" asChild>
                  <Link to="/signup" className="flex items-center">
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
              className="hover:bg-gold/10 hover:text-gold"
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
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-base font-medium px-3 py-2 rounded-md transition-colors hover:bg-gold/10 hover:text-gold ${
                    location.pathname === item.path
                      ? "bg-gold/10 text-gold"
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center">
                        <Avatar className="w-10 h-10 mr-3 border-2 border-gold/20">
                          <AvatarImage src="/placeholder.svg" alt={userName} />
                          <AvatarFallback className="bg-gold/20 text-gold-800">{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-base font-medium">{userName}</p>
                          <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="justify-start border-gold hover:text-gold hover:border-gold" asChild>
                      <Link to="/inbox">
                        <Inbox className="mr-2 h-4 w-4" />
                        Messages
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start border-gold hover:text-gold hover:border-gold" asChild>
                      <Link to="/notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start border-gold hover:text-gold hover:border-gold" asChild>
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
                    <Button variant="outline" size="sm" className="justify-start border-gold hover:text-gold hover:border-gold" asChild>
                      <Link to="/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                    <Button size="sm" className="justify-start bg-gold hover:bg-gold-600 text-white" asChild>
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
