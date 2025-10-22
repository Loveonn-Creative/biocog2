import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, TrendingUp, TrendingDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: "earned" | "redeemed";
  amount: number;
  value: number;
  date: string;
  status: string;
  description: string;
}

export const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchQuery, filterType]);

  const loadTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load earned credits
      const { data: credits } = await supabase
        .from("carbon_credits")
        .select("*")
        .eq("user_id", user.id)
        .order("earned_date", { ascending: false });

      // Load redemptions
      const { data: redemptions } = await supabase
        .from("credit_redemptions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const allTransactions: Transaction[] = [];

      if (credits) {
        credits.forEach((credit) => {
          allTransactions.push({
            id: credit.id,
            type: "earned",
            amount: Number(credit.credits_earned),
            value: Number(credit.credit_value || 0),
            date: credit.earned_date,
            status: credit.status,
            description: "Carbon credits earned",
          });
        });
      }

      if (redemptions) {
        redemptions.forEach((redemption) => {
          allTransactions.push({
            id: redemption.id,
            type: "redeemed",
            amount: Number(redemption.credit_amount),
            value: Number(redemption.monetary_value),
            date: redemption.created_at,
            status: redemption.status,
            description: `${redemption.redemption_type?.replace('_', ' ')} redemption`,
          });
        });
      }

      // Sort by date
      allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setTransactions(allTransactions);
      setLoading(false);
    } catch (error: any) {
      console.error("Error loading transactions:", error);
      toast({
        title: "Error",
        description: "Failed to load transaction history",
        variant: "destructive",
      });
    }
  };

  const filterTransactions = () => {
    let filtered = [...transactions];

    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Date", "Type", "Amount (Credits)", "Value (₹)", "Status", "Description"],
      ...filteredTransactions.map((t) => [
        new Date(t.date).toLocaleDateString("en-IN"),
        t.type,
        t.amount,
        t.value,
        t.status,
        t.description,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast({
      title: "Export Complete",
      description: "Transaction history exported to CSV",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      completed: "default",
      pending: "secondary",
      processing: "secondary",
      failed: "destructive",
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.replace("_", " ")}
      </Badge>
    );
  };

  if (loading) {
    return <div className="animate-pulse">Loading transactions...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>All your carbon credit earnings and redemptions</CardDescription>
          </div>
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="earned">Earned</SelectItem>
              <SelectItem value="redeemed">Redeemed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Credits</TableHead>
                <TableHead className="text-right">Value (₹)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "earned" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-orange-500" />
                        )}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right font-mono">
                      {transaction.type === "earned" ? "+" : "-"}
                      {transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {transaction.type === "earned" ? "+" : "-"}₹
                      {transaction.value.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
