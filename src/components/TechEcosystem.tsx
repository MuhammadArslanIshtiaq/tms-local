"use client";

const brands = [
  { name: "AWS", color: "#FF9900" },
  { name: "Azure", color: "#0078D4" },
  { name: "Docker", color: "#2496ED" },
  { name: "Kubernetes", color: "#326CE5" },
  { name: "React", color: "#61DAFB" },
  { name: "Python", color: "#3776AB" },
];

const LogoPlaceholder = ({ name, color }: { name: string; color: string }) => (
  <div
    className="flex shrink-0 items-center justify-center rounded-xl border border-slate-gray/30 bg-charcoal/60 px-8 py-5 transition-colors hover:border-electric-blue/40"
    style={{ minWidth: "140px" }}
  >
    <span
      className="text-lg font-bold tracking-tight"
      style={{ color }}
    >
      {name}
    </span>
  </div>
);

export const TechEcosystem = () => {
  return (
    <section
      className="relative overflow-hidden border-y border-slate-gray/20 py-12"
      aria-labelledby="tech-ecosystem-heading"
    >
      <h2
        id="tech-ecosystem-heading"
        className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl"
      >
        Our Tech Ecosystem
      </h2>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...Array(4)].map((_, copyIndex) =>
            brands.map((brand) => (
              <LogoPlaceholder
                key={`${brand.name}-${copyIndex}`}
                name={brand.name}
                color={brand.color}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
