import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ShoppingCart, Calendar, DollarSign, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for a buyer profile
const mockBuyer = {
  id: "1",
  name: "John Smith",
  email: "john.smith@university.edu",
  avatar: "/api/placeholder/120/120",
  location: "Los Angeles, USA",
  joinDate: "2024-01-10",
  university: "UCLA",
  major: "Business Administration",
  totalOrders: 24,
  totalSpent: 1250,
  avgOrderValue: 52,
  preferredCategories: ["Web Design", "Content Writing", "Marketing"],
  orderHistory: [
    {
      id: "ORD-024",
      gigTitle: "Modern Website Design",
      seller: "Sarah Johnson",
      amount: 150,
      date: "2024-08-25",
      status: "completed",
      rating: 5
    },
    {
      id: "ORD-023",
      gigTitle: "Marketing Copy Writing",
      seller: "Mike Chen",
      amount: 75,
      date: "2024-08-20",
      status: "completed",
      rating: 4
    },
    {
      id: "ORD-022",
      gigTitle: "Social Media Graphics",
      seller: "Emma Davis",
      amount: 90,
      date: "2024-08-15",
      status: "completed",
      rating: 5
    },
    {
      id: "ORD-021",
      gigTitle: "Business Plan Review",
      seller: "Alex Wilson",
      amount: 200,
      date: "2024-08-10",
      status: "in_progress",
      rating: null
    }
  ],
  stats: {
    completedOrders: 21,
    avgRating: 4.8,
    totalSaved: "$340",
    loyaltyLevel: "Gold"
  },
  preferences: {
    communicationStyle: "Professional",
    budget: "$50-200 per order",
    deliveryPreference: "Standard (3-5 days)",
    paymentMethod: "Credit Card"
  }
};

export default function BuyerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in_progress":
        return "bg-primary text-primary-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/admin/buyers")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Buyers
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Buyer Profile</h1>
      </div>

      {/* Profile Header */}
      <Card className="admin-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={mockBuyer.avatar} alt={mockBuyer.name} />
                <AvatarFallback className="text-2xl">
                  {mockBuyer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Badge variant="outline" className="mb-2">
                {mockBuyer.stats.loyaltyLevel} Member
              </Badge>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{mockBuyer.name}</h2>
                  <p className="text-muted-foreground mb-2">{mockBuyer.email}</p>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {mockBuyer.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member since {mockBuyer.joinDate}
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  Suspend Account
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{mockBuyer.totalOrders}</div>
                  <div className="text-xs text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-success">${mockBuyer.totalSpent}</div>
                  <div className="text-xs text-muted-foreground">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-accent-foreground">${mockBuyer.avgOrderValue}</div>
                  <div className="text-xs text-muted-foreground">Avg Order Value</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-warning">{mockBuyer.stats.avgRating}</div>
                  <div className="text-xs text-muted-foreground">Avg Rating Given</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Preferred Categories</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {mockBuyer.preferredCategories.map((category, index) => (
                <Badge key={index} variant="secondary">{category}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Recent orders and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Gig Title</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBuyer.orderHistory.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{order.id}</TableCell>
                    <TableCell className="font-medium">{order.gigTitle}</TableCell>
                    <TableCell>{order.seller}</TableCell>
                    <TableCell className="font-medium">${order.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.rating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="text-sm">{order.rating}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Pending</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}