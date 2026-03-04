"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import {
  Cloud,
  Shield,
  Brain,
  Code2,
  Smartphone,
  BarChart3,
  Workflow,
} from "lucide-react";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const cardVariants = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
};

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springConfig = { damping: 25, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`radial-gradient(
    140px circle at ${mouseXSpring}% ${mouseYSpring}%,
    rgba(0, 112, 243, 0.4),
    transparent 45%
  )`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(50);
    mouseY.set(50);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="service-card relative rounded-xl border border-slate-gray/20 p-[1px] transition-colors"
      style={{ background }}
    >
      {/* Inner card content */}
      <div className="relative z-10 h-full rounded-[11px] bg-charcoal/80 p-6 backdrop-blur-sm">
        <motion.div
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="inline-flex"
        >
          <Icon
            className="size-11 text-electric-blue"
            aria-hidden
          />
        </motion.div>
        <h3 className="mt-5 text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-slate-gray">{description}</p>
      </div>
    </motion.div>
  );
};

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Applications tailored to your business needs, built with modern technologies and best practices for scalability and maintainability.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and migration services to modernize your IT environment. AWS, Azure, and GCP expertise.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description:
      "Transform your data into actionable insights with advanced analytics, BI dashboards, and machine learning pipelines.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android. React Native and Flutter for unified experiences.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets. Compliance, penetration testing, and zero-trust architecture.",
  },
  {
    icon: Workflow,
    title: "Digital Transformation",
    description:
      "End-to-end digital transformation services to modernize business processes, automate workflows, and drive innovation.",
  },
  {
    icon: Brain,
    title: "AI & ML Integration",
    description:
      "Integrate intelligent automation and machine learning into your workflows. Custom AI solutions that drive insights and efficiency.",
  },
];

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const Services = () => {
  return (
    <motion.section
      id="services"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="mx-auto max-w-6xl px-6 pt-8 pb-24 sm:px-8 md:px-12 md:pt-12 lg:px-16 lg:pt-16"
      aria-labelledby="services-heading"
    >
      <motion.h2
        variants={cardVariants}
        id="services-heading"
        className="text-3xl font-bold tracking-tight md:text-4xl"
      >
        Our Services
      </motion.h2>
      <motion.p
        variants={cardVariants}
        className="mt-2 max-w-2xl text-slate-gray md:text-lg"
      >
        Comprehensive IT solutions designed to drive your business forward with
        innovation and excellence
      </motion.p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </motion.section>
  );
};
