import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, BookOpen, Languages, Award, Eye, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for a student profile
const mockStudent = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.j@university.edu",
  avatar: "/api/placeholder/120/120",
  bio: "I'm a passionate web designer with 3+ years of experience creating beautiful, user-friendly websites. I specialize in modern, responsive designs that help businesses stand out online.",
  location: "New York, USA",
  university: "Columbia University",
  major: "Computer Science",
  rating: 4.8,
  totalOrders: 156,
  totalReviews: 142,
  responseTime: "< 1 hour",
  languages: ["English (Native)", "Spanish (Conversational)", "French (Basic)"],
  skills: ["Web Design", "UI/UX", "React", "Figma", "Adobe Creative Suite", "HTML/CSS", "JavaScript"],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Columbia University",
      year: "2021-2025",
      gpa: "3.8/4.0"
    }
  ],
  certifications: [
    "Google UX Design Certificate",
    "Adobe Certified Expert",
    "React Developer Certification"
  ],
  portfolio: [
    {
      title: "E-commerce Website Redesign",
      image: "/api/placeholder/300/200",
      description: "Complete redesign of online store"
    },
    {
      title: "Mobile App UI Design",
      image: "/api/placeholder/300/200", 
      description: "Modern mobile application interface"
    }
  ],
  recentGigs: [
    { title: "Modern Website Design", orders: 24, rating: 4.9, price: "$150" },
    { title: "Logo Design Package", orders: 18, rating: 4.7, price: "$75" },
    { title: "UI/UX Consultation", orders: 12, rating: 5.0, price: "$200" }
  ],
  stats: {
    totalEarnings: "$12,450",
    completionRate: "98%",
    avgRating: 4.8,
    totalReviews: 142
  }
};

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/admin/students")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Student Profile</h1>
      </div>

      {/* Profile Header */}
      <Card className="admin-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={mockStudent.avatar} alt={mockStudent.name} />
                <AvatarFallback className="text-2xl">
                  {mockStudent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium">{mockStudent.rating}</span>
                <span className="text-muted-foreground">({mockStudent.totalReviews} reviews)</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{mockStudent.name}</h2>
                  <p className="text-muted-foreground mb-2">{mockStudent.email}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {mockStudent.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {mockStudent.university}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline">
                    Suspend Account
                  </Button>
                </div>
              </div>
              
              <p className="text-foreground mb-4">{mockStudent.bio}</p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{mockStudent.totalOrders}</div>
                  <div className="text-xs text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-success">{mockStudent.stats.completionRate}</div>
                  <div className="text-xs text-muted-foreground">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-accent-foreground">{mockStudent.responseTime}</div>
                  <div className="text-xs text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-warning">{mockStudent.stats.totalEarnings}</div>
                  <div className="text-xs text-muted-foreground">Total Earnings</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gigs">Active Gigs</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockStudent.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockStudent.languages.map((language, index) => (
                    <div key={index} className="text-sm">{language}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gigs" className="space-y-6">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Active Gigs</CardTitle>
              <CardDescription>Student's current gig offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudent.recentGigs.map((gig, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{gig.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{gig.orders} orders</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          {gig.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{gig.price}</div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>Student's work samples and projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockStudent.portfolio.map((item, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudent.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.year}</p>
                      <p className="text-sm font-medium">GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockStudent.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}