"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  blur?: boolean;
  as?: ElementType;
  once?: boolean;
};

/**
 * Scroll-triggered entrance animation with an optional blur-in.
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  blur = true,
  as = "div",
  once = true,
}: RevealProps) => {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const { x, y } = offsets[direction];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
};

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
};

/** Container that reveals its `RevealItem` children in sequence. */
export const RevealGroup = ({
  children,
  className,
  once = true,
}: StaggerProps) => (
  <motion.div
    className={className}
    variants={staggerParent}
    initial="hidden"
    whileInView="show"
    viewport={{ once, margin: "-70px" }}
  >
    {children}
  </motion.div>
);

export const RevealItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div className={className} variants={staggerChild}>
    {children}
  </motion.div>
);
