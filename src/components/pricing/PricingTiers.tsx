import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";

const tiers = [
  {
    id: "freemium",
    name: "Freemium",
    tagline: "90-Day Trial",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for getting started",
    icon: Sparkles,
    features: [
      "10 invoice scans/month",
      "Basic carbon tracking",
      "ESG report preview",
      "Community support",
      "Email notifications",
      "Basic analytics"
    ],
    limitations: [
      "Limited to 10 scans",
      "No voice AI",
      "No green loans"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    id: "payg",
    name: "Pay-as-you-go",
    tagline: "Most Popular",
    price: { monthly: 499, yearly: 4788 }, // ₹499/month, 20% off yearly
    description: "Scale sustainably with your business",
    icon: Zap,
    features: [
      "Unlimited invoice scans",
      "Real-time carbon credits",
      "Full ESG reports + blockchain verification",
      "Voice AI (Hindi, English, regional languages)",
      "Green loan pre-approval",
      "Priority support (Email + WhatsApp)",
      "Advanced analytics & insights",
      "Export to multiple formats",
      "API access"
    ],
    limitations: [],
    cta: "Get Started",
    popular: true
  },
  {
    id: "enterprise",
    name: "Custom Enterprise",
    tagline: "For Growing Teams",
    price: { monthly: null, yearly: null },
    description: "Tailored for your organization",
    icon: Crown,
    features: [
      "Everything in Pay-as-you-go, plus:",
      "Multi-location support",
      "Dedicated account manager",
      "Custom integrations (ERP, SAP)",
      "White-label options",
      "SLA guarantees (99.9% uptime)",
      "Custom training sessions",
      "Priority phone support",
      "Advanced security features"
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false
  }
];

export const PricingTiers = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-primary"
          />
          <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly
          </span>
          {isYearly && (
            <Badge variant="secondary" className="ml-2">
              Save 20%
            </Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            const price = tier.price[isYearly ? 'yearly' : 'monthly'];
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative"
              >
                <Card className={`p-8 h-full flex flex-col ${
                  tier.popular 
                    ? 'border-2 border-primary shadow-lg shadow-primary/20' 
                    : 'border border-border'
                }`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      Recommended
                    </Badge>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${
                      tier.popular 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-accent/10 text-accent'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground">{tier.tagline}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    {price !== null ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-foreground">₹{price}</span>
                        <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-foreground">Custom</div>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                  </div>

                  <Button 
                    className={`w-full mb-6 ${
                      tier.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-accent hover:bg-accent/90'
                    }`}
                    size="lg"
                  >
                    {tier.cta}
                  </Button>

                  <div className="space-y-3 flex-1">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
