import { useState } from "react";
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Eye } from "lucide-react";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "both";
  status: "active" | "pending" | "suspended";
  joinDate: string;
  lastActive: string;
  totalOrders: number;
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "seller",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    totalOrders: 24,
    avatar: "/api/placeholder/32/32"
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2024-02-20",
    lastActive: "1 day ago",
    totalOrders: 8,
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    role: "both",
    status: "pending",
    joinDate: "2024-08-01",
    lastActive: "5 minutes ago",
    totalOrders: 0,
  },
  {
    id: "4",
    name: "Alex Smith",
    email: "alex.smith@example.com",
    role: "seller",
    status: "suspended",
    joinDate: "2023-12-10",
    lastActive: "1 week ago",
    totalOrders: 156,
  }
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "seller":
        return "bg-primary text-primary-foreground";
      case "buyer":
        return "bg-secondary text-secondary-foreground";
      case "both":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage platform users, review profiles, and moderate accounts
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          Export Users
        </Button>
      </div>

      {/* Filters */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>
            Find and filter users by various criteria
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
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Platform users and their account details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-foreground">{user.name}</h3>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      <Badge variant="outline" className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Joined {user.joinDate}</span>
                      <span>•</span>
                      <span>Last active {user.lastActive}</span>
                      <span>•</span>
                      <span>{user.totalOrders} orders</span>
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
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.status === "active" ? (
                      <DropdownMenuItem className="text-destructive">
                        <UserX className="mr-2 h-4 w-4" />
                        Suspend User
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-success">
                        <UserCheck className="mr-2 h-4 w-4" />
                        Activate User
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}