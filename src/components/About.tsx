"use client";

import { motion } from "framer-motion";
import { Target, Eye, Handshake, Sparkles, Award, Users, Zap, Shield, Scale } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const aboutContent = {
  intro:
    "We're a dynamic team of technology enthusiasts, problem solvers, and digital innovators dedicated to transforming businesses through cutting-edge IT solutions.",
  pillars: [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading IT services partner for organizations seeking digital transformation and technological excellence.",
    },
    {
      icon: Handshake,
      title: "Our Promise",
      description:
        "To deliver exceptional value through personalized solutions, expert guidance, and unwavering commitment to your success.",
    },
  ],
  stats: [
    { value: "10+", label: "Years Experience" },
    { value: "100+", label: "Projects Completed" },
    { value: "15+", label: "Team Experts" },
    { value: "75+", label: "Businesses Helped" },
  ],
  values: [
    { icon: Sparkles, title: "Innovation", description: "We push boundaries to deliver cutting-edge solutions that keep you ahead." },
    { icon: Award, title: "Excellence", description: "Every project is crafted with meticulous attention to detail." },
    { icon: Users, title: "Collaboration", description: "We work closely with clients, ensuring your vision becomes reality." },
    { icon: Zap, title: "Growth", description: "Solutions designed to scale with your long-term success." },
    { icon: Shield, title: "Security", description: "Robust protection for your data and systems." },
    { icon: Scale, title: "Integrity", description: "Transparency, honesty, and ethical practices that build trust." },
  ],
};

export const About = () => {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16"
      aria-labelledby="about-heading"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
      >
        <motion.p
          variants={fadeInUp}
          className="text-sm font-medium uppercase tracking-[0.2em] text-electric-blue"
        >
          Innovation at the Core
        </motion.p>
        <motion.h2
          id="about-heading"
          variants={fadeInUp}
          className="mt-2 text-3xl font-bold tracking-tight md:text-4xl"
        >
          About TechSolve
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-3xl text-slate-gray md:text-lg"
        >
          {aboutContent.intro}
        </motion.p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {aboutContent.pillars.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="rounded-xl border border-slate-gray/20 bg-charcoal/40 p-6 transition-colors hover:border-electric-blue/50"
            >
              <item.icon className="size-10 text-electric-blue" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-gray">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {aboutContent.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col rounded-xl border border-slate-gray/20 bg-charcoal/40 p-5 text-center"
            >
              <span className="text-2xl font-bold text-electric-blue md:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-slate-gray">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.h3 variants={fadeInUp} className="mt-20 text-xl font-semibold">
          Our Values
        </motion.h3>
        <motion.p variants={fadeInUp} className="mt-2 text-slate-gray">
          The principles that guide everything we do
        </motion.p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutContent.values.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              className="flex gap-4 rounded-xl border border-slate-gray/20 bg-charcoal/40 p-5 transition-colors hover:border-electric-blue/40"
            >
              <value.icon className="size-8 shrink-0 text-electric-blue" aria-hidden />
              <div>
                <h4 className="font-semibold">{value.title}</h4>
                <p className="mt-1 text-sm text-slate-gray">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-16 text-center">
          <a
            href="#contact"
            className="hero-primary-btn inline-flex items-center gap-2 rounded-xl bg-electric-blue px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-charcoal"
          >
            Start Your Journey
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
