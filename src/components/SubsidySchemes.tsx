import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ExternalLink, 
  Calendar, 
  IndianRupee, 
  FileText, 
  CheckCircle,
  Clock,
  Award,
  Building,
  Leaf,
  Zap
} from "lucide-react";

export const SubsidySchemes = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const schemes = [
    {
      id: 1,
      name: "CGTMSE Credit Guarantee",
      category: "credit",
      provider: "Government of India",
      amount: "₹2 Crore",
      coverage: "85%",
      tenure: "7 years",
      status: "eligible",
      deadline: "31 Mar 2024",
      description: "Collateral-free loans for MSMEs with government guarantee",
      benefits: ["No collateral required", "85% credit guarantee", "Quick processing"],
      icon: <Building className="w-6 h-6 text-primary" />
    },
    {
      id: 2,
      name: "Green Credit Subsidy Scheme",
      category: "green",
      provider: "Ministry of Environment",
      amount: "₹50 Lakh",
      coverage: "40%",
      tenure: "5 years",
      status: "eligible",
      deadline: "30 Jun 2024", 
      description: "Subsidy for adopting clean energy and sustainable practices",
      benefits: ["40% capital subsidy", "Carbon credit bonus", "Tax benefits"],
      icon: <Leaf className="w-6 h-6 text-success" />
    },
    {
      id: 3,
      name: "Digital India MSME Scheme",
      category: "tech",
      provider: "Ministry of Electronics & IT",
      amount: "₹25 Lakh",
      coverage: "50%",
      tenure: "3 years",
      status: "applied",
      deadline: "15 May 2024",
      description: "Technology adoption and digitization support for MSMEs",
      benefits: ["50% tech subsidy", "Digital infrastructure", "Training support"],
      icon: <Zap className="w-6 h-6 text-info" />
    },
    {
      id: 4,
      name: "Prime Minister Employment Generation Programme",
      category: "employment",
      provider: "Ministry of MSME",
      amount: "₹1 Crore",
      coverage: "35%",
      tenure: "6 years",
      status: "eligible",
      deadline: "31 Dec 2024",
      description: "Generate employment and promote entrepreneurship",
      benefits: ["35% margin money", "Low interest rates", "Backward area subsidy"],
      icon: <Award className="w-6 h-6 text-warning" />
    }
  ];

  const categories = [
    { id: "all", name: "All Schemes", count: schemes.length },
    { id: "credit", name: "Credit Guarantee", count: schemes.filter(s => s.category === "credit").length },
    { id: "green", name: "Green Subsidies", count: schemes.filter(s => s.category === "green").length },
    { id: "tech", name: "Technology", count: schemes.filter(s => s.category === "tech").length },
    { id: "employment", name: "Employment", count: schemes.filter(s => s.category === "employment").length }
  ];

  const filteredSchemes = selectedCategory === "all" 
    ? schemes 
    : schemes.filter(scheme => scheme.category === selectedCategory);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "eligible":
        return <Badge variant="default" className="bg-success/20 text-success">Eligible</Badge>;
      case "applied":
        return <Badge variant="default" className="bg-warning/20 text-warning">Applied</Badge>;
      case "approved":
        return <Badge variant="default" className="bg-primary/20 text-primary">Approved</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const calculateProgress = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const totalDays = 365; // Assuming 1 year schemes
    const remainingDays = Math.max(0, (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(100, ((totalDays - remainingDays) / totalDays) * 100));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="gap-2"
          >
            {category.name}
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Schemes Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="p-6 hover:shadow-soft transition-all cursor-pointer group">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted/50 rounded-lg group-hover:scale-110 transition-transform">
                    {scheme.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{scheme.name}</h3>
                    <p className="text-sm text-muted-foreground">{scheme.provider}</p>
                  </div>
                </div>
                {getStatusBadge(scheme.status)}
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{scheme.amount}</div>
                  <div className="text-xs text-muted-foreground">Max Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-success">{scheme.coverage}</div>
                  <div className="text-xs text-muted-foreground">Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-warning">{scheme.tenure}</div>
                  <div className="text-xs text-muted-foreground">Tenure</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{scheme.description}</p>

              {/* Benefits */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground text-sm">Key Benefits:</h4>
                <div className="space-y-1">
                  {scheme.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deadline Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-warning" />
                    <span className="text-sm font-medium text-foreground">Application Deadline</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{scheme.deadline}</span>
                </div>
                <Progress value={calculateProgress(scheme.deadline)} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {Math.ceil((new Date(scheme.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1 btn-hero gap-2"
                  onClick={() => window.open(`https://msme.gov.in/schemes/${scheme.id}`, '_blank')}
                >
                  <FileText className="w-4 h-4" />
                  {scheme.status === "eligible" ? "Apply Now" : "View Status"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://msme.gov.in/details/${scheme.id}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mt-12">
        <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5">
          <IndianRupee className="w-8 h-8 text-primary mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">₹4.25 Cr</div>
          <div className="text-sm text-muted-foreground">Total Available</div>
        </Card>
        
        <Card className="p-6 text-center bg-gradient-to-br from-success/5 to-warning/5">
          <CheckCircle className="w-8 h-8 text-success mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">3</div>
          <div className="text-sm text-muted-foreground">Eligible Schemes</div>
        </Card>
        
        <Card className="p-6 text-center bg-gradient-to-br from-warning/5 to-info/5">
          <Clock className="w-8 h-8 text-warning mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">45</div>
          <div className="text-sm text-muted-foreground">Avg Days to Approval</div>
        </Card>
        
        <Card className="p-6 text-center bg-gradient-to-br from-info/5 to-success/5">
          <Award className="w-8 h-8 text-info mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">89%</div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="p-8 text-center bg-gradient-card border-2">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Need Help with Applications?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI assistant can help you identify the best schemes for your business and guide you through the application process.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="btn-hero gap-2">
              <Zap className="w-4 h-4" />
              Talk to AI Assistant
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Download Guide
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};