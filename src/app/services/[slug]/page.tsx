import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServiceSlugs } from "@/data/services";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceContactForm } from "@/components/ServiceContactForm";
import { ArrowLeft, Check } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  getServiceSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service | TMS DigitalHub" };
  return {
    title: `${service.title} | TMS DigitalHub`,
    description: service.shortDescription,
  };
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />

      <main>
        {/* Hero */}
        <section className="border-b border-slate-gray/20 bg-charcoal/40">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16">
            <Link
              href="/#services"
              className="mb-8 inline-flex items-center gap-2 text-sm text-slate-gray transition-colors hover:text-electric-blue"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to Services
            </Link>
            <div className="flex items-start gap-6">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-electric-blue/20 text-electric-blue">
                <Icon className="size-8" aria-hidden />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-slate-gray">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:px-12 lg:px-16">
          <div className="grid gap-16 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="mt-4 leading-relaxed text-slate-gray">
                  {service.overview}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold">What We Offer</h2>
                <ul className="mt-4 space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-slate-gray"
                    >
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-electric-blue"
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Benefits</h2>
                <ul className="mt-4 space-y-3">
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-slate-gray"
                    >
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-electric-blue"
                        aria-hidden
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Common Use Cases</h2>
                <ul className="mt-4 list-inside list-disc space-y-2 text-slate-gray">
                  {service.useCases.map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Contact Form Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ServiceContactForm serviceName={service.title} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
