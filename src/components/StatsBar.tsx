"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type StatBarItemProps = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

const StatBarItem = ({ value, suffix, label, decimals = 0 }: StatBarItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(v),
    });
    return () => controls.stop();
  }, [isInView, value]);

  const formatted =
    decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center border-r border-slate-gray/20 last:border-r-0 md:border-r"
    >
      <span className="text-2xl font-bold text-electric-blue md:text-3xl">
        {formatted}
        {suffix}
      </span>
      <span className="mt-0.5 text-xs text-slate-gray md:text-sm">{label}</span>
    </motion.div>
  );
};

const stats = [
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 99, suffix: "%", label: "Success Rate" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

export const StatsBar = () => {
  return (
    <section
      className="border-y border-slate-gray/20 bg-charcoal/40 py-8"
      aria-label="Company achievements"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 sm:px-8 md:grid-cols-4 md:gap-0 md:px-12 lg:px-16">
        {stats.map((stat) => (
          <StatBarItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
};
