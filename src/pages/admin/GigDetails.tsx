import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Eye, MessageSquare, Check, X, Flag, Edit, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Mock data for gig details
const mockGig = {
  id: "1",
  title: "I will create a modern, responsive website design that converts",
  category: "Web Design",
  subcategory: "Website Design",
  description: "Transform your online presence with a stunning, modern website design that not only looks amazing but also converts visitors into customers. I specialize in creating user-friendly, responsive designs that work perfectly on all devices.\n\nWhat you'll get:\n- Custom website design tailored to your brand\n- Mobile-responsive layout\n- User experience optimization\n- Modern, clean aesthetic\n- Professional typography and color schemes\n- SEO-friendly structure",
  seller: {
    name: "Sarah Johnson",
    avatar: "/api/placeholder/60/60",
    rating: 4.8,
    totalReviews: 142,
    level: "Level 2 Seller",
    responseTime: "1 hour"
  },
  packages: {
    basic: {
      title: "Basic Website Design",
      price: 50,
      deliveryTime: "3 days",
      revisions: 2,
      features: [
        "Homepage design",
        "Mobile responsive",
        "2 revisions included",
        "Source files provided"
      ]
    },
    standard: {
      title: "Standard Website Package",
      price: 100,
      deliveryTime: "5 days",
      revisions: 4,
      features: [
        "Up to 3 page designs",
        "Mobile responsive",
        "4 revisions included",
        "Source files provided",
        "Basic SEO optimization"
      ]
    },
    premium: {
      title: "Premium Complete Package",
      price: 200,
      deliveryTime: "7 days",
      revisions: "Unlimited",
      features: [
        "Up to 5 page designs",
        "Mobile responsive",
        "Unlimited revisions",
        "Source files provided",
        "Advanced SEO optimization",
        "Content upload assistance",
        "1 month support"
      ]
    }
  },
  tags: ["web design", "responsive", "modern", "UI/UX", "conversion"],
  gallery: [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ],
  status: "pending",
  submissionDate: "2024-08-15",
  stats: {
    views: 1247,
    impressions: 3450,
    clicks: 89,
    saves: 23,
    orders: 0
  },
  enquiries: [
    {
      id: 1,
      buyer: "John Doe",
      message: "Hi! I'm interested in your website design service. Can you create an e-commerce site?",
      date: "2024-08-20",
      replied: true
    },
    {
      id: 2,
      buyer: "Jane Smith",
      message: "What's included in the premium package? Do you provide hosting?",
      date: "2024-08-19",
      replied: false
    }
  ],
  flags: [],
  reports: 0
};

export default function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rejectionReason, setRejectionReason] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/admin/gigs")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gigs
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Gig Details</h1>
        </div>
        <div className="flex gap-2">
          {mockGig.status === "pending" && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject Gig</DialogTitle>
                    <DialogDescription>
                      Please provide a reason for rejecting this gig.
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    placeholder="Enter rejection reason..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Reject Gig</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button className="bg-gradient-primary">
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </>
          )}
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Gig Header */}
      <Card className="admin-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getStatusColor(mockGig.status)}>
                  {mockGig.status}
                </Badge>
                <Badge variant="outline">{mockGig.category}</Badge>
                <Badge variant="secondary">{mockGig.subcategory}</Badge>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{mockGig.title}</h2>
              
              {/* Seller Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mockGig.seller.avatar} alt={mockGig.seller.name} />
                  <AvatarFallback>
                    {mockGig.seller.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{mockGig.seller.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span>{mockGig.seller.rating} ({mockGig.seller.totalReviews} reviews)</span>
                    </div>
                    <span>{mockGig.seller.level}</span>
                    <span>Responds in {mockGig.seller.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{mockGig.stats.views}</div>
                <div className="text-xs text-muted-foreground">Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-foreground">{mockGig.stats.clicks}</div>
                <div className="text-xs text-muted-foreground">Clicks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{mockGig.stats.saves}</div>
                <div className="text-xs text-muted-foreground">Saves</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{mockGig.stats.orders}</div>
                <div className="text-xs text-muted-foreground">Orders</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="packages">Packages & Pricing</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Gig Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-foreground whitespace-pre-line">{mockGig.description}</p>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h4 className="font-medium mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {mockGig.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">#{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(mockGig.packages).map(([key, pkg]) => (
              <Card key={key} className="admin-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {pkg.title}
                    <Badge variant={key === 'basic' ? 'secondary' : key === 'standard' ? 'default' : 'destructive'}>
                      {key.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    <div className="text-2xl font-bold text-foreground">${pkg.price}</div>
                    <div className="text-sm">Delivery: {pkg.deliveryTime}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">Revisions:</span> {pkg.revisions}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-success" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Gig Gallery</CardTitle>
              <CardDescription>Images and videos showcasing the service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockGig.gallery.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button variant="secondary" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Full
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enquiries" className="space-y-6">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Buyer Enquiries</CardTitle>
              <CardDescription>Questions and messages from potential buyers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGig.enquiries.map((enquiry) => (
                  <div key={enquiry.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{enquiry.buyer}</h4>
                        <p className="text-sm text-muted-foreground">{enquiry.date}</p>
                      </div>
                      <Badge variant={enquiry.replied ? "secondary" : "destructive"}>
                        {enquiry.replied ? "Replied" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">{enquiry.message}</p>
                    {!enquiry.replied && (
                      <Button variant="outline" size="sm" className="mt-3">
                        <MessageSquare className="h-3 w-3 mr-2" />
                        Remind Seller to Reply
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}