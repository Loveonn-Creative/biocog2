import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Smartphone, 
  CreditCard, 
  Zap, 
  Shield,
  Award,
  CheckCircle,
  ArrowUp,
  Eye
} from "lucide-react";

export const GreenCreditScore = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  const creditScore = {
    overall: 847,
    grade: "A+",
    factors: {
      gstData: { score: 92, weight: 30 },
      digitalPayments: { score: 88, weight: 25 },
      esgPractices: { score: 85, weight: 25 },
      utilityBills: { score: 79, weight: 20 }
    },
    trends: {
      thisMonth: +12,
      lastMonth: +8,
      threeMonths: +25
    }
  };

  const paymentHistory = [
    { method: "UPI", frequency: "Daily", amount: "₹1.2L", reliability: 98 },
    { method: "Mobile Wallet", frequency: "Weekly", amount: "₹45K", reliability: 95 },
    { method: "Net Banking", frequency: "Monthly", amount: "₹2.5L", reliability: 99 },
    { method: "Cards", frequency: "Occasional", amount: "₹30K", reliability: 87 }
  ];

  const esgMetrics = [
    { category: "Environmental", score: 87, trend: "+5", icon: "🌱" },
    { category: "Social", score: 82, trend: "+3", icon: "👥" },
    { category: "Governance", score: 91, trend: "+7", icon: "⚖️" }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return "bg-success/20";
    if (score >= 80) return "bg-primary/20";
    if (score >= 70) return "bg-warning/20";
    return "bg-destructive/20";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Main Score Display */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 p-8 text-center bg-gradient-card border-2 shadow-soft">
          <div className="space-y-6">
            <div>
              <div className="text-6xl font-bold text-primary mb-2">{creditScore.overall}</div>
              <Badge variant="default" className="bg-success/20 text-success text-lg px-4 py-2">
                Grade {creditScore.grade}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Excellent Credit</h3>
              <p className="text-sm text-muted-foreground">
                You qualify for premium rates and higher credit limits
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <ArrowUp className="w-4 h-4 text-success" />
                <span className="font-semibold text-success">+{creditScore.trends.thisMonth} points</span>
              </div>
              <div className="text-sm text-muted-foreground">This month</div>
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Bank Grade</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Verified</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Score Breakdown</h3>
            
            <div className="space-y-6">
              {Object.entries(creditScore.factors).map(([key, factor]) => {
                const labels = {
                  gstData: "GST Transaction Data",
                  digitalPayments: "Digital Payment History", 
                  esgPractices: "ESG Practices",
                  utilityBills: "Utility & Operating Bills"
                };
                
                return (
                  <div key={key} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{labels[key]}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold ${getScoreColor(factor.score)}`}>
                          {factor.score}/100
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {factor.weight}% weight
                        </Badge>
                      </div>
                    </div>
                    <Progress value={factor.score} className="h-3" />
                    <div className="text-xs text-muted-foreground">
                      Contributing {Math.round(factor.score * factor.weight / 100)} points to overall score
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">Score Trends</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-success">+{creditScore.trends.thisMonth}</div>
                  <div className="text-muted-foreground">This Month</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-primary">+{creditScore.trends.lastMonth}</div>
                  <div className="text-muted-foreground">Last Month</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-accent">+{creditScore.trends.threeMonths}</div>
                  <div className="text-muted-foreground">3 Months</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Analysis Tabs */}
      <Card className="p-8">
        <div className="space-y-6">
          <div className="flex space-x-1 bg-muted/50 rounded-lg p-1">
            <Button 
              variant={selectedTab === "overview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("overview")}
            >
              Overview
            </Button>
            <Button 
              variant={selectedTab === "payments" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("payments")}
            >
              Digital Payments
            </Button>
            <Button 
              variant={selectedTab === "esg" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("esg")}
            >
              ESG Metrics
            </Button>
          </div>

          {selectedTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Credit Strengths</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-muted-foreground">Consistent GST filing history</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-muted-foreground">High digital payment adoption</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-muted-foreground">Strong ESG compliance track record</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-muted-foreground">Regular utility payment history</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Improvement Areas</h4>
                <div className="space-y-3">
                  <div className="bg-warning/10 rounded-lg p-3">
                    <div className="font-medium text-warning mb-1">Utility Bill Optimization</div>
                    <div className="text-sm text-muted-foreground">
                      Reduce energy consumption by 15% to improve score by 8-12 points
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <div className="font-medium text-primary mb-1">ESG Certification</div>
                    <div className="text-sm text-muted-foreground">
                      Obtain ISO 14001 certification for 20+ point boost
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "payments" && (
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground">Digital Payment Analysis</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {paymentHistory.map((payment, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {payment.method === "UPI" && <Smartphone className="w-5 h-5 text-primary" />}
                        {payment.method === "Mobile Wallet" && <CreditCard className="w-5 h-5 text-success" />}
                        {payment.method === "Net Banking" && <Shield className="w-5 h-5 text-info" />}
                        {payment.method === "Cards" && <CreditCard className="w-5 h-5 text-warning" />}
                        <span className="font-medium text-foreground">{payment.method}</span>
                      </div>
                      <Badge variant="secondary" className={getScoreBackground(payment.reliability)}>
                        {payment.reliability}%
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frequency:</span>
                        <span className="text-foreground">{payment.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Volume:</span>
                        <span className="text-foreground">{payment.amount}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "esg" && (
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground">ESG Performance Metrics</h4>
              <div className="grid md:grid-cols-3 gap-6">
                {esgMetrics.map((metric, index) => (
                  <Card key={index} className="p-6 text-center">
                    <div className="text-4xl mb-3">{metric.icon}</div>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-foreground">{metric.category}</h5>
                      <div className="text-2xl font-bold text-primary">{metric.score}/100</div>
                      <div className="flex items-center justify-center space-x-1">
                        <ArrowUp className="w-3 h-3 text-success" />
                        <span className="text-sm text-success">{metric.trend} this quarter</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-success/10 to-accent/10 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Eye className="w-5 h-5 text-success" />
                  <span className="font-semibold text-foreground">ESG Impact Summary</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-foreground mb-1">Environmental</div>
                    <div className="text-muted-foreground">25% reduction in carbon footprint this year</div>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Social</div>
                    <div className="text-muted-foreground">Supporting 12 local communities</div>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Governance</div>
                    <div className="text-muted-foreground">100% transparent reporting practices</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};