import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AgentSection from "@/components/AgentSection";
import ListingsSection from "@/components/ListingsSection";
import MarketUpdates from "@/components/MarketUpdates";
import RentData from "@/components/RentData";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <AgentSection />
      <ListingsSection />
      <MarketUpdates />
      <RentData />
      <ResourcesSection />
      <Footer />
    </>
  );
}
