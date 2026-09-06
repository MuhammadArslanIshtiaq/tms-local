"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, MousePointerClick, Sparkles } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { useSpotlight } from "@/hooks/useSpotlight";

const ROTATING_TERMS = [
  "software development",
  "cloud architecture",
  "data analytics",
  "mobile platforms",
  "cybersecurity",
  "digital transformation",
] as const;

const ROTATE_INTERVAL_MS = 2600;
const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = ["Digital", "solutions,", "crafted", "to", "perfection"];

const trustPoints = [
  { value: "200+", label: "Projects shipped" },
  { value: "10+", label: "Years in market" },
  { value: "99.9%", label: "Uptime delivered" },
];

export const Hero = () => {
  const [termIndex, setTermIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { ref: spotlightRef, onMouseMove } = useSpotlight<HTMLDivElement>();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setTermIndex((prev) => (prev + 1) % ROTATING_TERMS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* ---------- Ambient background ---------- */}
      <div
        ref={spotlightRef}
        onMouseMove={onMouseMove}
        className="spotlight-parent grain absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="aurora">
          <span />
          <span />
          <span />
        </div>
        <div className="grid-field" />
        <div className="spotlight-field" />
        {/* Vignette + horizon glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_120%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="shell relative z-10 pb-24 pt-36 sm:pt-40"
      >
        <div className="flex flex-col items-center text-center">
          {/* Availability badge */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-slate-gray backdrop-blur-xl transition-colors hover:border-accent/50 hover:text-foreground sm:text-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Accepting new engagements for Q3
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </motion.a>

          {/* Headline */}
          <h1 className="mt-8 max-w-5xl text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            {HEADLINE.map((word, i) => (
              <Fragment key={word}>
                <motion.span
                  initial={{ opacity: 0, y: 34, filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.85,
                    delay: 0.12 + i * 0.08,
                    ease: EASE,
                  }}
                  className={`inline-block ${i >= 2 ? "text-gradient" : ""}`}
                >
                  {word}
                </motion.span>
                {i < HEADLINE.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>

          {/* Rotating specialty */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-sm text-slate-gray sm:text-base"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 text-accent" aria-hidden />
              Specialists in
            </span>
            <span className="relative inline-flex h-8 items-center overflow-hidden rounded-lg border border-accent/25 bg-accent/10 px-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={ROTATING_TERMS[termIndex]}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.42, ease: EASE }}
                  className="whitespace-nowrap font-semibold text-accent"
                >
                  {ROTATING_TERMS[termIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-slate-gray sm:text-lg md:text-xl"
          >
            We design, build, and run mission-critical systems for government,
            enterprise, and scale-up teams — engineered for security, built to
            scale, delivered on time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: EASE }}
            className="mt-11 flex w-full flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center"
          >
            <Magnetic className="inline-flex">
              <Link
                href="/#contact"
                className="btn btn-primary group w-full px-8 py-4 text-base sm:w-auto"
              >
                Start a project
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Magnetic>
            <Magnetic className="inline-flex">
              <Link
                href="/#services"
                className="btn btn-ghost w-full px-8 py-4 text-base sm:w-auto"
              >
                <MousePointerClick className="size-4" aria-hidden />
                Explore services
              </Link>
            </Magnetic>
          </motion.div>

          {/* Trust strip */}
          <motion.dl
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line/60"
          >
            {trustPoints.map((point) => (
              <div
                key={point.label}
                className="flex flex-col-reverse items-center gap-1 bg-background/60 px-3 py-5 backdrop-blur-xl"
              >
                <dt className="text-center text-[0.7rem] uppercase tracking-[0.14em] text-slate-gray sm:text-xs">
                  {point.label}
                </dt>
                <dd className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {point.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* ---------- Scroll cue ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center md:flex"
        aria-hidden
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-line p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block size-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};
