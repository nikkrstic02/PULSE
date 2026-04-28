"use client";

import Link from "next/link";
import { ArrowRight, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguageCopy } from "@/lib/i18n";

export function HomeContent() {
  const { copy } = useLanguageCopy();

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="ken-glass w-full max-w-3xl rounded-3xl p-10 text-center shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
          <Sparkles size={14} />
          {copy.home.welcome}
        </div>
        <h1 className="mt-5 text-5xl font-black tracking-tight">{copy.home.title}</h1>
        <div className="ken-wordmark mt-3 text-sm">KEN</div>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300">
          {copy.home.subtitle}
        </p>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 text-left md:grid-cols-3">
          <div className="ken-hover-lift rounded-xl border border-white/10 bg-white/5 p-4">
            <Rocket size={16} className="text-cyan-200" />
            <p className="mt-2 text-sm text-slate-200">{copy.home.stats.fast}</p>
          </div>
          <div className="ken-hover-lift rounded-xl border border-white/10 bg-white/5 p-4">
            <ShieldCheck size={16} className="text-cyan-200" />
            <p className="mt-2 text-sm text-slate-200">{copy.home.stats.secure}</p>
          </div>
          <div className="ken-hover-lift rounded-xl border border-white/10 bg-white/5 p-4">
            <Sparkles size={16} className="text-cyan-200" />
            <p className="mt-2 text-sm text-slate-200">{copy.home.stats.premium}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#6b6ee6] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {copy.home.login}
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
          >
            {copy.home.register}
          </Link>
        </div>
      </div>
    </main>
  );
}
