"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Eye,
  Handshake,
  Scale,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { CountUp } from "./CountUp";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { useSpotlight } from "@/hooks/useSpotlight";

const pillars = [
  {
    icon: Target,
    title: "Our mission",
    description:
      "To empower organisations with technology that drives measurable growth, efficiency, and competitive advantage.",
  },
  {
    icon: Eye,
    title: "Our vision",
    description:
      "To be the engineering partner serious organisations call first when the system has to work.",
  },
  {
    icon: Handshake,
    title: "Our promise",
    description:
      "Senior people, transparent pricing, and an unwavering commitment to the outcome you were sold.",
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Years in market" },
  { value: 200, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "+", label: "Senior engineers" },
  { value: 75, suffix: "+", label: "Businesses served" },
];

const values = [
  { icon: Sparkles, title: "Innovation", description: "We push boundaries to keep you ahead." },
  { icon: Award, title: "Excellence", description: "Meticulous attention to detail, every release." },
  { icon: Users, title: "Collaboration", description: "We work as an extension of your team." },
  { icon: Zap, title: "Growth", description: "Architecture that scales with your ambition." },
  { icon: Shield, title: "Security", description: "Robust protection for data and systems." },
  { icon: Scale, title: "Integrity", description: "Transparency and honesty, without exception." },
];

const PillarCard = ({
  icon: Icon,
  title,
  description,
}: (typeof pillars)[number]) => {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="card spotlight-parent group relative flex gap-5 overflow-hidden p-6"
    >
      <div className="spotlight-field" aria-hidden />
      <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-transparent text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_26px_-8px_var(--glow)]">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-gray">
          {description}
        </p>
      </div>
    </div>
  );
};

export const About = () => (
  <section
    id="about"
    aria-labelledby="about-heading"
    className="relative overflow-hidden border-t border-line py-24 md:py-32"
  >
    <div className="dot-field absolute inset-0 -z-10 opacity-60" aria-hidden />

    <div className="shell">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* ---------- Sticky narrative column ---------- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="inline-flex items-center gap-2.5">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
                <span className="eyebrow">Innovation at the core</span>
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="about-heading"
                className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[2.75rem]"
              >
                A team you&apos;d hire{" "}
                <span className="text-gradient">if you could</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-slate-gray md:text-lg">
                We&apos;re engineers, architects, and problem solvers who care
                more about whether your system survives contact with reality
                than about billable hours. Government, enterprise, or scale-up —
                the standard doesn&apos;t change.
              </p>
            </Reveal>

            {/* Stats */}
            <RevealGroup className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line/60">
              {stats.map((stat) => (
                <RevealItem
                  key={stat.label}
                  className="bg-background/70 px-5 py-6 backdrop-blur-xl"
                >
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-display text-3xl font-extrabold tracking-tight text-accent md:text-4xl"
                  />
                  <p className="mt-1.5 text-xs uppercase tracking-[0.13em] text-slate-gray">
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2}>
              <Link
                href="/#contact"
                className="btn btn-primary group mt-10 px-7 py-4"
              >
                Start your journey
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ---------- Pillars + values ---------- */}
        <div className="lg:col-span-7">
          <RevealGroup className="grid gap-5">
            {pillars.map((pillar) => (
              <RevealItem key={pillar.title}>
                <PillarCard {...pillar} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-14">
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              The principles behind the work
            </h3>
            <p className="mt-2 text-sm text-slate-gray">
              Six commitments we hold on every engagement.
            </p>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 sm:grid-cols-2">
            {values.map((value) => (
              <RevealItem key={value.title}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  className="group flex h-full gap-4 bg-background/70 p-5 backdrop-blur-xl transition-colors duration-300 hover:bg-surface-hover"
                >
                  <value.icon
                    className="size-5 shrink-0 text-accent transition-transform duration-400 group-hover:scale-110"
                    aria-hidden
                  />
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight">
                      {value.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-gray">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </div>
  </section>
);
