import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, FileText, LayoutDashboard, Building, UserCheck, Zap, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const addons = [
  { icon: FileText, name: "Extra Invoice Scans", price: "₹49", unit: "per 100 scans" },
  { icon: LayoutDashboard, name: "Custom Dashboard", price: "₹999", unit: "/month" },
  { icon: Building, name: "Multi-entity Support", price: "₹1,999", unit: "/month" },
  { icon: UserCheck, name: "Expert Climate Audit", price: "₹4,999", unit: "one-time" },
  { icon: Zap, name: "Fast-track Verification", price: "₹2,999", unit: "per report" },
  { icon: Radio, name: "Real-time Data Streaming", price: "₹1,499", unit: "/month" },
];

export const PricingAddons = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">Optional</Badge>
                <span className="font-semibold text-foreground">Add-ons for Any Paid Plan</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </motion.button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {addons.map((addon, idx) => {
                      const Icon = addon.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Card className="p-4 flex items-center gap-3 hover:border-primary/50 transition-colors">
                            <div className="p-2 rounded-lg bg-muted">
                              <Icon className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{addon.name}</p>
                              <p className="text-xs text-muted-foreground">
                                <span className="font-semibold text-foreground">{addon.price}</span> {addon.unit}
                              </p>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};
