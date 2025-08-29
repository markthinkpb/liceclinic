import { useState } from "react";
import { Phone, Star, Clock, Shield } from "lucide-react";
import { clinicConfig } from "@/config/clinic";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { clinicName, phone, locations, logo } = clinicConfig;

  // If a logo is configured, try to render it; if it fails to load, fall back to text
  const [useLogo, setUseLogo] = useState<boolean>(Boolean(logo));

  return (
    <>
      {/* CTA-Focused Top Bar */}
      <div className="bg-primary py-3 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between text-sm">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-primary-foreground font-medium">
              <Clock className="h-4 w-4" />
              <span>Same Day Appointments Available!</span>
            </div>
            <div className="flex items-center gap-1 text-primary-foreground">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">5-Star Rated Treatment</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href={`tel:${String(phone).replace(/[^+\d]/g, "")}`} 
              className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors font-bold text-base"
            >
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </a>
            {locations.length > 1 && (
              <span className="text-primary-foreground/80 text-xs">
                {locations.length} Locations
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CTA-Focused Main Header */}
      <header className="bg-background border-b sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Brand: logo or text fallback */}
              {useLogo && logo ? (
                <img
                  src={logo}
                  alt={`${clinicName} logo`}
                  className="w-auto h-20" // change size here
                  loading="eager"
                  onError={() => setUseLogo(false)}
                />
              ) : (
                <div className="text-2xl font-bold bg-text-gradient bg-clip-text text-transparent">
                  {clinicName}
                </div>
              )}

              <div className="hidden sm:flex items-center gap-2 ml-4">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground font-medium">100% Guaranteed</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Emergency Walk-ins Message - Hidden on mobile */}
              <div className="hidden lg:block text-sm text-muted-foreground">
                <span className="text-primary font-medium">Lice Removal Near You</span>
              </div>
              
              {/* Mobile: Single Call Button */}
              <div className="md:hidden">
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                  <a href={`tel:${String(phone).replace(/[^+\d]/g, "")}`}>Call Now</a>
                </Button>
              </div>
              
              {/* Desktop: Multiple CTAs */}
              <div className="hidden md:flex items-center gap-3">
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href={`tel:${String(phone).replace(/[^+\d]/g, "")}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 font-semibold">
                  Book Online
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Emergency Message */}
          <div className="md:hidden mt-2 text-center text-sm text-muted-foreground">
            Emergency? <span className="text-primary font-medium">Walk-ins Welcome</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
