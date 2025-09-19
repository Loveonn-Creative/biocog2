import { useState } from "react";
import { 
  Camera, 
  Mic, 
  FileText, 
  TrendingUp, 
  Award, 
  Leaf, 
  CreditCard,
  Calendar,
  MapPin,
  Phone,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock user data
  const userStats = {
    totalScans: 12,
    co2Saved: 8.4,
    creditsEarned: 15650,
    loanPreApproved: 350000,
    esgScore: 78,
    nextPayment: "15 Dec 2024"
  };

  const recentScans = [
    {
      id: 1,
      type: "Electricity Bill",
      date: "2024-12-10",
      co2: 2.3,
      credits: 2850,
      status: "verified"
    },
    {
      id: 2,
      type: "Fuel Invoice",
      date: "2024-12-08",
      co2: 1.8,
      credits: 2200,
      status: "processing"
    },
    {
      id: 3,
      type: "Material Purchase",
      date: "2024-12-05",
      co2: 4.1,
      credits: 5100,
      status: "verified"
    }
  ];

  const quickActions = [
    {
      icon: Camera,
      title: "Scan New Bill",
      titleHindi: "नया बिल स्कैन करें",
      description: "Upload invoice for instant analysis",
      color: "bg-primary",
      href: "/scan"
    },
    {
      icon: Mic,
      title: "Ask AI",
      titleHindi: "AI से पूछें",
      description: "Voice assistance in your language",
      color: "bg-blue-500",
      href: "/voice"
    },
    {
      icon: FileText,
      title: "Generate Report",
      titleHindi: "रिपोर्ट बनाएं",
      description: "Download ESG compliance report",
      color: "bg-green-500",
      href: "/reports"
    },
    {
      icon: CreditCard,
      title: "Apply for Loan",
      titleHindi: "लोन के लिए आवेदन",
      description: "Get pre-approved green loan",
      color: "bg-purple-500",
      href: "/loans"
    }
  ];

  const achievements = [
    {
      icon: "🌱",
      title: "First Scan",
      description: "Completed your first emission scan",
      earned: true
    },
    {
      icon: "💰",
      title: "Credit Earner",
      description: "Earned your first ₹1000 in credits",
      earned: true
    },
    {
      icon: "🏆",
      title: "Green Champion",
      description: "Reduced 10+ tons of CO₂",
      earned: false
    },
    {
      icon: "🎯",
      title: "ESG Expert",
      description: "Achieved 80+ ESG score",
      earned: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground">
                Track your carbon footprint and earn green credits
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-success/20 text-success">
                ESG Score: {userStats.esgScore}
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {userStats.totalScans}
            </div>
            <div className="text-sm text-muted-foreground">Bills Scanned</div>
            <div className="text-xs text-muted-foreground opacity-75">
              स्कैन किए गए बिल
            </div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-success mb-2">
              {userStats.co2Saved} tons
            </div>
            <div className="text-sm text-muted-foreground">CO₂ Reduced</div>
            <div className="text-xs text-muted-foreground opacity-75">
              कार्बन कम किया
            </div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-warning mb-2">
              ₹{userStats.creditsEarned.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Credits Earned</div>
            <div className="text-xs text-muted-foreground opacity-75">
              अर्जित क्रेडिट
            </div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-info mb-2">
              ₹{(userStats.loanPreApproved / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">Loan Pre-approved</div>
            <div className="text-xs text-muted-foreground opacity-75">
              पूर्व-स्वीकृत लोन
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Quick Actions | त्वरित कार्य
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="p-6 hover:shadow-soft transition-all cursor-pointer group">
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      {action.titleHindi}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Recent Scans | हाल की स्कैन
              </h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{scan.type}</div>
                      <div className="text-sm text-muted-foreground">{scan.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      ₹{scan.credits.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {scan.co2} tons CO₂
                    </div>
                    <Badge 
                      variant={scan.status === 'verified' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {scan.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ESG Progress & Achievements */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              ESG Progress | ESG प्रगति
            </h3>
            
            <div className="space-y-6">
              {/* ESG Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall ESG Score</span>
                  <span className="text-sm font-bold text-primary">{userStats.esgScore}/100</span>
                </div>
                <Progress value={userStats.esgScore} className="mb-2" />
                <p className="text-xs text-muted-foreground">
                  22 points away from "Green Champion" status
                </p>
              </div>

              <Separator />

              {/* Achievements */}
              <div>
                <h4 className="font-medium text-foreground mb-4">Achievements | उपलब्धियां</h4>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-success/10 border-success/30' 
                          : 'bg-muted/30 border-border opacity-60'
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-xs font-medium text-foreground">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Payment */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">Next Credit Payment</div>
                    <div className="text-sm text-muted-foreground">
                      ₹{userStats.creditsEarned.toLocaleString()} on {userStats.nextPayment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="space-y-4">
            <Leaf className="w-12 h-12 text-primary mx-auto" />
            <h3 className="text-xl font-semibold text-foreground">
              Ready to Earn More Credits?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Scan more bills, reduce emissions, and unlock higher ESG scores for better loan rates.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="btn-hero">
                <Camera className="w-4 h-4 mr-2" />
                Scan New Bill
              </Button>
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;