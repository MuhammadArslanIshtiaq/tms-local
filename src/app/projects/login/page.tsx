import type { Metadata } from "next";
import { KanbanSquare } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Internal project tracker for the TMS DigitalHub team.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ next?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams;
  const redirectTo = Array.isArray(next) ? next[0] : next;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div className="grain absolute inset-0 -z-10" aria-hidden>
        <div className="aurora opacity-70">
          <span />
          <span />
          <span />
        </div>
        <div className="grid-field" />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo className="size-14" priority />
          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
            TMS Projects
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-gray">
            <KanbanSquare className="size-3.5 text-accent" aria-hidden />
            Internal project tracker
          </p>
        </div>

        <div className="card p-6 sm:p-7">
          <LoginForm next={redirectTo ?? ""} />
        </div>
      </div>
    </main>
  );
}
