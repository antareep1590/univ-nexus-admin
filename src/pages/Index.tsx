import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Univ Jobs
          </h1>
          <Link to="/signin">
            <Button variant="outline">
              Admin Portal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Univ Jobs Admin
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Comprehensive administration platform for managing your freelance marketplace with powerful tools and insights.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="admin-card text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Comprehensive user oversight and account administration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="admin-card text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Content Moderation</CardTitle>
              <CardDescription>
                Review and moderate gigs, orders, and disputes efficiently
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="admin-card text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>
                Comprehensive reporting and business intelligence
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-12">
          <Link to="/signin">
            <Button size="lg" className="bg-gradient-primary shadow-primary hover:opacity-90">
              Access Admin Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
