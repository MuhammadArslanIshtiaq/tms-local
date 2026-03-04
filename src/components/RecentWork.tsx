"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    title: "FinTech Platform Modernization",
    imageGradient: "from-blue-900/80 to-blue-950/90",
    imageAccent: "rgba(0, 112, 243, 0.15)",
  },
  {
    title: "Healthcare Data Pipeline",
    imageGradient: "from-emerald-900/80 to-emerald-950/90",
    imageAccent: "rgba(16, 185, 129, 0.15)",
  },
  {
    title: "Real-Time Analytics Dashboard",
    imageGradient: "from-violet-900/80 to-violet-950/90",
    imageAccent: "rgba(139, 92, 246, 0.15)",
  },
  {
    title: "E-Commerce Scalability Overhaul",
    imageGradient: "from-amber-900/80 to-amber-950/90",
    imageAccent: "rgba(245, 158, 11, 0.15)",
  },
];

export const RecentWork = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [400, 100, 0, -200]);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative h-[200vh]"
      aria-labelledby="recent-work-heading"
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-x-hidden">
        <div className="w-full overflow-x-hidden px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="mx-auto max-w-6xl">
          <h2
            id="recent-work-heading"
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
          >
            Our Portfolio
          </h2>
          <p className="mb-10 max-w-2xl text-slate-gray md:mb-12">
            Discover our latest projects and see how we&apos;ve helped businesses
            transform their digital presence
          </p>
          <motion.div
            style={{ x: translateX }}
            className="flex gap-6 md:gap-8"
          >
            {projects.map((project) => (
              <article
                key={project.title}
                className="recent-work-card group flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-gray/30 bg-charcoal/60 transition-colors duration-300 hover:border-electric-blue md:w-[360px]"
              >
                <div
                  className={`relative h-48 w-full bg-gradient-to-br ${project.imageGradient} md:h-56`}
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 30%, ${project.imageAccent} 0%, transparent 50%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-16 rounded-xl bg-white/5 backdrop-blur-sm" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="text-lg font-semibold md:text-xl">
                    {project.title}
                  </h3>
                  <a
                    href="#"
                    className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-electric-blue transition-colors hover:text-accent-dark"
                  >
                    View Case Study
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </article>
            ))}
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
