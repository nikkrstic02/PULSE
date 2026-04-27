import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { issueSessionCookie } from "@/lib/auth-server";
import { findUserByEmail } from "@/lib/users-store";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password || "";

    const user = await findUserByEmail(email);
    if (!user || !user.passwordHash) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 422 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 422 });
    }

    await issueSessionCookie(user);
    return NextResponse.json({ user: { id: user.id, email: user.email } });
  } catch {
    return NextResponse.json({ message: "Login failed." }, { status: 500 });
  }
}
