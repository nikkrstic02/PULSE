import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { findUserByEmail, updateUserPasswordByEmail } from "@/lib/users-store";

const RESET_DONE_MESSAGE = "Your password has been changed. You can now log in.";

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

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ message: "No account exists with that email." }, { status: 404 });
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { message: "This account uses Google sign-in. Use Google to log in." },
        { status: 422 },
      );
    }

    const hash = await bcrypt.hash(password, 10);
    await updateUserPasswordByEmail(email, hash);

    return NextResponse.json({
      message: RESET_DONE_MESSAGE,
    });
  } catch {
    return NextResponse.json({ message: "Password reset failed." }, { status: 500 });
  }
}
