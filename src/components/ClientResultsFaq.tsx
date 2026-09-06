"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  DollarSign,
  Headphones,
  Plus,
  ThumbsUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CountUp } from "./CountUp";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { useSpotlight } from "@/hooks/useSpotlight";

type Result = {
  value: number;
  suffix: string;
  label: string;
  caption: string;
  icon: LucideIcon;
};

const results: Result[] = [
  {
    value: 40,
    suffix: "%",
    label: "Cost reduction",
    caption: "Average infrastructure saving post-migration",
    icon: DollarSign,
  },
  {
    value: 2,
    suffix: "×",
    label: "Faster deployment",
    caption: "Release frequency after CI/CD rollout",
    icon: Zap,
  },
  {
    value: 98,
    suffix: "%",
    label: "Client satisfaction",
    caption: "Post-engagement survey score",
    icon: ThumbsUp,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support coverage",
    caption: "SLA-backed incident response",
    icon: Headphones,
  },
];

const faqItems = [
  {
    question: "How do you handle data security?",
    answer:
      "We implement a zero-trust security model with end-to-end encryption, regular penetration testing, and compliance with SOC 2, ISO 27001, and GDPR. All data is encrypted at rest and in transit, with role-based access controls and comprehensive audit logging.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Timelines vary with scope, but most engagements run 8–16 weeks. We work in two-week sprints so you get working software continuously rather than at a single hand-off. A detailed, costed timeline follows the discovery phase.",
  },
  {
    question: "Who owns the code you write?",
    answer:
      "You do — completely. All intellectual property, source code, infrastructure definitions, and documentation transfer to you. There are no proprietary runtimes or licences that lock you into working with us afterwards.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. Every project includes a 30-day warranty. Beyond that we offer tiered support covering bug fixes, performance monitoring, feature work, and 24/7 incident response, scaled to your risk profile.",
  },
  {
    question: "Can you work with our existing in-house team?",
    answer:
      "That's often the best outcome. Our engineers embed into your standups, code reviews, and tooling, and we build in knowledge transfer from day one so your team can run the system confidently once we step back.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Discovery is a fixed fee. From there we offer either fixed-scope pricing for well-defined deliverables or a monthly retainer for ongoing product work. No hidden change-request fees — scope changes are agreed and priced before work starts.",
  },
];

const ResultCard = ({ result }: { result: Result }) => {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  const Icon = result.icon;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="card spotlight-parent group relative overflow-hidden p-5 sm:p-6"
    >
      <div className="spotlight-field" aria-hidden />
      <div className="relative z-10">
        <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-transparent text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_26px_-8px_var(--glow)]">
          <Icon className="size-5" aria-hidden />
        </span>
        <CountUp
          value={result.value}
          suffix={result.suffix}
          className="mt-5 block font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
        />
        <p className="mt-1 text-sm font-semibold text-accent">{result.label}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-gray">
          {result.caption}
        </p>
      </div>
    </div>
  );
};

export const ClientResultsFaq = () => (
  <section
    aria-labelledby="results-heading"
    className="relative overflow-hidden py-24 md:py-32"
  >
    <div className="shell">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* ---------- Results ---------- */}
        <div>
          <Reveal>
            <span className="eyebrow">Outcomes</span>
            <h2
              id="results-heading"
              className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl"
            >
              Numbers our clients{" "}
              <span className="text-gradient">actually report</span>
            </h2>
            <p className="mt-4 text-slate-gray">
              Aggregated across engagements delivered in the last 24 months.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {results.map((result) => (
              <RevealItem key={result.label}>
                <ResultCard result={result} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* ---------- FAQ ---------- */}
        <div>
          <Reveal>
            <span className="eyebrow">Answers</span>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-slate-gray">
              Still unsure about something?{" "}
              <Link href="/#contact" className="link-underline text-foreground">
                Ask us directly
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${index}`}
                  className="group border-b border-line"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-foreground transition-colors duration-300 hover:text-accent data-[state=open]:text-accent">
                    <span>{item.question}</span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-slate-gray transition-all duration-300 group-hover:border-accent/40 group-hover:text-accent group-data-[state=open]:rotate-45 group-data-[state=open]:border-accent/40 group-data-[state=open]:bg-accent/10 group-data-[state=open]:text-accent">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <motion.p className="pb-5 pr-12 text-sm leading-relaxed text-slate-gray">
                      {item.answer}
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
