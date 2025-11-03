import { useState } from "react";
import { EnhancedReports } from "@/components/EnhancedReports";
import { 
  Download, 
  FileText, 
  Calendar, 
  Building2, 
  TrendingDown, 
  Award,
  ChevronDown,
  Filter,
  Share,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [reportType, setReportType] = useState("comprehensive");

  // Mock report data
  const reportSummary = {
    period: "November 2024",
    totalEmissions: 45.6,
    emissionsReduced: 12.3,
    creditsEarned: 28450,
    esgScore: 78,
    complianceStatus: "Compliant",
    nextAudit: "March 2025"
  };

  const monthlyData = [
    { month: "Jul", emissions: 52.1, reduction: 8.2, credits: 18200 },
    { month: "Aug", emissions: 48.9, reduction: 9.8, credits: 21300 },
    { month: "Sep", emissions: 46.2, reduction: 11.1, credits: 24800 },
    { month: "Oct", emissions: 43.8, reduction: 11.9, credits: 26700 },
    { month: "Nov", emissions: 45.6, reduction: 12.3, credits: 28450 }
  ];

  const availableReports = [
    {
      id: 1,
      title: "Comprehensive ESG Report",
      titleHindi: "व्यापक ESG रिपोर्ट",
      description: "Complete sustainability assessment with all metrics",
      format: "PDF",
      pages: 24,
      size: "2.1 MB",
      lastGenerated: "2024-12-10",
      status: "ready",
      compliance: ["ISO 14001", "GRI Standards", "TCFD"]
    },
    {
      id: 2,
      title: "Carbon Footprint Summary",
      titleHindi: "कार्बन फुटप्रिंट सारांश",
      description: "Monthly carbon emissions and reduction analysis",
      format: "Excel",
      pages: 8,
      size: "1.2 MB",
      lastGenerated: "2024-12-10",
      status: "ready",
      compliance: ["GHG Protocol", "SBTi"]
    },
    {
      id: 3,
      title: "Bank Compliance Report",
      titleHindi: "बैंक अनुपालन रिपोर्ट",
      description: "ESG data formatted for financial institutions",
      format: "PDF",
      pages: 12,
      size: "1.8 MB",
      lastGenerated: "2024-12-09",
      status: "ready",
      compliance: ["RBI Guidelines", "Basel III"]
    },
    {
      id: 4,
      title: "Quarterly Sustainability Report",
      titleHindi: "त्रैमासिक स्थिरता रिपोर्ट",
      description: "Q3 2024 comprehensive sustainability metrics",
      format: "PDF",
      pages: 32,
      size: "3.4 MB",
      lastGenerated: "2024-12-08",
      status: "generating",
      compliance: ["GRI Standards", "SASB", "TCFD"]
    }
  ];

  const certifications = [
    { name: "Carbon Neutral Certified", earned: true, date: "2024-11-15" },
    { name: "Green MSME Badge", earned: true, date: "2024-10-22" },
    { name: "ESG Excellence Award", earned: false, progress: 78 },
    { name: "Sustainable Business Leader", earned: false, progress: 45 }
  ];

  const handleDownload = (reportId: number) => {
    // Mock download functionality
    console.log(`Downloading report ${reportId}`);
  };

  const handlePreview = (reportId: number) => {
    // Mock preview functionality
    console.log(`Previewing report ${reportId}`);
  };

  const handleShare = (reportId: number) => {
    // Mock share functionality
    console.log(`Sharing report ${reportId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                ESG Reports | ESG रिपोर्ट
              </h1>
              <p className="text-muted-foreground">
                Download compliance reports and sustainability certificates
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button className="btn-hero">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center bg-gradient-to-br from-destructive/10 to-destructive/5">
            <TrendingDown className="w-8 h-8 text-destructive mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground mb-1">
              {reportSummary.totalEmissions} tons
            </div>
            <div className="text-sm text-muted-foreground">Total Emissions</div>
            <div className="text-xs text-muted-foreground opacity-75">कुल उत्सर्जन</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-success/10 to-success/5">
            <Award className="w-8 h-8 text-success mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground mb-1">
              {reportSummary.emissionsReduced} tons
            </div>
            <div className="text-sm text-muted-foreground">Emissions Reduced</div>
            <div className="text-xs text-muted-foreground opacity-75">कम किया गया</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5">
            <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground mb-1">
              {reportSummary.esgScore}/100
            </div>
            <div className="text-sm text-muted-foreground">ESG Score</div>
            <div className="text-xs text-muted-foreground opacity-75">ESG स्कोर</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-warning/10 to-warning/5">
            <Building2 className="w-8 h-8 text-warning mx-auto mb-3" />
            <div className="text-lg font-bold text-foreground mb-1">
              {reportSummary.complianceStatus}
            </div>
            <div className="text-sm text-muted-foreground">Compliance Status</div>
            <div className="text-xs text-muted-foreground opacity-75">अनुपालन स्थिति</div>
          </Card>
        </div>

        {/* Available Reports */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Available Reports | उपलब्ध रिपोर्ट
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {availableReports.map((report) => (
              <Card key={report.id} className="p-6 border border-border hover:shadow-soft transition-all">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div className="md:col-span-2 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{report.title}</h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          {report.titleHindi}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground pl-13">
                      {report.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pl-13">
                      {report.compliance.map((standard, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Format: <span className="font-medium text-foreground">{report.format}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Size: <span className="font-medium text-foreground">{report.size}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Updated: <span className="font-medium text-foreground">{report.lastGenerated}</span>
                    </div>
                    <Badge 
                      variant={report.status === 'ready' ? 'default' : 'secondary'}
                      className="mt-2"
                    >
                      {report.status === 'ready' ? '✓ Ready' : '⏳ Generating...'}
                    </Badge>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {report.status === 'ready' ? (
                      <>
                        <Button 
                          onClick={() => handleDownload(report.id)}
                          className="btn-hero"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handlePreview(report.id)}
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => handleShare(report.id)}
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button disabled size="sm" className="w-full">
                        Generating...
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Certifications & Achievements */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Certifications | प्रमाणन
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      cert.earned ? 'bg-success/20' : 'bg-muted'
                    }`}>
                      {cert.earned ? (
                        <Award className="w-5 h-5 text-success" />
                      ) : (
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{cert.name}</div>
                      {cert.earned ? (
                        <div className="text-sm text-success">Earned on {cert.date}</div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          {cert.progress}% progress
                        </div>
                      )}
                    </div>
                  </div>
                  {!cert.earned && (
                    <div className="w-20">
                      <Progress value={cert.progress} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Trend Analysis | रुझान विश्लेषण
            </h3>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="font-medium text-foreground">{data.month} 2024</div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {data.emissions} tons
                    </div>
                    <div className="text-xs text-success">
                      -{data.reduction} tons reduced
                    </div>
                    <div className="text-xs text-primary">
                      ₹{data.credits.toLocaleString()} earned
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
              <div className="text-sm font-medium text-foreground mb-1">
                Improvement Trend
              </div>
              <div className="text-xs text-muted-foreground">
                27% reduction in emissions over the last 5 months
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Financial Reports */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Financial Analytics | वित्तीय विश्लेषण
            </h3>
            <p className="text-muted-foreground">
              Comprehensive financial metrics from your sustainability efforts
            </p>
          </div>
          <EnhancedReports />
        </Card>

        {/* Quick Actions */}
        <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="space-y-4">
            <FileText className="w-12 h-12 text-primary mx-auto" />
            <h3 className="text-xl font-semibold text-foreground">
              Need a Custom Report?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Generate reports for specific compliance requirements or time periods
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="btn-hero">
                <Download className="w-4 h-4 mr-2" />
                Custom Report
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Reports
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;