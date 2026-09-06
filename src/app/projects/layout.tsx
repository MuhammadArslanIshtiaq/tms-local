import type { Metadata } from "next";
import { getSession } from "@/lib/pm/auth";
import { PmHeader } from "@/components/pm/PmHeader";

export const metadata: Metadata = {
  title: {
    default: "TMS Projects",
    template: "%s | TMS Projects",
  },
  robots: { index: false, follow: false },
};

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  /* The login page renders without the app chrome. */
  if (!user) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PmHeader user={user} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
