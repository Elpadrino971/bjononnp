import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import LogoCloud from "@/components/sections/LogoCloud";
import ProtocolArchitecture from "@/components/sections/ProtocolArchitecture";
import MCPModules from "@/components/sections/MCPModules";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <ProtocolArchitecture />
        <MCPModules />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
