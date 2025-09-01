import { useState } from "react";
import { Save, Plus, Edit, Trash2, Mail, Shield, Globe, CreditCard, Bell, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Label } from "@/components/ui/label";

interface Category {
  id: string;
  name: string;
  subcategories: string[];
  isActive: boolean;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: "welcome" | "order" | "dispute" | "payout" | "notification";
  lastModified: string;
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    subcategories: ["Frontend Development", "Backend Development", "Full Stack", "WordPress"],
    isActive: true
  },
  {
    id: "2", 
    name: "Graphic Design",
    subcategories: ["Logo Design", "Print Design", "Web Design", "Illustration"],
    isActive: true
  },
  {
    id: "3",
    name: "Content Writing",
    subcategories: ["Blog Writing", "Copywriting", "Technical Writing", "SEO Content"],
    isActive: true
  },
  {
    id: "4",
    name: "Digital Marketing",
    subcategories: ["Social Media", "SEO", "PPC", "Email Marketing"],
    isActive: false
  }
];

const mockEmailTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Welcome New User",
    subject: "Welcome to Univ Jobs!",
    type: "welcome",
    lastModified: "2024-08-10"
  },
  {
    id: "2",
    name: "Order Confirmation",
    subject: "Your order has been confirmed",
    type: "order",
    lastModified: "2024-08-08"
  },
  {
    id: "3",
    name: "Dispute Opened",
    subject: "A dispute has been opened for your order",
    type: "dispute",
    lastModified: "2024-08-05"
  },
  {
    id: "4",
    name: "Payout Notification",
    subject: "Your payout has been processed",
    type: "payout",
    lastModified: "2024-08-03"
  }
];

export default function Settings() {
  const [categories, setCategories] = useState(mockCategories);
  const [emailTemplates, setEmailTemplates] = useState(mockEmailTemplates);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case "welcome":
        return "bg-primary text-primary-foreground";
      case "order":
        return "bg-success text-success-foreground";
      case "dispute":
        return "bg-destructive text-destructive-foreground";
      case "payout":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName,
        subcategories: [],
        isActive: true
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  const handleToggleCategoryStatus = (categoryId: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, isActive: !cat.isActive }
        : cat
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure platform-wide settings, categories, and communication templates
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <Card className="admin-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Service Categories</CardTitle>
                  <CardDescription>
                    Manage gig categories and subcategories
                  </CardDescription>
                </div>
                <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                      <DialogDescription>
                        Create a new service category for the platform
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                          id="categoryName"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="Enter category name..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingCategory(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCategory}>
                        Add Category
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-foreground">{category.name}</h3>
                          <Badge variant={category.isActive ? "default" : "secondary"}>
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.subcategories.length} subcategories: {category.subcategories.join(", ")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={category.isActive}
                        onCheckedChange={() => handleToggleCategoryStatus(category.id)}
                      />
                      <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Platform Fees
                </CardTitle>
                <CardDescription>
                  Configure commission rates and fees
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="commission">Service Commission (%)</Label>
                  <Input id="commission" type="number" defaultValue="10" />
                  <p className="text-xs text-muted-foreground">
                    Percentage of each transaction taken as platform fee
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="processingFee">Payment Processing Fee (%)</Label>
                  <Input id="processingFee" type="number" defaultValue="2.9" />
                  <p className="text-xs text-muted-foreground">
                    Additional fee for payment processing
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fixedFee">Fixed Processing Fee ($)</Label>
                  <Input id="fixedFee" type="number" defaultValue="0.30" step="0.01" />
                  <p className="text-xs text-muted-foreground">
                    Fixed amount added to each transaction
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="withdrawalFee">Withdrawal Fee ($)</Label>
                  <Input id="withdrawalFee" type="number" defaultValue="2.00" step="0.01" />
                  <p className="text-xs text-muted-foreground">
                    Fee charged for seller withdrawals
                  </p>
                </div>
                
                <Button className="w-full">Update Fee Structure</Button>
              </CardContent>
            </Card>

            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Promotional Settings</CardTitle>
                <CardDescription>
                  Configure discounts and promotional offers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New User Discount</Label>
                    <p className="text-sm text-muted-foreground">
                      First-time buyer discount
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newUserDiscount">Discount Percentage (%)</Label>
                  <Input id="newUserDiscount" type="number" defaultValue="15" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bulk Order Discounts</Label>
                    <p className="text-sm text-muted-foreground">
                      Discounts for multiple gigs
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Seasonal Promotions</Label>
                    <p className="text-sm text-muted-foreground">
                      Holiday and seasonal discounts
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <Card className="admin-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Templates
                  </CardTitle>
                  <CardDescription>
                    Manage automated email templates and notifications
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-foreground">{template.name}</h3>
                          <Badge className={getTemplateTypeColor(template.type)}>
                            {template.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{template.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          Last modified: {template.lastModified}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Communication Settings</CardTitle>
              <CardDescription>
                Configure general communication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-send Welcome Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically send welcome emails to new users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Order Confirmations</Label>
                  <p className="text-sm text-muted-foreground">
                    Send confirmation emails for new orders
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dispute Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify admins of new disputes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow promotional emails to users
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Authentication Settings
                </CardTitle>
                <CardDescription>
                  Configure user authentication and security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Complexity</Label>
                    <p className="text-sm text-muted-foreground">
                      Enforce strong password requirements
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>

            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>
                  Manage admin roles and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Super Admin</p>
                      <p className="text-sm text-muted-foreground">Full platform access</p>
                    </div>
                    <Badge>3 users</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Content Moderator</p>
                      <p className="text-sm text-muted-foreground">Gig and user moderation</p>
                    </div>
                    <Badge variant="secondary">8 users</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Support Agent</p>
                      <p className="text-sm text-muted-foreground">Customer support and disputes</p>
                    </div>
                    <Badge variant="secondary">12 users</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Analytics Viewer</p>
                      <p className="text-sm text-muted-foreground">Read-only analytics access</p>
                    </div>
                    <Badge variant="secondary">5 users</Badge>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Roles
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Admin Notifications
                </CardTitle>
                <CardDescription>
                  Configure when admins receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New User Registrations</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when new users join
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High-Value Orders</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify for orders above threshold
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orderThreshold">Order Value Threshold ($)</Label>
                  <Input id="orderThreshold" type="number" defaultValue="500" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Failed logins and security events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Issues</Label>
                    <p className="text-sm text-muted-foreground">
                      Technical problems and downtime
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="admin-card">
              <CardHeader>
                <CardTitle>User Notifications</CardTitle>
                <CardDescription>
                  Control what notifications users receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Status changes and milestones
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Instant message notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Promotions and platform news
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Summary of platform activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="digestDay">Digest Day</Label>
                  <select id="digestDay" className="w-full p-2 border rounded-lg">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option selected>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}