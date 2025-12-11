import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Do I need climate knowledge?",
    answer: "No. Biocog does the thinking. You just scan your invoices."
  },
  {
    question: "Is this for small businesses?",
    answer: "Yes! Built specifically for MSMEs. From single-person shops to 500-employee factories."
  },
  {
    question: "Can I earn money from this?",
    answer: "Yes. Through verified carbon credits and cheaper green loans."
  },
  {
    question: "Can I switch plans anytime?",
    answer: "Yes. Upgrade, downgrade, or cancel anytime. No lock-in."
  },
  {
    question: "What happens after my free trial?",
    answer: "You keep free features forever. Only pay to unlock more."
  },
  {
    question: "How is this different from expensive consultants?",
    answer: "We automate what consultants charge lakhs for. You get results in seconds, not months."
  }
];

export const PricingFAQ = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
            Questions?
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Simple answers for busy business owners
          </p>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <AccordionItem 
                  value={`item-${idx}`}
                  className="border border-border rounded-lg px-4 bg-card hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-medium text-foreground text-sm md:text-base">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
