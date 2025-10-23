import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RedemptionFlow } from "./RedemptionFlow";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Coins, TrendingUp, Wallet, ArrowUpRight, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface MonetizationStats {
  totalCredits: number;
  totalValue: number;
  todayEarnings: number;
  monthEarnings: number;
  availableBalance: number;
}

export const MonetizationDashboard = () => {
  const [stats, setStats] = useState<MonetizationStats>({
    totalCredits: 0,
    totalValue: 0,
    todayEarnings: 0,
    monthEarnings: 0,
    availableBalance: 0,
  });
  const [earningsData, setEarningsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [marketRate, setMarketRate] = useState(2500);
  const { toast } = useToast();

  useEffect(() => {
    loadMonetizationData();
    subscribeToRealtimeUpdates();
  }, []);

  const loadMonetizationData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get market rate
      const { data: rateData } = await supabase
        .from("carbon_market_rates")
        .select("rate_per_credit")
        .order("effective_date", { ascending: false })
        .limit(1)
        .single();

      if (rateData) setMarketRate(rateData.rate_per_credit);

      // Get all credits
      const { data: credits } = await supabase
        .from("carbon_credits")
        .select("*")
        .eq("user_id", user.id)
        .order("earned_date", { ascending: false });

      if (credits) {
        const total = credits.reduce((sum, c) => sum + Number(c.credits_earned), 0);
        const totalVal = credits.reduce((sum, c) => sum + Number(c.credit_value || 0), 0);
        
        const today = new Date().toISOString().split('T')[0];
        const todayCredits = credits.filter(c => c.earned_date.startsWith(today));
        const todayVal = todayCredits.reduce((sum, c) => sum + Number(c.credit_value || 0), 0);

        const monthStart = new Date();
        monthStart.setDate(1);
        const monthCredits = credits.filter(c => new Date(c.earned_date) >= monthStart);
        const monthVal = monthCredits.reduce((sum, c) => sum + Number(c.credit_value || 0), 0);

        // Get redeemed amount
        const { data: redemptions } = await supabase
          .from("credit_redemptions")
          .select("monetary_value")
          .eq("user_id", user.id)
          .eq("status", "completed");

        const redeemed = redemptions?.reduce((sum, r) => sum + Number(r.monetary_value), 0) || 0;

        setStats({
          totalCredits: total,
          totalValue: totalVal,
          todayEarnings: todayVal,
          monthEarnings: monthVal,
          availableBalance: totalVal - redeemed,
        });

        // Generate earnings timeline (last 30 days)
        const timeline = [];
        for (let i = 29; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const dayCredits = credits.filter(c => c.earned_date.startsWith(dateStr));
          const dayValue = dayCredits.reduce((sum, c) => sum + Number(c.credit_value || 0), 0);
          
          timeline.push({
            date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            earnings: dayValue,
          });
        }
        setEarningsData(timeline);
      }

      setLoading(false);
    } catch (error: any) {
      console.error("Error loading monetization data:", error);
      toast({
        title: "Error",
        description: "Failed to load monetization data",
        variant: "destructive",
      });
    }
  };

  const subscribeToRealtimeUpdates = () => {
    const channel = supabase
      .channel("monetization-updates")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "carbon_credits",
        },
        () => {
          loadMonetizationData();
          toast({
            title: "🎉 New Credits Earned!",
            description: "Your balance has been updated",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  if (loading) {
    return <div className="animate-pulse">Loading monetization data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{stats.availableBalance.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">{stats.totalCredits.toFixed(2)} credits</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.todayEarnings.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">+{((stats.todayEarnings / stats.monthEarnings) * 100).toFixed(1)}% of month</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.monthEarnings.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Track your progress</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Rate</CardTitle>
            <Coins className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{marketRate.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">per credit</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Timeline</CardTitle>
          <CardDescription>Your carbon credit earnings over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Area type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" fill="url(#earnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ready to Redeem?</CardTitle>
            <CardDescription>Convert your carbon credits to cash or loan benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Minimum for bank transfer:</span>
                <span className="font-bold">₹1,000</span>
              </div>
              <Progress value={(stats.availableBalance / 1000) * 100} className="h-2" />
              <Button className="w-full" disabled={stats.availableBalance < 1000}>
                <Wallet className="mr-2 h-4 w-4" />
                Redeem Credits
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Boost Your Loan</CardTitle>
            <CardDescription>Use credits to get better loan terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Loan boost potential:</span>
                <span className="font-bold">₹{(stats.totalCredits * 15).toLocaleString('en-IN')}</span>
              </div>
              <Button className="w-full" variant="outline">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Check Loan Eligibility
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
