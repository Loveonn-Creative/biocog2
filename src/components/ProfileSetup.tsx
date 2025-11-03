import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Building2, MapPin, Phone, AlertCircle } from "lucide-react";
import { profileSetupSchema, getSanitizedErrorMessage } from "@/lib/validation";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const ProfileSetup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    business_name: "",
    business_type: "other" as any,
    gstin: "",
    phone: "",
    location: {
      city: "",
      state: "",
      pincode: ""
    }
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setProfile({
        business_name: data.business_name || "",
        business_type: data.business_type || "other",
        gstin: data.gstin || "",
        phone: data.phone || "",
        location: typeof data.location === 'object' && data.location !== null 
          ? (data.location as any)
          : { city: "", state: "", pincode: "" }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input data
      const validationResult = profileSetupSchema.safeParse(profile);
      
      if (!validationResult.success) {
        const errorMessage = getSanitizedErrorMessage(validationResult.error);
        toast.error(errorMessage);
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const validatedData = validationResult.data;

      const { error } = await supabase
        .from('profiles')
        .update({
          business_name: validatedData.business_name,
          business_type: validatedData.business_type,
          gstin: validatedData.gstin || null,
          phone: validatedData.phone || null,
          location: validatedData.location
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success("Profile updated successfully!");
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Set up your business profile to start tracking carbon emissions and earning credits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="business_name"
                  placeholder="Your Company Pvt Ltd"
                  value={profile.business_name}
                  onChange={(e) => setProfile({ ...profile, business_name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="business_type">Business Type *</Label>
              <Select 
                value={profile.business_type} 
                onValueChange={(value) => setProfile({ ...profile, business_type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="trading">Retail/Trading</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gstin">GSTIN (Optional)</Label>
                <Input
                  id="gstin"
                  placeholder="22AAAAA0000A1Z5"
                  value={profile.gstin}
                  onChange={(e) => setProfile({ ...profile, gstin: e.target.value.toUpperCase() })}
                  maxLength={15}
                />
                <p className="text-xs text-muted-foreground">
                  15 characters (e.g., 22AAAAA0000A1Z5)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  10-digit Indian mobile number
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Business Location
              </Label>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="City"
                  value={profile.location.city}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    location: { ...profile.location, city: e.target.value }
                  })}
                />
                <Input
                  placeholder="State"
                  value={profile.location.state}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    location: { ...profile.location, state: e.target.value }
                  })}
                />
                <Input
                  placeholder="Pincode"
                  value={profile.location.pincode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                    setProfile({ 
                      ...profile, 
                      location: { ...profile.location, pincode: value }
                    });
                  }}
                  maxLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Setup & Continue"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
