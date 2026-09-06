import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Renders both logo variants and lets CSS pick one based on `data-theme`.
 * Avoids a hydration mismatch and a theme flash on first paint.
 */
export const Logo = ({ className = "", priority = false }: LogoProps) => (
  <span
    className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-surface ring-1 ring-line ${className}`}
  >
    <Image
      src="/tms-logo-dark.png"
      alt=""
      width={514}
      height={514}
      priority={priority}
      className="logo-dark size-full object-contain p-1"
    />
    <Image
      src="/tms-logo.png"
      alt=""
      width={514}
      height={514}
      priority={priority}
      className="logo-light absolute inset-0 size-full object-contain p-1"
    />
  </span>
);
