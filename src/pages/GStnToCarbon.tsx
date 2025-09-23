import { Layout } from "@/components/Layout";
import { GStnHeroSection } from "@/components/GStnHeroSection";
import { InteractiveFlowchart } from "@/components/InteractiveFlowchart";
import { CarbonCalculator } from "@/components/CarbonCalculator";
import { TechnicalDeepDive } from "@/components/TechnicalDeepDive";
import { BlockchainVisualization } from "@/components/BlockchainVisualization";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const GStnToCarbon = () => {
  return (
    <Layout title="GSTN → Carbon Credits">
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <GStnHeroSection />
        
        {/* Interactive Flowchart */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                The <span className="bg-gradient-hero bg-clip-text text-transparent">Proprietary Pipeline</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From raw GST invoice data to verified carbon credits in three intelligent layers
              </p>
            </div>
            <InteractiveFlowchart />
          </div>
        </section>

        {/* Live Calculator Demo */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Live <span className="text-primary">Calculation Engine</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how we transform GST data into carbon credits in real-time
              </p>
            </div>
            <CarbonCalculator />
          </div>
        </section>

        {/* Technical Deep Dive */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Technical <span className="text-accent">Architecture</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Deep dive into each layer of our proprietary calculation engine
              </p>
            </div>
            <TechnicalDeepDive />
          </div>
        </section>

        {/* Blockchain Verification */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Blockchain <span className="text-success">Verification</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Immutable, auditable records for complete transparency
              </p>
            </div>
            <BlockchainVisualization />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-card border border-border rounded-3xl p-12 shadow-card">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your GST Data?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start converting your business transactions into verified carbon credits today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/reports">
                  <Button className="btn-hero gap-2">
                    <FileText className="w-5 h-5" />
                    View ESG Reports
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="btn-ghost-hero">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default GStnToCarbon;