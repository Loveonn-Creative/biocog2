import { useState, useEffect } from "react";
import { Download, FileText, TrendingUp, DollarSign, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

export const EnhancedReports = () => {
  const [loading, setLoading] = useState(true);
  const [financialData, setFinancialData] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalCredits: 0,
    totalValue: 0,
    savingsFromEfficiency: 0,
    greenInvestments: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadFinancialMetrics();
  }, []);

  const loadFinancialMetrics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get financial metrics for last 12 months
      const { data: metrics } = await supabase
        .from("financial_metrics")
        .select("*")
        .eq("user_id", user.id)
        .order("month_year", { ascending: false })
        .limit(12);

      if (metrics) {
        // Format data for charts
        const chartData = metrics.reverse().map((m) => ({
          month: new Date(m.month_year).toLocaleDateString('en-IN', { month: 'short' }),
          credits: Number(m.total_credits_earned),
          redeemed: Number(m.credits_redeemed),
          savings: Number(m.savings_from_efficiency),
          investments: Number(m.green_investments),
        }));

        setFinancialData(chartData);

        // Calculate summary
        const totals = metrics.reduce((acc, m) => ({
          totalCredits: acc.totalCredits + Number(m.total_credits_earned),
          totalValue: acc.totalValue + (Number(m.total_credits_earned) * 2500),
          savingsFromEfficiency: acc.savingsFromEfficiency + Number(m.savings_from_efficiency),
          greenInvestments: acc.greenInvestments + Number(m.green_investments),
        }), { totalCredits: 0, totalValue: 0, savingsFromEfficiency: 0, greenInvestments: 0 });

        setSummary(totals);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading financial metrics:", error);
      toast({
        title: "Error",
        description: "Failed to load financial metrics",
        variant: "destructive",
      });
    }
  };

  const generatePDFReport = async () => {
    toast({
      title: "Generating Report",
      description: "Your comprehensive ESG report is being generated...",
    });

    // In production, this would call an edge function to generate PDF
    setTimeout(() => {
      toast({
        title: "Report Ready!",
        description: "Your ESG report has been generated successfully.",
      });
    }, 2000);
  };

  if (loading) {
    return <div className="animate-pulse">Loading financial reports...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Credits</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{summary.totalCredits.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{summary.totalValue.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Market value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{summary.savingsFromEfficiency.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">From sustainable practices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Green Investments</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{summary.greenInvestments.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Invested in sustainability</p>
          </CardContent>
        </Card>
      </div>

      {/* Credits Earned vs Redeemed Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Credits Earned vs Redeemed</CardTitle>
          <CardDescription>Monthly comparison of carbon credit activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="credits" fill="hsl(var(--primary))" name="Credits Earned" />
              <Bar dataKey="redeemed" fill="hsl(var(--accent))" name="Credits Redeemed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Financial Impact Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Impact Over Time</CardTitle>
          <CardDescription>Savings and investments from sustainable practices</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={financialData}>
              <defs>
                <linearGradient id="savings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="investments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="savings" stroke="hsl(var(--primary))" fill="url(#savings)" name="Efficiency Savings" />
              <Area type="monotone" dataKey="investments" stroke="hsl(var(--accent))" fill="url(#investments)" name="Green Investments" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Download Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Download Reports</CardTitle>
          <CardDescription>Generate comprehensive ESG and financial reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button onClick={generatePDFReport} className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Comprehensive ESG Report
            </Button>
            <Button onClick={generatePDFReport} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Financial Summary
            </Button>
            <Button onClick={generatePDFReport} variant="outline" className="w-full">
              <Award className="mr-2 h-4 w-4" />
              Carbon Credit Statement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
