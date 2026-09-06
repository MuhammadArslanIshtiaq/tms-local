"use client";

import { Reveal } from "./Reveal";

type Brand = { name: string; color: string };

const rowOne: Brand[] = [
  { name: "AWS", color: "#FF9900" },
  { name: "Microsoft Azure", color: "#3B96F0" },
  { name: "Google Cloud", color: "#4285F4" },
  { name: "Kubernetes", color: "#4A82F5" },
  { name: "Docker", color: "#2496ED" },
  { name: "Terraform", color: "#A277FF" },
  { name: "PostgreSQL", color: "#5C9FD6" },
];

const rowTwo: Brand[] = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#9CA3AF" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js", color: "#5FA04E" },
  { name: "Python", color: "#4B8BBE" },
  { name: "Go", color: "#00ADD8" },
  { name: ".NET", color: "#9B7DF0" },
];

const BrandTile = ({ name, color }: Brand) => (
  <div className="group flex shrink-0 items-center gap-3 rounded-xl border border-line bg-surface px-6 py-4 backdrop-blur-md transition-colors duration-300 hover:border-accent/40">
    <span
      className="size-2 shrink-0 rounded-full transition-all duration-300 group-hover:scale-125"
      style={{ background: color, boxShadow: `0 0 14px ${color}` }}
      aria-hidden
    />
    <span
      className="whitespace-nowrap font-display text-base font-semibold tracking-tight text-slate-gray transition-colors duration-300 group-hover:text-foreground"
    >
      {name}
    </span>
  </div>
);

const MarqueeRow = ({
  brands,
  reverse = false,
}: {
  brands: Brand[];
  reverse?: boolean;
}) => (
  <div className="marquee">
    <div
      className="marquee-track"
      style={{
        animation: `${reverse ? "marquee-reverse" : "marquee"} ${
          reverse ? 52 : 44
        }s linear infinite`,
      }}
    >
      {/* Two identical halves — the keyframes translate by exactly 50%. */}
      {[0, 1].map((half) => (
        <div key={half} className="flex shrink-0 gap-5" aria-hidden={half === 1}>
          {brands.map((brand) => (
            <BrandTile key={brand.name} {...brand} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const TechEcosystem = () => (
  <section
    aria-labelledby="tech-heading"
    className="relative overflow-hidden border-y border-line py-16 md:py-20"
  >
    <div
      className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_75%)]"
      aria-hidden
    />

    <Reveal className="shell mb-10 text-center">
      <p id="tech-heading" className="eyebrow">
        The stack we build on
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm text-slate-gray sm:text-base">
        Battle-tested tooling, chosen for longevity — never for hype.
      </p>
    </Reveal>

    <div className="flex flex-col gap-5">
      <MarqueeRow brands={rowOne} />
      <MarqueeRow brands={rowTwo} reverse />
    </div>
  </section>
);
