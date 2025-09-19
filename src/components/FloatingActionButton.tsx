import { useState } from "react";
import { Camera, Mic, FileText, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  action: () => void;
  color: string;
}

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions: FloatingAction[] = [
    {
      icon: Camera,
      label: "Scan Bill",
      action: () => window.location.href = '/dashboard',
      color: "bg-primary hover:bg-primary/90"
    },
    {
      icon: Mic,
      label: "Voice AI",
      action: () => {
        // Trigger voice interface
        console.log("Voice AI triggered");
      },
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: FileText,
      label: "Reports",
      action: () => window.location.href = '/reports',
      color: "bg-green-500 hover:bg-green-600"
    }
  ];

  return (
    <div className="fixed bottom-20 right-4 z-40 md:hidden">
      {/* Action Buttons */}
      <div className={`space-y-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="bg-background px-3 py-1 rounded-full shadow-soft border border-border">
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </div>
            <Button
              size="sm"
              className={`w-12 h-12 rounded-full shadow-lg ${action.color} text-white`}
              onClick={() => {
                action.action();
                setIsOpen(false);
              }}
            >
              <action.icon className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="lg"
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-destructive hover:bg-destructive/90 rotate-45' 
            : 'bg-primary hover:bg-primary/90 rotate-0'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </Button>
    </div>
  );
};