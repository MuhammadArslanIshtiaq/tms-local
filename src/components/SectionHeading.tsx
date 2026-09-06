"use client";

import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className = "",
}: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <Reveal>
          <span
            className={`inline-flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
            <span className="eyebrow">{eyebrow}</span>
            {centered ? (
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent" />
            ) : null}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <h2
          id={id}
          className="mt-4 text-balance text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[2.75rem]"
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-slate-gray md:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
};
