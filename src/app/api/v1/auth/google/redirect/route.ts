import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { setGoogleState } from "@/lib/auth-server";
import { getAppUrl, getSafeNextPath } from "@/lib/oauth";

export async function GET(req: Request) {
  const appUrl = getAppUrl(req);
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(new URL("/login?error=google_not_configured", appUrl));
  }

  const url = new URL(req.url);
  const nextPath = getSafeNextPath(url.searchParams.get("next"));
  const state = randomUUID();
  await setGoogleState(state, nextPath);

  const redirectUri = `${appUrl}/api/v1/auth/google/callback`;
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  authUrl.searchParams.set("state", state);

  return NextResponse.redirect(authUrl);
}
