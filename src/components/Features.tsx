"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Cloud,
  Code2,
  Plug,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";
import { useSpotlight } from "@/hooks/useSpotlight";
import { staggerChild, staggerParent } from "./Reveal";

/* -------------------------------------------------------------------------- */
/* Decorative tile visuals                                                     */
/* -------------------------------------------------------------------------- */

const ShieldVisual = () => (
  <div className="pointer-events-none absolute -right-10 -top-6 size-56 opacity-70" aria-hidden>
    {[0, 1, 2].map((ring) => (
      <motion.span
        key={ring}
        className="absolute inset-0 m-auto rounded-full border border-accent/25"
        style={{ width: `${45 + ring * 26}%`, height: `${45 + ring * 26}%` }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.2, 0.55] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: ring * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
    <span className="absolute inset-0 m-auto size-[18%] rounded-full bg-accent/40 blur-md" />
  </div>
);

const PulseVisual = () => (
  <div className="pointer-events-none absolute inset-x-6 bottom-5 h-12 opacity-80" aria-hidden>
    <svg viewBox="0 0 200 40" className="size-full" preserveAspectRatio="none">
      <motion.path
        d="M0 26 L26 26 L34 10 L44 34 L54 18 L64 26 L92 26 L100 6 L110 34 L120 26 L200 26"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

const CodeVisual = () => {
  const lines = [
    { w: "62%", c: "bg-accent/60" },
    { w: "84%", c: "bg-slate-gray/30" },
    { w: "48%", c: "bg-accent-2/50" },
    { w: "72%", c: "bg-slate-gray/25" },
    { w: "38%", c: "bg-accent-3/45" },
  ];

  return (
    <div
      className="pointer-events-none absolute bottom-6 right-6 hidden w-56 flex-col gap-2 rounded-xl border border-line bg-background/50 p-4 backdrop-blur-sm sm:flex"
      aria-hidden
    >
      <div className="mb-1 flex gap-1.5">
        {["bg-red-400/50", "bg-amber-400/50", "bg-emerald-400/50"].map((dot) => (
          <span key={dot} className={`size-2 rounded-full ${dot}`} />
        ))}
      </div>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={`h-1.5 rounded-full ${line.c}`}
          initial={{ width: 0 }}
          whileInView={{ width: line.w }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const TeamVisual = () => (
  <div className="pointer-events-none absolute bottom-7 right-7 hidden items-center sm:flex" aria-hidden>
    {["TM", "SD", "AR", "+9"].map((initials, i) => (
      <motion.span
        key={initials}
        initial={{ opacity: 0, scale: 0.6, x: 12 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
        className={`-ml-3 flex size-11 items-center justify-center rounded-full border border-line text-xs font-semibold backdrop-blur-md first:ml-0 ${
          i === 3
            ? "bg-accent/20 text-accent"
            : "bg-surface text-slate-gray"
        }`}
      >
        {initials}
      </motion.span>
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  wide?: boolean;
  visual?: ReactNode;
};

const features: Feature[] = [
  {
    title: "Enterprise-grade security",
    description:
      "Zero-trust architecture, encryption in transit and at rest, and audit-ready controls mapped to SOC 2, ISO 27001, and GDPR.",
    icon: Shield,
    wide: true,
    visual: <ShieldVisual />,
  },
  {
    title: "Cloud migration",
    description: "Move legacy workloads with minimal downtime and no data loss.",
    icon: Cloud,
  },
  {
    title: "24/7 monitoring",
    description: "Intelligent alerting with automated incident response.",
    icon: Activity,
    visual: <PulseVisual />,
  },
  {
    title: "Software built to last",
    description:
      "Typed, tested, documented code with CI/CD from day one — so the system you launch is the system you can still extend in five years.",
    icon: Code2,
    wide: true,
    visual: <CodeVisual />,
  },
  {
    title: "API integration",
    description: "Connect the systems you already run into one coherent layer.",
    icon: Plug,
  },
  {
    title: "Embedded senior teams",
    description:
      "Engineers who join your standups, learn your domain, and stay through delivery — not a rotating bench of contractors.",
    icon: Users,
    wide: true,
    visual: <TeamVisual />,
  },
];

const FeatureTile = ({ title, description, icon: Icon, wide, visual }: Feature) => {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      variants={staggerChild}
      className={wide ? "lg:col-span-2" : undefined}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="card spotlight-parent group relative h-full overflow-hidden p-6 sm:p-7"
      >
        <div className="spotlight-field" aria-hidden />
        {visual}

        <div className="relative z-10 flex max-w-md flex-col">
          <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-transparent text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_26px_-8px_var(--glow)]">
            <Icon className="size-5" aria-hidden />
          </span>
          <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-gray">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const Features = () => (
  <section
    aria-labelledby="features-heading"
    className="relative overflow-hidden py-24 md:py-32"
  >
    <div className="shell">
      <SectionHeading
        id="features-heading"
        eyebrow="Why teams choose us"
        title={
          <>
            Built for scale,{" "}
            <span className="text-gradient">designed for resilience</span>
          </>
        }
        description="The engineering standards we hold ourselves to on every engagement — no exceptions, no shortcuts."
        align="center"
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <FeatureTile key={feature.title} {...feature} />
        ))}
      </motion.div>
    </div>
  </section>
);
