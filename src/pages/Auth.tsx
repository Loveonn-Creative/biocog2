import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Building2, Chrome, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Session } from "@supabase/supabase-js";

// Validation schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  business: z.string().min(2, "Business name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  
  // Sign Up State
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpBusiness, setSignUpBusiness] = useState("");

  useEffect(() => {
    // Check for password reset
    if (searchParams.get('reset') === 'true') {
      toast.info("Please check your email for password reset instructions");
    }

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        const redirect = searchParams.get('redirect') || '/dashboard';
        navigate(redirect);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        const redirect = searchParams.get('redirect') || '/dashboard';
        navigate(redirect);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    // Validate input
    const validationResult = signInSchema.safeParse({
      email: signInEmail,
      password: signInPassword,
    });

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setValidationErrors(errors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInEmail.trim(),
        password: signInPassword,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password. Please try again.");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Please verify your email before signing in. Check your inbox.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        toast.success("Welcome back!");
        // Navigation will happen automatically via onAuthStateChange
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    // Validate input
    const validationResult = signUpSchema.safeParse({
      name: signUpName,
      business: signUpBusiness,
      email: signUpEmail,
      password: signUpPassword,
    });

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setValidationErrors(errors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail.trim(),
        password: signUpPassword,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: signUpName.trim(),
            business_name: signUpBusiness.trim()
          }
        }
      });

      if (error) {
        if (error.message.includes("already registered") || error.message.includes("User already registered")) {
          toast.error("This email is already registered. Please sign in instead.");
          setActiveTab("signin");
          setSignInEmail(signUpEmail);
        } else if (error.message.includes("Database error")) {
          toast.error("Sign-up temporarily unavailable. Please try again in a moment.");
          console.error("Database error during sign-up:", error);
        } else if (error.message.includes("Password")) {
          toast.error("Password must be at least 6 characters with uppercase and numbers");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        // Check if email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          toast.info("A confirmation email has been sent. Please check your inbox.");
        } else {
          toast.success("Account created successfully! Setting up your profile...");
          // Small delay to ensure profile is created by trigger
          setTimeout(() => {
            navigate('/profile-setup');
          }, 1500);
        }
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred during sign up");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!signInEmail) {
      toast.error("Please enter your email first");
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(signInEmail, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset email sent! Check your inbox.");
      }
    } catch (error) {
      toast.error("Failed to send reset email");
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Failed to sign in with Google");
      console.error("Google sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Sign In" showNavigation={true}>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background via-muted/30 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-2">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Welcome to Biocog</CardTitle>
              <CardDescription className="text-center">
                India's OS for Green MSMEs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "signin" | "signup")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Sign In Tab */}
                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="you@company.com"
                          value={signInEmail}
                          onChange={(e) => {
                            setSignInEmail(e.target.value);
                            if (validationErrors.email) {
                              setValidationErrors((prev) => ({ ...prev, email: "" }));
                            }
                          }}
                          className={`pl-10 ${validationErrors.email ? "border-destructive" : ""}`}
                          required
                        />
                        {validationErrors.email && (
                          <p className="text-xs text-destructive mt-1">{validationErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Password</Label>
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-xs text-primary hover:underline"
                          disabled={isLoading}
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          value={signInPassword}
                          onChange={(e) => {
                            setSignInPassword(e.target.value);
                            if (validationErrors.password) {
                              setValidationErrors((prev) => ({ ...prev, password: "" }));
                            }
                          }}
                          className={`pl-10 pr-10 ${validationErrors.password ? "border-destructive" : ""}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        {validationErrors.password && (
                          <p className="text-xs text-destructive mt-1">{validationErrors.password}</p>
                        )}
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup" className="space-y-4">
                  <Alert className="bg-muted/50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Create your account to start tracking emissions and earning carbon credits
                    </AlertDescription>
                  </Alert>
                  
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signUpName}
                          onChange={(e) => {
                            setSignUpName(e.target.value);
                            if (validationErrors.name) {
                              setValidationErrors((prev) => ({ ...prev, name: "" }));
                            }
                          }}
                          className={`pl-10 ${validationErrors.name ? "border-destructive" : ""}`}
                          required
                        />
                        {validationErrors.name && (
                          <p className="text-xs text-destructive mt-1">{validationErrors.name}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-business">Business Name *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-business"
                          type="text"
                          placeholder="Your Company Pvt Ltd"
                          value={signUpBusiness}
                          onChange={(e) => {
                            setSignUpBusiness(e.target.value);
                            if (validationErrors.business) {
                              setValidationErrors((prev) => ({ ...prev, business: "" }));
                            }
                          }}
                          className={`pl-10 ${validationErrors.business ? "border-destructive" : ""}`}
                          required
                        />
                        {validationErrors.business && (
                          <p className="text-xs text-destructive mt-1">{validationErrors.business}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@company.com"
                          value={signUpEmail}
                          onChange={(e) => {
                            setSignUpEmail(e.target.value);
                            if (validationErrors.email) {
                              setValidationErrors((prev) => ({ ...prev, email: "" }));
                            }
                          }}
                          className={`pl-10 ${validationErrors.email ? "border-destructive" : ""}`}
                          required
                        />
                        {validationErrors.email && (
                          <p className="text-xs text-destructive mt-1">{validationErrors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min 6 chars, 1 uppercase, 1 number"
                          value={signUpPassword}
                          onChange={(e) => {
                            setSignUpPassword(e.target.value);
                            if (validationErrors.password) {
                              setValidationErrors((prev) => ({ ...prev, password: "" }));
                            }
                          }}
                          className={`pl-10 pr-10 ${validationErrors.password ? "border-destructive" : ""}`}
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        {validationErrors.password && (
                          <p className="text-xs text-destructive mt-1">{validationErrors.password}</p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Must contain at least 6 characters, 1 uppercase letter, and 1 number
                      </p>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
