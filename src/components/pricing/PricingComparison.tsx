import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { name: "GST→Carbon Automation", snapshot: "Limited", basic: true, pro: true, scale: true },
  { name: "Green Loan Eligibility", snapshot: false, basic: true, pro: "Priority", scale: "Priority" },
  { name: "ESG Score", snapshot: "Basic", basic: "Verified", pro: "Verified", scale: "Certified" },
  { name: "Carbon Monetization", snapshot: false, basic: false, pro: true, scale: true },
  { name: "Reports", snapshot: "Preview", basic: "Basic", pro: "Automated", scale: "Custom" },
  { name: "Support", snapshot: "Help Center", basic: "Email", pro: "Phone + Email", scale: "Dedicated" },
  { name: "Team Members", snapshot: "1", basic: "3", pro: "10", scale: "Unlimited" },
];

const renderValue = (value: boolean | string) => {
  if (value === true) return <Check className="w-5 h-5 text-success mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
  return <span className="text-sm text-foreground">{value}</span>;
};

export const PricingComparison = () => {
  return (
    <section className="py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
            Compare Plans
          </h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center p-4 font-semibold text-foreground">Snapshot</th>
                  <th className="text-center p-4 font-semibold text-foreground">Basic</th>
                  <th className="text-center p-4 font-semibold text-primary bg-primary/5">Pro</th>
                  <th className="text-center p-4 font-semibold text-foreground">Scale</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={idx} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm text-foreground">{feature.name}</td>
                    <td className="p-4 text-center">{renderValue(feature.snapshot)}</td>
                    <td className="p-4 text-center">{renderValue(feature.basic)}</td>
                    <td className="p-4 text-center bg-primary/5">{renderValue(feature.pro)}</td>
                    <td className="p-4 text-center">{renderValue(feature.scale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-lg border border-border bg-card"
              >
                <h4 className="font-medium text-foreground mb-3">{feature.name}</h4>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">Snapshot</p>
                    {renderValue(feature.snapshot)}
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Basic</p>
                    {renderValue(feature.basic)}
                  </div>
                  <div className="bg-primary/5 rounded-md p-1">
                    <p className="text-primary mb-1">Pro</p>
                    {renderValue(feature.pro)}
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Scale</p>
                    {renderValue(feature.scale)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
