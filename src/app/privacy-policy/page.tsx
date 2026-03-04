import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | TMS DigitalHub",
  description:
    "Privacy Policy for TMS DigitalHub. Learn how we collect, use, and protect your personal information.",
};

const LEGAL_SITE_URL = "https://www.tms-digitalhub.com";

const sections = [
  {
    heading: "Introduction",
    content: `Welcome to TMS DigitalHub ("we," "our," or "us"). We are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at ${LEGAL_SITE_URL} or use our services. Please read this policy carefully.`,
  },
  {
    heading: "Information We Collect",
    content: `We may collect information that you provide directly to us (such as name, email address, company name, and message content when you contact us), information collected automatically (such as IP address, browser type, and usage data), and information from cookies and similar technologies.`,
  },
  {
    heading: "How We Use Your Information",
    content: `We use the information we collect to respond to inquiries, provide and improve our services, send relevant communications, analyze website usage, ensure security, and comply with legal obligations.`,
  },
  {
    heading: "Information Sharing and Disclosure",
    content: `We do not sell your personal information. We may share your information with service providers who assist our operations, when required by law, or to protect our rights and safety.`,
  },
  {
    heading: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.`,
  },
  {
    heading: "Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.`,
  },
  {
    heading: "Your Rights",
    content: `Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal data. You may also have the right to data portability and to withdraw consent. To exercise these rights, contact us at hr@tmsdigitalhub.com.`,
  },
  {
    heading: "Cookies and Tracking",
    content: `We may use cookies and similar technologies to enhance your experience, analyze traffic, and personalize content. You can manage your cookie preferences through your browser settings.`,
  },
  {
    heading: "Third-Party Links",
    content: `Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies.`,
  },
  {
    heading: "International Transfers",
    content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.`,
  },
  {
    heading: "Children's Privacy",
    content: `Our services are not directed to individuals under 16. We do not knowingly collect personal information from children under 16.`,
  },
  {
    heading: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the "Last Updated" date.`,
  },
  {
    heading: "Contact Us",
    content: `If you have questions about this Privacy Policy or our data practices, please contact us at hr@tmsdigitalhub.com or at our office: 1001 S Main St STE 500, Kalispell MT 59901, USA.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 md:px-12 lg:px-16">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-slate-gray transition-colors hover:text-electric-blue"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-slate-gray">
          Last Updated: March 3, 2026
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground">
                {section.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-gray">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <Link
          href="/"
          className="mt-12 inline-block text-sm text-slate-gray transition-colors hover:text-electric-blue"
        >
          ← Back to Home
        </Link>
      </main>

      <Footer />
    </div>
  );
}
