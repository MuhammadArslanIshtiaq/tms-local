import type { Metadata } from "next";
import { requireUser } from "@/lib/pm/auth";
import { listMembers } from "@/lib/pm/queries";
import { TeamManager } from "@/components/pm/TeamManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Team" };

export default async function TeamPage() {
  const user = await requireUser();
  const members = await listMembers();

  return (
    <div className="mx-auto w-full max-w-[100rem] px-4 py-8 sm:px-6 sm:py-10">
      <TeamManager
        members={members}
        currentUserId={user.id}
        isAdmin={user.role === "admin"}
      />
    </div>
  );
}
