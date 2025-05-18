
import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
                Artify
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Revolutionizing art authentication and trading with NFC technology.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/artworks" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Artworks
                </Link>
              </li>
              <li>
                <Link to="/artists" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link to="/galleries" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Galleries
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Fairs & Events
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-medium mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-amber-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/nfc-guide" className="text-gray-400 hover:text-amber-400 transition-colors">
                  NFC Guide
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <span className="text-gray-400">contact@artify.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <span className="text-gray-400">+1 (123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Artify. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-500 hover:text-amber-400 transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-amber-400 transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="text-sm text-gray-500 hover:text-amber-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
