import { useState } from "react";
import { TrendingUp, Users, DollarSign, ShoppingCart, Calendar, Download, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30days");

  const mockChartData = {
    userGrowth: [
      { month: "Jan", buyers: 120, sellers: 45 },
      { month: "Feb", buyers: 165, sellers: 62 },
      { month: "Mar", buyers: 203, sellers: 78 },
      { month: "Apr", buyers: 256, sellers: 94 },
      { month: "May", buyers: 312, sellers: 115 },
      { month: "Jun", buyers: 378, sellers: 138 }
    ],
    revenueData: [
      { month: "Jan", revenue: 12500, orders: 89 },
      { month: "Feb", revenue: 18200, orders: 124 },
      { month: "Mar", revenue: 24600, orders: 167 },
      { month: "Apr", revenue: 31200, orders: 203 },
      { month: "May", revenue: 28900, orders: 186 },
      { month: "Jun", revenue: 35400, orders: 234 }
    ],
    categoryBreakdown: [
      { name: "Web Development", value: 35, orders: 156 },
      { name: "Graphic Design", value: 28, orders: 124 },
      { name: "Content Writing", value: 18, orders: 89 },
      { name: "Digital Marketing", value: 12, orders: 67 },
      { name: "Video Editing", value: 7, orders: 34 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reporting</h1>
          <p className="text-muted-foreground mt-2">
            Monitor platform performance and generate detailed reports
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-primary shadow-primary">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">1,248</p>
                <p className="text-xs text-success">+12.4% from last month</p>
                <p className="text-xs text-muted-foreground mt-1">Top locations: NY, CA, TX</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Buyers</p>
                <p className="text-2xl font-bold text-foreground">1,599</p>
                <p className="text-xs text-success">+23.8% from last month</p>
                <p className="text-xs text-muted-foreground mt-1">Recent sign-ups: 47 this week</p>
              </div>
              <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$156,240</p>
                <p className="text-xs text-success">+22.5% from last month</p>
              </div>
              <div className="h-8 w-8 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">1,234</p>
                <p className="text-xs text-success">+15.3% from last month</p>
              </div>
              <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-foreground">$127</p>
                <p className="text-xs text-success">+6.2% from last month</p>
              </div>
              <div className="h-8 w-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Health */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>Key metrics overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Order Completion Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Satisfaction</span>
                    <span className="font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dispute Resolution Rate</span>
                    <span className="font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Platform Uptime</span>
                    <span className="font-medium">99.8%</span>
                  </div>
                  <Progress value={99.8} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Registrations</p>
                      <p className="text-xs text-muted-foreground">Users joined today</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">24</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-success/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Orders Placed</p>
                      <p className="text-xs text-muted-foreground">New orders today</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">67</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Gigs Published</p>
                      <p className="text-xs text-muted-foreground">New services added</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">18</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-warning/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Revenue Generated</p>
                      <p className="text-xs text-muted-foreground">Total earnings today</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">$8,450</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Top Performing Sellers</CardTitle>
              <CardDescription>Based on revenue and rating (last 30 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", revenue: 4250, orders: 28, rating: 4.9 },
                  { name: "Mike Chen", revenue: 3890, orders: 34, rating: 4.8 },
                  { name: "Emma Davis", revenue: 3456, orders: 23, rating: 4.9 },
                  { name: "Alex Thompson", revenue: 2980, orders: 19, rating: 4.7 },
                  { name: "Lisa Rodriguez", revenue: 2654, orders: 21, rating: 4.8 }
                ].map((seller, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                      <div>
                        <p className="font-medium">{seller.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {seller.orders} orders • ⭐ {seller.rating}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-foreground">${seller.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart Placeholder */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>Buyers vs Sellers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Current: 2,156 buyers • 691 sellers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Demographics */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>User distribution and activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Users (30 days)</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Returning Users</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mobile Users</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Verified Accounts</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart Placeholder */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue and order volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Revenue chart would appear here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Current month: $35,400 • 234 orders
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Platform earnings and fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Gross Revenue</span>
                  <span className="font-bold">$156,240</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Platform Fees (10%)</span>
                  <span className="font-bold text-primary">$15,624</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Payment Processing</span>
                  <span className="font-medium">$4,687</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Seller Payouts</span>
                  <span className="font-medium">$135,929</span>
                </div>
                
                <hr className="my-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Net Platform Revenue</span>
                  <span className="font-bold text-success">$10,937</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Performance */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Orders and revenue by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChartData.categoryBreakdown.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-muted-foreground">{category.orders} orders</span>
                      </div>
                      <Progress value={category.value} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">
                        {category.value}% of total
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Insights */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Category Insights</CardTitle>
                <CardDescription>Growth trends and opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-success">Growing Category</span>
                  </div>
                  <p className="text-sm">Web Development shows +45% growth this month</p>
                </div>
                
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium text-warning">Seasonal Trend</span>
                  </div>
                  <p className="text-sm">Video Editing peaks during summer months</p>
                </div>
                
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <PieChart className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Opportunity</span>
                  </div>
                  <p className="text-sm">Consider promoting Digital Marketing services</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}