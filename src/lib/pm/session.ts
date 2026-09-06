import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "pm_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
};

const secretKey = () => {
  const secret = process.env.PM_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "PM_SESSION_SECRET is not set (or is too short). Add it to .env.local."
    );
  }
  return new TextEncoder().encode(secret);
};

export const signSession = async (user: SessionUser): Promise<string> =>
  new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());

export const verifySession = async (
  token: string | undefined
): Promise<SessionUser | null> => {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    const { id, name, email, role } = payload as Record<string, unknown>;

    if (typeof id !== "string" || typeof email !== "string") return null;

    return {
      id,
      email,
      name: typeof name === "string" ? name : email,
      role: role === "admin" ? "admin" : "member",
    };
  } catch {
    return null;
  }
};

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
} as const;
