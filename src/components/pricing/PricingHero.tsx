import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Shield, Bot } from "lucide-react";
import { motion } from "framer-motion";

export const PricingHero = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">90-Day Free Trial Available</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Fund a Better Planet,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-hero">
              Pay Only For What You Use
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with our 90-day free trial. No credit card required. Scale sustainably with pay-as-you-go pricing.
          </p>

          {/* Quick Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
          >
            {[
              { icon: Zap, text: "Setup < 90 Seconds", color: "text-accent" },
              { icon: Shield, text: "Bank-Grade Security", color: "text-success" },
              { icon: Bot, text: "AI-Powered Insights", color: "text-primary" },
              { icon: Sparkles, text: "No Hidden Fees", color: "text-warning" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-4 pt-6">
            <Button size="lg" className="gap-2">
              Start Free Trial
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            ✓ No credit card required • ✓ 10,000+ MSMEs trust us • ✓ ISO 27001 Certified
          </p>
        </div>
      </motion.div>
    </section>
  );
};
