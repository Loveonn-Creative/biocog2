import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  BarChart3, 
  FileText, 
  Recycle, 
  HelpCircle,
  Menu,
  X,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3, badge: "New" },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Recycle", href: "/recycle", icon: Recycle },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.name}</span>
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-xl font-bold">Biocog</span>
              <Badge variant="secondary">Beta</Badge>
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-8 space-y-4">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-8 border-t border-border space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Quick Actions</h4>
            <Button className="w-full btn-hero" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              Scan New Bill
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Need Help?</p>
              <p className="text-xs text-muted-foreground">support@biocog.in</p>
              <p className="text-xs text-muted-foreground">+91 1800-BIOCOG</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50 md:hidden">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs transition-colors relative ${
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};