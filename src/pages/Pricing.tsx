import { Layout } from "@/components/Layout";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { TrustSignals } from "@/components/pricing/TrustSignals";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";

const Pricing = () => {
  return (
    <Layout title="Pricing">
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
        <PricingHero />
        <PricingTiers />
        <TrustSignals />
        <PricingFAQ />
      </div>
    </Layout>
  );
};

export default Pricing;
