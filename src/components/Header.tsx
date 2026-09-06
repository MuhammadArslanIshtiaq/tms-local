"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { CONTACT_EMAIL } from "@/lib/contact";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#case-studies", label: "Work", id: "case-studies" },
  { href: "/#process", label: "Process", id: "process" },
  { href: "/#about", label: "About", id: "about" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  /* Highlight the nav item for whichever section owns the viewport. */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Lock body scroll while the mobile sheet is open. */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4"
        role="banner"
      >
        <nav
          aria-label="Main navigation"
          className={`mx-auto flex items-center justify-between gap-4 rounded-2xl px-4 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "max-w-5xl border border-line bg-background/70 py-2.5 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150"
              : "max-w-6xl border border-transparent bg-transparent py-3.5"
          }`}
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="TMS DigitalHub — home"
          >
            <Logo className="size-9 transition-transform duration-500 group-hover:scale-105 sm:size-10" priority />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.95rem] font-bold tracking-tight sm:text-base">
                TMS<span className="text-accent">.</span>DigitalHub
              </span>
              <span className="mt-1 hidden text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-gray sm:block">
                Digital Engineering
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-slate-gray hover:text-foreground"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-lg border border-line bg-surface"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            <Link
              href="/#contact"
              className="btn btn-primary hidden px-4 py-2.5 text-sm md:inline-flex"
            >
              Start a project
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-foreground transition-colors hover:border-accent/50 md:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <MobileMenu onClose={closeMenu} activeId={active} />
        ) : null}
      </AnimatePresence>
    </>
  );
};

/* -------------------------------------------------------------------------- */

const MobileMenu = ({
  onClose,
  activeId,
}: {
  onClose: () => void;
  activeId: string | null;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl md:hidden"
    role="dialog"
    aria-modal="true"
    aria-label="Site menu"
  >
    <div className="aurora opacity-60" aria-hidden>
      <span />
      <span />
      <span />
    </div>

    <div className="relative flex h-full flex-col px-6 pb-10 pt-5">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-foreground"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile navigation">
        {[...navLinks, { href: "/#contact", label: "Contact", id: "contact" }].map(
          (link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 + i * 0.06, duration: 0.5, ease: EASE }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={`group flex items-center justify-between border-b border-line py-5 font-display text-3xl font-semibold tracking-tight transition-colors ${
                  activeId === link.id ? "text-accent" : "hover:text-accent"
                }`}
              >
                {link.label}
                <ArrowUpRight
                  className="size-6 text-slate-gray transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                  aria-hidden
                />
              </Link>
            </motion.div>
          )
        )}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
        className="mt-auto"
      >
        <Link
          href="/#contact"
          onClick={onClose}
          className="btn btn-primary w-full px-6 py-4"
        >
          Start a project
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-4 block text-center text-sm text-slate-gray"
        >
          {CONTACT_EMAIL}
        </a>
      </motion.div>
    </div>
  </motion.div>
);

/* -------------------------------------------------------------------------- */

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
      className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface text-foreground transition-colors hover:border-accent/50 hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -35 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 35 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="size-[1.05rem]" aria-hidden />
          ) : (
            <Sun className="size-[1.05rem]" aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
