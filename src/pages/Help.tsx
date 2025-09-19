import { useState } from "react";
import { 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Phone, 
  Mail, 
  Search,
  ChevronDown,
  ChevronRight,
  Play,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqCategories = [
    {
      title: "Getting Started",
      titleHindi: "शुरुआत करना",
      faqs: [
        {
          question: "How do I scan my first invoice?",
          questionHindi: "मैं अपना पहला बिल कैसे स्कैन करूं?",
          answer: "Simply click 'Upload Bill' on the homepage, take a photo of your invoice or upload an image file. Our AI will automatically extract the carbon footprint data within seconds."
        },
        {
          question: "What types of bills can I scan?",
          questionHindi: "मैं किस प्रकार के बिल स्कैन कर सकता हूं?",
          answer: "You can scan electricity bills, fuel invoices, material purchase receipts, GST bills, and most business invoices that contain energy or material consumption data."
        },
        {
          question: "Do I need to create an account?",
          questionHindi: "क्या मुझे खाता बनाना होगा?",
          answer: "No! You can use Biocog as a guest for up to 3 scans and 10 AI queries. Create an account later to save your progress and access more features."
        }
      ]
    },
    {
      title: "Carbon Credits & ESG",
      titleHindi: "कार्बन क्रेडिट और ESG",
      faqs: [
        {
          question: "What are carbon credits and how do I earn them?",
          questionHindi: "कार्बन क्रेडिट क्या हैं और मैं इन्हें कैसे कमाऊं?",
          answer: "Carbon credits are certificates proving you've reduced CO₂ emissions. For every ton of carbon you save through efficient practices, you earn 1 credit that can be sold to companies."
        },
        {
          question: "How much money can I make from carbon credits?",
          questionHindi: "कार्बन क्रेडिट से मैं कितने पैसे कमा सकता हूं?",
          answer: "Credits currently trade at ₹1,500-3,000 per ton. A typical MSME can earn ₹10,000-50,000 annually by reducing emissions through energy efficiency and sustainable practices."
        },
        {
          question: "What is an ESG score?",
          questionHindi: "ESG स्कोर क्या है?",
          answer: "ESG (Environment, Social, Governance) score measures your business sustainability. Higher scores unlock better loan rates, government subsidies, and global supply chain opportunities."
        }
      ]
    },
    {
      title: "Loans & Finance",
      titleHindi: "लोन और वित्त",
      faqs: [
        {
          question: "How can I get a green loan without collateral?",
          questionHindi: "मैं बिना गारंटी के ग्रीन लोन कैसे ले सकता हूं?",
          answer: "Your ESG data acts as digital collateral. Banks trust verified sustainability metrics, allowing loans up to ₹5L based on your carbon reduction history and ESG score."
        },
        {
          question: "Which banks offer green loans through Biocog?",
          questionHindi: "कौन से बैंक Biocog के माध्यम से ग्रीन लोन देते हैं?",
          answer: "We partner with SBI, HDFC, ICICI, Axis Bank, and several NBFCs that specifically support sustainable MSMEs through preferential lending programs."
        }
      ]
    }
  ];

  const quickHelp = [
    {
      icon: Play,
      title: "Video Tutorials",
      titleHindi: "वीडियो ट्यूटोरियल",
      description: "Step-by-step guides in Hindi and English",
      link: "#videos"
    },
    {
      icon: FileText,
      title: "User Guide",
      titleHindi: "उपयोगकर्ता गाइड",
      description: "Complete manual for all features",
      link: "#guide"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      titleHindi: "लाइव चैट",
      description: "Chat with our support team",
      link: "#chat"
    },
    {
      icon: Phone,
      title: "Call Support",
      titleHindi: "सहायता कॉल",
      description: "Speak to an expert: 1800-BIOCOG",
      link: "tel:1800262624"
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <HelpCircle className="w-16 h-16 text-primary mx-auto" />
            <h1 className="text-3xl font-bold text-foreground">
              Help Center | सहायता केंद्र
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get answers to your questions about carbon credits, ESG reports, and sustainable business practices
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Quick Help */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickHelp.map((item, index) => (
            <Card key={index} className="p-6 hover:shadow-soft transition-all cursor-pointer group">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium mb-2">
                    {item.titleHindi}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground text-center">
            Frequently Asked Questions | अक्सर पूछे जाने वाले प्रश्न
          </h2>
          
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.titleHindi}</p>
              </div>
              
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex; // Unique index
                  const isExpanded = expandedFaq === globalIndex;
                  
                  return (
                    <div key={faqIndex} className="border border-border rounded-lg">
                      <button
                        onClick={() => toggleFaq(globalIndex)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {faq.questionHindi}
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="p-4 pt-0 border-t border-border">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Still Need Help? | अभी भी मदद चाहिए?
              </h3>
              <p className="text-muted-foreground">
                Our support team is here to help you succeed with your sustainability journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="space-y-2">
                <Mail className="w-8 h-8 text-primary mx-auto" />
                <div className="font-medium text-foreground">Email Support</div>
                <div className="text-sm text-muted-foreground">support@biocog.in</div>
                <div className="text-xs text-muted-foreground">Response within 2 hours</div>
              </div>
              
              <div className="space-y-2">
                <Phone className="w-8 h-8 text-primary mx-auto" />
                <div className="font-medium text-foreground">Phone Support</div>
                <div className="text-sm text-muted-foreground">1800-BIOCOG (Free)</div>
                <div className="text-xs text-muted-foreground">Available 9 AM - 6 PM</div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button className="btn-hero">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Live Chat
              </Button>
              <Button variant="outline">
                <Book className="w-4 h-4 mr-2" />
                Knowledge Base
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Help;