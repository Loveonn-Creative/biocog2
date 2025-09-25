import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  TrendingUp, 
  CreditCard, 
  Shield, 
  ChevronRight,
  Banknote,
  Target,
  Zap
} from "lucide-react";

export const GreenLendingHero = () => {
  const [stats] = useState({
    totalLoans: "₹1.2B+",
    avgRate: "8.5%",
    carbonSaved: "45,000",
    approval: "96%"
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 pt-20 px-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-success/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <Badge variant="secondary" className="mb-4 animate-scale-in">
                🌱 AI-Powered Green Finance Platform
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Fund a <span className="bg-gradient-hero bg-clip-text text-transparent">Better Planet</span>
                <br />
                with Green Loans
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Transform your GST invoices into instant green loan approvals. 
                Every loan generates verified carbon credits, turning sustainability into profitability.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalLoans}</div>
                <div className="text-sm text-muted-foreground">Loans Disbursed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{stats.avgRate}</div>
                <div className="text-sm text-muted-foreground">Avg Interest</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{stats.carbonSaved}</div>
                <div className="text-sm text-muted-foreground">Tons CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{stats.approval}</div>
                <div className="text-sm text-muted-foreground">Approval Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-hero gap-2 group hover-scale"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <CreditCard className="w-5 h-5" />
                Calculate My Loan
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="btn-ghost-hero gap-2">
                <Leaf className="w-5 h-5" />
                How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Bank Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">RBI Approved</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="space-y-6 animate-fade-in delay-300">
            {/* Main Demo Card */}
            <Card className="p-8 bg-gradient-card border-2 shadow-soft">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">Live Demo</h3>
                  <Badge variant="default" className="bg-success/20 text-success">
                    Real-time
                  </Badge>
                </div>

                {/* Invoice Processing */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">GST Invoice Analysis</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="text-sm text-muted-foreground">Processing Ramesh Textiles invoice...</div>
                </div>

                {/* Loan Calculation */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Business Revenue:</span>
                    <span className="font-semibold text-foreground">₹45,00,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ESG Score:</span>
                    <span className="font-semibold text-success">87/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Green Credit Score:</span>
                    <span className="font-semibold text-primary">A+</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">Approved Loan:</span>
                      <span className="text-xl font-bold text-primary">₹12,00,000</span>
                    </div>
                    <div className="text-xs text-muted-foreground">@ 8.2% interest</div>
                  </div>
                </div>

                {/* Carbon Credits Preview */}
                <div className="bg-gradient-to-r from-success/10 to-accent/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="w-4 h-4 text-success" />
                    <span className="font-medium text-success">Carbon Credits Generated</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">+245 Credits</div>
                  <div className="text-sm text-muted-foreground">Worth ₹18,375 in green incentives</div>
                </div>
              </div>
            </Card>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 hover-scale cursor-pointer">
                <div className="space-y-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h4 className="font-semibold text-foreground">AI Credit Scoring</h4>
                  <p className="text-sm text-muted-foreground">Advanced ML algorithms</p>
                </div>
              </Card>
              <Card className="p-4 hover-scale cursor-pointer">
                <div className="space-y-2">
                  <Banknote className="w-6 h-6 text-success" />
                  <h4 className="font-semibold text-foreground">Instant Approval</h4>
                  <p className="text-sm text-muted-foreground">Under 5 minutes</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};