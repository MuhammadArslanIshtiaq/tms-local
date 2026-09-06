"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
};

export const Field = ({ id, label, error, optional, children }: FieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="mb-2 flex items-center justify-between text-sm font-medium text-foreground"
    >
      {label}
      {optional ? (
        <span className="text-xs font-normal text-slate-gray">Optional</span>
      ) : null}
    </label>

    {children}

    <AnimatePresence initial={false}>
      {error ? (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22 }}
          className="flex items-center gap-1.5 overflow-hidden pt-2 text-xs text-red-400"
          role="alert"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </motion.p>
      ) : null}
    </AnimatePresence>
  </div>
);
