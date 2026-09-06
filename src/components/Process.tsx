"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Compass, PenTool, Blocks, Rocket, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type Step = {
  id: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    id: "01",
    title: "Discovery & architecture",
    duration: "1–2 weeks",
    description:
      "We map your systems, constraints, and success metrics before writing a line of code — then propose an architecture you actually own.",
    deliverables: ["Technical audit", "Solution architecture", "Fixed-scope estimate"],
    icon: Compass,
  },
  {
    id: "02",
    title: "Design & prototype",
    duration: "2–3 weeks",
    description:
      "Clickable prototypes and a component system get stakeholder sign-off early, so nothing expensive gets discovered late.",
    deliverables: ["Interactive prototype", "Design system", "Accessibility plan"],
    icon: PenTool,
  },
  {
    id: "03",
    title: "Build & iterate",
    duration: "8–16 weeks",
    description:
      "Two-week sprints with working software at the end of every one. You see progress continuously, not at a big-bang reveal.",
    deliverables: ["Sprint demos", "CI/CD pipeline", "Automated test suite"],
    icon: Blocks,
  },
  {
    id: "04",
    title: "Launch & operate",
    duration: "Ongoing",
    description:
      "Zero-downtime rollout, then monitoring, incident response, and iteration under a support agreement that matches your risk profile.",
    deliverables: ["Runbooks & handover", "24/7 monitoring", "SLA-backed support"],
    icon: Rocket,
  },
];

const StepRow = ({ step, index }: { step: Step; index: number }) => {
  const Icon = step.icon;

  return (
    <motion.li
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-16 sm:pl-24"
    >
      {/* Node on the timeline */}
      <span className="absolute left-0 top-1 flex size-12 items-center justify-center rounded-2xl border border-line bg-background text-accent shadow-[0_0_0_6px_var(--background)] sm:size-14">
        <Icon className="size-5 sm:size-6" aria-hidden />
      </span>

      <div className="card group p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
            {step.id}
          </span>
          <span className="h-3.5 w-px bg-line-strong" aria-hidden />
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-gray">
            {step.duration}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
          {step.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-gray sm:text-base">
          {step.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {step.deliverables.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-slate-gray transition-colors duration-300 group-hover:border-accent/25 group-hover:text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
};

export const Process = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="shell">
        <SectionHeading
          id="process-heading"
          eyebrow="How we work"
          title={
            <>
              A delivery process with{" "}
              <span className="text-gradient">no black boxes</span>
            </>
          }
          description="Fixed checkpoints, visible progress, and a clear exit at every stage. You always know what you're getting and when."
          align="center"
        />

        <div ref={listRef} className="relative mx-auto mt-16 max-w-3xl">
          {/* Timeline rail */}
          <div
            className="absolute left-6 top-2 h-full w-px bg-line sm:left-7"
            aria-hidden
          >
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3"
            />
            <motion.span
              style={{ top: glowY }}
              className="absolute -left-[3px] size-[7px] -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_4px_var(--glow)]"
            />
          </div>

          <ol className="space-y-6">
            {steps.map((step, index) => (
              <StepRow key={step.id} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
