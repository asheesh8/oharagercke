import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/** Edge-safe session helpers (jose only — no Prisma / bcrypt). */

export const SESSION_COOKIE = "ohg_session";

function secret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || "ohg-dev-insecure-secret-change-in-production"
  );
}

export type SessionPayload = { email: string; name?: string };

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(
  token?: string
): Promise<(JWTPayload & SessionPayload) | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as JWTPayload & SessionPayload;
  } catch {
    return null;
  }
}
