import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Link, CheckCircle, Clock, Hash, Lock } from "lucide-react";

const mockTransactions = [
  {
    id: "0x1a2b3c4d",
    type: "GST Data Ingestion",
    timestamp: "2024-01-15 14:30:22 IST",
    hash: "d4c5b2a1f8e9d6c3b0a7f4e1d8c5b2a9",
    status: "confirmed",
    gasUsed: "21,000",
    blockNumber: 18459201
  },
  {
    id: "0x2b3c4d5e",
    type: "Calculation Verification",
    timestamp: "2024-01-15 14:32:18 IST",
    hash: "e5d6c3b2a9f0e7d4c1b8f5e2d9c6b3a0",
    status: "confirmed",
    gasUsed: "45,000",
    blockNumber: 18459205
  },
  {
    id: "0x3c4d5e6f",
    type: "IoT Data Override",
    timestamp: "2024-01-15 14:35:44 IST",
    hash: "f6e7d4c3b0a1f8e5d2c9f6e3d0c7b4a1",
    status: "pending",
    gasUsed: "32,000",
    blockNumber: null
  },
  {
    id: "0x4d5e6f7g",
    type: "Carbon Credit Mint",
    timestamp: "2024-01-15 14:38:56 IST",
    hash: "a7f8e5d4c3b2a9f6e3d0c7b4a1f8e5d2",
    status: "confirmed",
    gasUsed: "67,000",
    blockNumber: 18459212
  }
];

const auditTrail = [
  {
    step: "Data Ingestion",
    hash: "0xd4c5b2a1...",
    validator: "System",
    status: "verified",
    timestamp: "14:30:22"
  },
  {
    step: "Product Mapping",
    hash: "0xe5d6c3b2...",
    validator: "NLP Engine",
    status: "verified",
    timestamp: "14:31:45"
  },
  {
    step: "Emission Calculation",
    hash: "0xf6e7d4c3...",
    validator: "Calculation Engine",
    status: "verified",
    timestamp: "14:32:18"
  },
  {
    step: "IoT Verification",
    hash: "0xa7f8e5d4...",
    validator: "IoT Gateway",
    status: "pending",
    timestamp: "14:35:44"
  },
  {
    step: "Credit Generation",
    hash: "0xb8a9f6e3...",
    validator: "Credit Minter",
    status: "queued",
    timestamp: "--:--:--"
  }
];

export const BlockchainVisualization = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(mockTransactions[0]);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % auditTrail.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Blockchain Transactions */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Link className="w-6 h-6 text-indigo-500" />
            <h3 className="text-2xl font-bold text-foreground">Blockchain Transactions</h3>
          </div>

          <div className="space-y-4">
            {mockTransactions.map((tx, index) => (
              <div
                key={tx.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedTransaction.id === tx.id
                    ? 'border-primary bg-primary/5 shadow-soft'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
                onClick={() => setSelectedTransaction(tx)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      tx.status === 'confirmed' ? 'bg-success animate-pulse' :
                      tx.status === 'pending' ? 'bg-warning animate-spin' : 'bg-muted'
                    }`}></div>
                    <span className="font-medium text-foreground">{tx.type}</span>
                  </div>
                  <Badge variant={tx.status === 'confirmed' ? 'default' : 'secondary'}>
                    {tx.status}
                  </Badge>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>TX: {tx.id}</div>
                  <div>{tx.timestamp}</div>
                  {tx.blockNumber && <div>Block: #{tx.blockNumber.toLocaleString()}</div>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Transaction Details */}
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center gap-2 mb-6">
            <Hash className="w-6 h-6 text-purple-500" />
            <h3 className="text-2xl font-bold text-foreground">Transaction Details</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">{selectedTransaction.type}</h4>
              <div className="bg-muted/30 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction Hash:</span>
                  <span className="font-mono text-xs">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Block Hash:</span>
                  <span className="font-mono text-xs">{selectedTransaction.hash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timestamp:</span>
                  <span>{selectedTransaction.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gas Used:</span>
                  <span>{selectedTransaction.gasUsed}</span>
                </div>
                {selectedTransaction.blockNumber && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block Number:</span>
                    <span>#{selectedTransaction.blockNumber.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Verification Status */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                Verification Status
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-success/10 rounded-lg">
                  <span className="text-sm">Cryptographic Signature</span>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="flex items-center justify-between p-2 bg-success/10 rounded-lg">
                  <span className="text-sm">Network Consensus</span>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="flex items-center justify-between p-2 bg-success/10 rounded-lg">
                  <span className="text-sm">Data Integrity</span>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Security Features
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <Badge variant="outline" className="justify-center py-2">
                  Immutable Records
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Multi-sig Validation
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Audit Trail
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Regulatory Compliance
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Animated Audit Trail */}
      <Card className="mt-8 p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">Live Audit Trail</h3>
          <p className="text-muted-foreground">Watch the verification process in real-time</p>
        </div>

        <div className="relative">
          {/* Timeline */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-4">
            {auditTrail.map((step, index) => (
              <div
                key={step.step}
                className={`flex flex-col items-center text-center transition-all duration-500 ${
                  index <= animationStep ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                }`}
              >
                {/* Step Icon */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                  index < animationStep ? 'bg-success text-white' :
                  index === animationStep ? 'bg-primary text-white animate-pulse' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index < animationStep ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : index === animationStep ? (
                    <Clock className="w-8 h-8 animate-spin" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-current"></div>
                  )}
                </div>

                {/* Step Details */}
                <div className="max-w-32">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">{step.step}</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="font-mono">{step.hash}</div>
                    <div>{step.validator}</div>
                    <div>{step.timestamp}</div>
                  </div>
                  <Badge 
                    variant={
                      step.status === 'verified' ? 'default' :
                      step.status === 'pending' ? 'secondary' : 'outline'
                    }
                    className="mt-2 text-xs"
                  >
                    {step.status}
                  </Badge>
                </div>

                {/* Connector Line */}
                {index < auditTrail.length - 1 && (
                  <div className={`hidden md:block absolute top-8 w-full h-0.5 transition-all duration-500 ${
                    index < animationStep ? 'bg-success' : 'bg-muted'
                  }`} style={{ 
                    left: `${(100 / auditTrail.length) * (index + 0.5)}%`,
                    width: `${100 / auditTrail.length}%`,
                    transform: 'translateX(-50%)'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => setAnimationStep(0)}
            className="text-sm"
          >
            Reset
          </Button>
          <Button
            onClick={() => setAnimationStep((prev) => Math.min(prev + 1, auditTrail.length - 1))}
            className="text-sm"
            disabled={animationStep >= auditTrail.length - 1}
          >
            Next Step
          </Button>
        </div>
      </Card>

      {/* Blockchain Benefits */}
      <Card className="mt-8 p-8 bg-gradient-card">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">Why Blockchain?</h3>
          <p className="text-muted-foreground">The backbone of trust in carbon credit verification</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-bold text-foreground mb-2">Immutable Records</h4>
            <p className="text-sm text-muted-foreground">
              Once recorded, carbon credit calculations cannot be altered or tampered with
            </p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h4 className="font-bold text-foreground mb-2">Transparent Auditing</h4>
            <p className="text-sm text-muted-foreground">
              Complete audit trail accessible to regulators and stakeholders
            </p>
          </div>
          <div className="text-center">
            <Link className="w-12 h-12 text-accent mx-auto mb-4" />
            <h4 className="font-bold text-foreground mb-2">Interoperability</h4>
            <p className="text-sm text-muted-foreground">
              Credits verified on blockchain are accepted across trading platforms
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};