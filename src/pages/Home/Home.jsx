import HeroSection from "../../components/sections/HeroSection";
import CategoriesSection from "../../components/sections/CategoriesSection";
import FeaturedPerfumes from "../../components/sections/FeaturedPerfumes";
import Testimonials from "../../components/sections/Testimonials";
import Services from "../../components/sections/Services";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedPerfumes />

      <div id="testimonials">
        <Testimonials />
      </div>

      <div id="services">
        <Services />
      </div>
    </>
  );
}
