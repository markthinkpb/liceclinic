import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NetworkVerification from "@/components/NetworkVerification";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageTitle";

const Index = () => {
  // 👇 Title: "Clinic Name | Lice Removal Near Main Area"
  // 👇 Description: Custom text for SEO
  usePageMeta("Home");
  
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <NetworkVerification />
      <BenefitsSection />
      <Footer />
    </div>
  );
};

export default Index;
