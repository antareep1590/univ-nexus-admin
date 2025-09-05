import { useState } from "react";
import { Search, MoreHorizontal, UserCheck, UserX, Eye, ShoppingCart } from "lucide-react";
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

interface Buyer {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  status: "active" | "suspended" | "pending";
  totalOrders: number;
  lastOrderDate: string;
  totalSpent: number;
  avatar?: string;
}

const mockBuyers: Buyer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@university.edu",
    registrationDate: "2024-01-10",
    status: "active",
    totalOrders: 24,
    lastOrderDate: "2024-08-25",
    totalSpent: 1250,
    avatar: "/api/placeholder/32/32"
  },
  {
    id: "2",
    name: "Lisa Rodriguez",
    email: "lisa.r@university.edu",
    registrationDate: "2024-02-15",
    status: "active",
    totalOrders: 8,
    lastOrderDate: "2024-08-20",
    totalSpent: 420,
  },
  {
    id: "3",
    name: "David Kim",
    email: "david.kim@university.edu",
    registrationDate: "2024-08-01",
    status: "pending",
    totalOrders: 0,
    lastOrderDate: "Never",
    totalSpent: 0,
  },
  {
    id: "4",
    name: "Rachel Green",
    email: "rachel.g@university.edu",
    registrationDate: "2023-11-05",
    status: "suspended",
    totalOrders: 156,
    lastOrderDate: "2024-07-10",
    totalSpent: 8920,
  },
  {
    id: "5",
    name: "Tom Wilson",
    email: "tom.w@university.edu",
    registrationDate: "2024-03-12",
    status: "active",
    totalOrders: 32,
    lastOrderDate: "2024-08-28",
    totalSpent: 1680,
  }
];

export default function Buyers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [spendingFilter, setSpendingFilter] = useState<string>("all");
  const [selectedBuyers, setSelectedBuyers] = useState<string[]>([]);

  const filteredBuyers = mockBuyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || buyer.status === statusFilter;
    
    let matchesSpending = true;
    if (spendingFilter === "low") matchesSpending = buyer.totalSpent < 500;
    else if (spendingFilter === "medium") matchesSpending = buyer.totalSpent >= 500 && buyer.totalSpent < 2000;
    else if (spendingFilter === "high") matchesSpending = buyer.totalSpent >= 2000;
    
    return matchesSearch && matchesStatus && matchesSpending;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "suspended":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSpendingLevel = (amount: number) => {
    if (amount === 0) return { level: "None", color: "bg-muted text-muted-foreground" };
    if (amount < 500) return { level: "Low", color: "bg-secondary text-secondary-foreground" };
    if (amount < 2000) return { level: "Medium", color: "bg-accent text-accent-foreground" };
    return { level: "High", color: "bg-primary text-primary-foreground" };
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBuyers(filteredBuyers.map(b => b.id));
    } else {
      setSelectedBuyers([]);
    }
  };

  const handleSelectBuyer = (buyerId: string, checked: boolean) => {
    if (checked) {
      setSelectedBuyers([...selectedBuyers, buyerId]);
    } else {
      setSelectedBuyers(selectedBuyers.filter(id => id !== buyerId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Buyer Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage buyer accounts and their purchase activities
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          Export Buyers
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="admin-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockBuyers.length}</p>
                <p className="text-sm text-muted-foreground">Total Buyers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <UserCheck className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockBuyers.filter(b => b.status === "active").length}</p>
                <p className="text-sm text-muted-foreground">Active Buyers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <ShoppingCart className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockBuyers.reduce((sum, b) => sum + b.totalOrders, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <span className="text-warning font-bold text-lg">$</span>
              </div>
              <div>
                <p className="text-2xl font-bold">${mockBuyers.reduce((sum, b) => sum + b.totalSpent, 0).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>
            Find and filter buyers by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={spendingFilter} onValueChange={setSpendingFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Spending" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Spending</SelectItem>
                <SelectItem value="low">Low ($0-$499)</SelectItem>
                <SelectItem value="medium">Medium ($500-$1999)</SelectItem>
                <SelectItem value="high">High ($2000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Buyers Table */}
      <Card className="admin-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Buyers ({filteredBuyers.length})</CardTitle>
              <CardDescription>
                Buyer accounts and their purchase details
              </CardDescription>
            </div>
            {selectedBuyers.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Activate Selected ({selectedBuyers.length})
                </Button>
                <Button variant="destructive" size="sm">
                  Suspend Selected ({selectedBuyers.length})
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedBuyers.length === filteredBuyers.length && filteredBuyers.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBuyers.map((buyer) => {
                  const spendingLevel = getSpendingLevel(buyer.totalSpent);
                  return (
                    <TableRow key={buyer.id} className="hover:bg-muted/50">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedBuyers.includes(buyer.id)}
                          onChange={(e) => handleSelectBuyer(buyer.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={buyer.avatar} alt={buyer.name} />
                            <AvatarFallback>
                              {buyer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{buyer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{buyer.email}</TableCell>
                      <TableCell>{buyer.registrationDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(buyer.status)}>
                          {buyer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{buyer.totalOrders}</TableCell>
                      <TableCell className="text-muted-foreground">{buyer.lastOrderDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">${buyer.totalSpent}</span>
                          <Badge variant="outline" className={spendingLevel.color}>
                            {spendingLevel.level}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.location.href = `/admin/buyers/${buyer.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {buyer.status === "active" ? (
                              <DropdownMenuItem className="text-destructive">
                                <UserX className="mr-2 h-4 w-4" />
                                Suspend Buyer
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-success">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate Buyer
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}