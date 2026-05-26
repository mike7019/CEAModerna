import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Courses from "@/components/Courses";
import About from "@/components/About";
import Services from "@/components/Services";
import Locations from "@/components/Locations";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Courses />
      <About />
      <Services />
      <Locations />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
}
