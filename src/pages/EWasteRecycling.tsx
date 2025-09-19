import { useState } from "react";
import { 
  Smartphone, 
  Monitor, 
  Printer, 
  Battery, 
  MapPin, 
  Phone, 
  Star,
  Truck,
  Calendar,
  CheckCircle,
  Plus,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const EWasteRecycling = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedRecycler, setSelectedRecycler] = useState<number | null>(null);
  const [pickupScheduled, setPickupScheduled] = useState(false);

  const wasteCategories = [
    {
      id: "mobile",
      name: "Mobile Phones",
      nameHindi: "मोबाइल फोन",
      icon: Smartphone,
      rate: "₹50-200/kg",
      description: "Smartphones, feature phones, tablets"
    },
    {
      id: "computer",
      name: "Computers & Laptops",
      nameHindi: "कंप्यूटर व लैपटॉप",
      icon: Monitor,
      rate: "₹100-500/kg",
      description: "Desktop computers, laptops, monitors"
    },
    {
      id: "printer",
      name: "Printers & Electronics",
      nameHindi: "प्रिंटर व इलेक्ट्रॉनिक्स",
      icon: Printer,
      rate: "₹30-150/kg",
      description: "Printers, scanners, fax machines"
    },
    {
      id: "battery",
      name: "Batteries",
      nameHindi: "बैटरी",
      icon: Battery,
      rate: "₹80-300/kg",
      description: "Lead acid, lithium, mobile batteries"
    }
  ];

  const verifiedRecyclers = [
    {
      id: 1,
      name: "GreenTech Recycling Pvt Ltd",
      nameHindi: "ग्रीनटेक रीसाइक्लिंग",
      location: "Pune, Maharashtra",
      rating: 4.8,
      reviews: 142,
      distance: "12 km",
      speciality: "Electronics & Mobile Phones",
      certifications: ["ISO 14001", "CPCB Authorized", "R2 Certified"],
      contact: "+91 98765 43210",
      pickupAvailable: true,
      minQuantity: "5 kg",
      experience: "8 years",
      responseTime: "2 hours"
    },
    {
      id: 2,
      name: "Eco-Friendly Solutions",
      nameHindi: "इको-फ्रैंडली सॉल्यूशन्स",
      location: "Mumbai, Maharashtra",
      rating: 4.6,
      reviews: 89,
      distance: "18 km",
      speciality: "All Electronics",
      certifications: ["CPCB Authorized", "Green Cert"],
      contact: "+91 87654 32109",
      pickupAvailable: true,
      minQuantity: "10 kg",
      experience: "5 years",
      responseTime: "4 hours"
    },
    {
      id: 3,
      name: "Urban Waste Management",
      nameHindi: "अर्बन वेस्ट मैनेजमेंट",
      location: "Nashik, Maharashtra",
      rating: 4.9,
      reviews: 203,
      distance: "25 km",
      speciality: "Batteries & Components",
      certifications: ["ISO 14001", "CPCB Authorized", "EPR Compliant"],
      contact: "+91 76543 21098",
      pickupAvailable: true,
      minQuantity: "3 kg",
      experience: "12 years",
      responseTime: "1 hour"
    }
  ];

  const handleSchedulePickup = (recyclerId: number) => {
    setSelectedRecycler(recyclerId);
    setPickupScheduled(true);
  };

  const calculateEarnings = () => {
    if (!weight || !selectedCategory) return 0;
    const category = wasteCategories.find(c => c.id === selectedCategory);
    if (!category) return 0;
    
    // Extract average rate (simplified)
    const rateRange = category.rate.match(/₹(\d+)-(\d+)/);
    if (!rateRange) return 0;
    
    const avgRate = (parseInt(rateRange[1]) + parseInt(rateRange[2])) / 2;
    return Math.round(avgRate * parseFloat(weight));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                E-Waste Recycling | ई-कचरा रीसाइक्लिंग
              </h1>
              <p className="text-muted-foreground">
                Turn your electronic waste into cash with verified recyclers
              </p>
            </div>
            <Badge variant="secondary" className="bg-success/20 text-success">
              ♻️ Eco-Friendly Earning
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Waste Category Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            What do you want to recycle? | क्या रीसाइकिल करना चाहते हैं?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {wasteCategories.map((category) => (
              <Card
                key={category.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-soft ${
                  selectedCategory === category.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      {category.nameHindi}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {category.rate}
                  </Badge>
                  {selectedCategory === category.id && (
                    <CheckCircle className="w-5 h-5 text-primary mx-auto" />
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Weight Input */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Approximate Weight (kg) | अनुमानित वजन
              </label>
              <Input
                type="number"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Estimated Earnings | अनुमानित कमाई
              </label>
              <div className="h-10 bg-success/10 border border-success/30 rounded-md flex items-center px-3">
                <span className="text-lg font-bold text-success">
                  ₹{calculateEarnings().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Verified Recyclers */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Verified Recyclers | सत्यापित रीसाइक्लर
            </h2>
            <div className="flex items-center space-x-2">
              <Input 
                placeholder="Search location..."
                className="w-48"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {verifiedRecyclers.map((recycler) => (
              <Card key={recycler.id} className="p-6 border border-border hover:shadow-soft transition-all">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Recycler Info */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{recycler.name}</h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          {recycler.nameHindi}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{recycler.location}</span>
                          <Badge variant="outline" className="text-xs">
                            {recycler.distance}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-foreground">{recycler.rating}</span>
                        <span className="text-sm text-muted-foreground">({recycler.reviews})</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Speciality:</div>
                        <div className="font-medium text-foreground">{recycler.speciality}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Experience:</div>
                        <div className="font-medium text-foreground">{recycler.experience}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Min Quantity:</div>
                        <div className="font-medium text-foreground">{recycler.minQuantity}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Response Time:</div>
                        <div className="font-medium text-foreground">{recycler.responseTime}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {recycler.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          ✓ {cert}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{recycler.contact}</span>
                      </div>
                      {recycler.pickupAvailable && (
                        <Badge variant="outline" className="text-xs text-success border-success">
                          <Truck className="w-3 h-3 mr-1" />
                          Free Pickup
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <Button 
                      onClick={() => handleSchedulePickup(recycler.id)}
                      className="btn-hero"
                      disabled={!selectedCategory || !weight || parseFloat(weight) < parseFloat(recycler.minQuantity)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Pickup
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Pickup Scheduled Success */}
        {pickupScheduled && (
          <Card className="p-8 text-center bg-gradient-to-r from-success/10 to-success/5 border-success/30">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Pickup Scheduled Successfully! ✅
              </h3>
              <p className="text-muted-foreground">
                आपका पिकअप सफलतापूर्वक शेड्यूल हो गया है
              </p>
              <div className="bg-white/50 rounded-lg p-4 max-w-md mx-auto">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recycler:</span>
                    <span className="font-medium text-foreground">
                      {verifiedRecyclers.find(r => r.id === selectedRecycler)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Earnings:</span>
                    <span className="font-bold text-success">₹{calculateEarnings().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pickup Date:</span>
                    <span className="font-medium text-foreground">Tomorrow, 2-4 PM</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Recycler
                </Button>
                <Button 
                  onClick={() => setPickupScheduled(false)}
                  className="btn-hero"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Another
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Verified Partners</h3>
            <p className="text-sm text-muted-foreground">
              All recyclers are CPCB certified and verified by our team
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Free Pickup</h3>
            <p className="text-sm text-muted-foreground">
              Convenient doorstep pickup service at no extra cost
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Best Rates</h3>
            <p className="text-sm text-muted-foreground">
              Competitive pricing and transparent rate structure
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EWasteRecycling;