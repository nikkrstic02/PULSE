"use client";

import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGoogleRedirectUrl, register } from "@/features/auth/api/auth.api";
import { useLanguageCopy } from "@/lib/i18n";

type AuthCopy = ReturnType<typeof useLanguageCopy>["copy"]["auth"];

function getRegisterError(error: unknown, copy: AuthCopy): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    const status = error.response?.status;

    if (status && status >= 500) {
      return copy.serviceUnavailable;
    }

    if (typeof data?.message === "string") return data.message;

    if (data?.errors && typeof data.errors === "object") {
      const values = Object.values(data.errors as Record<string, unknown>);
      const flat = values.flatMap((v) => (Array.isArray(v) ? v : []));
      if (flat.length) return String(flat[0]);
    }

    return error.message || copy.registerFailed;
  }

  return error instanceof Error ? error.message : copy.registerFailed;
}

export default function RegisterPage() {
  const router = useRouter();
  const { copy } = useLanguageCopy();
  const authCopy = copy.auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await register({
        email: email.trim(),
        password,
        password_confirmation: password,
      });

      router.replace("/dashboard");
    } catch (err) {
      setError(getRegisterError(err, authCopy));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="ken-auth-shell flex min-h-dvh items-center justify-center px-4 py-6 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="ken-glass w-full max-w-[520px] rounded-[18px] px-5 py-7 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:min-h-[640px] sm:px-8 sm:py-9"
      >
        <div className="flex flex-col items-center">
          <div className="ken-wordmark text-2xl">KEN</div>

          <div className="mt-4 text-center text-2xl font-semibold text-white sm:text-3xl">
            {authCopy.welcome}
          </div>

          <div className="mt-4 text-center text-sm text-slate-300">
            {authCopy.createAccount}
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
              {authCopy.password} <span className="text-rose-600">*</span>
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              type="password"
              placeholder={authCopy.password}
              className="w-full rounded-[12px] border border-white/20 bg-[#dbe7ff] px-4 py-3 text-[15px] text-black outline-none focus:border-[#6b6ee6] focus:ring-2 focus:ring-[rgba(107,110,230,0.25)]"
            />
          </div>

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
            {submitting ? authCopy.creating : authCopy.continue}
          </button>

          <div className="pt-2 text-center text-sm text-slate-300">
            {authCopy.alreadyRegistered}{" "}
            <Link
              href="/login"
              className="font-semibold text-cyan-200 hover:underline"
            >
              {authCopy.login}
            </Link>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="h-px flex-1 bg-slate-200" />
            <div className="text-xs font-semibold text-slate-500">{authCopy.or}</div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.assign(getGoogleRedirectUrl("/dashboard"));
            }}
            className="flex w-full items-center justify-center gap-3 rounded-[12px] border border-slate-300 bg-white px-3 py-3 text-center text-[15px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.1 0 5.9 1.1 8.1 3.1l6-6C34.4 3.3 29.6 1.5 24 1.5 14.7 1.5 6.7 6.8 2.8 14.5l7 5.4C11.8 13.7 17.4 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24c0-1.6-.1-2.7-.4-4H24v8.2h12.7c-.3 2.1-1.8 5.3-5.1 7.4l7.8 6C43.9 37.8 46.5 31.6 46.5 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M9.8 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7-5.4C1.3 17.1.5 20.4.5 24s.8 6.9 2.3 9.9l7-5.3z"
                />
                <path
                  fill="#34A853"
                  d="M24 46.5c5.6 0 10.4-1.8 13.9-4.9l-7.8-6c-2.1 1.5-4.9 2.6-6.1 2.6-6.6 0-12.2-4.2-14.2-10l-7 5.3C6.7 41.2 14.7 46.5 24 46.5z"
                />
              </svg>
            </span>

            {authCopy.continueWithGoogle}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
