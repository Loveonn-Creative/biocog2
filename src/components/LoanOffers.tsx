import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  IndianRupee,
  Award,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Eye
} from "lucide-react";

export const LoanOffers = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  
  const loanOffers = [
    {
      id: 1,
      bank: "Green Development Bank",
      type: "Green Term Loan",
      amount: 1200000,
      interestRate: 8.2,
      tenure: 24,
      monthlyEmi: 56840,
      processingFee: 0.75,
      collateral: "Not Required",
      approval: "Pre-approved",
      features: ["Carbon credit bonus", "Interest rate reduction for ESG compliance", "Flexible repayment"],
      esgBonus: 18375,
      carbonCredits: 245,
      recommendationScore: 95,
      timeToDisburse: "3-5 days",
      specialOffer: "Limited time: 0.5% rate reduction for early adopters"
    },
    {
      id: 2,
      bank: "Sustainable Finance Corp",
      type: "Working Capital Loan",
      amount: 800000,
      interestRate: 9.1,
      tenure: 18,
      monthlyEmi: 50420,
      processingFee: 1.0,
      collateral: "Not Required",
      approval: "Instant Approval",
      features: ["Overdraft facility", "Digital-first process", "Quick disbursement"],
      esgBonus: 12000,
      carbonCredits: 160,
      recommendationScore: 88,
      timeToDisburse: "24 hours",
      specialOffer: "Zero processing fee for first-time borrowers"
    },
    {
      id: 3,
      bank: "Eco-Friendly Banking Ltd",
      type: "Equipment Finance",
      amount: 1500000,
      interestRate: 8.8,
      tenure: 36,
      monthlyEmi: 47250,
      processingFee: 1.5,
      collateral: "Equipment Hypothecation",
      approval: "Conditional Approval",
      features: ["Asset-backed security", "Step-up EMI option", "Insurance coverage"],
      esgBonus: 22500,
      carbonCredits: 300,
      recommendationScore: 82,
      timeToDisburse: "7-10 days",
      specialOffer: "Free equipment insurance for first year"
    }
  ];

  const getRecommendationColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    return "text-warning";
  };

  const getRecommendationBg = (score: number) => {
    if (score >= 90) return "bg-success/20";
    if (score >= 80) return "bg-primary/20";
    return "bg-warning/20";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* AI Recommendation Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground">AI-Powered Loan Matching</h3>
            <p className="text-muted-foreground">
              Based on your GST data, ESG score, and business profile, we've found {loanOffers.length} personalized offers
            </p>
          </div>
          <Badge variant="default" className="bg-success/20 text-success">
            Live Offers
          </Badge>
        </div>
      </Card>

      {/* Loan Offers Grid */}
      <div className="space-y-6">
        {loanOffers.map((offer, index) => (
          <Card 
            key={offer.id} 
            className={`p-8 transition-all cursor-pointer ${
              index === 0 ? 'border-2 border-primary shadow-soft' : 'hover:shadow-soft'
            }`}
            onClick={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-foreground">{offer.bank}</h3>
                      {index === 0 && (
                        <Badge variant="default" className="bg-primary/20 text-primary">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{offer.type}</p>
                    {offer.specialOffer && (
                      <p className="text-sm text-warning font-medium">🎉 {offer.specialOffer}</p>
                    )}
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <Badge 
                    variant="default" 
                    className={`${getRecommendationBg(offer.recommendationScore)} ${getRecommendationColor(offer.recommendationScore)}`}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    {offer.recommendationScore}% Match
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Disbursal: {offer.timeToDisburse}
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    ₹{(offer.amount / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-muted-foreground">Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{offer.interestRate}%</div>
                  <div className="text-sm text-muted-foreground">Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{offer.tenure}</div>
                  <div className="text-sm text-muted-foreground">Months</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-info">₹{offer.monthlyEmi.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Monthly EMI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{offer.processingFee}%</div>
                  <div className="text-sm text-muted-foreground">Processing Fee</div>
                </div>
              </div>

              {/* Carbon Credits & ESG Bonus */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-success/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-4 h-4 text-success" />
                    <span className="font-semibold text-success">Carbon Credits Generated</span>
                  </div>
                  <div className="text-xl font-bold text-foreground">+{offer.carbonCredits} Credits</div>
                  <div className="text-sm text-muted-foreground">Worth ₹{offer.esgBonus.toLocaleString()} in incentives</div>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">Approval Status</span>
                  </div>
                  <div className="text-xl font-bold text-foreground">{offer.approval}</div>
                  <div className="text-sm text-muted-foreground">Collateral: {offer.collateral}</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Key Features:</h4>
                <div className="grid md:grid-cols-3 gap-2">
                  {offer.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedOffer === offer.id && (
                <div className="border-t border-border pt-6 space-y-6 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Loan Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Principal Amount:</span>
                          <span className="text-foreground">₹{offer.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Processing Fee:</span>
                          <span className="text-foreground">₹{(offer.amount * offer.processingFee / 100).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Interest:</span>
                          <span className="text-foreground">₹{((offer.monthlyEmi * offer.tenure) - offer.amount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-foreground">Total Payable:</span>
                          <span className="text-foreground">₹{(offer.monthlyEmi * offer.tenure).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Sustainability Impact</h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-success/10 to-accent/10 rounded-lg p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-success mb-1">
                              -{Math.floor(offer.carbonCredits * 0.05)} tons
                            </div>
                            <div className="text-sm text-muted-foreground">CO₂ Reduction Potential</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          This loan will help fund sustainable practices that contribute to your carbon credit generation and ESG score improvement.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button className="btn-hero gap-2 flex-1">
                      <IndianRupee className="w-4 h-4" />
                      Apply for This Loan
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Compare Details
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons - Collapsed State */}
              {selectedOffer !== offer.id && (
                <div className="flex gap-4">
                  <Button className="btn-hero gap-2 flex-1">
                    <IndianRupee className="w-4 h-4" />
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOffer(offer.id);
                  }}>
                    View Details
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Comparison Summary */}
      <Card className="p-8 bg-gradient-card border-2">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Quick Comparison</h3>
            <p className="text-muted-foreground">Compare key metrics across all offers</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-foreground">Bank</th>
                  <th className="text-center py-3 text-foreground">Amount</th>
                  <th className="text-center py-3 text-foreground">Rate</th>
                  <th className="text-center py-3 text-foreground">EMI</th>
                  <th className="text-center py-3 text-foreground">Credits</th>
                  <th className="text-center py-3 text-foreground">Match</th>
                </tr>
              </thead>
              <tbody>
                {loanOffers.map((offer, index) => (
                  <tr key={offer.id} className={`border-b border-border/50 ${index === 0 ? 'bg-primary/5' : ''}`}>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{offer.bank}</span>
                        {index === 0 && <Badge variant="secondary" className="text-xs">Best</Badge>}
                      </div>
                    </td>
                    <td className="text-center py-3 text-foreground">₹{(offer.amount / 100000).toFixed(1)}L</td>
                    <td className="text-center py-3 text-foreground">{offer.interestRate}%</td>
                    <td className="text-center py-3 text-foreground">₹{offer.monthlyEmi.toLocaleString()}</td>
                    <td className="text-center py-3 text-foreground">{offer.carbonCredits}</td>
                    <td className="text-center py-3">
                      <div className={`font-semibold ${getRecommendationColor(offer.recommendationScore)}`}>
                        {offer.recommendationScore}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};