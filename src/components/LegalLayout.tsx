import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { Reveal } from "./Reveal";

export type LegalSection = {
  heading: string;
  content: string;
};

type LegalLayoutProps = {
  title: string;
  updatedAt: string;
  intro?: string;
  sections: LegalSection[];
};

export const LegalLayout = ({
  title,
  updatedAt,
  intro,
  sections,
}: LegalLayoutProps) => (
  <div className="relative min-h-screen bg-background text-foreground">
    <ScrollProgress />
    <Header />

    <main>
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="grain absolute inset-0 -z-10" aria-hidden>
          <div className="aurora opacity-50">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="shell max-w-4xl pb-16 pt-36 sm:pt-40">
          <Reveal direction="none">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-slate-gray backdrop-blur-xl transition-colors hover:border-accent/50 hover:text-foreground"
            >
              <ArrowLeft
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                aria-hidden
              />
              Back to home
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-9 text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 text-sm text-slate-gray">
              Last updated: {updatedAt}
            </p>
            {intro ? (
              <p className="mt-6 max-w-2xl leading-relaxed text-slate-gray">
                {intro}
              </p>
            ) : null}
          </Reveal>
        </div>
      </section>

      <div className="shell max-w-4xl py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Table of contents */}
          <nav className="lg:col-span-4" aria-label="On this page">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                On this page
              </h2>
              <ul className="mt-5 space-y-2.5 border-l border-line pl-4">
                {sections.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="text-sm text-slate-gray transition-colors hover:text-accent"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="space-y-10 lg:col-span-8">
            {sections.map((section) => (
              <Reveal
                key={section.heading}
                as="section"
                className="scroll-mt-32"
              >
                <h2
                  id={slugify(section.heading)}
                  className="scroll-mt-32 text-xl font-semibold tracking-tight"
                >
                  {section.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-gray">
                  {section.content}
                </p>
              </Reveal>
            ))}

            <div className="divider-x" />

            <Link href="/" className="btn btn-ghost px-6 py-3 text-sm">
              <ArrowLeft className="size-4" aria-hidden />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
