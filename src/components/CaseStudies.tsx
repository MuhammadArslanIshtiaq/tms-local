"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useSpotlight } from "@/hooks/useSpotlight";
import { staggerChild, staggerParent } from "./Reveal";

/**
 * Placeholder portfolio entries — swap in real engagements and links.
 */
type CaseStudy = {
  sector: string;
  title: string;
  summary: string;
  metric: { value: string; label: string };
  stack: string[];
  tint: string;
  span: string;
};

const caseStudies: CaseStudy[] = [
  {
    sector: "Financial services",
    title: "Core banking platform modernisation",
    summary:
      "Decomposed a 15-year-old monolith into event-driven services, cutting release cycles from quarterly to daily without a single customer-facing outage.",
    metric: { value: "−63%", label: "infrastructure spend" },
    stack: ["Kubernetes", "Go", "PostgreSQL", "Kafka"],
    tint: "from-sky-500/25 via-blue-600/10 to-transparent",
    span: "lg:col-span-7",
  },
  {
    sector: "Healthcare",
    title: "Clinical data pipeline",
    summary:
      "A HIPAA-compliant ingestion layer unifying twelve hospital systems into one queryable record.",
    metric: { value: "4.2M", label: "records/day processed" },
    stack: ["Python", "Airflow", "AWS"],
    tint: "from-emerald-500/25 via-teal-600/10 to-transparent",
    span: "lg:col-span-5",
  },
  {
    sector: "Public sector",
    title: "Citizen services portal",
    summary:
      "An accessible, WCAG 2.2 AA permit and licensing portal serving a state-wide population.",
    metric: { value: "98%", label: "task completion rate" },
    stack: ["Next.js", "Azure", ".NET"],
    tint: "from-violet-500/25 via-indigo-600/10 to-transparent",
    span: "lg:col-span-5",
  },
  {
    sector: "Retail & commerce",
    title: "Peak-season scalability overhaul",
    summary:
      "Re-architected checkout and inventory for elastic scale, absorbing a 9× Black Friday traffic spike on the same budget.",
    metric: { value: "9×", label: "peak traffic absorbed" },
    stack: ["TypeScript", "Terraform", "Redis", "GCP"],
    tint: "from-amber-500/25 via-orange-600/10 to-transparent",
    span: "lg:col-span-7",
  },
];

const CaseCard = ({ study }: { study: CaseStudy }) => {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <motion.article variants={staggerChild} className={study.span}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="card halo spotlight-parent group relative flex h-full flex-col overflow-hidden"
      >
        <div className="spotlight-field z-10" aria-hidden />

        {/* Cover */}
        <div
          className={`relative h-44 w-full overflow-hidden bg-gradient-to-br ${study.tint} sm:h-52`}
        >
          <div className="dot-field absolute inset-0 opacity-60" aria-hidden />
          <motion.div
            className="absolute -left-8 -top-8 size-44 rounded-full bg-white/10 blur-2xl"
            animate={{ x: [0, 26, 0], y: [0, 18, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          <span className="absolute left-5 top-5 rounded-full border border-line bg-background/60 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-slate-gray backdrop-blur-md">
            {study.sector}
          </span>

          <div className="absolute bottom-5 left-5">
            <p className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {study.metric.value}
            </p>
            <p className="mt-0.5 text-xs text-slate-gray">{study.metric.label}</p>
          </div>

          <span className="absolute bottom-5 right-5 flex size-10 items-center justify-center rounded-full border border-line bg-background/60 text-slate-gray backdrop-blur-md transition-all duration-400 group-hover:border-accent/50 group-hover:text-accent">
            <ArrowUpRight
              className="size-4 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>

        {/* Body */}
        <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-xl">
            {study.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-gray">
            {study.summary}
          </p>

          <ul className="mt-auto flex flex-wrap gap-2 pt-6">
            {study.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[0.7rem] text-slate-gray"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
};

export const CaseStudies = () => (
  <section
    id="case-studies"
    aria-labelledby="case-studies-heading"
    className="relative overflow-hidden border-y border-line py-24 md:py-32"
  >
    <div
      className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_70%)]"
      aria-hidden
    />

    <div className="shell">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="case-studies-heading"
          eyebrow="Selected work"
          title={
            <>
              Systems in production,{" "}
              <span className="text-gradient">not slide decks</span>
            </>
          }
          description="A sample of the platforms we've delivered across regulated, high-traffic environments."
        />
        <Link
          href="/#contact"
          className="btn btn-ghost shrink-0 px-6 py-3.5 text-sm"
        >
          Discuss your project
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-5 lg:grid-cols-12"
      >
        {caseStudies.map((study) => (
          <CaseCard key={study.title} study={study} />
        ))}
      </motion.div>
    </div>
  </section>
);
