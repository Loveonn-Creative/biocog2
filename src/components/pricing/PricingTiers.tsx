import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Check, Sparkles, Zap, Crown, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const tiers = [
  {
    id: "snapshot",
    name: "Biocog Snapshot",
    tagline: "Forever Free",
    originalPrice: null,
    price: 0,
    period: "forever",
    description: "Get started with climate insights",
    icon: Sparkles,
    punchline: "Good for getting started.",
    features: [
      "AI Emission Snapshot (Scope 1-3)",
      "Basic ESG Score",
      "10 Invoice Scans/month",
      "90-day Data Backup",
      "Voice AI (Lite)",
      "Help Center Support"
    ],
    cta: "Start Free",
    popular: false,
    color: "accent"
  },
  {
    id: "basic",
    name: "Biocog Basic",
    tagline: "Launch Price",
    originalPrice: 1999,
    price: 499,
    period: "/month",
    description: "Less than ₹17/day",
    icon: Zap,
    punchline: "You pay ₹499 to unlock thousands in savings.",
    features: [
      "Everything in Snapshot",
      "Full GST→Carbon Automation",
      "Verified Climate Score",
      "Green Loan Eligibility Check",
      "Government Incentives Finder",
      "AI Savings Insights",
      "3 Team Members",
      "Email Support"
    ],
    cta: "Unlock Savings",
    popular: false,
    color: "primary"
  },
  {
    id: "pro",
    name: "Biocog Pro",
    tagline: "Most Popular",
    originalPrice: 9999,
    price: 4999,
    period: "/month",
    description: "Makes money, not costs",
    icon: Crown,
    punchline: "Biocog Pro doesn't cost money – it makes money.",
    features: [
      "Everything in Basic",
      "Carbon Monetization Setup",
      "Automated ESG Reports (PDF)",
      "Bank-grade Verification Ledger",
      "Predictive AI Models",
      "Priority Green Finance Access",
      "10 Team Members",
      "Phone + Email Support"
    ],
    cta: "Start Earning",
    popular: true,
    color: "primary"
  },
  {
    id: "scale",
    name: "Biocog Scale",
    tagline: "Pay As You Grow",
    originalPrice: null,
    price: 15000,
    period: "/month",
    description: "Built for scale, priced for flexibility",
    icon: Building2,
    punchline: "Custom workflows and larger teams.",
    features: [
      "Everything in Pro",
      "Real-time MRV Pipeline",
      "Multi-entity Support",
      "API & Integrations",
      "SBTi-ready Projections",
      "Dedicated Onboarding",
      "Priority SLA",
      "Unlimited Team Members"
    ],
    cta: "Talk to Sales",
    popular: false,
    color: "accent",
    hasCalculator: true
  }
];

export const PricingTiers = () => {
  const [employeeCount, setEmployeeCount] = useState([10]);
  const navigate = useNavigate();

  const calculateScalePrice = (employees: number) => {
    const basePrice = 15000;
    const perEmployee = 99;
    return basePrice + (employees * perEmployee);
  };

  const handlePlanSelection = (planId: string) => {
    switch (planId) {
      case 'snapshot':
        navigate('/?onboarding=true');
        toast.success('Starting your free account!');
        break;
      case 'basic':
      case 'pro':
        navigate('/auth');
        toast.info('Sign in to activate your plan');
        break;
      case 'scale':
        navigate('/about');
        toast.info('Our team will contact you shortly');
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            const isScale = tier.id === 'scale';
            const displayPrice = isScale ? calculateScalePrice(employeeCount[0]) : tier.price;
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <Card className={`p-6 h-full flex flex-col ${
                  tier.popular 
                    ? 'border-2 border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
                    : 'border border-border'
                }`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4">
                      Most Popular
                    </Badge>
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl ${
                      tier.popular 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground">{tier.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    {tier.originalPrice && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg text-muted-foreground line-through">
                          ₹{tier.originalPrice.toLocaleString()}
                        </span>
                        <Badge variant="secondary" className="text-xs bg-success/10 text-success">
                          {Math.round((1 - tier.price / tier.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-bold text-foreground">
                        ₹{displayPrice.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm">{tier.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                  </div>

                  {/* Employee Calculator for Scale */}
                  {isScale && (
                    <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Team Size</span>
                        <span className="font-medium text-foreground">{employeeCount[0]} employees</span>
                      </div>
                      <Slider
                        value={employeeCount}
                        onValueChange={setEmployeeCount}
                        min={5}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Base ₹15,000 + ₹99/employee
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button 
                    className={`w-full mb-4 ${
                      tier.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                    }`}
                    variant={tier.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => handlePlanSelection(tier.id)}
                  >
                    {tier.cta}
                  </Button>

                  {/* Punchline */}
                  <p className="text-xs text-center text-muted-foreground mb-4 italic">
                    "{tier.punchline}"
                  </p>

                  {/* Features */}
                  <div className="space-y-2.5 flex-1">
                    {tier.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
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
