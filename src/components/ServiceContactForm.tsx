"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

type ServiceContactFormProps = {
  serviceName: string;
};

export const ServiceContactForm = ({ serviceName }: ServiceContactFormProps) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic - integrate with your backend/email service
    setIsSubmitted(true);
    setFormState({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-electric-blue/30 bg-electric-blue/10 p-8 text-center"
      >
        <p className="text-lg font-medium text-foreground">
          Thank you for your interest in {serviceName}.
        </p>
        <p className="mt-2 text-slate-gray">
          We&apos;ll get back to you within 1–2 business days.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-sm font-medium text-electric-blue transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-background"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5 rounded-xl border border-slate-gray/20 bg-charcoal/40 p-6 backdrop-blur-sm sm:p-8"
    >
      <h3 className="text-xl font-semibold">Request a Consultation</h3>
      <p className="text-sm text-slate-gray">
        Tell us about your project. We&apos;ll respond within 1–2 business days.
      </p>

      <input type="hidden" name="service" value={serviceName} readOnly />

      <div>
        <label
          htmlFor="service-name"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Your Name
        </label>
        <input
          id="service-name"
          name="name"
          type="text"
          required
          value={formState.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-gray/30 bg-charcoal/80 px-4 py-3 text-foreground placeholder:text-slate-gray focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label
          htmlFor="service-email"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Your Email
        </label>
        <input
          id="service-email"
          name="email"
          type="email"
          required
          value={formState.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-gray/30 bg-charcoal/80 px-4 py-3 text-foreground placeholder:text-slate-gray focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
          placeholder="john@company.com"
        />
      </div>
      <div>
        <label
          htmlFor="service-company"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Company (Optional)
        </label>
        <input
          id="service-company"
          name="company"
          type="text"
          value={formState.company}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-gray/30 bg-charcoal/80 px-4 py-3 text-foreground placeholder:text-slate-gray focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
          placeholder="Your Company"
        />
      </div>
      <div>
        <label
          htmlFor="service-message"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Your Message
        </label>
        <textarea
          id="service-message"
          name="message"
          rows={4}
          required
          value={formState.message}
          onChange={handleChange}
          className="w-full resize-none rounded-lg border border-slate-gray/30 bg-charcoal/80 px-4 py-3 text-foreground placeholder:text-slate-gray focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
          placeholder="Tell us about your project and how we can help..."
        />
      </div>
      <button
        type="submit"
        className="hero-primary-btn flex w-full items-center justify-center gap-2 rounded-xl bg-electric-blue px-6 py-4 font-medium text-white transition-all duration-300 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-charcoal"
      >
        <Send className="size-4" aria-hidden />
        Send Inquiry
      </button>
    </motion.form>
  );
};
