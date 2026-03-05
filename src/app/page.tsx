import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import ListingsGrid from "@/components/sections/listings-grid";
import StatsOverview from "@/components/sections/stats-overview";
import PressCarousel from "@/components/sections/press-carousel";
import InquiryCta from "@/components/sections/inquiry-cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ListingsGrid />
      <StatsOverview />
      <PressCarousel />
      <InquiryCta />
      <Footer />
    </>
  );
}
