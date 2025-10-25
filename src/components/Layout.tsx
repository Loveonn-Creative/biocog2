import { MobileNavigation } from "@/components/MobileNavigation";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Badge } from "@/components/ui/badge";

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  title?: string;
}

export const Layout = ({ children, showNavigation = true, title }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showNavigation && (
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-40">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="text-xl font-bold text-foreground">Biocog</span>
                <Badge variant="secondary" className="ml-2">Beta</Badge>
                {title && (
                  <>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-foreground font-medium">{title}</span>
                  </>
                )}
              </div>
              
              <MobileNavigation />
            </div>
          </div>
        </nav>
      )}

      <main className={showNavigation ? "pt-20" : ""}>
        {children}
      </main>

      <FloatingActionButton />
    </div>
  );
};