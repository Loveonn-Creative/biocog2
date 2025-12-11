import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const stats = [
  { value: "10,247", label: "MSMEs using Biocog" },
  { value: "₹4.2Cr+", label: "Carbon Credits earned" },
  { value: "2.3M+", label: "Invoices scanned" },
  { value: "99.9%", label: "Uptime guarantee" }
];

const valueProps = [
  "You don't pay for software – you pay for savings.",
  "Convert your GST, invoices, and daily work into real climate money.",
  "Enterprise-grade climate benefits – without enterprise pricing."
];

export const TrustSignals = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        {/* Value Propositions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="space-y-3">
            {valueProps.map((prop, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-lg md:text-xl text-muted-foreground"
              >
                {prop}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-muted border-border">
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
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
