
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, User } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const signupFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["artist", "gallery", "collector", "viewer"], {
    required_error: "Please select a role",
  }),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "viewer",
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log("Signup data:", data);
    // Simulate signup - replace with actual registration logic
    toast({
      title: "Account Created!",
      description: `Welcome to Artify as a ${data.role}!`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Artify</title>
      </Helmet>
      <div className="flex min-h-screen bg-white dark:bg-black">
        {/* Art image section - On large screens only */}
        <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')" }}>
          <div className="flex flex-col justify-end p-8 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-4xl font-bold mb-4">Join Our Art Community</h2>
            <p className="text-white/90 text-lg mb-8">Connect with artists, galleries, and collectors worldwide</p>
          </div>
        </div>

        {/* Signup form section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent mb-3">
                Create Account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join Artify and be part of the global art community
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Create a secure password" 
                            type={showPassword ? "text" : "password"} 
                            {...field} 
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Your Role</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-muted/50">
                              <FormControl>
                                <RadioGroupItem value="artist" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                <div className="font-medium mb-1">Artist</div>
                                <div className="text-xs text-muted-foreground">
                                  Upload and sell your artworks
                                </div>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-muted/50">
                              <FormControl>
                                <RadioGroupItem value="gallery" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                <div className="font-medium mb-1">Gallery</div>
                                <div className="text-xs text-muted-foreground">
                                  Manage exhibitions and represent artists
                                </div>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-muted/50">
                              <FormControl>
                                <RadioGroupItem value="collector" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                <div className="font-medium mb-1">Collector</div>
                                <div className="text-xs text-muted-foreground">
                                  Buy and collect authenticated artworks
                                </div>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-muted/50">
                              <FormControl>
                                <RadioGroupItem value="viewer" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                <div className="font-medium mb-1">Viewer</div>
                                <div className="text-xs text-muted-foreground">
                                  Browse artworks and events
                                </div>
                              </FormLabel>
                            </FormItem>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600"
                >
                  <User className="mr-2 h-4 w-4" /> Create Account
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-amber-600 hover:text-amber-500 font-medium">
                  Sign in
                </Link>
              </p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-amber-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-amber-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
