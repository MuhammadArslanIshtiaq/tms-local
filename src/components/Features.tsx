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
  variant?: "default" | "glow";
};

const tileVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const FeatureTile = ({
  title,
  description,
  icon: Icon,
  index,
  variant = "default",
}: FeatureTileProps) => (
  <motion.div
    variants={tileVariants}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-40px" }}
    transition={{
      duration: 0.4,
      delay: index * 0.06,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    className="group flex flex-col gap-3 rounded-xl border border-slate-gray/30 bg-charcoal/60 p-4 transition-colors duration-300 hover:border-blue-500 sm:p-5"
  >
    <div
      className={
        variant === "glow"
          ? "inline-flex w-fit rounded-lg bg-electric-blue/10 p-2"
          : "inline-flex w-fit rounded-lg bg-slate-gray/10 p-2"
      }
    >
      <Icon
        className={`size-5 text-electric-blue sm:size-6 ${variant === "glow" ? "drop-shadow-[0_0_8px_rgba(0,112,243,0.5)]" : ""}`}
        aria-hidden
      />
    </div>
    <h3 className="text-base font-semibold leading-tight sm:text-lg">{title}</h3>
    <p className="text-sm leading-snug text-slate-gray">{description}</p>
  </motion.div>
);

const features = [
  {
    title: "Enterprise Security",
    description: "Zero-trust architecture and compliance frameworks.",
    icon: Shield,
    variant: "glow" as const,
    index: 0,
  },
  {
    title: "24/7 Monitoring",
    description: "Intelligent alerts and automated response protocols.",
    icon: Activity,
    variant: "default" as const,
    index: 1,
  },
  {
    title: "Cloud Migration",
    description: "Seamless transition with minimal downtime.",
    icon: Cloud,
    variant: "default" as const,
    index: 2,
  },
  {
    title: "API Integration",
    description: "Connect systems with scalable API strategies.",
    icon: Plug,
    variant: "default" as const,
    index: 3,
  },
  {
    title: "Custom Dev",
    description: "Tailored solutions for your unique requirements.",
    icon: Code2,
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
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {features.map((feature) => (
          <FeatureTile
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            index={feature.index}
            variant={feature.variant}
          />
        ))}
      </div>
    </section>
  );
};
