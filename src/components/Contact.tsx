"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Field } from "./Field";
import { Reveal } from "./Reveal";
import {
  CONTACT_EMAIL,
  submitContact,
  validateContact,
  type FieldErrors,
} from "@/lib/contact";

const EMPTY = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

const serviceOptions = [
  { value: "request-service", label: "Request a service" },
  { value: "hire-talent", label: "Hire talent" },
  { value: "consultation", label: "Free consultation" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Something else" },
];

const details = [
  {
    icon: Mail,
    title: CONTACT_EMAIL,
    caption: "Write to us any time",
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: MapPin,
    title: "Kalispell, Montana",
    caption: "1001 S Main St STE 500, MT 59901 — serving clients worldwide",
  },
  {
    icon: Clock,
    title: "Replies within 1–2 business days",
    caption: "Every enquiry is read by an engineer, not a bot",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

export const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContact(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const selected = serviceOptions.find((o) => o.value === form.service);
      await submitContact({ ...form, service: selected?.label });
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div className="aurora opacity-50" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="shell relative z-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---------- Pitch ---------- */}
          <div>
            <Reveal>
              <span className="eyebrow">Get in touch</span>
              <h2
                id="contact-heading"
                className="mt-4 text-3xl font-bold leading-[1.06] tracking-tight sm:text-4xl md:text-5xl"
              >
                Ready to build{" "}
                <span className="text-gradient">something great?</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-gray md:text-lg">
                Tell us what you&apos;re trying to build or fix. We&apos;ll come
                back with a straight answer on scope, timeline, and whether
                we&apos;re the right team for it.
              </p>
            </Reveal>

            <div className="mt-12 space-y-3">
              {details.map((detail, i) => {
                const Icon = detail.icon;
                const content = (
                  <div className="card group flex items-start gap-4 p-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-transparent text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_26px_-8px_var(--glow)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground transition-colors group-hover:text-accent">
                        {detail.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-gray">
                        {detail.caption}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <Reveal key={detail.title} delay={i * 0.08}>
                    {detail.href ? (
                      <a href={detail.href} className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* ---------- Form ---------- */}
          <Reveal direction="left" delay={0.1}>
            <div className="card relative overflow-hidden p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                        delay: 0.1,
                      }}
                      className="flex size-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent"
                    >
                      <CheckCircle2 className="size-8" aria-hidden />
                    </motion.span>
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                      Message on its way
                    </h3>
                    <p className="mt-3 max-w-sm text-slate-gray">
                      Thanks for reaching out. We&apos;ll reply within 1–2
                      business days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="btn btn-ghost mt-8 px-6 py-3 text-sm"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="name" label="Your name" error={errors.name}>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          className="field"
                          placeholder="Jane Doe"
                          aria-invalid={Boolean(errors.name)}
                        />
                      </Field>

                      <Field id="email" label="Work email" error={errors.email}>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          className="field"
                          placeholder="jane@company.com"
                          aria-invalid={Boolean(errors.email)}
                        />
                      </Field>
                    </div>

                    <Field id="company" label="Company" optional>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={handleChange}
                        className="field"
                        placeholder="Acme Corp"
                      />
                    </Field>

                    <Field id="service" label="What can we help with?">
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="field"
                      >
                        <option value="">Select an option</option>
                        {serviceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field id="message" label="Your message" error={errors.message}>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="field resize-none"
                        placeholder="A little about the project, the problem, and your timeline…"
                        aria-invalid={Boolean(errors.message)}
                      />
                    </Field>

                    {status === "error" ? (
                      <p
                        role="alert"
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                      >
                        Something went wrong sending your message. Please email
                        us directly at{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn btn-primary group w-full px-6 py-4 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" aria-hidden />
                          Send message
                          <ArrowRight
                            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden
                          />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-gray">
                      We&apos;ll never share your details. Read our{" "}
                      <Link href="/privacy-policy" className="link-underline">
                        privacy policy
                      </Link>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
