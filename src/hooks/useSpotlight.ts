"use client";

import { useCallback, useRef } from "react";

/**
 * Tracks the pointer within an element and exposes its position as the CSS
 * custom properties `--mx` / `--my`, which the `.spotlight-field` and card
 * glow styles consume.
 */
export const useSpotlight = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const frame = useRef<number | null>(null);

  const onMouseMove = useCallback((event: React.MouseEvent<T>) => {
    const node = ref.current;
    if (!node) return;

    const { clientX, clientY } = event;
    if (frame.current !== null) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--mx", `${clientX - rect.left}px`);
      node.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  return { ref, onMouseMove };
};
