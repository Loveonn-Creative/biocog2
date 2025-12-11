import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const PricingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-4xl relative z-10"
      >
        <div className="text-center space-y-6">
          {/* Main Headline - Simple, Benefit-First */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Earn from your Climate Data
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              in 10 Seconds
            </span>
          </h1>

          {/* Simple Subhead */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            AI for MSMEs. Start free. Grow as you grow. No consultants. No delays.
          </p>

          {/* Single CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="gap-2 px-8 py-6 text-lg"
              onClick={() => navigate('/?onboarding=true')}
            >
              <Sparkles className="w-5 h-5" />
              Start Free – 90 Days
            </Button>
          </motion.div>

          {/* Inline Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-4 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              No Credit Card
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              10,000+ MSMEs
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              ISO 27001 Certified
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
