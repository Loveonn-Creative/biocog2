import { useState } from "react";
import { Plus, Upload, Scan, Zap, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceInterface } from "./VoiceInterface";

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <>
      <VoiceInterface isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
        {isOpen && (
          <div className="absolute bottom-16 right-0 mb-2 space-y-2 animate-fade-in">
            <Button
              onClick={() => {
                setIsVoiceOpen(true);
                setIsOpen(false);
              }}
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white shadow-lg"
              size="lg"
            >
              <Mic className="mr-2 h-4 w-4" />
              Voice Assistant
            </Button>
            <Button
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white shadow-lg"
              size="lg"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Bill
            </Button>
            <Button
              className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white shadow-lg"
              size="lg"
            >
              <Scan className="mr-2 h-4 w-4" />
              Scan Document
            </Button>
          </div>
        )}
        
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-hero hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          {isOpen ? <Zap className="h-6 w-6 animate-spin" /> : <Plus className="h-6 w-6" />}
        </Button>
      </div>
    </>
  );
};
