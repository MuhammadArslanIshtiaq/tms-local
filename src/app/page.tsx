import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TechEcosystem } from "@/components/TechEcosystem";
import { Services } from "@/components/Services";
import { Features } from "@/components/Features";
import { CaseStudies } from "@/components/CaseStudies";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { ClientResultsFaq } from "@/components/ClientResultsFaq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Header />

      <main id="main">
        <Hero />
        <TechEcosystem />
        <Services />
        <Features />
        <CaseStudies />
        <Process />
        <About />
        <ClientResultsFaq />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
