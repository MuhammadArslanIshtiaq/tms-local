"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Activity,
  Cloud,
  Plug,
  Code2,
  type LucideIcon,
} from "lucide-react";

type FeatureTileProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  className?: string;
  variant?: "default" | "glow";
};

const tileVariants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
};

const FeatureTile = ({
  title,
  description,
  icon: Icon,
  index,
  className = "",
  variant = "default",
}: FeatureTileProps) => (
  <motion.div
    variants={tileVariants}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-40px" }}
    transition={{
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    className={`group relative overflow-hidden rounded-xl border border-slate-gray/30 bg-gradient-to-br from-charcoal/90 to-charcoal/70 p-6 transition-colors duration-300 hover:border-blue-500 ${className}`}
  >
    <div className="flex h-full flex-col">
      <div
        className={
          variant === "glow"
            ? "inline-flex rounded-lg bg-electric-blue/10 p-3"
            : "inline-flex rounded-lg bg-slate-gray/10 p-2.5"
        }
      >
        <Icon
          className={`size-7 text-electric-blue ${variant === "glow" ? "drop-shadow-[0_0_12px_rgba(0,112,243,0.6)]" : ""}`}
          aria-hidden
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-gray">{description}</p>
    </div>
  </motion.div>
);

const features = [
  {
    title: "Enterprise Security",
    description:
      "Multi-layered defense, zero-trust architecture, and compliance frameworks to protect your critical assets.",
    icon: Shield,
    gridClass: "md:col-span-2 md:row-span-1",
    variant: "glow" as const,
    index: 0,
  },
  {
    title: "24/7 Monitoring",
    description:
      "Round-the-clock surveillance with intelligent alerts and automated response protocols.",
    icon: Activity,
    gridClass: "md:col-span-1 md:row-span-2",
    variant: "default" as const,
    index: 1,
  },
  {
    title: "Cloud Migration",
    description: "Seamless transition to the cloud with minimal downtime and maximum efficiency.",
    icon: Cloud,
    gridClass: "md:col-span-1 md:row-span-1",
    variant: "default" as const,
    index: 2,
  },
  {
    title: "API Integration",
    description: "Connect systems and automate workflows with robust, scalable API strategies.",
    icon: Plug,
    gridClass: "md:col-span-1 md:row-span-1",
    variant: "default" as const,
    index: 3,
  },
  {
    title: "Custom Dev",
    description: "Tailored solutions built from the ground up to fit your unique requirements.",
    icon: Code2,
    gridClass: "md:col-span-2 md:row-span-1",
    variant: "default" as const,
    index: 4,
  },
];

export const Features = () => {
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16"
      aria-labelledby="features-heading"
    >
      <motion.h2
        id="features-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold tracking-tight md:text-4xl"
      >
        Features
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-2 text-slate-gray md:text-lg"
      >
        Built for scale, designed for resilience
      </motion.p>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 md:[grid-template-rows:minmax(160px,1fr)_minmax(160px,1fr)]">
        {features.map((feature) => (
          <FeatureTile
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            index={feature.index}
            className={feature.gridClass}
            variant={feature.variant}
          />
        ))}
      </div>
    </section>
  );
};
