"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Pulls its child slightly toward the cursor. Disabled for coarse pointers
 * and when the visitor prefers reduced motion.
 */
export const Magnetic = ({
  children,
  strength = 0.22,
  className,
}: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 170, damping: 16, mass: 0.35 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node || reduceMotion) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const rect = node.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [x, y, strength, reduceMotion]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={reduceMotion ? undefined : { x: xSpring, y: ySpring }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
