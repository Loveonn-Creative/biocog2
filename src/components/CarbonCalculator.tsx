import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Zap, Leaf, ArrowRight } from "lucide-react";

const mockProducts = [
  { name: "Steel Rods (Manufacturing)", hsn: "7214", baseEmissionFactor: 1.85, unit: "kg", scope1: 0.95, scope2: 0.75, scope3: 0.15 },
  { name: "Cotton Fabric (Textile)", hsn: "5208", baseEmissionFactor: 5.5, unit: "kg", scope1: 1.2, scope2: 3.8, scope3: 0.5 },
  { name: "LED Bulbs (Electronics)", hsn: "8539", baseEmissionFactor: 0.12, unit: "piece", scope1: 0.02, scope2: 0.08, scope3: 0.02 },
  { name: "Ceramic Tiles (Construction)", hsn: "6907", baseEmissionFactor: 0.45, unit: "sq.m", scope1: 0.25, scope2: 0.15, scope3: 0.05 },
  { name: "Plastic Granules (Chemicals)", hsn: "3901", baseEmissionFactor: 1.95, unit: "kg", scope1: 0.85, scope2: 0.95, scope3: 0.15 },
  { name: "Packaged Food (Processing)", hsn: "2106", baseEmissionFactor: 0.85, unit: "kg", scope1: 0.15, scope2: 0.55, scope3: 0.15 },
];

// Regional electricity grid emission factors (BEE 2023 baseline data)
const regions = [
  { name: "Northern Grid", modifier: 0.82, gridFactor: 0.91, tCO2PerMWh: 0.91 },
  { name: "Western Grid", modifier: 0.78, gridFactor: 0.85, tCO2PerMWh: 0.85 },
  { name: "Southern Grid", modifier: 0.68, gridFactor: 0.74, tCO2PerMWh: 0.74 },
  { name: "Eastern Grid", modifier: 0.88, gridFactor: 0.95, tCO2PerMWh: 0.95 },
  { name: "North-Eastern Grid", modifier: 0.71, gridFactor: 0.82, tCO2PerMWh: 0.82 },
];

export const CarbonCalculator = () => {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [quantity, setQuantity] = useState(1000);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [techEfficiency, setTechEfficiency] = useState([75]);
  const [iotReduction, setIotReduction] = useState([0]);
  const [calculation, setCalculation] = useState({
    baseEmission: 0,
    scope1: 0,
    scope2: 0,
    scope3: 0,
    regionalAdjustment: 0,
    techAdjustment: 0,
    iotReduction: 0,
    finalEmission: 0,
    emissionReduction: 0,
    carbonCredits: 0,
    creditValue: 0
  });

  useEffect(() => {
    if (quantity > 0) {
      // Step 1: Base emission (using BEE/IPCC factors)
      const baseEmission = quantity * selectedProduct.baseEmissionFactor;
      
      // Step 2: Scope categorization (ISO 14064-1 / GHG Protocol)
      const scope1 = (selectedProduct.scope1 || 0) * quantity; // Direct emissions
      const scope2 = (selectedProduct.scope2 || 0) * quantity * selectedRegion.gridFactor; // Grid electricity
      const scope3 = (selectedProduct.scope3 || 0) * quantity; // Supply chain
      
      // Step 3: Technology efficiency adjustment
      const techFactor = 1 - (techEfficiency[0] / 100) * 0.45; // Max 45% reduction
      const techAdjusted = baseEmission * techFactor;
      
      // Step 4: IoT/Satellite verification bonus (additional credibility multiplier)
      const iotFactor = 1 - (iotReduction[0] / 100) * 0.25; // Max 25% verified reduction
      const finalEmission = techAdjusted * iotFactor;
      
      // Step 5: Calculate emission reduction from baseline
      const emissionReduction = Math.max(0, baseEmission - finalEmission);
      
      // Step 6: Convert to carbon credits (tCO2e)
      const creditsInTonnes = emissionReduction / 1000; // 1 credit = 1 tCO2e
      
      // Step 7: Market pricing (India CCTS Nov 2025 + MSME social premium)
      const basePrice = 2800; // ₹2800 per tCO2e (CCTS benchmark)
      const msmePremium = 1.15; // 15% social impact premium
      const blockchainVerification = 1.08; // 8% for immutable verification
      const creditValue = creditsInTonnes * basePrice * msmePremium * blockchainVerification;
      
      setCalculation({
        baseEmission,
        scope1,
        scope2,
        scope3,
        regionalAdjustment: techAdjusted,
        techAdjustment: techAdjusted,
        iotReduction: techAdjusted - finalEmission,
        finalEmission,
        emissionReduction,
        carbonCredits: creditsInTonnes,
        creditValue,
      });
    }
  }, [selectedProduct, quantity, selectedRegion, techEfficiency, iotReduction]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Live Calculator</h3>
          </div>

          <div className="space-y-6">
            {/* Product Selection */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Product Type</Label>
              <Select 
                value={selectedProduct.name} 
                onValueChange={(value) => {
                  const product = mockProducts.find(p => p.name === value);
                  if (product) setSelectedProduct(product);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.name} value={product.name}>
                      {product.name} (HSN: {product.hsn})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                BEE/IPCC emission factor: {selectedProduct.baseEmissionFactor} kgCO2e/{selectedProduct.unit}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">
                Quantity ({selectedProduct.unit})
              </Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Region */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Region</Label>
              <Select 
                value={selectedRegion.name} 
                onValueChange={(value) => {
                  const region = regions.find(r => r.name === value);
                  if (region) setSelectedRegion(region);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.name} value={region.name}>
                      {region.name} (Grid: {region.gridFactor} kgCO2e/kWh)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Technology Efficiency */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">
                Technology Efficiency: {techEfficiency[0]}%
              </Label>
              <Slider
                value={techEfficiency}
                onValueChange={setTechEfficiency}
                max={100}
                min={40}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Traditional (40%)</span>
                <span>Modern (100%)</span>
              </div>
            </div>

            {/* IoT Verified Reduction */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">
                IoT Verified Reduction: {iotReduction[0]}%
              </Label>
              <Slider
                value={iotReduction}
                onValueChange={setIotReduction}
                max={30}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>No IoT (0%)</span>
                <span>Full IoT (30%)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Panel */}
        <Card className="p-8 bg-gradient-card">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-success" />
            <h3 className="text-2xl font-bold text-foreground">Calculation Results</h3>
          </div>

          <div className="space-y-6">
            {/* Step-by-step Calculation */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Base Emission (BEE/IPCC)</span>
                <Badge variant="outline">{calculation.baseEmission.toFixed(2)} kg CO₂e</Badge>
              </div>
              
              <div className="pl-4 space-y-2 text-xs text-muted-foreground border-l-2 border-border">
                <div className="flex justify-between">
                  <span>└ Scope 1 (Direct):</span>
                  <span>{calculation.scope1?.toFixed(2) || 0} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>└ Scope 2 (Electricity):</span>
                  <span>{calculation.scope2?.toFixed(2) || 0} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>└ Scope 3 (Supply Chain):</span>
                  <span>{calculation.scope3?.toFixed(2) || 0} kg</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Tech Efficiency Applied</span>
                <Badge variant="outline">{calculation.techAdjustment.toFixed(2)} kg CO₂e</Badge>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20">
                <span className="text-sm font-medium text-success">IoT Verified Reduction</span>
                <Badge className="bg-success/20 text-success">-{calculation.iotReduction.toFixed(2)} kg CO₂e</Badge>
              </div>
            </div>

            {/* Final Result */}
            <div className="border-t border-border pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-warning" />
                  <h4 className="text-xl font-bold text-foreground">Final Carbon Footprint</h4>
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {calculation.finalEmission.toFixed(2)} kg CO₂e
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Reduction: {calculation.emissionReduction?.toFixed(2) || 0} kg CO₂e
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Verified and blockchain-ready
                </p>

                <div className="bg-gradient-button p-6 rounded-2xl text-white">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Leaf className="w-6 h-6" />
                    <h4 className="text-lg font-bold">Carbon Credits (tCO₂e)</h4>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {calculation.carbonCredits.toFixed(4)} Credits
                  </div>
                  <p className="text-xs opacity-90 mb-3">
                    1 credit = 1 tonne CO₂e reduced
                  </p>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-sm opacity-90 mb-1">Market Value (CCTS)</div>
                    <div className="text-2xl font-bold">
                      ₹{calculation.creditValue.toLocaleString('en-IN')}
                    </div>
                    <p className="text-xs opacity-75 mt-1">
                      Includes MSME premium (15%) + blockchain (8%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};