import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Globe, 
  Heart, 
  Users, 
  Zap, 
  TrendingUp, 
  Coffee, 
  Gamepad2, 
  Home,
  ArrowRight,
  Target,
  Award,
  Rocket
} from "lucide-react";
import { useState } from "react";

const Career = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy form submission
    alert('Application submitted! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', role: '', message: '' });
  };

  const perks = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Work From Anywhere",
      description: "Freedom to work remotely from any corner of the world"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Unlimited Chai & Snacks",
      description: "Fuel your creativity with endless chai, coffee, and healthy snacks"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and mental wellness support"
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Learning Budget",
      description: "₹50,000 annual budget for courses, conferences, and skill development"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Flat Hierarchy",
      description: "Direct access to leadership and decision-making processes"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation Time",
      description: "20% time for passion projects and experimental ideas"
    }
  ];

  const roles = [
    {
      title: "Full Stack Engineer",
      department: "Engineering",
      experience: "2-5 years",
      location: "Remote / Bangalore"
    },
    {
      title: "AI/ML Engineer",
      department: "Technology",
      experience: "3-6 years",
      location: "Remote / Mumbai"
    },
    {
      title: "Product Manager",
      department: "Product",
      experience: "4-7 years",
      location: "Remote / Delhi"
    },
    {
      title: "Climate Finance Analyst",
      department: "Finance",
      experience: "2-4 years",
      location: "Remote / Pune"
    }
  ];

  return (
    <Layout title="Careers">
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative container mx-auto px-6 py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <Badge className="mb-6 bg-white/20 text-white border-white/30">
                  We're Hiring
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Join the Climate
                  <span className="text-success block">Revolution</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Help us rewire how green money flows through emerging markets. 
                  Be part of building the climate OS for the Global South's $9-12T green economy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 group">
                    Explore Opportunities
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Our Culture
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Impact Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Your Work, Global Impact
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Every line of code you write helps MSMEs access green financing. 
                Every feature you build empowers entrepreneurs like Ramesh to go solar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center hover-scale hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Target className="w-12 h-12 text-success mx-auto mb-4" />
                  <CardTitle className="text-xl">63M MSMEs</CardTitle>
                  <CardDescription>Waiting to access green economy</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center hover-scale hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">$10B Credits</CardTitle>
                  <CardDescription>In climate incentives unlocked</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center hover-scale hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
                  <CardTitle className="text-xl">Global South</CardTitle>
                  <CardDescription>Building climate infrastructure</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Perks & Benefits */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Perks That Matter
              </h2>
              <p className="text-xl text-muted-foreground">
                We believe in taking care of our team so they can take care of the planet
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {perks.map((perk, index) => (
                <Card key={index} className="feature-card hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center text-white mb-4">
                      {perk.icon}
                    </div>
                    <CardTitle className="text-xl">{perk.title}</CardTitle>
                    <CardDescription className="text-base">
                      {perk.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Open Positions
              </h2>
              <p className="text-xl text-muted-foreground">
                Join our mission to democratize green finance
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {roles.map((role, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{role.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{role.department}</Badge>
                          <Badge variant="outline">{role.experience}</Badge>
                          <Badge variant="outline">{role.location}</Badge>
                        </div>
                      </div>
                      <Button className="group">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <Award className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Make Impact?
                </h2>
                <p className="text-xl text-white/90">
                  Apply now and help us build the future of climate finance
                </p>
              </div>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Application Form</CardTitle>
                  <CardDescription className="text-center">
                    Tell us about yourself and why you want to join Biocog
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Interested Role</Label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-input rounded-md bg-background"
                        required
                      >
                        <option value="">Select a role</option>
                        {roles.map((role, index) => (
                          <option key={index} value={role.title}>{role.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="message">Why Biocog?</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us why you want to join our mission..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full group">
                      <Rocket className="w-5 h-5 mr-2" />
                      Submit Application
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Career;