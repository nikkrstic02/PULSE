import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import type { StoredUser } from "./users-store";
import { findUserById } from "./users-store";

const SESSION_COOKIE = "ken_session";
const GOOGLE_STATE_COOKIE = "ken_google_state";
const GOOGLE_NEXT_COOKIE = "ken_google_next";

function getSecret() {
  const secret = process.env.AUTH_SECRET || "dev-only-auth-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function issueSessionCookie(user: StoredUser) {
  const token = await new SignJWT({ sub: String(user.id), email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentUser() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = await jwtVerify(token, getSecret());
    const id = Number(payload.payload.sub);
    if (!Number.isFinite(id)) return null;
    return await findUserById(id);
  } catch {
    return null;
  }
}

export async function setGoogleState(state: string, nextPath: string) {
  const jar = await cookies();
  const common = {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 10,
  };
  jar.set(GOOGLE_STATE_COOKIE, state, common);
  jar.set(GOOGLE_NEXT_COOKIE, nextPath, common);
}

export async function readAndClearGoogleState() {
  const jar = await cookies();
  const state = jar.get(GOOGLE_STATE_COOKIE)?.value || null;
  const nextPath = jar.get(GOOGLE_NEXT_COOKIE)?.value || "/dashboard";

  jar.set(GOOGLE_STATE_COOKIE, "", { path: "/", maxAge: 0 });
  jar.set(GOOGLE_NEXT_COOKIE, "", { path: "/", maxAge: 0 });

  return { state, nextPath };
}
