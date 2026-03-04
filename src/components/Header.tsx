"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-gray/20 bg-background/70 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="text-xl font-semibold text-foreground transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-background"
          aria-label="TechSolve home"
        >
          <span className="text-foreground">TechSolve</span>
        </a>

        <div className="flex items-center gap-6 sm:gap-8">
          <ul className="hidden items-center gap-6 sm:flex sm:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-slate-gray transition-colors hover:text-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-background"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </nav>
    </header>
  );
};

type ThemeToggleProps = {
  theme: "dark" | "light";
  onToggle: () => void;
};

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-16 shrink-0 items-center rounded-full border border-slate-gray/30 bg-slate-gray/10 p-1 transition-colors hover:border-slate-gray/50 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-background"
    >
      <motion.div
        className="absolute left-1 flex h-7 w-7 items-center justify-center rounded-full bg-electric-blue text-white shadow-sm"
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
        animate={{
          x: isDark ? 0 : 28,
        }}
      >
        {isDark ? (
          <Moon className="size-3.5" aria-hidden />
        ) : (
          <Sun className="size-3.5" aria-hidden />
        )}
      </motion.div>
    </button>
  );
};
