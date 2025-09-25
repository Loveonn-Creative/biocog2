import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  TrendingUp, 
  ArrowRight, 
  Coins,
  Target,
  Zap,
  Award,
  BarChart3,
  ExternalLink,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

export const CarbonCreditIntegration = () => {
  const [selectedScenario, setSelectedScenario] = useState("textile");
  
  const loanScenarios = {
    textile: {
      business: "Ramesh Textiles Pvt Ltd",
      loanAmount: 1200000,
      loanPurpose: "Solar Panel Installation & Energy-Efficient Machinery",
      carbonReduction: 45.2,
      creditsGenerated: 245,
      creditValue: 18375,
      monthlyGeneration: 20,
      roiImprovement: "22%",
      paybackPeriod: "18 months",
      sectors: ["Energy Efficiency", "Renewable Energy", "Waste Reduction"]
    },
    manufacturing: {
      business: "Green Tech Manufacturing",
      loanAmount: 2500000,
      loanPurpose: "LED Lighting & Waste Heat Recovery System",
      carbonReduction: 85.7,
      creditsGenerated: 465,
      creditValue: 34875,
      monthlyGeneration: 38,
      roiImprovement: "28%",
      paybackPeriod: "14 months",
      sectors: ["Industrial Efficiency", "Circular Economy", "Clean Technology"]
    },
    food: {
      business: "Organic Foods Processing Unit",
      loanAmount: 800000,
      loanPurpose: "Biogas Plant & Organic Waste Management",
      carbonReduction: 32.1,
      creditsGenerated: 175,
      creditValue: 13125,
      monthlyGeneration: 14,
      roiImprovement: "19%",
      paybackPeriod: "22 months",
      sectors: ["Waste Management", "Renewable Energy", "Sustainable Agriculture"]
    }
  };

  const creditPipeline = [
    {
      stage: "Loan Approval",
      description: "Green loan approved with sustainability commitment",
      timeline: "Day 1",
      status: "completed",
      credits: 0
    },
    {
      stage: "Implementation",
      description: "Install sustainable equipment/practices",
      timeline: "Days 1-90",
      status: "active",
      credits: 0
    },
    {
      stage: "Verification",
      description: "IoT sensors measure actual impact",
      timeline: "Monthly",
      status: "upcoming",
      credits: 20
    },
    {
      stage: "Credit Issuance",
      description: "Blockchain-verified credits issued",
      timeline: "Monthly",
      status: "upcoming",
      credits: 20
    }
  ];

  const currentScenario = loanScenarios[selectedScenario];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Scenario Selector */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Real Business Examples</h3>
        <div className="flex justify-center gap-2">
          <Button
            variant={selectedScenario === "textile" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedScenario("textile")}
          >
            Textile Industry
          </Button>
          <Button
            variant={selectedScenario === "manufacturing" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedScenario("manufacturing")}
          >
            Manufacturing
          </Button>
          <Button
            variant={selectedScenario === "food" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedScenario("food")}
          >
            Food Processing
          </Button>
        </div>
      </div>

      {/* Main Integration Flow */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Loan Details */}
        <Card className="p-8 bg-gradient-card border-2 shadow-soft">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Coins className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Green Loan Impact</h3>
                <p className="text-sm text-muted-foreground">{currentScenario.business}</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Loan Amount:</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{(currentScenario.loanAmount / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Purpose:</strong> {currentScenario.loanPurpose}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{currentScenario.carbonReduction}</div>
                <div className="text-sm text-muted-foreground">Tons CO₂ Reduced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{currentScenario.roiImprovement}</div>
                <div className="text-sm text-muted-foreground">ROI Improvement</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Impact Sectors:</h4>
              <div className="flex flex-wrap gap-2">
                {currentScenario.sectors.map((sector, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {sector}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-success/10 to-accent/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-success" />
                <span className="font-semibold text-success">Payback Analysis</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Loan payback period reduced to <strong>{currentScenario.paybackPeriod}</strong> through carbon credit earnings
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Carbon Credits Generated */}
        <Card className="p-8 bg-gradient-to-br from-success/5 to-accent/5 border-2">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Carbon Credits Generated</h3>
                <p className="text-sm text-muted-foreground">Verified & Tradeable Assets</p>
              </div>
            </div>

            <div className="text-center bg-white/50 rounded-lg p-6">
              <div className="text-4xl font-bold text-success mb-2">
                +{currentScenario.creditsGenerated}
              </div>
              <div className="text-sm text-muted-foreground mb-4">Total Credits Generated</div>
              <div className="text-xl font-semibold text-foreground">
                Worth ₹{currentScenario.creditValue.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{currentScenario.monthlyGeneration}</div>
                <div className="text-sm text-muted-foreground">Credits/Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">₹75</div>
                <div className="text-sm text-muted-foreground">Per Credit</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Generation Progress:</span>
                <span className="text-sm font-semibold text-foreground">Month 6 of 24</span>
              </div>
              <Progress value={25} className="h-3" />
              <div className="text-xs text-muted-foreground">
                {Math.floor(currentScenario.creditsGenerated * 0.25)} credits generated so far
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">Market Value</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Credits are tradeable on major carbon exchanges at current market rates of ₹75-₹95 per credit
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Credit Generation Pipeline */}
      <Card className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Loan-to-Credit Pipeline</h3>
            <p className="text-muted-foreground">How your green loan generates verified carbon credits</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {creditPipeline.map((stage, index) => (
              <div key={index} className="text-center space-y-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                  stage.status === 'completed' ? 'bg-success/20' : 
                  stage.status === 'active' ? 'bg-primary/20' : 'bg-muted/50'
                }`}>
                  {stage.status === 'completed' && <Zap className="w-6 h-6 text-success" />}
                  {stage.status === 'active' && <TrendingUp className="w-6 h-6 text-primary" />}
                  {stage.status === 'upcoming' && <Calendar className="w-6 h-6 text-muted-foreground" />}
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{stage.stage}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{stage.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {stage.timeline}
                  </Badge>
                  {stage.credits > 0 && (
                    <div className="text-sm font-semibold text-success mt-2">
                      +{stage.credits} credits
                    </div>
                  )}
                </div>
                
                {index < creditPipeline.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-6 border-t-2 border-dashed border-border transform translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Real-time Tracking */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="p-6 text-center">
          <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-semibold text-foreground mb-2">Real-time Monitoring</h4>
          <p className="text-sm text-muted-foreground">
            IoT sensors track energy usage, emissions, and sustainability metrics 24/7
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <Award className="w-8 h-8 text-success mx-auto mb-3" />
          <h4 className="font-semibold text-foreground mb-2">Blockchain Verification</h4>
          <p className="text-sm text-muted-foreground">
            Every credit is immutably recorded and verified on blockchain for complete transparency
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <Coins className="w-8 h-8 text-warning mx-auto mb-3" />
          <h4 className="font-semibold text-foreground mb-2">Instant Monetization</h4>
          <p className="text-sm text-muted-foreground">
            Trade credits on major exchanges or use as collateral for future loans
          </p>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="p-8 bg-gradient-card border-2 text-center">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ready to Turn Sustainability into Profit?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start your green lending journey today and watch your loan generate carbon credits that reduce your overall financing costs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero gap-2">
              <Leaf className="w-4 h-4" />
              Calculate My Credits
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Link to="/gstn-carbon">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Learn More About Our Pipeline
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4 text-success" />
              <span>Verified Credits</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="w-4 h-4 text-primary" />
              <span>Real-time Tracking</span>
            </div>
            <div className="flex items-center space-x-1">
              <Coins className="w-4 h-4 text-warning" />
              <span>Instant Monetization</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};