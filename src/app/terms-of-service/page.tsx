import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | TMS DigitalHub",
  description:
    "Terms of Service for TMS DigitalHub. Read our terms and conditions for using our website and services.",
};

const LEGAL_SITE_URL = "https://www.tms-digitalhub.com";

const sections = [
  {
    heading: "Agreement to Terms",
    content: `By accessing or using the TMS DigitalHub website at ${LEGAL_SITE_URL} or our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our website or services.`,
  },
  {
    heading: "Description of Services",
    content: `TMS DigitalHub provides IT services including custom software development, cloud solutions, data analytics, mobile app development, cybersecurity, digital transformation, analytics and tracking, SEO, social media management, graphic design, and related consulting services for government, enterprise, and scale-up clients.`,
  },
  {
    heading: "Eligibility",
    content: `You must be at least 18 years of age and have the legal capacity to enter into binding contracts to use our services. By using our services, you represent and warrant that you meet these requirements.`,
  },
  {
    heading: "User Responsibilities",
    content: `You agree to provide accurate information, use our services lawfully, not interfere with our systems or other users, and comply with all applicable laws. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account.`,
  },
  {
    heading: "Intellectual Property",
    content: `All content, trademarks, logos, and materials on our website and in our services are owned by TMS DigitalHub or our licensors. You may not copy, modify, distribute, or create derivative works without our prior written consent. Work product and deliverables created under a client agreement are subject to the terms of that agreement.`,
  },
  {
    heading: "Confidentiality",
    content: `We respect the confidentiality of client information and project details. We maintain appropriate safeguards to protect confidential information disclosed during our engagements. Both parties agree to maintain confidentiality of proprietary information exchanged in the course of business.`,
  },
  {
    heading: "Service Agreements",
    content: `Specific projects and engagements are governed by separate service agreements, statements of work, or similar documents. In the event of any conflict between these Terms and a signed agreement, the signed agreement prevails for that engagement.`,
  },
  {
    heading: "Fees and Payment",
    content: `Fees, payment terms, and billing procedures are set forth in the applicable service agreement or proposal. Payment is due according to the terms specified therein. We reserve the right to suspend services for non-payment.`,
  },
  {
    heading: "Disclaimer of Warranties",
    content: `Our services are provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that our services will be uninterrupted, error-free, or free of harmful components.`,
  },
  {
    heading: "Limitation of Liability",
    content: `To the maximum extent permitted by law, TMS DigitalHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill, arising from your use of our website or services.`,
  },
  {
    heading: "Indemnification",
    content: `You agree to indemnify and hold harmless TMS DigitalHub, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these Terms.`,
  },
  {
    heading: "Termination",
    content: `We may suspend or terminate your access to our website or services at any time, with or without cause or notice. Provisions of these Terms that by their nature should survive termination will survive.`,
  },
  {
    heading: "Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of Montana, United States, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Montana.`,
  },
  {
    heading: "Changes to Terms",
    content: `We may modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated Terms.`,
  },
  {
    heading: "Contact",
    content: `For questions about these Terms of Service, please contact us at hr@tmsdigitalhub.com or at our office: 1001 S Main St STE 500, Kalispell MT 59901, USA.`,
  },
];

export default function TermsOfServicePage() {
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
          Terms of Service
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
