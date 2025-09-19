import { useState, useRef } from "react";
import { Camera, Upload, X, Check, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScanInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (data: any) => void;
}

export const ScanInterface = ({ isOpen, onClose, onScanComplete }: ScanInterfaceProps) => {
  const [step, setStep] = useState<'upload' | 'scanning' | 'results'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock scan results for demo
  const mockResults = {
    co2Emissions: "2.3",
    energyUsed: "145",
    carbonCredits: "₹1,850",
    supplier: "Green Energy Solutions",
    category: "Electricity",
    suggestions: [
      "Switch to solar power to reduce 40% emissions",
      "Use energy-efficient equipment",
      "Consider renewable energy certificates"
    ]
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleCameraCapture = () => {
    // For mobile, this would trigger camera
    fileInputRef.current?.click();
  };

  const startScanning = () => {
    setStep('scanning');
    setProgress(0);
    
    // Simulate OCR processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep('results');
            onScanComplete(mockResults);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetScan = () => {
    setStep('upload');
    setSelectedFile(null);
    setPreviewUrl(null);
    setProgress(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card/95 backdrop-blur-sm border-border max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Scan Invoice | बिल स्कैन करें
            </h2>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Upload Step */}
          {step === 'upload' && (
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Invoice preview" 
                      className="max-w-full max-h-48 mx-auto rounded-lg shadow-soft"
                    />
                    <div className="flex gap-2 justify-center">
                      <Button onClick={startScanning} className="btn-hero">
                        <FileText className="w-4 h-4 mr-2" />
                        Scan Invoice
                      </Button>
                      <Button onClick={resetScan} variant="outline">
                        Choose Different
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <Camera className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Upload Your Invoice</h3>
                      <p className="text-muted-foreground">GST bill, electricity bill, or any business invoice</p>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={handleCameraCapture} className="btn-hero">
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                      <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Tips */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">📋 Quick Tips:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear, well-lit photos work best</li>
                  <li>• Include all text and numbers</li>
                  <li>• GST bills give most accurate results</li>
                  <li>• Works with electricity, fuel, and material bills</li>
                </ul>
              </div>
            </div>
          )}

          {/* Scanning Step */}
          {step === 'scanning' && (
            <div className="text-center space-y-6">
              <div className="scan-line w-full h-32 bg-muted rounded-lg relative overflow-hidden">
                {previewUrl && (
                  <img 
                    src={previewUrl} 
                    alt="Scanning" 
                    className="w-full h-full object-cover opacity-50"
                  />
                )}
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto">
                  <Loader2 className="w-16 h-16 animate-spin text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Analyzing Your Invoice</h3>
                  <p className="text-muted-foreground">Our AI is reading the data...</p>
                </div>
                <Progress value={progress} className="w-full max-w-xs mx-auto" />
                <p className="text-sm text-muted-foreground">{progress}% complete</p>
              </div>
            </div>
          )}

          {/* Results Step */}
          {step === 'results' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-semibold text-foreground">Scan Complete!</h3>
                <p className="text-muted-foreground">Here's your carbon footprint analysis</p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="feature-card text-center">
                  <div className="text-2xl font-bold text-destructive">{mockResults.co2Emissions} tons</div>
                  <div className="text-sm text-muted-foreground">CO₂ Emissions</div>
                </div>
                <div className="feature-card text-center">
                  <div className="text-2xl font-bold text-primary">{mockResults.carbonCredits}</div>
                  <div className="text-sm text-muted-foreground">Potential Credits</div>
                </div>
                <div className="feature-card text-center">
                  <div className="text-2xl font-bold text-warning">{mockResults.energyUsed} kWh</div>
                  <div className="text-sm text-muted-foreground">Energy Used</div>
                </div>
                <div className="feature-card text-center">
                  <div className="text-lg font-bold text-foreground">{mockResults.category}</div>
                  <div className="text-sm text-muted-foreground">Category</div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">💡 Reduction Tips:</h4>
                {mockResults.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{suggestion}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="btn-hero flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button onClick={resetScan} variant="outline">
                  Scan Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};