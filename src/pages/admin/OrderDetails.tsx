import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, Calendar, DollarSign, Clock, CheckCircle, AlertTriangle, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

// Mock data for order details
const mockOrder = {
  id: "ORD-001",
  gigTitle: "Modern Website Design with Premium Features",
  buyer: {
    name: "John Doe",
    email: "john.doe@university.edu",
    avatar: "/api/placeholder/60/60",
    university: "Harvard University"
  },
  seller: {
    name: "Sarah Johnson",
    email: "sarah.j@university.edu",
    avatar: "/api/placeholder/60/60",
    rating: 4.8,
    responseTime: "< 1 hour"
  },
  amount: 150,
  package: "Standard",
  status: "active",
  orderDate: "2024-08-10",
  deliveryDate: "2024-08-20",
  hasDispute: false,
  disputeDetails: null,
  paymentStatus: "paid",
  timeline: [
    {
      title: "Order Placed",
      description: "Order was successfully placed and payment confirmed",
      date: "2024-08-10 10:30 AM",
      status: "completed"
    },
    {
      title: "Seller Accepted",
      description: "Sarah accepted the order and started working",
      date: "2024-08-10 11:15 AM",
      status: "completed"
    },
    {
      title: "Initial Design Delivered",
      description: "First draft of website design submitted",
      date: "2024-08-12 02:20 PM",
      status: "completed"
    },
    {
      title: "Revision Requested",
      description: "Buyer requested changes to color scheme",
      date: "2024-08-13 09:45 AM",
      status: "completed"
    },
    {
      title: "Working on Revisions",
      description: "Seller is implementing requested changes",
      date: "2024-08-14 11:00 AM",
      status: "active"
    },
    {
      title: "Final Delivery",
      description: "Complete website design with all files",
      date: "Expected: 2024-08-20",
      status: "pending"
    }
  ],
  milestones: {
    total: 3,
    completed: 1,
    current: "Design Revisions"
  },
  communications: [
    {
      id: 1,
      sender: "buyer",
      message: "Hi Sarah! The initial design looks great. Could we try a different color scheme? Maybe something more blue-based?",
      timestamp: "2024-08-13 09:45 AM",
      attachments: []
    },
    {
      id: 2,
      sender: "seller",
      message: "Absolutely! I'll work on a blue-based color palette. I'll have the revised version ready by tomorrow evening.",
      timestamp: "2024-08-13 10:20 AM",
      attachments: []
    },
    {
      id: 3,
      sender: "seller",
      message: "Here's the updated design with the blue color scheme. What do you think?",
      timestamp: "2024-08-14 06:30 PM",
      attachments: ["revised_design_v2.fig", "color_palette.pdf"]
    }
  ],
  requirements: {
    description: "I need a modern, responsive website for my consulting business. The site should have a professional look with a clean design. I'd like to include: homepage, about page, services page, and contact form.",
    industry: "Business Consulting",
    targetAudience: "Small to medium businesses",
    preferredColors: "Blue and white theme",
    additionalNotes: "Please ensure mobile responsiveness and fast loading times."
  }
};

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [showNotDisputeDialog, setShowNotDisputeDialog] = useState(false);

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
      case "disputed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTimelineStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "active":
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-muted" />;
    }
  };

  const calculateProgress = () => {
    return (mockOrder.milestones.completed / mockOrder.milestones.total) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/admin/orders")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Order Details</h1>
        </div>
        <div className="flex gap-2">
          {mockOrder.hasDispute && (
            <>
              <Dialog open={showNotDisputeDialog} onOpenChange={setShowNotDisputeDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    Mark as Not a Dispute
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Mark as Not a Dispute</DialogTitle>
                    <DialogDescription>
                      This action will remove the dispute flag from this order. This cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNotDisputeDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowNotDisputeDialog(false)}>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary">
                    Mark as Resolved
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Mark Dispute as Resolved</DialogTitle>
                    <DialogDescription>
                      This action will mark the dispute as resolved and update the order status. This cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowResolveDialog(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-gradient-primary" onClick={() => setShowResolveDialog(false)}>
                      Mark as Resolved
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
          <Button variant="outline">
            <DollarSign className="h-4 w-4 mr-2" />
            Issue Refund
          </Button>
        </div>
      </div>

      {/* Order Header */}
      <Card className="admin-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-foreground">{mockOrder.id}</h2>
                <Badge className={getStatusColor(mockOrder.status)}>
                  {mockOrder.status}
                </Badge>
                {mockOrder.hasDispute && (
                  <Badge variant="destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Dispute
                  </Badge>
                )}
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{mockOrder.gigTitle}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Package: {mockOrder.package}</span>
                <span>Amount: ${mockOrder.amount}</span>
                <span>Payment: {mockOrder.paymentStatus}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Order Progress</div>
              <div className="text-2xl font-bold text-foreground mb-2">{calculateProgress()}%</div>
              <Progress value={calculateProgress()} className="w-32" />
              <div className="text-xs text-muted-foreground mt-1">
                {mockOrder.milestones.completed}/{mockOrder.milestones.total} milestones
              </div>
            </div>
          </div>
          
          {/* Participants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockOrder.buyer.avatar} alt={mockOrder.buyer.name} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-foreground">Buyer</h4>
                <p className="text-sm text-foreground">{mockOrder.buyer.name}</p>
                <p className="text-xs text-muted-foreground">{mockOrder.buyer.email}</p>
                <p className="text-xs text-muted-foreground">{mockOrder.buyer.university}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockOrder.seller.avatar} alt={mockOrder.seller.name} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-foreground">Student (Seller)</h4>
                <p className="text-sm text-foreground">{mockOrder.seller.name}</p>
                <p className="text-xs text-muted-foreground">{mockOrder.seller.email}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Rating: {mockOrder.seller.rating}</span>
                  <span>•</span>
                  <span>Responds in {mockOrder.seller.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Timeline */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Order Timeline</CardTitle>
          <CardDescription>Complete history of order progress and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrder.timeline.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  {getTimelineStatusIcon(event.status)}
                  {index < mockOrder.timeline.length - 1 && (
                    <div className="w-px h-8 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Requirements */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Order Requirements</CardTitle>
          <CardDescription>Buyer's specifications and project details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Project Description</h4>
            <p className="text-sm text-muted-foreground">{mockOrder.requirements.description}</p>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Industry</h4>
              <p className="text-sm text-muted-foreground">{mockOrder.requirements.industry}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Target Audience</h4>
              <p className="text-sm text-muted-foreground">{mockOrder.requirements.targetAudience}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Preferred Colors</h4>
              <p className="text-sm text-muted-foreground">{mockOrder.requirements.preferredColors}</p>
            </div>
          </div>
          
          {mockOrder.requirements.additionalNotes && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Additional Notes</h4>
                <p className="text-sm text-muted-foreground">{mockOrder.requirements.additionalNotes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Communications */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Order Communications</CardTitle>
          <CardDescription>Messages between buyer and seller</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrder.communications.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.sender === 'buyer' ? 'flex-row' : 'flex-row-reverse'}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={message.sender === 'buyer' ? mockOrder.buyer.avatar : mockOrder.seller.avatar} 
                    alt={message.sender === 'buyer' ? mockOrder.buyer.name : mockOrder.seller.name} 
                  />
                  <AvatarFallback>
                    {message.sender === 'buyer' ? 'B' : 'S'}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex-1 max-w-lg ${message.sender === 'buyer' ? 'mr-auto' : 'ml-auto'}`}>
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'buyer' 
                      ? 'bg-muted text-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    {message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <FileText className="h-3 w-3" />
                            <span>{file}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}