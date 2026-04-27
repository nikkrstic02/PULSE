import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createLocalUser } from "@/lib/users-store";
import { issueSessionCookie } from "@/lib/auth-server";

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      password?: string;
      password_confirmation?: string;
    };

    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password || "";
    const confirm = body.password_confirmation || "";

    if (!email || !isEmail(email)) {
      return NextResponse.json({ message: "Valid email is required." }, { status: 422 });
    }
    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 422 });
    }
    if (password !== confirm) {
      return NextResponse.json({ message: "Password confirmation does not match." }, { status: 422 });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await createLocalUser(email, hash);
    await issueSessionCookie(user);

    return NextResponse.json(
      { user: { id: user.id, email: user.email } },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      return NextResponse.json({ message: "Email is already in use." }, { status: 422 });
    }
    return NextResponse.json({ message: "Registration failed." }, { status: 500 });
  }
}
