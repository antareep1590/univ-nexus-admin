import { useState } from "react";
import { Search, MoreHorizontal, Eye, RefreshCw, XCircle, DollarSign, MessageSquare, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface Order {
  id: string;
  gigTitle: string;
  buyer: {
    name: string;
    avatar?: string;
  };
  seller: {
    name: string;
    avatar?: string;
  };
  status: "pending" | "active" | "delivered" | "completed" | "cancelled" | "disputed";
  amount: number;
  orderDate: string;
  deliveryDate: string;
  hasDispute: boolean;
  messages: number;
  milestones: {
    total: number;
    completed: number;
  };
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    gigTitle: "Modern Website Design",
    buyer: { name: "John Doe", avatar: "/api/placeholder/32/32" },
    seller: { name: "Sarah Johnson", avatar: "/api/placeholder/32/32" },
    status: "active",
    amount: 150,
    orderDate: "2024-08-10",
    deliveryDate: "2024-08-20",
    hasDispute: false,
    messages: 12,
    milestones: { total: 3, completed: 1 }
  },
  {
    id: "ORD-002",
    gigTitle: "Marketing Copy Writing",
    buyer: { name: "Jane Smith" },
    seller: { name: "Mike Chen" },
    status: "disputed",
    amount: 75,
    orderDate: "2024-08-08",
    deliveryDate: "2024-08-15",
    hasDispute: true,
    messages: 25,
    milestones: { total: 2, completed: 2 }
  },
  {
    id: "ORD-003",
    gigTitle: "Social Media Graphics",
    buyer: { name: "Alex Wilson" },
    seller: { name: "Emma Davis", avatar: "/api/placeholder/32/32" },
    status: "completed",
    amount: 90,
    orderDate: "2024-08-05",
    deliveryDate: "2024-08-12",
    hasDispute: false,
    messages: 8,
    milestones: { total: 1, completed: 1 }
  }
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.gigTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "active":
        return "bg-primary text-primary-foreground";
      case "delivered":
        return "bg-accent text-accent-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "cancelled":
      case "disputed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const calculateProgress = (milestones: { total: number; completed: number }) => {
    return (milestones.completed / milestones.total) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground mt-2">
            Monitor orders, manage disputes, and track delivery progress
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          Export Orders
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Orders</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <RefreshCw className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disputes</p>
                <p className="text-2xl font-bold text-destructive">3</p>
              </div>
              <div className="h-8 w-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-foreground">$12,450</p>
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
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-foreground">94%</p>
              </div>
              <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Search & Filter Orders</CardTitle>
          <CardDescription>
            Find orders by buyer, seller, gig, or order ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by order ID, gig title, buyer, or seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full lg:w-[160px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>
            All orders with their current status and progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-muted-foreground">{order.id}</span>
                      <h3 className="font-medium text-foreground">{order.gigTitle}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      {order.hasDispute && (
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Dispute
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Buyer:</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={order.buyer.avatar} alt={order.buyer.name} />
                            <AvatarFallback className="text-xs">
                              {order.buyer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{order.buyer.name}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Seller:</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={order.seller.avatar} alt={order.seller.name} />
                            <AvatarFallback className="text-xs">
                              {order.seller.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{order.seller.name}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-foreground">
                        ${order.amount}
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        <span className="text-xs">{order.messages}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-muted-foreground">
                        Ordered: {order.orderDate}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Due: {order.deliveryDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Progress:</span>
                        <div className="w-20">
                          <Progress value={calculateProgress(order.milestones)} className="h-1" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {order.milestones.completed}/{order.milestones.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Issue Refund
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Order Details: {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Complete order timeline and administrative controls
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Overview */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gig:</span>
                      <span>{selectedOrder.gigTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">${selectedOrder.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Messages:</span>
                      <span>{selectedOrder.messages}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Date:</span>
                      <span>{selectedOrder.orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Date:</span>
                      <span>{selectedOrder.deliveryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress:</span>
                      <span>{selectedOrder.milestones.completed}/{selectedOrder.milestones.total} milestones</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Participants */}
              <div>
                <h4 className="font-medium mb-3">Participants</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Avatar>
                      <AvatarImage src={selectedOrder.buyer.avatar} alt={selectedOrder.buyer.name} />
                      <AvatarFallback>
                        {selectedOrder.buyer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Buyer</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.buyer.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Avatar>
                      <AvatarImage src={selectedOrder.seller.avatar} alt={selectedOrder.seller.name} />
                      <AvatarFallback>
                        {selectedOrder.seller.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Seller</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.seller.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Admin Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Messages
                </Button>
                <Button variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Issue Refund
                </Button>
                <Button variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Order
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}