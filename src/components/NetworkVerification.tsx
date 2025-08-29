import { Shield, CheckCircle2, Users } from "lucide-react";
import { clinicConfig } from "@/config/clinic";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import your badge image
import networkBadge from "@/assets/network-badge.png";

const NetworkVerification = () => {
  const { networkMembership } = clinicConfig;

  if (!networkMembership?.isVerified || !networkMembership.showBadge) {
    return null;
  }

  // Only 2 stat cards now; 3rd slot will be badge image
  const networkStats = [
    { value: "400,000+", label: "Successful Treatments", icon: CheckCircle2 },
    { value: "100+", label: "Verified Providers", icon: Users },
  ];

  return (
    <section id="learn-more" className="py-12 bg-gradient-to-r from-background/50 to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">
                Verified Professional Member
              </Badge>
              <h3 className="text-2xl font-bold text-foreground">
                Certified {networkMembership.networkName} Professional
              </h3>
              <p className="text-muted-foreground">
                Your local {networkMembership.localArea} •{" "}
                {networkMembership.certificationBlurb}
              </p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        {networkMembership.showStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {networkStats.map((stat, index) => (
            <Card key={index} className="border-primary/20">
              <CardContent className="h-full flex flex-col items-center justify-center py-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}

          {/* Third card = Badge image */}
          <Card className="border-primary/20">
            <CardContent className="h-full flex items-center justify-center p-6">
              <img
                src={networkBadge}
                alt="Network Verification Badge"
                className="max-h-40 mx-auto"
              />
            </CardContent>
          </Card>
        </div>
      )}
      </div>
    </section>
  );
};

export default NetworkVerification;
