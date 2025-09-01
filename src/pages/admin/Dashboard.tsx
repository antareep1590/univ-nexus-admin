import { Users, Briefcase, ShoppingCart, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const recentActivities = [
    {
      id: 1,
      type: "user_signup",
      message: "New seller registered",
      user: "Sarah Johnson",
      time: "2 minutes ago",
      status: "new"
    },
    {
      id: 2,
      type: "gig_submitted",
      message: "Gig submitted for review",
      user: "Mike Chen",
      time: "15 minutes ago",
      status: "pending"
    },
    {
      id: 3,
      type: "order_completed",
      message: "Order #1234 completed",
      user: "Alex Smith",
      time: "1 hour ago",
      status: "completed"
    },
    {
      id: 4,
      type: "dispute_opened",
      message: "Dispute opened for order #1235",
      user: "Emma Wilson",
      time: "2 hours ago",
      status: "dispute"
    }
  ];

  const statusColors = {
    new: "bg-primary text-primary-foreground",
    pending: "bg-warning text-warning-foreground",
    completed: "bg-success text-success-foreground",
    dispute: "bg-destructive text-destructive-foreground"
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening on Univ Jobs today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="12,847"
          change="+12%"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Active Gigs"
          value="3,429"
          change="+8%"
          changeType="positive"
          icon={Briefcase}
        />
        <StatsCard
          title="Orders Today"
          value="187"
          change="+23%"
          changeType="positive"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Revenue (MTD)"
          value="$89,420"
          change="+15%"
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 admin-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest platform activities and updates
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.message}</p>
                    <p className="text-sm text-muted-foreground">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                  <Badge className={statusColors[activity.status as keyof typeof statusColors]}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Review New Users
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Briefcase className="mr-2 h-4 w-4" />
              Moderate Gigs
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Process Refunds
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Resolve Disputes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}