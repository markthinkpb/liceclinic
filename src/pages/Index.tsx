import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NetworkVerification from "@/components/NetworkVerification";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";

const Index = () => {
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
