"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useCallback, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

const SPRING_STIFFNESS = 150;
const SPRING_DAMPING = 15;

export const Magnetic = ({
  children,
  strength = 0.2,
  className,
}: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, {
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  });
  const ySpring = useSpring(y, {
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;
      x.set(distanceX);
      y.set(distanceY);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
