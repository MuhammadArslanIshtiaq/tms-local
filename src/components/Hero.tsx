"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FolderKanban } from "lucide-react";
import { Magnetic } from "./Magnetic";

const ROTATING_TERMS = [
  "Software Development",
  "Cloud Solutions",
  "Data Analytics",
  "Mobile Development",
  "Cybersecurity",
  "Digital Transformation",
  "Web Solutions",
  "IT Infrastructure",
] as const;

const ROTATE_INTERVAL_MS = 2800;

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const Hero = () => {
  const [termIndex, setTermIndex] = useState(0);
  const currentTerm = ROTATING_TERMS[termIndex];

  useEffect(() => {
    const id = setInterval(() => {
      setTermIndex((prev) => (prev + 1) % ROTATING_TERMS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden px-6 py-24 sm:min-h-[90vh] sm:px-8 md:px-12 lg:px-16"
      aria-label="Hero section"
    >
      {/* Animated mesh gradient background */}
      <div className="hero-mesh-gradient absolute inset-0" aria-hidden>
        <div className="hero-mesh-blob" aria-hidden />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="flex justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="relative min-h-[2.5em] w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={currentTerm}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-electric-blue"
                >
                  {currentTerm}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="mt-3 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="hero-gradient-text">
              Digital Solutions, Crafted to Perfection
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-base text-slate-gray sm:text-lg md:mt-8 md:text-xl"
          >
            Delivering cutting-edge software development, web solutions, and IT
            infrastructure for government, enterprise, and scale-up clients
            worldwide.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5"
          >
            <Magnetic className="inline-flex">
              <a
                href="/#contact"
                className="hero-primary-btn group inline-flex items-center justify-center gap-2 rounded-xl bg-electric-blue px-8 py-4 text-base font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-charcoal sm:px-10 sm:py-5"
                aria-label="Hire our team"
              >
                Hire Our Team
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Magnetic>
            <Magnetic className="inline-flex">
              <a
                href="/#services"
                className="hero-secondary-btn inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-medium text-foreground backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-charcoal sm:px-10 sm:py-5"
                aria-label="Explore our services"
              >
                <FolderKanban className="size-4" aria-hidden />
                Explore Services
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
