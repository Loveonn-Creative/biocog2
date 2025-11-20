import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface VoiceInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

// Predefined Q&A for demo
const qaDemoData = [
  {
    question: "ESG क्या है?",
    answer: "यह Environment, Social, Governance है—आपका बिज़नेस प्रकृति, समाज और नियमों पर कैसे असर डालता है।"
  },
  {
    question: "कार्बन क्रेडिट क्या होता है?",
    answer: "यह प्रूफ है कि आपने कार्बन घटाया। इसे बेचकर पैसे कमा सकते हैं। हर 1 टन बचत = 1 क्रेडिट।"
  },
  {
    question: "Green loan कैसे मिलेगा?",
    answer: "Biocog आपका ESG डेटा बैंक को भेजता है। आपको ₹5 लाख तक का लोन बिना गारंटी मिल सकता है।"
  }
];

export const VoiceInterface = ({ isOpen, onClose }: VoiceInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("hi-IN");

  const languages = [
    { code: "hi-IN", name: "हिंदी", flag: "🇮🇳" },
    { code: "en-IN", name: "English", flag: "🇬🇧" },
    { code: "bn-IN", name: "বাংলা", flag: "🇧🇩" },
    { code: "mr-IN", name: "मराठी", flag: "🇮🇳" },
    { code: "ta-IN", name: "தமிழ்", flag: "🇮🇳" }
  ];

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = currentLanguage;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      setResponse("");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript) {
        handleQuery(transcript);
      }
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleQuery = async (query: string) => {
    setIsThinking(true);
    
    try {
      // Call AI edge function with language context
      const lang = currentLanguage.startsWith('hi') ? 'hi' : 'en';
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          query,
          language: lang,
          context: 'voice_interface'
        }
      });

      if (error) throw error;

      const aiResponse = data?.response || (lang === 'hi' 
        ? "मुझे समझ नहीं आया। फिर से पूछें।"
        : "I didn't understand. Please ask again.");
      
      setResponse(aiResponse);
      
      // Text-to-speech with proper rate and pitch for clarity
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.lang = currentLanguage;
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.0;
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Voice query error:', error);
      const errorMsg = currentLanguage.startsWith('hi')
        ? "कुछ गड़बड़ हुई। फिर कोशिश करें।"
        : "Something went wrong. Try again.";
      setResponse(errorMsg);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(errorMsg);
        utterance.lang = currentLanguage;
        speechSynthesis.speak(utterance);
      }
    }
    
    setIsThinking(false);
  };

  const speakResponse = () => {
    if ('speechSynthesis' in window && response) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = currentLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card/95 backdrop-blur-sm border-border">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              AI सहायक | AI Assistant
            </h2>
            <Button onClick={onClose} variant="ghost" size="sm">
              ✕
            </Button>
          </div>

          {/* Language Selection */}
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setCurrentLanguage(lang.code)}
              >
                {lang.flag} {lang.name}
              </Badge>
            ))}
          </div>

          {/* Voice Controls */}
          <div className="text-center space-y-4">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isListening ? 'bg-destructive voice-pulse' : 'bg-primary'
            }`}>
              {isListening ? (
                <MicOff className="w-10 h-10 text-white" onClick={stopListening} />
              ) : (
                <Mic className="w-10 h-10 text-white" onClick={startListening} />
              )}
            </div>
            
            <p className="text-muted-foreground">
              {isListening 
                ? (currentLanguage.startsWith('hi') ? "सुन रहा हूं..." : "Listening...")
                : (currentLanguage.startsWith('hi') ? "बोलने के लिए टैप करें" : "Tap to speak")
              }
            </p>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                {currentLanguage.startsWith('hi') ? "आपने कहा:" : "You said:"}
              </p>
              <p className="text-foreground">{transcript}</p>
            </div>
          )}

          {/* AI Response */}
          {(isThinking || response) && (
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Biocog AI {currentLanguage.startsWith('hi') ? "का जवाब:" : "Response:"}
                </p>
                {response && (
                  <Button
                    onClick={speakResponse}
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {isThinking ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-muted-foreground">
                    {currentLanguage.startsWith('hi') ? "सोच रहा हूं..." : "Thinking..."}
                  </span>
                </div>
              ) : (
                <p className="text-foreground">{response}</p>
              )}
            </div>
          )}

          {/* Quick Questions */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {currentLanguage.startsWith('hi') ? "जल्दी पूछें:" : "Quick questions:"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {qaDemoData.slice(0, 2).map((qa, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto p-3"
                  onClick={() => handleQuery(qa.question)}
                >
                  {qa.question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};