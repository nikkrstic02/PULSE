import axios from "axios";
import { http } from "@/lib/http";
import { ensureCsrfCookie } from "./csrf";

export type User = {
  id: number;
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  password_confirmation: string;
};

export type ForgotPasswordPayload = {
  email: string;
  password: string;
  password_confirmation: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isUser(value: unknown): value is User {
  if (!isRecord(value)) return false;
  return typeof value.id === "number" && typeof value.email === "string";
}

function extractUser(payload: unknown): User {
  if (!isRecord(payload) || !isUser(payload.user)) {
    throw new Error("Unexpected user payload from backend.");
  }
  return payload.user;
}

export async function getMe(): Promise<User | null> {
  try {
    const res = await http.get("/api/v1/auth/me");
    return extractUser(res.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 401) return null;
    throw err;
  }
}

export async function login(payload: LoginPayload): Promise<User> {
  await ensureCsrfCookie();
  const res = await http.post("/api/v1/auth/login", payload);
  return extractUser(res.data);
}

export async function register(payload: RegisterPayload): Promise<User> {
  await ensureCsrfCookie();
  const res = await http.post("/api/v1/auth/register", payload);
  return extractUser(res.data);
}

export async function logout(): Promise<void> {
  await ensureCsrfCookie();
  await http.post("/api/v1/auth/logout");
}

export async function requestPasswordReset(payload: ForgotPasswordPayload): Promise<void> {
  await ensureCsrfCookie();
  await http.post("/api/v1/auth/forgot-password", payload);
}

export function getGoogleRedirectUrl(nextPath = "/dashboard"): string {
  const params = new URLSearchParams({ next: nextPath });
  return `/api/v1/auth/google/redirect?${params.toString()}`;
}

export async function googleLogin(code: string): Promise<User> {
  await ensureCsrfCookie();
  const res = await http.post("/api/v1/auth/google/login", { code });
  return extractUser(res.data);
}
