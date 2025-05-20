
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogIn } from "lucide-react";
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

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login attempt:", data);
    // Simulate login - replace with actual authentication logic
    toast({
      title: "Login Successful",
      description: "Welcome back to Artify!",
    });
    
    // After successful login, navigate to the onboarding page
    // In a real app, you might check if the user has already chosen a role
    // and redirect directly to their dashboard if they have
    navigate("/onboarding");
  };

  return (
    <>
      <Helmet>
        <title>Login | Artify</title>
      </Helmet>
      <div className="flex min-h-screen bg-white dark:bg-black">
        {/* Art image section - On large screens only */}
        <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=745&q=80')" }}>
          <div className="flex flex-col justify-end p-8 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 className="text-white text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-white/90 text-lg mb-8">Login to access your personalized art experience</p>
          </div>
        </div>

        {/* Login form section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent mb-3">
                Artify
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="you@example.com" 
                          type="email" 
                          {...field} 
                        />
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
                            placeholder="Enter your password" 
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
                      <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-amber-600 hover:text-amber-500">
                          Forgot password?
                        </Link>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600"
                >
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-amber-600 hover:text-amber-500 font-medium">
                  Sign up
                </Link>
              </p>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                By continuing, you agree to our{" "}
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

export default Login;
