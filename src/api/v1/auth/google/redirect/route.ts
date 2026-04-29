import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${baseUrl}/api/v1/auth/google/callback`;

  if (!clientId) {
    return NextResponse.redirect(
      new URL("/login?error=google_not_configured", baseUrl)
    );
  }

  const state = crypto.randomUUID();
  const scope = "openid email profile";
  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.set("client_id", clientId);
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", scope);
  googleAuthUrl.searchParams.set("state", state);
  googleAuthUrl.searchParams.set("access_type", "offline");
  googleAuthUrl.searchParams.set("prompt", "consent");

  const response = NextResponse.redirect(googleAuthUrl.toString());
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 300,
  });

  return response;
}
