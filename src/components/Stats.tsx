"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type StatItemProps = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

const StatItem = ({ value, suffix, label, decimals = 0 }: StatItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(v),
    });
    return () => controls.stop();
  }, [isInView, value]);

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-4xl font-bold text-electric-blue md:text-5xl">
        {formatted}
        {suffix}
      </div>
      <p className="mt-2 text-slate-gray md:text-lg">{label}</p>
    </motion.div>
  );
};

const stats = [
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
  { value: 50, suffix: "+", label: "Enterprise Clients", decimals: 0 },
  { value: 24, suffix: "/7", label: "Support", decimals: 0 },
];

export const Stats = () => {
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16"
      aria-label="Company statistics"
    >
      <div className="grid gap-12 sm:grid-cols-3">
        {stats.map((stat) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            decimals={stat.decimals}
          />
        ))}
      </div>
    </section>
  );
};
