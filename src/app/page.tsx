import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedCharities from "@/components/sections/FeaturedCharities";
import Impact from "@/components/sections/Impact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-cream">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedCharities />
      <Impact />
      <Footer />
    </main>
  );
}