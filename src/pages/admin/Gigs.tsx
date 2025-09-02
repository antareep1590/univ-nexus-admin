import { useState } from "react";
import { Search, Filter, MoreHorizontal, Check, X, MessageSquare, Flag, Eye, Star } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface Gig {
  id: string;
  title: string;
  category: string;
  seller: {
    name: string;
    rating: number;
    avatar?: string;
  };
  status: "pending" | "approved" | "rejected" | "flagged";
  submissionDate: string;
  packages: {
    basic: number;
    standard: number;
    premium: number;
  };
  flags: string[];
  reports: number;
}

const mockGigs: Gig[] = [
  {
    id: "1",
    title: "I will create a modern website design",
    category: "Web Design",
    seller: {
      name: "Sarah Johnson",
      rating: 4.8,
      avatar: "/api/placeholder/32/32"
    },
    status: "pending",
    submissionDate: "2024-08-15",
    packages: { basic: 50, standard: 100, premium: 200 },
    flags: [],
    reports: 0
  },
  {
    id: "2",
    title: "I will write compelling marketing copy",
    category: "Content Writing",
    seller: {
      name: "Mike Chen",
      rating: 4.9
    },
    status: "flagged",
    submissionDate: "2024-08-14",
    packages: { basic: 25, standard: 50, premium: 100 },
    flags: ["Potential copyright violation"],
    reports: 2
  },
  {
    id: "3",
    title: "I will create social media graphics",
    category: "Graphic Design",
    seller: {
      name: "Emma Wilson",
      rating: 4.7
    },
    status: "approved",
    submissionDate: "2024-08-13",
    packages: { basic: 30, standard: 60, premium: 120 },
    flags: [],
    reports: 0
  }
];

export default function Gigs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedGigs, setSelectedGigs] = useState<string[]>([]);
  const [reviewingGig, setReviewingGig] = useState<Gig | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredGigs = mockGigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || gig.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || gig.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      case "flagged":
        return "bg-destructive/80 text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGigs(filteredGigs.map(g => g.id));
    } else {
      setSelectedGigs([]);
    }
  };

  const handleBulkApprove = () => {
    // Handle bulk approval
    setSelectedGigs([]);
  };

  const handleBulkReject = () => {
    // Handle bulk rejection
    setSelectedGigs([]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gig Management</h1>
          <p className="text-muted-foreground mt-2">
            Review and moderate gig submissions and content reports
          </p>
        </div>
        <div className="flex gap-2">
          {selectedGigs.length > 0 && (
            <>
              <Button variant="outline" onClick={handleBulkApprove}>
                <Check className="h-4 w-4 mr-2" />
                Approve ({selectedGigs.length})
              </Button>
              <Button variant="destructive" onClick={handleBulkReject}>
                <X className="h-4 w-4 mr-2" />
                Reject ({selectedGigs.length})
              </Button>
            </>
          )}
          <Button className="bg-gradient-primary shadow-primary">
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Moderation Queue</CardTitle>
          <CardDescription>
            Review gig submissions and manage content reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by gig title or seller..."
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Web Design">Web Design</SelectItem>
                <SelectItem value="Content Writing">Content Writing</SelectItem>
                <SelectItem value="Graphic Design">Graphic Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Gigs List */}
      <Card className="admin-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gigs ({filteredGigs.length})</CardTitle>
              <CardDescription>
                Pending approvals and flagged content
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedGigs.length === filteredGigs.length && filteredGigs.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-muted-foreground">Select All</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGigs.map((gig) => (
              <div key={gig.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={selectedGigs.includes(gig.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedGigs([...selectedGigs, gig.id]);
                      } else {
                        setSelectedGigs(selectedGigs.filter(id => id !== gig.id));
                      }
                    }}
                  />
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-foreground">{gig.title}</h3>
                      <Badge className={getStatusColor(gig.status)}>
                        {gig.status}
                      </Badge>
                      <Badge variant="outline">
                        {gig.category}
                      </Badge>
                      {gig.flags.length > 0 && (
                        <Badge variant="destructive">
                          <Flag className="h-3 w-3 mr-1" />
                          {gig.flags.length} Flag{gig.flags.length > 1 ? 's' : ''}
                        </Badge>
                      )}
                      {gig.reports > 0 && (
                        <Badge variant="outline" className="text-destructive">
                          {gig.reports} Report{gig.reports > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={gig.seller.avatar} alt={gig.seller.name} />
                          <AvatarFallback>
                            {gig.seller.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{gig.seller.name}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="text-xs text-muted-foreground">{gig.seller.rating}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Submitted {gig.submissionDate}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        ${gig.packages.basic} - ${gig.packages.premium}
                      </div>
                    </div>
                    
                    {gig.flags.length > 0 && (
                      <div className="text-xs text-destructive">
                        Flags: {gig.flags.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setReviewingGig(gig)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Review Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {gig.status === "pending" && (
                      <>
                        <DropdownMenuItem className="text-success">
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Request Changes
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={!!reviewingGig} onOpenChange={() => setReviewingGig(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Review Gig: {reviewingGig?.title}</DialogTitle>
            <DialogDescription>
              Review gig details and make moderation decisions
            </DialogDescription>
          </DialogHeader>
          
          {reviewingGig && (
            <div className="space-y-6">
              {/* Gig Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Seller Information</h4>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={reviewingGig.seller.avatar} alt={reviewingGig.seller.name} />
                      <AvatarFallback>
                        {reviewingGig.seller.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{reviewingGig.seller.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-warning text-warning" />
                        <span className="text-xs">{reviewingGig.seller.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Package Pricing</h4>
                  <div className="space-y-1 text-sm">
                    <div>Basic: ${reviewingGig.packages.basic}</div>
                    <div>Standard: ${reviewingGig.packages.standard}</div>
                    <div>Premium: ${reviewingGig.packages.premium}</div>
                  </div>
                </div>
              </div>
              
              {/* Flags and Reports */}
              {(reviewingGig.flags.length > 0 || reviewingGig.reports > 0) && (
                <div>
                  <h4 className="font-medium mb-2">Issues</h4>
                  <div className="space-y-2">
                    {reviewingGig.flags.map((flag, index) => (
                      <div key={index} className="flex items-center gap-2 text-destructive">
                        <Flag className="h-4 w-4" />
                        <span className="text-sm">{flag}</span>
                      </div>
                    ))}
                    {reviewingGig.reports > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {reviewingGig.reports} user report{reviewingGig.reports > 1 ? 's' : ''} filed
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setReviewingGig(null)}>
              Close
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Request Changes
            </Button>
            <Button variant="destructive">
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button className="bg-gradient-primary">
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}