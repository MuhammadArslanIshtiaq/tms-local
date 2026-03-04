"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const footerLinks = {
  services: [
    { href: "#services", label: "Services" },
    { href: "#case-studies", label: "Case Studies" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
};

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className="border-t border-slate-gray/20 bg-charcoal/60"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm"
          >
            <Image
              src={theme === "dark" ? "/tms-logo-dark.png" : "/tms-logo.png"}
              alt="TMS DigitalHub"
              width={120}
              height={120}
              className="h-24 w-auto"
            />
            <h3 className="mt-4 text-lg font-semibold">TMS DigitalHub</h3>
            <p className="mt-2 text-sm text-slate-gray">
              Leading IT services company delivering custom digital solutions
              for government, semi-government, and enterprise clients.
            </p>
          </motion.div>
          <div className="flex gap-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-gray transition-colors hover:text-electric-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Legal
              </h4>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-gray transition-colors hover:text-electric-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-slate-gray/20 pt-8 text-center text-sm text-slate-gray"
        >
          © {new Date().getFullYear()} TMS DigitalHub. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};
