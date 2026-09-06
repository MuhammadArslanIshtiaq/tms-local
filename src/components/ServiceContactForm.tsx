"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { Field } from "./Field";
import {
  CONTACT_EMAIL,
  submitContact,
  validateContact,
  type FieldErrors,
} from "@/lib/contact";

type ServiceContactFormProps = {
  serviceName: string;
};

const EMPTY = { name: "", email: "", company: "", message: "" };

type Status = "idle" | "submitting" | "success" | "error";

export const ServiceContactForm = ({ serviceName }: ServiceContactFormProps) => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      await submitContact({ ...form, service: serviceName });
      setStatus("success");
      setErrorDetail(null);
      setForm(EMPTY);
    } catch (cause) {
      setErrorDetail(cause instanceof Error ? cause.message : null);
      setStatus("error");
    }
  };

  return (
    <div className="card relative overflow-hidden p-6 sm:p-7">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center py-8 text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="flex size-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent"
            >
              <CheckCircle2 className="size-7" aria-hidden />
            </motion.span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">
              Thanks for your interest
            </h3>
            <p className="mt-2 text-sm text-slate-gray">
              We&apos;ve got your enquiry about {serviceName} and will reply
              within 1–2 business days.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="btn btn-ghost mt-6 px-5 py-2.5 text-sm"
            >
              Send another enquiry
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
            <div>
              <span className="eyebrow">Let&apos;s talk</span>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Request a consultation
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-gray">
                Tell us about your project. We&apos;ll respond within 1–2
                business days.
              </p>
            </div>

            <Field id="service-name" label="Your name" error={errors.name}>
              <input
                id="service-name"
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

            <Field id="service-email" label="Work email" error={errors.email}>
              <input
                id="service-email"
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

            <Field id="service-company" label="Company" optional>
              <input
                id="service-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={handleChange}
                className="field"
                placeholder="Acme Corp"
              />
            </Field>

            <Field id="service-message" label="Your message" error={errors.message}>
              <textarea
                id="service-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="field resize-none"
                placeholder="What are you trying to build or fix?"
                aria-invalid={Boolean(errors.message)}
              />
            </Field>

            {status === "error" ? (
              <p
                role="alert"
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {errorDetail ?? "Something went wrong."} You can also email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn btn-primary group w-full px-6 py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden />
                  Send enquiry
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
