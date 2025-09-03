import { useState } from "react";
import { Search, MessageSquare, Clock, CheckCircle, XCircle, AlertTriangle, Eye, FileText, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Dispute {
  id: string;
  orderId: string;
  gigTitle: string;
  buyer: {
    name: string;
    avatar?: string;
  };
  seller: {
    name: string;
    avatar?: string;
  };
  status: "open" | "in_review" | "resolved" | "escalated";
  priority: "low" | "medium" | "high";
  reason: string;
  amount: number;
  openedDate: string;
  lastActivity: string;
  description: string;
  evidenceCount: number;
  adminNotes: string[];
}

const mockDisputes: Dispute[] = [
  {
    id: "DSP-001",
    orderId: "ORD-025",
    gigTitle: "Website Development Project",
    buyer: { name: "John Davis", avatar: "/api/placeholder/32/32" },
    seller: { name: "Sarah Wilson" },
    status: "open",
    priority: "high",
    reason: "Delivered work doesn't match requirements",
    amount: 350,
    openedDate: "2024-08-15",
    lastActivity: "2 hours ago",
    description: "The delivered website is missing key features that were specified in the requirements. The responsive design is broken on mobile devices.",
    evidenceCount: 3,
    adminNotes: []
  },
  {
    id: "DSP-002",
    orderId: "ORD-018",
    gigTitle: "Logo Design Package",
    buyer: { name: "Mike Johnson" },
    seller: { name: "Emma Chen", avatar: "/api/placeholder/32/32" },
    status: "in_review",
    priority: "medium",
    reason: "Copyright infringement concerns",
    amount: 150,
    openedDate: "2024-08-12",
    lastActivity: "1 day ago",
    description: "Buyer claims the logo design contains elements that are copyrighted material from another company.",
    evidenceCount: 5,
    adminNotes: ["Requested additional evidence from buyer", "Contacted seller for response"]
  },
  {
    id: "DSP-003",
    orderId: "ORD-033",
    gigTitle: "Content Writing Services",
    buyer: { name: "Lisa Rodriguez" },
    seller: { name: "Alex Thompson", avatar: "/api/placeholder/32/32" },
    status: "resolved",
    priority: "low",
    reason: "Late delivery",
    amount: 75,
    openedDate: "2024-08-08",
    lastActivity: "3 days ago",
    description: "Content was delivered 5 days after the agreed deadline without prior communication.",
    evidenceCount: 2,
    adminNotes: ["Partial refund issued", "Seller acknowledged delay", "Case closed with mutual agreement"]
  }
];

export default function Disputes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [adminComment, setAdminComment] = useState("");

  const filteredDisputes = mockDisputes.filter(dispute => {
    const matchesSearch = dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.gigTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || dispute.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || dispute.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-destructive text-destructive-foreground";
      case "in_review":
        return "bg-warning text-warning-foreground";
      case "resolved":
        return "bg-success text-success-foreground";
      case "escalated":
        return "bg-destructive/80 text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleAddComment = () => {
    if (adminComment.trim() && selectedDispute) {
      // Add comment logic here
      setAdminComment("");
    }
  };

  const handleResolveDispute = () => {
    if (selectedDispute) {
      // Resolve dispute logic
      setSelectedDispute(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Disputes Center</h1>
          <p className="text-muted-foreground mt-2">
            Manage order disputes and facilitate resolutions between buyers and sellers
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Disputes</p>
                <p className="text-2xl font-bold text-destructive">8</p>
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
                <p className="text-sm text-muted-foreground">In Review</p>
                <p className="text-2xl font-bold text-warning">5</p>
              </div>
              <div className="h-8 w-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved This Month</p>
                <p className="text-2xl font-bold text-success">24</p>
              </div>
              <div className="h-8 w-8 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="admin-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
                <p className="text-2xl font-bold text-foreground">89%</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Search & Filter Disputes</CardTitle>
          <CardDescription>
            Find disputes by ID, order, or participants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by dispute ID, order ID, or participant names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Disputes Table */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Disputes ({filteredDisputes.length})</CardTitle>
          <CardDescription>
            All disputes requiring admin attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispute ID</TableHead>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Buyer Name</TableHead>
                  <TableHead>Seller Name</TableHead>
                  <TableHead>Dispute Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDisputes.map((dispute) => (
                  <TableRow key={dispute.id} className="hover:bg-muted/50">
                    <TableCell>
                      <span className="font-mono text-sm">{dispute.id}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{dispute.orderId}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={dispute.buyer.avatar} alt={dispute.buyer.name} />
                          <AvatarFallback className="text-xs">
                            {dispute.buyer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{dispute.buyer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={dispute.seller.avatar} alt={dispute.seller.name} />
                          <AvatarFallback className="text-xs">
                            {dispute.seller.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{dispute.seller.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{dispute.reason}</div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getPriorityColor(dispute.priority)} text-xs`}>
                            {dispute.priority} priority
                          </Badge>
                          <span className="text-xs font-medium">${dispute.amount}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(dispute.status)}>
                        {dispute.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{dispute.openedDate}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedDispute(dispute)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {dispute.status === "open" && (
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Start Review
                            </DropdownMenuItem>
                          )}
                          {dispute.status !== "resolved" && (
                            <>
                              <DropdownMenuItem className="text-success">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Resolve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <XCircle className="mr-2 h-4 w-4" />
                                Escalate
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dispute Details Dialog */}
      <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Dispute Details: {selectedDispute?.id}</DialogTitle>
            <DialogDescription>
              Review dispute information and take administrative action
            </DialogDescription>
          </DialogHeader>
          
          {selectedDispute && (
            <div className="space-y-6">
              {/* Dispute Overview */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Dispute Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order ID:</span>
                      <span>{selectedDispute.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">${selectedDispute.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={getStatusColor(selectedDispute.status)}>
                        {selectedDispute.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Priority:</span>
                      <Badge className={getPriorityColor(selectedDispute.priority)}>
                        {selectedDispute.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Evidence:</span>
                      <span>{selectedDispute.evidenceCount} files</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Participants</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedDispute.buyer.avatar} alt={selectedDispute.buyer.name} />
                        <AvatarFallback>
                          {selectedDispute.buyer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Buyer</p>
                        <p className="text-sm text-muted-foreground">{selectedDispute.buyer.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedDispute.seller.avatar} alt={selectedDispute.seller.name} />
                        <AvatarFallback>
                          {selectedDispute.seller.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Seller</p>
                        <p className="text-sm text-muted-foreground">{selectedDispute.seller.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dispute Description */}
              <div>
                <h4 className="font-medium mb-2">Dispute Reason</h4>
                <p className="text-sm text-muted-foreground mb-3">{selectedDispute.reason}</p>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedDispute.description}</p>
              </div>
              
              {/* Admin Notes */}
              {selectedDispute.adminNotes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Admin Notes</h4>
                  <div className="space-y-2">
                    {selectedDispute.adminNotes.map((note, index) => (
                      <div key={index} className="text-sm p-3 bg-muted/50 rounded-lg">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add Comment */}
              <div>
                <h4 className="font-medium mb-2">Add Admin Comment</h4>
                <Textarea
                  placeholder="Add your comments or decision notes..."
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  className="mb-3"
                />
                <Button onClick={handleAddComment} size="sm">
                  Add Comment
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelectedDispute(null)}>
              Close
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View Evidence
            </Button>
            <Button variant="destructive">
              <XCircle className="h-4 w-4 mr-2" />
              Escalate
            </Button>
            <Button onClick={handleResolveDispute} className="bg-gradient-primary">
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolve Dispute
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}