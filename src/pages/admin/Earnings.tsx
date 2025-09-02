import { useState } from "react";
import { Search, Download, DollarSign, TrendingUp, CreditCard, Calendar, MoreHorizontal, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Transaction {
  id: string;
  type: "order" | "refund" | "fee" | "payout";
  description: string;
  user: string;
  amount: number;
  fee: number;
  netAmount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  orderId?: string;
}

interface Payout {
  id: string;
  seller: string;
  amount: number;
  status: "scheduled" | "processing" | "completed" | "failed";
  scheduledDate: string;
  completedDate?: string;
  method: string;
  orders: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    type: "order",
    description: "Website Design Service",
    user: "John Doe → Sarah Johnson",
    amount: 150,
    fee: 15,
    netAmount: 135,
    date: "2024-08-15",
    status: "completed",
    orderId: "ORD-001"
  },
  {
    id: "TXN-002", 
    type: "refund",
    description: "Refund for cancelled order",
    user: "Mike Chen → Jane Smith",
    amount: -75,
    fee: 0,
    netAmount: -75,
    date: "2024-08-14",
    status: "completed",
    orderId: "ORD-015"
  },
  {
    id: "TXN-003",
    type: "payout",
    description: "Weekly payout",
    user: "Emma Davis",
    amount: -450,
    fee: 0,
    netAmount: -450,
    date: "2024-08-13",
    status: "completed"
  }
];

const mockPayouts: Payout[] = [
  {
    id: "PAY-001",
    seller: "Sarah Johnson",
    amount: 1250,
    status: "scheduled",
    scheduledDate: "2024-08-20",
    method: "Bank Transfer",
    orders: 8
  },
  {
    id: "PAY-002",
    seller: "Mike Chen", 
    amount: 890,
    status: "processing",
    scheduledDate: "2024-08-18",
    method: "PayPal",
    orders: 12
  },
  {
    id: "PAY-003",
    seller: "Emma Davis",
    amount: 650,
    status: "completed",
    scheduledDate: "2024-08-15",
    completedDate: "2024-08-15",
    method: "Bank Transfer",
    orders: 5
  }
];

export default function Earnings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-success text-success-foreground";
      case "payout":
        return "bg-primary text-primary-foreground";
      case "fee":
        return "bg-accent text-accent-foreground";
      case "refund":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "processing":
        return "bg-warning text-warning-foreground";
      case "scheduled":
        return "bg-accent text-accent-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "failed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Earnings & Billing</h1>
          <p className="text-muted-foreground mt-2">
            Monitor transactions, manage payouts, and configure billing settings
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$24,580</p>
                <p className="text-xs text-success">+12% from last month</p>
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
                <p className="text-sm text-muted-foreground">Platform Fees</p>
                <p className="text-2xl font-bold text-foreground">$2,458</p>
                <p className="text-xs text-muted-foreground">10% commission</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payouts</p>
                <p className="text-2xl font-bold text-foreground">$8,350</p>
                <p className="text-xs text-warning">12 sellers</p>
              </div>
              <div className="h-8 w-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Growth</p>
                <p className="text-2xl font-bold text-foreground">18.5%</p>
                <p className="text-xs text-success">vs previous month</p>
              </div>
              <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="settings">Billing Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View and filter all financial transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full lg:w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="order">Orders</SelectItem>
                    <SelectItem value="refund">Refunds</SelectItem>
                    <SelectItem value="fee">Fees</SelectItem>
                    <SelectItem value="payout">Payouts</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full lg:w-[140px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm text-muted-foreground">{transaction.id}</span>
                          <Badge className={getTransactionTypeColor(transaction.type)}>
                            {transaction.type}
                          </Badge>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        
                        <h3 className="font-medium text-foreground">{transaction.description}</h3>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{transaction.user}</span>
                          <span>•</span>
                          <span>{transaction.date}</span>
                          {transaction.orderId && (
                            <>
                              <span>•</span>
                              <span>Order: {transaction.orderId}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-medium text-foreground">
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        {transaction.fee > 0 && (
                          <div className="text-xs text-muted-foreground">
                            Fee: ${transaction.fee.toFixed(2)}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          Net: ${transaction.netAmount.toFixed(2)}
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
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Invoice
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Payout Management</CardTitle>
              <CardDescription>
                Schedule and manage seller payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPayouts.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm text-muted-foreground">{payout.id}</span>
                          <Badge className={getStatusColor(payout.status)}>
                            {payout.status}
                          </Badge>
                        </div>
                        
                        <h3 className="font-medium text-foreground">{payout.seller}</h3>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{payout.method}</span>
                          <span>•</span>
                          <span>{payout.orders} orders</span>
                          <span>•</span>
                          <span>Scheduled: {payout.scheduledDate}</span>
                          {payout.completedDate && (
                            <>
                              <span>•</span>
                              <span>Completed: {payout.completedDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-lg text-foreground">
                          ${payout.amount.toFixed(2)}
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
                        {payout.status === "scheduled" && (
                          <>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Process Now
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Delay Payout
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem>
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Platform Fees</CardTitle>
                <CardDescription>
                  Configure service fees and commission rates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Service Commission</span>
                  <span className="text-sm">10%</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment Processing Fee</span>
                  <span className="text-sm">2.9% + $0.30</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Withdrawal Fee</span>
                  <span className="text-sm">$2.00</span>
                </div>
                <Button className="w-full mt-4">Edit Fee Structure</Button>
              </CardContent>
            </Card>

            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Payout Schedule</CardTitle>
                <CardDescription>
                  Configure automatic payout settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payout Frequency</span>
                  <span className="text-sm">Weekly (Fridays)</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Minimum Payout</span>
                  <span className="text-sm">$50</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Hold Period</span>
                  <span className="text-sm">14 days</span>
                </div>
                <Button className="w-full mt-4">Update Schedule</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}