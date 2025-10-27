'use client';
import { MessageSquare, ShoppingCart, TrendingUp, Clock, Star, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { MetricCard } from "./MetricCard";

const userConversationData = [
  { month: "Jan", users: 1200, conversations: 1850 },
  { month: "Feb", users: 1400, conversations: 2100 },
  { month: "Mar", users: 1600, conversations: 2400 },
  { month: "Apr", users: 1800, conversations: 2700 },
  { month: "May", users: 2000, conversations: 3000 },
  { month: "Jun", users: 2200, conversations: 3300 },
  { month: "Jul", users: 2400, conversations: 3600 },
  { month: "Aug", users: 2600, conversations: 3900 },
  { month: "Sep", users: 2800, conversations: 4200 },
  { month: "Oct", users: 3000, conversations: 4500 },
  { month: "Nov", users: 3200, conversations: 4800 },
  { month: "Dec", users: 3400, conversations: 5100 },
];

const intentData = [
  { name: "Product Recommendation", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Product Enquiry", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Price Comparison", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Support", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 7, color: "hsl(var(--chart-5))" },
];

const categoryData = [
  { category: "Electronics", count: 450 },
  { category: "Apparel", count: 380 },
  { category: "Footwear", count: 320 },
  { category: "Home Decor", count: 280 },
  { category: "Beauty", count: 250 },
  { category: "Sports", count: 220 },
  { category: "Books", count: 180 },
  { category: "Toys", count: 150 },
];

const conversionData = [
  { month: "Jan", rate: 12 },
  { month: "Feb", rate: 14 },
  { month: "Mar", rate: 15 },
  { month: "Apr", rate: 16 },
  { month: "May", rate: 18 },
  { month: "Jun", rate: 19 },
  { month: "Jul", rate: 21 },
  { month: "Aug", rate: 22 },
  { month: "Sep", rate: 23 },
  { month: "Oct", rate: 24 },
  { month: "Nov", rate: 26 },
  { month: "Dec", rate: 28 },
];

const agentData = [
  { agent: "Recommendation", percentage: 22 },
  { agent: "Compare", percentage: 18 },
  { agent: "Image", percentage: 12 },
  { agent: "Cosmos", percentage: 10 },
  { agent: "Deep Reviews", percentage: 9 },
  { agent: "Support", percentage: 8 },
  { agent: "Trend Radar", percentage: 7 },
  { agent: "Green Mode", percentage: 5 },
  { agent: "Gift Suggester", percentage: 4 },
  { agent: "Try-on", percentage: 3 },
  { agent: "Occasion", percentage: 1 },
  { agent: "Deals", percentage: 1 },
];

const peakHoursData = {
  MON: [
    { time: "12 AM", hour: 0, activity: 15 }, { time: "1 AM", hour: 1, activity: 12 }, { time: "2 AM", hour: 2, activity: 10 }, { time: "3 AM", hour: 3, activity: 8 },
    { time: "4 AM", hour: 4, activity: 10 }, { time: "5 AM", hour: 5, activity: 15 }, { time: "6 AM", hour: 6, activity: 25 }, { time: "7 AM", hour: 7, activity: 35 },
    { time: "8 AM", hour: 8, activity: 40 }, { time: "9 AM", hour: 9, activity: 50 }, { time: "10 AM", hour: 10, activity: 55 }, { time: "11 AM", hour: 11, activity: 60 },
    { time: "12 PM", hour: 12, activity: 65 }, { time: "1 PM", hour: 13, activity: 70 }, { time: "2 PM", hour: 14, activity: 85 }, { time: "3 PM", hour: 15, activity: 75 },
    { time: "4 PM", hour: 16, activity: 70 }, { time: "5 PM", hour: 17, activity: 65 }, { time: "6 PM", hour: 18, activity: 80 }, { time: "7 PM", hour: 19, activity: 75 },
    { time: "8 PM", hour: 20, activity: 60 }, { time: "9 PM", hour: 21, activity: 50 }, { time: "10 PM", hour: 22, activity: 40 }, { time: "11 PM", hour: 23, activity: 25 }
  ],
  TUE: [
    { time: "12 AM", hour: 0, activity: 18 }, { time: "1 AM", hour: 1, activity: 14 }, { time: "2 AM", hour: 2, activity: 12 }, { time: "3 AM", hour: 3, activity: 10 },
    { time: "4 AM", hour: 4, activity: 12 }, { time: "5 AM", hour: 5, activity: 18 }, { time: "6 AM", hour: 6, activity: 28 }, { time: "7 AM", hour: 7, activity: 38 },
    { time: "8 AM", hour: 8, activity: 45 }, { time: "9 AM", hour: 9, activity: 55 }, { time: "10 AM", hour: 10, activity: 60 }, { time: "11 AM", hour: 11, activity: 65 },
    { time: "12 PM", hour: 12, activity: 70 }, { time: "1 PM", hour: 13, activity: 75 }, { time: "2 PM", hour: 14, activity: 88 }, { time: "3 PM", hour: 15, activity: 78 },
    { time: "4 PM", hour: 16, activity: 72 }, { time: "5 PM", hour: 17, activity: 68 }, { time: "6 PM", hour: 18, activity: 82 }, { time: "7 PM", hour: 19, activity: 78 },
    { time: "8 PM", hour: 20, activity: 62 }, { time: "9 PM", hour: 21, activity: 52 }, { time: "10 PM", hour: 22, activity: 42 }, { time: "11 PM", hour: 23, activity: 28 }
  ],
  WED: [
    { time: "12 AM", hour: 0, activity: 20 }, { time: "1 AM", hour: 1, activity: 16 }, { time: "2 AM", hour: 2, activity: 14 }, { time: "3 AM", hour: 3, activity: 12 },
    { time: "4 AM", hour: 4, activity: 14 }, { time: "5 AM", hour: 5, activity: 20 }, { time: "6 AM", hour: 6, activity: 30 }, { time: "7 AM", hour: 7, activity: 40 },
    { time: "8 AM", hour: 8, activity: 48 }, { time: "9 AM", hour: 9, activity: 58 }, { time: "10 AM", hour: 10, activity: 63 }, { time: "11 AM", hour: 11, activity: 68 },
    { time: "12 PM", hour: 12, activity: 73 }, { time: "1 PM", hour: 13, activity: 78 }, { time: "2 PM", hour: 14, activity: 92 }, { time: "3 PM", hour: 15, activity: 80 },
    { time: "4 PM", hour: 16, activity: 75 }, { time: "5 PM", hour: 17, activity: 70 }, { time: "6 PM", hour: 18, activity: 85 }, { time: "7 PM", hour: 19, activity: 80 },
    { time: "8 PM", hour: 20, activity: 65 }, { time: "9 PM", hour: 21, activity: 55 }, { time: "10 PM", hour: 22, activity: 45 }, { time: "11 PM", hour: 23, activity: 30 }
  ],
  THU: [
    { time: "12 AM", hour: 0, activity: 22 }, { time: "1 AM", hour: 1, activity: 18 }, { time: "2 AM", hour: 2, activity: 16 }, { time: "3 AM", hour: 3, activity: 14 },
    { time: "4 AM", hour: 4, activity: 16 }, { time: "5 AM", hour: 5, activity: 22 }, { time: "6 AM", hour: 6, activity: 32 }, { time: "7 AM", hour: 7, activity: 42 },
    { time: "8 AM", hour: 8, activity: 50 }, { time: "9 AM", hour: 9, activity: 60 }, { time: "10 AM", hour: 10, activity: 65 }, { time: "11 AM", hour: 11, activity: 70 },
    { time: "12 PM", hour: 12, activity: 75 }, { time: "1 PM", hour: 13, activity: 80 }, { time: "2 PM", hour: 14, activity: 95 }, { time: "3 PM", hour: 15, activity: 82 },
    { time: "4 PM", hour: 16, activity: 78 }, { time: "5 PM", hour: 17, activity: 72 }, { time: "6 PM", hour: 18, activity: 88 }, { time: "7 PM", hour: 19, activity: 82 },
    { time: "8 PM", hour: 20, activity: 68 }, { time: "9 PM", hour: 21, activity: 58 }, { time: "10 PM", hour: 22, activity: 48 }, { time: "11 PM", hour: 23, activity: 32 }
  ],
  FRI: [
    { time: "12 AM", hour: 0, activity: 25 }, { time: "1 AM", hour: 1, activity: 20 }, { time: "2 AM", hour: 2, activity: 18 }, { time: "3 AM", hour: 3, activity: 16 },
    { time: "4 AM", hour: 4, activity: 18 }, { time: "5 AM", hour: 5, activity: 24 }, { time: "6 AM", hour: 6, activity: 34 }, { time: "7 AM", hour: 7, activity: 44 },
    { time: "8 AM", hour: 8, activity: 52 }, { time: "9 AM", hour: 9, activity: 62 }, { time: "10 AM", hour: 10, activity: 68 }, { time: "11 AM", hour: 11, activity: 72 },
    { time: "12 PM", hour: 12, activity: 78 }, { time: "1 PM", hour: 13, activity: 82 }, { time: "2 PM", hour: 14, activity: 98 }, { time: "3 PM", hour: 15, activity: 85 },
    { time: "4 PM", hour: 16, activity: 80 }, { time: "5 PM", hour: 17, activity: 75 }, { time: "6 PM", hour: 18, activity: 90 }, { time: "7 PM", hour: 19, activity: 85 },
    { time: "8 PM", hour: 20, activity: 70 }, { time: "9 PM", hour: 21, activity: 60 }, { time: "10 PM", hour: 22, activity: 50 }, { time: "11 PM", hour: 23, activity: 35 }
  ],
  SAT: [
    { time: "12 AM", hour: 0, activity: 30 }, { time: "1 AM", hour: 1, activity: 25 }, { time: "2 AM", hour: 2, activity: 22 }, { time: "3 AM", hour: 3, activity: 20 },
    { time: "4 AM", hour: 4, activity: 22 }, { time: "5 AM", hour: 5, activity: 28 }, { time: "6 AM", hour: 6, activity: 35 }, { time: "7 AM", hour: 7, activity: 42 },
    { time: "8 AM", hour: 8, activity: 48 }, { time: "9 AM", hour: 9, activity: 55 }, { time: "10 AM", hour: 10, activity: 62 }, { time: "11 AM", hour: 11, activity: 68 },
    { time: "12 PM", hour: 12, activity: 72 }, { time: "1 PM", hour: 13, activity: 78 }, { time: "2 PM", hour: 14, activity: 88 }, { time: "3 PM", hour: 15, activity: 82 },
    { time: "4 PM", hour: 16, activity: 75 }, { time: "5 PM", hour: 17, activity: 70 }, { time: "6 PM", hour: 18, activity: 80 }, { time: "7 PM", hour: 19, activity: 75 },
    { time: "8 PM", hour: 20, activity: 65 }, { time: "9 PM", hour: 21, activity: 55 }, { time: "10 PM", hour: 22, activity: 45 }, { time: "11 PM", hour: 23, activity: 38 }
  ],
  SUN: [
    { time: "12 AM", hour: 0, activity: 28 }, { time: "1 AM", hour: 1, activity: 22 }, { time: "2 AM", hour: 2, activity: 20 }, { time: "3 AM", hour: 3, activity: 18 },
    { time: "4 AM", hour: 4, activity: 20 }, { time: "5 AM", hour: 5, activity: 25 }, { time: "6 AM", hour: 6, activity: 32 }, { time: "7 AM", hour: 7, activity: 38 },
    { time: "8 AM", hour: 8, activity: 45 }, { time: "9 AM", hour: 9, activity: 52 }, { time: "10 AM", hour: 10, activity: 58 }, { time: "11 AM", hour: 11, activity: 65 },
    { time: "12 PM", hour: 12, activity: 70 }, { time: "1 PM", hour: 13, activity: 75 }, { time: "2 PM", hour: 14, activity: 82 }, { time: "3 PM", hour: 15, activity: 78 },
    { time: "4 PM", hour: 16, activity: 72 }, { time: "5 PM", hour: 17, activity: 68 }, { time: "6 PM", hour: 18, activity: 75 }, { time: "7 PM", hour: 19, activity: 70 },
    { time: "8 PM", hour: 20, activity: 60 }, { time: "9 PM", hour: 21, activity: 52 }, { time: "10 PM", hour: 22, activity: 42 }, { time: "11 PM", hour: 23, activity: 35 }
  ]
};

export const ConversationAnalytics = () => {
  const [selectedDay, setSelectedDay] = useState<keyof typeof peakHoursData>("THU");
  
  // Find the peak hour and day across all week data
  const findWeeklyPeak = () => {
    let maxActivity = 0;
    let peakDay = "";
    let peakHour = "";
    
    Object.entries(peakHoursData).forEach(([day, hours]) => {
      hours.forEach((hourData) => {
        if (hourData.activity > maxActivity) {
          maxActivity = hourData.activity;
          peakDay = day;
          peakHour = hourData.time;
        }
      });
    });
    
    return { peakDay, peakHour, maxActivity };
  };
  
  const weeklyPeak = findWeeklyPeak();
  const currentDayData = peakHoursData[selectedDay];
  const maxActivityForDay = Math.max(...currentDayData.map(d => d.activity));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Conversations"
          value="45,231"
          icon={MessageSquare}
        />
        <MetricCard
          title="Total Add to Carts"
          value="12,847"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Add to Cart Rate"
          value="28.4%"
          icon={TrendingUp}
        />
        <MetricCard
          title="Unique Products Recommended"
          value="3,452"
          icon={Package}
        />
      </div>

      {/* User Conversation Trend - Full Width */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">User Conversation Trend</h3>
            <p className="text-sm text-muted-foreground mt-1">Track unique users and total conversations over time</p>
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userConversationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" />
            <XAxis dataKey="month"/>
            <YAxis  />
            {/* <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" /> */}
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Unique Users in Myra" />
            <Line type="monotone" dataKey="conversations" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Total Conversations" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Product Categories and Intent Distribution - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Top Product Categories</h3>
            <p className="text-sm text-muted-foreground mt-1">Most discussed product categories in conversations</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" />
              <XAxis 
                dataKey="category" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis />
              {/* <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" /> */}
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="count" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Intent Distribution</h3>
            <p className="text-sm text-muted-foreground mt-1">Breakdown of user intents across all conversations</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={intentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${entry.value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {intentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Conversion Rate - Full Width */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Conversion Rate - Add to Cart</h3>
            <p className="text-sm text-muted-foreground mt-1">Percentage of conversations resulting in cart additions</p>
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={conversionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" />
            <XAxis dataKey="month"/>
            <YAxis />
            {/* <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" /> */}
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Line type="monotone" dataKey="rate" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Conversion Rate %" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Peak Activity Hours */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Peak Activity Hours</h3>
          <p className="text-sm text-muted-foreground mt-1">Average activity levels throughout the day</p>
        </div>
        
        <Tabs value={selectedDay} onValueChange={(value) => setSelectedDay(value as keyof typeof peakHoursData)}>
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="MON">MON</TabsTrigger>
            <TabsTrigger value="TUE">TUE</TabsTrigger>
            <TabsTrigger value="WED">WED</TabsTrigger>
            <TabsTrigger value="THU">THU</TabsTrigger>
            <TabsTrigger value="FRI">FRI</TabsTrigger>
            <TabsTrigger value="SAT">SAT</TabsTrigger>
            <TabsTrigger value="SUN">SUN</TabsTrigger>
          </TabsList>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentDayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" opacity={0.3} />
                <XAxis 
                  dataKey="time"
                  interval={0}
                />
                <YAxis 
                  domain={[0, 100]}
                />
                {/* <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  interval={0}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  domain={[0, 100]}
                /> */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                  labelStyle={{ color: "hsl(var(--popover-foreground))" }}
                />
                <Bar 
                  dataKey="activity" 
                  radius={[8, 8, 0, 0]}
                  fill="url(#colorGradient)"
                >
                  {currentDayData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.activity === maxActivityForDay ? "url(#peakGradient)" : "hsl(var(--chart-1))"}
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={1}/>
                    <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6}/>
                  </linearGradient>
                  <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={1}/>
                    <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Tabs>
        
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Peak activity across the week: <span className="font-semibold text-foreground">{weeklyPeak.peakDay} at {weeklyPeak.peakHour}</span>
          </p>
        </div>
      </Card>
    </div>
  );
};
