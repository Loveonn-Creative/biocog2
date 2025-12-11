import { Layout } from "@/components/Layout";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingAddons } from "@/components/pricing/PricingAddons";
import { TrustSignals } from "@/components/pricing/TrustSignals";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";

const Pricing = () => {
  return (
    <Layout title="Pricing - Biocog">
      <div className="min-h-screen bg-background">
        <PricingHero />
        <PricingTiers />
        <PricingAddons />
        <PricingComparison />
        <TrustSignals />
        <PricingFAQ />
      </div>
    </Layout>
  );
};

export default Pricing;
