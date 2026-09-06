"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { KanbanSquare, LogOut, Moon, Sun, Users } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Logo } from "@/components/Logo";
import { Avatar } from "./Avatar";
import { logoutAction } from "@/app/projects/actions";
import type { SessionUser } from "@/lib/pm/session";

const links = [
  { href: "/projects", label: "Projects", icon: KanbanSquare },
  { href: "/projects/team", label: "Team", icon: Users },
];

export const PmHeader = ({ user }: { user: SessionUser }) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[100rem] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/projects"
            className="flex items-center gap-2.5"
            aria-label="TMS Projects home"
          >
            <Logo className="size-9" />
            <span className="hidden font-display text-sm font-bold tracking-tight sm:block">
              TMS<span className="text-accent">.</span>Projects
            </span>
          </Link>

          <nav aria-label="Sections">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const active =
                  link.href === "/projects"
                    ? pathname === "/projects" ||
                      (pathname.startsWith("/projects/") &&
                        !pathname.startsWith("/projects/team"))
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "border border-line bg-surface text-foreground"
                          : "border border-transparent text-slate-gray hover:text-foreground"
                      }`}
                    >
                      <link.icon className="size-4" aria-hidden />
                      <span className="hidden sm:inline">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex size-9 items-center justify-center rounded-lg border border-line text-slate-gray transition-colors hover:border-accent/40 hover:text-foreground"
          >
            {theme === "dark" ? (
              <Moon className="size-4" aria-hidden />
            ) : (
              <Sun className="size-4" aria-hidden />
            )}
          </button>

          <div className="ml-1 flex items-center gap-2.5 border-l border-line pl-3">
            <Avatar id={user.id} name={user.name} size="md" />
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs capitalize text-slate-gray">{user.role}</p>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              aria-label="Sign out"
              title="Sign out"
              className="flex size-9 items-center justify-center rounded-lg border border-line text-slate-gray transition-colors hover:border-red-500/40 hover:text-red-400"
            >
              <LogOut className="size-4" aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
