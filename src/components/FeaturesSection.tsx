import { Mic, Camera, FileText, Users, CreditCard, Shield, Zap, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Mic,
      title: "Voice Assistant",
      titleHindi: "आवाज़ सहायक",
      description: "Ask questions in Hindi, Bengali, Marathi, Tamil, Telugu",
      descriptionHindi: "हिंदी में पूछें, तुरंत जवाब पाएं",
      highlight: "10+ Languages",
      color: "bg-blue-500"
    },
    {
      icon: Camera,
      title: "Smart Scan",
      titleHindi: "स्मार्ट स्कैन",
      description: "Point camera at any bill → instant CO₂ calculation",
      descriptionHindi: "बिल का फोटो → तुरंत कार्बन रिपोर्ट",
      highlight: "OCR + AI",
      color: "bg-green-500"
    },
    {
      icon: FileText,
      title: "ESG Reports",
      titleHindi: "ESG रिपोर्ट",
      description: "Bank-ready compliance reports in PDF/Excel",
      descriptionHindi: "बैंक के लिए तैयार रिपोर्ट",
      highlight: "Instant PDF",
      color: "bg-purple-500"
    },
    {
      icon: CreditCard,
      title: "Green Loans",
      titleHindi: "हरित लोन",
      description: "₹5L+ loans without collateral using ESG data",
      descriptionHindi: "₹5 लाख+ लोन बिना गारंटी",
      highlight: "No Collateral",
      color: "bg-emerald-500"
    },
    {
      icon: Users,
      title: "E-waste Recycling",
      titleHindi: "ई-कचरा रीसाइक्लिंग",
      description: "Connect with verified recyclers, schedule pickup",
      descriptionHindi: "सत्यापित रीसाइक्लर से जुड़ें",
      highlight: "Verified Partners",
      color: "bg-orange-500"
    },
    {
      icon: Shield,
      title: "Blockchain Verified",
      titleHindi: "ब्लॉकचेन सत्यापित",
      description: "Tamper-proof carbon credit certificates",
      descriptionHindi: "छेड़छाड़-प्रूफ सर्टिफिकेट",
      highlight: "Immutable",
      color: "bg-indigo-500"
    }
  ];

  const stats = [
    { value: "63M+", label: "Indian MSMEs", labelHindi: "भारतीय MSME" },
    { value: "₹400B+", label: "Green Market", labelHindi: "हरित बाज़ार" },
    { value: "50K+", label: "Crore Subsidies", labelHindi: "करोड़ सब्सिडी" },
    { value: "5L+", label: "Max Loan Amount", labelHindi: "अधिकतम लोन" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">
            🌱 For India's 63M MSMEs
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Carbon to Credit,
            <span className="block text-primary">Simple as UPI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your business emissions into earning opportunities with AI-powered sustainability tools designed for Indian MSMEs.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground opacity-75">
                {stat.labelHindi}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card group">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {feature.titleHindi}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  <p className="text-xs text-muted-foreground opacity-75">
                    {feature.descriptionHindi}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Ready in 60 seconds</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            No Technical Knowledge Required
          </h3>
          <p className="text-muted-foreground">
            Built for Indian MSMEs - from chai shops to textile units
          </p>
        </div>
      </div>
    </section>
  );
};