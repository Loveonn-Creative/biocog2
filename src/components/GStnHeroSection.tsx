import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, Zap, Shield, TrendingUp } from "lucide-react";

const stats = [
  { label: "Invoices Processed", value: "2.5M+", icon: Zap },
  { label: "Carbon Credits Generated", value: "125K", icon: TrendingUp },
  { label: "MSMEs Verified", value: "15,000+", icon: Shield },
];

export const GStnHeroSection = () => {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => "0"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(stats.map(stat => stat.value));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="mb-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm">
              🇮🇳 Proprietary Technology for Indian MSMEs
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            GST Invoices to
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Carbon Credits
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            The world's first <strong>real-time</strong> pipeline that transforms your GST invoice data 
            into verified, tradeable carbon credits. <em>Regulator-friendly. Blockchain-secured.</em>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 transition-all duration-500 hover:bg-white/20 hover:scale-105"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Icon className="w-8 h-8 text-white mb-4 mx-auto" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 transition-all duration-1000">
                    {animatedValues[index]}
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-xl shadow-button transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('flowchart')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
              <ArrowDown className="w-5 h-5 ml-2 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};