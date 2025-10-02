import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { VoiceInterface } from "@/components/VoiceInterface";
import { ScanInterface } from "@/components/ScanInterface";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Users, 
  Shield, 
  BookOpen, 
  HelpCircle, 
  Settings,
  Heart,
  Globe,
  Phone,
  Mail
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { MobileNavigation } from "@/components/MobileNavigation";
import { FloatingActionButton } from "@/components/FloatingActionButton";

const Index = () => {
  const [showVoice, setShowVoice] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Check URL params for onboarding trigger
  useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('onboarding') === 'true') {
      setShowOnboarding(true);
    }
  });

  const handleOnboardingComplete = (userData: any) => {
    setUserProfile(userData);
    setShowOnboarding(false);
    // Here you would typically save to Supabase or localStorage
    console.log("User onboarded:", userData);
  };

  const handleScanComplete = (scanData: any) => {
    console.log("Scan completed:", scanData);
  };

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing & Plans", href: "/pricing" },
      { name: "API Docs", href: "#api" },
      { name: "Integrations", href: "#integrations" }
    ],
    resources: [
      { name: "Help Center", href: "#help" },
      { name: "Knowledge Base", href: "#kb" },
      { name: "Video Tutorials", href: "#videos" },
      { name: "ESG Guide", href: "#esg-guide" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Partnerships", href: "#partnerships" },
      { name: "Recyclers Network", href: "#recyclers" },
      { name: "Careers", href: "/career" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Security", href: "#security" },
      { name: "Compliance", href: "#compliance" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-xl font-bold text-foreground">Biocog</span>
              <Badge variant="secondary" className="ml-2">Beta</Badge>
            </div>
            
            <MobileNavigation />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection
        onVoiceClick={() => setShowVoice(true)}
        onScanClick={() => setShowScan(true)}
        onGuestClick={() => setShowOnboarding(true)}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Trust Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              🏛️ Trusted by Government & Banks
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Built for India's Green Future
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aligned with Government of India's carbon market initiatives and banking sector ESG requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Bank Grade Security</h3>
              <p className="text-sm text-muted-foreground">
                256-bit encryption, blockchain verification, GDPR compliant
              </p>
            </div>
            <div className="feature-card text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">MSME Focused</h3>
              <p className="text-sm text-muted-foreground">
                Designed specifically for India's 63 million MSMEs
              </p>
            </div>
            <div className="feature-card text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Global Standards</h3>
              <p className="text-sm text-muted-foreground">
                Meets international ESG reporting and carbon credit standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="text-xl font-bold">Biocog</span>
              </div>
              <p className="text-sm text-background/80">
                India's OS for Green MSMEs. Making carbon credits as simple as UPI.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-sm text-background/80">Made in India</span>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2">
                {footerLinks.product.map((link) => (
                  <a key={link.name} href={link.href} className="block text-sm text-background/80 hover:text-background transition-colors">
                    {link.name}
                  </a>
                ))}
                <a href="/green-lending" className="block text-sm text-background/80 hover:text-background transition-colors">
                  Green Lending
                </a>
                <a href="/gstn-carbon" className="block text-sm text-background/80 hover:text-background transition-colors">
                  GSTN → Carbon Credits
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <div className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <a key={link.name} href={link.href} className="block text-sm text-background/80 hover:text-background transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2">
                {footerLinks.company.map((link) => (
                  <a key={link.name} href={link.href} className="block text-sm text-background/80 hover:text-background transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-background/80">
                  <Mail className="w-4 h-4" />
                  <span>support@biocog.in</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-background/80">
                  <Phone className="w-4 h-4" />
                  <span>+91 1800-BIOCOG</span>
                </div>
                <div className="pt-2 space-y-2">
                  <Button size="sm" variant="secondary">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Get Help
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full bg-success/20 text-success hover:bg-success/30 border-success/50"
                    onClick={() => window.location.href = '/recycle'}
                  >
                    Recycle Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-background/20" />
          
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-background/80">
              © 2024 Biocog. All rights reserved. | Made with ❤️ for Indian MSMEs
            </div>
            <div className="flex space-x-6 text-sm">
              {footerLinks.legal.map((link) => (
                <a key={link.name} href={link.href} className="text-background/80 hover:text-background transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <FloatingActionButton />

      {/* Modals */}
      <VoiceInterface
        isOpen={showVoice}
        onClose={() => setShowVoice(false)}
      />
      
      <ScanInterface
        isOpen={showScan}
        onClose={() => setShowScan(false)}
        onScanComplete={handleScanComplete}
      />
      
      <OnboardingFlow
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
};

export default Index;