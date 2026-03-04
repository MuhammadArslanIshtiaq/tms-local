"use client";

import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { StatsBar } from "@/components/StatsBar";
import { Services } from "@/components/Services";
import { TechEcosystem } from "@/components/TechEcosystem";
import { Features } from "@/components/Features";
import { RecentWork } from "@/components/RecentWork";
import { ClientResultsFaq } from "@/components/ClientResultsFaq";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />

      <main>
        <Hero />
        <StatsBar />
        <Services />
        <TechEcosystem />
        <Features />
        <RecentWork />
        <ClientResultsFaq />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
