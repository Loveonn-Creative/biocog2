import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does the 90-day free trial work?",
    answer: "Start using Biocog immediately with our 90-day free trial. No credit card required. You get access to basic features including 10 invoice scans per month, basic carbon tracking, and ESG report previews. After 90 days, you can upgrade to pay-as-you-go or continue with limited free features."
  },
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and you'll only pay for what you use. No long-term contracts or cancellation fees."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, Net Banking, and digital wallets. All payments are processed securely through our PCI DSS compliant payment gateway."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bank-grade 256-bit SSL encryption, are ISO 27001 certified, and fully comply with RBI guidelines. Your data is stored securely and never shared with third parties."
  },
  {
    question: "What happens after my trial ends?",
    answer: "After your 90-day trial, you can choose to upgrade to our pay-as-you-go plan for full features, or continue with limited free features. We'll send you reminders before your trial ends."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team for a full refund."
  }
];

export const PricingFAQ = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Everything you need to know about pricing and plans
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${idx}`}
                  className="border border-border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
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
