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
  { name: "Cotton Fabric", hsn: "5208", baseFactor: 2.5, unit: "kg" },
  { name: "Steel Sheets", hsn: "7210", baseFactor: 1.8, unit: "kg" },
  { name: "Plastic Components", hsn: "3923", baseFactor: 3.2, unit: "kg" },
  { name: "Textile Machinery", hsn: "8445", baseFactor: 0.9, unit: "unit" },
];

const regions = [
  { name: "Tamil Nadu", modifier: 0.85, gridFactor: 0.82 },
  { name: "Maharashtra", modifier: 0.92, gridFactor: 0.79 },
  { name: "Gujarat", modifier: 0.88, gridFactor: 0.84 },
  { name: "Karnataka", modifier: 0.86, gridFactor: 0.73 },
];

export const CarbonCalculator = () => {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [quantity, setQuantity] = useState(1000);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [techEfficiency, setTechEfficiency] = useState([75]);
  const [iotReduction, setIotReduction] = useState([0]);
  const [calculation, setCalculation] = useState({
    baseEmission: 0,
    regionalAdjustment: 0,
    techAdjustment: 0,
    iotReduction: 0,
    finalEmission: 0,
    carbonCredits: 0
  });

  useEffect(() => {
    const baseEmission = quantity * selectedProduct.baseFactor;
    const regionalAdjustment = baseEmission * selectedRegion.modifier;
    const techAdjustment = regionalAdjustment * (techEfficiency[0] / 100);
    const iotReductionAmount = techAdjustment * (iotReduction[0] / 100);
    const finalEmission = techAdjustment - iotReductionAmount;
    const carbonCredits = Math.max(0, baseEmission - finalEmission) * 0.8; // 80% credit ratio

    setCalculation({
      baseEmission,
      regionalAdjustment,
      techAdjustment,
      iotReduction: iotReductionAmount,
      finalEmission,
      carbonCredits
    });
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
                Base emission factor: {selectedProduct.baseFactor} kgCO2e/{selectedProduct.unit}
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
                <span className="text-sm font-medium">Base Emission</span>
                <Badge variant="outline">{calculation.baseEmission.toFixed(2)} tCO2e</Badge>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">After Regional Adjustment</span>
                <Badge variant="outline">{calculation.regionalAdjustment.toFixed(2)} tCO2e</Badge>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">After Tech Efficiency</span>
                <Badge variant="outline">{calculation.techAdjustment.toFixed(2)} tCO2e</Badge>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20">
                <span className="text-sm font-medium text-success">IoT Verified Reduction</span>
                <Badge className="bg-success/20 text-success">-{calculation.iotReduction.toFixed(2)} tCO2e</Badge>
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
                  {calculation.finalEmission.toFixed(2)} tCO2e
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Verified and blockchain-ready
                </p>

                <div className="bg-gradient-button p-6 rounded-2xl text-white">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Leaf className="w-6 h-6" />
                    <h4 className="text-lg font-bold">Carbon Credits Generated</h4>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {calculation.carbonCredits.toFixed(2)} Credits
                  </div>
                  <p className="text-sm opacity-90">
                    Estimated value: ₹{(calculation.carbonCredits * 2500).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Formula Breakdown */}
      <Card className="mt-8 p-8">
        <h4 className="text-xl font-bold text-foreground mb-4 text-center">Live Formula Calculation</h4>
        <div className="bg-muted/30 p-6 rounded-2xl font-mono text-sm overflow-x-auto">
          <div className="text-center space-y-2">
            <div>
              <span className="text-muted-foreground">Base:</span> {quantity} × {selectedProduct.baseFactor} = 
              <span className="text-primary font-bold"> {calculation.baseEmission.toFixed(2)} tCO2e</span>
            </div>
            <div>
              <span className="text-muted-foreground">Regional:</span> {calculation.baseEmission.toFixed(2)} × {selectedRegion.modifier} = 
              <span className="text-accent font-bold"> {calculation.regionalAdjustment.toFixed(2)} tCO2e</span>
            </div>
            <div>
              <span className="text-muted-foreground">Tech Adj:</span> {calculation.regionalAdjustment.toFixed(2)} × {(techEfficiency[0]/100).toFixed(2)} = 
              <span className="text-success font-bold"> {calculation.techAdjustment.toFixed(2)} tCO2e</span>
            </div>
            <div>
              <span className="text-muted-foreground">IoT Reduction:</span> -{calculation.iotReduction.toFixed(2)} tCO2e
            </div>
            <div className="border-t border-border pt-2 mt-4">
              <span className="text-muted-foreground">Final:</span> 
              <span className="text-primary font-bold text-lg"> {calculation.finalEmission.toFixed(2)} tCO2e</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};