import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Wallet, TrendingUp, CreditCard, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface RedemptionFlowProps {
  availableCredits: number;
  currentMarketRate: number;
  onSuccess?: () => void;
}

type RedemptionStep = "select" | "details" | "confirm" | "success";
type RedemptionType = "bank_transfer" | "loan_credit" | "platform_credit";

export const RedemptionFlow = ({ availableCredits, currentMarketRate, onSuccess }: RedemptionFlowProps) => {
  const [step, setStep] = useState<RedemptionStep>("select");
  const [redemptionType, setRedemptionType] = useState<RedemptionType | null>(null);
  const [creditAmount, setCreditAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const monetaryValue = parseFloat(creditAmount || "0") * currentMarketRate;
  const minAmount = redemptionType === "bank_transfer" ? 0.4 : 0.1; // ₹1000 min for bank

  const redemptionOptions = [
    {
      type: "bank_transfer" as RedemptionType,
      title: "Bank Transfer",
      description: "Direct transfer to your verified bank account",
      icon: Wallet,
      rate: currentMarketRate,
      minCredits: 0.4,
      processingTime: "3-5 business days",
      color: "text-green-600",
    },
    {
      type: "loan_credit" as RedemptionType,
      title: "Green Loan Credit",
      description: "Use credits to reduce loan principal",
      icon: TrendingUp,
      rate: currentMarketRate,
      minCredits: 0.1,
      processingTime: "Instant",
      color: "text-blue-600",
    },
    {
      type: "platform_credit" as RedemptionType,
      title: "Platform Credits",
      description: "Use for premium features and services",
      icon: CreditCard,
      rate: currentMarketRate * 0.8, // 20% discount for platform use
      minCredits: 0.1,
      processingTime: "Instant",
      color: "text-purple-600",
    },
  ];

  const handleRedemptionTypeSelect = (type: RedemptionType) => {
    setRedemptionType(type);
    setStep("details");
  };

  const handleSubmit = async () => {
    if (!redemptionType || !creditAmount) return;

    const amount = parseFloat(creditAmount);
    if (amount < minAmount || amount > availableCredits) {
      toast({
        title: "Invalid Amount",
        description: `Please enter between ${minAmount} and ${availableCredits} credits`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Check if bank details exist for bank_transfer
      if (redemptionType === "bank_transfer") {
        const { data: profile } = await supabase
          .from("profiles")
          .select("bank_account_number, bank_verified")
          .eq("user_id", user.id)
          .single();

        if (!profile?.bank_account_number) {
          toast({
            title: "Bank Account Required",
            description: "Please add your bank account details in Profile Settings",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        if (!profile.bank_verified) {
          toast({
            title: "Verification Required",
            description: "Your bank account is pending verification",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      const { error } = await supabase.from("credit_redemptions").insert({
        user_id: user.id,
        credit_amount: amount,
        monetary_value: monetaryValue,
        redemption_type: redemptionType,
        status: "pending",
      });

      if (error) throw error;

      setStep("success");
      toast({
        title: "Redemption Requested",
        description: `Your request for ${amount} credits (₹${monetaryValue.toLocaleString("en-IN")}) is being processed`,
      });

      onSuccess?.();
    } catch (error: any) {
      console.error("Redemption error:", error);
      toast({
        title: "Redemption Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Redemption Submitted!</h3>
          <p className="text-muted-foreground text-center mb-6">
            Your request for {creditAmount} credits (₹{monetaryValue.toLocaleString("en-IN")}) is being processed
          </p>
          <Button onClick={() => { setStep("select"); setCreditAmount(""); setRedemptionType(null); }}>
            Make Another Redemption
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === "details") {
    const selectedOption = redemptionOptions.find((opt) => opt.type === redemptionType);
    if (!selectedOption) return null;

    return (
      <Card>
        <CardHeader>
          <Button variant="ghost" onClick={() => setStep("select")} className="w-fit mb-2">
            ← Back
          </Button>
          <CardTitle>Redeem Credits - {selectedOption.title}</CardTitle>
          <CardDescription>{selectedOption.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="creditAmount">Credit Amount</Label>
            <Input
              id="creditAmount"
              type="number"
              step="0.01"
              min={selectedOption.minCredits}
              max={availableCredits}
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              placeholder={`Min: ${selectedOption.minCredits} | Max: ${availableCredits}`}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Available: {availableCredits.toFixed(2)} credits
            </p>
          </div>

          {creditAmount && parseFloat(creditAmount) > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p>
                    <strong>You will receive:</strong> ₹
                    {monetaryValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </p>
                  <p>
                    <strong>Processing time:</strong> {selectedOption.processingTime}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Rate: 1 credit = ₹{selectedOption.rate.toLocaleString("en-IN")}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {redemptionType === "bank_transfer" && (
            <Alert>
              <AlertDescription>
                Funds will be transferred to your verified bank account on file. Processing takes 3-5 business
                days.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={loading || !creditAmount || parseFloat(creditAmount) < minAmount}
              className="flex-1"
            >
              {loading ? "Processing..." : "Confirm Redemption"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Select Redemption Method</h3>
        <p className="text-sm text-muted-foreground">
          Available Balance: {availableCredits.toFixed(2)} credits (≈₹
          {(availableCredits * currentMarketRate).toLocaleString("en-IN")})
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {redemptionOptions.map((option) => {
          const Icon = option.icon;
          const canRedeem = availableCredits >= option.minCredits;

          return (
            <Card
              key={option.type}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                !canRedeem ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => canRedeem && handleRedemptionTypeSelect(option.type)}
            >
              <CardHeader>
                <Icon className={`h-10 w-10 ${option.color} mb-2`} />
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription className="text-sm">{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-semibold">₹{option.rate.toLocaleString("en-IN")}/credit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Credits:</span>
                    <span>{option.minCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing:</span>
                    <span>{option.processingTime}</span>
                  </div>
                </div>
                {!canRedeem && (
                  <p className="text-xs text-destructive mt-2">
                    Need {(option.minCredits - availableCredits).toFixed(2)} more credits
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
