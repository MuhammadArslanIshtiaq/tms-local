"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = {
  email: "hr@tmsdigitalhub.com",
  office: "1001 S Main St STE 500, Kalispell MT 59901, USA",
  tagline: "Serving clients worldwide",
};

export const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic - integrate with your backend/email service
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="border-t border-slate-gray/20 bg-charcoal/40"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:px-12 md:py-32 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="contact-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Build Something Great?
          </h2>
          <p className="mt-4 text-slate-gray md:text-lg">
            Get in touch with our team to discuss your project and how we can
            help you achieve your goals.
          </p>
          <div className="mt-10 space-y-6">
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 text-slate-gray transition-colors hover:text-electric-blue"
            >
              <Mail className="size-5 shrink-0 text-electric-blue" aria-hidden />
              <div>
                <span className="block font-medium text-foreground">
                  {contactInfo.email}
                </span>
                <span className="text-sm">Send us an email anytime</span>
              </div>
            </a>
            <div className="flex items-start gap-3 text-slate-gray">
              <MapPin className="size-5 shrink-0 text-electric-blue" aria-hidden />
              <div>
                <span className="block font-medium text-foreground">Office</span>
                <span className="text-sm">{contactInfo.office}</span>
                <span className="mt-1 block text-sm">{contactInfo.tagline}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
              Your Name
            </label>
            <input
              id="name"
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
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Your Email
            </label>
            <input
              id="email"
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
            <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
              Company (Optional)
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formState.company}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-gray/30 bg-charcoal/80 px-4 py-3 text-foreground placeholder:text-slate-gray focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
              placeholder="Your Company"
            />
          </div>
          <div>
            <label htmlFor="service" className="mb-2 block text-sm font-medium text-foreground">
              What can we help you with?
            </label>
            <select
              id="service"
              name="service"
              value={formState.service}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-gray/30 bg-charcoal/80 px-4 py-3 text-foreground focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
            >
              <option value="">Select an option</option>
              <option value="request-service">Request a Service</option>
              <option value="hire-talent">Hire Talent</option>
              <option value="consultation">Free Consultation</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formState.message}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-slate-gray/30 bg-charcoal/80 px-4 py-3 text-foreground placeholder:text-slate-gray focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
              placeholder="Tell us about your project..."
            />
          </div>
          <button
            type="submit"
            className="hero-primary-btn flex w-full items-center justify-center gap-2 rounded-xl bg-electric-blue px-6 py-4 font-medium text-white transition-all duration-300 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-charcoal sm:w-auto"
          >
            <Send className="size-4" aria-hidden />
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};
