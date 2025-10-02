import { Shield, Lock, Award, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const trustBadges = [
  {
    icon: Shield,
    title: "256-bit SSL Encryption",
    description: "Your data is secured with bank-grade encryption"
  },
  {
    icon: Award,
    title: "ISO 27001 Certified",
    description: "International security management standards"
  },
  {
    icon: Lock,
    title: "PCI DSS Compliant",
    description: "Secure payment processing standards"
  },
  {
    icon: TrendingUp,
    title: "RBI Guidelines",
    description: "Fully compliant with Indian banking regulations"
  }
];

const stats = [
  { value: "10,247", label: "MSMEs using Biocog" },
  { value: "₹4.2Cr+", label: "Carbon Credits earned" },
  { value: "2.3M+", label: "Invoices scanned" },
  { value: "99.9%", label: "Uptime guarantee" }
];

export const TrustSignals = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Security Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Trusted & Secure Platform
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-6 text-center h-full hover:border-primary/50 transition-colors">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{badge.title}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 bg-gradient-card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-hero mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
