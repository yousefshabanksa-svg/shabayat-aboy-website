import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import MenuBoard from "@/components/MenuBoard";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import LocationFooter from "@/components/LocationFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <MenuBoard />
      <Testimonials />
      <CTABanner />
      <LocationFooter />
      <FloatingWhatsApp />
      <CartDrawer />
    </main>
  );
}
