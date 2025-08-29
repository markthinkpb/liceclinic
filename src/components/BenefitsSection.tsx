import { Shield, Zap, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BenefitsSection = () => {
  const benefits = [
  {
    icon: Zap,
    title: "We Kill Lice AND Lice Eggs In A Single Treatment",
    description:
      "The clinics who use these sites might not use hot/cold air so we need this to be more vague. Say \"Over the counter products rely on precise use and often don't kill the eggs themselves. Our signature approach ensures that all lice and their eggs are removed and disabled from reproducing\"",
    highlight: "Single Treatment Solution",
  },
  {
    icon: Shield,
    title: "Non-Toxic & Pesticide Free",
    description:
      "Our lice treatment is safe for kids and most importantly doesn't hurt!",
    highlight: "100% Safe & Natural",
  },
  {
    icon: GraduationCap,
    title: "In-Clinic Head Lice Education",
    description:
      "Head lice can cause a lot of stress for families. Our goal is to provide you with a complete head lice education so you have a thorough understanding of the life cycle of lice, how lice spreads and how to prevent getting lice in the future.",
    highlight: "Expert Education",
  },
];


  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Treatment?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our proven lice removal treatment method starts with identification and then uses our signature technology and methodoly to remove not only lice but their eggs. Guaranteed!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-soft transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-background to-accent/10"
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-hero-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-primary uppercase tracking-wider">
                      {benefit.highlight}
                    </div>
                    <h3 className="text-xl font-bold text-foreground leading-tight">
                      {benefit.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;