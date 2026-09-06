"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "./SectionHeading";
import { useSpotlight } from "@/hooks/useSpotlight";
import { staggerChild, staggerParent } from "./Reveal";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  slug: string;
  featured?: boolean;
};

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  slug,
  featured = false,
}: ServiceCardProps) => {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      variants={staggerChild}
      className={featured ? "sm:col-span-2" : undefined}
    >
      <Link
        href={`/services/${slug}`}
        className="group block h-full rounded-[1.25rem]"
        aria-label={`${title} — view service details`}
      >
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="card halo spotlight-parent relative flex h-full flex-col overflow-hidden p-6 sm:p-7"
        >
          <div className="spotlight-field" aria-hidden />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-accent/5 text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_28px_-6px_var(--glow)]">
              <Icon className="size-6" aria-hidden />
            </span>
            <ArrowUpRight
              className="size-5 shrink-0 translate-y-1 text-slate-gray opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:text-accent group-hover:opacity-100"
              aria-hidden
            />
          </div>

          <h3
            className={`relative z-10 mt-6 font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-accent ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {title}
          </h3>
          <p
            className={`relative z-10 mt-3 text-sm leading-relaxed text-slate-gray ${
              featured ? "max-w-xl sm:text-base" : ""
            }`}
          >
            {description}
          </p>

          <span className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            Learn more
            <ArrowUpRight className="size-3.5" aria-hidden />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export const Services = () => (
  <section
    id="services"
    aria-labelledby="services-heading"
    className="relative overflow-hidden py-24 md:py-32"
  >
    <div className="dot-field absolute inset-0 -z-10 opacity-70" aria-hidden />

    <div className="shell">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title={
            <>
              End-to-end capability,{" "}
              <span className="text-gradient">one accountable partner</span>
            </>
          }
          description="From first architecture sketch to 24/7 production support — every discipline you need to ship and run serious software."
        />
      </div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.slug}
            icon={service.icon}
            title={service.title}
            description={service.shortDescription}
            slug={service.slug}
            featured={index === 0}
          />
        ))}
      </motion.div>
    </div>
  </section>
);
