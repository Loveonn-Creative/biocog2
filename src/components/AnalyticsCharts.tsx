import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Leaf, Award, Zap } from "lucide-react";

// Mock data for various analytics
const emissionsData = [
  { month: 'Jan', emissions: 45, reduction: 5 },
  { month: 'Feb', emissions: 42, reduction: 8 },
  { month: 'Mar', emissions: 38, reduction: 12 },
  { month: 'Apr', emissions: 35, reduction: 15 },
  { month: 'May', emissions: 31, reduction: 19 },
  { month: 'Jun', emissions: 28, reduction: 22 },
];

const earningsData = [
  { month: 'Jan', credits: 2500, loans: 0 },
  { month: 'Feb', credits: 3200, loans: 50000 },
  { month: 'Mar', credits: 4100, loans: 75000 },
  { month: 'Apr', credits: 5300, loans: 125000 },
  { month: 'May', credits: 6800, loans: 150000 },
  { month: 'Jun', credits: 8400, loans: 200000 },
];

const categoryData = [
  { name: 'Energy', value: 45, color: '#22c55e' },
  { name: 'Transport', value: 25, color: '#3b82f6' },
  { name: 'Waste', value: 20, color: '#f59e0b' },
  { name: 'Water', value: 10, color: '#ef4444' }
];

const esgScoreData = [
  { category: 'Environmental', score: 85, target: 90 },
  { category: 'Social', score: 78, target: 85 },
  { category: 'Governance', score: 82, target: 88 }
];

interface AnalyticsChartsProps {
  className?: string;
}

export const AnalyticsCharts = ({ className }: AnalyticsChartsProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CO₂ Reduced</p>
              <p className="text-2xl font-bold text-success">22 tons</p>
              <p className="text-xs text-success flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                15% this month
              </p>
            </div>
            <Leaf className="w-8 h-8 text-success" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Credits Earned</p>
              <p className="text-2xl font-bold text-primary">₹8,400</p>
              <p className="text-xs text-primary flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                23% this month
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ESG Score</p>
              <p className="text-2xl font-bold text-warning">82/100</p>
              <p className="text-xs text-warning flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +4 points
              </p>
            </div>
            <Award className="w-8 h-8 text-warning" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-info/10 to-info/5 border-info/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Green Loan</p>
              <p className="text-2xl font-bold text-info">₹2L</p>
              <p className="text-xs text-info flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                Pre-approved
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-info" />
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Emissions Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">CO₂ Emissions Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="emissions" 
                stackId="1"
                stroke="hsl(var(--destructive))" 
                fill="hsl(var(--destructive)/0.2)" 
              />
              <Area 
                type="monotone" 
                dataKey="reduction" 
                stackId="2"
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success)/0.2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Earnings Growth */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Earnings Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="credits" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
              <Line 
                type="monotone" 
                dataKey="loans" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Emissions Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Emissions by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* ESG Score Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">ESG Score Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={esgScoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Progress Indicators */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Monthly Target</h4>
              <span className="text-sm text-success">87% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-success h-2 rounded-full transition-all duration-300" style={{width: '87%'}}></div>
            </div>
            <p className="text-sm text-muted-foreground">26 tons reduced of 30 tons target</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Green Loan Progress</h4>
              <span className="text-sm text-primary">₹2L of ₹5L</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{width: '40%'}}></div>
            </div>
            <p className="text-sm text-muted-foreground">40% of maximum loan amount</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">ESG Certification</h4>
              <span className="text-sm text-warning">82/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-warning h-2 rounded-full transition-all duration-300" style={{width: '82%'}}></div>
            </div>
            <p className="text-sm text-muted-foreground">18 points to Gold certification</p>
          </div>
        </Card>
      </div>
    </div>
  );
};