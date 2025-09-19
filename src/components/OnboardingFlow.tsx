import { useState } from "react";
import { ArrowRight, Building, ShoppingCart, Languages, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OnboardingFlowProps {
  isOpen: boolean;
  onComplete: (data: any) => void;
  onClose: () => void;
}

export const OnboardingFlow = ({ isOpen, onComplete, onClose }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("hi-IN");
  const [businessData, setBusinessData] = useState({
    role: "",
    language: "",
    businessName: "",
    gstNumber: ""
  });

  const roles = [
    {
      id: "trader",
      title: "I'm a Trader",
      titleHindi: "मैं व्यापारी हूं",
      description: "Buy & sell goods, retail shop, wholesale",
      descriptionHindi: "सामान खरीदना-बेचना, दुकान",
      icon: ShoppingCart,
      examples: "Kirana, Electronics, Clothing"
    },
    {
      id: "manufacturer",
      title: "I'm a Manufacturer",
      titleHindi: "मैं निर्माता हूं",
      description: "Make products, run factory, processing",
      descriptionHindi: "सामान बनाना, फैक्ट्री चलाना",
      icon: Building,
      examples: "Textile, Food, Auto Parts"
    }
  ];

  const languages = [
    { code: "hi-IN", name: "हिन्दी", englishName: "Hindi", flag: "🇮🇳" },
    { code: "en-IN", name: "English", englishName: "English", flag: "🇬🇧" },
    { code: "bn-IN", name: "বাংলা", englishName: "Bengali", flag: "🇧🇩" },
    { code: "mr-IN", name: "मराठी", englishName: "Marathi", flag: "🇮🇳" },
    { code: "ta-IN", name: "தமிழ்", englishName: "Tamil", flag: "🇮🇳" },
    { code: "te-IN", name: "తెలుగు", englishName: "Telugu", flag: "🇮🇳" }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setBusinessData(prev => ({ ...prev, role: roleId }));
  };

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setBusinessData(prev => ({ ...prev, language: langCode }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    // Start guest mode - no actual signup required
    const userData = {
      ...businessData,
      isGuest: true,
      startedAt: new Date().toISOString()
    };
    onComplete(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card/95 backdrop-blur-sm border-border">
        <div className="p-6 space-y-6">
          {/* Progress */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Quick Setup</h2>
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i <= step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  What describes your business?
                </h3>
                <p className="text-muted-foreground">
                  आपका बिज़नेस कैसा है?
                </p>
              </div>

              <div className="grid gap-4">
                {roles.map((role) => (
                  <Card
                    key={role.id}
                    className={`p-6 cursor-pointer transition-all hover:shadow-soft ${
                      selectedRole === role.id
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <role.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground">{role.title}</h4>
                          {selectedRole === role.id && (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {role.titleHindi}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {role.description}
                        </p>
                        <p className="text-xs text-muted-foreground opacity-75">
                          {role.descriptionHindi}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {role.examples}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!selectedRole}
                className="w-full btn-hero"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Language Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <Languages className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  Choose Your Language
                </h3>
                <p className="text-muted-foreground">
                  अपनी भाषा चुनें | আপনার ভাষা নির্বাচন করুন
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <Card
                    key={lang.code}
                    className={`p-4 cursor-pointer transition-all hover:shadow-soft ${
                      selectedLanguage === lang.code
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-2xl">{lang.flag}</div>
                      <div className="font-medium text-foreground text-sm">
                        {lang.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {lang.englishName}
                      </div>
                      {selectedLanguage === lang.code && (
                        <CheckCircle className="w-4 h-4 text-primary mx-auto" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="w-full btn-hero"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 3: Guest Mode Start */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Ready to Go!
                </h3>
                <p className="text-muted-foreground">
                  Start using Biocog immediately. No registration required.
                </p>
                <p className="text-sm text-muted-foreground">
                  तुरंत शुरू करें। रजिस्ट्रेशन की जरूरत नहीं।
                </p>
              </div>

              {/* Summary */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="text-sm text-muted-foreground">Your Selection:</div>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">
                    {roles.find(r => r.id === selectedRole)?.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Language: {languages.find(l => l.code === selectedLanguage)?.name}
                  </div>
                </div>
              </div>

              {/* Features Available */}
              <div className="text-left space-y-2">
                <div className="text-sm font-medium text-foreground">Available Now:</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>✅ Scan up to 3 invoices</div>
                  <div>✅ Voice AI in your language</div>
                  <div>✅ Basic carbon footprint</div>
                  <div>✅ ESG report preview</div>
                </div>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full btn-hero"
              >
                Start Using Biocog
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground">
                Want to save progress? Create account after exploring.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};