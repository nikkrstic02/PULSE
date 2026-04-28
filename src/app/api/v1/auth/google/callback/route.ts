import { NextResponse } from "next/server";
import { findOrCreateGoogleUser } from "@/lib/users-store";
import { issueSessionCookie, readAndClearGoogleState } from "@/lib/auth-server";
import { getAppUrl, getGoogleSuccessPath } from "@/lib/oauth";

type GoogleTokenResponse = {
  access_token?: string;
  id_token?: string;
};

type GoogleUserInfo = {
  email?: string;
};

export async function GET(req: Request) {
  const appUrl = getAppUrl(req);
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=google_not_configured", appUrl));
  }

  const url = new URL(req.url);
  const googleError = url.searchParams.get("error");
  if (googleError) {
    const loginUrl = new URL("/login", appUrl);
    loginUrl.searchParams.set("error", `google_${googleError}`);
    return NextResponse.redirect(loginUrl);
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const { state: expectedState, nextPath } = await readAndClearGoogleState();

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(new URL("/login?error=google_invalid_state", appUrl));
  }

  const redirectUri = `${appUrl}/api/v1/auth/google/callback`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL("/login?error=google_token_failed", appUrl));
  }

  const tokenData = (await tokenRes.json()) as GoogleTokenResponse;
  if (!tokenData.access_token) {
    return NextResponse.redirect(new URL("/login?error=google_token_missing", appUrl));
  }

  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  if (!userRes.ok) {
    return NextResponse.redirect(new URL("/login?error=google_userinfo_failed", appUrl));
  }

  const userInfo = (await userRes.json()) as GoogleUserInfo;
  if (!userInfo.email) {
    return NextResponse.redirect(new URL("/login?error=google_email_missing", appUrl));
  }

  const user = await findOrCreateGoogleUser(userInfo.email.toLowerCase());
  await issueSessionCookie(user);

  return NextResponse.redirect(new URL(getGoogleSuccessPath(nextPath), appUrl));
}
