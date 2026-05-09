"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "@/features/auth/api/auth.api";
import { useLanguageCopy } from "@/lib/i18n";

type AuthCopy = ReturnType<typeof useLanguageCopy>["copy"]["auth"];

function getForgotPasswordError(error: unknown, copy: AuthCopy): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    if (typeof data?.message === "string") {
      if (data.message.includes("same as your old password")) {
        return copy.newPasswordSameAsOld;
      }
      return data.message;
    }
    return error.message || copy.passwordResetFailed;
  }

  return error instanceof Error ? error.message : copy.passwordResetFailed;
}

export default function ForgotPasswordPage() {
  const { copy } = useLanguageCopy();
  const authCopy = copy.auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDone(false);
    setSubmitting(true);

    try {
      await requestPasswordReset({
        email: email.trim(),
        password,
        password_confirmation: confirm,
      });
      setDone(true);
      setPassword("");
      setConfirm("");
    } catch (err) {
      setError(getForgotPasswordError(err, authCopy));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="ken-auth-shell flex min-h-dvh items-center justify-center px-4 py-6 sm:p-6">
      <div className="ken-glass w-full max-w-[520px] rounded-[18px] px-5 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:px-8 sm:py-9">
        <div className="flex flex-col items-center">
          <div className="pulse-wordmark text-2xl">Pulse</div>
          <div className="mt-4 text-center text-2xl font-semibold text-white sm:text-3xl">{authCopy.changePassword}</div>
          <div className="mt-4 text-center text-sm leading-6 text-slate-300">
            {authCopy.resetHelp}
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-200">
              {authCopy.emailAddress} <span className="text-rose-600">*</span>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder={authCopy.emailAddress}
              className="w-full rounded-[12px] border border-white/20 bg-[#dbe7ff] px-4 py-3 text-[15px] text-black outline-none focus:border-[#6b6ee6] focus:ring-2 focus:ring-[rgba(107,110,230,0.25)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-200">
              {authCopy.newPassword} <span className="text-rose-600">*</span>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              type="password"
              placeholder={authCopy.newPassword}
              className="w-full rounded-[12px] border border-white/20 bg-[#dbe7ff] px-4 py-3 text-[15px] text-black outline-none focus:border-[#6b6ee6] focus:ring-2 focus:ring-[rgba(107,110,230,0.25)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-200">
              {authCopy.confirmPassword} <span className="text-rose-600">*</span>
            </label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              type="password"
              placeholder={authCopy.confirmPassword}
              className="w-full rounded-[12px] border border-white/20 bg-[#dbe7ff] px-4 py-3 text-[15px] text-black outline-none focus:border-[#6b6ee6] focus:ring-2 focus:ring-[rgba(107,110,230,0.25)]"
            />
          </div>

          {done ? (
            <div className="rounded-[10px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {authCopy.passwordChanged}
            </div>
          ) : null}

          {error ? (
            <div className="ken-auth-alert rounded-[10px] px-4 py-3 text-sm">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-[12px] bg-[#6b6ee6] py-3 text-[15px] font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? authCopy.changing : authCopy.changePassword}
          </button>

          <div className="pt-2 text-center text-sm text-slate-300">
            <Link href="/login" className="font-semibold text-cyan-200 hover:underline">
              {authCopy.backToLogin}
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
