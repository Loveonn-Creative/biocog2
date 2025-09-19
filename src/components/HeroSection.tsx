import { useState } from "react";
import { Mic, Camera, FileText, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-scan.jpg";

interface HeroSectionProps {
  onVoiceClick: () => void;
  onScanClick: () => void;
  onGuestClick: () => void;
}

export const HeroSection = ({ onVoiceClick, onScanClick, onGuestClick }: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-primary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(147_60%_45%/0.05),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(142_70%_45%/0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-6 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Biocog
                <span className="block text-primary">UPI of Carbon</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                India's OS for Green MSMEs
              </p>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Track emissions. Earn credits. Go green. Simple as UPI.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm font-medium">₹5L+ Green Loans</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm font-medium">Voice in Hindi</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm font-medium">No Sign-up</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={onGuestClick}
                className="btn-hero group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Try as Guest
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={onVoiceClick}
                variant="outline"
                className="btn-ghost-hero group"
              >
                <Mic className="w-5 h-5 mr-2 voice-pulse" />
                Talk to AI
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button 
                onClick={onScanClick}
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Camera className="w-4 h-4 mr-2" />
                Upload Bill
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => window.location.href = '/reports'}
              >
                <FileText className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card bg-gradient-card">
              <img 
                src={heroImage} 
                alt="Indian MSME owner scanning invoice with Biocog app"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Demo Button */}
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button 
                  onClick={handlePlayDemo}
                  variant="secondary"
                  size="lg"
                  className="bg-white/90 text-foreground hover:bg-white"
                  disabled={isPlaying}
                >
                  {isPlaying ? (
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Watch Demo
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-soft border border-border animate-bounce">
              <div className="text-xs text-muted-foreground">CO₂ Saved</div>
              <div className="text-lg font-bold text-success">+2.3 tons</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-soft border border-border animate-bounce" style={{animationDelay: "1s"}}>
              <div className="text-xs text-muted-foreground">Credits Earned</div>
              <div className="text-lg font-bold text-primary">₹12,500</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};