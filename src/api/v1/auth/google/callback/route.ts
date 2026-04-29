import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${error}`, baseUrl));
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=google_token_missing", baseUrl)
    );
  }

  const storedState = (await cookies()).get("oauth_state")?.value;
  if (!state || state !== storedState) {
    return NextResponse.redirect(
      new URL("/login?error=google_invalid_state", baseUrl)
    );
  }

  (await cookies()).delete("oauth_state");

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${baseUrl}/api/v1/auth/google/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL("/login?error=google_not_configured", baseUrl)
    );
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(
        new URL("/login?error=google_token_failed", baseUrl)
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.redirect(
        new URL("/login?error=google_token_missing", baseUrl)
      );
    }

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      return NextResponse.redirect(
        new URL("/login?error=google_userinfo_failed", baseUrl)
      );
    }

    const userData = await userResponse.json();
    const email = userData.email;

    if (!email) {
      return NextResponse.redirect(
        new URL("/login?error=google_email_missing", baseUrl)
      );
    }

    return NextResponse.redirect(new URL("/?google=success", baseUrl));
  } catch (err) {
    console.error("Google OAuth error:", err);
    return NextResponse.redirect(
      new URL("/login?error=google_token_failed", baseUrl)
    );
  }
}
