"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { DollarSign, Zap, ThumbsUp } from "lucide-react";

const stats = [
  {
    label: "Cost Reduction",
    value: "40%",
    icon: DollarSign,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    label: "Faster Deployment",
    value: "2x",
    icon: Zap,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    label: "Client Satisfaction",
    value: "98%",
    icon: ThumbsUp,
    className: "md:col-span-1 md:row-span-1",
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
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: Client Results Bento */}
        <div>
          <h2
            id="client-results-heading"
            className="mb-6 text-2xl font-bold tracking-tight md:text-3xl"
          >
            Client Results
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 [grid-template-rows:auto_auto]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`flex flex-col rounded-xl border border-slate-gray/30 bg-gradient-to-br from-charcoal/90 to-charcoal/70 p-5 transition-colors duration-300 hover:border-electric-blue ${stat.className}`}
              >
                <stat.icon
                  className="size-8 text-electric-blue"
                  aria-hidden
                />
                <span className="mt-4 text-2xl font-bold text-electric-blue md:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-slate-gray">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: FAQ Accordion */}
        <div>
          <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border-b border-slate-gray/30 last:border-b-0"
              >
                <AccordionTrigger className="group flex w-full items-center justify-between py-5 text-left text-base font-medium text-foreground transition-colors hover:text-electric-blue [&[data-state=open]]:text-electric-blue">
                  {item.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-gray/20 text-slate-gray transition-all duration-300 group-hover:bg-electric-blue/20 group-hover:text-electric-blue [&[data-state=open]]:rotate-180 [&[data-state=open]]:bg-electric-blue/20 [&[data-state=open]]:text-electric-blue">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="rotate-0 transition-transform duration-300"
                      aria-hidden
                    >
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="accordion-content overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="pb-5 pr-12 text-slate-gray">
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
