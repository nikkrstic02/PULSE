"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getGoogleRedirectUrl } from "@/features/auth/api/auth.api";
import { useLoginMutation } from "@/features/auth/queries/use-login-mutation";
import { useLanguageCopy } from "@/lib/i18n";

type AuthCopy = ReturnType<typeof useLanguageCopy>["copy"]["auth"];

function getErrorMessage(error: unknown, copy: AuthCopy): string | null {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status && status >= 500) {
      return copy.serviceUnavailable;
    }
    const data = error.response?.data as unknown;
    if (data && typeof data === "object" && "message" in data) {
      const msg = (data as { message?: unknown }).message;
      if (typeof msg === "string") {
        if (msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("wrong")) {
          return copy.wrongCredentials;
        }
        return msg;
      }
    }
    return error.message || null;
  }
  return error instanceof Error ? error.message : null;
}

function getGoogleErrorMessage(code: string | null, copy: AuthCopy): string | null {
  if (!code) return null;
  return copy.googleErrors[code as keyof typeof copy.googleErrors] || copy.googleFailed;
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-slate-500"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path
            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </>
      ) : (
        <>
          <path
            d="M3 3l18 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10.6 10.6a2.5 2.5 0 0 0 2.8 2.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M9.7 5.2A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18.6 18.6 0 0 1-4.1 5.1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M6.1 6.1C3.7 8 2 12 2 12s3.5 7 10 7c1 0 2-.2 2.9-.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default function LoginPage() {
  const loginMutation = useLoginMutation();
  const router = useRouter();
  const { copy } = useLanguageCopy();
  const authCopy = copy.auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dismissGoogleError, setDismissGoogleError] = useState(false);
  const [allowCredentialFill, setAllowCredentialFill] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const errorMessage = useMemo(
    () => getErrorMessage(loginMutation.error, authCopy),
    [authCopy, loginMutation.error],
  );

  const handleGoogleSignIn = () => {
    const next = new URLSearchParams(window.location.search).get("next") || "/dashboard";
    window.location.assign(getGoogleRedirectUrl(next));
  };
  const googleError = useMemo(() => {
    if (dismissGoogleError) return null;
    if (typeof window === "undefined") return null;
    const code = new URLSearchParams(window.location.search).get("error");
    return getGoogleErrorMessage(code, authCopy);
  }, [authCopy, dismissGoogleError]);

  useEffect(() => {
    const clearBrowserAutofill = () => {
      setEmail("");
      setPassword("");
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
    };

    clearBrowserAutofill();
    const timeouts = [50, 150, 400, 900].map((delay) =>
      window.setTimeout(clearBrowserAutofill, delay),
    );
    const onPageShow = () => clearBrowserAutofill();
    window.addEventListener("pageshow", onPageShow);

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  const enableCredentialFill = () => {
    setAllowCredentialFill(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDismissGoogleError(true);
    const submittedEmail = (email || emailRef.current?.value || "").trim();
    const submittedPassword = password || passwordRef.current?.value || "";

    if (!submittedEmail) {
      setError(authCopy.validationEmailRequired);
      return;
    }
    if (!submittedPassword) {
      setError(authCopy.validationPasswordRequired);
      return;
    }
    setError(null);
    try {
      await loginMutation.mutateAsync({ email: submittedEmail, password: submittedPassword });
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(next || "/dashboard");
    } catch {
      // handled by error state
    }
  };

  return (
    <main className="ken-auth-shell flex items-center justify-center p-6">
      <div className="ken-glass w-full max-w-[520px] min-h-[640px] rounded-[18px] px-8 py-9 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col items-center">
          <div className="ken-wordmark text-2xl">KEN</div>
          <div className="mt-4 text-3xl font-semibold text-white">{authCopy.welcome}</div>
          <div className="mt-4 text-center text-sm text-slate-300">
            {authCopy.loginToContinue}
          </div>
        </div>

        <form onSubmit={onSubmit} autoComplete="on" className="mt-7 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-200">
              {authCopy.emailAddress} <span className="text-rose-600">*</span>
            </label>
            <input
              ref={emailRef}
              name="email"
              value={email}
              readOnly={!allowCredentialFill}
              onPointerDown={enableCredentialFill}
              onFocus={enableCredentialFill}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              placeholder={authCopy.emailAddress}
              className="w-full rounded-[12px] border border-white/20 bg-[#dbe7ff] px-4 py-3 text-[15px] text-black outline-none focus:border-[#6b6ee6] focus:ring-2 focus:ring-[rgba(107,110,230,0.25)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-200">
              {authCopy.password} <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                ref={passwordRef}
                name="password"
                value={password}
                readOnly={!allowCredentialFill}
                onPointerDown={enableCredentialFill}
                onFocus={enableCredentialFill}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                type={showPass ? "text" : "password"}
                placeholder={authCopy.password}
                className="w-full rounded-[12px] border border-white/20 bg-[#dbe7ff] px-4 py-3 pr-12 text-[15px] text-black outline-none focus:border-[#6b6ee6] focus:ring-2 focus:ring-[rgba(107,110,230,0.25)]"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-slate-100"
                aria-label={showPass ? authCopy.hidePassword : authCopy.showPassword}
              >
                <EyeIcon open={showPass} />
              </button>
            </div>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-cyan-200 hover:underline"
          >
            {authCopy.forgotPassword}
          </Link>

          {googleError ? (
            <div className="ken-auth-alert rounded-[10px] px-4 py-3 text-sm">
              {googleError}
            </div>
          ) : null}

          {(error || errorMessage) ? (
            <div className="ken-auth-alert rounded-[10px] px-4 py-3 text-sm">
              {error || errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-[12px] bg-[#6b6ee6] py-3 text-[15px] font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {loginMutation.isPending ? authCopy.signIn : authCopy.continue}
          </button>

          <div className="pt-2 text-center text-sm text-slate-300">
            {authCopy.dontHaveAccount}{" "}
            <Link href="/register" className="font-semibold text-cyan-200 hover:underline">
              {authCopy.signUp}
            </Link>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="h-px flex-1 bg-slate-200" />
            <div className="text-xs font-semibold text-slate-500">{authCopy.or}</div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-[12px] border border-slate-300 bg-white py-3 text-[15px] font-semibold text-slate-700 hover:bg-slate-50"
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
      </div>
    </main>
  );
}
