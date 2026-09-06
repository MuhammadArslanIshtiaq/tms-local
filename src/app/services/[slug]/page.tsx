import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Sparkles, Target } from "lucide-react";
import { getServiceBySlug, getServiceSlugs, services } from "@/data/services";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceContactForm } from "@/components/ServiceContactForm";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Reveal } from "@/components/Reveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  getServiceSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | TMS DigitalHub`,
      description: service.shortDescription,
      url: `/services/${service.slug}`,
    },
  };
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Header />

      <main>
        {/* ---------------- Hero ---------------- */}
        <section className="relative isolate overflow-hidden border-b border-line">
          <div className="grain absolute inset-0 -z-10" aria-hidden>
            <div className="aurora opacity-70">
              <span />
              <span />
              <span />
            </div>
            <div className="grid-field" />
          </div>

          <div className="shell pb-20 pt-36 sm:pt-40">
            <Reveal direction="none">
              <Link
                href="/#services"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-slate-gray backdrop-blur-xl transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <ArrowLeft
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                  aria-hidden
                />
                All services
              </Link>
            </Reveal>

            <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-8">
              <Reveal direction="none" delay={0.05}>
                <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/25 to-transparent text-accent shadow-[0_0_40px_-12px_var(--glow)] sm:size-20">
                  <Icon className="size-8 sm:size-9" aria-hidden />
                </span>
              </Reveal>

              <div className="min-w-0">
                <Reveal delay={0.1}>
                  <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl">
                    <span className="text-gradient">{service.title}</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-gray md:text-lg">
                    {service.shortDescription}
                  </p>
                </Reveal>
                <Reveal delay={0.22}>
                  <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
                    <a href="#enquire" className="btn btn-primary px-7 py-3.5">
                      Request a consultation
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                    <Link href="/#case-studies" className="btn btn-ghost px-7 py-3.5">
                      See related work
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Body ---------------- */}
        <div className="shell py-20 md:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-16 lg:col-span-7">
              <Reveal>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Overview
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-gray md:text-lg">
                  {service.overview}
                </p>
              </Reveal>

              <Reveal>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  What we offer
                </h2>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="card group flex items-start gap-3 p-4"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent transition-colors duration-300 group-hover:bg-accent/25">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      <span className="text-sm leading-relaxed text-slate-gray">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  <Sparkles className="size-6 text-accent" aria-hidden />
                  Benefits
                </h2>
                <ul className="mt-7 space-y-3">
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 border-b border-line pb-3 text-slate-gray last:border-b-0"
                    >
                      <Check
                        className="mt-1 size-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  <Target className="size-6 text-accent" aria-hidden />
                  Common use cases
                </h2>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {service.useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-slate-gray backdrop-blur-md transition-colors duration-300 hover:border-accent/40 hover:text-foreground"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div id="enquire" className="lg:sticky lg:top-32">
                <ServiceContactForm serviceName={service.title} />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Related ---------------- */}
        <section
          aria-labelledby="related-heading"
          className="border-t border-line py-20 md:py-24"
        >
          <div className="shell">
            <Reveal>
              <span className="eyebrow">Keep exploring</span>
              <h2
                id="related-heading"
                className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Related services
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => {
                const RelatedIcon = item.icon;
                return (
                  <Reveal key={item.slug} delay={i * 0.08}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="card halo group flex h-full flex-col p-6"
                    >
                      <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-transparent text-accent transition-all duration-500 group-hover:border-accent/40">
                        <RelatedIcon className="size-5" aria-hidden />
                      </span>
                      <h3 className="mt-5 font-semibold tracking-tight transition-colors group-hover:text-accent">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-gray">
                        {item.shortDescription}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                        Learn more
                        <ArrowUpRight
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
