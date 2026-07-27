import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { hasDatabase, prisma } from "./db";
import {
  SESSION_COOKIE,
  signSession,
  verifySession,
  type SessionPayload,
} from "./session";

/** Node-runtime auth (uses Prisma + bcrypt). Not for edge/middleware. */

export async function verifyCredentials(
  email: string,
  password: string
): Promise<SessionPayload | null> {
  const normalized = email.trim().toLowerCase();

  if (hasDatabase && prisma) {
    const user = await prisma.adminUser.findUnique({
      where: { email: normalized },
    });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? { email: user.email, name: user.name } : null;
  }

  // Fallback: env credentials (local dev before Supabase is connected)
  const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  if (!envEmail || !envHash) return null;
  if (normalized !== envEmail) return null;
  const ok = await bcrypt.compare(password, envHash);
  return ok ? { email: envEmail, name: "Admin" } : null;
}

export async function createSessionCookie(payload: SessionPayload) {
  const token = await signSession(payload);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySessionCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getCurrentAdmin(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}
