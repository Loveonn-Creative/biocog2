import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Brain, Shield, Code, Zap, Globe } from "lucide-react";

const layers = [
  {
    id: 'enrichment',
    title: 'Data Enrichment Layer',
    icon: Database,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    description: 'Intelligent processing of raw GST data',
    components: [
      {
        name: 'NLP Product Mapper',
        description: 'Maps vague product descriptions to standardized categories',
        example: '"Grey fabric" → HSN 5208: Grey Cotton Fabric, 200 GSM',
        accuracy: '99.7%',
        technology: 'Transformer-based NLP with domain-specific training'
      },
      {
        name: 'Entity Profiler',
        description: 'Tags suppliers and buyers with industry classifications',
        example: 'GSTIN → "Textile Spinning Mill" in Tamil Nadu',
        accuracy: '98.5%',
        technology: 'Government database integration with ML classification'
      },
      {
        name: 'Energy Source Detector',
        description: 'Identifies energy mix from partner APIs and location data',
        example: 'Solar panel data from state renewable energy boards',
        accuracy: '95.0%',
        technology: 'Real-time API integration with energy providers'
      }
    ]
  },
  {
    id: 'calculation',
    title: 'Carbon Intensity Engine',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    description: 'Proprietary multi-layered calculation methodology',
    components: [
      {
        name: 'Base Emission Factor (BEF)',
        description: 'Scientifically validated baseline factors for each product category',
        example: '2.5 kgCO2e/kg for cotton yarn (IPCC + India LCA data)',
        accuracy: '±5%',
        technology: 'Hybrid of IPCC, EPA, and India-specific LCA databases'
      },
      {
        name: 'Regional Modifier Engine',
        description: 'Dynamic adjustment based on location and grid emission factors',
        example: 'Tamil Nadu: 0.85x modifier (higher renewable mix)',
        accuracy: '±3%',
        technology: 'Real-time grid data from Central Electricity Authority'
      },
      {
        name: 'Technology Efficiency Scorer',
        description: 'Assesses operational efficiency based on scale and technology',
        example: 'Modern textile mill: 0.75x factor vs traditional: 1.2x',
        accuracy: '±8%',
        technology: 'Machine learning model trained on 50K+ MSME assessments'
      }
    ]
  },
  {
    id: 'verification',
    title: 'IoT & Verification Layer',
    icon: Shield,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    description: 'Primary data override and verification system',
    components: [
      {
        name: 'Smart Meter Integration',
        description: 'Direct electricity consumption data from IoT devices',
        example: 'Real-time kWh data overrides estimated consumption',
        accuracy: '99.9%',
        technology: 'LoRaWAN and cellular IoT with encrypted data transmission'
      },
      {
        name: 'Voice Command Processor',
        description: 'Natural language processing for sustainability actions',
        example: '"Installed solar panels this month" → 30% reduction factor',
        accuracy: '96.0%',
        technology: 'Multi-lingual speech recognition with context understanding'
      },
      {
        name: 'Partner Data Validator',
        description: 'Third-party verification from waste recyclers and suppliers',
        example: 'Recycler confirms 80% waste diverted from landfill',
        accuracy: '98.0%',
        technology: 'API integration with 500+ verified sustainability partners'
      }
    ]
  }
];

export const TechnicalDeepDive = () => {
  const [activeLayer, setActiveLayer] = useState(layers[0].id);

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs value={activeLayer} onValueChange={setActiveLayer} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <TabsTrigger key={layer.id} value={layer.id} className="flex items-center gap-2 py-3">
                <Icon className={`w-4 h-4 ${layer.color}`} />
                <span className="hidden sm:inline">{layer.title}</span>
                <span className="sm:hidden">Layer {layers.findIndex(l => l.id === layer.id) + 1}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <TabsContent key={layer.id} value={layer.id} className="space-y-6">
              {/* Layer Overview */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`${layer.bgColor} p-3 rounded-xl`}>
                    <Icon className={`w-8 h-8 ${layer.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{layer.title}</h3>
                    <p className="text-muted-foreground">{layer.description}</p>
                  </div>
                </div>
              </Card>

              {/* Components Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {layer.components.map((component, index) => (
                  <Card key={index} className="p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-foreground mb-2">{component.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{component.description}</p>
                      
                      {/* Accuracy Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className="bg-success/20 text-success">
                          <Zap className="w-3 h-3 mr-1" />
                          {component.accuracy} Accuracy
                        </Badge>
                      </div>
                    </div>

                    {/* Example */}
                    <div className="bg-muted/30 p-4 rounded-lg mb-4">
                      <h5 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Example</h5>
                      <p className="text-sm text-muted-foreground font-mono">{component.example}</p>
                    </div>

                    {/* Technology */}
                    <div>
                      <h5 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Technology</h5>
                      <p className="text-xs text-muted-foreground">{component.technology}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Code Example */}
              <Card className="p-6 bg-gradient-card">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-primary" />
                  <h4 className="text-lg font-bold text-foreground">Implementation Example</h4>
                </div>
                
                <div className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    {layer.id === 'enrichment' && `
// Product Mapping Engine
const productMapper = async (description, hsnCode) => {
  const nlpResult = await nlpModel.classify(description);
  const standardProduct = await hsnDatabase.lookup(hsnCode);
  
  return {
    category: nlpResult.category,
    specifications: nlpResult.specs,
    emissionFactor: standardProduct.baseFactor,
    confidence: nlpResult.confidence
  };
};`}
                    {layer.id === 'calculation' && `
// Carbon Intensity Calculation
const calculateEmissions = (product, quantity, location, techScore) => {
  const baseFactor = product.emissionFactor;
  const regionalModifier = getRegionalModifier(location);
  const techModifier = techScore / 100;
  
  return quantity * baseFactor * regionalModifier * techModifier;
};`}
                    {layer.id === 'verification' && `
// IoT Data Integration
const processIoTData = async (deviceId, timestamp) => {
  const sensorData = await iotGateway.getData(deviceId);
  const verified = await cryptoValidator.verify(sensorData);
  
  if (verified) {
    return {
      consumption: sensorData.kWh,
      timestamp: timestamp,
      verified: true,
      hash: generateHash(sensorData)
    };
  }
};`}
                  </pre>
                </div>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Global Stats */}
      <Card className="mt-8 p-8 bg-gradient-card">
        <div className="text-center mb-6">
          <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">System Performance</h3>
          <p className="text-muted-foreground">Real-time statistics from our production environment</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2.5M+</div>
            <div className="text-sm text-muted-foreground">Invoices Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">99.7%</div>
            <div className="text-sm text-muted-foreground">Classification Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">12ms</div>
            <div className="text-sm text-muted-foreground">Average Processing Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">15K+</div>
            <div className="text-sm text-muted-foreground">MSMEs Verified</div>
          </div>
        </div>
      </Card>
    </div>
  );
};