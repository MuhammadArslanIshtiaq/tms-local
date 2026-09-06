import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  verifySession,
  type SessionUser,
} from "./session";

export { hashPassword, verifyPassword } from "./password";

/** Returns the signed-in user, or null when the visitor is anonymous. */
export const getSession = async (): Promise<SessionUser | null> => {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
};

/** Returns the signed-in user, redirecting to the login page when absent. */
export const requireUser = async (): Promise<SessionUser> => {
  const user = await getSession();
  if (!user) redirect("/projects/login");
  return user;
};

/** Returns the signed-in admin, or throws when the user lacks the role. */
export const requireAdmin = async (): Promise<SessionUser> => {
  const user = await requireUser();
  if (user.role !== "admin") {
    throw new Error("Only administrators can perform this action.");
  }
  return user;
};
