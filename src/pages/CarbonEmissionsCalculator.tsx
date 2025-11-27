import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, ArrowRight, Zap, Factory, TrendingUp } from "lucide-react";
import { toast } from "sonner";

// Emission factors based on ISO 14064-1, GHG Protocol, BEE, IPCC
const FUEL_FACTORS = {
  diesel: 2.68,
  petrol: 2.31,
  lpg: 2.98,
  natural_gas: 2.0,
  coal: 2.42,
};

const GRID_FACTORS = {
  maharashtra: 0.82,
  tamil_nadu: 0.74,
  karnataka: 0.68,
  gujarat: 0.85,
  uttar_pradesh: 0.91,
  delhi: 0.88,
  west_bengal: 0.89,
  rajasthan: 0.81,
  telangana: 0.78,
  kerala: 0.65,
  punjab: 0.75,
  haryana: 0.83,
  international: 0.45,
};

const SCOPE3_FACTORS = {
  purchased_goods: 0.5,
  logistics: 0.1,
  waste: 0.7,
};

const CCTS_RATE = 2800; // ₹ per tCO2e
const MSME_PREMIUM = {
  manufacturing: 1.12,
  agriculture: 1.15,
  services: 1.08,
  trading: 1.10,
  other: 1.05,
};

const CarbonEmissionsCalculator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fuelType: "diesel",
    fuelQuantity: "",
    electricity: "",
    purchasedGoods: "",
    logistics: "",
    waste: "",
    region: "maharashtra",
    businessType: "manufacturing",
  });

  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateEmissions = () => {
    setIsCalculating(true);

    // Validate inputs
    if (!formData.fuelQuantity && !formData.electricity && !formData.purchasedGoods) {
      toast.error("Please enter at least one emission source");
      setIsCalculating(false);
      return;
    }

    // Scope 1: Direct emissions from fuel combustion
    const scope1 = (parseFloat(formData.fuelQuantity) || 0) * FUEL_FACTORS[formData.fuelType as keyof typeof FUEL_FACTORS];

    // Scope 2: Indirect emissions from electricity
    const scope2 = (parseFloat(formData.electricity) || 0) * GRID_FACTORS[formData.region as keyof typeof GRID_FACTORS];

    // Scope 3: Other indirect emissions
    const scope3Goods = ((parseFloat(formData.purchasedGoods) || 0) * SCOPE3_FACTORS.purchased_goods) / 1000;
    const scope3Logistics = (parseFloat(formData.logistics) || 0) * SCOPE3_FACTORS.logistics;
    const scope3Waste = (parseFloat(formData.waste) || 0) * SCOPE3_FACTORS.waste;
    const scope3 = scope3Goods + scope3Logistics + scope3Waste;

    // Total emissions in tCO2e
    const total = (scope1 + scope2 + scope3) / 1000;

    // Carbon credit value with MSME premium
    const premium = MSME_PREMIUM[formData.businessType as keyof typeof MSME_PREMIUM];
    const creditValue = total * CCTS_RATE * premium * 1.08; // 1.08 = blockchain verification bonus

    setResults({
      scope1: (scope1 / 1000).toFixed(3),
      scope2: (scope2 / 1000).toFixed(3),
      scope3: (scope3 / 1000).toFixed(3),
      total: total.toFixed(3),
      creditValue: Math.round(creditValue),
      esgScore: Math.min(100, Math.max(0, 100 - (total * 10))),
    });

    setIsCalculating(false);
  };

  const handleSendToPipeline = () => {
    if (!results) return;
    sessionStorage.setItem('carbonCalculation', JSON.stringify({
      ...results,
      region: formData.region,
      businessType: formData.businessType,
      source: 'scope-calculator'
    }));
    toast.success("Data sent to pipeline");
    navigate('/gstn-carbon?prefill=true');
  };

  const handleUseForLoan = () => {
    if (!results) return;
    sessionStorage.setItem('carbonESG', JSON.stringify({
      carbonCredits: parseFloat(results.total),
      creditValue: results.creditValue,
      esgScore: results.esgScore,
      source: 'scope-calculator'
    }));
    toast.success("ESG data prepared");
    navigate('/green-lending?carbon=true');
  };

  return (
    <Layout title="Carbon Calculator">
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 safe-area-bottom">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-2xl mb-4">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Scope 1•2•3 Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Know your carbon footprint in 30 seconds
            </p>
            <Badge variant="secondary" className="text-xs">
              ISO 14064-1 • GHG Protocol • BEE • CCTS
            </Badge>
          </div>

          {/* Input Form */}
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Factory className="w-5 h-5 text-primary" />
                Scope 1: Direct Emissions
              </CardTitle>
              <CardDescription>Fuel combustion & process emissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select value={formData.fuelType} onValueChange={(val) => handleInputChange('fuelType', val)}>
                    <SelectTrigger id="fuelType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="lpg">LPG</SelectItem>
                      <SelectItem value="natural_gas">Natural Gas</SelectItem>
                      <SelectItem value="coal">Coal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelQuantity">Quantity/Month</Label>
                  <Input
                    id="fuelQuantity"
                    type="number"
                    placeholder="L/kg/m³"
                    value={formData.fuelQuantity}
                    onChange={(e) => handleInputChange('fuelQuantity', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-warning" />
                Scope 2: Electricity
              </CardTitle>
              <CardDescription>Grid electricity consumption</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="electricity">Monthly Consumption (kWh)</Label>
                <Input
                  id="electricity"
                  type="number"
                  placeholder="Enter kWh"
                  value={formData.electricity}
                  onChange={(e) => handleInputChange('electricity', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-info" />
                Scope 3: Supply Chain
              </CardTitle>
              <CardDescription>Purchased goods, logistics & waste</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchasedGoods">Purchased Goods (₹/month)</Label>
                <Input
                  id="purchasedGoods"
                  type="number"
                  placeholder="Material value"
                  value={formData.purchasedGoods}
                  onChange={(e) => handleInputChange('purchasedGoods', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logistics">Logistics (km/month)</Label>
                  <Input
                    id="logistics"
                    type="number"
                    placeholder="Distance"
                    value={formData.logistics}
                    onChange={(e) => handleInputChange('logistics', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waste">Waste (kg/month)</Label>
                  <Input
                    id="waste"
                    type="number"
                    placeholder="Quantity"
                    value={formData.waste}
                    onChange={(e) => handleInputChange('waste', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={formData.region} onValueChange={(val) => handleInputChange('region', val)}>
                    <SelectTrigger id="region">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="uttar_pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="west_bengal">West Bengal</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="telangana">Telangana</SelectItem>
                      <SelectItem value="kerala">Kerala</SelectItem>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(val) => handleInputChange('businessType', val)}>
                    <SelectTrigger id="businessType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="trading">Trading</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={calculateEmissions}
            disabled={isCalculating}
            className="w-full h-12 text-lg font-semibold bg-gradient-button shadow-[var(--shadow-button)] hover:scale-105 transition-transform"
          >
            {isCalculating ? "Calculating..." : "Calculate Emissions"}
            <Calculator className="ml-2 w-5 h-5" />
          </Button>

          {/* Results */}
          {results && (
            <Card className="mt-8 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Your Carbon Footprint</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-hero rounded-xl p-6 text-center text-white">
                  <div className="text-5xl font-bold mb-2">{results.total}</div>
                  <div className="text-lg opacity-90">tCO₂e per month</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Scope 1 (Direct)</span>
                    <span className="font-bold">{results.scope1} tCO₂e</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Scope 2 (Electricity)</span>
                    <span className="font-bold">{results.scope2} tCO₂e</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Scope 3 (Supply Chain)</span>
                    <span className="font-bold">{results.scope3} tCO₂e</span>
                  </div>
                </div>

                <Separator />

                <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Indicative Credit Value</div>
                  <div className="text-3xl font-bold text-success">₹{results.creditValue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">with MSME premium + blockchain verification</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={handleSendToPipeline}
                    variant="outline"
                    className="w-full"
                  >
                    Send to Pipeline
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleUseForLoan}
                    className="w-full bg-gradient-button"
                  >
                    Use for Loan
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* MVR Info */}
          <Card className="mt-6 bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-xs font-semibold text-primary">MVR: Measurement → Verification → Reporting</div>
                <p className="text-sm text-muted-foreground">
                  Calculated using ISO 14064-1 and GHG Protocol standards. 
                  Grid factors from India BEE/CEA. Pricing based on India CCTS.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CarbonEmissionsCalculator;
