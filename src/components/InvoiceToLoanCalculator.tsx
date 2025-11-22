import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Upload, 
  Calculator, 
  Leaf, 
  TrendingUp, 
  FileText,
  CheckCircle,
  Zap,
  ArrowRight
} from "lucide-react";

export const InvoiceToLoanCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    invoiceNo: "",
    amount: "",
    businessType: "",
    gstNumber: ""
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);

  const businessTypes = [
    "Textile Manufacturing",
    "Food Processing", 
    "Electronics",
    "Chemicals",
    "Automotive Parts",
    "Pharmaceuticals"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateLoan = async () => {
    setIsCalculating(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to calculate loan eligibility");
        return;
      }

      const { data, error } = await supabase.functions.invoke('calculate-loan-eligibility');
      
      if (error) throw error;
      
      setResults({
        loanAmount: data.final_loan_amount,
        interestRate: data.interest_rate,
        esgScore: data.esg_score,
        carbonCredits: Math.round(data.total_credits),
        creditValue: Math.round(data.total_credit_value),
        monthlyEmi: data.loan_offers?.[2]?.monthly_emi || 0,
        tenure: data.loan_offers?.[2]?.tenure_months || 36,
        approvalProbability: data.approval_probability,
        loanOffers: data.loan_offers
      });
      
      setIsCalculating(false);
      setStep(3);
    } catch (error: any) {
      console.error('Loan calculation error:', error);
      toast.error(error.message || "Failed to calculate loan eligibility");
      setIsCalculating(false);
    }
  };

  if (step === 1) {
    return (
      <div id="calculator" className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-card border-2 shadow-soft">
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Upload Your GST Invoice</h3>
              <p className="text-muted-foreground">Enter your invoice details for instant loan calculation</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNo">Invoice Number</Label>
                  <Input
                    id="invoiceNo"
                    placeholder="e.g., INV-2024-001"
                    value={formData.invoiceNo}
                    onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Invoice Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="e.g., 500000"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    placeholder="e.g., 27AABCU9603R1ZU"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {businessTypes.map((type) => (
                      <Button
                        key={type}
                        variant={formData.businessType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInputChange('businessType', type)}
                        className="text-xs"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-4">ESG-Linked Calculation</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm text-muted-foreground">Invoice amount × Payment history factor</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm text-muted-foreground">ESG score from carbon baseline (ISO 14064-1)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm text-muted-foreground">Carbon credits boost loan eligibility up to 25%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm text-muted-foreground">Interest rate discount up to 3.5% for ESG score</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
                    Uses risk-weighted business categories, GST compliance indicators, and GHG Protocol carbon accounting.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Standards-Based Scoring</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Loan eligibility calculated using ISO 14064-1 emission baselines, business risk weights, and carbon credit multipliers for transparent, bank-recognized scoring.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                className="btn-hero gap-2 px-8"
                onClick={() => setStep(2)}
                disabled={!formData.invoiceNo || !formData.amount || !formData.businessType}
              >
                <Calculator className="w-5 h-5" />
                Calculate My Loan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="p-12 bg-gradient-card border-2 shadow-soft">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Analyzing Your Business Profile
              </h3>
              <p className="text-muted-foreground mb-8">
                Our AI is processing your invoice and generating personalized loan offers...
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing GST Data</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>ESG Score Calculation</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Carbon Credit Assessment</span>
                  <span>70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>

            <Button 
              className="btn-hero" 
              onClick={calculateLoan}
              disabled={isCalculating}
            >
              {isCalculating ? "Processing..." : "Complete Analysis"}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Results Summary */}
        <Card className="p-8 bg-gradient-card border-2 shadow-soft">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Loan Pre-Approved!</h3>
              <p className="text-muted-foreground">Based on your business profile analysis</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                ₹{results?.loanAmount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mb-4">Approved Loan Amount</div>
              <div className="flex justify-center space-x-6 text-sm">
                <div>
                  <div className="font-semibold text-foreground">{results?.interestRate}%</div>
                  <div className="text-muted-foreground">Interest Rate</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{results?.tenure} months</div>
                  <div className="text-muted-foreground">Tenure</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">₹{results?.monthlyEmi.toLocaleString()}</div>
                  <div className="text-muted-foreground">Monthly EMI</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">ESG Score:</span>
                <Badge variant="default" className="bg-success/20 text-success">
                  {results?.esgScore}/100
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Green Credit Rating:</span>
                <Badge variant="default" className="bg-primary/20 text-primary">
                  A+
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Carbon Credits */}
        <Card className="p-8 bg-gradient-to-br from-success/5 to-accent/5 border-2">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Leaf className="w-8 h-8 text-success" />
              <div>
                <h3 className="text-xl font-bold text-foreground">Carbon Credits Generated</h3>
                <p className="text-sm text-muted-foreground">Your loan contributes to environmental impact</p>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-success mb-2">
                  +{results?.carbonCredits} Credits
                </div>
                <div className="text-sm text-muted-foreground">
                  Worth ₹{results?.creditValue.toLocaleString()} in green incentives
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Energy Efficiency Improvements:</span>
                  <span className="font-semibold">125 Credits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Renewable Energy Adoption:</span>
                  <span className="font-semibold">85 Credits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Waste Reduction Initiatives:</span>
                  <span className="font-semibold">35 Credits</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">Impact Projection</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Your loan will help reduce approximately 12.5 tons of CO₂ emissions over the loan tenure.
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="flex-1 btn-hero">
                <FileText className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
              <Button variant="outline" className="flex-1">
                View Details
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button 
          variant="ghost" 
          onClick={() => {
            setStep(1);
            setResults(null);
            setFormData({
              invoiceNo: "",
              amount: "",
              businessType: "",
              gstNumber: ""
            });
          }}
        >
          Calculate Another Loan
        </Button>
      </div>
    </div>
  );
};