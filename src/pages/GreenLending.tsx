import { Layout } from "@/components/Layout";
import { GreenLendingHero } from "@/components/GreenLendingHero";
import { InvoiceToLoanCalculator } from "@/components/InvoiceToLoanCalculator";
import { GreenCreditScore } from "@/components/GreenCreditScore";
import { SubsidySchemes } from "@/components/SubsidySchemes";
import { LoanOffers } from "@/components/LoanOffers";
import { CarbonCreditIntegration } from "@/components/CarbonCreditIntegration";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const GreenLending = () => {
  return (
    <Layout title="Green Lending">
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <GreenLendingHero />
        
        {/* Invoice to Loan Calculator */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="bg-gradient-hero bg-clip-text text-transparent">Invoice-to-Loan</span> Calculator
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform your GST invoices into instant green loan pre-approvals with AI-powered credit scoring
              </p>
            </div>
            <InvoiceToLoanCalculator />
          </div>
        </section>

        {/* Green Credit Score */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Your <span className="text-success">Green Credit Score</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-powered ESG rating based on your GST data, digital payments, and sustainability practices
              </p>
            </div>
            <GreenCreditScore />
          </div>
        </section>

        {/* Loan Offers */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Hyper-Personalized <span className="text-primary">Loan Offers</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-generated credit lines tailored to your business sustainability profile
              </p>
            </div>
            <LoanOffers />
          </div>
        </section>

        {/* Subsidy & Government Schemes */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Government <span className="text-warning">Subsidies & Schemes</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Access CGTMSE and green finance schemes with one-click applications
              </p>
            </div>
            <SubsidySchemes />
          </div>
        </section>

        {/* Carbon Credits Integration */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Loans That Generate <span className="text-accent">Carbon Credits</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every green loan you take creates verified carbon credits, turning sustainability into profitability
              </p>
            </div>
            <CarbonCreditIntegration />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-card border border-border rounded-3xl p-12 shadow-card">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Fund Your Green Future Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of MSMEs who've unlocked sustainable financing through our AI-powered platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/reports">
                  <Button className="btn-hero gap-2">
                    <FileText className="w-5 h-5" />
                    View ESG Reports
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/gstn-carbon">
                  <Button variant="outline" className="btn-ghost-hero gap-2">
                    <TrendingUp className="w-5 h-5" />
                    See Carbon Credits
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

export default GreenLending;