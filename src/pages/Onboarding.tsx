
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  PaintBucket, 
  Building, 
  ShoppingBag, 
  Eye, 
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const roleOptions = [
  {
    id: "artist",
    name: "Artist",
    description: "Create profiles for your artwork and sell directly to collectors",
    icon: PaintBucket,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "gallery",
    name: "Gallery",
    description: "Showcase your collection and connect with artists",
    icon: Building,
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: "collector",
    name: "Collector",
    description: "Build your art collection and track provenance",
    icon: ShoppingBag,
    color: "from-emerald-500 to-green-500",
  },
  {
    id: "viewer",
    name: "Art Enthusiast",
    description: "Discover and explore artwork without buying or selling",
    icon: Eye,
    color: "from-rose-500 to-red-500",
  },
];

const Onboarding = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelection = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You must select a role to continue",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would save the user's role to the backend
    // For now, we'll just navigate to the appropriate dashboard
    navigate(`/dashboard/${selectedRole}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Select Your Role | Artify</title>
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome to Artify</h1>
          <p className="text-muted-foreground text-lg">
            Select your primary role to personalize your experience
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {roleOptions.map((role) => (
            <motion.div key={role.id} variants={itemVariants}>
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRole === role.id ? "ring-2 ring-amber-500" : "hover:border-amber-200"
                }`}
                onClick={() => handleRoleSelection(role.id)}
              >
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className={`bg-gradient-to-br ${role.color} p-3 rounded-lg text-white`}>
                    <role.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{role.name}</h2>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button 
            onClick={handleContinue}
            size="lg"
            className="bg-amber-500 hover:bg-amber-600"
          >
            Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.p 
          className="mt-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          You can change your role anytime from your account settings
        </motion.p>
      </div>
    </>
  );
};

export default Onboarding;
