import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import StickyCTA from "@/components/StickyCTA";
import Badges from "@/components/Badges";
import CTABanner from "@/components/CTABanner";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
  <Badges />
  <Process />
  <About />
  <Founder />
      <Services />
      <ContactForm />
  <FAQ />
  <Testimonials />
  <CTABanner />
      <Footer />
  <StickyCTA />
    </>
  );
}
