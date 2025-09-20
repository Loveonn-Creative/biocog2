import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Leaf, 
  Shield, 
  Lightbulb, 
  Target,
  TrendingUp,
  Globe,
  ArrowRight,
  Calendar,
  MapPin,
  Zap,
  Award,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description: "We build breakthrough solutions that didn't exist yesterday. Every challenge is an opportunity to reimagine what's possible."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Radical Transparency",
      description: "Open books, honest conversations, and authentic relationships. Trust is our currency, integrity is our compass."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Planet Over Profit",
      description: "Climate impact drives every decision. We measure success by the tons of CO2 reduced, not just rupees earned."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Powered",
      description: "MSMEs are the backbone of India. We don't just serve them—we amplify their voices and champion their success."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Human Centered",
      description: "Behind every transaction is a person with dreams. We build technology that enhances human potential, not replaces it."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Ownership Mindset",
      description: "We own outcomes, not excuses. Every team member is a founder in their domain, empowered to lead and deliver."
    }
  ];

  const timeline = [
    {
      date: "August 2024",
      title: "The Beginning",
      description: "Founded with a vision to democratize green finance for Indian MSMEs"
    },
    {
      date: "September 2024",
      title: "First Prototype",
      description: "Built AI-powered ESG scoring system for small businesses"
    },
    {
      date: "October 2024",
      title: "Beta Launch",
      description: "Onboarded first 100 MSMEs for carbon credit verification"
    },
    {
      date: "November 2024",
      title: "Platform Expansion",
      description: "Integrated e-waste recycling and loan pre-approval systems"
    }
  ];

  const impact = [
    {
      icon: <Building2 className="w-12 h-12" />,
      number: "500+",
      label: "MSMEs Onboarded",
      description: "Small businesses accessing green finance"
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      number: "₹2Cr+",
      label: "Green Credits Unlocked",
      description: "In carbon credits and ESG financing"
    },
    {
      icon: <Globe className="w-12 h-12" />,
      number: "15",
      label: "Cities",
      description: "Across India where we operate"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      number: "10K+",
      label: "Tons CO2",
      description: "Emissions reduced through our platform"
    }
  ];

  return (
    <Layout title="About Us">
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative container mx-auto px-6 py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <Badge className="mb-6 bg-white/20 text-white border-white/30">
                  Our Story
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  Rewiring Green Finance
                  <span className="text-success block">for the Forgotten 63 Million</span>
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Ramesh's Story */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl border-l-4 border-l-success">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex items-center mb-6">
                    <MapPin className="w-6 h-6 text-success mr-3" />
                    <span className="text-lg font-medium text-muted-foreground">Tiruppur, Tamil Nadu</span>
                  </div>
                  
                  <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8 italic">
                    "Every morning in Tiruppur, Ramesh watches his electricity meter spin, costing him ₹8/kWh. 
                    He needs solar, but banks require a ₹2+ Lakh, 4-month audit. His working capital can't wait. 
                    The green system is built for giants, not him."
                  </blockquote>
                  
                  <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      Ramesh's story is the reality of <strong className="text-foreground">63 million MSMEs in India alone</strong>, 
                      locked out of a $400B green economy and missing out on $10 billion in incentives.
                    </p>
                    <p>
                      Traditional banks see risk. We see potential. Where others see complexity, we build simplicity. 
                      Where the system says "no," we create a new way forward.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We're building the climate OS for the Global South's $9-12T green economy by 2030. 
                  Think of us as the UPI of carbon—a new financial layer that makes climate action accessible to everyone.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Imagine This Future</h3>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-3 flex-shrink-0"></div>
                      <p>A chai shop earning carbon credits for installing solar panels</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-3 flex-shrink-0"></div>
                      <p>A textile factory funding expansion with ESG compliance data</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-3 flex-shrink-0"></div>
                      <p>Small manufacturers accessing green loans in minutes, not months</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-3 flex-shrink-0"></div>
                      <p>Rural entrepreneurs unlocking climate financing through their mobile phones</p>
                    </div>
                  </div>
                </div>
                
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <Calendar className="w-6 h-6 text-primary" />
                      <span className="text-lg font-medium">Founded August 2024</span>
                    </div>
                    <CardTitle className="text-2xl">From Idea to Impact</CardTitle>
                    <CardDescription className="text-base">
                      Started with a dream to democratize climate finance and empower Indian SMEs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {impact.map((stat, index) => (
                        <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-primary mb-2 flex justify-center">
                            {stat.icon}
                          </div>
                          <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                          <div className="text-sm font-medium text-foreground">{stat.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  What We Believe
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Our values aren't just words on a wall—they're the principles that guide every decision, 
                  every feature, and every relationship we build.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="feature-card hover:shadow-lg transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-hero rounded-xl flex items-center justify-center text-white mb-4">
                        {value.icon}
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Our Journey
                </h2>
                <p className="text-xl text-muted-foreground">
                  From concept to climate impact in record time
                </p>
              </div>

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <Card className="flex-1 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                          <Badge variant="outline" className="w-fit">{item.date}</Badge>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How We Help SMEs */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  How We Help SMEs Thrive
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Every feature we build is designed to unlock opportunities for small businesses
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="hover-scale hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <Leaf className="w-12 h-12 text-success mb-4" />
                    <CardTitle className="text-xl">Carbon Credits</CardTitle>
                    <CardDescription>
                      Turn sustainability efforts into revenue streams with verified carbon credits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full group">
                      <Link to="/dashboard">
                        Explore Platform
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover-scale hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <TrendingUp className="w-12 h-12 text-primary mb-4" />
                    <CardTitle className="text-xl">ESG Reporting</CardTitle>
                    <CardDescription>
                      Automated compliance reports that banks and investors actually want to see
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full group">
                      <Link to="/reports">
                        View Reports
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover-scale hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <Globe className="w-12 h-12 text-accent mb-4" />
                    <CardTitle className="text-xl">E-Waste Recycling</CardTitle>
                    <CardDescription>
                      Connect with verified recyclers and turn waste into verified environmental impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full group">
                      <Link to="/recycle">
                        Start Recycling
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Join the Movement?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Whether you're an MSME looking to access green finance or a changemaker wanting to build the future—we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 group">
                  <Link to="/dashboard">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/help">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;