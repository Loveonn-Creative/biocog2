import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Database, 
  Brain, 
  Cpu, 
  Shield, 
  Coins,
  ArrowRight,
  ArrowDown,
  CheckCircle,
  Zap
} from "lucide-react";

const flowchartSteps = [
  {
    id: 'input',
    title: 'GST Invoice Data',
    subtitle: 'Raw Transaction',
    description: 'Anonymized GSTN e-invoice data including item descriptions, HSN codes, quantities, supplier & buyer GSTINs',
    icon: FileText,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    examples: ['Grey Cotton Fabric - 500 kg', 'HSN Code: 5208', 'Supplier: Tamil Nadu Mill'],
    position: { x: 0, y: 0 }
  },
  {
    id: 'enrichment',
    title: 'Data Enrichment Layer',
    subtitle: 'Intelligent Processing',
    description: 'Our NLP model maps products to standard codes and classifies business entities',
    icon: Database,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    examples: ['Product Mapping', 'Industry Classification', 'Energy Source Data'],
    position: { x: 0, y: 1 }
  },
  {
    id: 'calculation',
    title: 'Carbon Intensity Engine',
    subtitle: 'Proprietary Algorithm',
    description: 'Multi-layered calculation using base factors, regional modifiers, and technology scores',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    examples: ['Base Emission Factor', 'Regional Modifiers', 'Technology Efficiency'],
    position: { x: 0, y: 2 }
  },
  {
    id: 'verification',
    title: 'IoT & Verification',
    subtitle: 'Primary Data Override',
    description: 'Real sensor data and voice inputs override estimates with verified measurements',
    icon: Cpu,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    examples: ['Smart Meter Data', 'Voice Commands', 'Partner APIs'],
    position: { x: 0, y: 3 }
  },
  {
    id: 'blockchain',
    title: 'Blockchain ESG Memory',
    subtitle: 'Immutable Record',
    description: 'Tamper-proof logging of calculation trails and verification data on blockchain',
    icon: Shield,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    examples: ['Hash Validation', 'Audit Trail', 'Timestamp Proof'],
    position: { x: 0, y: 4 }
  },
  {
    id: 'credit',
    title: 'Verified Carbon Credit',
    subtitle: 'Monetizable Asset',
    description: 'Final carbon credit ready for trading, backed by complete audit trail',
    icon: Coins,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    examples: ['Tradeable Credit', 'ESG Compliance', 'Market Ready'],
    position: { x: 0, y: 5 }
  }
];

export const InteractiveFlowchart = () => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <div id="flowchart" className="max-w-6xl mx-auto">
      {/* Mobile-First Vertical Flow */}
      <div className="space-y-8">
        {flowchartSteps.map((step, index) => {
          const Icon = step.icon;
          const isSelected = selectedStep === step.id;
          const isHovered = hoveredStep === step.id;
          const isActive = isSelected || isHovered;

          return (
            <div key={step.id}>
              {/* Flow Step Card */}
              <Card 
                className={`relative p-6 cursor-pointer transition-all duration-500 hover:shadow-soft hover:-translate-y-2 ${
                  isActive ? 'ring-2 ring-primary shadow-soft scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setSelectedStep(isSelected ? null : step.id)}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`${step.bgColor} p-3 rounded-xl flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        Layer {index + 1}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-primary mb-2">{step.subtitle}</p>
                    <p className="text-muted-foreground mb-4">{step.description}</p>

                    {/* Examples */}
                    <div className="flex flex-wrap gap-2">
                      {step.examples.map((example, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs px-2 py-1">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Expand Indicator */}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                {/* Expanded Content */}
                {isSelected && (
                  <div className="mt-6 pt-6 border-t border-border animate-accordion-down">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          How It Works
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {step.id === 'input' && (
                            <>
                              <li>• Anonymized invoice data ingestion</li>
                              <li>• HSN code extraction and validation</li>
                              <li>• Quantity and value parsing</li>
                            </>
                          )}
                          {step.id === 'enrichment' && (
                            <>
                              <li>• NLP-based product categorization</li>
                              <li>• GSTIN to industry mapping</li>
                              <li>• External data source integration</li>
                            </>
                          )}
                          {step.id === 'calculation' && (
                            <>
                              <li>• Base emission factor application</li>
                              <li>• Regional grid factor adjustment</li>
                              <li>• Technology efficiency scoring</li>
                            </>
                          )}
                          {step.id === 'verification' && (
                            <>
                              <li>• IoT sensor data integration</li>
                              <li>• Voice command processing</li>
                              <li>• Third-party data validation</li>
                            </>
                          )}
                          {step.id === 'blockchain' && (
                            <>
                              <li>• Cryptographic hash generation</li>
                              <li>• Immutable record creation</li>
                              <li>• Audit trail establishment</li>
                            </>
                          )}
                          {step.id === 'credit' && (
                            <>
                              <li>• Credit tokenization</li>
                              <li>• Market readiness validation</li>
                              <li>• Trading platform listing</li>
                            </>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          Key Benefits
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {step.id === 'input' && (
                            <>
                              <li>• Automated data collection</li>
                              <li>• Zero manual entry required</li>
                              <li>• Complete transaction coverage</li>
                            </>
                          )}
                          {step.id === 'enrichment' && (
                            <>
                              <li>• 99.7% accuracy in classification</li>
                              <li>• Real-time processing</li>
                              <li>• Continuous learning improvement</li>
                            </>
                          )}
                          {step.id === 'calculation' && (
                            <>
                              <li>• India-specific methodology</li>
                              <li>• Dynamic factor updates</li>
                              <li>• Multi-dimensional analysis</li>
                            </>
                          )}
                          {step.id === 'verification' && (
                            <>
                              <li>• Real-time accuracy</li>
                              <li>• Multi-source validation</li>
                              <li>• Transparent methodology</li>
                            </>
                          )}
                          {step.id === 'blockchain' && (
                            <>
                              <li>• Regulatory compliance</li>
                              <li>• Complete transparency</li>
                              <li>• Tamper-proof records</li>
                            </>
                          )}
                          {step.id === 'credit' && (
                            <>
                              <li>• Market-ready format</li>
                              <li>• Instant monetization</li>
                              <li>• ESG reporting ready</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Arrow Connector */}
              {index < flowchartSteps.length - 1 && (
                <div className="flex justify-center py-4">
                  <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Formula */}
      <Card className="mt-16 p-8 bg-gradient-card">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">The Complete Formula</h3>
          <div className="bg-muted/50 p-6 rounded-2xl font-mono text-sm md:text-base overflow-x-auto">
            <div className="text-primary font-semibold mb-2">Total Carbon Footprint (tCO2e) =</div>
            <div className="text-foreground">
              Σ (Quantity × <span className="text-accent">Base Emission Factor</span> × <span className="text-success">Regional Modifier</span> × <span className="text-warning">Tech Efficiency</span>)
            </div>
            <div className="text-muted-foreground mt-2">
              + Energy Use Footprint - <span className="text-info">IoT Verified Reductions</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Each component is dynamically calculated using real-time data, ensuring accuracy and verifiability
          </p>
        </div>
      </Card>
    </div>
  );
};