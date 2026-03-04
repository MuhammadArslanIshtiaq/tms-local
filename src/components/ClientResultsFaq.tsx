"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { motion, useInView, animate } from "framer-motion";
import { type LucideIcon, DollarSign, Zap, ThumbsUp, Headphones } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const statIcons: LucideIcon[] = [DollarSign, Zap, ThumbsUp, Headphones];

const stats = [
  { value: 40, suffix: "%", label: "Cost Reduction", decimals: 0 },
  { value: 2, suffix: "x", label: "Faster Deployment", decimals: 0 },
  { value: 98, suffix: "%", label: "Client Satisfaction", decimals: 0 },
  { value: 24, suffix: "/7", label: "Support", decimals: 0 },
];

const StatCard = ({
  value,
  suffix,
  label,
  decimals = 0,
  icon: Icon,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
  icon: LucideIcon;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
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
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="group flex items-center gap-4 rounded-xl border border-slate-gray/20 bg-charcoal/50 p-4 transition-colors hover:border-electric-blue/50 sm:p-5"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-electric-blue/10 text-electric-blue transition-colors group-hover:bg-electric-blue/20">
        <Icon className="size-6" aria-hidden />
      </div>
      <div className="min-w-0">
        <span className="block text-2xl font-bold text-electric-blue sm:text-3xl">
          {formatted}
          {suffix}
        </span>
        <span className="block text-sm text-slate-gray">{label}</span>
      </div>
    </motion.div>
  );
};

const faqItems = [
  {
    question: "How do you handle data security?",
    answer:
      "We implement a zero-trust security model with end-to-end encryption, regular penetration testing, and compliance with SOC 2, ISO 27001, and GDPR. All data is encrypted at rest and in transit, with role-based access controls and comprehensive audit logging.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on scope, but most engagements range from 8–16 weeks for standard implementations. We use an agile methodology with 2-week sprints, allowing for iterative delivery and early value. A detailed timeline is provided after our initial discovery phase.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. We offer tiered support packages including bug fixes, performance monitoring, and feature enhancements. All projects include a 30-day warranty period. Extended support contracts are available for ongoing maintenance, updates, and 24/7 incident response.",
  },
];

export const ClientResultsFaq = () => {
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16"
      aria-labelledby="client-results-heading"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left: Client Results */}
        <div>
          <h2
            id="client-results-heading"
            className="mb-2 text-2xl font-bold tracking-tight md:text-3xl"
          >
            Client Results
          </h2>
          <p className="mb-8 text-slate-gray">
            Proven outcomes that speak for themselves
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                decimals={stat.decimals}
                icon={statIcons[i]}
              />
            ))}
          </div>
        </div>

        {/* Right: FAQ Accordion */}
        <div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mb-8 text-slate-gray">
            Quick answers to common questions
          </p>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border-b border-slate-gray/20 last:border-b-0"
              >
                <AccordionTrigger className="group flex w-full items-center justify-between py-4 text-left text-base font-medium text-foreground transition-colors hover:text-electric-blue [&[data-state=open]]:text-electric-blue">
                  {item.question}
                  <span className="ml-2 flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-gray/15 text-slate-gray transition-all duration-200 group-hover:bg-electric-blue/15 group-hover:text-electric-blue [&[data-state=open]]:rotate-180 [&[data-state=open]]:bg-electric-blue/15 [&[data-state=open]]:text-electric-blue">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" />
                    </svg>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="accordion-content overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="pb-4 pr-10 text-sm leading-relaxed text-slate-gray">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
