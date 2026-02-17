import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import StatsOverview from "@/components/sections/stats-overview";
import ListingsGrid from "@/components/sections/listings-grid";
import PressCarousel from "@/components/sections/press-carousel";
import ChristiesBlocks from "@/components/sections/christies-blocks";
import InquiryCTA from "@/components/sections/inquiry-cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsOverview />
      <ListingsGrid />
      <PressCarousel />
      <ChristiesBlocks />
      <InquiryCTA />
      <Footer />
    </>
  );
}
