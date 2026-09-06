import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { services } from "@/data/services";
import { CONTACT_EMAIL } from "@/lib/contact";
import { Logo } from "./Logo";

const columns = [
  {
    heading: "Company",
    links: [
      { href: "/#services", label: "Services" },
      { href: "/#case-studies", label: "Case studies" },
      { href: "/#process", label: "Process" },
      { href: "/#about", label: "About" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms-of-service", label: "Terms of service" },
    ],
  },
];

export const Footer = () => (
  <footer
    role="contentinfo"
    className="relative overflow-hidden border-t border-line bg-charcoal/40"
  >
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_70%)]"
        aria-hidden
      />

      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="TMS DigitalHub — home"
            >
              <Logo className="size-10" />
              <span className="font-display text-base font-bold tracking-tight">
                TMS<span className="text-accent">.</span>DigitalHub
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-gray">
              Custom software, cloud architecture, and IT infrastructure for
              government, enterprise, and scale-up teams. Engineered for
              security, built to scale.
            </p>

            <div className="mt-7 space-y-3 text-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-2.5 text-slate-gray transition-colors hover:text-accent"
              >
                <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                {CONTACT_EMAIL}
                <ArrowUpRight
                  className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden
                />
              </a>
              <p className="flex items-start gap-2.5 text-slate-gray">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                1001 S Main St STE 500, Kalispell MT 59901, USA
              </p>
            </div>
          </div>

          {/* Services */}
          <nav className="md:col-span-4" aria-label="Services">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Services
            </h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {services.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-slate-gray transition-colors hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-3">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                  {column.heading}
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-gray transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="divider-x mt-14" />

        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-sm text-slate-gray">
            © {new Date().getFullYear()} TMS DigitalHub. All rights reserved.
          </p>
          <p className="text-sm text-slate-gray">
            Built with care in Montana &amp; worldwide.
          </p>
        </div>
      </div>

      {/* Oversized brand wordmark */}
      <div
        className="pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <p className="translate-y-[22%] whitespace-nowrap text-center font-display text-[18vw] font-extrabold leading-none tracking-tighter text-foreground/[0.045]">
          TMS DIGITALHUB
        </p>
      </div>
    </footer>
);
